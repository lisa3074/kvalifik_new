import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

/* 
###### TO USE EXAMPLE ######
import Input from '../REUSABLE_COMPONENTS/Input';'
const [email, setEmail] = useState("");
const [isEmailValid, setIsEmailValid] = useState(false);

       <Input
          label={"string"} // name on the label
          placeholder={"string"} // text in placeholder
          text={email} //state variable declared in parent component
          setText={setEmail} //changing function declared in parent component
          isValid={isEmailValid} //state variable declared in parent component
          setIsValid={setIsEmailValid} //changing function declared in parent component
          error={"string"} // error message
        />
*/

//Setting types on props passed form parent component
interface Props {
  label: string;
  placeholder: string;
  text: string;
  setText: (arg: string) => void;
  isValid: boolean;
  setIsValid: (arg: boolean) => void;
  error: string;
}

const Input = ({ text, setText, label, placeholder, error, isValid, setIsValid }: Props) => {
  //State variables
  const [isActive, setIsActive] = useState(false);

  //Set input text and validity of input and send back to parent component for further use, mark input as active
  const handleInput = (input: string) => {
    setIsActive(true);
    setText(input);
    input == "" ? setIsValid(false) : setIsValid(true);
  };

  //Set component up with props passed from parent component
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Text style={styles.labelStyle}>{label}</Text>
        {/* Show only if not valid and active and only if the error is not nothing */}
        {!isValid && isActive && error != "" && <Text style={styles.error}> * {error}</Text>}
      </View>
      <TextInput
        autoCapitalize={"none"}
        style={styles.input}
        onChangeText={handleInput}
        value={text}
        placeholder={placeholder}
        onBlur={() => setIsActive(true)}
      />
    </View>
  );
};
const CBS_blue = "#32305D";
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "white",
    borderRadius: 5,
    height: "100%",
  },
  hide: {
    display: "none",
  },
  labelStyle: {
    color: CBS_blue,
    textTransform: "uppercase",
    fontFamily: "OpenSans_700Bold",
    fontSize: 12,
    paddingBottom: 8,
  },
  input: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
  },
  error: {
    color: "red",
  },
  flex: {
    flexDirection: "row",
  },
});

export default Input;
