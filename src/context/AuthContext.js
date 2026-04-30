// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { wixClient, saveTokens, clearTokens } from '../config/wixClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const tokens = await AsyncStorage.getItem('wix_tokens');
      if (tokens) {
        const member = await wixClient.members.getCurrentMember();
        setUser(member);
      }
    } catch (err) {
      console.log('No active session');
    } finally {
      setLoading(false);
    }
  };

  // Login with email & password
  const login = async (email, password) => {
    try {
      const response = await wixClient.auth.login({
        email,
        password,
      });

      if (response.loginState === 'SUCCESS') {
        const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
          response.data.sessionToken,
        );
        await saveTokens(tokens);
        const member = await wixClient.members.getCurrentMember();
        console.log('member: ', member);
        setUser(member);
        return { success: true };
      } else if (response.loginState === 'EMAIL_VERIFICATION_REQUIRED') {
        return { success: false, error: 'Please verify your email first' };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Register new member
  const signup = async (email, password, firstName, lastName) => {
    try {
      const response = await wixClient.auth.register({
        email,
        password,
        profile: {
          firstName,
          lastName,
        },
      });

      if (response.loginState === 'SUCCESS') {
        const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
          response.data.sessionToken,
        );
        await saveTokens(tokens);
        const member = await wixClient.members.getCurrentMember();
        console.log('member: ', member);
        setUser(member);
        return { success: true };
      } else if (response.loginState === 'EMAIL_VERIFICATION_REQUIRED') {
        return {
          success: false,
          needsVerification: true,
          error: 'Check your email to verify your account',
        };
      } else {
        return { success: false, error: 'Registration failed' };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await wixClient.auth.logout();
    } catch (err) {
      console.log('Logout error:', err);
    } finally {
      await clearTokens();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
