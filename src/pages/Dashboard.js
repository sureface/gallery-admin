import React from 'react';
import NavigationBar from "../components/navigationBar";
import ResultList from "../components/resultList";
import {ToastContainer} from "react-toastify";

const Dashboard = () => {
    return (
        <section className="Dashboard">
            <ToastContainer />
            <NavigationBar />
            <ResultList />
        </section>
    );
};

export default Dashboard;