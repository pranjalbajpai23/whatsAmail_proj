import EmailsListing from "./EmailsListing";
import { NavLink, useLocation, } from "react-router-dom";
const Emails = () => {
    const location = useLocation();
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

    return <>
        {
            localStorage.getItem('id') == null ?
                <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col w-fit  text-3xl  border-2 border-black p-8 rounded-md items-center">
                        <span className="text-center"> Please Login First</span>
                        <img src="/login.svg" className="w-28 h-28" alt="" />
                        <NavLink to='/login' className='border-2 border-black p-2 rounded-md hover:bg-slate-200'>Login</NavLink>
                    </div >
                </div>
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