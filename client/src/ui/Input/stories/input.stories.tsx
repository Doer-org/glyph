import { Input } from '..'

import type { Meta, StoryObj } from '@storybook/react'
type Story = StoryObj<typeof Input>

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
}

export default meta

export const Default: Story = {
  render: (args) => <Input {...args} type={'text'} content={''} changeContent={() => {}} />,
}
