import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Text, Divider } from 'react-native-paper';
import { useAuthStore } from '@/store/authStore';
import { useLogout } from '@/hooks/useAuth';
import { useUnreadCount } from '@/hooks/useNotifications';

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
  const { data: unreadData } = useUnreadCount();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Welcome, {user?.name}!
          </Text>
          <Text variant="bodyMedium" style={styles.email}>
            {user?.email}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Your Profile
          </Text>
          <Divider style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={styles.label}>
              Name:
            </Text>
            <Text variant="bodyMedium" style={styles.value}>
              {user?.name}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={styles.label}>
              Email:
            </Text>
            <Text variant="bodyMedium" style={styles.value}>
              {user?.email}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={styles.label}>
              Phone:
            </Text>
            <Text variant="bodyMedium" style={styles.value}>
              {user?.phone || 'Not set'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={styles.label}>
              Email Verified:
            </Text>
            <Text variant="bodyMedium" style={styles.value}>
              {user?.email_verified_at ? 'Yes' : 'No'}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Roles & Permissions
          </Text>
          <Divider style={styles.divider} />
          
          <Text variant="bodyMedium" style={styles.label}>
            Roles:
          </Text>
          {user?.roles && user.roles.length > 0 ? (
            user.roles.map((role) => (
              <View key={role.id} style={styles.chip}>
                <Text variant="bodySmall">{role.name}</Text>
              </View>
            ))
          ) : (
            <Text variant="bodyMedium" style={styles.value}>
              No roles assigned
            </Text>
          )}

          <Text variant="bodyMedium" style={[styles.label, styles.marginTop]}>
            Permissions: {user?.permissions?.length || 0}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Notifications
          </Text>
          <Divider style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={styles.label}>
              Unread:
            </Text>
            <Text variant="bodyMedium" style={styles.value}>
              {unreadData?.count || 0}
            </Text>
          </View>

          <Button
            mode="outlined"
            onPress={() => console.log('Navigate to notifications')}
            style={styles.marginTop}
          >
            View Notifications
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Quick Actions
          </Text>
          <Divider style={styles.divider} />
          
          <Button
            mode="outlined"
            onPress={() => console.log('Navigate to profile')}
            style={styles.actionButton}
          >
            Edit Profile
          </Button>

          <Button
            mode="outlined"
            onPress={() => console.log('Navigate to settings')}
            style={styles.actionButton}
          >
            Settings
          </Button>

          {user?.roles?.some((role) => role.name === 'super_admin' || role.name === 'admin') && (
            <Button
              mode="outlined"
              onPress={() => console.log('Navigate to admin')}
              style={styles.actionButton}
            >
              Admin Panel
            </Button>
          )}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleLogout}
        loading={logout.isPending}
        disabled={logout.isPending}
        style={styles.logoutButton}
        buttonColor="#d32f2f"
      >
        Logout
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: '#666',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontWeight: '600',
    color: '#666',
  },
  value: {
    color: '#333',
  },
  chip: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  marginTop: {
    marginTop: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  logoutButton: {
    marginBottom: 32,
  },
});
