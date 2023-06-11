"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Input from "@/components/clientComponents/Inputs/input";
import { Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { db_registerUser } from "@/firebase/functions";
import UseModal from "@/components/clientComponents/Modal/Model";
import congrates from "@/public/assets/congrats.png";
import ReactLoading from "react-loading";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
type Props = {};

const Register = (props: Props) => {
  const router = useRouter();
  const [checked, setChecked] = React.useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState(false);

  const {data:session} = useSession()


  console.log('frt',session)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onRegister = async () => {
    // check if password and confirm password match
    setLoading(true);
    // check for all fields

    db_registerUser({
      name,
      email,
      password,
      phone,
      confirmPassword,
      setSuccess,
      setError,
      setLoading,
      setMessage,
      setIsMessage
    });
  };

  return (
    <div className={styles.container}>
      <Toaster containerStyle={{
        marginTop: 50,
      }} position="top-right" reverseOrder={false} />
      <UseModal
        image={congrates}
        title="Congratulations!"
        message="Your Account has been successfully Created"
        links={["/login"]}
        names={["Login"]}
        type={["standard"]}
        handleOpen={() => setSuccess(!success)}
        open={success}
      />
      <UseModal
        title={message}
        message="kindly check your details and try again"
        links={["/register"]}
        names={["Try Again"]}
        type={["standard"]}
        handleOpen={() => setIsMessage(!isMessage)}
        open={isMessage}
      />
      <UseModal
        title="Oops User Already Exisit!"
        message="A user with the smae account already exist."
        links={["/register"]}
        names={["Try Again"]}
        type={["line"]}
        handleOpen={() => setError(!error)}
        open={error}
      />

      <center>
        <div className={styles.title}>Create Account</div>
        <div className={styles.sub}>
          Join the thousands of people who use Caldar Mall Africa every day to
          buy and sell goods and services.
        </div>
      </center>

      <div className={styles.formbox}>
        <div className={styles.formside}>
          <Input
            label="Real name"
            placeholder="Real Name"
            onChange={(e: any) => setName(e.target.value.replace(/[^a-zA-Z ]/g, ''))}
            value={name}
            type="text"
          />
          <Input
            label="(+234) Phone Number"
            placeholder="telephone"
            onChange={(e: any) => setPhone(e.target.value)}
            value={phone.replace(/\D/g, "")}
            maxLength={phone[0] === '0' ? 10 : 9}
            type="telephone"
          />
        </div>
        <div className={styles.formside}>
          <Input
            label="Email"
            placeholder="email"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
          <Input
            label="Password"
            placeholder="*************"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          <Input
            label="Confirm Passoword"
            placeholder="*************"
            onChange={(e: any) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
          />
        </div>
      </div>
      <div className={styles.btnbox}>
        <div className={styles.acce}>
          <div className={styles.term}>
            By creating an account, you agree to our{" "}
            <Link href="#"> Terms and Conditions </Link>
            and <Link href="#"> Privacy Policy </Link>
          </div>

          <div className={styles.term}>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              color="primary"
            />
          </div>
        </div>
        <center>
          {checked
            ? <button
                onClick={() => {
                  // router.push("/login");
                  onRegister();
                }}
                className={styles.butt}
                disabled={loading}
              >
                {loading
                  ? <center>
                      <ReactLoading
                        type={"spin"}
                        color={"#fff"}
                        height={30}
                        width={30}
                      />
                    </center>
                  : "Sign Up"}
              </button>
            : null}
        </center>
      </div>
    </div>
  );
};

export default Register;
