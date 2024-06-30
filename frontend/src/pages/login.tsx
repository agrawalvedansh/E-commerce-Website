import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react"
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { messageResponse } from "../types/api-types";
import { useNavigate } from "react-router-dom";
import { responseToast } from "../utils/features";


const Login = () => {
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    
    const [login] = useLoginMutation();
    const navigate = useNavigate()
    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);

            const res = await login({                 //this is where post request to our backend server takes place and a new
                name: user.displayName!,              //use is stored in mongodb database
                email: user.email!,
                photo: user.photoURL!,
                gender,
                role: "user",
                dob: date,
                _id: user.uid,
            })

            if("data" in res) {
                responseToast(res, navigate, "/")
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const message = (error.data as messageResponse).message;
                toast.error(message)
            }

        } 
        catch (error) {
            toast.error("Sign In Failed!")
        }
    };
  return (
    <div className="login">
        <main>
            <h1 className="heading">Login</h1>

            <div>
                <label>Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div>
                <label>Gender</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div>
                <p>Already A User?</p>
                <button onClick={loginHandler}>
                    <FcGoogle /> <span>Sign in with Google</span>
                </button>
            </div>
        </main>
    </div>
  )
}

export default Login