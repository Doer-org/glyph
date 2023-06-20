import { StyledLinkTo } from '..'

import type { Meta, StoryObj } from '@storybook/react'
type Story = StoryObj<typeof StyledLinkTo>

const meta: Meta<typeof StyledLinkTo> = {
  title: 'UI/StyledLinkTo',
  component: StyledLinkTo,
}

export default meta

export const Default: Story = {
  render: (args) => <StyledLinkTo {...args}>StyledLinkTo</StyledLinkTo>,
}
