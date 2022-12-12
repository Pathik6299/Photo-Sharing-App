import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const Home = () => {
  const inputFileRef = React.createRef();
  const [image, setImage] = useState();
  const [allImage, setAllImage] = useState([]);

  useEffect(() => {
    getAllImage();
    getUserImage();
  }, []);

  const handleBtnClick = () => {
    inputFileRef.current.click();
  };

  //get all image
  const getAllImage = async () => {
    try {
      console.log(localStorage.getItem("user_id"))
      const response = await axiosInstance.post("get_all_img", {
        "user_id":localStorage.getItem("user_id")
      });
      if (response) {
        setAllImage(response.data.data);
      }
    } catch (error) {}
  };

  const getUserImage = async () => {
    try {
      const response = await axiosInstance.post("get_user_img", {
        "user_id":localStorage.getItem("user_id")
      });
      if (response) {
        setImage(response.data);
      }
    } catch (error) {}
  };

  //handle file change
  const onFileChange = async (event) => {
    console.log(event)
    try{
      console.log("Hello--1")
      let files = event.target.files;
      let finalExtension = event.target.files[0].name;
       console.log("Hello--2")

      const getExtension = finalExtension.substr(
        finalExtension.lastIndexOf(".") + 1
      );
       console.log("Hello--3")

      if (
        getExtension === "png" ||
        getExtension === "PNG" ||
        getExtension === "jpg" ||
        getExtension === "JPG" ||
        getExtension === "jpeg" ||
        getExtension === "JPEG"
      ) {
         console.log("Hello--4")

        const userDetail = localStorage.getItem("user_id");
        const formData = new FormData();

        formData.append("image", files[0]);
        formData.append("user_id", userDetail);

        const response = await axiosInstance.post("image_upload", formData);
        if(response){
          getAllImage();
        }
      } else {
        alert("Please Upload png or jpg or jpeg");
      }
    }catch(e){
      console.log(e)
    }
  };

  const like = async (img_id) => {
    try {
      const userDetail = localStorage.getItem("user_id");
      const requestdata = {
        image_id: img_id,
        user_id: userDetail,
      };
      const response = await axiosInstance.post("like", requestdata);
      if(response){
        getAllImage();
      }
    } catch (error) {}
  };

  return (
    <>
      <section className="container mb-5">
        <div className="d-flex justify-content-between mt-5">
          <div className="profile_img">
           
          </div>
          <button className="btn-login mt-5" onClick={() => handleBtnClick()}>
            Add Post
          </button>
          <input
            type="file"
            ref={inputFileRef}
            style={{ display: "none" }}
            name="profile_pic"
            onChange={(e) => onFileChange(e)}
            accept="image/*"
          />
        </div>
        <hr />
        <div className="row">
          {allImage.length > 0 && allImage.map((item, index) => (
            <div className="col-3" key={index}>
              <div
                style={{
                  width: "100%",
                  height: "350px",
                  marginTop: 20,
                }}
              >
              <img style={{height:'100%',width:"100%"}} src={`http://pathik6299.pythonanywhere.com/media/${item.image_url}`}/>
               {item.likes.length > 0 && item.likes.filter(l=>l.ImageID_id === item.ImageID)  ? <i
                  class="fas fa-heart heart"
                  onClick={() => like(item.ImageID)}
                ></i> :
                  <i
                  class="far fa-heart heart"
                  onClick={() => like(item.ImageID)}
                ></i>  }              
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  );
};

export default Home;
