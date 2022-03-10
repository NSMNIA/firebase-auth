import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthProvider';

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signUp }: any = useAuth();

  function handleSubmit(e: Event){
    e.preventDefault();

    signUp(emailRef.current.value, passwordRef.current.value)
  }

  return (
    <>
      <input type="email" ref={emailRef} />
      <input type="password" ref={passwordRef} />
      <input type="password"  ref={passwordConfirmRef} />
    </>
  );
}
export default Register;