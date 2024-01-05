import "../CryptoList/CryptoList.scss";
import CryptoListElement from "../CryptoListElement/CryptoListElement.jsx";
import search_icon from "../../assets/icons/search-24px.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import debounce from "lodash/debounce";

import { useEffect } from "react";

import { Modal } from "@mui/material";

export default function CryptoList({ CryptoCoinsArray }) {
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const BACKEND_URL_ADD_SAVE_COINS =
    "http://127.0.0.1:5000/v1/users/1/add_liked_coins";
  const BACKEND_URL_ADD_DELETE_COINS =
    "http://127.0.0.1:5000/v1/users/1/liked_coins/delete";

  useEffect(() => {
    const filtered = CryptoCoinsArray.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(filtered);
  }, [searchTerm, CryptoCoinsArray]);

  const handleCheckedChange = (isChecked, coinName) => {
    // pull out constant
    if (isChecked && selectedCoins.length < 10) {
      setSelectedCoins((prevSelectedCoins) => [...prevSelectedCoins, coinName]);
    } else if (!isChecked) {
      setSelectedCoins((prevSelectedCoins) =>
        prevSelectedCoins.filter((name) => name !== coinName)
      );
    }
  };

  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    debouncedSearch(term);
  };

  const handleSave = async () => {
    const dataToSend = {
      coin_names: selectedCoins,
    };
    setOpen(false);

    try {
      const response = await fetch(BACKEND_URL_ADD_SAVE_COINS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to add liked coins");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    const dataToSend = {
      coin_names: selectedCoins,
    };
    setOpen(false);

    try {
      const response = await fetch(BACKEND_URL_ADD_DELETE_COINS, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        //Refresh the page. This allows us to see the new data.
        navigate(0);
      }
      if (!response.ok) {
        throw new Error("Failed to delete liked coins");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="component-container">
      <form className="cryptoform">
        {location.pathname === "/user-list" && (
          <Link to="/">
            <button className="icon-edit"></button>
          </Link>
        )}
        <h1 className="title">Crypto Coins</h1>
        <div className="cryptoform__search">
          <input
            className="cryptoform__input"
            type="text"
            placeholder="Search.."
            onChange={handleSearchChange}
          />
          <img
            className="icon cryptoform__icon__search"
            src={search_icon}
            alt=""
          />
        </div>
        <Link to="/user-list">
          <button className="cryptoform__addnew" type="button">
            <p className="button-text">Your Coins</p>
          </button>
        </Link>
      </form>

      <ul className="cryptolist">
        <ul className="cryptolist__labels">
          <li className="list-label label-text">Select</li>
          <li className="list-label label-text">Rank</li>
          <li className="list-label label-text">Coin Name</li>
          <li className="list-label label-text">Price</li>
          <li className="list-label label-text">Last 24h</li>
          <li className="list-label label-text">Market Cap</li>
          <li className="list-label label-text">Remarks</li>
        </ul>
        {filteredCoins.map((CryptoCoin) => (
          <CryptoListElement
            key={CryptoCoin.market_cap_rank}
            rank={CryptoCoin.market_cap_rank}
            coin={CryptoCoin.name}
            coinImage={CryptoCoin.image}
            coinSymbol={CryptoCoin.symbol}
            coinPrice={CryptoCoin.current_price}
            priceChangeDaily={CryptoCoin.price_change_percentage_24h}
            marketCap={CryptoCoin.market_cap}
            onCheckedChange={handleCheckedChange}
            isChecked={selectedCoins.includes(CryptoCoin.name)}
          />
        ))}
      </ul>
      {location.pathname === "/user-list" && (
        <div className="icon-container">
          <div className="table-cell">
            <button className="deletebtn" onClick={handleOpen}>
              Delete
            </button>
            <Modal open={open} onClose={handleClose} className="modal">
              <div className="modal-div">
                <h1 className="modal__title">Delete Coins?</h1>
                <p className="modal__text">
                  Please confirm that you’d like to Delete these coins from the
                  list of coins.
                </p>
                <div className="button-style">
                  <div className="modal-button__div">
                    <button className="modal-cancel" onClick={handleClose}>
                      Cancel
                    </button>
                    <button className="modal-delete" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      )}
      {location.pathname === "/" && (
        <div className="icon-container">
          <div className="table-cell">
            <button className="savebtn" onClick={handleOpen}>
              Save
            </button>
            <Modal open={open} onClose={handleClose} className="modal">
              <div className="modal-div">
                <h1 className="modal__title">Save Coins?</h1>
                <p className="modal__text">
                  Please confirm that you’d like to Save these coins from the
                  list of coins.
                </p>
                <div className="button-style">
                  <div className="modal-button__div">
                    <button className="modal-cancel" onClick={handleClose}>
                      Cancel
                    </button>
                    <button className="modal-save" onClick={handleSave}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
