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
        getEvent(router.query.id).then((e: any) => {
            setEvent(e)
        })
    }, [router.query.id])

    useEffect(() => {
        if (event) {
            getTickets(event.evnt).then((t: any) => {
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
                                <h1 className="text-white text-2xl">{ticket.name}</h1>
                                <h1 className="text-white text-2xl">{ticket.price}</h1>
                                <h1 className="text-white text-2xl">{ticket.description}</h1>
                                <h1 className="text-white text-2xl">{ticket.totalSupply}</h1>
                            </div>
                        </div>
                    )
                })}
            </main>
        </>
    )
}