import { Link, useNavigate } from "react-router-dom";
import useGoogleAuth from "../Hooks/useGoogleAuth";
import { useEffect, useRef, useState } from "react";
const Connecting = () => {
    const { connectGmail, updateDB } = useGoogleAuth()
    const connectingGmail = async () => {
        const register = connectGmail();
        if (register)
            console.log('getting controll back')
    }
    const phoneError = useRef();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [success, setSuccess] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const navigate = useNavigate()
    const validatePhone = async () => {
        // eslint-disable-next-line no-useless-escape
        const reg = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
        if (reg.test(phoneNumber)) {
            console.log("vaild number");
            setIsValid(true);
            await updateDB(phoneNumber);
            console.log("getting controll back after phone number ");
            setSuccess(true);
            setTimeout(() => {
                navigate('/mail/inbox');
            }, 2000);
        } else {
            console.log("Invaild number");
            setIsValid(false);
        }
    }
    useEffect(() => {
        setIsValid(true);
    }, [phoneNumber])


    return <>{
        success ? <div className="flex flex-col w-fit  text-3xl  border-2 border-black p-8 rounded-md items-center">
            <span className="text-center" >Successfully Connected your Gmail account</span>
            <img src="success.svg" className="w-28 h-28" alt="" />
        </div > :
            <div className="w-full h-[90vh] flex items-center justify-center">
                <div className="flex flex-col w-fit text-3xl  border-2 border-black p-8 rounded-md">
                    <span className="text-center mb-16">Connect your E-Mail accounts</span>
                    <button className="flex border-2 border-black p-2 items-center rounded-md my-2 hover:bg-black hover:text-white" onClick={connectingGmail} >
                        <img src="/google.svg" className="w-8 h-8 mx-2" alt="" /> Connect Google Account
                    </button>
                    <button className="flex border-2 border-black p-2 items-center rounded-md my-2 hover:bg-black hover:text-white"><img src="/microsoft.svg" className="w-8 h-8 mx-2" alt="" /> Connect Microsoft Account</button>

                    <span className="text-center mb-16 mt-16">Connect your Phone Number</span>
                    {!isValid && (
                        <p className="text-red-800">Please enter a valid phone number.</p>
                    )}
                    <div className="flex border-2 border-black items-center">
                        <input
                            ref={phoneError}
                            type="text"
                            id="phoneNumber"
                            className="py-2"
                            value={phoneNumber}
                            placeholder="Enter your phone number"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={{ borderColor: isValid ? "initial" : "red" }}
                        />
                        <button className=" border-l-2 border-black"><img src="/send.svg" className="w-12 h-12" alt="" onClick={validatePhone} /></button>
                    </div>


                    <Link className="text-sm hover:border-b-2 border-black w-max"  >Unable to connect? mail us</Link>
                </div >
            </div>
    }
    </>
}
export default Connecting;