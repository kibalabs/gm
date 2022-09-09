import React from 'react';

import { Alignment, Box, Direction, Image, Stack, Text, useBuiltTheme } from '@kibalabs/ui-react';

import { Collection, GmCollectionRow } from '../client/resources';
import { HeaderCell, ITableCellTheme, ITableTheme, StyledTable, StyledTableBody, StyledTableBodyRow, StyledTableBodyRowItem, StyledTableHead, StyledTableHeadRow } from './Table';

// interface IUserCellContentProps {
//   address: string;
// }

// const UserCellContent = (props: IUserCellContentProps): React.ReactElement => {
//   return (
//     <Stack direction={Direction.Horizontal} isFullWidth={false} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true}>
//       <AccountViewLink address={props.address} target={`/accounts/${props.address}`} />
//     </Stack>
//   );
// };

interface ICollectionCellContentProps {
  collection: Collection;
}

const CollectionCellContent = (props: ICollectionCellContentProps): React.ReactElement => {
  return (
    <Stack key={props.collection.address} direction={Direction.Horizontal} isFullWidth={false} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true}>
      <Box variant='rounded' shouldClipContent={true} height={'1.5em'} width={'1.5em'}>
        <Image isLazyLoadable={true} source={props.collection.imageUrl || ''} alternativeText='.' />
      </Box>
      <Text>{props.collection.name}</Text>
    </Stack>
  );
};

interface ICollectionsTableProps {
}

export const DEFAULT_SORT = 'STATTODAY_DESC';

const DUMMY_ROW: GmCollectionRow = { collection: new Collection('0x1', 'collection1', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 };

// eslint-disable-next-line unused-imports/no-unused-vars
export const CollectionsTable = (props: ICollectionsTableProps): React.ReactElement => {
  const tableTheme = useBuiltTheme<ITableTheme>('tables');
  const tableHeaderCellTheme = useBuiltTheme<ITableCellTheme>('tableCells', 'header');
  const tableCellTheme = useBuiltTheme<ITableCellTheme>('tableCells');
  // const [queryOrder, setOrder] = useUrlQueryState('order', undefined, DEFAULT_SORT);
  // const [queryPage, setPage] = useIntegerUrlQueryState('page', undefined);
  // const [pageCount, setPageCount] = React.useState<number>(0);
  const rows: GmCollectionRow[] = [
    { collection: new Collection('0x1', 'collection1', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x2', 'collection2', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x3', 'collection3', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x4', 'collection4', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x5', 'collection5', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x6', 'collection6', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x7', 'collection7', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x8', 'collection8', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x9', 'collection9', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x10', 'collection10', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x11', 'collection11', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x12', 'collection12', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x13', 'collection13', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x14', 'collection14', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x15', 'collection15', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x16', 'collection16', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x17', 'collection17', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x18', 'collection18', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
    { collection: new Collection('0x19', 'collection19', null, null, null, null, null, null, null, null), todayCount: 2, weekCount: 123, monthCount: 789 },
  ];

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
          <HeaderCell theme={tableHeaderCellTheme} headerId='COLLECTION' title='Collections' textVariant='bold' contentAlignment={Alignment.Start} isOrderable={false} orderDirection={null} />
          <HeaderCell theme={tableHeaderCellTheme} headerId='STATTODAY' title='Today' textVariant='note' isOrderable={false} />
          {/* orderDirection={orderField === 'JOINDATE' ? (orderDirection === 'DESC' ? -1 : 1) : null} onClicked={onHeaderClicked} /> */}
          <HeaderCell theme={tableHeaderCellTheme} headerId='STATWEEK' title='Week' textVariant='note' isOrderable={false} />
          {/* orderDirection={orderField === 'TOKENCOUNT' ? (orderDirection === 'DESC' ? -1 : 1) : null} onClicked={onHeaderClicked} /> */}
          <HeaderCell theme={tableHeaderCellTheme} headerId='STATMONTH' title='Month' textVariant='note' isOrderable={false} />
          {/* orderDirection={orderField === 'FOLLOWERCOUNT' ? (orderDirection === 'DESC' ? -1 : 1) : null} onClicked={onHeaderClicked} /> */}
        </StyledTableHeadRow>
      </StyledTableHead>
      <StyledTableBody>
        {(rows || Array(pageSize).fill(DUMMY_ROW)).map((row: GmCollectionRow, index: number): React.ReactElement => (
          <StyledTableBodyRow key={row.collection.address}>
            <StyledTableBodyRowItem $theme={tableCellTheme} style={{ minWidth: '3em', paddingRight: '0' }}>
              <Text variant='note'>{(pageSize * page) + index + 1}</Text>
            </StyledTableBodyRowItem>
            <StyledTableBodyRowItem $theme={tableCellTheme} style={{ width: '100%', paddingLeft: '0' }}>
              <CollectionCellContent collection={row.collection} />
            </StyledTableBodyRowItem>
            <StyledTableBodyRowItem $theme={tableCellTheme} style={{ minWidth: '3em' }}>
              {row.todayCount}
            </StyledTableBodyRowItem>
            <StyledTableBodyRowItem $theme={tableCellTheme} style={{ minWidth: '3em' }}>
              {row.weekCount}
            </StyledTableBodyRowItem>
            <StyledTableBodyRowItem $theme={tableCellTheme} style={{ minWidth: '3em' }}>
              {row.monthCount}
            </StyledTableBodyRowItem>
          </StyledTableBodyRow>
        ))}
      </StyledTableBody>
    </StyledTable>
  );
};
