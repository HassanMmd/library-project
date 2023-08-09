import "./Header.css";
import Logo from "../assets/himr.png"

function Header(){
    return(
        <header>
            <img src={Logo} alt="Logo" className="logo"></img>
            <h1 className="header-title-library">HIMR Library</h1>
        </header>
    );
}

export default Header;