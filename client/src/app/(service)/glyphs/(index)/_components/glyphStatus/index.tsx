import { FC } from 'react'

type TProps = { text: string; className: string }

export const GlyphStatus: FC<TProps> = ({ text, className }) => {
  return (
    <p>
      <span className={`py-1 px-2 rounded-md ${className}`}>{text}</span>
    </p>
  )
}
