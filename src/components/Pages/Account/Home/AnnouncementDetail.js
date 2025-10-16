import React from 'react';
import { ScrollView } from 'react-native';
import { Layout, Text, Card, Divider, Icon } from '@ui-kitten/components';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const AnnouncementDetail = ({ route }) => {
  const { announcement } = route.params || {};

  const setFormatDate = (date) => {
    if (!date) return 'N/A';
    let parsed = dayjs(date, ["YYYY-MM-DD", "MM-DD-YYYY", "MM/DD/YYYY", dayjs.ISO_8601], true);
    parsed = parsed.isValid() ? parsed.local() : null;
    return parsed ? parsed.format('MMMM D, YYYY') : 'Invalid Date';
  };

  return (
    <Layout style={{ flex: 1, backgroundColor: '#F7F9FC', paddingHorizontal: 16, paddingTop: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={{ borderRadius: 16, padding: 16 }}>

          <Text category='h6' style={{ marginBottom: 8, fontWeight: '700', color: '#3366FF' }}>
            📢 Announcement Details
          </Text>

          <Divider style={{ marginVertical: 8 }} />

          <Info label="Title" value={announcement?.title} icon="file-text-outline" />
          <Divider style={{ marginVertical: 6 }} />

          <Info label="Body" value={announcement?.body} icon="message-square-outline" multiline />
          <Divider style={{ marginVertical: 6 }} />

          <Info label="Created Date" value={setFormatDate(announcement?.created_at)} icon="calendar-outline" />

        </Card>
      </ScrollView>
    </Layout>
  );
};

const Info = ({ label, value, icon, multiline }) => (
  <Layout style={{ marginVertical: 4 }}>
    <Layout style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
      <Icon name={icon} fill="#3366FF" style={{ width: 20, height: 20, marginRight: 6 }} />
      <Text category='s1' style={{ fontWeight: '600', color: '#222B45' }}>
        {label}
      </Text>
    </Layout>

    <Text
      appearance='hint'
      category='p1'
      style={{
        color: '#4A4A4A',
        lineHeight: 22,
        textAlign: 'justify',
        textTransform: 'none',
      }}
      numberOfLines={multiline ? 0 : 2}
    >
      {value || 'N/A'}
    </Text>
  </Layout>
);
