import React from 'react';

import { KibaException, truncateMiddle } from '@kibalabs/core';
import { SubRouterOutlet, useLocation, useNavigator } from '@kibalabs/core-react';
import { Alignment, Box, Button, ContainingView, Dialog, Direction, KibaIcon, LinkBase, LoadingSpinner, MarkdownText, PaddingSize, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';
import { useToastManager } from '@kibalabs/ui-react-toast';
import { useOnLinkWeb3AccountsClicked, useWeb3, useWeb3Account, useWeb3LoginSignature, useWeb3OnLoginClicked } from '@kibalabs/web3-react';

import { AccountGm, CollectionToken, GmAccountRow } from '../client/resources';
import { AccountsTable } from '../components/AccountsTable';
import { AccountView, getEnsName } from '../components/AccountView';
import { NavBar } from '../components/NavBar';
import { useGlobals } from '../globalsContext';


const ZENCHEST_REGISTRY_ADDRESS = '0x7B70695E761EB828aBEd8c4d506f9af3a76eF4b5';

export const HomePage = (): React.ReactElement => {
  const { notdClient } = useGlobals();
  const web3 = useWeb3();
  const toastManager = useToastManager();
  const account = useWeb3Account();
  const loginSignature = useWeb3LoginSignature();
  const onAccountLoginClicked = useWeb3OnLoginClicked();
  const onLinkAccountsClicked = useOnLinkWeb3AccountsClicked();
  const navigator = useNavigator();
  const location = useLocation();
  const [isGming, setIsGming] = React.useState<boolean>(false);
  const [accountGm, setAccountGm] = React.useState<AccountGm | null>(null);
  const [accountRows, setAccountRows] = React.useState<GmAccountRow[] | undefined | null>(undefined);
  const [holdings, setHoldings] = React.useState<CollectionToken[] | undefined | null>(undefined);

  const isAboutSubpageShowing = location.pathname.includes('/about');
  const isSubpageShowing = isAboutSubpageShowing;

  const onConnectWalletClicked = async (): Promise<void> => {
    await onLinkAccountsClicked();
  };

  const onCloseSubpageClicked = (): void => {
    navigator.navigateTo('/');
  };

  const getCollectionHoldings = React.useCallback(async (shouldClear = false): Promise<void> => {
    if (shouldClear) {
      setHoldings(undefined);
    }
    if (account === undefined) {
      setHoldings(undefined);
      return;
    }
    if (account === null) {
      setHoldings(null);
      return;
    }
    notdClient.getCollectionHoldings(ZENCHEST_REGISTRY_ADDRESS, account.address).then((tokenTransfers: CollectionToken[]): void => {
      setHoldings(tokenTransfers);
    }).catch((error: unknown): void => {
      console.error(error);
      setHoldings(null);
    });
  }, [notdClient, account]);

  React.useEffect((): void => {
    getCollectionHoldings();
  }, [getCollectionHoldings]);

  const loadData = React.useCallback((): void => {
    notdClient.listGmCollectionAccountRows(ZENCHEST_REGISTRY_ADDRESS).then((retrievedAccountRows: GmAccountRow[]): void => {
      setAccountRows(retrievedAccountRows);
    }).catch((error: unknown): void => {
      console.error(error);
      setAccountRows(null);
    });
  }, [notdClient]);

  React.useEffect((): void => {
    loadData();
  }, [loadData]);

  const onLoginClicked = async (): Promise<void> => {
    let signature = loginSignature;
    if (!signature) {
      signature = await onAccountLoginClicked();
    }
  };

  const onGmClicked = (): void => {
    if (!account || !loginSignature) {
      return;
    }
    setIsGming(true);
    notdClient.createGm(account.address, loginSignature.message, loginSignature.signature).then((retrievedAccountGm: AccountGm): void => {
      setAccountGm(retrievedAccountGm);
      setIsGming(false);
      loadData();
    }).catch((error: KibaException): void => {
      console.error(error);
      setIsGming(false);
    });
  };

  const onGmAnonymouslyClicked = (): void => {
    setIsGming(true);
    notdClient.createAnonymousGm().then((): void => {
      setIsGming(false);
      loadData();
    }).catch((error: KibaException): void => {
      console.error(error);
      setIsGming(false);
    });
  };

  const getTwitterShareText = (): string => {
    if (accountGm) {
      return `ZM frens 🔮! Show you're still active and kicking in the @ZenAcademy at https://zm.tokenpage.xyz! I'm at ${accountGm.streakLength} in a row now, you'll see again tomorrow ⚡️`;
    }
    return 'ZM frens 🔮! Show you\'re still active and kicking in the @ZenAcademy at https://zm.tokenpage.xyz';
  };

  React.useEffect((): (() => void) => {
    const sse = new EventSource(`${notdClient.baseUrl}/gm/v1/generate-gms`);
    sse.onmessage = (event: MessageEvent): void => {
      const eventData = JSON.parse(event.data);
      getEnsName(eventData.address, web3).then((name: string | null): void => {
        const toastId = event.lastEventId;
        const displayName = name ?? (eventData.address ? truncateMiddle(eventData.address, 10) : 'anon');
        const toastView = (
          <LinkBase onClicked={(): void => toastManager.dismissToast(toastId)}>
            <Box variant='notificationGm' isFullWidth={false}>
              <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
                <Text variant='notification'>🔮</Text>
                <Text variant='notification-bold'>zm</Text>
                {eventData.address ? (
                  <AccountView textVariant='notification' address={eventData.address} />
                ) : (
                  <Text variant='notification'>{displayName}</Text>
                )}
              </Stack>
            </Box>
          </LinkBase>
        );
        toastManager.showCustomToast(toastView, toastId, undefined, 30);
      });
    };
    sse.onerror = (error: unknown): void => {
      console.error(error);
      sse.close();
    };
    return (): void => {
      sse.close();
    };
  }, [notdClient, toastManager, web3]);

  return (
    <React.Fragment>
      <ContainingView>
        <Stack direction={Direction.Vertical} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} paddingTop={PaddingSize.Wide} paddingBottom={PaddingSize.Wide} paddingHorizontal={PaddingSize.Wide}>
          {/* <Box variant='topBar' isFullWidth={true} height={'2em'} shouldClipContent={true}>
            <Stack direction={Direction.Vertical} shouldAddGutters={true}>
              <Text alignment={TextAlignment.Center}>🎁 Prizes today is 1 WL spot!</Text>
            </Stack>
          </Box>
          <Spacing /> */}
          <NavBar />
          <Stack.Item growthFactor={1} shrinkFactor={1} shouldShrinkBelowContentSize={true}>
            <Box variant='tableBox' isFullHeight={true} shouldClipContent={true} isScrollableVertically={true}>
              {accountRows === undefined ? (
                <LoadingSpinner />
              ) : accountRows === null ? (
                <Text variant='error'>Failed to load</Text>
              ) : (
                <Stack direction={Direction.Vertical} contentAlignment={Alignment.Start}>
                  <AccountsTable rows={accountRows} userAddress={account?.address} />
                </Stack>
              )}
            </Box>
          </Stack.Item>
          <Spacing variant={PaddingSize.Narrow4} />
          {account ? (
            <React.Fragment>
              {!loginSignature ? (
                <Button variant='primary-large' text='Log in to say ZM 👋' onClicked={onLoginClicked} isLoading={isGming} />
              ) : holdings === undefined ? (
                <LoadingSpinner />
              ) : holdings === null ? (
                <Text variant='error'>Error loading your tokens</Text>
              ) : holdings.length === 0 ? (
                <React.Fragment>

                  <Text alignment={TextAlignment.Center} variant='large-bold'>You don&apos;t hold any ZenChests 😢</Text>
                  <MarkdownText textAlignment={TextAlignment.Center} source={'You can [get your first ZenChest here](https://opensea.io/collection/zen-chests).\nYou can still ZM but you won\'t show on the leaderboard until you own a chest!'} />
                  <Button variant='tertiary' text='Say ZM anyway' onClicked={onGmClicked} isLoading={isGming} />
                </React.Fragment>
              ) : accountGm ? (
                <Box width='90%' maxWidth='550px'>
                  <Stack direction={Direction.Vertical} shouldAddGutters={true}>
                    <Text alignment={TextAlignment.Center} variant='large-bold'>ZM fren!!</Text>
                    <Text alignment={TextAlignment.Center}>{`Your current streak is ${accountGm.streakLength} 🚀🚀 Come back tomorrow to keep it going!`}</Text>
                    {/* <Text alignment={TextAlignment.Center}>{`You got ${accountGm.collectionCount} communities higher up the board. Get your fellow collectors GM-ing here to get them to the top 👆`}</Text> */}
                    <Button variant='tertiary' text='Share on Twitter' target={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getTwitterShareText())}`} iconLeft={<KibaIcon iconId='ion-logo-twitter' />} isTextFullWidth={false} contentAlignment={Alignment.Center} />
                  </Stack>
                </Box>
              ) : (
                <Button variant='primary-large' text='Say ZM 👋' onClicked={onGmClicked} isLoading={isGming} />
              )}
            </React.Fragment>
          ) : account == null && (
            <React.Fragment>
              <Button variant='primary-large' text='Connect to ZM 🔮' onClicked={onConnectWalletClicked} />
              <Button variant='small' text='anon zm' onClicked={onGmAnonymouslyClicked} />
            </React.Fragment>
          )}
        </Stack>
      </ContainingView>
      {isSubpageShowing && (
        <Dialog
          isOpen={true}
          onCloseClicked={onCloseSubpageClicked}
          maxWidth='750px'
          maxHeight='90%'
        >
          <SubRouterOutlet />
        </Dialog>
      )}
    </React.Fragment>
  );
};
