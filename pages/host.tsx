import Navbar from "@/components/Navbar";
import Head from "next/head";
import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box,
    Button,
    Input,
    Textarea,
    FormLabel,
    Switch,
    Select,
    RadioGroup,
    Stack,
    Radio
} from '@chakra-ui/react'
import { useState } from "react";
import { useAddress } from "@thirdweb-dev/react"
import countries from "@/public/countries.json"
import toast from "react-hot-toast";

const steps = [
    { title: 'First', description: 'Event Information' },
    { title: 'Second', description: 'Tickets Minting' },
    { title: 'Third', description: 'Select Rooms' },
]

export interface EventData {
    name?: string
    logo?: string
    description?: string
    startDate?: Date
    endDate?: Date
}

export interface TicketData {
    quantity?: number
    price?: number
}

export interface QualificationsData {
    age?: "Above18" | "Below18"
    country?: string
    coding?: boolean
}

export default function Host() {
    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 0,
        count: steps.length,
    })
    const address = useAddress();
    const [eventData, setEventData] = useState<EventData>()
    const [ticketData, setTicketData] = useState<TicketData>()
    const [qualificationsData, setQualificationsData] = useState<QualificationsData>()
    const [logs, setLogs] = useState<string[]>([])

    const onClickNext = () => {
        if (activeStep == 0) {
            if (eventData?.name && eventData?.logo && eventData?.description && eventData?.startDate && eventData?.endDate) {
                console.log("Event Data", eventData)
                goToNext()
            } else {
                toast.error("Please fill all the fields")
            }
        } else if (activeStep == 1) {
            if (ticketData?.quantity && ticketData?.price) {
                console.log("Ticket Data", ticketData)
                goToNext()
            } else {
                toast.error("Please fill all the fields")
            }
        } else if (activeStep == 2) {
            if (qualificationsData?.age && qualificationsData?.country && qualificationsData?.coding) {
                console.log("Qualifications Data", qualificationsData)
                goToNext()
            } else {
                toast.error("Please fill all the fields")
            }
        }
    }

    return (
        <>
            <Head>
                <title>Nexus Events</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] overflow-hidden overflow-y-scroll">
                <Navbar />
                <div className="flex flex-col items-center justify-center grow">
                    <div className="flex flex-col items-center justify-center bg-[#15162c] rounded-lg p-5 text-white m-5 mb-10">
                        <Stepper index={activeStep} className="w-[60vw]">
                            {steps.map((step, index) => (
                                <Step key={index}>
                                    <StepIndicator>
                                        <StepStatus
                                            complete={<StepIcon />}
                                            incomplete={<StepNumber />}
                                            active={<StepNumber />}
                                        />
                                    </StepIndicator>

                                    <Box flexShrink='0'>
                                        <StepTitle>{step.title}</StepTitle>
                                        <StepDescription>{step.description}</StepDescription>
                                    </Box>

                                    <StepSeparator />
                                </Step>
                            ))}
                        </Stepper>
                        {
                            activeStep == 0 && (
                                <div className="flex flex-col items-center justify-center bg-[#15162c] rounded-lg p-5 text-white">
                                    <h1 className="text-3xl font-bold">Event Information</h1>
                                    <div className="flex flex-col items-left justify-left mt-5">
                                        <FormLabel htmlFor="logo" className="h-3 mt-2">Event Logo</FormLabel>
                                        <Input placeholder="Event Logo" className="mt-5" type="file" onChange={(e) => setEventData({ ...eventData, logo: e.target.value })} />
                                        <FormLabel htmlFor="name" className="h-3 mt-2">Event Name</FormLabel>
                                        <Input placeholder="Event Name" className="mt-5" onChange={(e) => setEventData({ ...eventData, name: e.target.value })} />
                                        <FormLabel htmlFor="description" className="h-3 mt-2">Event Description</FormLabel>
                                        <Textarea placeholder="Event Description" className="mt-5" onChange={(e) => setEventData({ ...eventData, description: e.target.value })} />
                                        <FormLabel htmlFor="startDate" className="h-3 mt-2">Event Start Date</FormLabel>
                                        <Input placeholder="Start Date" className="mt-5" type="date" onChange={(e) => setEventData({ ...eventData, startDate: new Date(e.target.value) })} />
                                        <FormLabel htmlFor="endDate" className="h-3 mt-2">Event End Date</FormLabel>
                                        <Input placeholder="End Date" className="mt-5" type="date" onChange={(e) => setEventData({ ...eventData, endDate: new Date(e.target.value) })} />
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeStep == 1 && (
                                <div className="flex flex-col items-center justify-center bg-[#15162c] rounded-lg p-5 text-white">
                                    <h1 className="text-3xl font-bold">Ticket Minting & Listing</h1>
                                    <div className="flex flex-col items-left justify-left mt-5">
                                        <FormLabel htmlFor="quantity" className="h-3 mt-2">Ticket Quantity</FormLabel>
                                        <Input placeholder="Ticket Quantity" className="mt-5" type="number" onChange={(e) => setTicketData({ ...ticketData, quantity: parseInt(e.target.value) })} />
                                        <FormLabel htmlFor="price" className="h-3 mt-2">Ticket Price</FormLabel>
                                        <Input placeholder="Ticket Price" className="mt-5" type="number" onChange={(e) => setTicketData({ ...ticketData, price: parseInt(e.target.value) })} />
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeStep == 2 && (
                                <div className="flex flex-col items-center justify-center bg-[#15162c] rounded-lg p-5 text-white">
                                    <h1 className="text-3xl font-bold">Qualifications</h1>
                                    <div className="flex flex-col items-left justify-left mt-5">
                                        <FormLabel htmlFor="age" className="h-3 mt-2">Age</FormLabel>
                                        <RadioGroup onChange={(e) => setQualificationsData({ ...qualificationsData, age: e as "Above18" | "Below18" })} value={qualificationsData?.age!}>
                                            <Stack direction="row">
                                                <Radio value="Above18">Above 18</Radio>
                                                <Radio value="Below18">Below 18</Radio>
                                            </Stack>
                                        </RadioGroup>
                                        <FormLabel htmlFor="country" className="h-3 mt-2">Country</FormLabel>
                                        <Select placeholder="Select country" className="mt-5" onChange={(e) => setQualificationsData({ ...qualificationsData, country: e.target.value })} >
                                            {countries.map((country) => (
                                                <option value={country}>{country}</option>
                                            ))}
                                        </Select>
                                        <FormLabel htmlFor="coding" className="h-3 mt-2">Coding Experience</FormLabel>
                                        <Switch className="mt-5" onChange={(e) => setQualificationsData({ ...qualificationsData, coding: e.target.checked })} />
                                    </div>
                                </div>
                            )
                        }

                        <div className="flex flex-row items-center justify-center gap-10">
                            <Button colorScheme="purple" variant="solid" className="mt-5" onClick={() => goToPrevious()}>Previous</Button>
                            <Button colorScheme="purple" variant="solid" className="mt-5" onClick={() => onClickNext()}>Next</Button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}