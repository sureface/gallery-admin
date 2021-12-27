import React from 'react';
import NavigationBar from "../components/navigationBar";
import ResultList from "../components/resultList";

const Dashboard = () => {
    return (
        <section className="Dashboard">
            <NavigationBar />
            <ResultList />
        </section>
    );
};

export default Dashboard;