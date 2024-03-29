import React from 'react';

import { LocalStorageClient, Requester } from '@kibalabs/core';
import { IRoute, MockStorage, Router, useInitialization } from '@kibalabs/core-react';
import { Head, IHeadRootProviderProps, KibaApp, ResponsiveHidingView, ScreenSize } from '@kibalabs/ui-react';
import { Web3Storage } from 'web3.storage';

import { AccountControlProvider } from './AccountContext';
import { NotdClient } from './client/client';
import { FloatingView } from './components/FloatingView';
import { Footer } from './components/Footer';
import { KibaToastContainer } from './components/Toast';
import { GlobalsProvider, IGlobals } from './globalsContext';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { buildAppTheme } from './theme';
import './app.css';


declare global {
  export interface Window {
    KRT_API_URL?: string;
    KRT_WEB3STORAGE_API_KEY?: string;
  }
}
const requester = new Requester(undefined, undefined, false);
const web3StorageClient = new Web3Storage({ token: typeof window !== 'undefined' ? window.KRT_WEB3STORAGE_API_KEY ?? '' : '' });
const notdClient = new NotdClient(requester, typeof window !== 'undefined' ? window.KRT_API_URL : undefined);
const localStorageClient = new LocalStorageClient(typeof window !== 'undefined' ? window.localStorage : new MockStorage());

const theme = buildAppTheme();
// const tracker = new EveryviewTracker('26c8cdc5634542969311db49441ce95b', true);

const globals: IGlobals = {
  web3StorageClient,
  notdClient,
  localStorageClient,
};

export interface IAppProps extends IHeadRootProviderProps {
  staticPath?: string;
}

export const App = (props: IAppProps): React.ReactElement => {
  useInitialization((): void => {
    // tracker.initialize();
    // tracker.trackApplicationOpen();
  });

  const routes: IRoute<IGlobals>[] = [
    { path: '/',
      page: HomePage,
      subRoutes: [
        { path: '/about', page: AboutPage },
      ] },
  ];

  return (
    <KibaApp theme={theme} setHead={props.setHead} isFullPageApp={true}>
      <Head headId='app'>
        <title>GM ☀️</title>
      </Head>
      <GlobalsProvider globals={globals}>
        <AccountControlProvider>
          <Router staticPath={props.staticPath} routes={routes} />
          <ResponsiveHidingView hiddenBelow={ScreenSize.Medium}>
            <FloatingView positionBottom='20px' positionRight='20px'>
              <Footer isSmall={true} tokenPageReferral='gm' />
            </FloatingView>
          </ResponsiveHidingView>
          <KibaToastContainer />
        </AccountControlProvider>
      </GlobalsProvider>
    </KibaApp>
  );
};
