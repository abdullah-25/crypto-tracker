import "../PagePositioning.scss";
import CryptoList from "../../components/CryptoList/CryptoList";
import { useEffect, useState } from "react";

import CircularIndeterminate from "../../components/CircularProgressBar/CircularProgressBar";

export default function Home() {
  const [CryptoCoinsArray, setCryptoCoinsArray] = useState(undefined);

  async function getCoinsData() {
    try {
      const response = await fetch(process.env.REACT_APP_CRYPTO_DATA_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCryptoCoinsArray(data);
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getCoinsData();
  }, []);

  if (!CryptoCoinsArray) {
    return <CircularIndeterminate />;
  }
  return (
    <div className="positioning">
      <CryptoList CryptoCoinsArray={CryptoCoinsArray} />
    </div>
  );
}
