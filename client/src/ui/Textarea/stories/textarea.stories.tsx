import { Textarea } from '..'

import type { Meta, StoryObj } from '@storybook/react'
type Story = StoryObj<typeof Textarea>

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
}

export default meta

export const Default: Story = {
  render: (args) => <Textarea {...args}>Textarea</Textarea>,
}
