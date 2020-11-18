import { takeLatest, put, all, call } from 'redux-saga/effects';

import { UserActionTypes } from './user.type';
import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from '../../firebase/filebase.utils';
import {
  googleSignInSuccess,
  googleSignInFailure,
  emailSignInSuccess,
  emailSignInFailure,
} from './user.action';

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

//this action type returns a payload
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

//instantiate all saga we need to call
export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
