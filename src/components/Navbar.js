import "./Navbar.css";
import {Link} from "react-router-dom";
import React from "react";

function Navbar() {
    const [underLine1, setUnderLine1] = React.useState({
        textDecoration: "none",
        color: "rgb(197, 208, 38)"
    })
    const [underLine2, setUnderLine2] = React.useState({
        textDecoration: "none",
        color:"rgb(78, 200, 78)"
    })
    const [underLine3, setUnderLine3] = React.useState({
        textDecoration: "none",
        color:"rgb(151, 8, 8)"
    })
    function Checked1() {
        setUnderLine1({ textDecoration: "underline",color: "rgb(197, 208, 38)" })
        setUnderLine2({ textDecoration: "none",color:"rgb(78, 200, 78)" })
        setUnderLine3({ textDecoration: "none",color:"rgb(151, 8, 8)" })
    }
    function Checked2() {
        setUnderLine2({ textDecoration: "underline",color:"rgb(78, 200, 78)" })
        setUnderLine1({ textDecoration: "none",color: "rgb(197, 208, 38)" })
        setUnderLine3({ textDecoration: "none",color:"rgb(151, 8, 8)" })
    }
    function Checked3() {
        setUnderLine3({ textDecoration: "underline",color:"rgb(151, 8, 8)" })
        setUnderLine1({ textDecoration: "none",color: "rgb(197, 208, 38)" })
        setUnderLine2({ textDecoration: "none",color:"rgb(78, 200, 78)" })
    }
    const handleClick = (anchor) => () => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      };
    return (
        <nav className="nav-list">
            <div className="links">
            <Link onClick={Checked2} style={underLine2} to="/DownloadFiles/" className="nav-item">Download Files</Link>
            <Link onClick={Checked1} style={underLine1} to="/UploadFiles/" className="nav-item">Upload Files</Link>
            <Link onClick={Checked3} style={underLine3} to="/scinceHub/" className="nav-item">Science Hub</Link>
            </div>
        </nav>
    )
}

export default Navbar;