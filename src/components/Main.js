import UploadFiles from "./UploadFiles";
import DownloadFiles from "./DownloadFiles";
import "./Main.css";
import { Route, Routes } from "react-router-dom";
import ScinceHub from "./ScinceHup";

function Main() {
    return (
        <div className="library">
            <Routes>
            <Route path="/" element={<DownloadFiles />}></Route>
                <Route path="/DownloadFiles" element={<DownloadFiles />}></Route>
                <Route path="/UploadFiles" element={<UploadFiles />}></Route>
                <Route path="/scinceHub" element={<ScinceHub />}></Route>
            </Routes>
        </div>
    );
}

export default Main;