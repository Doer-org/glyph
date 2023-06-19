import { FC } from 'react'

import { ToggleButton } from '@/ui/Toggle'

type TProps = {
  status: boolean
  statusText: string
  toggleFunc: () => void
}

export const GlyphStatusToggleButton: FC<TProps> = ({ status, statusText, toggleFunc }) => {
  return (
    <div>
      <p>{statusText}</p>
      <ToggleButton bool={status} toggle={toggleFunc} />
    </div>
  )
}
