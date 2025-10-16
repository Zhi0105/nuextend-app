import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Layout, Text, Card, List, Modal, Button, Icon } from '@ui-kitten/components';
import useEventStore from '@_stores/event';
import { useHeaderHeight } from "@react-navigation/elements";
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
    const parsedDate = dayjs(date, 'MM-DD-YYYY');
    return parsedDate.isValid()
      ? parsedDate.format('MMMM D, YYYY')
      : 'Invalid Date';
  };

  const handleGenerateQR = (participant) => {
    RNQRGenerator.generate({
      value: JSON.stringify({
        participant_id: participant?.id
      }),
      height: 150,
      width: 150,
    })
      .then(response => {
        const { uri } = response;
        setQrUri(uri);
        setQrVisible(true);
      })
      .catch(error => console.log('Cannot create QR code', error));
  };

  if (!upcoming?.length) {
    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text category="h6" appearance="hint">No upcoming events.</Text>
      </Layout>
    );
  }

  const renderEventItem = ({ item }) => (
    <Card
      style={{
        marginVertical: 8,
        borderRadius: 12,
        shadowOpacity: 0.2,
        elevation: 2,
      }}
      header={() => (
        <View style={{ padding: 12, backgroundColor: '#f5f6fa', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
          <Text category="h6" style={{ textTransform: 'capitalize', color: '#222B45' }}>
            {item?.event.name}
          </Text>
        </View>
      )}
      footer={() => (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 8, paddingBottom: 8 }}>
          <Button
            size="small"
            style={{ marginRight: 8, borderRadius: 8 }}
            onPress={() => {
              setSelectedEvent(item?.event);
              setVisible(true);
            }}
          >
            View
          </Button>
          <Button
            size="small"
            status="primary"
            appearance="filled"
            style={{ borderRadius: 8 }}
            onPress={() => handleGenerateQR(item)}
          >
            Generate QR
          </Button>
        </View>
      )}
    >
      <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
        <Text category="s1" appearance="hint">
          Schedule:
        </Text>
        <Text category="s1">{setFormatDate(item?.event.implement_date)}</Text>
      </View>
    </Card>
  );

  return (
    <View>
        <Text category="h5" appearance="hint" style={{ marginVertical: 8, marginLeft: 4 }}>
            📅 List of Events
        </Text>
        <Button
            size="small"
            style={{ borderRadius: 8, marginHorizontal: 12, marginBottom: 12 }}
            onPress={() => navigation.navigate('Completed', { events: upcoming.filter(item => item?.event?.event_status_id === 2) })}
        >
            View History
        </Button>
        <Layout style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        {/* Event Details Modal */}
        <Modal
            visible={visible}
            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            onBackdropPress={() => setVisible(false)}
        >
            <Card disabled={true} style={{ borderRadius: 12, width: 300 }}>
            <Text category="h6" style={{ textAlign: 'center', marginBottom: 12, color: '#364190' }}>
                Event Details
            </Text>

            <View style={{ marginBottom: 12 }}>
                <Text category="label" appearance="hint">Name:</Text>
                <Text category="s1" style={{ textTransform: 'capitalize' }}>
                {selectedEvent?.name}
                </Text>
            </View>

            <View>
                <Text category="label" appearance="hint">Schedule:</Text>
                <Text category="s1">{setFormatDate(selectedEvent?.implement_date)}</Text>
            </View>

                <View style={{ marginBottom: 12 }}>
                    <Text category="label" appearance="hint">Description:</Text>
                    <Text category="s1" appearance="default">
                        {selectedEvent?.description || 'No description provided.'}
                    </Text>
                </View>

            <Button
                style={{ marginTop: 16, borderRadius: 8 }}
                onPress={() => setVisible(false)}
            >
                OK
            </Button>
            </Card>
        </Modal>

        {/* QR Code Modal */}
        <Modal
            visible={qrVisible}
            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            onBackdropPress={() => {
            setQrVisible(false);
            setQrUri(null);
            }}
        >
            <Card disabled={true} style={{ alignItems: 'center', borderRadius: 12 }}>
                <Text category="h6" style={{ color: '#364190', marginBottom: 8 }}>Your QR Code</Text>
                {qrUri && (
                    <Image
                    source={{ uri: qrUri }}
                    style={{ width: 200, height: 200, marginVertical: 12 }}
                    resizeMode="contain"
                    />
                )}
                <Button
                    style={{ borderRadius: 8 }}
                    onPress={() => setQrVisible(false)}
                >
                    OK
                </Button>
            </Card>
        </Modal>

        {/* Event List */}
        <List
            style={{ flex: 1 }}
            contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            paddingBottom: headerHeight * 1.8,
            }}
            // data={upcoming}
            data={upcoming.filter(item => item?.event?.event_status_id !== 2)} // ✅ filter out status_id 2
            renderItem={renderEventItem}
        />
        
        </Layout>
    </View>

  );
};
