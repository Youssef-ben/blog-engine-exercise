import type { Meta, StoryFn } from '@storybook/react';
import { PostPageHeader } from './PostPageHeader';

export default {
  title: 'controller/page/admin/postsPage/postPageHeader/PostPageHeader',
  component: PostPageHeader,
  tags: ['autodocs'],
} as Meta<typeof PostPageHeader>;

const Template: StoryFn<typeof PostPageHeader> = () => <PostPageHeader />;

export const Default = Template.bind({});
