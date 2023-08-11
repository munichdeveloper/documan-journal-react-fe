import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { parseJwt } from "../Helpers";
import Layout from "../Layout";
import { api } from "../api/Api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const { userLogin } = useAuth();
    const navigate = useNavigate();


    const signup = async (event) => {
        event.preventDefault();
        api.signup(event.target)
            .then(response => {
                const { token } = response.data;
                const data = parseJwt(token);
                const user = { data, token };
                userLogin(user);
                navigate('/');
            })
            .catch(error => {
                toast('Failed to register. Please choose a different username and try again. ' + error.message);
            })
    }

    return (
        <Layout>
            <ToastContainer
                position="top-middle"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <form onSubmit={signup} method="post">
                <div className="min-h-screen" style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start"
                }}>

                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" placeholder="Choose an email" name="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="Choose a password" name="password" className="input input-bordered" />

                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Sign up</button>
                                </div>
                                <Link to='/login' className="pt-3 hover:underline">Already have an account? Login here.</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

export default Register