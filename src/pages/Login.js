import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';

const Login = () => {
    let history = useHistory();
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [checkError, setCheckError] = useState(false);


    const submitAuth = (e) => {
        e.preventDefault();
        setIsLoading(true);

        let data = {
            user: login,
            password: password
        }

        axios.post(`${process.env["REACT_APP_API"]}/api/cockpit/authUser?token=73ad18f6896b8a47f97bfe3f824958`, data)
            .then((response) => {
                console.log(response);
                setIsLoading(false);

                if (response.status === 200) {
                    toast.success("успешно аутентифицирован");
                    localStorage.setItem("TOKEN-DONE-BY-ADMIN", JSON.stringify(true));
                    history.push("/dashboard");
                }else {
                    toast.error("упс, похоже ты не админ");
                }
            })
            .catch(err => {
                setIsLoading(false);
                setCheckError(true);
                toast.error("неправильные пароль и логин");
                console.log(err)
            });

        setLogin("");
        setPassword("");

    }

    return (
        <section>
            <ToastContainer />
            <div className="container">
                <div className="vh-100 d-flex align-items-center justify-content-center">
                    <div className="card py-5 px-4 w-50">
                        <h1 className="text-center mb-5">Authentication</h1>
                        <form onSubmit={submitAuth}>
                            <input className="form-control mb-3" type="text" id="login" name="login" placeholder="Login"
                                   required onChange={(e) => setLogin(e.target.value)}/>
                            <input className="form-control mb-4" type="password" id="password" name="password"
                                   placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                            {
                                checkError ?
                                    <div className="w-100 d-flex justify-content-center">
                                        <h4 className="text-danger">неправильные пароль или логин</h4>
                                    </div>: ""
                            }

                            <div className="d-flex justify-content-end">
                                <button className={isLoading ? "btn btn-outline-secondary disabled": "btn btn-outline-secondary"}>{isLoading ? "processing.." : "Login"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;