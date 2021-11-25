import User from "../../../classModels/User";
import { API } from "../../../apiKeys/apiKey";
import { getUser } from "../../USER/userStore/UserAction";
import { setSecureStore } from "../../USER/userStore/UserAction";

//export cases for the reducer
export const SIGNUP = "SIGNUP";

//Variables
const dbEndpoint = "https://kvalifik-bf2c3-default-rtdb.europe-west1.firebasedatabase.app/";
const authEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:`;

// *NOTE: These actions uses UserReducer

//Sign up to google authentication
export const userSignup = (
  email,
  password,
  firstname,
  lastname,
  imageUrl,
  studyProgramme,
  chatNotifications,
  eventNotifications
) => {
  console.log("userSignup() || OnboardingAction.js");
  //use redux thunk to make asyncrounous calls
  return async dispatch => {
    const response = await fetch(`${authEndpoint}signUp?key=${API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        //Make sure we get a token to verify user
        returnSecureToken: true,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("ERROR in response (userSignup) ", response);
    } else {
      console.log("response good!");
      //Create new user object with the id we got back from the request and the passed parameters
      const signedUpUser = new User(
        data.localId,
        firstname,
        lastname,
        imageUrl,
        data.email,
        studyProgramme,
        chatNotifications,
        eventNotifications
      );
      //Make sure a dispacth is called, otherwise function won't work => send to reducer
      dispatch({ type: SIGNUP, payload: { signedUpUser, token: data.idToken } });
      //Create user in database
      dispatch(
        postUserToDb(data, firstname, lastname, imageUrl, studyProgramme, chatNotifications, eventNotifications)
      );
      return data;
    }
  };
};

//Create user in database
export const postUserToDb = (
  data,
  firstname,
  lastname,
  imageUrl,
  studyProgramme,
  chatNotifications,
  eventNotifications
) => {
  console.log("postUserToDb() || OnboardingAction.js");
  //use redux thunk to make asyncrounous calls
  return async (dispatch, getState) => {
    //get token to authenticate user
    const token = getState().user.token;
    const response = await fetch(`${dbEndpoint}users/${data.localId}.json?auth=${token}`, {
      //Use PATCH to be able to make the user identifier the uuid from google authentication (hence connectiong the two also for deletion)
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.localId,
        firstname: firstname,
        lastname: lastname,
        imageUrl: imageUrl,
        email: data.email,
        studyProgramme: studyProgramme,
        chatNotifications: chatNotifications,
        eventNotifications: eventNotifications,
      }),
    });
    //name of the identifier
    const nameOfEntry = await response.json();
    if (!response.ok) {
      console.error("ERROR in response (PostUserToDb) ", response);
    } else {
      console.log("response good (postUserToDb)");
      //Make sure a dispacth is called, otherwise function won't work => get user data
      dispatch(getUser(data));
    }
  };
};
