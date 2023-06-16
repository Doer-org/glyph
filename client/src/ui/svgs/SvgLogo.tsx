import { FC } from 'react'

type TProps = { width?: string; height?: string }

export const SvgLogo: FC<TProps> = ({ width, height }) => {
  return (
    <svg
      width={width ?? '70'}
      height={height ?? '60'}
      viewBox="0 0 204 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M102.675 13.9286L109.675 24.5548C110.213 25.3713 110.5 26.3276 110.5 27.3053V143.321C110.5 148.282 104.054 150.215 101.325 146.071L94.3246 135.445C93.7867 134.629 93.5 133.672 93.5 132.695L93.5 16.6791C93.5 11.7179 99.9462 9.78546 102.675 13.9286Z"
        fill="black"
        stroke="black"
        strokeWidth="8"
      />
      <path
        d="M197.482 30H89.4534C88.2464 30 87.157 30.7233 86.6886 31.8357L68.1603 75.8357C67.3276 77.8131 68.7796 80 70.9252 80H178.953C180.16 80 181.25 79.2767 181.718 78.1643L200.246 34.1643C201.079 32.1869 199.627 30 197.482 30Z"
        fill="white"
        stroke="black"
        strokeWidth="6"
      />
      <path
        d="M133.075 80H25.0467C23.8397 80 22.7503 80.7233 22.2818 81.8357L3.75356 125.836C2.92088 127.813 4.37284 130 6.51843 130H114.547C115.754 130 116.843 129.277 117.311 128.164L135.84 84.1643C136.672 82.1869 135.22 80 133.075 80Z"
        fill="#FE58F7"
        stroke="black"
        strokeWidth="6"
      />
      <ellipse cx="47.7772" cy="105.333" rx="5.09946" ry="5.33333" fill="black" />
      <ellipse cx="68.1771" cy="105.333" rx="5.09946" ry="5.33333" fill="black" />
      <ellipse cx="88.5741" cy="105.333" rx="5.09946" ry="5.33333" fill="black" />
      <ellipse cx="112.184" cy="55.3333" rx="5.09946" ry="5.33333" fill="black" />
      <ellipse cx="132.584" cy="55.3333" rx="5.09946" ry="5.33333" fill="black" />
      <ellipse cx="152.981" cy="55.3333" rx="5.09946" ry="5.33333" fill="black" />
    </svg>
  )
}
