export interface Event {
    id: string
    organizer: string
    name: string
    description: string
    logo: string
    startDate: number
    endDate: number
    totalTickets: number
    evnt: string
    createdAt: number
}

export interface Ticket {
    id: string
    seller: string
    owner: string
    nftAddress: string
    tokenId: string
    price: string
    event: Event
    state: string
}

export const getEvents = async () => {
    let data = await fetch("https://api.studio.thegraph.com/query/60903/nexus-events/v2.0.0", {
        method: "POST",
        body: JSON.stringify({
            "query": "{\n  events(first: 5) {\n    id\n    organizer\n    name\n    description\n    createdAt\n    evnt\n    endDate\n    logo\n    startDate\n    totalTickets\n  }\n}"
        })
    }).then(res => res.json())
    return data.data.events as Event[]
}

export const getTickets = async () => {
    let data = await fetch("https://api.studio.thegraph.com/query/60903/nexus-events/v2.0.0", {
        method: "POST",
        body: JSON.stringify({
            "query": `{
                tickets(first: 10) {
                  id
                  owner
                  nftAddress
                  price
                  state
                  tokenId
                  seller
                }
              }`
        })
    }).then(res => res.json())
    return data.data.tickets as Ticket[]
}

export const getEvent = async (id: string) => {
    if(!id || id === "") return null
    let data = await fetch("https://api.studio.thegraph.com/query/60903/nexus-events/v2.0.0", {
        method: "POST",
        body: JSON.stringify({
            "query": `{\n  event(id: "${id}") {\n    id\n    organizer\n    name\n    description\n    createdAt\n    evnt\n    endDate\n    logo\n    startDate\n    totalTickets\n  }\n}`
        })
    }).then(res => res.json())

    return data.data.event as Event
}