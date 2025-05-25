import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Card } from '@ui-kitten/components';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export const EventDetail = ({ route, navigation }) => {
    dayjs.extend(customParseFormat);
    const { event } = route.params;


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
            <Card className='w-full mx-4'>
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
                    <TouchableOpacity
                        onPress={() => console.log("join button pressed!")} 
                        className='w-full bg-[#364190] p-2 rounded-sm'
                    >
                        <Text className='text-center text-white'>Join</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        </View>
    )
}
