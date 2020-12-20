import React, { useEffect, useState } from "react";
import image1 from "../images/image.svg";
import { checkImageValidity } from "../helperFunctions";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (image) {
      if (checkImageValidity(image.type)) {
      } else {
        setError("File not an image");
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    }
  }, [image]);

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="uploadImage">
      <h3>Upload your image</h3>
      <p style={{ color: "var(--text2)" }}>Files should be jpeg, png...</p>
      <div className="mid">
        <input type="file" onChange={onChange} />
        <img src={image1} alt="" />
        <p style={{ marginTop: "20px" }}>Drag and drop your images here</p>
      </div>
      <p>OR</p>
      <div className="text-center">
        <button className="btn-primary">Choose file</button>
      </div>
    </div>
  );
};
export default UploadImage;
