import "../CryptoListElement/CryptoListElement.scss";

import { Link, useNavigate } from "react-router-dom";

import chevron from "../../assets/icons/chevron_right-24px.svg";

export default function CryptoListElement({
  rank,
  coin,
  coinImage,
  coinSymbol,
  coinPrice,
  priceChangeDaily,
  marketCap,
}) {
  return (
    <li className="warehouselist__element">
      <div className="table-cell">
        {" "}
        <input type="checkbox" />
      </div>
      <div className="table-cell">
        <p className="body-small warehouselist__title">#</p>

        <p className="body-small warehouselist__content">{rank}</p>
      </div>
      <div className="table-cell">
        <p className="body-small warehouselist__title">Coin</p>

        <p className="body-small warehouselist__content">
          <img className="icon warehouseform__icon" src={coinImage} alt="" />{" "}
          {coin} {coinSymbol.toUpperCase()}
        </p>
      </div>

      <div className="table-cell">
        <p className="body-small warehouselist__title">Price</p>
        <p className="body-small warehouselist__content">
          $ {coinPrice.toLocaleString()}
        </p>
      </div>

      <div className="table-cell">
        <p className="body-small warehouselist__title">24h</p>
        <p className="body-small warehouselist__content">
          {priceChangeDaily.toLocaleString()} %
        </p>
      </div>
      <div className="table-cell">
        <p className="body-small warehouselist__title">Market Cap</p>
        <p className="body-small warehouselist__content">
          $ {marketCap.toLocaleString()}
        </p>
      </div>
      <div className="table-cell">
        <p className="body-small warehouselist__title">Remarks</p>
        <p className="body-small warehouselist__content">
          <input></input>
        </p>
      </div>
    </li>
  );
}
