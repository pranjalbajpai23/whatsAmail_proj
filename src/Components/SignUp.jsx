/* eslint-disable react/prop-types */
import {  useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"


const SignUp = ({ setNewUser }) => {



    const usrNameRef = useRef();
    const errorRef = useRef();

    const [usrName, setUsrName] = useState("");
    const [pwd, setPwd] = useState("");
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);
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
            const result = await fetch('http://localhost:3500/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: usrName,
                    pwd: pwd
                })
            })

            if (result.ok) {
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
                    setSuccess(true);
                    setTimeout(() => {
                        navigate('/connect');
                    }, 2000);
                }
                else {
                    setErr(data.message);
                }

            }
            else {
                const data = await result.json();
                setErr(data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }


    return <>
        {
            success ?
                <div className="flex flex-col w-fit  text-3xl  border-2 border-black p-8 rounded-md items-center">
                    <span className="text-center" ref={usrNameRef}>{usrName} Registered Successfully</span>
                    <img src="/success.svg" className="w-28 h-28" alt="" />
                </div >
                :
                <div className="flex flex-col w-fit  text-3xl  border-2 border-black p-8 rounded-md">
                    <span className="text-center">Register</span>
                    <span ref={errorRef} className={err ? "err text-red-600 text-sm text-center" : "offscreen"} aria-live="assertive">{err}</span>
                    <form className="flex flex-col text-lg" onSubmit={handleLogIn}>
                        <label htmlFor="username" ref={usrNameRef}>Username</label>
                        <input className="border-2 mb-2" type="text" id="username" onChange={(e) => setUsrName(e.target.value)} />
                        <label htmlFor="pasword" type="password">Create Password</label>
                        <input className="border-2 mb-2" type="password" id="password" onChange={(e) => setPwd(e.target.value)} />
                        <button
                            className="bg-black text-white hover:bg-white hover:text-black hover:border-2 border-black  p-2 px-4 rounded-md align-center mb-2"
                        >Register</button>
                    </form>
                    <Link className="text-sm hover:border-b-2 border-black w-max" onClick={() => setNewUser(false)} >Login into existing account</Link>
                </div >
        }

    </>
}
export default SignUp