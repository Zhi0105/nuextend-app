import React from 'react'
import { Text, View } from 'react-native'
import { Card } from '@ui-kitten/components';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import _ from 'lodash';

export const ActivityDetail = ({ route, navigation }) => {
    const { activity } = route.params || {};
    dayjs.extend(customParseFormat);

    const setFormatDate = (date) => {
        if (!date) return 'N/A';

        const parsed = dayjs(date, ["MM-DD-YYYY", "YYYY-MM-DD", "MM/DD/YYYY"]); 
        return parsed.isValid() ? parsed.format('MMMM D, YYYY') : 'Invalid Date';
    };
        
    return (
        <View className="w-full event-detail-main min-h-screen flex-1 py-4 items-center bg-white px-4">
            <Card className="w-full px-4">
                <Text className="text-gray-500 text-2xl font-bold">
                    Activity Details:
                </Text>

                <View className="detail flex-col gap-2 mt-4">
                    <Info label="Name" value={activity?.name} />
                    <Info label="Address" value={activity?.address} />
                    <Info label="Description" value={activity?.description} />
                    <Info label="Start date" value={setFormatDate(activity?.start_date)} />
                    <Info label="End date" value={setFormatDate(activity?.end_date)} />
                </View>
            </Card>
        </View>
    )
}

// Reusable info row
const Info = ({ label, value }) => (
    <View className="flex-row gap-2 px-4">
        <Text className="text-black text-lg font-bold">{label}:</Text>
        <Text className="text-black break-normal text-lg capitalize">{value || 'N/A'}</Text>
    </View>
);
