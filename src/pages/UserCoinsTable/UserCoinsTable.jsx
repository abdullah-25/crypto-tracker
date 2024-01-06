import "../PagePositioning.scss";
import CryptoList from "../../components/CryptoList/CryptoList";
import { useEffect, useState } from "react";

export default function UserCoinsTable() {
  const [userCryptoCoins, setUserCryptoCoins] = useState(undefined);

  async function UserCoinsTable() {
    try {
      const response = await fetch(process.env.REACT_APP_USER_LIKED_COINS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserCryptoCoins(data);
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    UserCoinsTable();
  }, []);

  if (!userCryptoCoins) {
    return <>Loading...</>;
  }
  return (
    <div className="positioning">
      <CryptoList CryptoCoinsArray={userCryptoCoins} />
    </div>
  );
}
