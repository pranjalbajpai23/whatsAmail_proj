import { Link, NavLink, useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
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
        <div className="flex justify-between items-center font-sans   poppins-regular   ">
            <Link to='/' className="text-2xl m-2 font-bold text-[#0E46A3]">
                <TypeAnimation
                    sequence={[
                        'WhatsAmail',
                        1000,
                        'because we believe your mails do matter!',
                        1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '0.7em', display: 'inline-block' }}
                    repeat={Infinity}
                />
                </Link >
            <div>
                {
                    nav.map(item => (
                        <NavLink key={item.name}
                            to={item.to}
                            className="pb-1 text-lg m-2 text-[#0E46A3] hover:border-b-2 border-[#0E46A3]"
                            style={({ isActive }) => (isActive ? { borderBottom: "2px solid black" } : {})}
                        >
                            {item.name}
                        </NavLink>
                    ))
                }
                {
                    localStorage.getItem('id') ? <NavLink onClick={handleLogout} className="pb-1 text-lg m-2 text-[#0E46A3] hover:border-b-2 border-[#0E46A3]">Logout</NavLink> : <NavLink to='/login' className="pb-1 text-lg m-2 text-[#0E46A3] hover:border-b-2 border-[#0E46A3]">Login</NavLink>
                }

            </div>
        </div>
    </>
}
export default Navbar;