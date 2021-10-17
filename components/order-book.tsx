import React from "react";

type IOrder = Array<number>;

type OrderBookProps = {
  bids: Array<IOrder>;
  asks: Array<IOrder>;
  totalBids?: number;
  totalAsks?: number;
  spread?: number;
};

const OrderBook = ({
  bids,
  asks,
  totalBids,
  totalAsks,
  spread,
}: OrderBookProps) => {
  return (
    <div className="bg-dark text-white">
      <p className="text-white">Order Book</p>
      {spread && <p>Spread {spread}</p>}
      <div className="flex flex-row">
        <div className="bg-green-500 w-1/2">
          <div className="grid grid-cols-3 gap-4">
            <span>TOTAL</span>
            <span>SIZE</span>
            <span>PRICE</span>
          </div>
          {bids.map((bid) => (
            <div className="grid grid-cols-3 gap-4">
              <div className="text-gray-500">{bid[0]}</div>
              <span className="text-white">{bid[1]}</span>
              <span>{bid[2]}</span>
            </div>
          ))}
        </div>

        <div className="bg-red-500 w-1/2">
          <div className="grid grid-cols-3 gap-4">
            <span>PRICE</span>
            <span>SIZE</span>
            <span>TOTAL</span>
          </div>
          {asks.map((ask) => (
            <div className="grid grid-cols-3 gap-4">
              <span>{ask[0]}</span>
              <span className="text-white">{ask[1]}</span>
              <span className="text-white">{ask[2]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
