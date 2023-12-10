import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Event, Ticket, getEvent, getTickets } from "@/lib/graph";
import { Card, CardBody, CardFooter, Stack, Heading, Divider, ButtonGroup, Image, Text, Button } from '@chakra-ui/react'

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

                {event && tickets.map(ticket => {
                    return (
                        <Card key={ticket.id}>
                            <CardBody>
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{event.name}</Heading>
                                    <Text>{event.description}</Text>
                                    <Divider />
                                    <div className="flex flex-row justify-between">
                                        <Text>
                                            Price:
                                        </Text>
                                        <Text>
                                            {ticket.price}
                                        </Text>
                                    </div>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <ButtonGroup spacing='2'>
                                    <Button variant='solid' colorScheme='blue'>
                                        Buy Ticket
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    )
                })}
            </main>
        </>
    )
}