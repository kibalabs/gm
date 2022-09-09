import React from 'react';

import { LocalStorageClient, Requester } from '@kibalabs/core';
import { IRoute, MockStorage, Router, useInitialization } from '@kibalabs/core-react';
import { Head, IHeadRootProviderProps, KibaApp } from '@kibalabs/ui-react';
import { ToastContainer } from 'react-toastify';
import { Web3Storage } from 'web3.storage';
import 'react-toastify/dist/ReactToastify.css';

import { AccountControlProvider } from './AccountContext';
import { NotdClient } from './client/client';
import { GlobalsProvider, IGlobals } from './globalsContext';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { buildAppTheme } from './theme';

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
        { path: '/frames', page: AboutPage },
      ] },
  ];

  return (
    <KibaApp theme={theme} background={{ linearGradient: 'rgb(0, 0, 0), rgb(25, 24, 37)' }} setHead={props.setHead} isFullPageApp={true}>
      <Head headId='app'>
        <title>GM ☀️</title>
      </Head>
      <GlobalsProvider globals={globals}>
        <AccountControlProvider>
          <Router staticPath={props.staticPath} routes={routes} />
        </AccountControlProvider>
      </GlobalsProvider>
      <ToastContainer />
    </KibaApp>
  );
};
