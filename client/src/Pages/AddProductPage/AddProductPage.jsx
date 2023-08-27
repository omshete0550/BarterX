import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./AddProductPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const fileTypes = ["JPG", "PNG", "GIF"];

const AddProductPage = () => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <>
      <Navbar />

      <div className="addProductContainer">
        <h1>SWAP PRODUCT</h1>
        <p>
          To start swapping, all you need is a name, required product, and file.
        </p>

        <div className="addProductInnerContainer">
          <div className="inputContainerProduct">
            <span>
              Product Name <span>*</span>{" "}
            </span>
            <input type="text" name="" id="" />
            <p>Give your product a short and clear name.</p>
          </div>

          <div className="inputContainerProduct inputContainerProductDesc">
            <span>Description *</span>
            <textarea type="text" name="" id="" />
          </div>

          <div className="inputContainerProduct">
            <span>
              Desired Product Name <span>*</span>{" "}
            </span>
            <input type="text" name="" id="" />
            {/* <p>Give your product a short and clear name.</p> */}
          </div>

          <div className="fileUpload">
            <span>
              Media <span>*</span>{" "}
            </span>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              multiple={true}
              required={true}
            />
            <p>
              {file ? `File name: ${file[0].name}` : "no files uploaded yet"}
            </p>
            <button>Upload</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AddProductPage;
