import React from 'react';

import { useLocation, useNavigator } from '@kibalabs/core-react';
import { Alignment, Box, Button, Direction, getVariant, HidingView, IconButton, KibaIcon, LayerContainer, PaddingSize, ResponsiveHidingView, ScreenSize, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { useAccount } from '../AccountContext';
import { AccountImageView, AccountView } from './AccountView';


const TAB_KEY_HOME = 'TAB_KEY_HOME';
const TAB_KEY_ABOUT = 'TAB_KEY_ABOUT';


export const NavBar = (): React.ReactElement => {
  const account = useAccount();
  const navigator = useNavigator();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const onMenuClicked = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onTabKeySelected = (newSelectedTabKey: string): void => {
    let newLocation = '';
    if (newSelectedTabKey === TAB_KEY_HOME) {
      newLocation = '/';
    } else if (newSelectedTabKey === TAB_KEY_ABOUT) {
      newLocation = '/about';
    }
    navigator.navigateTo(newLocation);
    setIsMenuOpen(false);
  };

  return (
    <Stack direction={Direction.Vertical} isFullWidth={true}>
      <Box height='4em'>
        <LayerContainer>
          <Text alignment={TextAlignment.Center} variant='header'>GM ☀️</Text>
          <LayerContainer.Layer isFullWidth={false} isFullHeight={false} alignmentHorizontal={Alignment.Start} alignmentVertical={Alignment.Center} />
          <LayerContainer.Layer isFullWidth={false} isFullHeight={false} alignmentHorizontal={Alignment.Start} alignmentVertical={Alignment.Center}>
            <ResponsiveHidingView hiddenBelow={ScreenSize.Medium}>
              <Button text='About' target='/about' />
            </ResponsiveHidingView>
            <ResponsiveHidingView hiddenAbove={ScreenSize.Medium}>
              <IconButton icon={<KibaIcon iconId='ion-menu-outline' />} label='Open menu' onClicked={onMenuClicked} />
            </ResponsiveHidingView>
          </LayerContainer.Layer>
          {account && (
            <LayerContainer.Layer isFullWidth={false} isFullHeight={false} alignmentHorizontal={Alignment.End} alignmentVertical={Alignment.Center}>
              <ResponsiveHidingView hiddenBelow={ScreenSize.Medium}>
                <AccountView address={account.address} />
              </ResponsiveHidingView>
              <ResponsiveHidingView hiddenAbove={ScreenSize.Medium}>
                <AccountImageView address={account.address} />
              </ResponsiveHidingView>
            </LayerContainer.Layer>
          )}
        </LayerContainer>
      </Box>
      <HidingView isHidden={!isMenuOpen}>
        <ResponsiveHidingView hiddenAbove={ScreenSize.Medium}>
          <Box variant='unrounded-overlay'>
            <Stack direction={Direction.Vertical} isFullWidth={true} childAlignment={Alignment.Center} shouldAddGutters={true} paddingStart={PaddingSize.Wide} paddingEnd={PaddingSize.Wide}>
              <Button text='Home' variant={getVariant(location.pathname.endsWith('/') ? 'navBarSelected' : null)} onClicked={(): void => onTabKeySelected(TAB_KEY_HOME)} />
              <Button text='About' variant={getVariant(location.pathname.endsWith('/about') ? 'navBarSelected' : null)} onClicked={(): void => onTabKeySelected(TAB_KEY_ABOUT)} />
              {account && (
                <AccountView address={account.address} />
              )}
            </Stack>
          </Box>
        </ResponsiveHidingView>
      </HidingView>
    </Stack>
  );
};
