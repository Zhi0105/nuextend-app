import React, { useEffect, useState } from 'react'
import useEventStore from '@_stores/event'
import { useHeaderHeight } from "@react-navigation/elements";
import { View, Text, TouchableOpacity } from 'react-native'
import { Card, List , Modal } from "@ui-kitten/components";
import dayjs from 'dayjs';


export const Event = ({ navigation }) => {
    const headerHeight = useHeaderHeight();
    const { upcoming } = useEventStore((state) => ({ upcoming: state.upcoming }));
    const [visible, setVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        console.log(upcoming)
    }, [upcoming])


    const setFormatDate = (date) => {
        // Assuming input is like '05-01-2025'
        const parsedDate = dayjs(date, 'MM-DD-YYYY');
        return parsedDate.isValid()
            ? parsedDate.format('MMMM D, YYYY')
            : 'Invalid Date';
    };
    return (
        <View className="event-main min-h-screen flex-1 py-4 items-center bg-white">
            <Modal
                visible={visible}
                backdropStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
                onBackdropPress={() => setVisible(false)}
            >
                <Card disabled={true}>
                    <Text className='text-2xl font-bold'>
                        Event Details:
                    </Text>
                
                    <View className='flex-row gap-2 px-4'>
                        <Text className='text-lg font-bold'>Name:</Text>
                        <Text className='break-normal text-lg capitalize'>{selectedEvent?.name}</Text>
                    </View>
                    <View className='flex-row gap-2 px-4'>
                        <Text className='text-lg font-bold'>Start date:</Text>
                        <Text className='break-normal text-lg'>{setFormatDate(selectedEvent?.start_date)}</Text>
                    </View>
                    <View className='flex-row gap-2 px-4'>
                        <Text className='text-lg font-bold'>End date:</Text>
                        <Text className='break-normal text-lg'>{setFormatDate(selectedEvent?.end_date)}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setVisible(false)}
                        className='bg-[#364190] p-2 rounded mt-4'
                    >
                        <Text className='text-white text-center font-bold'>OK</Text>
                    </TouchableOpacity>
                </Card>
            </Modal>
            <List
                className="min-h-full w-full"
                contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    paddingBottom: headerHeight * 1.8
                }}
                data={upcoming}
                renderItem={({ item }) => (
                    <Card
                        status="basic"
                    >
                        <View className='flex-row gap-2 justify-between items-center'>
                            <Text className='capitalize'>{item?.event.name}</Text>
                            <View className='flex-row gap-2'>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedEvent(item?.event);
                                        setVisible(true);
                                    }}
                                    className='bg-[#364190] p-2 rounded'
                                >
                                    <Text className='text-white font-bold'>View</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className='bg-[#364190] p-2 rounded'
                                >
                                    <Text className='text-white font-bold'>Generate QR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                )}
            />
        </View>
    )
}
