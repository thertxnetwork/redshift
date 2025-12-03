import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { TextInput, Button, Text, Card, HelperText } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useLogin } from '@/hooks/useAuth';
import type { LoginCredentials, ApiErrorResponse } from '@/types';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const login = useLogin();

  // Log detailed error information when login fails
  useEffect(() => {
    if (login.error) {
      const error = login.error as ApiErrorResponse;
      console.error('Login Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    }
  }, [login.error]);

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
    
    // Check for network error (no response from server)
    if (!error.response && error.message) {
      if (error.message.toLowerCase().includes('network')) {
        return 'Network Error: Cannot connect to server. Please check if the backend is running.';
      }
      if (error.message.toLowerCase().includes('timeout')) {
        return 'Request Timeout: The server took too long to respond.';
      }
      return `Connection Error: ${error.message}`;
    }
    
    return error.response?.data?.message || error.message || 'Login failed. Please try again.';
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* App Title */}
            <View style={styles.header}>
              <Text variant="displaySmall" style={styles.appTitle}>
                Redshift
              </Text>
              <Text variant="titleMedium" style={styles.appSubtitle}>
                Full-Stack Mobile Application
              </Text>
            </View>

            <Card style={styles.card} elevation={5}>
              <Card.Content>
                <Text variant="headlineMedium" style={styles.title}>
                  Welcome Back
                </Text>
                <Text variant="bodyLarge" style={styles.subtitle}>
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
                  left={<TextInput.Icon icon="email" />}
                  disabled={login.isPending}
                  outlineStyle={styles.inputOutline}
                  theme={{
                    colors: {
                      primary: '#667eea',
                      error: '#ef4444',
                    },
                  }}
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
                  disabled={login.isPending}
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    <TextInput.Icon
                      icon={secureTextEntry ? 'eye' : 'eye-off'}
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
                    />
                  }
                  outlineStyle={styles.inputOutline}
                  theme={{
                    colors: {
                      primary: '#667eea',
                      error: '#ef4444',
                    },
                  }}
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
                  buttonColor="#667eea"
                >
                  {login.isPending ? 'Signing In...' : 'Sign In'}
                </Button>

                <View style={styles.linkContainer}>
                  <Button
                    mode="text"
                    onPress={() => console.log('Navigate to register')}
                    style={styles.linkButton}
                    textColor="#667eea"
                    disabled={login.isPending}
                  >
                    Create Account
                  </Button>
                  
                  <Button
                    mode="text"
                    onPress={() => console.log('Navigate to forgot password')}
                    style={styles.linkButton}
                    textColor="#667eea"
                    disabled={login.isPending}
                  >
                    Forgot Password?
                  </Button>
                </View>
              </Card.Content>
            </Card>

            <Card style={styles.testCredentials} elevation={2}>
              <Card.Content style={styles.testCredentialsContent}>
                <Text variant="labelLarge" style={styles.testCredentialsTitle}>
                  Test Credentials
                </Text>
                <View style={styles.credentialRow}>
                  <Text variant="bodyMedium" style={styles.credentialLabel}>
                    Admin:
                  </Text>
                  <Text variant="bodyMedium" style={styles.credentialValue}>
                    admin@redshift.com / password
                  </Text>
                </View>
                <View style={styles.credentialRow}>
                  <Text variant="bodyMedium" style={styles.credentialLabel}>
                    User:
                  </Text>
                  <Text variant="bodyMedium" style={styles.credentialValue}>
                    user@redshift.com / password
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  appTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: 4,
  },
  appSubtitle: {
    color: '#ffffff',
    opacity: 0.95,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 8,
    fontWeight: '700',
    color: '#1f2937',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#6b7280',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  inputOutline: {
    borderRadius: 12,
  },
  errorText: {
    fontSize: 14,
    marginTop: -8,
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  linkButton: {
    flex: 1,
  },
  testCredentials: {
    marginTop: 24,
    backgroundColor: '#f0f9ff',
    borderRadius: 16,
  },
  testCredentialsContent: {
    paddingVertical: 12,
  },
  testCredentialsTitle: {
    textAlign: 'center',
    color: '#0369a1',
    fontWeight: '600',
    marginBottom: 12,
  },
  credentialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 4,
    flexWrap: 'wrap',
  },
  credentialLabel: {
    color: '#0c4a6e',
    fontWeight: '600',
    marginRight: 6,
  },
  credentialValue: {
    color: '#075985',
  },
});

