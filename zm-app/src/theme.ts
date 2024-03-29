import { RecursivePartial } from '@kibalabs/core';
import { buildTheme, IBoxTheme, ILinkBaseTheme, ITextTheme, ITheme, mergeTheme, mergeThemePartial, ThemeMap } from '@kibalabs/ui-react';
import { transparentize } from 'polished';

import { ITableTheme } from './components/Table';
import { ITableCellTheme } from './components/TableCell';
import { ITableRowTheme } from './components/TableRow';


export const buildAppTheme = (): ITheme => {
  const baseTheme = buildTheme();
  const brandPrimary = 'rgb(192, 142, 255)';
  const brandSecondary = '#754EA6';
  const background = '#000000';
  const text = '#ffefef';
  const buttonPrimaryTextShadow = transparentize(0.25, brandPrimary);

  // if (getIsRunningOnBrowser() && window.matchMedia && !window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //   brandPrimary = '#927700';
  //   brandSecondary = '#593802';
  //   background = '#ffffff';
  //   text = '#555555';
  //   buttonPrimaryTextShadow = transparentize(0.9, brandPrimary);
  // }

  const theme = buildTheme({
    colors: {
      brandPrimary,
      brandSecondary,
      tabSelectedBackground: transparentize(0.8, brandPrimary),
      background,
      text,
      buttonPrimaryTextShadow,
    },
    fonts: {
      main: {
        url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap',
      },
    },
    texts: {
      default: {
        'font-family': "'Montserrat', sans-serif",
        'font-weight': '400',
      },
      note: {
        color: '$colors.textClear50',
      },
      header1: {
        'font-weight': '900',
      },
      header3: {
        'font-size': '1.5rem',
        'font-weight': '800',
      },
      wrapped: {
        'overflow-wrap': 'anywhere',
      },
      footer: {
      },
      notification: {
        // 'font-size': baseTheme.texts.note['font-size'],
        'font-size': baseTheme.texts.default['font-size'],
      },
    },
    tabBarItems: {
      default: {
        normal: {
          default: {
            background: {
              'border-width': '0',
              'border-radius': baseTheme.dimensions.borderRadius,
            },
            text: {

            },
          },
        },
        selected: {
          default: {
            background: {
              'border-width': '0',
              'background-color': '$colors.tabSelectedBackground',
            },
            text: {

            },
          },
        },
      },
      narrow: {
        normal: {
          default: {
            background: {
              padding: `${baseTheme.dimensions.paddingNarrow2} ${baseTheme.dimensions.paddingWide}`,
            },
          },
        },
      },
    },
    prettyTexts: {
      header3: {
        normal: {
          default: {
            text: {
              margin: '2em 0 0.5em 0',
            },
          },
        },
      },
    },
    boxes: {
      card: {
        margin: '0',
      },
      unrounded: {
        'border-radius': '0',
      },
      notification: mergeThemePartial(baseTheme.boxes.card, {
        padding: `${baseTheme.dimensions.padding} ${baseTheme.dimensions.paddingWide}`,
        'border-width': '0',
        margin: '0',
      }),
      notificationGm: mergeThemePartial(baseTheme.boxes.card, {
        // padding: `${baseTheme.dimensions.paddingNarrow} ${baseTheme.dimensions.padding}`,
        padding: `${baseTheme.dimensions.padding} ${baseTheme.dimensions.paddingWide}`,
        'border-width': '0',
        margin: '0',
      }),
      wideBorder: {
        margin: '0',
        'box-shadow': '0px 0px 50px 20px rgba(255, 255, 255, 0.35) ',
      },
      tableBox: {
        'border-style': 'solid',
        'border-width': '1px',
        'border-color': 'rgba(255, 255, 255, 0.2)',
      },
      footer: {
        'background-color': '$colors.background',
      },
      topBar: {
        'border-radius': '0.5em',
        'border-color': '$colors.brandSecondary',
        'border-width': '0.1em',
        'background-color': transparentize(0.8, brandPrimary),
      },
    },
    pills: {
      default: {
        normal: {
          default: {
            background: {
              'background-color': 'transparent',
              'border-radius': '0.5em',
            },
          },
        },
      },
      info: {
        normal: {
          default: {
            background: {
              'border-color': '$colors.brandSecondary',
            },
            text: {
              color: '$colors.brandSecondary',
            },
          },
        },
      },
      small: {
        normal: {
          default: {
            text: {
              'font-size': '0.7em',
              'font-weight': '600',
            },
            background: {
              'border-width': '0.11em',
              padding: '0.1em 1em',
            },
          },
        },
      },
    },
    buttons: {
      primary: {
        normal: {
          default: {
            background: {
              'border-color': transparentize(0.9, brandPrimary),
              'border-width': '1px',
              'background-color': 'transparent',
              'box-shadow': `0px 0px 10px 2px ${transparentize(0.85, brandPrimary)}`,
            },
            text: {
              color: '$colors.brandPrimary',
              'text-shadow': `0px 0px 0.75em ${buttonPrimaryTextShadow}`,
            },
          },
          hover: {
            background: {
              'background-color': '$colors.brandPrimaryClear95',
            },
          },
          press: {
            background: {
              'background-color': '$colors.brandPrimaryClear90',
            },
          },
        },
      },
      large: {
        normal: {
          default: {
            background: {
              'border-radius': '1em',
            },
            text: {
              'font-size': '1.2em',
            },
          },
        },
      },
      navBarSelected: {
        normal: {
          default: {
            background: {
              'background-color': '$colors.tabSelectedBackground',
            },
          },
        },
      },
    },
    selectableViews: {
      default: {
        normal: {
          default: {
            background: {
            },
            overlay: (baseTheme.linkBases.default as ILinkBaseTheme).normal.default.background,
          },
          hover: {
            overlay: (baseTheme.linkBases.default as ILinkBaseTheme).normal.hover.background,
          },
          press: {
            overlay: (baseTheme.linkBases.default as ILinkBaseTheme).normal.press.background,
          },
          focus: {
            overlay: (baseTheme.linkBases.default as ILinkBaseTheme).normal.focus.background,
          },
        },
        selected: {
          default: {
            overlay: {
              'background-color': 'rgba(255, 255, 255, 0.1)',
              padding: baseTheme.dimensions.padding,
            },
          },
        },
      },
    },
    linkBases: {
      default: {
        normal: {
          default: {
            background: {
              'background-color': 'transparent',
            },
          },
          hover: {
            background: {
              'background-color': 'transparent',
            },
          },
          press: {
            background: {
              'background-color': 'transparent',
            },
          },
        },
      },
    },
    tables: {
      default: {
        background: mergeTheme<IBoxTheme>(baseTheme.boxes.default, baseTheme.boxes.transparent, {
          'border-width': '0',
        }),
      },
    },
    tableCells: {
      default: {
        normal: {
          default: {
            background: mergeTheme<IBoxTheme>(baseTheme.boxes.default, baseTheme.boxes.transparent, {
              'border-radius': '0',
              'border-width': '0px',
              padding: `${baseTheme.dimensions.padding} ${baseTheme.dimensions.paddingWide}`,
            }),
            text: mergeTheme<ITextTheme>(baseTheme.texts.default, {
            }),
          },
          hover: {
            background: {
              'background-color': 'rgba(255, 255, 255, 0.2)',
            },
          },
          press: {
            background: {
              'background-color': 'rgba(255, 255, 255, 0.3)',
            },
          },
          focus: {
            background: mergeThemePartial<IBoxTheme>(baseTheme.boxes.focussable, {
            }),
          },
        },
      },
      highlighted: {
        normal: {
          default: {
            background: {
              'background-color': transparentize(0.95, brandPrimary),
            },
          },
        },
      },
      header: {
        normal: {
          default: {
            background: mergeTheme<IBoxTheme>(baseTheme.boxes.default, baseTheme.boxes.transparent, {
              'border-width': '0px',
              padding: `${baseTheme.dimensions.padding} ${baseTheme.dimensions.paddingNarrow}`,
            }),
            text: mergeTheme<ITextTheme>(baseTheme.texts.default, {
            }),
          },
          hover: {
            background: {
              'background-color': 'rgba(255, 255, 255, 0.2)',
            },
          },
          press: {
            background: {
              'background-color': 'rgba(255, 255, 255, 0.3)',
            },
          },
          focus: {
            background: mergeThemePartial<IBoxTheme>(baseTheme.boxes.focussable, {
            }),
          },
        },
      },
    },
  });

  const tableThemes: ThemeMap<ITableTheme> = {
    ...theme.tables,
    default: mergeTheme<ITableTheme>({
      background: mergeTheme<IBoxTheme>(theme.boxes.default, theme.boxes.transparent, {
        'border-width': '1px',
        padding: '0',
      }),
    }, theme.tables?.default as (ITableTheme | undefined)),
  };
  theme.tables = tableThemes;
  const tableCellThemes: ThemeMap<ITableCellTheme> = {
    ...theme.tableCells,
    default: mergeTheme<ITableCellTheme>({
      normal: {
        default: {
          background: mergeTheme<IBoxTheme>(theme.boxes.default, theme.boxes.transparent, {
            'border-radius': '0',
            'border-width': '0px',
            'border-style': 'solid',
            'border-color': 'rgba(255, 255, 255, 0.2)',
            'background-color': 'rgba(255, 255, 255, 0)',
            padding: `${theme.dimensions.padding} ${theme.dimensions.paddingWide}`,
          }),
          text: mergeTheme<ITextTheme>(theme.texts.default, {
            'text-align': 'center',
          }),
        },
        hover: {
          background: {
            'background-color': 'rgba(255, 255, 255, 0.2)',
          },
        },
        press: {
          background: {
            'background-color': 'rgba(255, 255, 255, 0.3)',
          },
        },
        focus: {
          background: mergeThemePartial<IBoxTheme>(theme.boxes.focussable, {
          }),
        },
      },
      disabled: {
      },
    }, theme.tableCells?.default as (RecursivePartial<ITableCellTheme> | undefined)),
    header: mergeThemePartial<ITableCellTheme>({
      normal: {
        default: {
          background: mergeTheme<IBoxTheme>(theme.boxes.default, theme.boxes.transparent, {
            'border-radius': '0',
            'border-width': '0px',
            'border-style': 'solid',
            'border-color': 'rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.2)',
            'background-color': 'rgba(255, 255, 255, 0.1)',
            padding: `${theme.dimensions.padding} ${theme.dimensions.paddingWide}`,
          }),
          text: mergeTheme<ITextTheme>(theme.texts.default, theme.texts.bold, {
          }),
        },
        hover: {
          background: {
            'background-color': 'rgba(255, 255, 255, 0.2)',
          },
        },
        press: {
          background: {
            'background-color': 'rgba(255, 255, 255, 0.3)',
          },
        },
        focus: {
          background: mergeThemePartial<IBoxTheme>(theme.boxes.focussable, {
          }),
        },
      },
    }, theme.tableCells?.header as (RecursivePartial<ITableCellTheme> | undefined)),
    headerNote: mergeThemePartial<ITableCellTheme>({
      normal: {
        default: {
          text: {
            color: theme.texts.note.color,
            'font-weight': theme.texts.default['font-weight'],
          },
        },
      },
    }, theme.tableCells?.headerNote as (RecursivePartial<ITableCellTheme> | undefined)),
  };
  theme.tableCells = tableCellThemes;
  const tableRowThemes: ThemeMap<ITableRowTheme> = {
    default: mergeTheme<ITableRowTheme>({
      normal: {
        default: {
          background: mergeTheme<IBoxTheme>(theme.boxes.default, theme.boxes.transparent, {
            'border-radius': '0',
            'border-width': '0px',
            'border-style': 'solid',
            'border-color': 'rgba(255, 255, 255, 0.2)',
            'background-color': 'rgba(255, 255, 255, 0)',
            padding: `${theme.dimensions.padding} ${theme.dimensions.paddingWide}`,
          }),
          text: mergeTheme<ITextTheme>(theme.texts.default, {
          }),
        },
        hover: {
          background: {
            'background-color': 'rgba(255, 255, 255, 0.2)',
          },
        },
        press: {
          background: {
            'background-color': 'rgba(255, 255, 255, 0.3)',
          },
        },
        focus: {
          background: mergeThemePartial<IBoxTheme>(theme.boxes.focussable, {
          }),
        },
      },
      disabled: {
      },
    }, theme.tableRows?.default as (RecursivePartial<ITableRowTheme> | undefined)),
    header: mergeThemePartial<ITableRowTheme>({
      normal: {
        default: {
          background: mergeTheme<IBoxTheme>(theme.boxes.default, theme.boxes.transparent, {
            'border-radius': '0',
            'border-width': '1px 0px',
            'border-style': 'solid',
            'border-color': 'rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.2)',
            'background-color': 'rgba(255, 255, 255, 0.1)',
            padding: `${theme.dimensions.padding} ${theme.dimensions.paddingWide}`,
          }),
          text: mergeTheme<ITextTheme>(theme.texts.default, {
          }),
        },
        hover: {
          background: {
            'background-color': 'rgba(255, 255, 255, 0.2)',
          },
        },
        press: {
          background: {
            'background-color': 'rgba(255, 255, 255, 0.3)',
          },
        },
        focus: {
          background: mergeThemePartial<IBoxTheme>(theme.boxes.focussable, {
          }),
        },
      },
    }, theme.tableRows?.header as (RecursivePartial<ITableRowTheme> | undefined)),
  };
  theme.tableRows = tableRowThemes;
  return theme;
};
