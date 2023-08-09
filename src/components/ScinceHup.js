import React from "react";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';

function ScinceHub() {
    const [scinceWebsite, setScinceWebsite] = useState(`url/../..`);
    const [bookLink, setBookLink] = useState(`url/../...`);
    let scinceHubBookLink = `https://${scinceWebsite}/${bookLink}`;
    const handleScinceHubChange = (e) => {
        setScinceWebsite(e.target.value);
    };
    const handleBookLinkChange = (e) => {
        setBookLink(e.target.value);
    };
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    return (
        <section id="scinceHub" className="scinceHub">
            {isDesktopOrLaptop && <div className="hub">
                <h5>Download Docs From Science Hub:</h5>
                <div className="container-hub">
                    <div className="form-hub">
                        <input type="text" id="link" className="form-control link-input" onChange={handleBookLinkChange} placeholder="Past link"></input>
                        <a type="submit" className="btn btn-warning btn-doc" href={scinceHubBookLink}>Open Doc</a>
                        <input type="text" id="link1" className="form-control" onChange={handleScinceHubChange} placeholder="ScinceHub website"></input>
                    </div>
                </div>
            </div>}
            {isTabletOrMobile && <div className="hub-mobile">
                <h6>Download Docs From Science Hub</h6>
                <div className="container-hub-mobile">
                    <div className="form-hub-mobile">
                        <input type="text" id="link" className="form-control" onChange={handleBookLinkChange} placeholder="Past link"></input>
                        <a type="submit" className="btn btn-warning btn-doc" href={scinceHubBookLink} target={"_blank"}>Open Doc</a>
                        <input type="text" id="link1" className="form-control" onChange={handleScinceHubChange} placeholder="ScinceHub website"></input>
                    </div>
                </div>
            </div>}
        </section>
    );
}

export default ScinceHub;