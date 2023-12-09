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
} from '@chakra-ui/react'
const steps = [
    { title: 'First', description: 'Event Information' },
    { title: 'Second', description: 'Tickets Minting' },
    { title: 'Third', description: 'Requirements to join event' },
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

    const onClickNext = () => {
        goToNext()
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