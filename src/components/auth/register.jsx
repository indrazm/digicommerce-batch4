"use client";

import Link from "next/link";
import { useState } from "react";

export const Register = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  function handleChangeInput(event) {
    setRegisterData({ ...registerData, [event.target.name]: event.target.value });
  }

  async function handleRegister() {
    const { firstName, lastName, username, email, password } = registerData;

    if (!firstName || !lastName || !username || !email || !password) {
      console.log("All fields must be filled");
      return;
    }

    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(registerData),
    });

    const data = await res.json();
    console.log(data);
  }

  return (
    <main className="space-y-6">
      <div className="font-medium tracking-tight text-base">Digicommerce.</div>
      <div className="">
        <h1>Register</h1>
        <p>Create an account for digicommerce.</p>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input name="firstName" placeholder="First name" onChange={handleChangeInput} />
          <input name="lastName" placeholder="Last name" onChange={handleChangeInput} />
        </div>
        <input name="username" placeholder="username" onChange={handleChangeInput} />
        <input name="email" placeholder="email@domain.com" onChange={handleChangeInput} />
        <input name="password" placeholder="password" onChange={handleChangeInput} />
        <button className="btn-md" onClick={handleRegister}>
          Register
        </button>
      </div>
      <div>
        <div>
          Have an account ?{" "}
          <Link href="/login" className="link">
            <span>Login</span>
          </Link>
        </div>
      </div>
    </main>
  );
};
