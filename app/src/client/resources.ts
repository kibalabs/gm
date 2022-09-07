import { ResponseData } from '@kibalabs/core';

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
