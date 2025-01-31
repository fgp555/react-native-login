import { removeAuth, setAuth } from "@/store/redux/authSlice";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Button, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const [formData, setFormData] = useState({
    email: "fgp555@gmail.com",
    password: "SecurePass@2023",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // redux toolkit
  const dispatch = useDispatch();
  // get
  const getAuthStore = useSelector((state: any) => state.auth);

  const handleChange = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    console.log(formData);
    try {
      setIsLoading(true);
      setErrorMessage("");

      const res = await fetch("https://dev.appsystered.com/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to login");
      }

      const data = await res.json();
      dispatch(setAuth(data));
      console.log(data);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    dispatch(removeAuth());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login. | Redux</Text>

      <TextInput style={styles.input} placeholder="Email" value={formData.email} onChangeText={(text) => handleChange("email", text)} />

      <TextInput style={styles.input} placeholder="Password" value={formData.password} secureTextEntry onChangeText={(text) => handleChange("password", text)} />

      <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? "Cargando..." : "Login"}</Text>
      </TouchableOpacity>

      {errorMessage ? <Text style={{ color: "red" }}>{errorMessage}</Text> : null}

      <Text>Forgot password?</Text>
      <Button title="Logout" onPress={logout} />

      <Text>{JSON.stringify(formData, null, 2)}</Text>
      {/* <Text>{JSON.stringify(dataLogin, null, 2)}</Text> */}
      <Text>{JSON.stringify(getAuthStore, null, 2)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 50,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderColor: "#888",
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    width: 300,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
