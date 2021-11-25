import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

/* 
###### TO USE EXAMPLE ######
import Checkbox from '../REUSABLE_COMPONENTS/Checkbox';'
const [isChecked, setIsChecked] = useState(false);

      <Checkbox
        label={"String"} // name in the label
        isChecked={isChecked} //state variable declared in parent component
        setIsChecked={setIsChecked} //changing function declared in parent component
        type={'check'} // check or switch
        error={"string"} // error message
      />
*/

//Set types on props passed from parent component
interface Props {
  label: string;
  isChecked: boolean;
  type: string;
  error: string;
  setIsChecked: (arg: boolean) => void;
}

const Input = ({ label, isChecked, setIsChecked, type, error }: Props) => {
  //State variable
  const [isTouched, setIsTouched] = useState(false);

  //Set isCheked and send back to parent component for further use, mark input as touched
  const toggleCheckbox = (checked: boolean) => {
    setIsChecked(checked);
    setIsTouched(true);
  };

  //Set component up with props passed from parent component
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          //Check for type and if checked for styling purposes
          style={[
            type === "check"
              ? isChecked
                ? styles.checked
                : styles.checkContainer
              : isChecked
              ? styles.switchContainerChecked
              : styles.switchContainer,
          ]}
          onPress={() => toggleCheckbox(!isChecked)}>
          {/* Show if checkbox */}
          {type === "check" && <Text style={styles.v}>✓</Text>}
          {/* Show if switch */}
          {type === "switch" && <View style={[styles.switch, isChecked && styles.switchChecked]}></View>}
        </TouchableOpacity>
        <Text style={styles.labelStyle}>{label}</Text>
      </View>
      {/* Show only if not checked and touched and only if the error is not nothing */}
      {!isChecked && isTouched && error != '' && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
const CBS_blue = "#32305D";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelStyle: {
    color: CBS_blue,
    fontFamily: "OpenSans_400Regular",
    fontSize: 10,
  },

  error: {
    color: "red",
    fontSize: 13,
    marginTop: 8,
  },
  //If type is checkbox
  checkContainer: {
    width: 25,
    height: 25,
    borderRadius: 5,
    borderColor: CBS_blue,
    borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    marginRight: 8,
  },
  checked: {
    backgroundColor: CBS_blue,
    width: 25,
    height: 25,
    borderRadius: 5,
    borderColor: CBS_blue,
    borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    marginRight: 8,
  },
  v: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  //If type is switch
  switchContainer: {
    width: 50,
    height: 20,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "#AAAAAA",
  },
  switchContainerChecked: {
    backgroundColor: "#BABADD",
    width: 50,
    height: 20,
    borderRadius: 20,
    justifyContent: "center",
  },
  switch: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "#F5F5F5",
  },
  switchChecked: {
    alignSelf: "flex-end",
    backgroundColor: "#5050A5",
    width: 30,
    height: 30,
    borderRadius: 100,
  },
});

export default Input;
