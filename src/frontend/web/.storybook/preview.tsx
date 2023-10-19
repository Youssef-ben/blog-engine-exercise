import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/main.scss';

import { PartialStoryFn, StoryContext } from '@storybook/csf';
import type { Args, Preview, ReactRenderer } from '@storybook/react';
import { DEFAULT_LANGUAGE } from '../src/controller/utils/constants';
import i18n from '../src/controller/utils/translations/AppTranslations';
import React from 'react';

export const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const globalTypes = {
  locale: {
    name: 'Languages',
    defaultValue: DEFAULT_LANGUAGE,
    description: 'Internationalization',
    toolbar: {
      icon: 'globe',
      title: 'Languages',
      items: [
        { value: 'en', title: 'English' },
        { value: 'fr', title: 'Français' },
      ],
    },
  },
};

const withProviders = (
  Story: PartialStoryFn<ReactRenderer, Args>,
  context: StoryContext<ReactRenderer, Args>
) => {
  const { locale } = context.globals;
  void i18n.changeLanguage(locale as string);

  return <Story />;
};

export const decorators = [withProviders];
