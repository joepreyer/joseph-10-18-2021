import React from "react";

type IOrder = Array<number>;

type OrderBookProps = {
  bids: Array<IOrder>;
  asks: Array<IOrder>;
  totalBids?: number;
  totalAsks?: number;
};

const getWidth = (bidTotal, total) => {
  return `${((bidTotal / total) * 100).toFixed(2)}%`;
};

const OrderBook = ({ bids, asks, totalBids, totalAsks }: OrderBookProps) => {
  const spread = bids[0] && asks[0] && asks[0][0] - bids[0][0];
  const spreadPercentage =
    spread && bids[0] && ((spread / bids[0][0]) * 100).toFixed(2);
  return (
    <div className="bg-dark text-lightGrey">
      <div className="text-center p-4">
        {spread && (
          <div className="text-grey">
            Spread {spread} ({spreadPercentage}%)
          </div>
        )}
      </div>
      <div className="flex flex-row">
        <div className="w-1/2">
          <div className="grid grid-cols-3 gap-4 text-grey py-1 my-1 border-b">
            <span className="pl-10">TOTAL</span>
            <span>SIZE</span>
            <span>PRICE</span>
          </div>
          {bids.map((bid) => (
            <div className="grid grid-cols-3 gap-4 relative border-r border-black">
              <div
                className="bg-greenFade absolute h-full right-0"
                style={{ width: getWidth(bid[2], totalBids) }}
              />
              <span className="z-10 pl-10">{bid[2]}</span>
              <span className="z-10">{bid[1]}</span>
              <span className="text-green z-10">{bid[0]}</span>
            </div>
          ))}
        </div>

        <div className="w-1/2">
          <div className="grid grid-cols-3 gap-4 text-grey py-1 my-1 border-b">
            <span>PRICE</span>
            <span>SIZE</span>
            <span>TOTAL</span>
          </div>
          {asks.map((ask) => (
            <div className="grid grid-cols-3 gap-4 relative border-l border-black">
              <div
                className="bg-redFade absolute h-full left-0"
                style={{ width: getWidth(ask[2], totalAsks) }}
              />
              <span className="text-red z-10">{ask[0]}</span>
              <span className="z-10">{ask[1]}</span>
              <span className="pr-10 z-10">{ask[2]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
