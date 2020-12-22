import React, { Fragment, useEffect, useState } from "react";
import image1 from "../images/image.svg";
import { checkImageValidity } from "../helperFunctions";
import copy from "copy-to-clipboard";
import Spinner from "./Spinner";
import axios from "axios";

const UploadImage = ({ setPage }) => {
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [loader, setLoader] = useState(null);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    if (!id && !loader) {
      const input = document.querySelector("input");
      const mid = document.querySelector(".mid");
      input.addEventListener("dragenter", (e) => {
        mid.classList.add("active");
      });
      input.addEventListener("dragleave", (e) => {
        mid.classList.remove("active");
      });
      input.addEventListener("drop", (e) => {
        mid.classList.remove("active");
      });
    }
  }, [id]);

  useEffect(() => {
    if (image) {
      if (checkImageValidity(image.type)) {
        let data = new FormData();
        data.append("image", image);
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        setLoader(true);
        const uploadImage = async () => {
          const res = await axios.post("/image", data, config);
          setId(res.data.id);
          setIds([...ids, res.data.id]);
          setLoader(null);
        };
        uploadImage();
      } else {
        alert("Only images can be uploaded");
      }
    }
  }, [image]);

  useEffect(() => {
    if (localStorage.getItem("ids")) {
      setIds(JSON.parse(localStorage.getItem("ids")));
    }
  }, []);

  useEffect(() => {
    if (ids) {
      localStorage.setItem("ids", JSON.stringify(ids));
    }
  }, [ids]);

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const selectFile = () => {
    if (!id) {
      const input = document.querySelector("input");
      input.click();
    }
  };

  const copyText = () => {
    var link = `/image/${id}`;
    copy(link);
    alert("Link copied to clipboard");
  };

  return (
    <div className="uploadImage">
      {!id ? (
        <Fragment>
          <h3>Upload your image</h3>
          <p style={{ color: "var(--text2)" }}>Files should be jpeg, png...</p>
          <div className="mid">
            {!loader ? (
              <Fragment>
                <input type="file" onChange={onChange} />
                <img src={image1} alt="" />
                <p style={{ marginTop: "20px" }}>
                  Drag and drop your images here
                </p>
              </Fragment>
            ) : (
              <div className="load">
                <p>uploading...</p>
                <Spinner />
              </div>
            )}
          </div>

          {!loader && (
            <Fragment>
              <p>OR</p>
              <div className="text-center">
                <button className="btn-primary" onClick={selectFile}>
                  Choose file
                </button>
              </div>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <div className="text-center">
            <i
              class="fas fa-check-circle fa-2x"
              style={{ color: "#219653" }}
            ></i>
          </div>
          <h3>Uploaded Successfully</h3>

          <div className="mid" style={{ height: "230px", border: "0px" }}>
            <div className="image">
              <img
                src={`/image/${id}`}
                alt=""
                style={{ borderRadius: "12px" }}
              />
            </div>
          </div>
          <div className="link">
            <p id="link">{`https://evening-wildwood-04625.herokuapp.com/image/${id}`}</p>
            <button className="btn-primary" onClick={copyText}>
              Copy Link
            </button>
          </div>
        </Fragment>
      )}
      <div className="text-center">
        <button
          className="btn-success"
          onClick={() => setPage(2)}
          style={{ marginTop: "5px" }}
        >
          Go to image uploads
        </button>
      </div>
    </div>
  );
};
export default UploadImage;
