import React from 'react';

import { SubRouterOutlet, useLocation, useNavigator } from '@kibalabs/core-react';
import { Alignment, Box, Button, ContainingView, Dialog, Direction, PaddingSize, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { useAccount, useOnLinkAccountsClicked } from '../AccountContext';
import { CollectionsTable } from '../components/CollectionsTable';
import { Footer } from '../components/Footer';

export type UpdateResult = {
  isSuccess: boolean;
  message: string;
}

export const HomePage = (): React.ReactElement => {
  const account = useAccount();
  const navigator = useNavigator();
  const location = useLocation();
  const [isGming, setIsGming] = React.useState<boolean>(false);
  const [hasGmed, setHasGmed] = React.useState<boolean>(false);

  const onLinkAccountsClicked = useOnLinkAccountsClicked();

  const onConnectWalletClicked = async (): Promise<void> => {
    await onLinkAccountsClicked();
  };

  const onCloseSubpageClicked = (): void => {
    navigator.navigateTo('/');
  };

  const onGmClicked = (): void => {
    setIsGming(true);
    setTimeout((): void => {
      setHasGmed(true);
      setIsGming(false);
    }, 2000);
  };

  const onGmAnonymouslyClicked = (): void => {
    setIsGming(true);
    setTimeout((): void => {
      setHasGmed(true);
      setIsGming(false);
    }, 2000);
  };

  const isAboutSubpageShowing = location.pathname.includes('/about');
  const isSubpageShowing = isAboutSubpageShowing;

  return (
    <ContainingView>
      <Stack direction={Direction.Vertical} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} paddingTop={PaddingSize.Wide2} paddingBottom={PaddingSize.Wide} paddingHorizontal={PaddingSize.Wide}>
        <Text alignment={TextAlignment.Center} variant='header'>GM ☀️</Text>
        <Stack.Item growthFactor={1} shrinkFactor={1} shouldShrinkBelowContentSize={true}>
          <Stack direction={Direction.Horizontal} shouldAddGutters={true} isFullWidth={true}>
            <Stack.Item growthFactor={1} shrinkFactor={1}>
              <Box variant='tableBox' isFullHeight={true} shouldClipContent={true} isScrollableVertically={true}>
                <CollectionsTable />
              </Box>
            </Stack.Item>
            <Stack.Item growthFactor={1} shrinkFactor={1}>
              <Box variant='tableBox' isFullHeight={true} shouldClipContent={true} isScrollableVertically={true}>
                <CollectionsTable />
              </Box>
            </Stack.Item>
          </Stack>
        </Stack.Item>
        <Spacing variant={PaddingSize.Narrow4} />
        {account ? (
          <React.Fragment>
            {hasGmed ? (
              <Text>thanks, tell your friends!</Text>
            ) : (
              <Button variant='primary-large' text= 'Say GM ⚡️' onClicked={onGmClicked} isLoading={isGming} />
            )}
          </React.Fragment>
        ) : account === null && (
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
  );
};
