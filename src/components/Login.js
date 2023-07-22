import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { parseJwt } from "../Helpers";
import Layout from "../Layout";
import { api } from "../api/Api";

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
                // todo
            })
    }

    return (
        <Layout>
            <form onSubmit={login} method="post">
                <div className="hero min-h-screen bg-base-200">
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
                                    <input type="text" placeholder="password" name="password" className="input input-bordered" />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
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