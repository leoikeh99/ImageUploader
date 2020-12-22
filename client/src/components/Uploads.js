import React, { Fragment, useEffect, useState } from "react";
import copy from "copy-to-clipboard";

const Uploads = ({ setPage }) => {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("ids")) {
      setIds(JSON.parse(localStorage.getItem("ids")));
    }
  }, []);

  const copyText = (link) => {
    copy(link);
    alert("Link copied to clipboard");
  };

  return (
    <div className="uploads">
      <h3>Image Uploads</h3>
      {ids.length === 0 ? (
        <p style={{ margin: "10px" }}>No images have been uploaded yet</p>
      ) : (
        <div>
          {ids.map((id) => (
            <div className="item">
              <img className="image" src={`/image/${id}`} />
              <p>{`https://evening-wildwood-04625.herokuapp.com/image/${id}`}</p>
              <button
                className="btn-primary btn-1"
                onClick={() =>
                  copyText(
                    `https://evening-wildwood-04625.herokuapp.com/image/${id}`
                  )
                }
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      )}
      <i class="fas fa-arrow-left" onClick={() => setPage(1)}></i>
    </div>
  );
};

export default Uploads;
