import { useState, useMemo, useEffect } from "react";
import { TextInput } from "react-native";
import { Layout, Text, Card, List, Select, SelectItem, Divider, Spinner } from "@ui-kitten/components";
import { useHeaderHeight } from "@react-navigation/elements";
import useUserStore from "@_stores/auth";
import useEventStore from "@_stores/event";
import { getEvents } from "@_services/event";
import { getParticipantEvents } from "@_services/participant";
import { getSkills } from "@_services/skill";
import { IndexPath } from "@ui-kitten/components";
import _ from "lodash";

export const Dashboard = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const { data: skillData } = getSkills();
  const { user, token } = useUserStore((state) => ({ user: state.user, token: state.token }));
  const { setUpcoming } = useEventStore((state) => ({ setUpcoming: state.setUpcoming }));

  const {
    data: eventData,
    isLoading: eventLoading,
    refetch: eventRefetch,
    isRefetching: eventRefetching,
  } = getEvents({ token }, { enabled: !!token && token.length > 0 });

  const {
    data: participantEventData,
    isLoading: participantEventLoading,
    refetch: participantEventRefetch,
    isRefetching: participantEventRefetching,
  } = getParticipantEvents(user.id);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(new IndexPath(0));

  useEffect(() => {
    if (token) {
      eventRefetch();
      participantEventRefetch();
    }
  }, [token]);

  useEffect(() => {
    if (participantEventData) {
      setUpcoming(participantEventData?.upcoming_events);
    }
  }, [participantEventData]);

  const events = useMemo(() => {
    if (!eventData) return [];
    const filtered = _.filter(eventData?.data?.data, (event) => event?.is_posted);

    let results = filtered;
    if (searchQuery) {
      results = results.filter(
        (event) =>
          event?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event?.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const selectedSkill = skillData?.data?.[selectedSkillIndex.row];
    if (selectedSkill && selectedSkill?.name !== "All") {
      results = results.filter((event) =>
        event?.skills?.some((skill) => skill.name === selectedSkill.name)
      );
    }

    return results;
  }, [eventData, searchQuery, selectedSkillIndex, skillData]);

  const CardHeader = ({ data }) => (
    <Text category="h6" style={{ textTransform: "capitalize", padding: 8 }}>
      {data?.name}
    </Text>
  );

  if (eventLoading || participantEventLoading || eventRefetching || participantEventRefetching) {
    return (
      <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size="large" />
        <Text category="s1" style={{ marginTop: 8 }}>Loading events...</Text>
      </Layout>
    );
  }


  return (
    <Layout style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
      {/* 🔍 Search Bar */}
      <TextInput
        placeholder="Search events..."
        placeholderTextColor="#9CA3AF"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          borderWidth: 1,
          borderColor: "#D1D5DB",
          borderRadius: 8,
          padding: 10,
          color: "black",
          marginBottom: 12,
        }}
      />

      {/* 🎯 Skill Filter */}
      <Select
        selectedIndex={selectedSkillIndex}
        onSelect={(index) => setSelectedSkillIndex(index)}
        placeholder="Filter by skills"
        value={skillData?.data?.[selectedSkillIndex.row]?.name || "Select skill"}
        style={{ marginBottom: 16 }}
      >
        {skillData?.data?.map((skill, index) => (
          <SelectItem key={index} title={skill.name} />
        ))}
      </Select>

      <Divider />

      {/* 🏷 Label for Events */}
      <Text category="h5" appearance="hint" style={{ marginVertical: 8, marginLeft: 4 }}>
        📅 List of Events
      </Text>

      {/* 🧾 Event List */}
      {events?.length > 0 ? (
        <List
            contentContainerStyle={{
                paddingBottom: headerHeight * 1.8,
            }}
            data={events}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => {
                // ✂️ Truncate description to 50 chars
                const truncatedDesc =
                item?.description && item.description.length > 120
                    ? `${item.description.slice(0, 120)}...`
                    : item?.description || "No description available.";

                return (
                <Card
                    style={{
                    marginVertical: 8,
                    borderRadius: 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    elevation: 2,
                    }}
                    status="basic"
                    header={<CardHeader data={item} />}
                    onPress={() => navigation.navigate("Event", { event: item })}
                >
                    <Text category="p2" appearance="default">
                    {truncatedDesc}
                    </Text>

                    {/* 🗓️ Event Date */}
                    {item?.implement_date && (
                    <Text
                        category="c1"
                        appearance="hint"
                        style={{ marginTop: 8, fontStyle: "italic" }}
                    >
                        Schedule:
                        {_.isDate(new Date(item.implement_date))
                        ? new Date(item.implement_date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            })
                        : "No date available"}
                    </Text>
                    )}
                </Card>
                );
            }}
        />
      ) : (
        <Layout
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: headerHeight * 1.8,
          }}
        >
          <Text appearance="hint">No event yet...</Text>
        </Layout>
      )}
    </Layout>
  );
};
