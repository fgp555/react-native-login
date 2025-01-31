import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Acción asíncrona para cargar el estado desde AsyncStorage
export const loadAuthState = createAsyncThunk("auth/loadAuthState", async () => {
  try {
    const authData = await AsyncStorage.getItem("auth");
    return authData ? JSON.parse(authData) : {};
  } catch (error) {
    console.error("Error cargando AsyncStorage:", error);
    return {};
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {}, // Estado inicial vacío
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      AsyncStorage.setItem("auth", JSON.stringify(action.payload)); // Guardar en AsyncStorage
      return action.payload;
    },
    removeAuth: () => {
      AsyncStorage.removeItem("auth"); // Eliminar de AsyncStorage
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAuthState.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
