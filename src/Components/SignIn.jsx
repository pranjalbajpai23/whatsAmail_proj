/* eslint-disable react/prop-types */
import {  useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAccessTokenGmail } from "../Hooks/useGoogleAuth";
const SignIn = ({ setNewUser }) => {

    const usrNameRef = useRef();
    const errorRef = useRef();
    const [usrName, setUsrName] = useState("");
    const [pwd, setPwd] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        usrNameRef.current.focus();
    }, [])
    useEffect(() => {
        setErr("");
    }, [usrName, pwd])

    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            console.log("sending:", usrName, pwd)
            const authenticate = await fetch('http://localhost:3500/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: usrName,
                    pwd: pwd
                })
            })
            const data = await authenticate.json();
            if (authenticate.ok) {
                console.log(data.id, data.accessToken);
                localStorage.setItem('id', data.id);
                localStorage.setItem('accessToken', data.accessToken);
                const GAccessToken = await getAccessTokenGmail();
                localStorage.setItem('GaccessToken',GAccessToken);
                navigate('/inbox');
            }
            else {
                setErr(data.message);
            }


        } catch (error) {
            console.log(error)
        }   
    }


    return <>
        <div className="flex flex-col  text-3xl px-12 rounded-md shadow-2xl poppins-regular bg-white">
            <span className="text-center mb-8 mt-6 text-[#0E46A3] font-bold">Login</span>
            <span ref={errorRef} className={err ? "err text-red-600 text-sm text-center" : "offscreen"} aria-live="assertive">{err}</span>
            <form className="flex flex-col text-lg" onSubmit={handleLogIn}>
                <label htmlFor="username" className="text-base  text-[#0E46A3]">Username</label>
                <input ref={usrNameRef} className="border-b-2 border-black mb-2 w-[18rem]" type="text" id="username" onChange={(e) => setUsrName(e.target.value)} required />
                <label htmlFor="pasword" type="password" className="text-base mt-6 text-[#0E46A3]" >Password</label>
                <input className="border-b-2 border-black mb-2" type="password" id="password" onChange={(e) => setPwd(e.target.value)} />
                <button
                    className="bg-[#1E0342] text-white font-base hover:shadow-lg hover:border-2 border-[#1E0342]  p-2 px-4 rounded-md align-center mb-2 mt-4"
                >Login</button>
            </form>
            <Link className="text-sm font-medium text-[#0E46A3] hover:border-b-2 border-black w-max mb-8 mt-2" onClick={() => setNewUser(true)} >new user? register from here</Link>
        </div>
    </>
}
export default SignIn;