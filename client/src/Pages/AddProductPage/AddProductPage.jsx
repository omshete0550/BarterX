import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "./AddProductPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
const options = ["Used", "Nearly New", "Mint"];
const categOptions = ["Home Appliances", "Electronics", "Vehicles", "Furniture", "Art", "Miscellaneous"];
const defaultOption = options[0];
const defaultCategOption = categOptions[0];


const fileTypes = ["JPG", "PNG", "GIF"];

const AddProductPage = () => {

  const [prodname, setprodname] = useState("");
  const [desc, setdesc] = useState("");
  const [categ, setcateg] = useState(defaultOption);
  const [condn, setcondn] = useState(defaultOption);
  const [desprodname, setdesprodname] = useState("");
  const [userid, setuserid] = useState("");
  const [datepurchase, setdatepurchase] = useState(new Date());
  // const [file, setFile] = useState(null);
  // const reader = new FileReader();
  // const handleChange = (e) => {
  //   const ownfile = e.target.files[0];
  //   // const ownfile = 
  //     setFile(ownfile);
  //     console.log(file);
  // };
  const [image, setImage] = useState(null);
  const [uplodingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  const handleCategoryChange = (selectedOption) => {
    setcateg(selectedOption.value);
  }
  const handleConditionChange = (selectedOption) => {
    setcondn(selectedOption.value);
  }
  function extractUserIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('userid');
    return userId;
  }

  async function publishProduct(event) {
    event.preventDefault();
    const userId = extractUserIdFromURL();
    setuserid(userId);

    const datas = new FormData();
    datas.append("file", image);
    datas.append("upload_preset", "realtimeimages");
    let imageURL = "";
    try {
      setUploadingImg(true);
      let res = await fetch("https://api.cloudinary.com/v1_1/dtslqphfg/image/upload", {
        method: "post",
        body: datas,
      });
      const fileUrl = await res.json();
      setUploadingImg(false);
      console.log(fileUrl.url);
      imageURL = fileUrl.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }


    const response = await fetch('http://localhost:8800/api/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prodname,
        desc,
        categ,
        condn,
        desprodname,
        datepurchase,
        userid,
        imageURL
      }),
    })

    // console.log(file);

    const data = await response.json();
    if (data.status === 'success') {
      console.log("Product Published");
    }
    else {
      console.log("ERROR!")
    }
    console.log(data);
  }



  return (
    <>
      <Navbar />

      <div className="addProductContainer">
        <h1>PUBLISH PRODUCT</h1>
        <p>
          To start swapping, all you need is a name, required product, and file.
        </p>

        <form onSubmit={publishProduct}>
          <div className="addProductInnerCont">
            <div className="addProductInnerContainer">
              <div className="inputContainerProduct">
                <span>
                  Product Name <span>*</span>{" "}
                </span>
                <input type="text" name="prodname" id="prodname" onChange={(e) => setprodname(e.target.value)} />
                <p>Do not exceed 20 characters when entering the product name.</p>
              </div>

              <div className="categDropDown">
                <div className="dropDownInner">
                  <h4>Category</h4>
                  <div className="dropdownDiv">
                    <Dropdown
                      options={categOptions}
                      value={defaultCategOption}
                      placeholder="Select an option"
                      onChange={handleCategoryChange}
                    />
                  </div>
                </div>
                <div className="dropDownInner">
                  <h4>Condition</h4>
                  <div className="dropdownDiv">
                    <Dropdown
                      options={options}
                      value={defaultOption}
                      placeholder="Select an option"
                      onChange={handleConditionChange}
                    />
                  </div>
                </div>
              </div>

              <div className="inputContainerProduct inputContainerProductDesc">
                <span>Description *</span>
                <textarea type="text" rows={10} name="desc" id="desc" onChange={(e) => setdesc(e.target.value)} />
                <p>
                  Do not exceed 100 characters when entering the product
                  description.
                </p>
              </div>
            </div>

            <div className="addProductInnerContainer">
              <div className="inputContainerProduct">
                <span>
                  Desired Product Name <span>*</span>{" "}
                </span>
                <input type="text" name="desprodname" id="desprodname" onChange={(e) => setdesprodname(e.target.value)} />
                <p>Give the product name you want in replace.</p>
              </div>

              <div className="categDropDown">
                <div className="dropDownInner">
                  <h4>Date of Purchase</h4>
                  <div className="dropdownDiv">
                    <DatePicker
                      selected={datepurchase}
                      name="datepurchase"
                      onChange={(date) => setdatepurchase(date)}
                    />
                  </div>
                </div>
              </div>
              <div className="fileUpload">
                <span>
                  Media <span>*</span>{" "}
                </span>
                {/* <input type="file"
                  onChange={handleChange}
                  required={true}
                /> */}
                <input type="file" accept="image/png, image/jpeg" onChange={validateImg} />
                {/* <p>
                  {file ? `File name: ${file[0].name}` : "no files uploaded yet"}
                </p> */}
                <input type="submit" name="" value="Upload" />
              </div>
            </div>
          </div>
        </form>

      </div>

      <Footer />
    </>
  );
};

export default AddProductPage;
