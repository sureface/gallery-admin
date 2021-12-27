import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import NavigationBar from "./navigationBar";
import {Link} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";



const AddList = () => {


    const onChangeInput = (e) => {
        let file = e.target.files;

        let formData = new FormData();

        formData.append("files[]", file[0]);

        console.warn("******", ...formData);
    }


    return (
        <div className="addList">
            <NavigationBar/>
            <div className="container">
                <div className="my-3">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/" className="text-primary text-decoration-none">Dashboard</Link></BreadcrumbItem>
                        <BreadcrumbItem active>List</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
            <div className="container">

                <div className="my-5">
                    <form className="form-wrapper">
                        <div className="form-group">
                            <label className="mb-2" htmlFor="upload">Album overview image</label>
                            <input className="form-control mb-3" type="file" name="upload" id="upload" onChange={onChangeInput} />
                        </div>
                        <div className="form-group">
                            <label className="mb-2" htmlFor="title">Album Name</label>
                            <input type="text" className="form-control mb-3" placeholder="Album Name" id="title"
                                   name="title" required/>
                        </div>
                        <div className="form-group">
                            <label className="mb-2" htmlFor="subtitle">Album description</label>
                            <textarea className="form-control mb-3" id="subtitle" placeholder="Album description"/>
                        </div>
                        <div className="form-group">
                            <label className="mb-2" htmlFor="uploadAlbum">Albums</label>
                            <input className="form-control mb-3" multiple type="file" name="uploadAlbum"
                                   id="uploadAlbum"/>
                        </div>
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <button type="reset" className="btn btn-danger">Cancel</button>
                            <button type="submit" className="btn btn-success">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddList;