import { Requester, RestMethod, ServiceClient } from '@kibalabs/core';

import * as Endpoints from './endpoints';
import * as Resources from './resources';

export class NotdClient extends ServiceClient {
  public constructor(requester: Requester, baseUrl?: string) {
    super(requester, baseUrl || 'https://notd-api.kibalabs.com');
  }

  public createGm = async (account: string, signatureMessage: string, signature: string): Promise<Resources.AccountGm> => {
    const method = RestMethod.POST;
    const path = 'gm/v1/gm';
    const request = new Endpoints.CreateGmRequest(account, signatureMessage, signature);
    const response = await this.makeRequest(method, path, request, Endpoints.CreateGmResponse);
    return response.accountGm;
  };

  public createAnonymousGm = async (): Promise<void> => {
    const method = RestMethod.POST;
    const path = 'gm/v1/anonymous-gm';
    const request = new Endpoints.CreateAnonymousGmRequest();
    await this.makeRequest(method, path, request, Endpoints.CreateAnonymousGmResponse);
  };

  public listGmAccountRows = async (): Promise<Resources.GmAccountRow[]> => {
    const method = RestMethod.GET;
    const path = 'gm/v1/account-rows';
    const request = new Endpoints.ListGmAccountRowsRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.ListGmAccountRowsResponse);
    return response.accountRows;
  };

  public listGmCollectionRows = async (): Promise<Resources.GmCollectionRow[]> => {
    const method = RestMethod.GET;
    const path = 'gm/v1/collection-rows';
    const request = new Endpoints.ListGmCollectionRowsRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.ListGmCollectionRowsResponse);
    return response.collectionRows;
  };

  public getLatestGmForAccount = async (address: string): Promise<Resources.LatestAccountGm> => {
    const method = RestMethod.GET;
    const path = `gm/v1/accounts/${address}/latest-gm`;
    const request = new Endpoints.GetLatestGmForAccountRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetLatestGmForAccountResponse);
    return response.latestAccountGm;
  };
}
