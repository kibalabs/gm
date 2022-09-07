import React from 'react';

import { Alignment, Direction, Markdown, PaddingSize, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

const CONTENT = `
**"What's going on here'?", I hear you ask.**

Still working on it!
`;

export const AboutPage = (): React.ReactElement => {
  return (
    <Stack direction={Direction.Vertical} isFullWidth={true} childAlignment={Alignment.Fill}>
      <Text variant='header2' alignment={TextAlignment.Center}>Hello Frames 🖼</Text>
      <Spacing variant={PaddingSize.Wide2} />
      <Markdown source={CONTENT} />
    </Stack>
  );
};
