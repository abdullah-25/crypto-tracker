import { render, fireEvent, waitFor } from "@testing-library/react";

import CryptoListElement from "../CryptoListElement/CryptoListElement";
import CryptoList from "../CryptoList/CryptoList";

import { MemoryRouter } from "react-router-dom";

test("Renders CryptoListElement with correct coin name", () => {
  const coinData = {
    rank: 1,
    coin: "Bitcoin",
    coinImage: "bitcoin.png",
    coinSymbol: "BTC",
    coinPrice: 50000,
    priceChangeDaily: 5,
    marketCap: 1000000000,
    isChecked: false,
  };

  const { getByText } = render(
    <CryptoListElement
      rank={coinData.rank}
      coin={coinData.coin}
      coinImage={coinData.coinImage}
      coinSymbol={coinData.coinSymbol}
      coinPrice={coinData.coinPrice}
      priceChangeDaily={coinData.priceChangeDaily}
      marketCap={coinData.marketCap}
      isChecked={coinData.isChecked}
    />
  );

  const coinNameElement = getByText("Bitcoin BTC");
  expect(coinNameElement).toBeInTheDocument();
});

test("Each row in CryptoListElement renders correctly", () => {
  const coinData = {
    rank: 1,
    coin: "Bitcoin",
    coinImage: "bitcoin.png",
    coinSymbol: "BTC",
    coinPrice: 50000,
    priceChangeDaily: 5,
    marketCap: 1000000000,
    isChecked: false,
  };

  const { getByText } = render(
    <CryptoListElement
      rank={coinData.rank}
      coin={coinData.coin}
      coinImage={coinData.coinImage}
      coinSymbol={coinData.coinSymbol}
      coinPrice={coinData.coinPrice}
      priceChangeDaily={coinData.priceChangeDaily}
      marketCap={coinData.marketCap}
      isChecked={coinData.isChecked}
    />
  );

  expect(getByText("1")).toBeInTheDocument();
  expect(getByText("Bitcoin BTC")).toBeInTheDocument();
});

test("Handles Checkbox Change in CryptoListElement", () => {
  const mockHandleCheckedChange = jest.fn();

  const { getByRole } = render(
    <CryptoListElement
      rank={1}
      coin="Bitcoin"
      coinImage="bitcoin.png"
      coinSymbol="BTC"
      coinPrice={50000}
      priceChangeDaily={5}
      marketCap={1000000000}
      onCheckedChange={mockHandleCheckedChange}
      isChecked={false}
    />
  );

  const checkbox = getByRole("checkbox");
  fireEvent.click(checkbox);

  expect(mockHandleCheckedChange).toHaveBeenCalledWith(true, "Bitcoin");
});
