import React from 'react';
import { View } from 'react-native';
import { Layout, Text, List, Card } from '@ui-kitten/components';

export const Completed = ({ route }) => {
 const { events } = route.params; // 👈 retrieve passed state

  return (
    <Layout style={{ flex: 1, padding: 16 }}>
      <Text category="h5" style={{ marginBottom: 12 }}>📜 Participation History</Text>

      {events && events.length > 0 ? (
        <List
          data={events}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 10 }}>
              <Text category="s1">{item?.event?.name}</Text>
              <Text appearance="hint">{item?.event?.implement_date}</Text>
            </Card>
          )}
        />
      ) : (
        <Text appearance="hint">No history available.</Text>
      )}
    </Layout>
  );
}
