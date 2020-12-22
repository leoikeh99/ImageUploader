import React, { Fragment, useState } from "react";
import UploadImage from "./components/UploadImage";
import Uploads from "./components/Uploads";
import "./App.css";
import "./css/spinkit.min.css";

function App() {
  const [page, setPage] = useState(1);
  return (
    <Fragment>
      <div className="cover">
        {page === 1 ? (
          <UploadImage setPage={setPage} />
        ) : (
          <Uploads setPage={setPage} />
        )}
      </div>
      <div className="text-center">
        Challenge completed by
        <a href="https://github.com/leoikeh99" target="_blank">
          @wazza
        </a>
      </div>
    </Fragment>
  );
}

export default App;
