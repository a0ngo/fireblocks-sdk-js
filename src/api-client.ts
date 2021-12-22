import { IAuthProvider } from "./iauth-provider";
import requestPromise from "request-promise-native";
import { RequestOptions } from "./types";

export class ApiClient {
    constructor(private authProvider: IAuthProvider, private apiBaseUrl: string) { }

    public async issueGetRequest(path: string, pageMode: boolean = false) {
        const token = this.authProvider.signJwt(path);
        const res = await requestPromise.get({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`
            },
            json: true,
            resolveWithFullResponse: true
        });

        if (pageMode) {
            return {
                transactions: res.body,
                pageDetails: {
                    prevPage: res.headers["prev-page"] ? res.headers["prev-page"].toString() :  "",
                    nextPage:  res.headers["next-page"] ? res.headers["next-page"].toString() :  "",
                }
            };
        }

        return res.body;
    }

    public async issuePostRequest(path: string, body: any, requestOptions?: RequestOptions) {
        const token = this.authProvider.signJwt(path, body);

        const idempotencyKey = requestOptions?.idempotencyKey;

        return await requestPromise.post({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`,
                "Idempotency-Key": idempotencyKey
            },
            body: body,
            json: true
        });
    }

    public async issuePatchRequest(path: string, body: any, requestOptions?: RequestOptions) {
        const token = this.authProvider.signJwt(path, body);

        const idempotencyKey = requestOptions?.idempotencyKey;

        return await requestPromise.patch({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`,
                "Idempotency-Key": idempotencyKey
            },
            body: body,
            json: true
        });
    }

    public async issuePutRequest(path: string, body: any) {
        const token = this.authProvider.signJwt(path, body);

        return await requestPromise.put({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`
            },
            body: body,
            json: true
        });
    }

    public async issueDeleteRequest(path: string) {
        const token = this.authProvider.signJwt(path);

        return await requestPromise.delete({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`
            },
            json: true
        });
    }
}
