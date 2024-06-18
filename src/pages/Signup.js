import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Navigation from "../StructurComponents/Navigation";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const signup = (event) => {
        event.preventDefault();

        axios.post("https://apitest.reachstar.io/signup", {
            name: name,
            email: email,
            password: password,
        })
        .then(response => {
            navigate("/Login");
        })
        .catch(error => {
            setError("თქვენ ვერ გაიარეთ რეგისტრაცია!!! გთხოვთ ცადოთ თავიდან");
        });
    };

    return (
        <Fragment>
            <Navigation></Navigation>
            <div className="container-fluid-signup"style={{  backgroundColor:"#F2F2F2"}}>
                <div className="row justify-content-center" >
                    

                    <div className="col-4">
                        
                        
                        
                        <h4 className="create mt-5">Create new Account</h4>
                        
                        <form onSubmit={signup}>
                            <div className="form-group mb-5">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group mb-5">
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
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className="form-control"
                                />
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="form-group d-grid">
                                <input type="submit" className="btn btn-primary " value="Create Account"  />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Signup;
