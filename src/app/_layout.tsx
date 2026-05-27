import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/theme';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

function RootNavigator() {
  const { loading } = useAuth();
  const colors = Colors.light;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="car-detail"
        options={{
          headerShown: true,
          headerTitle: 'Detail Mobil',
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.background },
        }}
      />
      <Stack.Screen
        name="auth/login"
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
});