import React from 'react';
import { View } from 'react-native';
import { Layout, Text, Card, List, Button, Divider, Icon } from '@ui-kitten/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useHeaderHeight } from '@react-navigation/elements';
import { showMessage } from 'react-native-flash-message';
import dayjs from 'dayjs';
import _ from 'lodash';

import useUserStore from '@_stores/auth';
import useEventStore from '@_stores/event';
import { storeParticipant } from '@_services/participant';

export const EventDetail = ({ route, navigation }) => {
  const queryClient = useQueryClient();
  const headerHeight = useHeaderHeight();
  const { event } = route.params || {};
  const { user, token } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    token: state.token,
  }));
  const { upcoming, setUpcoming } = useEventStore((state) => ({
    upcoming: state.upcoming,
    setUpcoming: state.setUpcoming,
  }));

  const { mutate: handleJoinEvent, isLoading: joinEventLoading } = useMutation({
    mutationFn: storeParticipant,
    onSuccess: (data) => {
      navigation.navigate('Dashboard');
      setUpcoming(data?.upcoming_events || []);
      queryClient.invalidateQueries({ queryKey: ['join-event'] });
      showMessage({
        message: 'Successfully joined',
        type: 'success',
        duration: 1000,
        floating: true,
        position: 'top',
      });
    },
    onError: (err) => {
      showMessage({
        message: err?.response?.data?.message || 'Failed to join event',
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

  const hasJoined = () => _.some(upcoming, (item) => item.event_id === event?.id);
  const setFormatDate = (date) => dayjs(date).isValid() ? dayjs(date).format('MMMM D, YYYY') : 'Invalid Date';

  if (!event) {
    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h6' appearance='hint'>No event data available.</Text>
      </Layout>
    );
  }

  const isOrgUser = _.some(user.organizations, { id: event?.organization_id });
  const joinDisabled = joinEventLoading || isOrgUser || hasJoined();

  const CardHeader = ({ title }) => (
    <View style={{ padding: 8 }}>
      <Text category='s1' style={{ fontWeight: 'bold' }}>{title}</Text>
    </View>
  );

  const renderListItem = ({ item }, type) => (
    <Card
      style={{ marginVertical: 6 }}
      header={<CardHeader title={item?.name || item?.title} />}
      onPress={() => navigation.navigate(type, { [type.toLowerCase()]: item })}
    >
      <Text>{item.body || item.description}</Text>
    </Card>
  );

  return (
    <Layout style={{ flex: 1, padding: 16 }}>
      <Card>
        <Text category='h5' style={{ marginBottom: 12, color: '#364190' }}>
          {event?.name}
        </Text>

        <Divider />

        <View style={{ marginTop: 12 }}>
          <Info label='Start Date' value={setFormatDate(event?.start_date)} />
          <Info label='End Date' value={setFormatDate(event?.end_date)} />
          <Info label='Created by' value={`${event?.user?.lastname}, ${event?.user?.firstname}`} />
          <Info label='Organization' value={event?.organization?.name} />
        </View>

        <Divider style={{ marginVertical: 16 }} />

        <View>
          <Text category='s1' style={{ fontWeight: 'bold', marginBottom: 8 }}>Skills</Text>
          {Array.isArray(event?.skills) && event.skills.length > 0 ? (
            event.skills.map((s, i) => (
              <Text key={i} style={{ marginLeft: 12 }}>• {s.name}</Text>
            ))
          ) : (
            <Text appearance='hint'>No skills listed</Text>
          )}
        </View>

        <Divider style={{ marginVertical: 16 }} />

        <Text category='s1' style={{ fontWeight: 'bold', marginBottom: 6 }}>Announcements</Text>
        {event?.announcement?.length ? (
          <List
            data={event.announcement}
            renderItem={(props) => renderListItem(props, 'Announcement')}
            contentContainerStyle={{ paddingBottom: headerHeight * 1.5 }}
          />
        ) : (
          <Text appearance='hint'>No announcements yet.</Text>
        )}

        <Divider style={{ marginVertical: 16 }} />

        <Text category='s1' style={{ fontWeight: 'bold', marginBottom: 6 }}>Project</Text>
        {event?.activity?.length ? (
          <List
            data={event.activity}
            renderItem={(props) => renderListItem(props, 'Activity')}
            contentContainerStyle={{ paddingBottom: headerHeight * 1.5 }}
          />
        ) : (
          <Text appearance='hint'>No activities yet.</Text>
        )}

        <Divider style={{ marginVertical: 16 }} />

        <Button
          onPress={joinEvent}
          disabled={joinDisabled}
          accessoryLeft={(props) =>
            joinEventLoading ? <Icon {...props} name='loader-outline' /> :
              hasJoined() ? <Icon {...props} name='checkmark-circle-2-outline' /> :
                <Icon {...props} name='person-add-outline' />}
          appearance={joinDisabled ? 'outline' : 'filled'}
          status={joinDisabled ? 'basic' : 'primary'}
        >
          {joinEventLoading
            ? 'Joining...'
            : hasJoined()
              ? 'Already Joined'
              : 'Join Event'}
        </Button>
      </Card>
    </Layout>
  );
};

// Reusable info row
const Info = ({ label, value }) => (
  <View style={{ flexDirection: 'row', marginVertical: 4 }}>
    <Text style={{ fontWeight: 'bold', width: 120 }}>{label}:</Text>
    <Text style={{ flexShrink: 1 }}>{value || 'N/A'}</Text>
  </View>
);
