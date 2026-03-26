import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import TaskScreen from '../screens/TaskScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2D2D30" />
        <TaskScreen onLogout={() => setIsLoggedIn(false)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <LoginScreen onLogin={() => setIsLoggedIn(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
