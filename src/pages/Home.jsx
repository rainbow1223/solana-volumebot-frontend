import React, { createElement } from "react";
import { useState } from "react";
import axios from "axios";

import generateWalletImage from "../assets/generate_wallet.png";
import transferImage from "../assets/transfer_wallet.png";
import botImage from "../assets/bot.jpg";

const Home = () => {
  const [walletNumber, setWalletNumber] = useState(0);
  const [solTradingAmount, setSolTradingAmount] = useState(0);
  const [privateKey, setPrivateKey] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [poolAddress, setPoolAddress] = useState("");

  const [walletNumberValidated, setWalletNumberValidated] = useState(true);
  const [isTradingStarted, setIsTradingStarted] = useState(false);

  const startTrading = () => {

    const payload = { walletNumber, solTradingAmount, privateKey, tokenAddress, poolAddress };
    console.log(payload);
    axios.post("http://localhost:5000/start", payload).then((res) => {
      console.log(res);
    });
    console.log("Trading started");
    setIsTradingStarted(true);
  };

  const stopTrading = () => {
    console.log("Trading stopped");
    setIsTradingStarted(false);
  };
  const handleChange = (e) => {
    switch (e.target.name) {
      case "walletNumber": {
        let value = e.target.value;
        if (value >= 1 && value <= 1000) {
          setWalletNumber(value);
          setWalletNumberValidated(true);
        } else {
          console.log("Please enter a number between 1 and 1000");
          setWalletNumberValidated(false);
          setWalletNumber(0);
        }
        break;
      }
      case "solTradingAmount": {
        setSolTradingAmount(e.target.value);
        break;
      }
      case "privateKey": {
        setPrivateKey(e.target.value);
        break;
      }
      case "tokenAddress": {
        setTokenAddress(e.target.value);
        break;
      }
      case "poolAddress": {
        setPoolAddress(e.target.value);
        break;
      }

      default:
        break;
    }
  };

  const startButton = createElement(
    "button",
    { className: "bg-blue-500 text-white w-32", onClick: startTrading },
    "Start"
  );
  const stopButton = createElement(
    "button",
    { className: "bg-red-500 text-white w-32", onClick: stopTrading },
    "Stop"
  );

  return (
    <div className="flex flex-col w-full items-center bg-[#e8f2ee] gap-12">
      {/* header */}
      <h1 className="m-8">Solana Volume bot</h1>
      {/* Main */}
      {/* <div className="m-30 justify-center items-center flex-col">
       

        <div className="flex gap-4 items-center mt-2 mb-2">
          <label htmlFor="privatekey" className="w-[160px]">
            Private key of Main Wallet:
          </label>
          <input
            className="w-64 h-12 gap-2 p-2 border border-gray-400 rounded-lg border-focus-0 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            placeholder="Please enter the private key of the main wallet"
            text={privateKey}
            name="privateKey"
            onChange={handleChange}
            type="text"
          />
        </div>

        <div className="flex gap-4 items-center mt-2 mb-2">
          <label htmlFor="tokenAddress" className="w-[160px]">
            Token Address:
          </label>
          <input
            className="w-64 h-12 gap-2 p-2 border border-gray-400 rounded-lg border-focus-0 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            placeholder="Please enter the private key of the main wallet"
            text={tokenAddress}
            name="tokenAddress"
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className="flex gap-4 items-center mt-2 mb-2">
          <label htmlFor="tokenAddress" className="w-[160px]">
            Pool Address:
          </label>
          <input
            className="w-64 h-12 gap-2 p-2 border border-gray-400 rounded-lg border-focus-0 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            placeholder="Please enter the private key of the main wallet"
            text={poolAddress}
            name="poolAddress"
            onChange={handleChange}
            type="text"
          />
        </div>

        <div className="flex gap-4 items-center">
          <label htmlFor="amount" className="w-[160px]">
            Number of wallets:
          </label>
          <input
            className="w-64 h-12 gap-2 p-2 border border-gray-400 rounded-lg border-focus-0 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            placeholder="please enter the number of wallets 0 ~ 1000"
            text={walletNumber}
            name="walletNumber"
            onChange={handleChange}
            type="number"
          />
          {!walletNumberValidated && (
            <label htmlFor="amount" className="text-red-700">
              Please enter a number between 0 and 1000
            </label>
          )}
        </div>

        <div className="flex gap-4 items-center mt-2">
          <label htmlFor="amount" className="w-[160px]">
            Sol Trading Amount:
          </label>
          <input
            className="w-64 h-12 gap-2 p-2 border border-gray-400 rounded-lg border-focus-0 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            placeholder="please enter the number of wallets 0 ~ 1000"
            text={walletNumber}
            name="solTradingAmount"
            onChange={handleChange}
            type="number"
          />
        </div>

        <div className="flex gap-2 items-start mt-12">
          {isTradingStarted ? stopButton : startButton}

          <button className="bg-green-400 w-32 text-white">Consolidate</button>
        </div>
      </div> */}

      {/* Step1:  Wallet Generation*/}
      <div className="flex flex-col w-[40%] p-2 pl-0 pr-0 rounded-md border border-gray-400">
        <h2 className="ml-4">Step1: Wallet Generation</h2>
        <p className="ml-4">Generate wallets and set the amount of wallets to use for auto buy and sell</p>
        <div className="border border-l-0 border-r-0 border-gray-400  p-10 flex">
          <div className="basis-1/3 flex-shrink-0 flex items-center justify-center p-2">
            <img src={generateWalletImage} alt="generateWalletImage" className="h-32"/>
          </div>
          <div className="basis-2/3 flex flex-col gap-2">
            <p>Wallet number</p>
            <input type="text" name="walletNumber" className="border-gray-300 border rounded-md h-9 pl-4" onChange={handleChange} />
            <p>Alreaday exists</p>
            <input type="text" name="alreadyExists" className="border-gray-300 border rounded-md h-9 pl-4"/>
          </div>
          
        </div>
        <div className="gap-2 flex p-2">
            <button className="bg-blue-500 rounded-md text-white">Generate&Set</button>
            <button className="bg-red-500 rounded-md text-white">Delete</button>
          </div>
      </div>

      {/* Step2: Transfer or Gather */}
      <div className="flex flex-col w-[40%] p-2 pl-0 pr-0 rounded-md border border-gray-400">
        <h2 className="ml-4">Step2: Transfer or Gather</h2>
        <p className="ml-4">Ditribute the SOL to wallets or gather tokens and sol from wallets to master wallet</p>
        <div className="border border-l-0 border-r-0 border-gray-400  p-10 flex">
          <div className="basis-1/3 flex-shrink-0 flex items-center justify-center p-2">
            <img src={transferImage} alt="generateWalletImage" className="h-32"/>
          </div>
          <div className="basis-2/3 flex flex-col gap-2">
            <p>Sol transfer(sol)</p>
            <input type="text" name="solTradingAmount" className="border-gray-300 border rounded-md h-9 pl-4" onChange={handleChange} />
            <p>Unit (Wallets)</p>
            <input type="text" name="alreadyExists" className="border-gray-300 border rounded-md h-9 pl-4"/>
            <p>Sleep time</p>
            <input type="text" name="sleepTimeDistribute" className="border-gray-300 border rounded-md h-9 pl-4"/>
          </div>
          
        </div>
        <div className="gap-2 flex p-2">
            <button className="bg-blue-500 rounded-md text-white">Gather</button>
            <button className="bg-red-500 rounded-md text-white">Transfer</button>
          </div>
      </div>
      {/* Step3: Auto Buy and Sell */}
      <div className="flex flex-col w-[40%] p-2 pl-0 pr-0 rounded-md border border-gray-400 mb-20">
        <h3 className="ml-4">Step3: Auto Buy and Sell </h3>
        <p className="ml-4">Buy and sell tokens automatically</p>
        <div className="border border-l-0 border-r-0 border-gray-400  p-10 flex">
          <div className="basis-1/3 flex-shrink-0 flex items-center justify-center p-2">
            <img src={botImage} alt="generateWalletImage" className="h-40"/>
          </div>
          <div className="basis-2/3 flex flex-col gap-2">
            <p>Token Address</p>
            <input type="text" name="tokenAddress" className="border-gray-300 border rounded-md h-9 pl-4" onChange={handleChange} />
            <p>Pool Address</p>
            <input type="text" name="poolAddress" className="border-gray-300 border rounded-md h-9 pl-4"/>
            <p>Sleep time</p>
            <input type="text" name="sleepTimeDistribute" className="border-gray-300 border rounded-md h-9 pl-4"/>
          </div>
          
        </div>
        <div className="gap-2 flex p-2">
            <button className="bg-blue-500 rounded-md text-white">Start bot</button>
            <button className="bg-red-500 rounded-md text-white">Stop bot</button>
          </div>
      </div>
    </div>
  );
};

export default Home;
