import React, { useEffect, useState } from 'react'
import useEventStore from '@_stores/event'
import { useHeaderHeight } from "@react-navigation/elements";
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Card, List , Modal } from "@ui-kitten/components";
import RNQRGenerator from 'rn-qr-generator';
import dayjs from 'dayjs';


export const Event = ({ navigation }) => {
    const headerHeight = useHeaderHeight();
    const { upcoming } = useEventStore((state) => ({ upcoming: state.upcoming }));
    const [visible, setVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [qrUri, setQrUri] = useState(null);
    const [qrVisible, setQrVisible] = useState(false);


    const setFormatDate = (date) => {
        // Assuming input is like '05-01-2025'
        const parsedDate = dayjs(date, 'MM-DD-YYYY');
        return parsedDate.isValid()
            ? parsedDate.format('MMMM D, YYYY')
            : 'Invalid Date';
    };
    const handleGenerateQR = (participant) => {
        RNQRGenerator.generate({
            value: `${JSON.stringify({
                participant_id: participant?.id
            })}`,
            height: 100,
            width: 100,
        })
        .then(response => {
            const { uri } = response;
            setQrUri(uri);
            setQrVisible(true);
        })
        .catch(error => console.log('Cannot create QR code', error));
    }

    if(!upcoming?.length) {
        return (
            <View className="event-main min-h-screen flex-1 py-4 items-center bg-white">
                <Text>No upcoming events.</Text>
            </View>
        )
    }


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
                    <Text className='text-gray-400 text-2xl font-bold'>
                        Event Details:
                    </Text>
                
                    <View className='flex-row gap-2 px-4'>
                        <Text className='text-black text-lg font-bold'>Name:</Text>
                        <Text className='text-black break-normal text-lg capitalize'>{selectedEvent?.name}</Text>
                    </View>
                    <View className='flex-row gap-2 px-4'>
                        <Text className='text-black text-lg font-bold'>Start date:</Text>
                        <Text className='text-black break-normal text-lg'>{setFormatDate(selectedEvent?.start_date)}</Text>
                    </View>
                    <View className='flex-row gap-2 px-4'>
                        <Text className='text-black text-lg font-bold'>End date:</Text>
                        <Text className='text-black break-normal text-lg'>{setFormatDate(selectedEvent?.end_date)}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setVisible(false)}
                        className='bg-[#364190] p-2 rounded mt-4'
                    >
                        <Text className='text-white text-center font-bold'>OK</Text>
                    </TouchableOpacity>
                </Card>
            </Modal>

            <Modal
                visible={qrVisible}
                backdropStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
                onBackdropPress={() => {
                    setQrVisible(false);
                    setQrUri(null);
                }}
            >
                <Card disabled={true} style={{ alignItems: 'center' }}>
                    <Text className='text-gray-500 text-2xl font-bold mb-2'>Your QR Code</Text>
                    {qrUri && (
                        <Image
                            source={{ uri: qrUri }}
                            style={{ width: 200, height: 200 }}
                            resizeMode='contain'
                        />
                    )}
                    <TouchableOpacity
                        onPress={() => setQrVisible(false)}
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
                            <Text className='text-black capitalize'>{item?.event.name}</Text>
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
                                    onPress={() => handleGenerateQR(item)}
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
