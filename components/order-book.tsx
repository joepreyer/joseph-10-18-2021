import React from "react"

type IOrder = Array<number>

type OrderBookProps = {
  bids: Array<IOrder>
  asks: Array<IOrder>
  totalBids?: number
  totalAsks?: number
  toggleFeed: () => void
}

const getWidth = (bidTotal: number, total: number) => {
  return `${((bidTotal / total) * 100).toFixed(2)}%`
}

const OrderBook = ({
  bids,
  asks,
  totalBids,
  totalAsks,
  toggleFeed,
}: OrderBookProps) => {
  const spread = bids[0] && asks[0] && asks[0][0] - bids[0][0]
  const spreadPercentage =
    spread && bids[0] && ((spread / bids[0][0]) * 100).toFixed(2)
  return (
    <>
      {/* Mobile View */}
      <div className="bg-dark text-lightGrey md:hidden h-screen max-h-screen overflow-hidden relative">
        <div className="grid grid-cols-3 gap-4 text-grey py-1 border-b pl-10 absolute z-20 top:0 w-full bg-dark">
          <span>PRICE</span>
          <span>SIZE</span>
          <span>TOTAL</span>
        </div>
        <div className="absolute bottom-1/2 w-full">
          {asks
            .map((ask, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 relative border-l border-black pl-10"
              >
                <div
                  className="bg-redFade absolute h-full left-0"
                  style={{ width: getWidth(ask[2], totalAsks) }}
                />
                <span className="text-red z-10">{ask[0]}</span>
                <span className="z-10">{ask[1]}</span>
                <span className="pr-10 z-10">{ask[2]}</span>
              </div>
            ))
            .reverse()}
        </div>
        <div className="absolute top-1/2 w-full">
          {bids.map((bid, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 relative border-r border-black pl-10"
            >
              <div
                className="bg-greenFade absolute h-full left-0"
                style={{ width: getWidth(bid[2], totalBids) }}
              />
              <span className="text-green z-10">{bid[0]}</span>
              <span className="z-10">{bid[1]}</span>
              <span className="text-green z-10">{bid[2]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view */}
      <div className="bg-dark text-lightGrey hidden md:block h-screen">
        <div className="h-full overflow-hidden">
          <div className="text-center p-4">
            {spread && (
              <div className="text-grey">
                Spread {spread.toFixed(2)} ({spreadPercentage}%)
              </div>
            )}
          </div>
          <div className="flex flex-row">
            <div className="w-1/2">
              <div className="grid grid-cols-3 gap-4 text-grey py-1 my-1 border-b pl-10">
                <span>TOTAL</span>
                <span>SIZE</span>
                <span>PRICE</span>
              </div>
              {bids.map((bid, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 relative border-r border-black"
                >
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
              {asks.map((ask, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 relative border-l border-black"
                >
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
      </div>
      <div className="bg-dark fixed bottom-0 w-full flex justify-center z-30">
        <button
          onClick={toggleFeed}
          className="bg-purple px-4 py-2 m-2 text-white rounded-lg"
        >
          Toggle Feed
        </button>
      </div>
    </>
  )
}

export default OrderBook
