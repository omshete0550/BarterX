import React from "react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import "./AddProduct.css";
const AddProduct = () => {
  return (
    <>
      <div className="add-product-container section_padding">
        <h1 className="heading">Publish Product</h1>
        <div className="add-product-first-section">
          <div className="general-info-container">
            <h3>General Information</h3>

            <div className="product-desc">
              <Input
                isRequired
                key="outside"
                type="text"
                label="Product Name"
                labelPlacement="outside"
                placeholder="Enter your product name"
                // className="max-w-xs"
              />
            </div>
            <div className="product-desc">
              <Textarea
                isRequired
                label="Description"
                labelPlacement="outside"
                placeholder="Enter your description"
                // className="max-w-xs"
              />
            </div>
          </div>
          <div className="product-media-container">
            <h3>Product Media</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
