// Libraries
import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";

// Components
import WalletModal from "../components/WalletModal";

const Home = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isConnected, setConnected] = useState(false);
  const [network, setNetwork] = useState(undefined);
  const { deactivate, active, chainId, account, library } = useWeb3React();
  console.log("network", network);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${network.toString(16)}` }],
      });
    } catch (switchError) {
      // 4902 error code indicates the chain is missing on the wallet
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x63564c40",
                rpcUrls: ["https://api.harmony.one"],
                chainName: "Harmony Mainnet",
                nativeCurrency: { name: "ONE", decimals: 18, symbol: "ONE" },
                blockExplorerUrls: ["https://explorer.harmony.one"],
                iconUrls: [
                  "https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png",
                ],
              },
            ],
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleNetwork = async (e) => {
    const id = e.target.value;
    await setNetwork(id);
    switchNetwork();
  };

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
        <button
          onClick={() => {
            setConnected(false);
            deactivate();
          }}
        >
          Disconnect
        </button>
        {isConnected && active ? (
          <>
            <div>Connection Status: 🟢</div>
            <div>Account: {account}</div>
            <div>Network ID: {chainId}</div>
            <select
              class="form-select"
              aria-label="multiple select example"
              style={{ marginTop: 10, textAlign: "center" }}
              onChange={handleNetwork}
            >
              <option selected>Select network</option>
              <option value="3">Ropsten</option>
              <option value="43114">Avalanche</option>
              <option value="137">Polygon</option>
              <option value="1666600000">Harmony</option>
              <option value="42220">Celo</option>
            </select>
          </>
        ) : (
          <>
            <div>Connection Status: 🟡</div>
            <div>Account: No Account</div>
            <div>Network ID: No Network</div>
          </>
        )}
        <div style={{ position: "absolute", zIndex: 1 }}>
          <WalletModal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            closeModal={closeModal}
            setConnected={setConnected}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;