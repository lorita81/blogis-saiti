
import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navigation from "../StructurComponents/Navigation";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();

        axios.post("https://apitest.reachstar.io/signin", {
            email: email,
            password: password
        })
        .then(response => {
            navigate("/Home");
        })
        .catch(error => {
            setError("თქვენ ვერ გაიარეთ ავტორიზაცია, გთხოვთ გაიაროთ რეგისტრაცია");
            window.alert(error);
        });
    };

    return (
        <Fragment>
          
            <div className="container-fluid-login" >

                <div className="container-login-body " >
                    <div className="row justify-content-end" style={{ height: "100vh" }}  >
                        <div className="col-6">
                        <h1 className="welcome mt-5">Welcome to lifestyle and personal health, beauty, and lifestyle blog</h1>
                            <form method="POST" onSubmit={login}>
                                <div className="form-group mb-5 mt-5">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}

                                <br></br>
                                <div className="button">
                                    <input type="submit" className="btn btn-primary" value="Log in" />
                                </div>
                                <br></br>
                               
                            </form>
                            <h3>Don't have an account? </h3>
                            <br></br>

                            <div className="button  mt5">
                            <Link to={"/Signup/"} className="btn btn-success">create account</Link>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;
