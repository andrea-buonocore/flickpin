import { NavLink } from "react-router-dom";
import { AiOutlineUser, AiOutlineHome } from "react-icons/ai"

const Header = () => {
    return (
        <header className="flex justify-between items-center py-4 px-8 absolute z-30 text-white w-full">
            <NavLink to="/home" className="font-bold">FlickPin</NavLink>
            <nav>
                <ul className="flex gap-4">
                    <li className="font-light"><NavLink to="/"><AiOutlineHome size={20}/></NavLink></li>
                    <li className="font-light"><NavLink to="/me"><AiOutlineUser size={20}/></NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;