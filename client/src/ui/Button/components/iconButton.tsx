import React, { FC, ReactNode } from 'react'

type TIconButton = {
  children: ReactNode
  className?: string
  onClick?: () => void
  disable?: boolean
  border?: boolean
}

export const IconButton: FC<TIconButton> = ({ children, className, onClick, disable, border }) => {
  return (
    <button
      onClick={onClick}
      className={`border-2 rounded-md hover:bg-yellow-300 text-white bg-[#898989] hover:scale-110 transition ${className}`}
      disabled={disable}
    >
      {children}
    </button>
  )
}
