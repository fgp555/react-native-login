import store from "@/store/redux/reduxStore";
import { Stack, Tabs } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <>
      <Provider store={store}>
        <Tabs>
          <Stack.Screen name="Redux" options={{ headerShown: false }} />
          <Stack.Screen name="Zustand" options={{ headerShown: false }} />
        </Tabs>
      </Provider>
    </>
  );
}
