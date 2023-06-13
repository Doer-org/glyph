import { FC, ReactNode } from 'react'

type TButton = {
  children: ReactNode
  className?: string
  onClick?: () => void
  disable?: boolean
  border?: boolean
}
export const Button: FC<TButton> = ({ children, className, onClick, disable }) => {
  return (
    <button
      onClick={onClick}
      className={`border-2 rounded-md hover:bg-yellow-300 py-1 px-5 hover:scale-110 transition ${className}`}
      disabled={disable}
    >
      {children}
    </button>
  )
}
