//INSTALLED PACKAGES
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";

//APP COMPONENTS
import Input from "../REUSABLE_COMPONENTS/Input";
import MainScreenStyling from "../../styling/MainScreenStyling";
import Checkbox from "../REUSABLE_COMPONENTS/Checkbox";
import logo from "../../static/images/CBS_logo.png";

const Signup = props => {
  const navigation = useNavigation();
  
  //Destructure props
  const { signupEmail, setSignupEmail, signupPassword, setSignupPassword } = props;

  //State variables, set initial state to false (apart from imageUrl to be able to complete flow without setting image handler up)
  const [matchPassword, setMatchPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isMatchPasswordValid, setIsMatchPasswordValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  //Set isDisabled / isTouched whenever isEmailValid, isPasswordValid, isChecked or isMatchPasswordValid changes
  useEffect(
    function handleSignupBtn() {
      isEmailValid && isPasswordValid && isMatchPasswordValid && isChecked ? setIsDisabled(false) : setIsDisabled(true);
      isEmailValid && isPasswordValid && isMatchPasswordValid && isChecked && setIsTouched(false);
    },
    [isEmailValid, isPasswordValid, isChecked, isMatchPasswordValid]
  );

  //Navigate to VerifyEmail only if button is not disabled, otherwise set isTouched to true
  const handleSubmit = () => {
    isDisabled ? setIsTouched(true) : navigation.navigate(props.action);
  };

  //variable
  const termsAndConditions = (
    <Text>
      "I agree to the <Text style={styles.underline}>terms & conditions"</Text>
    </Text>
  );

  return (
    <View style={styles.container}>
      <Image source={logo} style={MainScreenStyling.logo} />
      <View>
        <Text style={styles.heading}>Sign up to get access</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          {/* Reusable component */}
          <Input
            placeholder={"Choose your email"}
            label={"E-mail"}
            text={signupEmail}
            error={"You need to fill out your email"}
            isValid={isEmailValid}
            setIsValid={setIsEmailValid}
            setText={setSignupEmail}
          />
        </View>
        <View style={styles.line}></View>
        <View style={styles.input}>
          {/* Reusable component */}
          <Input
            placeholder={"Choose your password"}
            label={"Password"}
            text={signupPassword}
            error={"You need to fill out a password"}
            isValid={isPasswordValid}
            setIsValid={setIsPasswordValid}
            setText={setSignupPassword}
          />
        </View>
        <View style={styles.line}></View>
        <View style={styles.input}>
          {/* Reusable component */}
          <Input
            placeholder={"Repeat your password"}
            label={"Repeat password"}
            text={matchPassword}
            error={"Repeat the password"}
            isValid={isMatchPasswordValid}
            setIsValid={setIsMatchPasswordValid}
            setText={setMatchPassword}
          />
        </View>
      </View>

      {/* Reusable component */}
      <Checkbox
        label={termsAndConditions}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        type={"check"}
        error={"You need to agree to our terms and conditions"}
      />

      {/* Show only error text if */}
      {isDisabled && isTouched && (!isEmailValid || !isPasswordValid || !isMatchPasswordValid || !isChecked) && (
        <Text style={[MainScreenStyling.error, styles.marginTop]}>
          You need to fill out all fields and agree to our terms & conditions.
        </Text>
      )}
      <TouchableOpacity
        //set style depening on state
        style={[
          MainScreenStyling.button,
          styles.button,
          isDisabled && MainScreenStyling.disabled,
          !isTouched && styles.marginTop,
        ]}
        onPress={handleSubmit}>
        <Text style={MainScreenStyling.darkBtnTxt}>Get access</Text>
      </TouchableOpacity>
      <Text
        //Navigate to Login
        onPress={() => {
          navigation.navigate(props.actionLogin);
        }}
        style={[styles.alignCenter, styles.thinFont]}>
        Already have a user? <Text style={styles.bold}>Log in</Text>
      </Text>
    </View>
  );
};

const CBS_blue = "#32305D";
const CBS_blue_text = "#5050A5";
const CBS_border = "#EEEEEE";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    padding: 16,
    paddingTop: 50,
  },
  line: {
    borderBottomColor: CBS_border,
    borderBottomWidth: 1,
  },
  input: {
    height: 60,
  },
  thinFont: {
    fontWeight: "400",
  },
  bold: {
    fontWeight: "600",
  },
  alignCenter: {
    textAlign: "center",
    paddingTop: 32,
    color: CBS_blue_text,
    fontSize: 12,
  },
  inputContainer: {
    borderColor: CBS_border,
    marginBottom: 24,
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: CBS_border,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  alignCenter: {
    textAlign: "center",
    marginBottom: 46,
    color: CBS_blue_text,
    fontWeight: "600",
    fontSize: 12,
  },
  heading: {
    fontFamily: "Teko_500Medium",
    fontSize: 26,
    color: CBS_blue,
    paddingBottom: 16,
  },
  button: {
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "flex-start",
    marginBottom: 32,
  },

  underline: {
    textDecorationLine: "underline",
  },
  marginTop: {
    marginTop: 24,
  },
});
export default Signup;
