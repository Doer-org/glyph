import { LinkTo } from '..'

import type { Meta, StoryObj } from '@storybook/react'
type Story = StoryObj<typeof LinkTo>

const meta: Meta<typeof LinkTo> = {
  title: 'UI/LinkTo',
  component: LinkTo,
}

export default meta

export const Default: Story = {
  render: (args) => <LinkTo {...args}>LinkTo</LinkTo>,
}
