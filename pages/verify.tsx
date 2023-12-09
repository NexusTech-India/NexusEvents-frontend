import Navbar from "@/components/Navbar";
import Head from "next/head";
import QRCode from "react-qr-code";
import { useState, useEffect } from "react"

export default function Home() {
    const [qr, setQR] = useState("")

    useEffect(() => {
        fetch("/api/sign-in").then(res => res.json()).then(data => {
            setQR(JSON.stringify(data))
        })
    }, [])

    return (
        <>
            <Head>
                <title>Nexus Events</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] overflow-hidden">
                <Navbar />
                <div className="flex flex-row grow justify-items items-center w-screen h-auto">
                    <QRCode value={qr} className="p-10 bg-white rounded-lg w-96 h-96"/>
                </div>
            </main>
        </>
    );
}