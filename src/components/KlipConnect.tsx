// src/KlipConnect.js
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { KlipWeb3Provider } from "../libs/klip-web3-provider/src";
import Web3Modal from "@klaytn/web3modal";

const providerOptions = {
  klip: {
    package: KlipWeb3Provider, //required
    options: {
      bappName: "web3Modal Example App", //required
      rpcUrl: "https://public-en.node.kaia.io", //required
    },
  },
};

const web3Modal = new Web3Modal({
  providerOptions: providerOptions, //required
});

const KlipConnect = () => {
  const [account, setAccount] = useState(null);
  const [klipProvider, setKlipProvider] = useState();

  const connectKlip = async () => {
    // 1. Klip Provider 생성
    // const provider = new KlipWeb3Provider({
    //     bappName: 'My dApp',
    //     qrcodeDOM: '#klip-qrcode' // QR 코드가 표시될 DOM 요소 ID
    // });

    const provider = await web3Modal.connect();
    setKlipProvider(provider);

    const accounts = await provider.enable();
    if (accounts.length > 0) {
      console.log("!!!!!!!!", accounts);
      setAccount(accounts[0]);
    }
  };

  // const fetchBalance = async (user: string) => {
  //   const web3 = new Web3(klipProvider);
  //   const balance = await web3.eth.getBalance(user);
  //   console.log("Connected: ", balance);
  // };
  // useEffect(() => {
  //   // 2. Web3 인스턴스 초기화
  //   // @ts-ignore
  //   fetchBalance(account);
  // }, [account]);

  return (
    <div>
      <h2>Klip Wallet 연결 예제</h2>
      {!account && <button onClick={connectKlip}>Klip 지갑 연결</button>}
      <div id="klip-qrcode" style={{ marginTop: "20px" }} />
      {account && <p>연결된 계정: {account}</p>}
    </div>
  );
};

export default KlipConnect;
