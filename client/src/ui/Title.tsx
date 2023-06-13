import { FC } from 'react'
type TProps = {
  stroke?: boolean
}

export const Title: FC<TProps> = ({ stroke }) => {
  return (
    <>
      <span className="text-yellow-300" style={{ WebkitTextStroke: `${stroke && 'black 2px'}` }}>
        G
      </span>
      lyph
    </>
  )
}
