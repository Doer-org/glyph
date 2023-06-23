import { Meta, StoryObj } from '@storybook/react'

import { CommentInput } from '.'

type Story = StoryObj<typeof CommentInput>

const meta: Meta<typeof CommentInput> = {
  title: 'glyph/commentInput',
  component: CommentInput,
}

export default meta

export const Default: Story = {
  render: (args) => <CommentInput {...args} />,
}
