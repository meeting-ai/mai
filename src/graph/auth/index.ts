import { AuthenticationProvider } from "@microsoft/microsoft-graph-client";

export class MaiGraphAuth implements AuthenticationProvider {
  public constructor(private token: string) {}
  public async getAccessToken(): Promise<any> {
    return this.token;
  }
}
