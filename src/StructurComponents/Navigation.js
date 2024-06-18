import React, {Fragment} from "react";
import { Link } from "react-router-dom";

function Navigation () {

    return (

        <Fragment>
           


                <div className="navigation"  >
                    <nav>

                        <div className="ul">
                            <nav className="navbar" style={{ height: "100%", width: "100%", padding: "15px", background: "#E4D6CD" }}>

                                <h1 className="logo">typology</h1>


                                <li><Link to={"/home"}> Home&nbsp;</Link></li>
                                <li><Link to={"/Blog"}> Blog&nbsp;</Link></li>
                                <li><Link to={"/createblog"}> createBlog &nbsp;</Link></li>
                                <li><Link to={"/"}> LOG OUT&nbsp;</Link></li>
                                
                            </nav>

                        </div>



                    </nav>
                </div>



          



        </Fragment>

    )
}



export default Navigation;

