import React from 'react';

import { Alignment, Box, Direction, getVariant, Image, LinkBase, PaddingSize, Stack, Text } from '@kibalabs/ui-react';

interface IFooterProps {
  isSmall?: boolean;
  tokenPageReferral: string
}

export const Footer = (props: IFooterProps): React.ReactElement => {
  const textVariant = getVariant(props.isSmall ? 'small-note' : 'default', 'footer');
  return (
    <LinkBase target={`https://www.tokenpage.xyz?ref=${props.tokenPageReferral}`}>
      <Box variant='footer-unpadded'>
        <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} paddingHorizontal={PaddingSize.Wide} paddingVertical={PaddingSize.Default}>
          <Text variant={textVariant}>Made by</Text>
          <Box shouldClipContent={true} width={props.isSmall ? '1rem' : '1.5rem'} height={props.isSmall ? '1rem' : '1.5rem'}>
            <Image source='https://www.tokenpage.xyz/assets/favicon.png' alternativeText='TokenPage Logo' fitType='contain' />
          </Box>
          <Text variant={textVariant}>Token Page</Text>
        </Stack>
      </Box>
    </LinkBase>
  );
};
