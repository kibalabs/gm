import { RequestData, ResponseData } from '@kibalabs/core';

import * as Resources from './resources';


export class GetCollectionHoldingsRequest extends RequestData {
}

export class GetCollectionHoldingsResponse extends ResponseData {
  readonly tokens: Resources.CollectionToken[];

  public constructor(collectionHoldings: Resources.CollectionToken[]) {
    super();
    this.tokens = collectionHoldings;
  }

  public static fromObject = (obj: Record<string, unknown>): GetCollectionHoldingsResponse => {
    return new GetCollectionHoldingsResponse(
      (obj.tokens as Record<string, unknown>[]).map((innerObj: Record<string, unknown>) => Resources.CollectionToken.fromObject(innerObj)),
    );
  };
}

export class CreateGmRequest extends RequestData {
  public constructor(
    readonly account: string,
    readonly signatureMessage: string,
    readonly signature: string,
  ) {
    super();
  }

  public toObject = (): Record<string, unknown> => {
    return {
      account: this.account,
      signatureMessage: this.signatureMessage,
      signature: this.signature,
    };
  };
}

export class CreateGmResponse extends ResponseData {
  readonly accountGm: Resources.AccountGm;

  public constructor(accountGm: Resources.AccountGm) {
    super();
    this.accountGm = accountGm;
  }

  public static fromObject = (obj: Record<string, unknown>): CreateGmResponse => {
    return new CreateGmResponse(
      Resources.AccountGm.fromObject(obj.accountGm as Record<string, unknown>),
    );
  };
}

export class CreateAnonymousGmRequest extends RequestData {
}

export class CreateAnonymousGmResponse extends ResponseData {
  // eslint-disable-next-line unused-imports/no-unused-vars
  public static fromObject = (obj: Record<string, unknown>): CreateAnonymousGmResponse => {
    return new CreateAnonymousGmResponse();
  };
}

export class ListGmAccountRowsRequest extends RequestData {
}

export class ListGmAccountRowsResponse extends ResponseData {
  readonly accountRows: Resources.GmAccountRow[];

  public constructor(accountRows: Resources.GmAccountRow[]) {
    super();
    this.accountRows = accountRows;
  }

  public static fromObject = (obj: Record<string, unknown>): ListGmAccountRowsResponse => {
    return new ListGmAccountRowsResponse(
      (obj.accountRows as Record<string, unknown>[]).map((innerObj: Record<string, unknown>) => Resources.GmAccountRow.fromObject(innerObj)),
    );
  };
}

export class ListGmCollectionAccountRowsRequest extends RequestData {
}

export class ListGmCollectionAccountRowsResponse extends ResponseData {
  readonly accountRows: Resources.GmAccountRow[];

  public constructor(accountRows: Resources.GmAccountRow[]) {
    super();
    this.accountRows = accountRows;
  }

  public static fromObject = (obj: Record<string, unknown>): ListGmCollectionAccountRowsResponse => {
    return new ListGmCollectionAccountRowsResponse(
      (obj.accountRows as Record<string, unknown>[]).map((innerObj: Record<string, unknown>) => Resources.GmAccountRow.fromObject(innerObj)),
    );
  };
}

export class ListGmCollectionRowsRequest extends RequestData {
}

export class ListGmCollectionRowsResponse extends ResponseData {
  readonly collectionRows: Resources.GmCollectionRow[];

  public constructor(collectionRows: Resources.GmCollectionRow[]) {
    super();
    this.collectionRows = collectionRows;
  }

  public static fromObject = (obj: Record<string, unknown>): ListGmCollectionRowsResponse => {
    return new ListGmCollectionRowsResponse(
      (obj.collectionRows as Record<string, unknown>[]).map((innerObj: Record<string, unknown>) => Resources.GmCollectionRow.fromObject(innerObj)),
    );
  };
}

export class GetLatestGmForAccountRequest extends RequestData {
}

export class GetLatestGmForAccountResponse extends ResponseData {
  readonly latestAccountGm: Resources.LatestAccountGm;

  public constructor(latestAccountGm: Resources.LatestAccountGm) {
    super();
    this.latestAccountGm = latestAccountGm;
  }

  public static fromObject = (obj: Record<string, unknown>): GetLatestGmForAccountResponse => {
    return new GetLatestGmForAccountResponse(
      Resources.LatestAccountGm.fromObject(obj.latestAccountGm as Record<string, unknown>),
    );
  };
}
