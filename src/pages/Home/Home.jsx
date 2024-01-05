import "../PagePositioning.scss";
import CryptoList from "../../components/CryptoList/CryptoList";
import { useEffect, useState } from "react";

export default function Home() {
  const [CryptoCoinsArray, setCryptoCoinsArray] = useState(undefined);

  async function getCoinsData() {
    try {
      const response = await fetch("http://127.0.0.1:5000/v1/crypto", {
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
    return <>Loading...</>;
  }
  return (
    <div className="positioning">
      <CryptoList CryptoCoinsArray={CryptoCoinsArray} />
    </div>
  );
}
