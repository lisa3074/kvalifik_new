//INSTALLED PACKAGES
import React from "react";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } from "@expo-google-fonts/open-sans";
import { Teko_500Medium } from "@expo-google-fonts/teko";
import AppLoading from "expo-app-loading";

//APP COMPONENTS
import ChatReducer from "./components/CHAT/chatStore/ChatReducer";
import UserReducer from "./components/USER/userStore/UserReducer";
import StartNavigation from "./components/StartNavigation";
import User from "./classModels/User";

//Initialize reducers
const rootReducer = combineReducers({
  chat: ChatReducer,
  user: UserReducer,
});

//To be able to get redux states in StartNavigation (typescript)
let RootState: User[];
export type RootState = ReturnType<typeof rootReducer>;
//Redux
const store = createStore(rootReducer, applyMiddleware(reduxThunk));

//Load fonts to application
const App = () => {
let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
    Teko_500Medium,
});
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <StartNavigation />
      </Provider>
    );
  }
};
export default App;
