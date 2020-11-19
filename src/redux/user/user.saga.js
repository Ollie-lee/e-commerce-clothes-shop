import { takeLatest, put, all, call } from 'redux-saga/effects';

import { UserActionTypes } from './user.type';
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from '../../firebase/filebase.utils';
import {
  googleSignInSuccess,
  googleSignInFailure,
  emailSignInSuccess,
  emailSignInFailure,
  signOutFailure,
  signOutSuccess,
} from './user.action';

import { clearCart } from '../cart/cart.action';

export function* signInWithGoogle() {
  try {
    //returns user + some credentials of user
    const { user } = yield auth.signInWithPopup(googleProvider);
    //same as const userRef = await createUserProfileDocument(userAuth);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    // issue out our success call our action.
    //put() put things back into redux flow
    yield put(
      googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

//payload: { email: input['email'], password: input['password'] }
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    // issue out our success call our action.
    //put() put things back into redux flow
    yield put(
      emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(emailSignInFailure(error));
  }
}

export function* isUserAuthenticated() {
  //use a utility function to check with firebase for whether we have a logged in user or not
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) {
      //user not signed in
      return;
    } else {
      //same as signInWithEmail and signInWithGoogle
      const userRef = yield call(createUserProfileDocument, userAuth);
      const userSnapshot = yield userRef.get();
      yield put(
        emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    emailSignInFailure(error);
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
    // yield put(clearCart());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

//this action type returns a payload
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

//instantiate all saga we need to call
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
  ]);
}
