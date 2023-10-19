import type { Meta, StoryFn } from '@storybook/react';
import { PostPageContent } from './PostPageContent';

export default {
  title: 'controller/page/admin/postsPage/postPageContent/PostPageContent',
  component: PostPageContent,
  tags: ['autodocs'],
} as Meta<typeof PostPageContent>;

const Template: StoryFn<typeof PostPageContent> = () => <PostPageContent />;

export const Default = Template.bind({});
