import React from 'react'
import useUserStore from '@_stores/auth';
import useEventStore from '@_stores/event';
import { Text, View, TouchableOpacity } from 'react-native'
import { Card } from '@ui-kitten/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showMessage } from "react-native-flash-message";
import { storeParticipant } from '@_services/participant';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

export const EventDetail = ({ route, navigation }) => {
    dayjs.extend(customParseFormat);
    const queryClient = useQueryClient();
    const { event } = route.params;
    const { user, token } = useUserStore((state) => ({ user: state.user, setUser: state.setUser, token: state.token }));
    const { setUpcoming } = useEventStore((state) => ({ setUpcoming: state.setUpcoming }));
    const { mutate: handleJoinEvent, isLoading: joinEventLoading} = useMutation({
        mutationFn: storeParticipant,
            onSuccess: (data) => {
                navigation.navigate("Dashboard")
                setUpcoming(data?.upcoming_events)
                queryClient.invalidateQueries({ queryKey: ['join-event'] });
                showMessage({
                message: "successfully joined",
                type: 'success',
                duration: 1000,
                floating: true,
                position: 'top',
            })
            }, 
            onError: (err) => {  
            showMessage({
                message: err.response.data.message,
                type: 'warning',
                duration: 1000,
                floating: true,
                position: 'top',
            })
            },
    });

    const joinEvent = () => {
        handleJoinEvent({
            token,
            user_id: user?.id,
            event_id: event?.id,
        })
    }

    const setFormatDate = (date) => {
    // Assuming input is like '05-01-2025'
    const parsedDate = dayjs(date, 'MM-DD-YYYY');
    return parsedDate.isValid()
        ? parsedDate.format('MMMM D, YYYY')
        : 'Invalid Date';
    };

    return (
        <View 
            className="w-full event-detail-main min-h-screen flex-1 py-4 items-center bg-white px-4"
        >
            <Card className='w-full px-4'>
                <Text className='text-2xl font-bold'>
                    Event Details:
                </Text>

                <View className='detail flex-col gap-2 mt-4'>
                    <View className='flex-row gap-2 px-4'>
                        <Text className='text-lg font-bold'>Name:</Text>
                        <Text className='break-normal text-lg capitalize'>{event?.name}</Text>
                    </View>
                    <View className='flex-row gap-2 px-4'>
                        <Text className='text-lg font-bold'>Start date:</Text>
                        <Text className='break-normal text-lg'>{setFormatDate(event?.start_date)}</Text>
                    </View>
                    <View className='flex-row gap-2 px-4'>
                        <Text className='text-lg font-bold'>End date:</Text>
                        <Text className='break-normal text-lg'>{setFormatDate(event?.end_date)}</Text>
                    </View>
                    <View className='flex-row gap-2 px-4'>
                        <Text className='text-lg font-bold'>Address:</Text>
                        <Text className='break-normal text-lg capitalize'>{event?.address}</Text>
                    </View>
                    <View className='flex-col gap-2 px-4'>
                        <Text className='text-lg font-bold'>Description:</Text>
                        <Text className='text-lg capitalize'>{event?.description}</Text>
                    </View>
                    <TouchableOpacity
                        disabled={joinEventLoading}
                        onPress={joinEvent} 
                        className='w-full bg-[#364190] p-2 rounded-sm'
                    >
                        <Text className='text-center text-white'>
                            {joinEventLoading ? "Please wait..." : "Join"}  
                        </Text>
                    </TouchableOpacity>
                </View>
            </Card>
        </View>
    )
}
