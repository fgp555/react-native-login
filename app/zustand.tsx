import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "@/store/zustand/authStore";

const LoginScreen = () => {
  const [email, setEmail] = useState("fgp555@gmail.com");
  const [password, setPassword] = useState("SecurePass@2023");
  const { login, loadUserFromStorage } = useAuthStore();
  const navigation = useNavigation();

  useEffect(() => {
    // Cargar el usuario almacenado al iniciar la app
    loadUserFromStorage();
  }, []);

  const handleLogin = async () => {
    // Validar si las credenciales no están vacías
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa el usuario y la contraseña.");
      return;
    }

    // Hacer la solicitud de login usando fetch
    try {
      const response = await fetch("https://dev.appsystered.com/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Enviar el JSON con las credenciales
      });

      const data = await response.json();

      if (response.ok) {
        // Si el login es exitoso, guardar los datos del usuario en el store y AsyncStorage
        login(data.user); // Suponiendo que el backend devuelve un objeto `user`
        Alert.alert("Bienvenido", "Has iniciado sesión correctamente");
        // navigation.navigate("Home"); // Redirigir a la pantalla principal
      } else {
        // Si las credenciales no son correctas, mostrar el mensaje de error
        Alert.alert("Error", data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      // Manejar errores de la red o servidor
      console.error("Error al iniciar sesión:", error);
      Alert.alert("Error", "Hubo un problema al iniciar sesión. Intenta nuevamente.");
    }
  };

  const { user, logout } = useAuthStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <View>
      <Text>Login</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Username" />
      <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Text>{JSON.stringify(isAuthenticated)}</Text>
      <Text>{JSON.stringify(user, null, 2)}</Text>
      <Button title="Logout" onPress={logout} />

    </View>
  );
};

export default LoginScreen;
