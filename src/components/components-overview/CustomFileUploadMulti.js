import React from "react";

const CustomFileUploadMulti = () => (
  <div className="custom-file mb-3">
    <input
      type="file"
      className="custom-file-input"
      id="customFile3"
      multiple
    />
    <label className="custom-file-label" htmlFor="customFile2">
      Choose file...
    </label>
  </div>
);

export default CustomFileUploadMulti;
