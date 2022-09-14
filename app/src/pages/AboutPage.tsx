import React from 'react';

import { Alignment, Direction, Markdown, PaddingSize, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

const CONTENT = `
**Communities that GM together, stay together**

At [Token Page](https://www.tokenpage.xyz), we absolutely love when people say GM - it really makes our day! We realized over the last year that the communities that GM together stay together, and we found ourselves having more fun in these communities too.

So we got together with [@confuseddegen](https://twitter.com/confuseddegen) and built GM. It's super simple, just visit the page, connect your wallet and GM.

*But, why?*

Well, if you GM you're signalling to the world that you're still here and are in web3 for the vibes. Plus, there are awesome prizes to be won!

### The prizes

Every day, one GM-er from the collection with the most GMs will win an NFT from our GM NFT collection.

Holders of the GM tokens, will be exclusive access to [REDACTED]! (we're not quite ready to share yet, but keep your eyes peeled 👀)

Our GM tokens will be produced once a day and will be tradeable like all other NFTs. The artwork will be revealed in October and we are very excited to show it to you. It's going to be a generative PFP collection with some very unique features!

### How to win

This is the easy part! When ever you GM (once a day max) you add a point to the daily score of each community you hold a token for.

To get your community to the top you need to get everyone holding the token to come to the page and GM.

If your community is at the top of the list at the end of the day (in the UTC timezone), one of the GM-ers from that collection will win the GM NFT 🙌

So the trick is: just get everyone from your community to come to the page and GM every day. If you are in many communities your best bet is to share it with all of them so that personally you are very likely to be in one of the communities that wins, thus increasing your odds of winning!

If you have questions, feel free to reach out to us on twitter at [@tokenpagexyz](https://twitter.com/tokenpagexyz) 💬

**Good luck and GM frens!**
`;

export const AboutPage = (): React.ReactElement => {
  return (
    <Stack direction={Direction.Vertical} isFullWidth={true} childAlignment={Alignment.Fill}>
      <Text variant='header2' alignment={TextAlignment.Center}>GM frens 👋</Text>
      <Spacing variant={PaddingSize.Wide} />
      <Markdown source={CONTENT} />
    </Stack>
  );
};
