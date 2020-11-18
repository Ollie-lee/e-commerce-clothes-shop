import { UserActionTypes } from './user.type';

const initialState = {
  currentUser: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    //either of the case will return the obj
    case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        //get error and retry sign-in, set error to null
        error: null,
      };
    case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
    case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
      return { ...state, error: payload };

    default:
      return state;
  }
};
