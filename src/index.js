import React, {Fragment} from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter,Routes,Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import "./assets/css.css";

import CreateBlog from "./pages/CreateBlog";
import Blog from "./StructurComponents/Blog";




function App() {
    return (
        <Fragment>

            
            <BrowserRouter>
                <Routes>

                    <Route index path="/" element={< Login/>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route index path="/detail/:id" element={<Detail />} />
                    <Route path="/Createblog" element = {<CreateBlog />}/>
                    <Route path="/Blog" element = {<Blog/>} />
                  
                </Routes>

            </BrowserRouter>


        </Fragment>
    )
}

ReactDom.createRoot(document.getElementById("root")).render(< App/>);