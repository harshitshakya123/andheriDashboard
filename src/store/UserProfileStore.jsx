import { createContext, useContext, useReducer } from "react";

const userProfileContext = createContext(null);

const initialVal = {
  userData: {
    // role: [],
  },
  signedIn: false,
  theme: "#1677FF",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER_DATA": {
      const userData = action.payload;
      return { ...state, userData: userData, signedIn: true };
    }
    case "SET_SIGNED_IN": {
      return { ...state, signedIn: action.payload };
    }
    case "UPDATE_IMAGE": {
      return { ...state, userData: { ...state.userData, profile_picture_url: action.payload } };
    }
    case "EDIT_PROFILE": {
      return {
        ...state,
        userData: {
          ...state.userData,
          fullName: action.payload.fullName,
        },
      };
    }
    case "SET_THEME": {
      return { ...state, theme: action.payload };
    }

    default:
      return state;
  }
};

export const UserProfileProvider = (props) => {
  const [userProfileC, dispatchUserProfile] = useReducer(reducer, initialVal);

  return (
    <userProfileContext.Provider value={[userProfileC, dispatchUserProfile]} {...props}></userProfileContext.Provider>
  );
};

export const UserProfileContext = () => {
  const context = useContext(userProfileContext);
  if (!context) {
    throw new Error("Please use the context inside parent scope");
  }
  return context;
};
