import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";

const Header = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <header
            className={`flex justify-between items-center py-4 px-8 w-full ${isHome ? 'absolute z-30 text-white' : ''}`}
        >
            <NavLink to="/" className='font-bold'>FlickPin</NavLink>
            <nav>
                <ul className="flex gap-4">
                    <li className="font-light">
                        <NavLink to="/">
                            <AiOutlineHome size={20} />
                        </NavLink>
                    </li>
                    <li className="font-light">
                        <NavLink to="/me">
                            <AiOutlineUser size={20} />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
