import { buildTheme, IBoxTheme, ITextTheme, ITheme, mergeTheme, mergeThemePartial } from '@kibalabs/ui-react';
import { transparentize } from 'polished';

export const buildAppTheme = (): ITheme => {
  const baseTheme = buildTheme();
  const brandPrimary = 'rgb(255, 240, 171)';
  const theme = buildTheme({
    colors: {
      brandPrimary,
      brandSecondary: 'rgb(242, 156, 19)',
      background: '#000000',
      text: '#ffffff',
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
        'font-size': baseTheme.texts.note['font-size'],
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
      notification: mergeThemePartial(baseTheme.boxes.card, {
        padding: `${baseTheme.dimensions.padding} ${baseTheme.dimensions.paddingWide}`,
        'border-width': '0',
        margin: '0',
      }),
      notificationGm: mergeThemePartial(baseTheme.boxes.card, {
        padding: `${baseTheme.dimensions.paddingNarrow} ${baseTheme.dimensions.padding}`,
        'border-width': '0',
        margin: '0',
      }),
      wideBorder: {
        margin: '0',
        'box-shadow': '0px 0px 50px 20px rgba(255, 255, 255, 0.35) ',
      },
      dottedBorder: {
        margin: '0',
        'border-style': 'dashed',
        'border-width': '0.20em',
        'border-color': '#FFFFFF',
      },
      tableBox: {
        'border-style': 'solid',
        'border-width': '1px',
        'border-color': 'rgba(255, 255, 255, 0.2)',
      },
      footer: {
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
              'box-shadow': `0px 0px 10px 2px ${transparentize(0.8, brandPrimary)}`,
            },
            text: {
              color: '$colors.brandPrimary',
              'text-shadow': `0px 0px 0.75em ${transparentize(0.5, brandPrimary)}`,
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
              'text-shadow': `0px 0px 0.75em ${transparentize(0.25, brandPrimary)}`,
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
            overlay: baseTheme.linkBases.default.normal.default.background,
          },
          hover: {
            overlay: baseTheme.linkBases.default.normal.hover.background,
          },
          press: {
            overlay: baseTheme.linkBases.default.normal.press.background,
          },
          focus: {
            overlay: baseTheme.linkBases.default.normal.focus.background,
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
  return theme;
};