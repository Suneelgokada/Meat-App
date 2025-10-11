import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
const Header = () => {


    return (
        <div className="header">
            <div >
                <Link to="/"> <img className="logo" alt="logo" src="https://ozmeatsonline.com.au/wp-content/uploads/2020/04/OZ-Meats-HEader-Logo-732x397.png"></img></Link>

            </div>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search for any delicious product"
                />
                <img
                    src="https://www.licious.in/image/search_venus_icon.svg"
                    alt="Search"
                    className="search-icon"
                />
            </div>

            <div className="nav-items">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/">Chicken</Link>
                    </li>
                    <li>
                        <Link to="/">Mutton</Link>
                    </li>
                    <li>
                        <Link to="/">Fish & Food</Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Header;