"use client";

import Image from "next/image";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { sepolia } from "thirdweb/chains";
import { useState } from "react";

export default function Home() {
  const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
  const account = useActiveAccount();

  const [res1, setres1] = useState();
  const [res2, setres2] = useState();
  const [res3, setres3] = useState();
  const [res4, setres4] = useState();
  const [res5, setres5] = useState();


  const getUsdtTransfers = async () => {
    try {
      const response = await fetch(
        `https://1.insight.thirdweb.com/v1/${clientId}/events/0xdAC17F958D2ee523a2206206994597C13D831ec7/Transfer(address,address,uint256)?limit=5`
      );
      const transfersInfo = await response.json();
      console.log(transfersInfo);
      setres1(transfersInfo);
      return transfersInfo;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getNFTTransfers = async () => {
    console.log("here");
    try {
      const response = await fetch(
        `https://1.insight.thirdweb.com/v1/${clientId}/events/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/Transfer(address,address,uint256)?limit=5`
      );
      const transfersInfo = await response.json();
      console.log("Info: ", transfersInfo);
      setres2(transfersInfo);

      return transfersInfo;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getAllNFTs721 = async () => {
    console.log("here");
    try {
      const response = await fetch(
        `https://11155111.insight.thirdweb.com/v1/${clientId}/tokens/erc721/${account?.address}`
      );
      const transfersInfo = await response.json();
      console.log("Info: ", transfersInfo);
      setres3(transfersInfo);

      return transfersInfo;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAllNFTs1155 = async () => {
    console.log("here");
    try {
      const response = await fetch(
        `https://11155111.insight.thirdweb.com/v1/${clientId}/tokens/erc1155/${account?.address}`
      );
      const transfersInfo = await response.json();
      console.log("Info: ", transfersInfo);
      setres4(transfersInfo);

      return transfersInfo;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAllERC20s = async () => {
    console.log("here");
    try {
      const response = await fetch(
        `https://11155111.insight.thirdweb.com/v1/${clientId}/tokens/erc20/${account?.address}`
      );
      const transfersInfo = await response.json();
      console.log("Info: ", transfersInfo);
      setres5(transfersInfo);

      return transfersInfo;
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        <div className="flex justify-center mb-20">
          <ConnectButton client={client} />
        </div>

        <div className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700">
          <button onClick={() => getUsdtTransfers()}>Get USDT Transfers</button>
        </div>
        <div>
          <pre>
            {JSON.stringify(res1,null,2)}
          </pre>
        </div>

        <div className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700">
          <button onClick={() => getNFTTransfers()}>Get NFT Transfers</button>
        </div>
        <div>
          <pre>
            {JSON.stringify(res2,null,2)}
          </pre>
        </div>

        <div className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700">
          <button onClick={() => getAllERC20s()}>Get all ERC20 Balance</button>
        </div>
        <div>
          <pre>
            {JSON.stringify(res5,null,2)}
          </pre>
        </div>

        <div className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700">
          <button onClick={() => getAllNFTs721()}>Get All NFTs erc721</button>
        </div>
        <div>
          <pre>
            {JSON.stringify(res3,null,2)}
          </pre>
        </div>

        <div className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700">
          <button onClick={() => getAllNFTs1155()}>
            Get All NFTs erc-1155
          </button>
        </div>
        <div>
          <pre>
            {JSON.stringify(res4,null,2)}
          </pre>
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        thirdweb
        <span className="text-zinc-300 inline-block mx-1"> </span>
        <span className="inline-block -skew-x-6 text-blue-500"> Insights </span>
      </h1>

      <p className="text-zinc-300 text-base">Query Blockchain Data</p>
    </header>
  );
}
