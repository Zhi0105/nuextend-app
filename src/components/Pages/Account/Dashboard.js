import { useState, useMemo, useEffect } from "react";
import { Text, View, TextInput } from "react-native";
import useUserStore from "@_stores/auth";
import useEventStore from '@_stores/event';
import { useHeaderHeight } from "@react-navigation/elements";
import { getEvents } from "@_services/event";
import { getParticipantEvents } from "@_services/participant";
import { Card, List } from "@ui-kitten/components";
import _ from "lodash";

export const Dashboard = ({ navigation }) => {
    const headerHeight = useHeaderHeight();
    const { user, token } = useUserStore((state) => ({ user: state.user, token: state.token }));
    const { setUpcoming } = useEventStore((state) => ({ setUpcoming: state.setUpcoming }));

    // Get event data and refetch method
    const { data: eventData, isLoading: eventLoading, refetch: eventRefetch, isRefetching: eventRefetching } = getEvents({ token }, { enabled: !!token && token.length > 0 });
    const {
        data: participantEventData,
        isLoading: participantEventLoading,
        refetch: participantEventRefetch,
        isRefetching: participantEventRefetching
    } = getParticipantEvents(user.id);

    const [searchQuery, setSearchQuery] = useState("");

    // 🔁 Refetch both on mount
    useEffect(() => {
        if (token) {
            eventRefetch();
            participantEventRefetch();
        }
    }, [token]);

    // Set upcoming events after fetching
    useEffect(() => {
        if (participantEventData) {
            setUpcoming(participantEventData?.upcoming_events);
        }
    }, [participantEventData]);

    // Filter events
    const events = useMemo(() => {
        if (!eventData) return [];
        const filtered = _.filter(eventData?.data?.data, (event) =>
            event?.is_posted
        );
        if (!searchQuery) return filtered;
        return filtered?.filter(event =>
            event?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event?.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [eventData, searchQuery]);


    const CardHeader = ({ data }) => (
        <Text className="text-black text-lg font-bold p-2 capitalize px-4">
            {data?.name}
        </Text>
    );

    // Loading UI
    if (eventLoading || participantEventLoading || eventRefetching || participantEventRefetching) {
        return (
            <View className="dashboard-main min-h-screen flex-1 justify-center items-center">
                <Text>Loading events...</Text>
            </View>
        );
    }

    if(!events?.length) {
        return (
            <View
                style={{
                    paddingBottom: headerHeight * 1.8
                }} 
                className="dashboard-main min-h-screen flex-1 py-4 justify-center items-center bg-white"
            >
                <Text>No event yet..</Text>
            </View>
        )
    }

    return (
        <View className="dashboard-main min-h-screen flex-1 py-4 items-center bg-white">
            <TextInput
                placeholder="Search events..."
                placeholderTextColor="#6b7280"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="border text-black border-gray-300 rounded-md p-2 mb-4 w-[95%]"
            />
            <List
                className="min-h-full w-full"
                contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    paddingBottom: headerHeight * 1.8
                }}
                data={events}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => (
                    <Card
                        status="basic"
                        header={<CardHeader data={item} />}
                        onPress={() => navigation.navigate("Event", { event: item })}
                    >
                        <Text className="text-black">{item.description}</Text>
                    </Card>
                )}
            />
        </View>
    );
};