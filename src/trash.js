// const onSubmitHandler = (e) => {
//     e.preventDefault();
//
//
//     // let formData = new FormData();
//     // formData.append("files", image);
//     // console.log(formData)
//
//     axios.post(`${process.env["REACT_APP_API"]}/api/cockpit/addAssets?token=73ad18f6896b8a47f97bfe3f824958`, {
//         body: "asdasd"
//     }).then((resPhoto) => {
//         console.log(resPhoto);
//         // return axios.post(`${process.env["REACT_APP_API"]}/api/collections/save/album?token=73ad18f6896b8a47f97bfe3f824958`, {
//         //     headers: {'Content-Type': 'application/json'},
//         //     body: JSON.stringify({
//         //         data: {
//         //             Description: albumDescription,
//         //             Heading: albumName,
//         //             Images: [{"path": multipleImages}],
//         //             Thumbnail: {"path": image}
//         //         }
//         //     })
//         // })
//         //     .then((res) => {
//         //         console.log(res);
//         //     })
//         //     .catch(err => console.log(err));
//     })
// }



// PATH for  images  ${process.env["REACT_APP_API"]}

// token  /api/collections/get/album?token=73ad18f6896b8a47f97bfe3f824958