//INSTALLED PACKAGES
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//APP COMPONENTS
import Menu from "../USER/Menu";
import EditProfile from "../USER/EditProfile";

const Stack = createNativeStackNavigator();

const ProfileScreen = props => {
  return (
    /* Stack navigation */
    <Stack.Navigator
      //Styling of navigation
      screenOptions={{
        tabBarActiveTintColor: "#5050A5",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: "Teko_500Medium",
        },
        tabBarStyle: {
          height: 65,
          paddingTop: 15,
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#5050A5",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "Teko_500Medium",
          fontSize: 26,
        },
        headerBackTitleVisible: false,
        headerBackTitleStyle: {
          fontSize: 0,
        },
        headerShadowVisible: true,
      }}>
      {/* Components in navigator, top component is default */}
      <Stack.Screen name="Menu" options={{ title: "MENU", headerShown: true }}>
        {props => <Menu action={"EditProfile"} />}
      </Stack.Screen>
      <Stack.Screen name="EditProfile" options={{ title: "EDIT PROFILE", headerShown: true }}>
        {props => <EditProfile action={"Menu"} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileScreen;
