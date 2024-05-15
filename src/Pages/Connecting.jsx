import { Link} from "react-router-dom";
import {  useState } from "react";
import Success from "../Components/Success";
import ConnectEmail from "../Components/ConnectEmail";
import ConnectPh from "../Components/ConnectPh";


const Connecting = () => {
    const [success, setSuccess] = useState(false);
    const [isActive, setIsActive] = useState("Email");
    return <>{
        success ?
        <Success/>
        :
            <div className="w-full h-[80vh] flex flex-col items-center bg-white rounded-md  mt-8 border-2 border-[#1E0342] poppins-light">
                <ul className="flex pt-2 h-fit w-full justify-evenly ">
                    <li className={`mx-2 w-2/6  text-center font-medium px-6 cursor-pointer ${isActive == "Phone" ? "bg-[#0E46A3] text-white rounded-md" :"text-[#0E46A3]"}`} onClick={()=>setIsActive("Phone")}>Connect Phone Number </li>
                    <li className={`mx-2 w-2/6  text-center font-medium px-6 cursor-pointer ${isActive == "Email" ? "bg-[#0E46A3] text-white rounded-md" :"text-[#0E46A3]"}`} onClick={()=>setIsActive("Email")}>Connect Email ID</li>
                </ul>

                <div className="flex items-center justify-evenly w-full h-full">
                    <div className="flex justify-end w-1/3 ml-8">
                        <img src="ph.gif" className="" alt="" />
                    </div>
                    <div className="flex flex-col items-center w-2/3">
                        <div className="flex flex-col w-fit 3 h-fit text-3xl h-5/6 border-2 border-black p-8 rounded-md">
                        {
                            isActive=="Email" ?
                                <ConnectEmail setSuccess={setSuccess} />
                                :
                                <ConnectPh setSuccess={setSuccess}/>
                        }
                        </div>
                        <Link className="text-sm font-medium hover:border-b-2 border-black w-max  text-[#0E46A3]"  >Unable to connect? mail us</Link>
                    </div >
                </div>
            </div>
    }
    </>
}
export default Connecting;