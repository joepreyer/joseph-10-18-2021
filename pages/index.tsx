import React, { useState, useCallback, useMemo, useRef, useEffect } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import OrderBook from "../components/order-book"

type IOrder = Array<number>

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [allBids, setAllBids] = useState<Array<IOrder>>([])
  const [allAsks, setAllAsks] = useState<Array<IOrder>>([])
  const [totalBids, setTotalBids] = useState<number>(null)
  const [totalAsks, setTotalAsks] = useState<number>(null)
  const [productId, setProductId] = useState("PI_XBTUSD")
  const socketUrl = "wss://www.cryptofacilities.com/ws/v1"

  const addBid = (bid: IOrder): void => {
    let updatedBids = [...allBids]
    //If list empty, just add the bid
    if (allBids.length === 0) {
      bid[2] = bid[1]
      updatedBids.push(bid)
      return setAllBids(updatedBids)
    } else {
      for (let i = 0; i < allBids.length; i++) {
        // If we find the price, replace it or remove it
        if (allBids[i][0] === bid[0]) {
          if (bid[1] === 0) {
            //if value = 0, update all total above current bid and remove bid from list
            updatedBids.splice(i, 1)
            updateTotals({ bids: updatedBids, index: i })
            return
          }
          //else replace
          else {
            updatedBids[i] = bid
            updateTotals({ bids: updatedBids, index: i })
            return
          }
        }
        // Else, if we reach a lower number add the order in above the lower value
        else if (allBids[i][0] < bid[0]) {
          //if bid value === 0, break from the loop
          if (bid[1] === 0) {
            return
          }
          //else add the bid in above this price
          else {
            updatedBids.splice(i, 0, bid)
            updateTotals({ bids: updatedBids, index: i })
            return
          }
        }
        //Else if we reach the end of the array, and bid value !== 0, add the bid to the end (new lowest bid)
        else if (i === allBids.length - 1) {
          if (bid[1] !== 0) {
            bid[2] = allBids[allBids.length - 1][2] + bid[1]
            updatedBids.push(bid)
            return
          }
        }
      }
    }
  }

  const addAsk = (ask: IOrder): void => {
    let updatedAsks = [...allAsks]
    if (allAsks.length === 0) {
      ask[2] = ask[1] //set total
      updatedAsks.push(ask)
      return setAllAsks(updatedAsks)
    } else {
      for (let i = 0; i < allAsks.length; i++) {
        // If we find the price, replace it or remove it
        if (allAsks[i][0] === ask[0]) {
          if (ask[1] === 0) {
            //remove price
            updatedAsks.splice(i, 1)
            updateTotals({ asks: updatedAsks, index: i })
            return
          } else {
            //else replace
            updatedAsks[i] = ask
            updateTotals({ asks: updatedAsks, index: i })
            return
          }
        }
        // Else, if we reach a higher number add the order in above the higher value
        else if (allAsks[i][0] > ask[0]) {
          if (ask[1] === 0) {
            return
          } else {
            updatedAsks.splice(i, 0, ask)
            updateTotals({ asks: updatedAsks, index: i })
            return
          }
        }
        //Else if we reach the end of the array, and ask value !== 0, add the ask to the end (new highest ask)
        else if (i === allAsks.length - 1) {
          if (ask[1] !== 0) {
            ask[2] = allAsks[allAsks.length - 1][2] + ask[1]
            updatedAsks.push(ask)
            return
          }
        }
      }
    }
  }

  //Function to sum up the totals for each order
  const updateTotals = ({
    bids,
    asks,
    index,
  }: {
    bids?: Array<IOrder>
    asks?: Array<IOrder>
    index?: number
  }): void => {
    if (bids) {
      const startIndex = index || 0
      let updatedBids = [...bids]
      for (let i = startIndex; i < updatedBids.length; i++) {
        let bid = updatedBids[i]
        if (i === 0) {
          //if we are at the first (highest) item on bid
          updatedBids[i][2] = bid[1] //total = bid value
        } else {
          let bidTotal = updatedBids[i - 1][2] + bid[1]
          updatedBids[i][2] = bidTotal // else, total = bid value + prev total
          if (i === updatedBids.length - 1) {
            setTotalBids(bidTotal)
          }
        }
      }
      setAllBids(updatedBids)
    }
    if (asks) {
      const startIndex = index || 0
      let updatedAsks = [...asks]
      for (let i = startIndex; i < updatedAsks.length; i++) {
        let ask = updatedAsks[i]
        if (i === 0) {
          updatedAsks[i][2] = ask[1]
        } else {
          let askTotal = updatedAsks[i - 1][2] + ask[1]
          updatedAsks[i][2] = askTotal
          if (i === updatedAsks.length - 1) {
            setTotalAsks(askTotal)
          }
        }
      }
      setAllAsks(updatedAsks)
    }
  }

  const handleData = (event: any): void => {
    let data = JSON.parse(event.data)
    const { bids, asks } = data
    if (data.feed === "book_ui_1_snapshot") {
      updateTotals({ bids: bids, asks: asks })
    } else {
      if (bids && bids.length > 0) {
        for (let i = 0; i < bids.length; i++) {
          addBid(bids[i])
        }
      }
      if (asks && asks.length > 0) {
        for (let i = 0; i < asks.length; i++) {
          addAsk(asks[i])
        }
      }
    }
  }

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: handleData,
  })

  const subscribe = useCallback(
    (id) =>
      sendMessage(
        JSON.stringify({
          event: "subscribe",
          feed: "book_ui_1",
          product_ids: [id],
        })
      ),
    [productId]
  )

  const unsubscribe = useCallback(
    (id) =>
      sendMessage(
        JSON.stringify({
          event: "unsubscribe",
          feed: "book_ui_1",
          product_ids: [id],
        })
      ),
    [productId]
  )

  const resetOrders = () => {
    setAllBids([])
    setAllAsks([])
    setTotalAsks(null)
    setTotalBids(null)
  }

  const toggleFeed = () => {
    setLoading(true)
    resetOrders()
    setAllAsks([])
    setAllBids([])
    unsubscribe(productId)
    if (productId === "PI_XBTUSD") {
      subscribe("PI_ETHUSD")
      setProductId("PI_ETHUSD")
    } else {
      subscribe("PI_XBTUSD")
      setProductId("PI_XBTUSD")
    }
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState]

  useEffect(() => {
    if (connectionStatus === "Open") {
      subscribe(productId)
      setLoading(false)
    }
  }, [connectionStatus])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <OrderBook
      bids={allBids}
      asks={allAsks}
      totalBids={totalBids}
      totalAsks={totalAsks}
      toggleFeed={toggleFeed}
    />
  )
}
