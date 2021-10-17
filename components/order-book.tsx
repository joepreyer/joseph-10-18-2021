import React from "react";

type IOrder = Array<number>;

type OrderBookProps = {
  bids: Array<IOrder>;
  asks: Array<IOrder>;
};

const OrderBook = ({ bids, asks }: OrderBookProps) => {
  return (
    <div className="flex flex-row">
      <div className="bg-green-500 w-1/2">
        <h1>Bids:</h1>
        {bids.map((bid) => (
          <div className="grid grid-cols-3 gap-4">
            <span>{bid[0]}</span>
            <span>{bid[1]}</span>
            <span>{bid[2]}</span>
          </div>
        ))}
      </div>

      <div className="bg-red-500 w-1/2">
        <h1>Asks:</h1>
        {asks.map((ask) => (
          <div className="grid grid-cols-3 gap-4">
            <span>{ask[0]}</span>
            <span>{ask[1]}</span>
            <span>{ask[2]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
