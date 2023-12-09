import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db"
import { auth } from "@iden3/js-iden3-auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let count = await db.session.count();
    const data = await db.session.create({ data: { id: count+1} })
    const { id } = data;

    const hostUrl = "https://nexus-events.vercel.app";
    const callbackURL = "/api/callback"
    const audience = "did:polygonid:polygon:mumbai:2qKMLW2WxXWmTMLiAEuWmBcbzdVYyTWAL6MtceJJvF"

    const uri = `${hostUrl}${callbackURL}?sessionId=${id}`;

    // Generate request for basic authentication
    const request = auth.createAuthorizationRequest(
        'test flow',
        audience,
        uri,
    );

    request.id = id.toString();
    request.thid = id.toString();

    // Add request for a specific proof
    const proofRequest = {
        id,
        circuitId: 'credentialAtomicQuerySigV2',
        query: {
            allowedIssuers: [audience],
            type: 'Verification',
            context: 'ipfs://QmZJo92wz58RNq9kWS8vwXMxNiVs4TgwjVbHv87FYXS6oQ',
            credentialSubject: {
                birthday: {
                    $lt: 20100101,
                },
            },
        },
    };
    const scope = request.body.scope ?? [];
    request.body.scope = [...scope, proofRequest];

    data.request = request;
    await db.session.update({ where: { id }, data: { request } });

    return res.status(200).send(request);
}