import { LOGIN, LOGOUT, REFRESH_TOKEN, UPDATE_NOTIFICATIONS, UPDATE_USER } from "./UserAction";
import { SIGNUP } from "../../ONBOARDING/onboardingStore/OnboardingAction";

//set initial states as undefined
export const initialState = {
  loggedInUser: undefined,
  signedUpUser: undefined,
  token: undefined,
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        //copy state to prevent mutation
        ...state,
        //set the new loggedInUser to the object we made in OnboardingAction
        loggedInUser: action.payload.signedUpUser,
        //set token to the payload we sent along
        token: action.payload.token,
      };

    case REFRESH_TOKEN:
      //copy state and set new state
      return { ...state, token: action.payload };

    case LOGIN:
      return {
        ...state,
        loggedInUser: action.payload.loggedInUser,
        token: action.payload.token,
      };

    case LOGOUT:
      //set to undefined
      return { ...state, loggedInUser: undefined, token: undefined };

    case UPDATE_NOTIFICATIONS:
      return {
        //copy state
        ...state,
        loggedInUser: {
          //copy loggedInUser
          ...state.loggedInUser,
          //set the notification
          chatNotifications: action.payload.chatNotifications,
          eventNotifications: action.payload.eventNotifications,
        },
        token: action.payload.token,
      };

    case UPDATE_USER:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          studyProgramme: action.payload.studyProgramme,
        },
        token: action.payload.token,
      };

    default:
      return state;
  }
};

export default UserReducer;
