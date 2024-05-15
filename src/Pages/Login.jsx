import {useState } from "react";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";
const Login = () => {
    const [newUser, setNewUser] = useState(false);

    return <>
        <div className="w-full h-[100vh] flex items-center justify-center poppins-medium ">
            <div className="w-3/5 flex justify-around">
                
                <img src="Spa_1.png" className="w-[80%] h-full" alt="" />
            </div>
            <div className="w-2/5 h-full flex justify-start align-center items-center">
            {!newUser ?
                <SignIn setNewUser={setNewUser}/>
                :
                <SignUp  setNewUser={setNewUser}/>
            }
            </div>
        </div>
    </>
}
export default Login;