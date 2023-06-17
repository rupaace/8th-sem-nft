import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import axios from "axios";

import "../styles/create-item.css";

const Create = () => {
  const [previewData, setPreviewData] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);

    try {
      const response = await axios.post("http://localhost:8000/api/nfts/", formData);
      setPreviewData(response.data);
    } catch (error) {
      console.error("Error creating NFT:", error);
    }
  };

  return (
    <>
      <CommonSection title="Create Item" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview Item</h5>
              {previewData ? (
                <NftCard item={previewData} />
              ) : (
                <div>No preview data available</div>
              )}
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <form onSubmit={handleSubmit}>
                  <div className="form__input">
                    <label htmlFor="uploadFile">Upload File</label>
                    <input
                      type="file"
                      className="upload__input"
                      id="uploadFile"
                      onChange={handleFileUpload}
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      placeholder="Enter title"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name=""
                      id="description"
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form__input">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      placeholder="Enter price (ETH)"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Create NFT
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Create;
