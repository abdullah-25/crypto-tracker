import "../CryptoList/CryptoList.scss";
import CryptoListElement from "../CryptoListElement/CryptoListElement.jsx";
import search_icon from "../../assets/icons/search-24px.svg";
import { Link } from "react-router-dom";
export default function CryptoList({ CryptoCoinsArray }) {
  return (
    <div className="component-container">
      <form className="warehouseform">
        <h1 className="title">Crypto Coins</h1>
        <div className="warehouseform__search">
          <input
            className="warehouseform__input"
            type="text"
            placeholder="Search.."
          />
          <img className="icon warehouseform__icon" src={search_icon} alt="" />
        </div>
      </form>
      <ul className="warehouselist">
        <ul className="warehouselist__labels">
          <li className="list-label label-text">
            #<button className="sort-up"></button>
          </li>
          <li className="list-label label-text">
            Coin
            <button className="sort-up"></button>
          </li>
          <li className="list-label label-text">
            Price
            <button className="sort-up"></button>
          </li>
          <li className="list-label label-text">
            24h
            <button className="sort-up"></button>
          </li>
          <li className="list-label label-text">
            Market Cap
            <button className="sort-up"></button>
          </li>
        </ul>
        {CryptoCoinsArray.map((CryptoCoin) => (
          <CryptoListElement
            key={CryptoCoin.market_cap_rank}
            coin={CryptoCoin.name}
            coinImage={CryptoCoin.image}
            coinSymbol={CryptoCoin.symbol}
            coinPrice={CryptoCoin.current_price}
            priceChangeDaily={CryptoCoin.price_change_percentage_24h}
            marketCap={CryptoCoin.market_cap}
          />
        ))}
      </ul>
    </div>
  );
}
