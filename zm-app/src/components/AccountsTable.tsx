import React from 'react';

import { RecursivePartial } from '@kibalabs/core';
import { Alignment, Direction, getVariant, KibaIcon, Stack, Text, TextAlignment, useColors } from '@kibalabs/ui-react';

import { AccountView } from './AccountView';
import { Table } from './Table';
import { ITableCellTheme, TableCell } from './TableCell';
import { TableRow } from './TableRow';
import { GmAccountRow } from '../client/resources';

const areDatesSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear()
  && date1.getMonth() === date2.getMonth()
  && date1.getDate() === date2.getDate();
};

interface IUserCellContentProps {
  address: string;
}

const UserCellContent = (props: IUserCellContentProps): React.ReactElement => {
  return (
    // <AccountViewLink address={props.address} target={`/accounts/${props.address}` />
    <AccountView address={props.address} />
  );
};


export const DEFAULT_SORT = 'STATSTERAK_DESC';

const DUMMY_ROW: GmAccountRow = { address: '0x1', lastDate: new Date(), streakLength: 0, weekCount: 0, monthCount: 0 };


interface IAccountsTableProps {
  rows: GmAccountRow[];
  userAddress?: string | null;
}

interface IHeaderCellProps {
  id?: string;
  className?: string;
  headerId: string;
  title: string;
  isOrderable?: boolean;
  variant?: string;
  orderDirection?: -1 | 1 | null;
  contentAlignment?: Alignment;
  theme?: RecursivePartial<ITableCellTheme>;
  onClicked?: (headerId: string) => void;
}

const HeaderCell = (props: IHeaderCellProps): React.ReactElement => {
  const colors = useColors();
  if (props.isOrderable && !props.onClicked) {
    throw Error('onClicked must be provided if isOrderable=true');
  }

  return (
    <TableCell
      id={props.id}
      className={props.className}
      theme={props.theme}
      variant={getVariant('header', props.variant)}
      headerId={props.headerId}
      onClicked={props.isOrderable ? props.onClicked : undefined}
    >
      <Stack direction={Direction.Horizontal} isFullWidth={true} contentAlignment={props.contentAlignment ?? Alignment.Center} childAlignment={Alignment.Center} shouldAddGutters={true}>
        <Text variant='inherit' tag='span' alignment={TextAlignment.Left}>{props.title}</Text>
        {props.orderDirection ? (
          <KibaIcon variant='small' iconId={props.orderDirection === -1 ? 'ion-caret-down' : 'ion-caret-up'} />
        ) : props.isOrderable && (
          <KibaIcon variant='small' iconId={'ion-caret-forward'} _color={colors.textClear75} />
        )}
      </Stack>
    </TableCell>
  );
};

export const AccountsTable = (props: IAccountsTableProps): React.ReactElement => {
  const page = 0;
  const pageSize = 50;

  return (
    <Table>
      <thead>
        <TableRow>
          <HeaderCell headerId='INDEX' variant='headerNote' title='#' isOrderable={false} />
          <HeaderCell headerId='USER' title='Collectooors' contentAlignment={Alignment.Start} isOrderable={false} />
          <HeaderCell headerId='STATTODAY' variant='headerNote' title='Today' isOrderable={false} />
          <HeaderCell headerId='STATSTERAK' variant='headerNote' title='Streak' isOrderable={false} />
          <HeaderCell headerId='STATWEEK' variant='headerNote' title='Week' isOrderable={false} />
          <HeaderCell headerId='STATMONTH' variant='headerNote' title='Month' isOrderable={false} />
        </TableRow>
      </thead>
      <tbody>
        {(props.rows || Array(pageSize).fill(DUMMY_ROW)).map((row: GmAccountRow, index: number): React.ReactElement => (
          <TableRow key={row.address}>
            <TableCell variant={getVariant(row.address === props.userAddress && 'highlighted')} minWidth={'3em'}>
              <Text variant='note'>{(pageSize * page) + index + 1}</Text>
            </TableCell>
            <TableCell variant={getVariant(row.address === props.userAddress && 'highlighted')} width={'99%'}>
              <UserCellContent address={row.address} />
            </TableCell>
            <TableCell variant={getVariant(row.address === props.userAddress && 'highlighted')} minWidth={'3em'}>
              {areDatesSameDay(row.lastDate, new Date()) ? '✅' : '◾️'}
            </TableCell>
            <TableCell variant={getVariant(row.address === props.userAddress && 'highlighted')} minWidth={'3em'}>
              {row.streakLength}
            </TableCell>
            <TableCell variant={getVariant(row.address === props.userAddress && 'highlighted')} minWidth={'3em'}>
              {row.weekCount}
            </TableCell>
            <TableCell variant={getVariant(row.address === props.userAddress && 'highlighted')} minWidth={'3em'}>
              {row.monthCount}
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};
