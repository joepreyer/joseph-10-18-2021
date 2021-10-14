import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);

  let aWebSocket;
  if (typeof window !== "undefined") {
    aWebSocket = new WebSocket("wss://www.cryptofacilities.com/ws/v1");
    aWebSocket.onopen = function (event) {
      console.log("WebSocket is open now.");
    };
    aWebSocket.onclose = function (event) {
      console.log("WebSocket is closed now.");
    };
    aWebSocket.onmessage = function (event) {
      let data = JSON.parse(event.data);
      const {bids, asks} = data
      if (data.feed === "book_ui_1_snapshot") {
        setBids(bids);
        setAsks(asks);
      }
      console.debug("WebSocket message received:", JSON.parse(event.data));
    };
  }

  const sendToWebSocket = () => {
    aWebSocket &&
      aWebSocket.send(
        JSON.stringify({
          event: "subscribe",
          feed: "book_ui_1",
          product_ids: ["PI_XBTUSD"],
        })
      );
  };

  const closeWebSocket = () => {
    aWebSocket && aWebSocket.close();
  };

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Read{" "}
          <Link href="/posts/first-post">
            <a>this page!</a>
          </Link>
        </h1>
        <button onClick={sendToWebSocket}>Send data to websocket!</button>
        <button onClick={closeWebSocket}>Close websocket!</button>
        <div>
          <h1>Bids</h1>
          {bids && bids.map(bid => <p>{bid[0]}: {bid[1]}</p>)}
        </div>
        <div>
          <h1>Asks</h1>
          {asks && asks.map(ask => <p>{ask[0]}: {ask[1]}</p>)}
        </div>
      </main>
    </div>
  );
}
