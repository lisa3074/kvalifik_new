//INSTALLED PACKAGES
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//APP COMPONENTS
import Signup from "./Signup";
import VerifyEmail from "./VerifyEmail";
import SetupProfile from "./SetupProfile";
import Notifications from "./Notifications";
import MainNavigation from "../MainNavigation";

const Stack = createNativeStackNavigator();

//Set types on props passed from parent component
interface Props{
  isSignedIn: boolean;
  action: string;
  second_action: string;
  screen: string;
}


const OnBoardingFlow = ({ isSignedIn, action, second_action, screen }: Props) => {
  //Set types on state variables
  interface States {
    signupEmail: string;
    setSignupEmail: (arg: boolean) => void;
    signupPassword: string;
    setSignupPassword: (arg: boolean) => void;
    firstname: string;
    setFirstname: (arg: boolean) => void;
    lastname: string;
    setLastname: (arg: boolean) => void;
    imageUrl: string;
    setImageUrl: (arg: boolean) => void;
    studyProgramme: string;
    setStudyProgramme: (arg: boolean) => void;
  }

  //State variables (set in Signup and SetupProfile)
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [imageUrl, setImageUrl] = useState("placeholder.png");
  const [studyProgramme, setStudyProgramme] = useState("");
  
  return (
    /* Stack navigation */
    <Stack.Navigator
      //Don't show header
      screenOptions={{
        headerShown: false,
      }}>
        {/* The screens and the components they lead to with props*/}
      <Stack.Screen name="OnBoarding" options={{ title: "OnBoarding" }}>
        {props => (
          <Signup
            signupEmail={signupEmail}
            signupPassword={signupPassword}
            setSignupEmail={setSignupEmail}
            setSignupPassword={setSignupPassword}
            action={"VerifyEmail"}
            actionLogin={action}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="VerifyEmail" options={{ title: "VerifyEmail" }}>
        {props => <VerifyEmail action={"SetupProfile"} />}
      </Stack.Screen>

      <Stack.Screen name="SetupProfile" options={{ title: "SetupProfile" }}>
        {props => (
          <SetupProfile
            firstname={firstname}
            setFirstname={setFirstname}
            lastname={lastname}
            setLastname={setLastname}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            studyProgramme={studyProgramme}
            setStudyProgramme={setStudyProgramme}
            action={"Notifications"}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Notifications" options={{ title: "Notifications" }}>
        {props => (
          <Notifications
            isSignedIn={isSignedIn}
            signupEmail={signupEmail}
            signupPassword={signupPassword}
            firstname={firstname}
            lastname={lastname}
            imageUrl={imageUrl}
            studyProgramme={studyProgramme}
            action={"MainNavigation"}
          />
        )}
      </Stack.Screen>
  
      <Stack.Screen name="MainNavigation" options={{ title: "MainNavigation" }}>
        {props => <MainNavigation />}
        </Stack.Screen>

    </Stack.Navigator>
  );
};

export default OnBoardingFlow;
