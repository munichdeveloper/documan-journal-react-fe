import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { parseJwt } from "../Helpers";
import Layout from "../Layout";
import { api } from "../api/Api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const { userLogin } = useAuth();
    const navigate = useNavigate();

    const login = async (event) => {
        event.preventDefault();
        const { email, password } = event.target;
        api.authenticate(email.value, password.value)
            .then(response => {
                const { token } = response.data;
                const data = parseJwt(token);
                const user = { data, token };
                userLogin(user);
                navigate('/');
            })
            .catch(error => {
                toast('Login failed. Please check your credentials - ' + error.message);
            })
    }

    return (
        <Layout>
            <ToastContainer
                position="top-center"
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
            <form onSubmit={login} method="post">
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
                                    <input type="text" placeholder="email" name="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" name="password" className="input input-bordered" />

                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

export default Login