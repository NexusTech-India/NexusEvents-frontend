import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db"
import { auth, resolver, loaders } from "@iden3/js-iden3-auth";
import path from "path"
import fs from "fs"
import getRawBody from "raw-body";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let { sessionId } = req.query;
    sessionId = sessionId as string;

    const session = await db.session.findUnique({ where: { id: parseInt(sessionId) } });
    if (!session) return res.status(404).send("Session not found");

    // get JWZ token params from the post request
    const raw = await getRawBody(req);
    const tokenStr = raw.toString().trim();

    const ethURL = 'https://polygon-mumbai.g.alchemy.com/v2/ZPG4ZM3lIzQubp0v9-kGBtiRcLJ2oX2L';
    const contractAddress = "0x134B1BE34911E39A8397ec6289782989729807a4"

    const ethStateResolver = new resolver.EthStateResolver(
        ethURL,
        contractAddress,
    );

    const resolvers = {
        ['polygon:mumbai']: ethStateResolver,
    };

    // Locate the directory that contains circuit's verification keys
    const verificationKeyloader = new loaders.FSKeyLoader(
        path.join(process.cwd(), "keys") // See the "keys" folder in the root directory
    );

    // Values for the verifier
    const sLoader = new loaders.UniversalSchemaLoader("ipfs.io");

    // Initialize the verifier with the values described above.
    const verifier = new auth.Verifier(verificationKeyloader, sLoader, resolvers);

    try {
        // Kick off verification process.
        const authResponse = await verifier.fullVerify(
            tokenStr,
            JSON.parse(session.request! as any),
            {
                acceptedStateTransitionDelay: 5 * 60 * 1000, // up to a 5 minute delay accepted by the Verifier
            }
        );

        // Store the authResponse in the DB
        await db.session.update({ where: { id: session.id }, data: { response: authResponse as any } });

        // Send back to client, but doesn't get read this way. It gets read from the DB poll.
        return res.status(200).send(authResponse);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
}