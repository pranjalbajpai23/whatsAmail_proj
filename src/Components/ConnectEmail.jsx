/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGoogleAuth from "../Hooks/useGoogleAuth";
import Success from "./Success";

const ConnectEmail=()=>{
    const [email, setEmail] = useState("");
    const { connectGmail, updateToken } = useGoogleAuth();
    const [isSuccess,setSuccess]=useState(false);
    const navigate = useNavigate();

    const connectToGoogle= async (event)=>{
        await connectGmail(event);
    }

    const saveRefreshToken = async () => {
        const modifiedGmailID = email.replace(/\./g, "_");
        if (localStorage.getItem("code")) {
            const res1 = await updateToken(modifiedGmailID)
            if (res1===true) {
                setSuccess(true)
                alert("You will be logged out, Kindly login again !!");
                localStorage.clear();
                setTimeout(() => {
                    navigate('/inbox');
                }, 2000)
            }
            else {
                alert("Some Error Occured Kindly Logout and Login Back!")
            }
        }
        else {
            console.log("Can't Connect to Google at this moment!")
        }
    }
    return <>
            {
            isSuccess?
            <Success text={"Gmail Account"}/>
            :
            <>
                <span className="text-center mb-16">Connect your E-Mail Accounts</span>
                <input type="email" name="" id="" className="border-2 rounded-md text-lg border-black" placeholder="Enter your Email Id" onChange={(e) => setEmail(e.target.value)} />
                    <button onClick={connectToGoogle}>Get Google</button>
                <button className="flex border-2 border-black p-2 items-center rounded-md my-2 hover:bg-black hover:text-white" onClick={saveRefreshToken} >
                    <img src="/google.svg" className="w-8 h-8 mx-2" alt="" /> Connect Google Account
                </button>
            </>
            }
    </>
}
export default ConnectEmail;