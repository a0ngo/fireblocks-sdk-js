import { IAuthProvider } from "./iauth-provider";
import { KMSClient, SignCommand, SignCommandInput, SigningAlgorithmSpec } from "@aws-sdk/client-kms";
import { Credentials } from "@aws-sdk/types";
import crypto from "crypto";
import { v4 as uuid } from "uuid";
import * as dotenv from "dotenv";


export class AWSAuthProvider implements IAuthProvider {

    private kmsClient: KMSClient;
    private apiKey: string;
    private awsKeyId: string;

    constructor() {
        dotenv.config();
        this.kmsClient = new KMSClient({credentials: {accessKeyId: process.env.awsAccessKey, secretAccessKey: process.env.awsSecretKey}, region: process.env.awsRegion, tls: true});
        this.apiKey = process.env.fbksApiKey;
        this.awsKeyId = process.env.awsKeyId;
    }

    async signJwt(path: string, bodyJson?: any): Promise<string> {
        const body = {
            uri: path,
            nonce: uuid(),
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 55,
            sub: this.apiKey,
            bodyHash: crypto.createHash("sha256").update(JSON.stringify(bodyJson || "")).digest().toString("hex")
        };
        const header = {
            alg: "RS256",
            typ: "JWT"
        };

        const payloadToSign = Buffer.from(JSON.stringify(header)).toString("base64url") + "." + Buffer.from(JSON.stringify(body)).toString("base64url");

        const signCmdInput: SignCommandInput = {
            KeyId: this.awsKeyId,
            Message: Uint8Array.from(Buffer.from(payloadToSign)),
            SigningAlgorithm: SigningAlgorithmSpec.RSASSA_PKCS1_V1_5_SHA_256
        };

        const signCmd = new SignCommand(signCmdInput);
        const res = await this.kmsClient.send(signCmd);
        return new Promise((resolve, reject) => {
            if (res && res.Signature) {
                resolve(Buffer.from(JSON.stringify(header)).toString("base64url") + "." + Buffer.from(JSON.stringify(body)).toString("base64url") + "." + Buffer.from(res.Signature).toString("base64url"));
            } else {
                reject("No signature.");
            }
        });
    }

    getApiKey(): string {
        return this.apiKey;
    }
}
