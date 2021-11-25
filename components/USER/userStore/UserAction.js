import User from "../../../classModels/User";
import { API } from "../../../apiKeys/apiKey";
import * as SecureStore from "expo-secure-store";

//export cases for the reducer
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGUT";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const UPDATE_NOTIFICATIONS = "UPDATE_NOTIFICATIONS";
export const UPDATE_USER = "UPDATE_USER";

//variables
const dbEndpoint = "https://kvalifik-bf2c3-default-rtdb.europe-west1.firebasedatabase.app/";
const authEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:`;

//refresh token and restore session
export const restoreUser = (loggedInUser, token) => {
  console.log("restoreUser() || UserAction.js");
  //Send to reducer
  return { type: LOGIN, payload: { loggedInUser, token } };
};

//delete user from google authentication
export const deleteUser = (idToken, uuid) => {
  console.log("userDelete() || UserAction.js");
  //use redux thunk to make asyncrounous calls
  return async dispatch => {
    const response = await fetch(`${authEndpoint}delete?key=${API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: idToken,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("ERROR in response (userDelete) ", response);
    } else {
      console.log("response good! (userDelete)");
      //Make sure a dispacth is called, otherwise function won't work
      dispatch(deleteUserInDb(uuid, idToken));
    }
  };
};

//delete user from database
export const deleteUserInDb = uuid => {
  console.log("deleteUserInDb() || UserAction.js");
  //use redux thunk to make asyncrounous calls
  return async (dispatch, getState) => {
    //get token to authenticate the request
    const token = getState().user.token;
    const response = await fetch(`${dbEndpoint}users/${uuid}.json?auth=${token}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("ERROR in response (deleteUserInDb) ", response);
    } else {
      console.log("response good (deleteUserInDb)");
      //Make sure a dispacth is called, otherwise function won't work
      dispatch(userLogout());
    }
  };
};

//Update notification preferences
export const editNotifications = (chat, event, uuid, idToken, firstname, lastname, studyProgramme, email, imageUrl) => {
  console.log("editNotifications() || UserAction.js");
  //use redux thunk to make asyncrounous calls
  return async (dispatch, getState) => {
    //get token to authenticate the request
    const token = getState().user.token;
    //Use patch to only update the parameters sent end body
    const response = await fetch(`${dbEndpoint}users/${uuid}.json?auth=${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatNotifications: chat,
        eventNotifications: event,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      console.error("ERROR in response (editNotifications) ", response);
    } else {
      console.log("response good (editNotifications)");
      const loggedInUser = new User(uuid, firstname, lastname, imageUrl, email, studyProgramme, chat, event);
      //set up secure store, only user
      setSecureStore("edit", loggedInUser); //Turn secureStore on again
      //Make sure a dispacth is called, otherwise function won't work => send to reducer
      dispatch({
        type: UPDATE_NOTIFICATIONS,
        payload: { chatNotifications: chat, eventNotifications: event, token: idToken },
      });
    }
  };
};

//Update user
export const editUser = (firstname, lastname, studyProgramme, uuid, idToken, email, imageUrl, chat, event) => {
  console.log("editUser() || UserAction.js");
  //use redux thunk to make asyncrounous calls
  return async (dispatch, getState) => {
    //get token to authenticate the request
    const token = getState().user.token;
    //Use patch to only update the parameters sent end body
    const response = await fetch(`${dbEndpoint}users/${uuid}.json?auth=${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        studyProgramme: studyProgramme,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      console.error("ERROR in response (editNotifications) ", response);
    } else {
      console.log("response good (editNotifications)");
      const loggedInUser = new User(uuid, firstname, lastname, imageUrl, email, studyProgramme, chat, event);
      //Set up secureStore, only user
      setSecureStore("edit", loggedInUser); //Turn secureStore on again
      //Make sure a dispacth is called, otherwise function won't work => send to reducer
      dispatch({
        type: UPDATE_USER,
        payload: { firstname: firstname, lastname: lastname, studyProgramme: studyProgramme, token: idToken },
      });
    }
  };
};

//Login with google authentication
export const userLogin = (email, password) => {
  console.log("userLogin() || UserAction.js");
  //use redux thunk to make asyncrounous calls
  return async dispatch => {
    const response = await fetch(`${authEndpoint}signInWithPassword?key=${API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      console.error("ERROR in response ", response);
    } else {
      //Make sure a dispacth is called, otherwise function won't work => send to reducer
      const loggedInUser = new User(data.localId, "", "", undefined, data.email);
      dispatch({ type: LOGIN, payload: { loggedInUser, token: data.idToken } });
      //Get users to find the one logged in
      dispatch(getUser(data));
    }
  };
};

//Get all users
export const getUser = data => {
  console.log("getUSer() || UserAction.js");
  //use redux thunk to make asyncrounous calls
  return async (dispatch, getState) => {
    //get token to authenticate the request
    const token = getState().user.token;
    const response = await fetch(`${dbEndpoint}users.json?auth=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();
    let loggedInUser;
    for (const key in user) {
      //find the logged in user, and set the user object to send to the reducer
      if (user[key].id === data.localId) {
        console.log(user);
        loggedInUser = new User(
          user[key].id,
          user[key].firstname,
          user[key].lastname,
          user[key].imageUrl,
          user[key].email,
          user[key].studyProgramme,
          user[key].chatNotifications,
          user[key].eventNotifications
        );
      }
    }
    if (!response.ok) {
      console.error("ERROR in response (PostUserToDb) ", response);
    } else {
      console.log("response good (postUserToDb)");
      //set up secure store, both data and user
      setSecureStore(data, loggedInUser); //Turn secureStore on again
      //Make sure a dispacth is called, otherwise function won't work => send to reducer
      dispatch({ type: LOGIN, payload: { loggedInUser, token: data.idToken } });
    }
  };
};

//Refresh token when expired if still logged in
export const refreshToken = refreshToken => {
  console.log("refreshToken() || UserAction.js ", refreshToken);
  //use redux thunk to make asyncrounous calls
  return async dispatch => {
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.log("An error happended ", response);
    } else {
      //Send to reducer
      dispatch({ type: REFRESH_TOKEN, payload: data.id_token });
    }
  };
};

//Add secureStore, so user is automatically logged in on refresh, unless they logged out
export const setSecureStore = (data, user) => {
  console.log("setSecureStore() || UserAction.js");
  //if edit is passed instead of an object, only set user (on edit notifications and edit profile)
  if (data === "edit") {
    SecureStore.setItemAsync("user", JSON.stringify(user));
  } else {
    SecureStore.setItemAsync("user", JSON.stringify(user));
    SecureStore.setItemAsync("userToken", data.idToken);
    let expiration = new Date();
    expiration = expiration.setSeconds(expiration.getSeconds() + parseInt(data.expiresIn));
    SecureStore.setItemAsync("expiration", JSON.stringify(expiration));
    SecureStore.setItemAsync("refreshToken", data.refreshToken);
  }
};

//Log out from google authentication
export const userLogout = () => {
  console.log("userLogout() || UserAction.js");
  //delete data in secureStore
  SecureStore.deleteItemAsync("refreshToken");
  SecureStore.deleteItemAsync("expiration");
  SecureStore.deleteItemAsync("user");
  SecureStore.deleteItemAsync("userToken");

  //Send to reducer
  return { type: LOGOUT };
};
