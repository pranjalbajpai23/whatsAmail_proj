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
        {
            name: "Special Feature",
            to: "listMails"
        }
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
                    <div className="w-[15%] flex flex-col h-full rounded-md pt-20">
                        {
                            options.map(item => {
                                return <NavLink
                                    key={item.name}
                                    to={`./${item.to}`}
                                    className={` m-2 px-2 flex flex-row  justify-start rounded-md text-lg hover:bg-[#EDF2F4] ${item.name == 'Special Feature' && "ring-2 ring-blue-500 "}`}
                                    style={({ isActive }) => (isActive ? item.name == 'Special Feature' ? { backgroundColor: "black", color: "white" }: { backgroundColor: "#8D99AE", color: "white" } : {})}
                                >
                                    
                                    {item.name}

                                    {item.name == 'Special Feature' &&
                                        <span className="relative flex  items-center h-3 w-3 left-2 bottom-2">
                                            <span className="animate-ping absolute  h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                            <span className="relative  rounded-full h-3 w-3 bg-sky-500"></span>
                                        </span>
                                    }
                                </NavLink>
                                
                            })
                        }
                    </div>
                    <EmailsListing lable={activeLink} />
                </div>
        }
    </>
}
export default Emails;