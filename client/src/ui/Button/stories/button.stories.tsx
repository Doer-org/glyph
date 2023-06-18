import { Button } from '..'

import type { Meta, StoryObj } from '@storybook/react'
type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
}

export default meta

export const Default: Story = {
  render: (args) => <Button {...args}>Button</Button>,
}
