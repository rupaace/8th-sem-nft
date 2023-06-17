import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import LiveAuction from "../components/ui/Live-auction/LiveAuction";

import "../styles/nft-details.css";

import { Link } from "react-router-dom";

const NftDetails = () => {
  const { id } = useParams();
  const [singleNft, setSingleNft] = useState(null);

  useEffect(() => {
    const fetchNft = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/nfts/${id}`);
        setSingleNft(response.data);
      } catch (error) {
        console.error("Error fetching NFT:", error);
      }
    };

    fetchNft();
  }, [id]);

  if (!singleNft) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CommonSection title={singleNft.title} />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img
                src={singleNft.img}
                alt=""
                className="w-100 single__nft-img"
              />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{singleNft.title}</h2>

                <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
                  <div className=" d-flex align-items-center gap-4 single__nft-seen">
                    <span>
                      <i className="ri-eye-line"></i> {singleNft.likes}
                    </span>
                    <span>
                      <i className="ri-heart-line"></i> {singleNft.likes}
                    </span>
                  </div>

                  <div className=" d-flex align-items-center gap-2 single__nft-more">
                    <span>
                      <i className="ri-send-plane-line"></i>
                    </span>
                    <span>
                      <i className="ri-more-2-line"></i>
                    </span>
                  </div>
                </div>

                <div className="nft__creator d-flex gap-3 align-items-center">
                  <div className="creator__img">
                    <img
                      src={singleNft.creatorImg}
                      alt=""
                      className="w-100"
                    />
                  </div>

                  <div className="creator__detail">
                    <p>Created By</p>
                    <h6>{singleNft.owner}</h6>
                  </div>
                </div>

                <p className="my-4">{singleNft.description}</p>
                <button className="singleNft-btn d-flex align-items-center gap-2 w-100">
                  <i className="ri-shopping-bag-line"></i>
                  <Link to="/wallet">Place a Bid</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <LiveAuction />
    </>
  );
};

export default NftDetails;
