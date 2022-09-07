import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { Alignment, Direction, IBoxTheme, ITextTheme, KibaIcon, Stack, Text, TextAlignment, themeToCss, ThemeType } from '@kibalabs/ui-react';
import styled from 'styled-components';


export interface ITableTheme extends ThemeType {
  background: IBoxTheme;
  // NOTE(krishan711): this could have header, body, row background fields too
}

export interface IStyledTableProps {
  $theme: ITableTheme;
}

export const StyledTable = styled.table<IStyledTableProps>`
  ${(props: IStyledTableProps): string => themeToCss(props.$theme.background)};
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export interface ITableCellThemeBase extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
}

export interface ITableCellThemeState extends ThemeType {
  default: ITableCellThemeBase;
  hover: RecursivePartial<ITableCellThemeBase>;
  press: RecursivePartial<ITableCellThemeBase>;
  focus: RecursivePartial<ITableCellThemeBase>;
}

export interface ITableCellTheme extends ThemeType {
  normal: ITableCellThemeState;
  disabled: RecursivePartial<ITableCellThemeState>;
}


export interface IStyledTableHeadProps {

}

export const StyledTableHead = styled.thead<IStyledTableHeadProps>`

`;

export interface IStyledTableHeadRowProps {

}

export const StyledTableHeadRow = styled.tr<IStyledTableHeadRowProps>`
`;

export interface IStyledTableHeadRowItemProps {
  $theme: ITableCellTheme;
}

export const StyledTableHeadRowItem = styled.td<IStyledTableHeadRowItemProps>`
  overflow: hidden;
  ${(props: IStyledTableHeadRowItemProps): string => themeToCss(props.$theme.normal.default.text)};
  ${(props: IStyledTableHeadRowItemProps): string => themeToCss(props.$theme.normal.default.background)};
  /* TODO(krishan711): add the disabled styles */

  &.clickable {
    cursor: pointer;
    &:hover {
      ${(props: IStyledTableHeadRowItemProps): string => themeToCss(props.$theme.normal.hover?.text)};
      ${(props: IStyledTableHeadRowItemProps): string => themeToCss(props.$theme.normal.hover?.background)};
    }
    &:active {
      ${(props: IStyledTableHeadRowItemProps): string => themeToCss(props.$theme.normal.press?.text)};
      ${(props: IStyledTableHeadRowItemProps): string => themeToCss(props.$theme.normal.press?.background)};
    }
    &:focus {
      ${(props: IStyledTableHeadRowItemProps): string => themeToCss(props.$theme.normal.focus?.text)};
      ${(props: IStyledTableHeadRowItemProps): string => themeToCss(props.$theme.normal.focus?.background)};
    }
  }
`;

export interface IStyledTableBodyProps {

}

export const StyledTableBody = styled.tbody<IStyledTableBodyProps>`

`;

export interface IStyledTableBodyRowProps {

}

export const StyledTableBodyRow = styled.tr<IStyledTableBodyRowProps>`
  overflow: hidden;
`;

export interface IStyledTableBodyRowItemProps {
  $theme: ITableCellTheme;
}

export const StyledTableBodyRowItem = styled.td<IStyledTableBodyRowItemProps>`
  overflow: hidden;
  ${(props: IStyledTableHeadRowItemProps): string => themeToCss(props.$theme.normal.default.text)};
  ${(props: IStyledTableHeadRowItemProps): string => themeToCss(props.$theme.normal.default.background)};
  /* TODO(krishan711): add the clickable styles */
`;

export interface IHeaderCellProps {
  headerId: string;
  title: string;
  textVariant?: string;
  isOrderable?: boolean;
  orderDirection?: -1 | 1 | null;
  theme: ITableCellTheme;
  contentAlignment?: Alignment;
  onClicked?: (headerId: string) => void;
}

export const HeaderCell = (props: IHeaderCellProps): React.ReactElement => {
  if (props.isOrderable && !props.onClicked) {
    throw Error('onClicked must be provided if isOrderable=true');
  }

  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked(props.headerId);
    }
  };

  return (
    <StyledTableHeadRowItem
      $theme={props.theme}
      className={getClassName(props.onClicked != null && 'clickable')}
      onClick={onClicked}
    >
      <Stack direction={Direction.Horizontal} isFullWidth={true} contentAlignment={props.contentAlignment ?? Alignment.Center} childAlignment={Alignment.Center} shouldAddGutters={true}>
        <Text variant={props.textVariant} tag='span' alignment={TextAlignment.Left}>{props.title}</Text>
        {props.orderDirection && (
          <KibaIcon variant='small' iconId={props.orderDirection === -1 ? 'ion-caret-down-outline' : 'ion-caret-up-outline'} />
        )}
      </Stack>
    </StyledTableHeadRowItem>
  );
};
