import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db"
import { auth, resolver } from "@iden3/js-iden3-auth";
import path from "path"
import getRawBody from "raw-body";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let { sessionId } = req.query;
    sessionId = sessionId as string;//.next/server/pages/api/callback.js -> path.join(__dirname, "..", "keys")
    console.log(path.join(__dirname, "..", "..", "..", "keys"))
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

    // EXECUTE VERIFICATION
    const verifier = await auth.Verifier.newVerifier(
        {
            stateResolver: resolvers,
            circuitsDir: path.join(__dirname, "..", "..", "keys"),
            ipfsGatewayURL: "https://ipfs.io"
        }
    );

    let authResponse;

    try {
        const opts = {
            AcceptedStateTransitionDelay: 5 * 60 * 1000, // 5 minute
        };
        authResponse = await verifier.fullVerify(tokenStr, JSON.parse(session.request!.toString()), opts as any)
        await db.session.update({ where: { id: parseInt(sessionId) }, data: { response: authResponse as any } })
    } catch (error) {
        return res.status(500).send(error);
    }
    return res.status(200).send("user with ID: " + authResponse.from + " Succesfully authenticated");
}