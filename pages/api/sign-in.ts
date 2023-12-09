import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db"
import { auth } from "@iden3/js-iden3-auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await db.session.create({ data: {} })
    const { id } = data;

    const hostUrl = "https://nexus-events.vercel.app";
    const sessionId: number = 1;
    const callbackURL: string = "/api/callback"
    const audience: string = "did:polygonid:polygon:main:2q2LeHV3tttEJbLo6J9dLGsULyRh9WVTQ1C4MFTNsM"

    const uri: string = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

    // Generate request for basic authentication
    const request: any = auth.createAuthorizationRequest(
        'test flow',
        audience,
        uri,
    );

    request.id = '7f38a193-0918-4a48-9fac-36adfdb8b542';
    request.thid = '7f38a193-0918-4a48-9fac-36adfdb8b542';

    // Add request for a specific proof
    const proofRequest: any = {
        "circuitId": "credentialAtomicQuerySigV2",
        "id": 1701704032,
        "query": {
            "allowedIssuers": [
                "*"
            ],
            "context": "ipfs://QmZB8CMAMZYwybgAr7RU9UgbxcNikNLydEr5srF5dTpdtx",
            "credentialSubject": {
                "coding_experience": {
                    "$eq": true
                }
            },
            "type": "EventVerification"
        }
    }
    const scope: any[] = request.body.scope ?? [];
    request.body.scope = [...scope, proofRequest];

    return res.status(200).json(request);
}