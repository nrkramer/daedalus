// @flow
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import StoryDecorator from '../../../_support/StoryDecorator';
import StoryProvider from '../../../_support/StoryProvider';

export function WalletSummaryHeaderDecorator(story: any, context: any) {
  const storyWithKnobs = withKnobs(story, context);
  return (
    <StoryDecorator>
      <StoryProvider>{storyWithKnobs}</StoryProvider>
    </StoryDecorator>
  );
}
