import { NavLink } from "react-router-dom";
import "../navbar/NavMenu.css";

function NavMenu({ items }){
    return (
        <div className="navbar-menu">
            <div className="navbar-start">
                {items.map((item, index) =>(
                    <NavLink
                        key={index}
                        to={item.url}
                        activeclassName={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join("navbar-item")
                        }
                    >
                        {item.text}
                    </NavLink>
                ))}
            </div>
        </div>
    )
};

export default NavMenu;