import React, { ElementRef, FC } from 'react'

type TTextarea = {
  label?: string
  content: string
  changeContent: (content: string) => void
  required?: boolean
  minLength?: number
  maxLength?: number
  className?: string
  ref?: React.MutableRefObject<HTMLTextAreaElement | null>
  tabIndex?: number
}
export const Textarea: FC<TTextarea> = ({
  label,
  content,
  changeContent,
  required,
  minLength,
  maxLength,
  className,
  ref,
  tabIndex,
}) => {
  return (
    <>
      <label htmlFor={label} className="py-1">
        {label}
        {required && <span className="w-6 h-6 ml-1 rounded-full text-accent">※</span>}
      </label>
      <textarea
        id={label}
        className={`py-1 px-2 rounded-sm max-h-32 bg-origin border-2 h-[10vh] ${className}`}
        minLength={minLength}
        maxLength={maxLength}
        onChange={(e) => changeContent(e.target.value)}
        value={content}
        required={required}
        ref={ref}
        tabIndex={tabIndex}
      />
    </>
  )
}
