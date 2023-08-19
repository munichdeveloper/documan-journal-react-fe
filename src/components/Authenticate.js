import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '../Layout';
import { loginUser } from '../lib/magic';

const Authenticate = ({ setStatus }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!email) {
            setLoading(false);
            setError('Email is Invalid');
            return;
        }
        try {
            loginUser(email, setStatus)
                .then(() => {
                    setLoading(false);
                    navigate('/');
                });
        } catch (error) {
            setError('Unable to log in');
            console.error(error);
        }
    };

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <Layout>
            <ToastContainer
                position="bottom-center"
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
            <form onSubmit={handleSubmit} onChange={handleChange} method="post">
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
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    );
};

export default Authenticate;