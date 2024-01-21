import React from "react";
import { useState } from "react";
import "./DownloadFiles.css";
import { useMediaQuery } from 'react-responsive';
import Popup from 'react-widget-popup';
import 'react-widget-popup/style';

function DownloadFiles() {
    const [info, setInfo] = useState([]);
    const [maxBooks, setMaxBooks] = useState([]);
    const [message, setMessage] = useState('');
    const [searchMessage, setSearchMessage] = useState('');
    const [catId, setCatId] = useState(null);
    const [text, setText] = useState('th');
    const [library, setLibrary] = useState(null);
    const [scinceWebsite, setScinceWebsite] = useState(`url/..../...`);
    const [bookLink, setBookLink] = useState(`url/...../......`);
    let scinceHubBookLink = `${scinceWebsite}/${bookLink}`;
    const [open, setOpen] = useState();

    const getData = async () => {
        await fetch("url/getBooks",
            {
                headers: {
                    "Content-Type": "----",
                    "charset": "----"
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw Error('Could not fetch the data')
                }
                else if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => {
                console.log(data)
                if(data.successful){
                    setMessage('Done')
                }
                return setInfo(data.values)

            })
            .catch(err => {
                setMessage(err)
            })
    };
    const getSearchFetchData = async (event) => {
        event.preventDefault();
        await fetch(`url/getBook?text=${text}&catId=${catId}`,
            {
                headers: {
                    "Content-Type": "------",
                    "charset": "------"
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw Error('Could not fetch the data')
                }
                else if (response.ok) {
                    setSearchMessage('Done')
                    return response.json()
                }
            })
            .then((data) => {
                console.log(data)
                return setInfo(data.values)
            })
            .catch(err => {
                setSearchMessage(err)
            })
    };



    const getMaxBooksData = async () => {
        await fetch(`url/docnum?library=${library}`,
            {
                headers: {
                    "Content-Type": "------",
                    "charset": "------"
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw Error('Could not fetch the data')
                }
                else if (response.ok) {
                    setMessage('Done')
                    return response.json()
                }
            })
            .then((data) => {
                console.log(data)
                return setMaxBooks(data.values)
            })
            .catch(err => {
                setMessage(err)
            })
    };

    React.useEffect(() => {
        getData();

    }, [])

    function executeOnClick(isExpanded) {
        console.log(isExpanded);
    }
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleCatIdChange = (e) => {
        setCatId(e.target.value);
    };

    const handleScinceHubChange = (e) => {
        setScinceWebsite(e.target.value);
    };

    const handleBookLinkChange = (e) => {
        setBookLink(e.target.value);
    };

    const handleLibraryChange = (e) => {
        setLibrary(e);
        getMaxBooksData(library);
    };

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })


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
        <div>
            <div className="download-page">
                <div className="search-section">
                    {isDesktopOrLaptop && <form onSubmit={getSearchFetchData} className="form-search">
                        <label htmlFor="search"><b>Search:</b></label>
                        <input type="text" className="form-control" id="search" onChange={handleTextChange} placeholder="Type Text"></input>
                        <label htmlFor="category"><b>Category:</b></label>
                        <select typeof="select" className="form-select custom-select" id="category" name="category" onChange={handleCatIdChange} >
                            <option>All</option>
                            <option value={1}>Marine Chemistry</option>
                            <option value={2}>Marine Geology</option>
                            <option value={3}>Marine Biology</option>
                            <option value={4}>Marine Physics</option>
                            <option value={5}>Marine Agriculture</option>
                        </select>
                        <button type="submit" className="btn btn-success">Search</button>
                        <div className="length-info">{info.length}</div>
                    </form>}
                    {isTabletOrMobile && <form className="search-form-mobile" onSubmit={getSearchFetchData}>
                        <div htmlFor="search"><b>Search:</b></div>
                        <input type="text" className="form-control" id="search" onChange={handleTextChange} placeholder="Type Text"></input>
                        <div htmlFor="category"><b>Category:</b></div>
                        <select typeof="select" className="form-select custom-select" id="category" name="category" onChange={handleCatIdChange} >
                            <option>All</option>
                            <option value={1}>Marine Chemistry</option>
                            <option value={2}>Marine Geology</option>
                            <option value={3}>Marine Biology</option>
                            <option value={4}>Marine Physics</option>
                            <option value={5}>Marine Agriculture</option>
                        </select>
                        <button type="submit" className="btn btn-success btn-search-mobile">Search</button>
                        <div className="length-info-mobile">{info.length}</div>
                    </form>}
                </div>
                <section>
                    {isDesktopOrLaptop &&<section> <div className="cards-list">
                        {!message && <div className="loading-all">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <h2 className="loading">Loading...</h2>
                        </div>}
                        {info.length > 0 && <div>
                            {info.map((e) => {
                                let downloadLink = `url/${e.filename}`;
                                let translateLink = `https://translate.google.com/?sl=en&tl=ar&text=${e.abstract}&op=translate`;
                                let imgLink = `url/${e.imgname}`;
                                function hanldeCard() {
                                    setOpen(e.filename);
                                }

                                function hanldeCloseCard() {
                                    setOpen("closee");
                                }
                                return (
                                    <div>
                                        <div className="card">
                                        {open === e.filename &&
                                            <Popup
                                            dataBackdrop="static"
                                            keyboard="false"
                                            visible={true}
                                            style={{
                                                border:"2px solid #a3bad2",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                zIndex:"+1",
                                                alignItems: "center",
                                                backgroundImage: "linear-gradient(#a3bad2, #aec3da)",
                                                left:100,
                                                right:100,
                                                top:110,
                                            }}
                                        >
                                            <div className="card-body">
                                                <a className="card-title important btn btn-outline-danger" onClick={hanldeCloseCard}>Close File</a>
                                                <h5 className="card-title important">{e.title}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted not-important">{e.author} - <b className="important">{e.year}</b></h6>
                                                <div className="important"><b>Abstract:</b></div>
                                                <div className="abstract">{e.abstract}</div>
                                                <div className="descriotion"><b>Key Words:</b></div>
                                                <div>{e.description}</div>
                                                <div className="btns-img">
                                                    <div className="img-library">
                                                        <img src={imgLink} className="img" alt="img" />
                                                        <div>Library: <b>{e.library}</b></div>
                                                    </div>
                                                    <div className="translate-download-mobile">
                                                        <a href={translateLink} className="card-link btn btn-info" target={"_blank"}>Translate with Google</a>
                                                        <a href={downloadLink} className="card-link btn btn-success" target={"_blank"}>Download</a>
                                                    </div>
                                                </div>
                                        </div>
                                        </Popup>}
                                            <button type="button" className="btn-title"  aria-pressed="false" autocomplete="off" onClick={hanldeCard}>
                                                {e.title} - {e.year}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        }
                    </div>
                    </section>
                    }
                    {isTabletOrMobile && <div>
                        <article className="cards-list-mobile">
                            {!message && <div className="loading-all-mobile">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <h2 className="loading">Loading...</h2>
                            </div>}
                            {info.length > 0 && <div>
                                <div className="info-list-mobile">
                                    {info.map((e) => {
                                        let downloadLink = `url/${e.filename}`;
                                        let translateLink = `https://translate.google.com/?sl=en&tl=ar&text=${e.abstract}&op=translate`;
                                        let imgLink = `url/${e.imgname}`;
                                        function hanldeCard() {
                                            setOpen(e.filename);
                                        }

                                        function hanldeCloseCard() {
                                            setOpen("closee");
                                        }

                                        return (
                                            <div className="card-mobile">
                                                <div className="btn-title-mobile" onClick={hanldeCard}>
                                                    <div>{e.title}</div>
                                                    <div>{e.year}</div>
                                                </div>
                                                {open === e.filename &&
                                                <Popup
                                                    visible={true}
                                                    style={{
                                                        border:"2px solid white",
                                                        paddingTop:"20px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        backgroundImage: "linear-gradient(#9fbbd8, #c7daee)",
                                                        top: 100,
                                                        width: "100%",
                                                    }}
                                                >
                                                    <a className="colse-mobile important btn btn-outline-danger" onClick={hanldeCloseCard}>Close File</a>
                                                    <div className="card-body-mobile">
                                                        <h5 className="card-title important">{e.title}</h5>
                                                        <h6 className="card-subtitle-mobile mb-2 text-muted not-important">{e.author} - <b className="important">{e.year}</b></h6>
                                                        <div className="important"><b>Abstract:</b></div>
                                                        <div className="abstract-mobile">{e.abstract}</div>
                                                        <div className="descriotion"><b>Key Words:</b></div>
                                                        <div className="des-mobile">{e.description}</div>
                                                        <div className="btns-img-mobile">
                                                            <div className="img-library">
                                                                <img src={imgLink} className="img" alt="img" />
                                                                <div>Library: <b>{e.library}</b></div>
                                                            </div>
                                                            <div className="translate-download-mobile">
                                                                <a href={translateLink} className="card-link btn btn-info btn-translate-mobile" target={"_blank"}> Translate with Google</a>
                                                                <a href={downloadLink} className="card-link btn btn-success btn-download-mobile" target={"_blank"}>Download</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popup>
                                                }
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            }
                        </article>
                    </div>
                    }
                </section>
            </div>
        </div>
    );
}

export default DownloadFiles;
