import React from 'react';

import { truncateMiddle } from '@kibalabs/core';
import { Alignment, Box, Direction, Image, LinkBase, Stack, Text } from '@kibalabs/ui-react';
import { ethers } from 'ethers';

import { useAccount, useWeb3 } from '../AccountContext';

export interface AccountViewProps {
  address: string;
  textVariant?: string;
  imageSize?: string;
  shouldUseYourAccount?: boolean;
}

const nameCache: Map<string, string | null> = new Map();

export const getEnsName = (address: string | null | undefined, web3: ethers.providers.Web3Provider | undefined | null): Promise<string | null> => {
  if (!address) {
    return Promise.resolve(null);
  }
  if (nameCache.get(address)) {
    return Promise.resolve(nameCache.get(address) || null);
  }
  if (!address || !web3) {
    return Promise.resolve(null);
  }
  return web3.lookupAddress(address).then((retrievedOwnerName: string | null): string | null => {
    if (retrievedOwnerName) {
      nameCache.set(address, retrievedOwnerName);
    }
    return retrievedOwnerName;
  }).catch((): null => {
    return null;
  });
};

export const useEnsName = (address: string | null | undefined): string | null => {
  const web3 = useWeb3();
  const [name, setName] = React.useState<string | null>(null);

  React.useEffect((): void => {
    setName(null);
    getEnsName(address, web3).then((value: string | null): void => {
      setName(value);
    });
  }, [address, web3]);

  return name;
};

export const AccountView = (props: AccountViewProps): React.ReactElement => {
  const account = useAccount();
  const name = useEnsName(props.address);

  const imageSize = props.imageSize ?? '20px';
  const defaultText = truncateMiddle(props.address, 10);
  const text = (props.shouldUseYourAccount && account?.address === props.address) ? 'Your profile' : (name ?? defaultText);

  return (
    <Stack key={props.address} direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
      <Box variant='rounded' shouldClipContent={true} height={imageSize} width={imageSize}>
        <Image isLazyLoadable={true} source={`https://web3-images-api.kibalabs.com/v1/accounts/${props.address}/image`} alternativeText='.' />
      </Box>
      <Text variant={props.textVariant}>{text}</Text>
    </Stack>
  );
};

export interface AccountViewLinkProps extends AccountViewProps {
  target: string;
}

export const AccountViewLink = (props: AccountViewLinkProps): React.ReactElement => {
  return (
    <LinkBase target={props.target} key={props.address}>
      <AccountView {...props} />
    </LinkBase>
  );
};
