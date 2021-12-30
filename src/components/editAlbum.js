import React, {useState} from 'react';
import NavigationBar from "./navigationBar";
import {Link, useHistory} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";


const EditAlbum = (props) => {
    let history = useHistory();

    // 71 210

    // console.log(this.props.match.params.id)

    const [albumName, setAlbumName] = useState("");
    const [albumDescription, setAlbumDescription] = useState("");
    const [disableAdd, setDisableAdd] = useState(false);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let thumbnail = e.target[0].files[0];
        let imagesFiles = e.target[3].files;

        let formData = new FormData();

        formData.append("files[]", thumbnail);

        for (let item of imagesFiles) {
            formData.append("files[]", item);
        }

        setDisableAdd(!disableAdd);

        axios.post(`${process.env["REACT_APP_API"]}/api/cockpit/addAssets?token=73ad18f6896b8a47f97bfe3f824958`, formData)
            .then((res) => {
                let assets = res.data.assets;
                let thumbnailPath = "storage/uploads/" + assets[0].path;
                let imagesPath = [];

                for (let i = 1; i < assets.length; i++) {
                    imagesPath.push({path: "storage/uploads/" + assets[i].path})
                }

                return axios.post(`${process.env["REACT_APP_API"]}/api/collections/save/album?token=73ad18f6896b8a47f97bfe3f824958`, {
                    data: {
                        Description: albumDescription,
                        Heading: albumName,
                        Images: imagesPath,
                        Thumbnail: {path: thumbnailPath}
                    }
                }, {headers: {'Content-Type': 'application/json'}})
                    .then((res) => {
                        toast.success(res.data.Heading + " альбом успешно сохранено");
                        history.push("/");
                    })
                    .catch((err) => {
                        console.log(err)
                        toast.error("упс.. что-то не так, попробуйте еще раз");
                    });
            })
            .catch((err) => {
                console.log(err);
                toast.error("упс.. что-то не так, попробуйте еще раз");
            })
    }

    const backDashboard = () => {
        history.push("/")
    }

    console.log(props.match.params.id)

    return (
        <div className="EditAlbum">
            <NavigationBar/>
            <div className="container">
                <div className="my-3">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/"
                                              className="text-primary text-decoration-none">Dashboard</Link></BreadcrumbItem>
                        <BreadcrumbItem active>List</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
            <div className="container">

                <div className="my-5">
                    <form className="form-wrapper" onSubmit={onSubmitHandler}>
                        <div className="form-group">
                            <label className="mb-2" htmlFor="upload">Album overview image</label>
                            <input className="form-control mb-3" type="file" name="upload" id="upload" required/>
                        </div>
                        <div className="form-group">
                            <label className="mb-2" htmlFor="title">Album Name</label>
                            <input type="text" className="form-control mb-3" placeholder="Album Name" id="title"
                                   name="title" required onChange={(e) => setAlbumName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label className="mb-2" htmlFor="subtitle">Album description</label>
                            <textarea className="form-control mb-3" id="subtitle" placeholder="Album description"
                                      onChange={(e) => setAlbumDescription(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label className="mb-2" htmlFor="uploadAlbum">Albums</label>
                            <input className="form-control mb-3" multiple type="file" name="uploadAlbum"
                                   id="uploadAlbum" required/>
                        </div>
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <button type="button" className={disableAdd ? "btn btn-danger disabled" : "btn btn-danger"} onClick={() => backDashboard()}>Cancel</button>

                            <button type="submit" className={disableAdd ? "btn btn-success disabled" : "btn btn-success"}>{disableAdd ? "Saving..." : "Save"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditAlbum;