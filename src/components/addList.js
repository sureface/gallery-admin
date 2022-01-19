import React, {useState} from 'react';
import NavigationBar from "./navigationBar";
import {Link, useHistory} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {MdOutlineClose} from "react-icons/md";
import {toast, ToastContainer} from 'react-toastify';
import axios from "axios";


const AddList = () => {
    let history = useHistory();

    const [albumName, setAlbumName] = useState("");

    const [albumDescription, setAlbumDescription] = useState("");

    const [thumbnailImage, setThumbnailImage] = useState(null);

    const [images, setImages] = useState(null);

    const [order, setOrder] = useState(null);

    const [disableAdd, setDisableAdd] = useState(false);

    const [thumbnailIsLoading, setThumbnailIsLoading] = useState(false);

    const [imagesIsLoading, setImagesIsLoading] = useState(false);

    const thumbnailOnClickHandler = (e) => {
        let thumbnail = e.target.files[0];

        let formData = new FormData();

        formData.append("files[]", thumbnail);

        setThumbnailIsLoading(true);

        axios.post(`${process.env["REACT_APP_API"]}/api/cockpit/addAssets?token=73ad18f6896b8a47f97bfe3f824958`, formData)
            .then((res) => {
                setThumbnailIsLoading(false);

                let assets = res.data.assets;
                let thumbnailPath = "storage/uploads/" + assets[0].path;

                setThumbnailImage(thumbnailPath);
            })
            .catch((err) => {
                console.log(err);
                toast.error("упс.. что-то не так, попробуйте еще раз");
            })
    }

    const uploadAlbumOnClickHandler = (e) => {

        let imagesFiles = e.target.files;

        let formData = new FormData();

        for (let item of imagesFiles) {
            formData.append("files[]", item);
        }

        setImagesIsLoading(true);


        axios.post(`${process.env["REACT_APP_API"]}/api/cockpit/addAssets?token=73ad18f6896b8a47f97bfe3f824958`, formData)
            .then((res) => {
                setImagesIsLoading(false);

                let imagesAssets = res.data.assets;

                setImages(imagesAssets);
            })
            .catch((err) => {
                console.log(err);
                toast.error("упс.. что-то не так, попробуйте еще раз");
            })
    }

    const imagesOnclickHandler = (index) => {

        const imagesCopy = [...images];

        imagesCopy.splice(index, 1);

        setImages(imagesCopy);
    }

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
                        Thumbnail: {path: thumbnailPath},
                        Order: +order
                    }
                }, {headers: {'Content-Type': 'application/json'}})
                    .then((res) => {
                        console.log(res);
                        toast.success(res.data.Heading + " альбом успешно сохранено");
                        history.push("/dashboard");
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
        history.push("/dashboard")
    }

    return (
        <div className="addList">
            <NavigationBar/>
            <ToastContainer/>
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
                            <div className="thumbnailInputWrapper">
                                <input className="form-control mb-3" type="file" name="upload" id="upload" required
                                       onChange={(e) => thumbnailOnClickHandler(e)}/>
                                {
                                    thumbnailIsLoading ?
                                        <div>
                                            <div
                                                className="spinner-border spinner-border-sm text-primary thumbnailLoaderSpinner"
                                                role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        : ""
                                }
                            </div>

                        </div>

                        {
                            thumbnailImage ?
                                <div className="thumbnailOverview">
                                    <img src={process.env["REACT_APP_API"] + "/" + thumbnailImage}
                                         alt="oops something wrong !"/>
                                    <div className="thumbnailClose" onClick={() => setThumbnailImage(null)}>
                                        <MdOutlineClose className="thumbnailClose_icon"/>
                                    </div>
                                </div>
                                : ""
                        }


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
                            <div className="thumbnailInputWrapper">
                                <input className="form-control mb-3" multiple type="file" name="uploadAlbum"
                                       id="uploadAlbum" required onChange={(e) => uploadAlbumOnClickHandler(e)}/>
                                {
                                    imagesIsLoading ?
                                        <div>
                                            <div
                                                className="spinner-border spinner-border-sm text-primary thumbnailLoaderSpinner"
                                                role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        : ""
                                }
                            </div>
                        </div>

                        {
                            images ?
                                <div className="thumbnailOverview mb-3">
                                    <div className="d-flex align-items-center flex-wrap">
                                        {
                                            images.map((item, index) => {
                                                return (
                                                    <div key={index} className="px-2 mb-4 deleteImages">
                                                        <img
                                                            src={process.env["REACT_APP_API"] + "/storage/uploads/" + item.path}
                                                            alt="oops something wrong !"/>

                                                        <div className="imagesClose"
                                                             onClick={() => imagesOnclickHandler(index)}>
                                                            <MdOutlineClose className="imagesClose_icon"/>
                                                        </div>
                                                    </div>
                                                )
                                            })

                                        }
                                    </div>
                                </div>
                                : ""
                        }

                        <div className="form-group mb-3">
                            <label htmlFor="order" className="mb-2">Choose order gallery</label>
                            <input className="form-control" type="number" id="order" name="order" placeholder="order..."
                                   required onChange={(e) => setOrder(e.target.value)}/>
                        </div>

                        <div className="d-flex align-items-center justify-content-between w-100">
                            <button type="button" className={disableAdd ? "btn btn-danger disabled" : "btn btn-danger"}
                                    onClick={() => backDashboard()}>Cancel
                            </button>

                            <button type="submit"
                                    className={disableAdd ? "btn btn-success disabled" : "btn btn-success"}>{disableAdd ? "Saving..." : "Save"}</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddList;