import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Calendar, MapPin, Users } from 'lucide-react-native';

const mockEvents = [
  {
    id: '1',
    title: 'Food Distribution',
    date: '2024-02-20',
    location: 'Central Community Center',
    volunteers: 12,
    type: 'Food',
  },
  {
    id: '2',
    title: 'Medical Supply Distribution',
    date: '2024-02-22',
    location: 'North District',
    volunteers: 8,
    type: 'Medical',
  },
];

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Events</Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Event</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <View style={styles.eventDetails}>
              <View style={styles.detailRow}>
                <Calendar size={16} color="#64748b" />
                <Text style={styles.detailText}>{item.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <MapPin size={16} color="#64748b" />
                <Text style={styles.detailText}>{item.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Users size={16} color="#64748b" />
                <Text style={styles.detailText}>{item.volunteers} volunteers</Text>
              </View>
            </View>
            <View style={styles.typeTag}>
              <Text style={styles.typeText}>{item.type}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  createButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  eventDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#64748b',
    fontSize: 14,
  },
  typeTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeText: {
    color: '#0284c7',
    fontSize: 12,
    fontWeight: '500',
  },
});