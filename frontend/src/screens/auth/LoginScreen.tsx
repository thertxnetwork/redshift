import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { TextInput, Button, Text, Card, HelperText, IconButton, Surface } from 'react-native-paper';
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
    
    // Log detailed error for debugging
    console.group('🔴 Login Error Details');
    console.log('Full error object:', error);
    console.log('Error message:', error.message);
    console.log('Response data:', error.response?.data);
    console.log('Response status:', error.response?.status);
    console.groupEnd();
    
    // Network error (no response from server)
    if (!error.response) {
      if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
        return 'Network Error: Unable to connect to the server. Please check your internet connection and make sure the backend server is running.';
      }
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        return 'Request Timeout: The server is taking too long to respond. Please try again.';
      }
      return `Connection Error: ${error.message || 'Unable to reach the server'}`;
    }
    
    // Server error responses
    const statusCode = error.response?.status;
    const serverMessage = error.response?.data?.message;
    
    if (statusCode === 401 || statusCode === 422) {
      return serverMessage || 'Invalid credentials. Please check your email and password.';
    }
    
    if (statusCode && statusCode >= 500) {
      return `Server Error (${statusCode}): ${serverMessage || 'The server encountered an error. Please try again later.'}`;
    }
    
    return serverMessage || error.message || 'Login failed. Please try again.';
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Surface style={styles.logoContainer} elevation={2}>
            <IconButton
              icon="rocket-launch"
              size={50}
              iconColor="#6200ee"
            />
          </Surface>
          <Text variant="headlineLarge" style={styles.title}>
            Welcome Back
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Sign in to your account to continue
          </Text>
        </View>

        <Card style={styles.card} elevation={4}>
          <Card.Content>
            <TextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              mode="outlined"
              style={styles.input}
              error={login.isError}
              left={<TextInput.Icon icon="email-outline" />}
              disabled={login.isPending}
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
              left={<TextInput.Icon icon="lock-outline" />}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              }
              disabled={login.isPending}
            />

            {login.isError && (
              <HelperText type="error" visible={true} style={styles.errorText}>
                {getErrorMessage()}
              </HelperText>
            )}

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={login.isPending}
              disabled={login.isPending || !email || !password}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              {login.isPending ? 'Signing In...' : 'Sign In'}
            </Button>

            <View style={styles.linkContainer}>
              <Button
                mode="text"
                onPress={() => console.log('Navigate to forgot password')}
                style={styles.linkButton}
                compact
              >
                Forgot Password?
              </Button>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.registerContainer}>
          <Text variant="bodyMedium" style={styles.registerText}>
            Don't have an account?{' '}
          </Text>
          <Button
            mode="text"
            onPress={() => console.log('Navigate to register')}
            style={styles.registerButton}
            compact
          >
            Register Now
          </Button>
        </View>

        <Surface style={styles.testCredentials} elevation={1}>
          <Text variant="titleSmall" style={styles.testCredentialsTitle}>
            🔐 Test Credentials
          </Text>
          <View style={styles.credentialRow}>
            <Text variant="bodySmall" style={styles.credentialLabel}>Admin:</Text>
            <Text variant="bodySmall" style={styles.credentialValue}>
              admin@redshift.com / password
            </Text>
          </View>
          <View style={styles.credentialRow}>
            <Text variant="bodySmall" style={styles.credentialLabel}>User:</Text>
            <Text variant="bodySmall" style={styles.credentialValue}>
              user@redshift.com / password
            </Text>
          </View>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingTop: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3e5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
  },
  card: {
    elevation: 8,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  errorText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  linkContainer: {
    alignItems: 'center',
  },
  linkButton: {
    marginTop: 4,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  registerText: {
    color: '#666',
  },
  registerButton: {
    marginLeft: -8,
  },
  testCredentials: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#90caf9',
  },
  testCredentialsTitle: {
    textAlign: 'center',
    color: '#1565c0',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  credentialRow: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  credentialLabel: {
    color: '#1976d2',
    fontWeight: '600',
    minWidth: 50,
  },
  credentialValue: {
    color: '#1976d2',
    flex: 1,
  },
});

