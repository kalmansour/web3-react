// Libraries
import React from "react";
import Modal from "react-modal";
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

const WalletModal = ({ modalIsOpen, closeModal, activate }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <h4 style={{ textAlign: "center" }}>Select Wallet </h4>
      <button
        onClick={() => {
          activate(connectors.CoinbaseWallet);
          closeModal();
        }}
      >
        Coinbase Wallet
      </button>
      <button
        onClick={() => {
          activate(connectors.WalletConnect);
          closeModal();
        }}
      >
        Wallet Connect
      </button>
      <button
        onClick={() => {
          activate(connectors.Injected);
          closeModal();
        }}
      >
        Metamask
      </button>
    </Modal>
  );
};

export default WalletModal;
