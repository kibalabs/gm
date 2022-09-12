import React from 'react';

import { Alignment, Direction, Stack, Text, useBuiltTheme } from '@kibalabs/ui-react';

import { GmAccountRow } from '../client/resources';
import { AccountViewLink } from './AccountView';
import { HeaderCell, ITableCellTheme, ITableTheme, StyledTable, StyledTableBody, StyledTableBodyRow, StyledTableBodyRowItem, StyledTableHead, StyledTableHeadRow } from './Table';

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
    <Stack direction={Direction.Horizontal} isFullWidth={false} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true}>
      <AccountViewLink address={props.address} target={`/accounts/${props.address}`} />
    </Stack>
  );
};


export const DEFAULT_SORT = 'STATSTERAK_DESC';

const DUMMY_ROW: GmAccountRow = { address: '0x1', lastDate: new Date(), streakLength: 0, weekCount: 0, monthCount: 0 };


interface IAccountsTableProps {
  rows: GmAccountRow[];
  userAddress?: string | null;
}

export const AccountsTable = (props: IAccountsTableProps): React.ReactElement => {
  const tableTheme = useBuiltTheme<ITableTheme>('tables');
  const tableHeaderCellTheme = useBuiltTheme<ITableCellTheme>('tableCells', 'header');
  const tableCellTheme = useBuiltTheme<ITableCellTheme>('tableCells');
  const highlightedTableCellTheme = useBuiltTheme<ITableCellTheme>('tableCells', 'highlighted');
  // const [queryOrder, setOrder] = useUrlQueryState('order', undefined, DEFAULT_SORT);
  // const [queryPage, setPage] = useIntegerUrlQueryState('page', undefined);
  // const [pageCount, setPageCount] = React.useState<number>(0);

  // const order = queryOrder ?? DEFAULT_SORT;
  // const page = queryPage ?? 0;
  const page = 0;
  const pageSize = 50;
  // const [orderField, orderDirection] = order.split('_');

  // const onHeaderClicked = (headerId: string): void => {
  //   if (headerId !== orderField) {
  //     setOrder(`${headerId}_DESC`);
  //   } else if (orderDirection === 'DESC') {
  //     setOrder(`${headerId}_ASC`);
  //   } else {
  //     setOrder(DEFAULT_SORT);
  //   }
  // };

  return (
    <StyledTable $theme={tableTheme}>
      <StyledTableHead>
        <StyledTableHeadRow>
          <HeaderCell theme={tableHeaderCellTheme} headerId='INDEX' title='' isOrderable={false} orderDirection={null} />
          <HeaderCell theme={tableHeaderCellTheme} headerId='USER' title='Collectooors' textVariant='bold' contentAlignment={Alignment.Start} isOrderable={false} orderDirection={null} />
          <HeaderCell theme={tableHeaderCellTheme} headerId='STATTODAY' title='Today' textVariant='note' isOrderable={false} />
          <HeaderCell theme={tableHeaderCellTheme} headerId='STATSTERAK' title='Streak' textVariant='note' isOrderable={false} />
          {/* orderDirection={orderField === 'JOINDATE' ? (orderDirection === 'DESC' ? -1 : 1) : null} onClicked={onHeaderClicked} /> */}
          <HeaderCell theme={tableHeaderCellTheme} headerId='STATWEEK' title='Week' textVariant='note' isOrderable={false} />
          {/* orderDirection={orderField === 'TOKENCOUNT' ? (orderDirection === 'DESC' ? -1 : 1) : null} onClicked={onHeaderClicked} /> */}
          <HeaderCell theme={tableHeaderCellTheme} headerId='STATMONTH' title='Month' textVariant='note' isOrderable={false} />
          {/* orderDirection={orderField === 'FOLLOWERCOUNT' ? (orderDirection === 'DESC' ? -1 : 1) : null} onClicked={onHeaderClicked} /> */}
        </StyledTableHeadRow>
      </StyledTableHead>
      <StyledTableBody>
        {(props.rows || Array(pageSize).fill(DUMMY_ROW)).map((row: GmAccountRow, index: number): React.ReactElement => (
          <StyledTableBodyRow key={row.address}>
            <StyledTableBodyRowItem $theme={row.address === props.userAddress ? highlightedTableCellTheme : tableCellTheme} style={{ minWidth: '3em', paddingRight: '0' }}>
              <Text variant='note'>{(pageSize * page) + index + 1}</Text>
            </StyledTableBodyRowItem>
            <StyledTableBodyRowItem $theme={row.address === props.userAddress ? highlightedTableCellTheme : tableCellTheme} style={{ width: '99%', paddingLeft: '0' }}>
              <UserCellContent address={row.address} />
            </StyledTableBodyRowItem>
            <StyledTableBodyRowItem $theme={row.address === props.userAddress ? highlightedTableCellTheme : tableCellTheme} style={{ minWidth: '3em' }}>
              {areDatesSameDay(row.lastDate, new Date()) ? '✅' : '◾️'}
            </StyledTableBodyRowItem>
            <StyledTableBodyRowItem $theme={row.address === props.userAddress ? highlightedTableCellTheme : tableCellTheme} style={{ minWidth: '3em' }}>
              {row.streakLength}
            </StyledTableBodyRowItem>
            <StyledTableBodyRowItem $theme={row.address === props.userAddress ? highlightedTableCellTheme : tableCellTheme} style={{ minWidth: '3em' }}>
              {row.weekCount}
            </StyledTableBodyRowItem>
            <StyledTableBodyRowItem $theme={row.address === props.userAddress ? highlightedTableCellTheme : tableCellTheme} style={{ minWidth: '3em' }}>
              {row.monthCount}
            </StyledTableBodyRowItem>
          </StyledTableBodyRow>
        ))}
      </StyledTableBody>
    </StyledTable>
  );
};
