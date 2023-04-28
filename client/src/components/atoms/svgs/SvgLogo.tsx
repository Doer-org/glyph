export const SvgLogo = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 51 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.947366 42.0255C2.59386 46.0884 8.6417 52.8627 19.6611 47.4567C33.4354 40.6993 28.9627 31.395 50 44.5M13.9892 14.0573L13.5685 14.9595M13.5685 14.9595L8.24656 26.3723C8.15267 26.5737 8.14673 26.805 8.23017 27.0109L13.3081 39.5411C13.4657 39.9299 13.8968 40.131 14.296 40.0018L27.1587 35.8374C27.3701 35.769 27.5435 35.6157 27.6374 35.4144L33.38 23.0993L35.7873 17.9367C36.1063 17.2527 35.3875 16.548 34.7099 16.8804L27.9063 20.2182C27.689 20.3247 27.4352 20.3273 27.2159 20.225L23.6846 18.5783M13.5685 14.9595L16.3965 8.89465C16.7155 8.2106 17.7173 8.30823 17.8983 9.041L19.7147 16.3983C19.7727 16.6333 19.9339 16.8293 20.1533 16.9316L23.6846 18.5783M23.6846 18.5783L16.1119 34.8179M30.425 14.2485L32.4639 9.87605C32.5578 9.6747 32.7312 9.52146 32.9426 9.45304L36.2369 8.38647C36.9283 8.16265 36.9872 7.20743 36.3286 6.90032L24.503 1.38593C23.8444 1.07882 23.1505 1.73796 23.4234 2.41144L24.724 5.62066C24.8074 5.82655 24.8015 6.05787 24.7076 6.25922L22.6687 10.6316C22.482 11.0321 22.6552 11.5081 23.0557 11.6948L29.3619 14.6354C29.7623 14.8222 30.2383 14.6489 30.425 14.2485Z"
        stroke="white"
        strokeWidth="2"
        strokeDasharray={'1600px'}
      />
      <animate
        attributeName="stroke-dashoffset"
        from="20"
        to="0"
        dur="1s"
        begin="0s"
        repeatCount="indefinite"
      />
    </svg>
  );
};
