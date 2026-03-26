import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import TodoScreen from "./screens/TodoScreen";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (you can use AsyncStorage or secure storage)
    const checkLoginStatus = async () => {
      // For demo, we'll just check localStorage
      const loginStatus = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(loginStatus === "true");
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <TodoScreen onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
