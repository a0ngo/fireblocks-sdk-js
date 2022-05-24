export interface IAuthProvider {
    signJwt(path: string, bodyJson?: any): Promise<string>;

    getApiKey(): string;
}
