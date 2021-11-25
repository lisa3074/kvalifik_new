//INSTALLED PACKAGES
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//APP COMPONENTS
import HomeScreen from "./SCREENS/HomeScreen";
import DiscoverScreen from "./SCREENS/DiscoverScreen";
import ChatScreen from "./SCREENS/ChatScreen.js";
import ProfileScreen from "./SCREENS/ProfileScreen";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {

  return (
    <>
      <NavigationContainer>
        {/* Tab navigation */}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
                //Choose icon for each tab in relation to tab names
              if (route.name === "Start") {
                iconName =  "md-home";
              } else if (route.name === "Discover") {
                iconName = "md-search";
              } else if (route.name === "Chat") {
                iconName = "md-chatbubbles";
              } else if (route.name === "Profile") {
                iconName = "md-menu";
              }

              // return the icons
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            //Style the navigation
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
          })}>
          {/* The tabs and the components they lead to */}
          <Tab.Screen name="Start" component={HomeScreen} options={{ title: "FEED" }} />
          <Tab.Screen name="Discover" component={DiscoverScreen} options={{ title: "DISCOVER" }} />
          <Tab.Screen name="Chat" component={ChatScreen} options={{ title: "CHAT", headerShown: false }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "MENU", headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainNavigation;
