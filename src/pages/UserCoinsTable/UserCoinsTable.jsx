import "../PagePositioning.scss";
import CryptoList from "../../components/CryptoList/CryptoList";
import { useEffect, useState } from "react";

export default function UserCoinsTable() {
  const [userCryptoCoins, setUserCryptoCoins] = useState(undefined);

  async function UserCoinsTable() {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/v1/users/1/liked_coins",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
