import React, { useState } from "react";

import { useInputChange } from "../../hooks/useInputChange";
import "./sign-in.scss";
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";
import { signInWithGoogle } from "../../firebase/filebase.utils";

export default function SignIn() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [input, handleInputChange, setInput] = useInputChange({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      email: "",
      password: "",
    });
  };
  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <FormInput
          name='email'
          value={input["email"]} // changed according to state, useful when reset
          type='email'
          required
          handleChange={handleInputChange}
          label='email'
        />

        <FormInput
          name='password'
          value={input["password"]}
          type='password'
          required
          handleChange={handleInputChange}
          label='password'
        />
        <div className='buttons'>
          <CustomButton>Sign in</CustomButton>
          <CustomButton
            type='button'
            onClick={signInWithGoogle}
            isGoogleSignIn={true}
          >
            Sign in with google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
