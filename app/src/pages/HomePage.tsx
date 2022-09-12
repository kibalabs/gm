import React from 'react';

import { KibaException, truncateMiddle } from '@kibalabs/core';
import { SubRouterOutlet, useLocation, useNavigator } from '@kibalabs/core-react';
import { Alignment, Box, Button, ContainingView, Dialog, Direction, LayerContainer, LinkBase, LoadingSpinner, PaddingSize, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { useAccount, useLoginSignature, useOnLinkAccountsClicked, useOnLoginClicked, useWeb3 } from '../AccountContext';
import { AccountGm, GmAccountRow, GmCollectionRow } from '../client/resources';
import { AccountsTable } from '../components/AccountsTable';
import { AccountView, getEnsName } from '../components/AccountView';
import { CollectionsTable } from '../components/CollectionsTable';
import { useToastManager } from '../components/Toast';
import { useGlobals } from '../globalsContext';

export type UpdateResult = {
  isSuccess: boolean;
  message: string;
}

export const HomePage = (): React.ReactElement => {
  const { notdClient } = useGlobals();
  const web3 = useWeb3();
  const toastManager = useToastManager();
  const account = useAccount();
  const loginSignature = useLoginSignature();
  const onAccountLoginClicked = useOnLoginClicked();
  const onLinkAccountsClicked = useOnLinkAccountsClicked();
  const navigator = useNavigator();
  const location = useLocation();
  const [isGming, setIsGming] = React.useState<boolean>(false);
  const [accountGm, setAccountGm] = React.useState<AccountGm | null>(null);
  const [accountRows, setAccountRows] = React.useState<GmAccountRow[] | undefined | null>(undefined);
  const [collectionRows, setCollectionRows] = React.useState<GmCollectionRow[] | undefined | null>(undefined);

  const isAboutSubpageShowing = location.pathname.includes('/about');
  const isSubpageShowing = isAboutSubpageShowing;

  const onConnectWalletClicked = async (): Promise<void> => {
    await onLinkAccountsClicked();
  };

  const onCloseSubpageClicked = (): void => {
    navigator.navigateTo('/');
  };

  const loadData = React.useCallback((): void => {
    notdClient.listGmAccountRows().then((retrievedAccountRows: GmAccountRow[]): void => {
      setAccountRows(retrievedAccountRows);
    }).catch((error: unknown): void => {
      console.error(error);
      setAccountRows(null);
    });
    notdClient.listGmCollectionRows().then((retrievedCollectionRows: GmCollectionRow[]): void => {
      setCollectionRows(retrievedCollectionRows);
    }).catch((error: unknown): void => {
      console.error(error);
      setCollectionRows(null);
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
      return `GM frens! I just GM'd on behalf of ${accountGm.collectionCount} communities and got them higher up the GM board 🚀 Go rep your communities too at https://gm.tokenpage.xyz ⚡️`;
    }
    return 'GM frens! Go rep your communities too at https://gm.tokenpage.xyz ⚡️';
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
                <Text variant='notification'>👋</Text>
                <Text variant='notification-bold'>gm</Text>
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
        <Stack direction={Direction.Vertical} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} paddingTop={PaddingSize.Wide2} paddingBottom={PaddingSize.Wide} paddingHorizontal={PaddingSize.Wide}>
          <Box height='4em'>
            <LayerContainer>
              <Text alignment={TextAlignment.Center} variant='header'>GM ☀️</Text>
              <LayerContainer.Layer isFullWidth={false} isFullHeight={false} alignmentHorizontal={Alignment.Start} alignmentVertical={Alignment.Center}>
                <Button text='About' target='/about' />
              </LayerContainer.Layer>
            </LayerContainer>
          </Box>
          <Stack.Item growthFactor={1} shrinkFactor={1} shouldShrinkBelowContentSize={true}>
            <Stack direction={Direction.Horizontal} shouldAddGutters={true} isFullWidth={true}>
              <Stack.Item growthFactor={1} shrinkFactor={1}>
                <Box variant='tableBox' isFullHeight={true} shouldClipContent={true} isScrollableVertically={true}>
                  {collectionRows === undefined ? (
                    <LoadingSpinner />
                  ) : collectionRows === null ? (
                    <Text variant='error'>Failed to load</Text>
                  ) : (
                    <Stack direction={Direction.Vertical} contentAlignment={Alignment.Start}>
                      <CollectionsTable rows={collectionRows} />
                    </Stack>
                  )}
                </Box>
              </Stack.Item>
              <Stack.Item growthFactor={1} shrinkFactor={1}>
                <Box variant='tableBox' isFullHeight={true} shouldClipContent={true} isScrollableVertically={true}>
                  {accountRows === undefined ? (
                    <LoadingSpinner />
                  ) : accountRows === null ? (
                    <Text variant='error'>Failed to load</Text>
                  ) : (
                    <Stack direction={Direction.Vertical} contentAlignment={Alignment.Start}>
                      <AccountsTable rows={accountRows} />
                    </Stack>
                  )}
                </Box>
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Spacing variant={PaddingSize.Narrow4} />
          {account ? (
            <React.Fragment>
              {!loginSignature ? (
                <Button variant='primary-large' text='Log in to say GM ⚡️' onClicked={onLoginClicked} isLoading={isGming} />
              ) : accountGm ? (
                <Box width='90%' maxWidth='550px'>
                  <Stack direction={Direction.Vertical} shouldAddGutters={true}>
                    <Text alignment={TextAlignment.Center} variant='large-bold'>GM fren!!</Text>
                    <Text alignment={TextAlignment.Center}>{`Your current streak is ${accountGm.streakLength} 🚀🚀 Come back tomorrow to keep it going!`}</Text>
                    <Text alignment={TextAlignment.Center}>{`You got ${accountGm.collectionCount} communities higher up the board. Get your fellow collectors GM-ing here to get them to the top 👆`}</Text>
                    <Button variant='secondary' text='Share on Twitter' target={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getTwitterShareText())}`} />
                  </Stack>
                </Box>
              ) : (
                <Button variant='primary-large' text='Say GM ⚡️' onClicked={onGmClicked} isLoading={isGming} />
              )}
            </React.Fragment>
          ) : account == null && (
            <React.Fragment>
              <Button variant='primary-large' text='Connect to GM ⚡️' onClicked={onConnectWalletClicked} />
              <Button variant='small' text='anon gm' onClicked={onGmAnonymouslyClicked} />
            </React.Fragment>
          )}
        </Stack>
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
      </ContainingView>
    </React.Fragment>
  );
};
