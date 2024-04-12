import { useEffect } from "react";
import EmailsListing from "./EmailsListing";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Login from "../Pages/Login";
const Emails = () => {
    const location = useLocation();
    const navigate =useNavigate()
    const activeLink = location.pathname.split("/").pop();

    const options = [
        {
            name: "Inbox",
            to: "inbox"
        },
        {
            name: "Starred",
            to: "starred"
        },
        {
            name: "Snoozed",
            to: "snoozed"
        },
        {
            name: "Sent",
            to: "sent"
        },
        {
            name: "Draft",
            to: "draft"
        },
        {
            name: "Connect",
            to: "connect"
        },

    ]

    useEffect(()=>{
        if(location.pathname=='/') {
            return navigate('inbox')
        }
    },[location.pathname,navigate])
    return <>
        {
            localStorage.getItem('id') == null ?
                <Login/>
                :
                <div className="flex h-[94%] overflow-none bg-[#EDF2F4]">
                    <div className="w-1/6 flex flex-col h-full rounded-md pt-20">
                        {
                            options.map(item => (
                                <NavLink
                                    key={item.name}
                                    to={`./${item.to}`}
                                    className="m-2 px-2 rounded-md text-lg hover:bg-[#EDF2F4]"
                                    style={({ isActive }) => (isActive ? { backgroundColor: "#8D99AE", color: "white" } : {})}
                                >
                                    {item.name}
                                </NavLink>
                            ))
                        }
                    </div>
                    <EmailsListing lable={activeLink} />
                </div>
        }
    </>
}
export default Emails;