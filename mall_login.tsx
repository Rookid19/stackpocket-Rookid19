"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Input from "@/components/clientComponents/Inputs/input";
import Button from "@/components/clientComponents/Buttons/Buttonv2";
import Link from "next/link";
import { signIn } from "next-auth/react";
import db from "@/firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { checkDocumentExists } from "@/firebase/functions";
type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    // const Email = email.toLowerCase()
    setLoading(true);
    const documentRef = doc(
      db,
      "users",
      email.toLowerCase(),
      "Profile",
      "details"
    );
    const validation = await checkDocumentExists(documentRef);

    const mainData: Object[] = [];
    if (validation) {
      try {
        const documentRef = query(
          collection(db, "users", email.toLowerCase(), "Profile"),
          where("password", "==", password),
          where("email", "==", email.toLowerCase())
        );
        const querySnapshot = await getDocs(documentRef);
        querySnapshot.forEach((doc:any) => {
          mainData.push(doc.data());
        });
        if (mainData.length > 0) {
          signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/",
          });
          setLoading(false)
        } else {
          alert("Incorrect Password");
          setLoading(false)
        }
      } catch (error) {
        alert(error);
        setLoading(false)
      }
    } else {
      alert("User does not exist");
      setLoading(false)
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Log into your account</div>
        <div className={styles.subtitle}>
          Join the thousands of people who use Caldar Mall Africa every day to
          buy and sell goods and services.Join the thousands of people who use
          Caldar Mall Africa every day to buy and sell goods and services.
        </div>
        <div className={styles.form}>
          <Input
            label="Email"
            placeholder="email"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
            type="email"
          />

          <Input
            label="Password"
            placeholder="password"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
            type="password"
          />

          <div className={styles.forgot}>Forgot password?</div>
          <Button
            loading={loading}
            action={() => onSubmit()}
            style={{
              width: "100%",
              marginTop: "2rem",
              height: 60,
              textAlign: "center",
              fontSize: 19,
              fontWeight: "bolder",
              backgroundColor :email.length === 0 ? "#cccccc" : null
            } as React.CSSProperties}
            text={"Log in"}
            type={"outline"}
            disabled={email.length === 0}
          />
        </div>
        <div className={styles.registerxx}>
          <div className={styles.reg}>
            Don't have an account?{" "}
            <Link href={"/register"}>
              <span className={styles.reg2}>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
