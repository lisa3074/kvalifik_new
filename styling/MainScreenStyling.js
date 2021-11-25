import { StyleSheet } from "react-native";

const CBS_blue = "#5050A5";
const CBS_blue2 = "#32305D";
const CBS_disabled = "#BABADD";
const CBS_border = "#EEEEEE";
const MainScreenStyling = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: CBS_blue,
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#999999",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  lightText: {
    color: "white",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  darkText: {
    color: "#333333",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  header: {
    fontFamily: "Teko_500Medium",
    fontSize: 26,
    color: "#5050A5",
    textTransform: "uppercase",
  },
  heading: {
    fontFamily: "Teko_500Medium",
    fontSize: 26,
    color: "#333333",
  },
  paragraph: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    color: "#333333",
  },
  paragraphSmall: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 12,
  },
  darkBtnTxt: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },
  lightBtnTxt: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 14,
    color: "#5050A5",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 150,
    alignItems: "center",
  },
  labelStyle: {
    color: CBS_blue2,
    textTransform: "uppercase",
    fontFamily: "OpenSans_700Bold",
    fontSize: 12,
  },
  input: {
    marginBottom: 24,
    height: 70,
    borderRadius: 5,
    borderColor: '#eeeeee',
    borderWidth: 1,
    shadowColor: "#AAAAAA",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 3,
    },
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 24,
    marginRight: 8,
    alignSelf: "center",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 16,
  },
  error: {
    color: "red",
    marginTop: 8,
  },
  disabled: {
    backgroundColor: CBS_disabled,
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
    line: {
    borderBottomColor: "#AAAAAA",
    borderBottomWidth: 1,
    marginTop: 32,
    marginBottom: 32,
    opacity: 0.2,
  },
});

export default MainScreenStyling;
