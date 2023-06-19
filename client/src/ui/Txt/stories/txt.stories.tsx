import { Txt } from '..'

import type { Meta, StoryObj } from '@storybook/react'
type Story = StoryObj<typeof Txt>

const meta: Meta<typeof Txt> = {
  title: 'UI/Txt',
  component: Txt,
}

export default meta

export const Default: Story = {
  args: {
    elm: 'h2',
  },
  render: (args) => <Txt {...args}>Txt</Txt>,
}
