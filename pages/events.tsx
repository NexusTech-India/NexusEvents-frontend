import { Card, CardBody, CardFooter, Stack, Heading, Divider, ButtonGroup, Image, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useEffect, useState } from 'react';
import { getEvents, Event } from '@/lib/graph';

export default function Events() {
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        getEvents().then((e: any) => {
            setEvents(e)
        })
    }, [])

    return (
        <>
            <Head>
                <title>Nexus Events</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] overflow-hidden overflow-y-scroll">
                <Navbar />
                <div className="flex-row flex-wrap flex justify-center items-left m-5">
                    {events.map(event => {
                    return (<Card maxW='sm' className='bg-gray-950 text-white'>
                        <CardBody className='bg-gray-950 text-white'>
                            <Image
                                src={`https://cloudflare-ipfs.com/ipfs/${event.logo}`}
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>{event.name}</Heading>
                                <Text>{event.description}</Text>
                                <Divider />
                                <div className="flex flex-row justify-between">
                                    <Text>
                                        Start Date:
                                    </Text>
                                    <Text>
                                        8th December 2023
                                    </Text>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <Text>
                                        End Date:
                                    </Text>
                                    <Text>
                                        10th December 2023
                                    </Text>
                                </div>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter className='bg-gray-950 text-white'>
                            <ButtonGroup spacing='2'>
                                <Link href={`/events/${event.evnt}`}>
                                    <Button variant='solid' colorScheme='blue'>
                                        View Event
                                    </Button>
                                </Link>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>)
                })}
                </div>
            </main>
        </>
    )
}