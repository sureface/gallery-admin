import React from 'react';
import {useHistory} from "react-router-dom";

const NavigationBar = () => {
    let history = useHistory();

    const clearStorageAndBack = () => {
        localStorage.clear();
        history.push("/");
    }
    return (
        <section className="h-25 bg-secondary text-white">
            <div className="container py-2 d-flex align-items-center justify-content-between">
                <h4>Панель управления</h4>
                <button className="btn btn-outline-light" onClick={clearStorageAndBack}>Log Out</button>
            </div>
        </section>
    );
};

export default NavigationBar;