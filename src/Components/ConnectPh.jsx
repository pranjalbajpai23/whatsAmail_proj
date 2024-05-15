import { useRef, useState } from "react";
import useGoogleAuth from "../Hooks/useGoogleAuth";
import Success from "./Success";

const ConnectPh=()=>{
    const phoneError = useRef();
    const [phoneNumber, setPh] = useState("");
    const [isValid, setIsValid] = useState(false);
    const { setPhoneNumber } = useGoogleAuth();

    const [isSuccess,setSuccess]=useState(false);
    
    const validatePhone = async () => {
        // eslint-disable-next-line no-useless-escape
        const reg = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
        if (reg.test(phoneNumber)) {
            setIsValid(true);
            const res = await setPhoneNumber(phoneNumber);
            console.log(res);
            if (res) {
                setSuccess(true)
            }
            else {
                alert("Internal Server Error");
            }

        } else {
            console.log("Invaild number");
            setIsValid(false);
        }
    }
    return <>
        {
            isSuccess?
            <Success text={"Phone Number"}/>
            :
            <>
                <span className="text-center mb-16">Connect your Phone Number</span>
                {!isValid && (
                    <p className="text-red-800 text-base tex-center">Please enter a valid phone number.</p>
                )}
                <div className="flex border-2 border-black items-center text-base">
                    <input
                        ref={phoneError}
                        type="text"
                        id="phoneNumber"
                        className="p-2 w-11/12"
                        value={phoneNumber}
                        placeholder="Enter your phone number"
                        onChange={(e) => setPh(e.target.value)}
                        style={{ borderColor: isValid ? "initial" : "red" }}
                    />
                    <button className=" border-l-2 border-black"><img src="/send.svg" className="w-12 h-12" alt="" onClick={validatePhone} /></button>
                </div>
            </>
        }
    </>
}
export default ConnectPh;