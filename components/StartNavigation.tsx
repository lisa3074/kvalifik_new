//INSTALLED PACKAGES
import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//APP COMPONENTS
import MainNavigation from "./MainNavigation";
import { RootState } from "../App";
import Login from "./USER/Login";
import OnBoardingFlow from "./ONBOARDING/OnBoardingFlow";

const Stack = createNativeStackNavigator();

const StartNavigation = () => {
  //Is user signed in? (RootState is from App.tsx to be able to get the states from redux store)
  const isSignedIn = useSelector((state: RootState) => state.user.loggedInUser);

//If user is signed in, show main navigation, otherwise redirect to login (or onboarding flow) (stack navigation)
  return isSignedIn ? (
    <MainNavigation />
  ) : (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown: false
            }}>
          <Stack.Screen name="Login" options={{ title: "Log in" }}>
            {props => <Login screen={'Login'}  action={ 'Signup'}/>}
        </Stack.Screen>
          <Stack.Screen name="Signup" options={{ title: "Sign up" }}>
            {props => <OnBoardingFlow isSignedIn={isSignedIn} screen={'Signup'}  action={'Login'} second_action={'VerifyEmail'}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StartNavigation;
