import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Settings, Bell, ClipboardList, LogOut } from 'lucide-react-native';

const mockUser = {
  name: 'Ahde Vefa',
  role: 'Volunteer Coordinator',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4LwfBL7FK4ux4_ignG112PwaoN1aYWrB6Q&s',
};

const menuItems = [
  {
    icon: Settings,
    title: 'Settings',
    subtitle: 'App preferences and account settings',
  },
  {
    icon: Bell,
    title: 'Notifications',
    subtitle: 'Manage your notification preferences',
  },
  {
    icon: ClipboardList,
    title: 'My Tasks',
    subtitle: 'View your assigned tasks and history',
  },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{mockUser.name}</Text>
        <Text style={styles.role}>{mockUser.role}</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <item.icon size={24} color="#64748b" />
            <View style={styles.menuItemText}>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={24} color="#ef4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#64748b',
  },
  menu: {
    backgroundColor: 'white',
    marginTop: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  menuItemText: {
    marginLeft: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 24,
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#ef4444',
  },
});