import "../CryptoListElement/CryptoListElement.scss";

export default function CryptoListElement({
  rank,
  coin,
  coinImage,
  coinSymbol,
  coinPrice,
  priceChangeDaily,
  marketCap,

  onCheckedChange,
  isChecked,
}) {
  const handleCheckboxChange = (e) => {
    onCheckedChange(e.target.checked, coin);
  };

  return (
    <li className="cryptolist__element">
      <div className="table-cell">
        {" "}
        <p className="body-small cryptolist__content">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </p>
      </div>
      <div className="table-cell">
        <p className="body-small cryptolist__title">#</p>

        <p className="body-small cryptolist__content">{rank}</p>
      </div>
      <div className="table-cell">
        <p className="body-small cryptolist__title">Coin</p>
        <p className="body-small cryptolist__content">
          <img className="icon cryptoform__icon" src={coinImage} alt="" />{" "}
          {coin} {coinSymbol.toUpperCase()}
        </p>
      </div>

      <div className="table-cell">
        <p className="body-small cryptolist__title">Price</p>
        <p className="body-small cryptolist__content">
          $ {coinPrice.toLocaleString()}
        </p>
      </div>

      <div className="table-cell">
        <p className="body-small cryptolist__title">24h</p>
        <p className="body-small cryptolist__content">
          {priceChangeDaily.toLocaleString()} %
        </p>
      </div>
      <div className="table-cell">
        <p className="body-small cryptolist__title">Market Cap</p>
        <p className="body-small cryptolist__content">
          $ {marketCap.toLocaleString()}
        </p>
      </div>
      <div className="table-cell">
        <p className="body-small cryptolist__title">Remarks</p>
        <p className="body-small cryptolist__content">
          <input></input>
        </p>
      </div>
    </li>
  );
}
