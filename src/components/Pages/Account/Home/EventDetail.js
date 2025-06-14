import React from 'react'
import useUserStore from '@_stores/auth';
import useEventStore from '@_stores/event';
import { Text, View, TouchableOpacity } from 'react-native'
import { Card } from '@ui-kitten/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showMessage } from "react-native-flash-message";
import { storeParticipant } from '@_services/participant';
import dayjs from 'dayjs';
import _ from 'lodash';

export const EventDetail = ({ route, navigation }) => {
    const queryClient = useQueryClient();
    const { event } = route.params || {};
    const { user, token } = useUserStore((state) => ({ user: state.user, setUser: state.setUser, token: state.token }));
    const { upcoming, setUpcoming } = useEventStore((state) => ({ upcoming: state.upcoming, setUpcoming: state.setUpcoming }));

    const { mutate: handleJoinEvent, isLoading: joinEventLoading } = useMutation({
        mutationFn: storeParticipant,
        onSuccess: (data) => {
            navigation.navigate("Dashboard");
            setUpcoming(data?.upcoming_events || []);
            queryClient.invalidateQueries({ queryKey: ['join-event'] });
            showMessage({
                message: "Successfully joined",
                type: 'success',
                duration: 1000,
                floating: true,
                position: 'top',
            });
        },
        onError: (err) => {
            showMessage({
                message: err?.response?.data?.message || "Failed to join event",
                type: 'warning',
                duration: 1000,
                floating: true,
                position: 'top',
            });
        },
    });

    const joinEvent = () => {
        if (!user?.id || !event?.id) return;
        handleJoinEvent({
            token,
            user_id: user.id,
            event_id: event.id,
        });
    };

    const hasJoined = () => {
        return _.some(upcoming, (item) => item.event_id === event?.id);
    };

    const setFormatDate = (date) => {
        const parsed = dayjs(date);
        return parsed.isValid() ? parsed.format('MMMM D, YYYY') : 'Invalid Date';
    };

    if (!event) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-lg text-gray-600">No event data available.</Text>
            </View>
        );
    }

    const isOrgUser = _.some(user.organizations, { id: event?.organization_id });
    const joinDisabled = joinEventLoading || isOrgUser || hasJoined();

    return (
        <View className="w-full event-detail-main min-h-screen flex-1 py-4 items-center bg-white px-4">
            <Card className="w-full px-4">
                <Text className="text-gray-500 text-2xl font-bold">
                    Event Details:
                </Text>

                <View className="detail flex-col gap-2 mt-4">
                    <Info label="Name" value={event?.name} />
                    <Info label="Start date" value={setFormatDate(event?.start_date)} />
                    <Info label="End date" value={setFormatDate(event?.end_date)} />
                    <View className="flex gap-2 px-4">
                        <Text className="text-black text-lg font-bold">Skills:</Text>
                        {(Array.isArray(event?.skills) && event.skills.length > 0)
                            ? event.skills.map((item, idx) => (
                                <Text className="text-black text-lg indent-10" key={idx}>- {item?.name}</Text>
                            ))
                            : <Text className="text-black text-lg italic ml-2">No skills listed</Text>}
                    </View>
                    <Info label="Created by" value={`${event?.user?.lastname}, ${event?.user?.firstname} ${event?.user?.middlename}`} />
                    <Info label="Date Creation" value={dayjs(event?.created_at).format('MMMM D, YYYY')} />
                    <View className="flex-col gap-2 px-4">
                        <Text className="text-black text-lg font-bold">Organization:</Text>
                        <Text className="text-black text-lg capitalize">{event?.organization?.name}</Text>
                    </View>
                    <View className="flex-col gap-2 px-4">
                        <Text className="text-black text-lg font-bold">Department:</Text>
                        <Text className="text-black text-lg capitalize">{event?.user?.department?.name}</Text>
                    </View>
                    <View className="flex-col gap-2 px-4">
                        <Text className="text-black text-lg font-bold">Program:</Text>
                        <Text className="text-black text-lg capitalize">{event?.user?.program?.name}</Text>
                    </View>
                    <View className="flex-col gap-2 px-4">
                        <Text className="text-black text-lg font-bold">Address:</Text>
                        <Text className="text-black text-lg capitalize">{event?.address}</Text>
                    </View>
                    <View className="flex-col gap-2 px-4">
                        <Text className="text-black text-lg font-bold">Description:</Text>
                        <Text className="text-black text-lg capitalize">{event?.description}</Text>
                    </View>

                    <TouchableOpacity
                        disabled={joinDisabled}
                        onPress={joinEvent}
                        className={`${joinDisabled ? "bg-gray-400" : 'bg-[#364190]'} w-full p-2 rounded-sm`}
                    >
                        <Text className="text-center text-white">
                            {joinEventLoading
                                ? "Please wait..."
                                : hasJoined()
                                    ? "Already joined"
                                    : "Join"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Card>
        </View>
    );
};

// Reusable info row
const Info = ({ label, value }) => (
    <View className="flex-row gap-2 px-4">
        <Text className="text-black text-lg font-bold">{label}:</Text>
        <Text className="text-black break-normal text-lg capitalize">{value || 'N/A'}</Text>
    </View>
);
