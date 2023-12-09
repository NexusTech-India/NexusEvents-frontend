import Navbar from "@/components/Navbar";
import { Button } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nexus Events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] overflow-hidden">
        <Navbar />
        <div className="flex flex-row grow">
          <div className="flex flex-col gap-8 justify-center p-10">
            <h1 className="text-6xl font-bold text-white">Nexus Events</h1>
            <h2 className="text-2xl font-bold text-white">
              Decentralized Event Hosting Platform with NFT Tickets,<br />
              Polygon ID, The graph, Huddle01 and Scroll
            </h2>
            <div className="flex flex-row gap-10">
              <Button colorScheme='red' onClick={() => window.location.href = "/host"}>Host a event!</Button>
            </div>
          </div>
          <div className="grow items-center justify-center pl-28 pt-10">
            <img
              src="/ticket.png"
              className="object-contain w-auto h-auto rotate-[30deg]"
            />
          </div>
        </div>
      </main>
    </>
  );
}