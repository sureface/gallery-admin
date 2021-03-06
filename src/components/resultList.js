import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

import {AiFillEdit} from "react-icons/ai";
import {BsFillTrashFill, BsPlusLg} from "react-icons/bs";
import {toast} from "react-toastify";

const ResultList = () => {

    const [data, setData] = useState([]);


     const fetchApi = () => {
        axios.get(`${process.env["REACT_APP_API"]}/api/collections/get/album?token=73ad18f6896b8a47f97bfe3f824958&sort[Order]=1`)
            .then((res) => {
                let data = res.data.entries;
                setData(data);
            })
            .catch((err) => {
                console.log(err);
                toast.error("упс.. что-то не так, попробуйте еще раз");
            });
    }


    // run this function when page updated
    useEffect(() => {

        fetchApi();

    }, []);

    const removeClickHandler = (id) => {

        let deleteAlbum = window.confirm("do you really want delete this album");


        if (deleteAlbum) {

            axios.post(`${process.env["REACT_APP_API"]}/api/collections/remove/album?token=73ad18f6896b8a47f97bfe3f824958`,
                {
                    filter: {
                        "_id": `${id}`
                    }
                },
            )
                .then((res) => {
                    fetchApi();
                })
                .catch(err => console.log(err));
        }

    }

    return (
        <div>
            <div className="container">
                <div className="py-3 w-100 d-flex align-items-center justify-content-end">
                    <Link to="list" className="btn btn-success"><BsPlusLg className="me-2"/>Добавить</Link>
                </div>
                <div className="row">
                    <div
                        className="col-12 bg-white py-1 mb-2">
                        {
                            data.map((item, index) => {
                                return (
                                    <div key={index}
                                         className="w-100 d-flex align-items-center justify-content-between py-2 border-bottom">
                                        <div className="d-flex align-items-center">
                                            <div className="thumbnail"
                                                 style={{backgroundImage: `url(${process.env["REACT_APP_API"] + "/" + item.Thumbnail.path})`}}>
                                            </div>
                                            <div className="me-4 fw-normal">{item.Heading}</div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to={"/edit/" + item._id}>
                                                    <button
                                                        className="btn d-flex align-items-center justify-content-center py-2 px-1 me-2">
                                                        <AiFillEdit className="add"/>
                                                    </button>
                                                </Link>
                                                <button
                                                    className="btn d-flex align-items-center justify-content-center py-2 px-1"
                                                    onClick={() => removeClickHandler(item._id)}><BsFillTrashFill
                                                    className="remove text-danger"/></button>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultList;