import React from 'react';

import { KibaException, truncateMiddle } from '@kibalabs/core';
import { SubRouterOutlet, useLocation, useNavigator } from '@kibalabs/core-react';
import { Alignment, Box, Button, ContainingView, Dialog, Direction, LoadingSpinner, PaddingSize, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { useAccount, useLoginSignature, useOnLinkAccountsClicked, useOnLoginClicked, useWeb3 } from '../AccountContext';
import { GmAccountRow, GmCollectionRow } from '../client/resources';
import { AccountsTable } from '../components/AccountsTable';
import { getEnsName } from '../components/AccountView';
import { CollectionsTable } from '../components/CollectionsTable';
import { Footer } from '../components/Footer';
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
  const navigator = useNavigator();
  const location = useLocation();
  const [isGming, setIsGming] = React.useState<boolean>(false);
  const [hasGmed, setHasGmed] = React.useState<boolean>(false);
  const [accountRows, setAccountRows] = React.useState<GmAccountRow[] | undefined | null>(undefined);
  const [collectionRows, setCollectionRows] = React.useState<GmCollectionRow[] | undefined | null>(undefined);

  const onLinkAccountsClicked = useOnLinkAccountsClicked();

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
    notdClient.createGm(account.address, loginSignature.message, loginSignature.signature).then((): void => {
      setHasGmed(true);
      setIsGming(false);
    }).catch((error: KibaException): void => {
      console.error(error);
      setIsGming(false);
    });
  };

  const onGmAnonymouslyClicked = (): void => {
    setIsGming(true);
    notdClient.createAnonymousGm().then((): void => {
      setHasGmed(true);
      setIsGming(false);
    }).catch((error: KibaException): void => {
      console.error(error);
      setIsGming(false);
    });
  };

  React.useEffect(() => {
    const sse = new EventSource(`${notdClient.baseUrl}/gm/v1/generate-gms`);
    sse.onmessage = (event: MessageEvent): void => {
      const eventData = JSON.parse(event.data);
      getEnsName(eventData.address, web3).then((name: string | null): void => {
        const displayName = name ?? (eventData.address ? truncateMiddle(eventData.address, 10) : 'anon');
        const toastView = (
          <Box variant='notificationGm' isFullWidth={false}>
            <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
              <Text variant='notification'>👋</Text>
              <Text variant='notification-bold'>gm</Text>
              <Text variant='notification'>{displayName}</Text>
            </Stack>
          </Box>
        );
        toastManager.showCustomToast(toastView, undefined, true);
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

  const isAboutSubpageShowing = location.pathname.includes('/about');
  const isSubpageShowing = isAboutSubpageShowing;

  return (
    <React.Fragment>
      <ContainingView>
        <Stack direction={Direction.Vertical} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} paddingTop={PaddingSize.Wide2} paddingBottom={PaddingSize.Wide} paddingHorizontal={PaddingSize.Wide}>
          <Text alignment={TextAlignment.Center} variant='header'>GM ☀️</Text>
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
                <Button variant='primary-large' text= 'Log in to say GM ⚡️' onClicked={onLoginClicked} isLoading={isGming} />
              ) : hasGmed ? (
                <Text>thanks, tell your friends!</Text>
              ) : (
                <Button variant='primary-large' text= 'Say GM ⚡️' onClicked={onGmClicked} isLoading={isGming} />
              )}
            </React.Fragment>
          ) : account == null && (
            <React.Fragment>
              <Button variant='primary-large' text= 'Connect to GM ⚡️' onClicked={onConnectWalletClicked} />
              {!hasGmed && (
                <Button variant='small' text= 'anon gm' onClicked={onGmAnonymouslyClicked} />
              )}
            </React.Fragment>
          )}
          <Footer tokenPageReferral='gm' isSmall={true} />
        </Stack>
        {/* <EnsInstructionsDialog
          isOpen={isEnsInstructionsOpen}
          imageIpfsUrl={imageIpfsUrl}
          onCloseClicked={onEnsInstructionsCloseClicked}
          onUploadClicked={onUploadClicked}
        /> */}
        {/* <MessageDialog
          isOpen={isSkipDialogShowing}
          message={'PFP Kit works best when you connect your account.\n\nIt&apos;s completely safe - PFP Kit will never ask you to sign a transaction so there&apos;s no risk involved, the connection is just to find your public information on the blockchain.\n\nBy connecting your wallet we can quickly verify all the NFTs you own and streamline your experience down to just a few seconds ⚡⚡'}
          confirmButtonText='Skip anyway'
          cancelButtonText='Cancel'
          onCloseClicked={onSkipCancelClicked}
          onConfirmClicked={onSkipConfirmClicked}
        /> */}
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
