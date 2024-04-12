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
            <div className="w-full h-[90vh] flex flex-col items-center bg-white rounded-md  ">
                <ul className="flex pt-2 h-fit w-full justify-evenly bg-[#8D99AE] rounded-md">
                    <li className={`mx-2 w-2/6  text-center font-semibold px-6 cursor-pointer ${isActive=="Phone"?"bg-white text-black rounded-t-lg":"text-white"}`} onClick={()=>setIsActive("Phone")}>Connect Phone Number </li>
                    <li className={`mx-2 w-2/6  text-center font-semibold px-6 cursor-pointer ${isActive=="Email"?"bg-white text-black rounded-t-lg":"text-white"}`} onClick={()=>setIsActive("Email")}>Connect Email ID</li>
                </ul>

                <div className="flex flex-col items-center  justify-center w-full h-full">
                    <div className="flex flex-col w-fit h-fit   text-3xl h-5/6 border-2 border-black p-8 rounded-md">
                        {
                            isActive=="Email" ?
                                <ConnectEmail setSuccess={setSuccess} />
                                :
                                <ConnectPh setSuccess={setSuccess}/>
                        }
                        <Link className="text-sm hover:border-b-2 border-black w-max"  >Unable to connect? mail us</Link>
                    </div >
                </div>
            </div>
    }
    </>
}
export default Connecting;