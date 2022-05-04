import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../utils/connectors.js";

// Components
import WalletModal from "../components/WalletModal";

const Home = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { activate, deactivate } = useWeb3React();
  const [isConnected, setConnected] = useState(false);
  const { active, chainId, account } = useWeb3React();

  const handleConnect = () => {
    activate(connectors.coinbaseWALLET);
  };

  const handleDisconnect = () => {
    deactivate();
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 350,
        textAlign: "center",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h1
            style={{
              textTransform: "capitalize",
              fontSize: 50,
            }}
          >
            Let's connect with
          </h1>
          <h1
            style={{
              textTransform: "capitalize",
              color: "#1554f0",
              marginLeft: 10,
              fontSize: 50,
            }}
          >
            Web3-React
          </h1>
        </div>
        <div style={{ margin: 10 }}>
          <button
            type="button"
            class="btn btn-light"
            style={{ fontWeight: "bold", fontSize: 20 }}
            onClick={openModal}
          >
            Connect Wallet
          </button>
        </div>
        <button onClick={deactivate}>Disconnect</button>
        <div>Connection Status: ${active}</div>
        <div>Account: {account}</div>
        <div>Network ID: {chainId}</div>
        <div style={{ position: "absolute", zIndex: 1 }}>
          <WalletModal
            activate={activate}
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            closeModal={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
