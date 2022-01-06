import React, {useEffect, useState} from 'react';
import NavigationBar from "./navigationBar";
import {Link, useHistory} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {MdOutlineClose} from "react-icons/md";
import {toast} from 'react-toastify';
import axios from "axios";


const EditAlbum = (props) => {
    let history = useHistory();

    // 71 210

    // console.log(this.props.match.params.id)

    const [albumName, setAlbumName] = useState("");
    const [albumDescription, setAlbumDescription] = useState("");
    const [data, setData] = useState([]);
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [images, setImages] = useState(null);
    const [checkData, setCheckData] = useState(false);
    const [thumbnailIsLoading, setThumbnailIsLoading] = useState(false);
    const [imagesIsLoading, setImagesIsLoading] = useState(false);
    const [disableAdd, setDisableAdd] = useState(false);


    const fetchApi = () => {
        axios.get(`${process.env["REACT_APP_API"]}/api/collections/get/album?filter[_id]=${props.match.params.id}&token=73ad18f6896b8a47f97bfe3f824958`)
            .then((res) => {
                let data = res.data.entries
                setData(res.data.entries);
                setImages(data[0].Images);
                console.log(data[0].Images,  "get images")
                setCheckData(true);

                setAlbumName(data[0].Heading);
                setAlbumDescription(data[0].Description);
                setThumbnailImage(data[0].Thumbnail.path);
            })
            .catch((err) => {
                console.log(err);
                toast.error("упс.. что-то не так, попробуйте еще раз");
            });
    }

    // run this function when page updated
    useEffect(() => {
        fetchApi(data);
    }, []);

    const thumbnailOnClickHandler = (e) => {
        let thumbnail = e.target.files[0];

        let formData = new FormData();

        formData.append("files[]", thumbnail);

        setThumbnailIsLoading(true);

        axios.post(`${process.env["REACT_APP_API"]}/api/cockpit/addAssets?token=73ad18f6896b8a47f97bfe3f824958`, formData)
            .then((res) => {
                console.log(res);
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

                let imagesPath = [];

                for (let i = 0; i < imagesAssets.length; i++) {
                    imagesPath.push({path: "storage/uploads/" + imagesAssets[i].path})
                }

                console.log(imagesPath, "imagesAssets");

                let addImages = images.concat(imagesPath);

                setImages(addImages);
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

        axios.post(`${process.env["REACT_APP_API"]}/api/collections/save/album?token=73ad18f6896b8a47f97bfe3f824958`, {
            data: {
                Description: albumDescription,
                Heading: albumName,
                Images: images,
                Thumbnail: {path: thumbnailImage},
                _id: props.match.params.id
            }
        }, {headers: {'Content-Type': 'application/json'}})
            .then((res) => {
                console.log(res)
                toast.success(res.data.Heading + " альбом успешно сохранено");
                history.push("/");
            })
            .catch((err) => {
                console.log(err)
                toast.error("упс.. что-то не так, попробуйте еще раз");
            });
    }

    const backDashboard = () => {
        history.push("/")
    }

    console.log(props.match.params.id);
    // let heading = "";
    // if(data[0]) heading = data[0].hasOwnProperty("Heading") ? data[0].Heading : ""

    console.log(checkData)

    return (
        <div className="EditAlbum">
            <NavigationBar/>
            <div className="container">
                <div className="my-3">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/"
                                              className="text-primary text-decoration-none">Dashboard</Link></BreadcrumbItem>
                        <BreadcrumbItem active> heading</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
            <div className="container">

                <div className="my-5">
                    <form className="form-wrapper" onSubmit={onSubmitHandler}>
                        <div className="form-group">
                            <label className="mb-2" htmlFor="upload">Album overview image</label>
                            <input className="form-control mb-3" type="file" name="upload" id="upload" onChange={(e) => thumbnailOnClickHandler(e)}/>
                        </div>
                        {
                            checkData ?
                                <div className="thumbnailOverview">
                                    <img src={process.env["REACT_APP_API"] + "/" + thumbnailImage}
                                         alt="oops something wrong !"/>
                                    {/*<div className="thumbnailClose" onClick={() => setThumbnailImage(null)}>*/}
                                    {/*    <MdOutlineClose className="thumbnailClose_icon"/>*/}
                                    {/*</div>*/}
                                </div>
                                : ""
                        }
                        <div className="form-group">
                            <label className="mb-2" htmlFor="title">Album Name</label>
                            <input type="text" className="form-control mb-3" placeholder="Album Name" id="title"
                                   name="title" value={albumName}
                                   onChange={(e) => setAlbumName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label className="mb-2" htmlFor="subtitle">Album description</label>
                            <textarea className="form-control mb-3" id="subtitle" placeholder="Album description"
                                      value={albumDescription}
                                      onChange={(e) => setAlbumDescription(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label className="mb-2" htmlFor="uploadAlbum">Albums</label>
                            <input className="form-control mb-3" multiple type="file" name="uploadAlbum"
                                   id="uploadAlbum" onChange={(e) => uploadAlbumOnClickHandler(e)}/>
                        </div>
                        <div className="thumbnailOverview mb-5">
                            <div className="d-flex align-items-center flex-wrap">
                                {
                                    checkData ?
                                        images.map((item, index) => {
                                            return (
                                                <div key={index} className="px-2 mb-4 deleteImages">
                                                    <img
                                                        src={process.env["REACT_APP_API"] + "/" + item.path}
                                                        alt="oops something wrong !"/>

                                                    <div className="imagesClose"
                                                         onClick={() => imagesOnclickHandler(index)}>
                                                        <MdOutlineClose className="imagesClose_icon"/>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : ""
                                }

                            </div>
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

export default EditAlbum;