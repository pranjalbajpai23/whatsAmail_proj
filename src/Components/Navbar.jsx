import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const nav = [
        {
            name: "Home",
            to: "/",
        },
        {
            name: "About",
            to: "/about",
        },
        {
            name: "Features",
            to: "/features",
        },
    ]
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }
    return <>
        <div className="flex justify-between items-center font-sans  bg-[#EDF2F4]">
            <Link to='/' className="text-2xl m-2"> WhatsAmail</Link >
            <div>
                {
                    nav.map(item => (
                        <NavLink key={item.name}
                            to={item.to}
                            className="pb-1 text-lg m-2 hover:"
                            style={({ isActive }) => (isActive ? { borderBottom: "2px solid black" } : {})}
                        >
                            {item.name}
                        </NavLink>
                    ))
                }
                {
                    localStorage.getItem('id') ? <NavLink onClick={handleLogout} className="pb-1 text-lg m-2 ">Logout</NavLink> : <NavLink to='/login' className="pb-1 text-lg m-2 ">Login</NavLink>
                }

            </div>
        </div>
    </>
}
export default Navbar;