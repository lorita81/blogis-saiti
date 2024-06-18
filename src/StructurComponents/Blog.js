import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateBlog from "../pages/CreateBlog";
import Navigation from "./Navigation";

function Blog() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://apitest.reachstar.io/blog/list")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                setError("Blog feed is empty");
                console.error(error);
            });
    }, []);

    return (
        <Fragment>
         <Navigation></Navigation>
           
           <div className="blog">
           <div className="mt-2 mt-md-4 d-flex justify-content-center">
                <div style={{ width: "50px", height: "0px", border: "0.5px solid #D6D6D6" }}></div>
            </div>
            {error ? (
                <div className="col-12" style={{ height: "auto" }}>
                    <h3 className="text-align-center">{error}</h3>
                </div>
            ) : (
                data.map((item, index) => (
                    <div key={index} className="col-12 p-0 mt-1 mt-md-5" style={{ borderStyle: "none", height: "auto" }}>
                        <div className="card mb-2 mt-1 mt-md-5" style={{ borderStyle: "none" }}>

                            <div className="card-header mb-md-5" style={{ borderStyle: "none", backgroundColor: "#DBC8C1" }}>
                                <h3 className="card-title mt-1 mt-md-5" style={{ backgroundColor: "#DBC8C1", textAlign: "center" }} dangerouslySetInnerHTML={{ __html: item.title }}></h3>
                            </div>

                            <div className="card-body " style={{backgroundColor:"#C8C1C1"}}>
                                <p className="ps-1 ps-md-5 pe-1 pe-md-5" dangerouslySetInnerHTML={{ __html: item.description }} style={{ borderLeftStyle: "solid", borderColor: "#D6D6D6", borderRightStyle: "solid", textAlign: "center" }}></p>
                            </div>

                            <div className="card-footer mb-1 mb-md-5" style={{ borderStyle: "none" }}>
                                <Link to={"/details/" + item.id} className="btn ps-md-5 pt-md-2 pe-md-5 pb-md-2 ms-md-5" id="buttonShadow" style={{ color: "white", borderRadius: "0px", backgroundColor: "#143056", fontFamily: "JosefinSans-SemiBold", fontWeight: "600", fontSize: "12px" }}>
                                    <h3>სრულად</h3>
                                </Link>
                            </div>
                            <div className="d-flex justify-content-center" style={{ width: "100%" }}>
                                <div style={{ width: "50px", height: "0px", border: "0.5px solid #D6D6D6" }}></div>
                            </div>
                        </div>
                    </div>
                ))
            )}
           </div>
        </Fragment>
    );
}

export default Blog;
