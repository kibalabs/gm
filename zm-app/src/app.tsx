import React from 'react';

import { LocalStorageClient, Requester } from '@kibalabs/core';
import { IRoute, MockStorage, Router, useInitialization } from '@kibalabs/core-react';
import { ComponentDefinition, Head, IHeadRootProviderProps, KibaApp, ResponsiveHidingView, ScreenSize } from '@kibalabs/ui-react';
import { buildToastThemes, Toast, ToastContainer, ToastThemedStyle } from '@kibalabs/ui-react-toast';
import { Web3AccountControlProvider } from '@kibalabs/web3-react';

import { NotdClient } from './client/client';
import { FloatingView } from './components/FloatingView';
import { Footer } from './components/Footer';
import { Table, TableThemedStyle } from './components/Table';
import { TableCell, TableCellThemedStyle } from './components/TableCell';
import { TableRow, TableRowThemedStyle } from './components/TableRow';
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
const notdClient = new NotdClient(requester, typeof window !== 'undefined' ? window.KRT_API_URL : undefined);
const localStorageClient = new LocalStorageClient(typeof window !== 'undefined' ? window.localStorage : new MockStorage());

const theme = buildAppTheme();
// const tracker = new EveryviewTracker('26c8cdc5634542969311db49441ce95b', true);

const globals: IGlobals = {
  notdClient,
  localStorageClient,
};

export interface IAppProps extends IHeadRootProviderProps {
  staticPath?: string;
}

export const routes: IRoute<IGlobals>[] = [
  { path: '/',
    page: HomePage,
    subRoutes: [
      { path: '/about', page: AboutPage },
    ] },
];

// @ts-expect-error
const extraComponentDefinitions: ComponentDefinition[] = [
  { component: Toast, themeMap: buildToastThemes(theme.colors, theme.dimensions, theme.boxes, theme.texts, theme.icons), themeCssFunction: ToastThemedStyle },
  { component: Table, themeMap: theme.tables, themeCssFunction: TableThemedStyle },
  { component: TableRow, themeMap: theme.tableRows, themeCssFunction: TableRowThemedStyle },
  { component: TableCell, themeMap: theme.tableCells, themeCssFunction: TableCellThemedStyle },
];

export const App = (props: IAppProps): React.ReactElement => {
  useInitialization((): void => {
    // tracker.initialize();
    // tracker.trackApplicationOpen();
  });

  const onWeb3AccountError = (error: Error): void => {
    console.error(error);
  };

  return (
    <KibaApp theme={theme} setHead={props.setHead} isFullPageApp={true} extraComponentDefinitions={extraComponentDefinitions}>
      <Head headId='app'>
        <title>ZM 🔮</title>
      </Head>
      <GlobalsProvider globals={globals}>
        <Web3AccountControlProvider localStorageClient={localStorageClient} onError={onWeb3AccountError}>
          <Router staticPath={props.staticPath} routes={routes} />
          <ResponsiveHidingView hiddenBelow={ScreenSize.Medium}>
            <FloatingView positionBottom='20px' positionRight='20px'>
              <Footer isSmall={true} tokenPageReferral='zm' />
            </FloatingView>
          </ResponsiveHidingView>
          <ToastContainer />
        </Web3AccountControlProvider>
      </GlobalsProvider>
    </KibaApp>
  );
};
