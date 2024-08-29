import React, { useState } from "react";
import { Image, Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import "./AddProduct.css";
import { DatePicker } from "@nextui-org/react";

const category = [
  { key: "electronics", label: "Electronics" },
  { key: "homeApp", label: "Home Appliances" },
  { key: "furniture", label: "Furniture" },
  { key: "art", label: "Art" },
  { key: "vehicle", label: "Vehicle" },
  { key: "sports", label: "Sports" },
  { key: "education", label: "Education" },
  { key: "miscellaneous", label: "Miscellaneous" },
];

const condition = [
  { key: "used", label: "Used" },
  { key: "mint", label: "Mint" },
  { key: "nearlyNew", label: "Nearly New" },
];

const AddProduct = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  return (
    <>
      <div className="add-product-container section_padding">
        <h1 className="heading">Publish Product</h1>
        <div className="add-product-first-section">
          <div className="general-info-container">
            <h3>General Information</h3>

            <div className="product-desc pt-5">
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
            <div className="product-desc pt-5">
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

            <div className="product-media">
              <Input type="file" multiple onChange={handleImageChange} />
              {selectedImages.length > 0 && (
                <div className="flex mt-2 gap-2">
                  {selectedImages.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Selected ${index}`}
                      width={120}
                      height={120}
                      style={{ margin: "5px" }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="add-product-first-section">
          <div className="general-info-container">
            <h3>Pricing & Desired Product</h3>

            <div className="product-desc pt-5">
              <Input
                isRequired
                key="outside"
                type="number"
                label="Mrp Price"
                labelPlacement="outside"
                placeholder="Enter original price of product (Rs.)"
              />
            </div>
            <div className="product-desc pt-5">
              <Input
                isRequired
                key="outside"
                type="text"
                label="Desired Product"
                labelPlacement="outside"
                placeholder="Enter your desired product"
              />
            </div>
          </div>
          <div className="categ-condition-container">
            <h3>Category & Condition</h3>

            <div className="category-select">
              <h6>Category</h6>
              <div key="flat" className="pt-2">
                <Select variant="flat" label="Select a category" isRequired>
                  {category.map((categ) => (
                    <SelectItem key={categ.key}>{categ.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            <div className="category-select">
              <h6>Condition</h6>
              <div key="flat" className="pt-2">
                <Select variant="flat" label="Select a condition" isRequired>
                  {condition.map((cond) => (
                    <SelectItem key={cond.key}>{cond.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="add-product-first-section">
          <div className="general-info-container">
            <h3>Information</h3>

            <div className="product-desc pt-5">
              <Input
                isRequired
                key="outside"
                type="number"
                label="Age"
                labelPlacement="outside"
                placeholder="Enter age"
              />
            </div>
            <div className="product-desc pt-5">
              <Input
                isRequired
                key="outside"
                type="text"
                label="City"
                labelPlacement="outside"
                placeholder="Enter city"
              />
            </div>
          </div>
          <div className="categ-condition-container">
            <h3>Date</h3>

            <div className="date-container pt-5">
              <DatePicker label="Purchase Date" showMonthAndYearPickers />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
