import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Event, Ticket, getEvent, getTickets } from "@/lib/graph";

export default function Events() {
    const [event, setEvent] = useState<Event>()
    const [tickets, setTickets] = useState<Ticket[]>([])
    const router = useRouter()

    useEffect(() => {
        getEvent(router.query.id as string).then((e: any) => {
            setEvent(e)
        })
    }, [router.query.id])

    useEffect(() => {
        if (event) {
            getTickets().then((t: any) => {
                setTickets(t)
                console.log(t)
            })
        }
    }, [event])

    return (
        <>
            <Head>
                <title>Nexus Events</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] overflow-hidden overflow-y-scroll">
                <Navbar />

                {tickets.map(ticket => {
                    return (
                        <div className="flex flex-row justify-center items-center">
                            <div className="flex flex-col justify-center items-center">
                                <div className="flex flex-row justify-center items-center">
                                    <img src={event!.logo} className="w-20 h-20 rounded-full" />
                                    <div className="flex flex-col justify-center items-center">
                                        <h1 className="text-white text-2xl font-bold">{event!.name}</h1>
                                        <h1 className="text-white text-2xl font-bold">{ticket.price}</h1>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center items-center">
                                    <button className="bg-[#2e026d] text-white rounded-lg px-4 py-2 mt-4">Buy</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </main>
        </>
    )
}