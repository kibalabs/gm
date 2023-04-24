import { dateFromString, ResponseData } from '@kibalabs/core';

export class TokenAttribute {
  readonly traitType: string;
  readonly value: string;

  public constructor(traitType: string, value: string) {
    this.traitType = traitType;
    this.value = value;
  }

  public static fromObject = (obj: Record<string, unknown>): TokenAttribute => {
    return new TokenAttribute(
      String(obj.trait_type),
      String(obj.value),
    );
  };
}

export class Collection extends ResponseData {
  public constructor(
    readonly address: string,
    readonly name: string | null,
    readonly imageUrl: string | null,
    readonly description: string | null,
    readonly url: string | null,
    readonly openseaSlug: string | null,
    readonly bannerImageUrl: string | null,
    readonly discordUrl: string | null,
    readonly instagramUsername: string | null,
    readonly twitterUsername: string | null,
  ) { super(); }

  public static fromObject = (obj: Record<string, unknown>): Collection => {
    return new Collection(
      String(obj.address),
      obj.name ? String(obj.name) : null,
      obj.imageUrl ? String(obj.imageUrl) : null,
      obj.description ? String(obj.description) : null,
      obj.url ? String(obj.url) : null,
      obj.openseaSlug ? String(obj.openseaSlug) : null,
      obj.bannerImageUrl ? String(obj.bannerImageUrl) : null,
      obj.discordUrl ? String(obj.discordUrl) : null,
      obj.instagramUsername ? String(obj.instagramUsername) : null,
      obj.twitterUsername ? String(obj.twitterUsername) : null,
    );
  };
}

export class CollectionToken {
  readonly registryAddress: string;
  readonly tokenId: string;
  readonly name: string;
  readonly imageUrl: string | null;
  readonly description: string | null;
  readonly attributes: TokenAttribute[];
  readonly frameImageUrl: string | null;

  public constructor(registryAddress: string, tokenId: string, name: string, imageUrl: string | null, description: string | null, attributes: TokenAttribute[], frameImageUrl: string | null) {
    this.registryAddress = registryAddress;
    this.tokenId = tokenId;
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.attributes = attributes;
    this.frameImageUrl = frameImageUrl;
  }

  public static fromObject = (obj: Record<string, unknown>): CollectionToken => {
    return new CollectionToken(
      String(obj.registryAddress),
      String(obj.tokenId),
      String(obj.name),
      obj.imageUrl ? String(obj.imageUrl) : null,
      obj.description ? String(obj.description) : null,
      (obj.attributes as Record<string, unknown>[]).map((innerObj: Record<string, unknown>) => TokenAttribute.fromObject(innerObj)),
      obj.frameImageUrl ? String(obj.frameImageUrl) : null,
    );
  };
}


export class AccountGm {
  readonly address: string;
  readonly date: Date;
  readonly streakLength: number;
  readonly collectionCount: number;

  public constructor(address: string, date: Date, streakLength: number, collectionCount: number) {
    this.address = address;
    this.date = date;
    this.streakLength = streakLength;
    this.collectionCount = collectionCount;
  }

  public static fromObject = (obj: Record<string, unknown>): AccountGm => {
    return new AccountGm(
      String(obj.address),
      dateFromString(obj.date as string),
      Number(obj.streakLength),
      Number(obj.collectionCount),
    );
  };
}

export class AccountCollectionGm {
  readonly registryAddress: string;
  readonly accountAddress: string;
  readonly date: Date;

  public constructor(registryAddress: string, accountAddress: string, date: Date) {
    this.registryAddress = registryAddress;
    this.date = date;
    this.accountAddress = accountAddress;
  }

  public static fromObject = (obj: Record<string, unknown>): AccountCollectionGm => {
    return new AccountCollectionGm(
      String(obj.registryAddress),
      String(obj.accountAddress),
      dateFromString(obj.date as string),
    );
  };
}


export class GmCollectionRow {
  readonly collection: Collection;
  readonly todayCount: number;
  readonly weekCount: number;
  readonly monthCount: number;

  public constructor(collection: Collection, todayCount: number, weekCount: number, monthCount: number) {
    this.collection = collection;
    this.todayCount = todayCount;
    this.weekCount = weekCount;
    this.monthCount = monthCount;
  }

  public static fromObject = (obj: Record<string, unknown>): GmCollectionRow => {
    return new GmCollectionRow(
      Collection.fromObject(obj.collection as Record<string, unknown>),
      Number(obj.todayCount),
      Number(obj.weekCount),
      Number(obj.monthCount),
    );
  };
}

export class GmAccountRow {
  readonly address: string;
  readonly lastDate: Date;
  readonly weekCount: number;
  readonly monthCount: number;
  readonly streakLength: number;

  public constructor(address: string, lastDate: Date, weekCount: number, monthCount: number, streakLength: number) {
    this.address = address;
    this.lastDate = lastDate;
    this.weekCount = weekCount;
    this.monthCount = monthCount;
    this.streakLength = streakLength;
  }

  public static fromObject = (obj: Record<string, unknown>): GmAccountRow => {
    return new GmAccountRow(
      String(obj.address),
      dateFromString(obj.lastDate as string),
      Number(obj.weekCount),
      Number(obj.monthCount),
      Number(obj.streakLength),
    );
  };
}


export class LatestAccountGm {
  readonly accountGm: AccountGm;
  readonly accountCollectionGms: AccountCollectionGm[];

  public constructor(accountGm: AccountGm, accountCollectionGms: AccountCollectionGm[]) {
    this.accountGm = accountGm;
    this.accountCollectionGms = accountCollectionGms;
  }

  public static fromObject = (obj: Record<string, unknown>): LatestAccountGm => {
    return new LatestAccountGm(
      AccountGm.fromObject(obj.accountGm as Record<string, unknown>),
      (obj.accountCollectionGms as Record<string, unknown>[]).map((innerObj: Record<string, unknown>) => AccountCollectionGm.fromObject(innerObj)),
    );
  };
}
