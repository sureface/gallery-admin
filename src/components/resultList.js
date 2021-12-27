import React from 'react';
import {Link} from "react-router-dom";

const ResultList = () => {
    return (
        <div>
            <div className="container">
                <div className="py-3 w-100 d-flex align-items-center justify-content-end">
                    <Link to="list" class="btn btn-success">Add new board</Link>
                </div>
                <div className="row">
                    <div className="col-12 bg-white shadow-lg py-3 d-flex align-items-center justify-content-between">
                        <div>
                            <img src="" alt="sorry something want wrong!"/>
                        </div>
                        <div className="d-flex align-items-center">
                            <h3 className="me-4">Title</h3>
                            <h3>subtitle</h3>
                        </div>
                        <div className="d-flex align-items-center">
                            <button className="btn btn-danger me-2">Del</button>
                            <button className="btn btn-success">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultList;