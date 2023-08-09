import { useRef, useState } from "react";
import axios from 'axios';
import "./UploadFiles.css";
import { useMediaQuery } from 'react-responsive';

function UploadFiles() {
    const inputRef = useRef(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [abstract, setAbstract] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState();
    const [library, setLibrary] = useState("");
    const [imgname, setImgname] = useState("");
    const [file, setFile] = useState();
    const [infoo, setInfoo] = useState([]);
    const [message, setMessage] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');
    const [name, setName] = useState('');
    const [registername, setRegistername] = useState('');
    const [userpassword, setUserpassword] = useState('');
    const [userRegisterPassword, setUserRegisterPassword] = useState('');
    const [regcode, setRegcode] = useState('');
    const [enable, setEnable] = useState(null);

    const getLoginFetchData = async (event) => {
        event.preventDefault();
        await fetch(`url/getusers?name=${name}&userpassword=${userpassword}`,
            {
                headers: {
                    "Content-Type": "text/html",
                    "charset": "utf-8"
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    setMessage('loading')
                    throw Error('Could not fetch the data')
                }
                else if (response.ok) {
                    setMessage('Done')
                    return response.json()
                }
            })
            .then(async (data) => {
                if (data.values.length === 0) {
                    setMessage("Wrong username or password")
                }
                if(data.values.length>0){
                    setMessage('Success')
                }
                await data.values.map((e) => {
                    setLibrary(e.name)
                    setImgname(e.imgname)
                })
                console.log(data)
                return (
                    setInfoo(data.values));
            })
            .catch(err => {
                setMessage(err.message)
            })
        console.log(`library:${library}`)
        console.log(`imgname:${imgname}`)
    };

    function handleRegisterSubmit(event) {
        event.preventDefault()
        setRegisterMessage('Loading...')
        const url = 'url/register';
        const formData = new FormData();
        formData.append('name', registername);
        formData.append('userpassword', userRegisterPassword);
        formData.append('regcode', regcode);
        const config = {
            headers: {
                "Content-Type": "text/html",
                "charset": "utf-8"
            },
        };
        axios.post(url, formData, config).then(response => {
            if (response.status === 200) {
                setRegisterMessage('Success')

            }
            console.log(response);
        })
            .catch(error => {
                setRegisterMessage(error.message)
                console.log(error);
            });
    }


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setUserpassword(e.target.value);
    };

    const handleRegisterPasswordChange = (e) => {
        setUserRegisterPassword(e.target.value);
    };

    const handleRegesiterCodeChange = (e) => {
        setRegcode(e.target.value);
    };
    const handleRegisterNameChange = (e) => {
        setRegistername(e.target.value);
    };


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };
    const handleYearChange = (e) => {
        setYear(e.target.value);
    };
    const handleAbstractChange = (e) => {
        setAbstract(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    function handleFileChange(event) {
        setFile(event.target.files[0])
    }

    function handleAxiosSubmit(event) {
        event.preventDefault();
        setEnable(true);
        setUploadMessage('Loading...')
        const url = 'url/uploadbooks';
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('year', year);
        formData.append('abstract', abstract);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('library', library);
        formData.append('imgname', imgname);
        formData.append('bookFile', file);
        const config = {
            headers: {
                "Content-Type": "text/html",
                "charset": "utf-8"
            },
        };
        axios.post(url, formData, config).then(response => {
            if (response.status === 200) {
                setUploadMessage("success")
                restForm()
                setEnable(false)
            }
            console.log(response);
        })
            .catch(error => {
                setUploadMessage(error.message)
                console.log(error);
            });
    }

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    console.log(`libraryout:${library}`)
    console.log(`imgnameout:${imgname}`)

    const resetFileInput = () => {
        inputRef.current.value = null;
      };

    function restForm() {
        setTitle("")
        setAuthor("")
        setYear("")
        setAbstract("")
        setCategory()
        setDescription("")
        resetFileInput()
    }

    return (
        <div>
            {isDesktopOrLaptop && <div className="upolad-page">
                <div className="login">
                    <div className="login-title">Login</div>
                    <form className="login-form" onSubmit={getLoginFetchData}>
                        <input
                            type="text"
                            value={name}
                            className="form-control"
                            onChange={(event) => handleNameChange(event)}
                            placeholder="User Name"
                            required
                        ></input>
                        <input
                            type="password"
                            value={userpassword}
                            className="form-control"
                            onChange={(event) => handlePasswordChange(event)}
                            placeholder="Password"
                            required
                        ></input>
                        <button type="submit" className="btn btn-success">Login</button>
                        <div className="message">{message}</div>
                    </form>
                </div>
                <div className="form-container">
                    {!infoo.length > 0 && <div>Please login to upload files</div>}
                    {infoo.length > 0 && <form onSubmit={handleAxiosSubmit}>
                        <label htmlFor="title" className="label">Title:</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            className="form-control"
                            onChange={(event) => handleTitleChange(event)}
                            required
                        />
                        <label htmlFor="author" className="label">Author:</label>
                        <input
                            type="text"
                            value={author}
                            className="form-control"
                            onChange={(event) => handleAuthorChange(event)}
                        />
                        <label htmlFor="description" className="label">Description:</label>
                        <input
                            type="text"
                            value={description}
                            className="form-control"
                            onChange={(event) => handleDescriptionChange(event)}
                        />
                        <label htmlFor="abstract" className="label">Abstract:</label>
                        <textarea
                            type="text"
                            value={abstract}
                            className="form-control"
                            onChange={(event) => handleAbstractChange(event)}
                        />
                        <label htmlFor="year" className="label">Year:</label>
                        <input
                            type="text"
                            value={year}
                            className="form-control"
                            onChange={(event) => handleYearChange(event)}
                            required
                        />
                        <label htmlFor="category" className="label">Category:</label>
                        <select typeof="select" className="form-select custom-select" id="category" name="category" onChange={(event) => handleCategoryChange(event)} required>
                            <option value={1}>Marine Chemistry</option>
                            <option value={2}>Marine Geology</option>
                            <option value={3}>Marine Biology</option>
                            <option value={4}>Marine Physics</option>
                            <option value={5}>Marine Agriculture</option>
                        </select>
                        <label htmlFor="myfile" className="label" >Select a file:</label>
                        <input ref={inputRef} type="file" className="form-control" id="bookFile" name="myfile" key="bookFile"
                            onChange={handleFileChange} required></input>
                        <br />
                        <button type="submit" className="btn btn-success" disabled={enable} >Submit</button>
                        <div className="upload-message">{uploadMessage}</div>
                    </form>}
                </div>
                <div className="login">
                    <div className="login-title">Register</div>
                    <form className="login-form" onSubmit={handleRegisterSubmit}>
                        <input
                            type="text"
                            value={registername}
                            className="form-control"
                            onChange={(event) => handleRegisterNameChange(event)}
                            placeholder="User Name"
                            required
                        ></input>
                        <input
                            type="text"
                            value={regcode}
                            className="form-control"
                            onChange={(event) => handleRegesiterCodeChange(event)}
                            placeholder="Register Code"
                            required
                        ></input>
                        <input
                            type="password"
                            value={userRegisterPassword}
                            className="form-control"
                            onChange={(event) => handleRegisterPasswordChange(event)}
                            placeholder="Password"
                            required
                        ></input>
                        <button type="submit" className="btn btn-success">Register</button>
                        <div className="message">{registerMessage}</div>
                    </form>
                </div>
            </div>}
            {isTabletOrMobile && <div className="upolad-page-mobile">
                <div className="login">
                    <div className="login-title">Login</div>
                    <form className="login-form" onSubmit={getLoginFetchData}>
                        <input
                            type="text"
                            value={name}
                            className="form-control"
                            onChange={(event) => handleNameChange(event)}
                            placeholder="User Name"
                            required
                        ></input>
                        <input
                            type="password"
                            value={userpassword}
                            className="form-control"
                            onChange={(event) => handlePasswordChange(event)}
                            placeholder="Password"
                            required
                        ></input>
                        <button type="submit" className="btn btn-success">Login</button>
                        <div className="message">{message}</div>
                    </form>
                </div>
                <div className="form-container-mobile">
                    {!infoo.length > 0 && <div>Please login to upload files</div>}
                    {infoo.length > 0 && <form onSubmit={handleAxiosSubmit} className="form-upload-mobile">
                        <label htmlFor="title" className="label">Title:</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            className="form-control"
                            onChange={(event) => handleTitleChange(event)}
                            required
                        />
                        <label htmlFor="author" className="label">Author:</label>
                        <input
                            type="text"
                            value={author}
                            className="form-control"
                            onChange={(event) => handleAuthorChange(event)}
                        />
                        <label htmlFor="description" className="label">Key Words:</label>
                        <input
                            type="text"
                            value={description}
                            className="form-control"
                            onChange={(event) => handleDescriptionChange(event)}
                        />
                        <label htmlFor="abstract" className="label">Abstract:</label>
                        <textarea
                            type="text"
                            value={abstract}
                            className="form-control"
                            onChange={(event) => handleAbstractChange(event)}
                        />
                        <label htmlFor="year" className="label">Year:</label>
                        <input
                            type="text"
                            value={year}
                            className="form-control"
                            onChange={(event) => handleYearChange(event)}
                            required
                        />
                        <label htmlFor="category" className="label">Category:</label>
                        <select typeof="select" className="form-select custom-select" id="category" name="category" onChange={(event) => handleCategoryChange(event)} required>
                            <option value={1}>Marine Chemistry</option>
                            <option value={2}>Marine Geology</option>
                            <option value={3}>Marine Biology</option>
                            <option value={4}>Marine Physics</option>
                            <option value={5}>Marine Agriculture</option>
                        </select>
                        <label ref={inputRef} htmlFor="myfile" className="label" >Select a file:</label>
                        <input type="file" className="form-control" id="bookFile" name="myfile" key="bookFile"
                            onChange={handleFileChange} required></input>
                        <br />
                        <button type="submit" className="btn btn-success" disabled={enable}>Submit</button>
                        <div className="upload-message">{uploadMessage}</div>
                    </form>}
                </div>
                <div className="login">
                    <div className="login-title">Register</div>
                    <form className="login-form" onSubmit={handleRegisterSubmit}>
                        <input
                            type="text"
                            value={registername}
                            className="form-control"
                            onChange={(event) => handleRegisterNameChange(event)}
                            placeholder="User Name"
                            required
                        ></input>
                        <input
                            type="text"
                            value={regcode}
                            className="form-control"
                            onChange={(event) => handleRegesiterCodeChange(event)}
                            placeholder="Register Code"
                            required
                        ></input>
                        <input
                            type="password"
                            value={userRegisterPassword}
                            className="form-control"
                            onChange={(event) => handleRegisterPasswordChange(event)}
                            placeholder="Password"
                            required
                        ></input>
                        <button type="submit" className="btn btn-success">Register</button>
                        <div className="message">{registerMessage}</div>
                    </form>
                </div>
            </div>}
        </div>
    );
}

export default UploadFiles;