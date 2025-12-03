import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { TextInput, Button, Text, Card, HelperText } from 'react-native-paper';
import { useLogin } from '@/hooks/useAuth';
import type { LoginCredentials, ApiErrorResponse } from '@/types';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const login = useLogin();

  const handleLogin = () => {
    if (!email || !password) {
      return;
    }

    const credentials: LoginCredentials = {
      email: email.trim(),
      password,
    };

    login.mutate(credentials);
  };

  const getErrorMessage = (): string => {
    if (!login.error) return '';
    const error = login.error as ApiErrorResponse;
    return error.response?.data?.message || error.message || 'Login failed. Please try again.';
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineLarge" style={styles.title}>
              Welcome Back
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Sign in to continue
            </Text>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              mode="outlined"
              style={styles.input}
              error={login.isError}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
              autoComplete="password"
              mode="outlined"
              style={styles.input}
              error={login.isError}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye' : 'eye-off'}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              }
            />

            {login.isError && (
              <HelperText type="error" visible={true}>
                {getErrorMessage()}
              </HelperText>
            )}

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={login.isPending}
              disabled={login.isPending || !email || !password}
              style={styles.button}
            >
              Sign In
            </Button>

            <Button
              mode="text"
              onPress={() => console.log('Navigate to register')}
              style={styles.linkButton}
            >
              Don't have an account? Register
            </Button>

            <Button
              mode="text"
              onPress={() => console.log('Navigate to forgot password')}
              style={styles.linkButton}
            >
              Forgot Password?
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.testCredentials}>
          <Text variant="bodySmall" style={styles.testCredentialsText}>
            Test Credentials:
          </Text>
          <Text variant="bodySmall" style={styles.testCredentialsText}>
            Admin: admin@redshift.com / password
          </Text>
          <Text variant="bodySmall" style={styles.testCredentialsText}>
            User: user@redshift.com / password
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  linkButton: {
    marginTop: 4,
  },
  testCredentials: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  testCredentialsText: {
    textAlign: 'center',
    color: '#1976d2',
    marginBottom: 4,
  },
});

