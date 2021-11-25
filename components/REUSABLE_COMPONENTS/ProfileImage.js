import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MainScreenStyling from "../../styling/MainScreenStyling";
import placeholder from "../../static/images/placeholder.png";

const ProfileImage = props => {
  // TODO: Setup image handler
  const handleUpload = () => {
    console.log("handleUpload");
  };

  return (
    <View style={MainScreenStyling.flex}>
      <View>
        <Text style={MainScreenStyling.labelStyle}>PROFILE PICTURE</Text>
        <TouchableOpacity style={MainScreenStyling.button} onPress={handleUpload}>
          <Text style={MainScreenStyling.darkBtnTxt}>Upload</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleUpload}>
        <Image style={MainScreenStyling.profilePicture} source={placeholder} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImage;
