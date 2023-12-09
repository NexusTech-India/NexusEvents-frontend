import Link from "next/link";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export default function Navbar() {
  const address = useAddress();

  return (<div className="flex flex-row p-2 w-auto h-20">
    <div className="flex flex-col items-center justify-center">
      <Link href="/" className="text-4xl font-bold text-white select-none cursor-poiner">Nexus Events</Link>
    </div>
    <div className="grow" />
    <div className="flex flex-row items-center justify-center gap-10">
      <Link href="/host" className="text-2xl text-gray-400 hover:underline hover:text-white">Host Event</Link>
      <Link href="/events" className="text-2xl text-gray-400 hover:underline hover:text-white">Events</Link>
      {address && <Link href="/my-events" className="text-2xl text-gray-400 hover:underline hover:text-white">My events</Link>}
    </div>
    <div className="grow" />
    <ConnectWallet />
  </div>)
}