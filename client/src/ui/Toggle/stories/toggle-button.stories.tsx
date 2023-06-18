import { ToggleButton } from '..'

import type { Meta, StoryObj } from '@storybook/react'
type Story = StoryObj<typeof ToggleButton>

const meta: Meta<typeof ToggleButton> = {
  title: 'UI/ToggleButton',
  component: ToggleButton,
}

export default meta

export const Default: Story = {
  render: (args) => <ToggleButton {...args}>ToggleButton</ToggleButton>,
}
