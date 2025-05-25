import { useState, useMemo } from "react";
import { Text, View, TextInput } from "react-native";
import useUserStore from "@_stores/auth";
import { useHeaderHeight } from "@react-navigation/elements";
import { getEvents } from "@_services/event";
import { Card, List } from "@ui-kitten/components";
import _ from "lodash";

export const Dashboard = ({ navigation }) => {
    const headerHeight = useHeaderHeight();
    const { token } = useUserStore((state) => ({ token: state.token }));
    const { data: eventData, isLoading: eventLoading } = getEvents({ token });
    const [searchQuery, setSearchQuery] = useState("");

    const events = useMemo(() => {
        if (!eventData) return [];
        const filtered = _.filter(eventData?.data?.data, (event) =>
            [2].includes(event.event_status_id)
        );
        if (!searchQuery) return filtered;
        return filtered.filter(event =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [eventData, searchQuery]);

    const CardHeader = ({ data }) => (
        <Text className="text-lg font-bold p-2 capitalize px-4">
            {data?.name}
        </Text>
    );

    if (eventLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Event Loading...</Text>
            </View>
        );
    }

    return (
        <View className="dashboard-main min-h-screen flex-1 py-4 items-center bg-white">
            <TextInput
                placeholder="Search events..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="border border-gray-300 rounded-md p-2 mb-4 w-[95%]"
            />
            <List
                className="min-h-full w-full"
                contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    paddingBottom: headerHeight * 1.8
                }}
                data={events}
                renderItem={({ item }) => (
                    <Card
                        status="basic"
                        header={<CardHeader data={item} />}
                        onPress={() => navigation.navigate("Event", { event: item })}
                    >
                        <Text>{item.description}</Text>
                    </Card>
                )}
            />
        </View>
    );
};