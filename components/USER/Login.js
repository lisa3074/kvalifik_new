//INSTALLED PACKAGES
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import * as SecureStore from "expo-secure-store";

//APP COMPONENTS
import { userLogin, refreshToken, restoreUser } from "./userStore/UserAction";
import Input from "../REUSABLE_COMPONENTS/Input";
import MainScreenStyling from "../../styling/MainScreenStyling";
import logo from "../../static/images/CBS_logo.png";

const Login = props => {
  const navigation = useNavigation();

  //State variables
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const dispatch = useDispatch();

  //Call userLogin (redux acition)
  const handleLogin = () => {
    dispatch(userLogin(loginEmail, loginPassword));
    //dispatch(userLogin("lisa@lisa.dk", "password"));
  };

  //If button is touched
  const handleDisabled = () => {
    setIsTouched(true);
  };

  //Set disabled/touched whenever isEmailValid and isPasswordValid changes
  useEffect(
    function handleLoginBtn() {
      //if password or email is not valid, set login button to disabled
      isEmailValid && isPasswordValid ? setIsDisabled(false) : setIsDisabled(true);
      //if password and email is valid, reset isTouched on button
      isEmailValid && isPasswordValid && setIsTouched(false);
    },
    [isEmailValid, isPasswordValid]
  );

  useEffect(
    function isUserInSecureStore() {
    // Fetch the token from storage then navigate to our appropriate place
    const CheckToken = async () => {
      isSignedIn = await SecureStore.getItemAsync("user");
      if (isSignedIn) {
        let userToken, user, expiration, refreshTokenString;
        try {
          //find expiration date/time
          expiration = new Date(JSON.parse(await SecureStore.getItemAsync("expiration")));
          //If token is expired
          if (expiration < new Date()) {
            console.log("Token expired");
            //get refresh token fron secureStore
            refreshTokenString = await SecureStore.getItemAsync("refreshToken");
            //call refreshToken with the refresh token (Redux action)
            dispatch(refreshToken(refreshTokenString));
          }
          //If token is not expired
          console.log("Token not expired");
          //get token and user object
          userToken = await SecureStore.getItemAsync("userToken");
          user = JSON.parse(await SecureStore.getItemAsync("user"));
        } catch (e) {
          // Restoring token failed
          console.log("restore token failed");
          console.log(e);
        }
//call restoreUser (Redux action)
        dispatch(restoreUser(user, userToken));
      }
    };

    CheckToken();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View>
        <Text style={styles.heading}>Log in</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          {/* Reusable component */}
          <Input
            placeholder={"Write your email"}
            label={"E-mail"}
            text={loginEmail}
            error={"You need to fill out your email"}
            isValid={isEmailValid}
            setText={setLoginEmail}
            setIsValid={setIsEmailValid}
          />
        </View>
        <View style={styles.line}></View>
        <View style={styles.input}>
          {/* Reusable component */}
          <Input
            placeholder={"Write your password"}
            label={"Password"}
            text={loginPassword}
            error={"You need to fill out a password"}
            isValid={isPasswordValid}
            setText={setLoginPassword}
            setIsValid={setIsPasswordValid}
          />
        </View>
      </View>
      <Text style={styles.alignCenter}>Forgot password?</Text>
      <TouchableOpacity
        style={[MainScreenStyling.button, styles.button, isDisabled && styles.disabled]}
        //Only go to handleLogin if not disabled
        onPress={isDisabled ? handleDisabled : handleLogin}>
        <Text style={MainScreenStyling.darkBtnTxt}>Log in</Text>
      </TouchableOpacity>
      {/* Show only error text if */}
      {isDisabled && isTouched && (!isEmailValid || !isPasswordValid) && (
        <Text style={styles.error}>You need to fill out email and password</Text>
      )}
      {/* Go to onboarding flow */}
      <Text
        onPress={() => {
          navigation.navigate(props.action);
        }}
        style={[styles.alignCenter, styles.thinFont]}>
        Don't have an account? <Text style={styles.bold}>Sign up</Text>
      </Text>
    </View>
  );
};

const CBS_blue = "#32305D";
const CBS_blue_text = "#5050A5";
const CBS_border = "#EEEEEE";
const CBS_disabled = "#BABADD";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    padding: 16,
    paddingTop: 50,
  },
  inputContainer: {
    borderColor: CBS_border,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: CBS_border,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  bold: {
    fontWeight: "600",
  },
  alignCenter: {
    textAlign: "center",
    color: CBS_blue_text,
    fontSize: 12,
    marginBottom: 46,
    color: CBS_blue_text,
    fontWeight: "600",
  },
  input: {
    height: 60,
  },
  thinFont: {
    fontWeight: "400",
  },
  line: {
    borderBottomColor: CBS_border,
    borderBottomWidth: 1,
  },

  heading: {
    fontFamily: "Teko_500Medium",
    fontSize: 26,
    color: CBS_blue,
    paddingBottom: 16,
  },
  button: {
    paddingTop: 16,
    marginBottom: 32,
    alignItems: "flex-start",
    paddingBottom: 16,
  },
  disabled: {
    backgroundColor: CBS_disabled,
  },
  error: {
    color: "red",
    marginTop: 8,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 24,
    marginRight: 8,
    alignSelf: "center",
  },
});

export default Login;
