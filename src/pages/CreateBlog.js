import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogValue, setBlogValue] = useState("");
    const navigate = useNavigate();

    const createBlog = (event) => {
        event.preventDefault();

        axios.post("https://apitest.reachstar.io/blog/add", {
            title: blogTitle,
            description: blogValue
        }).then(function (response) {
            console.log("Blog added successfully", response);
            navigate("/Home");
        }).catch(function (error) {
            window.alert("Blog could not be added", error);
            window.location.reload();
        });
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row" style={{backgroundColor:"#DBC8C1", width:"100%", height:"100vh"}}>
                    <div className="col-12">
                        <div className="card mb-2 mt-1 mt-md-5" style={{ borderStyle: "none" }}>
                            <form method="POST" onSubmit={createBlog} style={{ width: "auto", height: "auto" }}>
                                <div className="card-header mb-1" style={{ borderStyle: "none", backgroundColor: "" }}>
                                    <input
                                        type="text"
                                        style={{ width: "100%", textAlign: "center", outlineColor: "#EBEBEB" }}
                                        value={blogTitle}
                                        onChange={(event) => setBlogTitle(event.target.value)}
                                        placeholder="Title"
                                    />
                                </div>
                                <div className="card-body mb-5">
                                    <textarea
                                        style={{ width: "100%", height: "200px", outlineColor: "#DBC8C1" }}
                                        value={blogValue}
                                        onChange={(event) => setBlogValue(event.target.value)}
                                        placeholder="Write your blog content here..."
                                    />
                                </div>
                                <div className="card-footer d-flex justify-content-end" style={{ backgroundColor: "#C8C1C1", borderTopStyle: "none" }}>
                                    <button
                                        type="submit"
                                        className="btn ps-md-5 pe-md-5 pb-md-2 ms-md-5 w-md-100"
                                        id="buttonShadow"
                                        style={{ color: "white", borderRadius: "0px", backgroundColor: "#C62641", fontFamily: "JosefinSans-SemiBold", fontWeight: "600", fontSize: "12px" }}
                                    >
                                        Add Blog
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CreateBlog;

