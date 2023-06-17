import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./trending.css";
import Modal from "../Modal/Modal";

const Trending = (props) => {
  const { id, creatorImg, imgUrl } = props.item;
  const [nftData, setNftData] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/nfts/${id}/`);
        setNftData(response.data);
        setCurrentBid(response.data.price);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!nftData) {
    return null; // or display a loading state
  }

  const { title, description, owner, price, likes } = nftData;

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <div className="d-flex align-items-center justify-content-between">
        <h5 className="nft__title">
          <Link to={`/market/${id}`}>{title}</Link>
        </h5>
        <div className="likes-section">
          <span className="likes-count">
            <i className="ri-heart-fill"></i> {likes}
          </span>
        </div>
        </div>
        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={creatorImg} alt="" className="w-100" />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              <p>{owner}</p>
            </div>

            <div>
              <h6>Current Bid</h6>
              <p>{price} ETH</p>
            </div>
          </div>
        </div>



        <div className="mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => setShowModal(true)}
          >
            <i className="ri-shopping-bag-line"></i> Place Bid
          </button>

          {showModal && <Modal setShowModal={setShowModal} />}

          <span className="history__link">
            <Link to="#">View History</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Trending;
