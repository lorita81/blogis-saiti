import React, {Fragment, useState, useEffect} from "react";
import Navigation from "../StructurComponents/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";




function Home() {

    const [data, setData] = useState([]);

    useEffect(function () {

        axios.get("https://apitest.reachstar.io/blog/list").then(function (response) {

            setData(response.data);

        }).catch(function (error) {
            console.log(error);
        });
    });

    return (

        <Fragment>



            <Navigation></Navigation>

            <div className="container-fluid id-homebody">
                <div className="row justify-content-center">
                    <div className="col-6">

                        {
                            data.map((item, index) => <div className="card mb-5" key={index}>
                                <div className="card-header">
                                    <h3 className="card-title" dangerouslySetInnerHTML={{ __html: item.title }}></h3>
                                </div>

                                <div className="card-body">
                                    <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                </div>
                                <div className="card-footer">
                                    <Link to={"/detail/" + item.id} className="btn btn-success">დეტალურად ნახვა...</Link>
                                </div>
                            </div>)
                        }

                    </div>
                </div>
            </div>

        </Fragment>
    )

}

export default Home;
