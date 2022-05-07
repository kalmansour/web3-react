// Libraries
import React from "react";
import Modal from "react-modal";
import { useWeb3React } from "@web3-react/core";

// Helpers
import { connectors } from "../utils/connectors.js";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 600,
  },
};

const WalletModal = ({ modalIsOpen, closeModal, setConnected }) => {
  const { activate } = useWeb3React();

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <h4 style={{ textAlign: "center" }}>Select Wallet </h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            activate(connectors.CoinbaseWallet);
            setConnected(true);
            closeModal();
          }}
          type="button"
          class="btn btn-outline-dark"
          style={{ width: 200, height: 50, margin: 5 }}
        >
          <img
            src="https://help.coinbase.com/public-assets/favicons/apple-icon-180x180.png"
            width="30"
            style={{ marginRight: 10 }}
          />
          Coinbase Wallet
        </button>
        <button
          onClick={() => {
            activate(connectors.Injected);
            setConnected(true);
            closeModal();
          }}
          type="button"
          class="btn btn-outline-dark"
          style={{ width: 200, height: 50, margin: 5 }}
        >
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
            width="30"
            style={{ marginRight: 10 }}
          />
          MetaMask Wallet
        </button>
      </div>
    </Modal>
  );
};

export default WalletModal;
