import React from 'react';
import { View } from 'react-native';
import { 
  Layout, 
  Text, 
  Card, 
  Divider, 
  Icon 
} from '@ui-kitten/components';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const ActivityDetail = ({ route }) => {
  const { activity } = route.params || {};

const setFormatDate = (date) => {
  if (!date) return 'N/A';

  // Handle numbers or timestamps
  if (typeof date === 'number') {
    const parsed = dayjs.unix(date);
    return parsed.isValid() ? parsed.format('MMMM D, YYYY') : 'Invalid Date';
  }

  // Clean up any accidental "null" or weird strings
  const cleanDate = String(date).trim();

  // Try multiple formats
  const parsed = dayjs(cleanDate, [
    "YYYY-MM-DD",
    "MM-DD-YYYY",
    "MM/DD/YYYY",
    "YYYY/MM/DD",
    "DD-MM-YYYY",
  ], true);

  // Fallback if invalid (e.g. ISO or timestamp string)
  if (!parsed.isValid()) {
    const isoParsed = dayjs(cleanDate);
    return isoParsed.isValid() ? isoParsed.format('MMMM D, YYYY') : 'Invalid Date';
  }

  return parsed.format('MMMM D, YYYY');
};

  return (
    <Layout style={{ flex: 1, backgroundColor: '#F9FAFB', padding: 16 }}>
      <Card
        style={{
          width: '100%',
          borderRadius: 16,
          elevation: 4,
        }}
        header={() => (
          <View style={{ paddingVertical: 8, paddingHorizontal: 14 }}>
            <Text category="h5" status="primary">
              Project details
            </Text>
            <Divider style={{ marginTop: 8 }} />
          </View>
        )}
      >
        <View style={{ marginTop: 8 }}>
          <Info icon="person-outline" label="Name" value={activity?.name} />
          <Divider style={{ marginVertical: 6 }} />
          <Info icon="pin-outline" label="Address" value={activity?.address} />
          <Divider style={{ marginVertical: 6 }} />
          <Info icon="file-text-outline" label="Description" value={activity?.description} />
          <Divider style={{ marginVertical: 6 }} />
          <Info icon="calendar-outline" label="Start Date" value={setFormatDate(activity?.start_date)} />
          <Divider style={{ marginVertical: 6 }} />
          <Info icon="clock-outline" label="End Date" value={setFormatDate(activity?.end_date)} />
        </View>
      </Card>
    </Layout>
  );
};

const Info = ({ label, value, icon }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
    <Icon
      name={icon}
      fill="#3366FF"
      style={{ width: 24, height: 24, marginRight: 8 }}
    />
    <View style={{ flex: 1 }}>
      <Text category="s1" appearance="hint">
        {label}
      </Text>
      <Text category="s1" style={{ color: '#1E1E1E', marginTop: 2 }}>
        {value || 'N/A'}
      </Text>
    </View>
  </View>
);
