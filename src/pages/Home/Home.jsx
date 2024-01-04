import "../PagePositioning.scss";
import CryptoList from "../../components/CryptoList/CryptoList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [CryptoCoinsArray, setCryptoCoinsArray] = useState(undefined);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
      )
      .then((response) => {
        console.log(response.data);
        setCryptoCoinsArray(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);
  if (!CryptoCoinsArray) {
    return <>Loading...</>;
  }
  return (
    <div className="positioning">
      <CryptoList CryptoCoinsArray={CryptoCoinsArray} />
    </div>
  );
}
