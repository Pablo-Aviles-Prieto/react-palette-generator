export const Palette = (props) => (
  <svg viewBox='11 30 50 7' xmlns='http://www.w3.org/2000/svg' {...props}>
    <g fill={props.bg} stroke={props.color} strokeMiterlimit={10} strokeWidth={3}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M59 36c-.25-.75-.71-2.1-2-3-1.56-1.08-3.63-1.01-4-1-.76.03-1.18.16-2 0-.58-.12-1.53-.3-2-1-.4-.59-.15-1.08 0-3 .12-1.51.17-2.27 0-3-.37-1.58-1.49-2.56-2-3-1.05-.92-2.38-1.56-5-2-1.82-.31-4.75-.6-9 0-2.15.3-5.46.87-8 1.72-1.77.58-3.74 1.41-6 3-.02.01-.04.02-.05.03-3.44 2.24-5.39 6.2-5.22 10.31C14.64 57.13 54.56 59.91 59 41c.09-.6.79-2.65 0-5zm-20.79-5.88a2.76 2.76 0 0 1-2.76-2.76c0-1.53 1.23-2.76 2.76-2.76h2.71a2.76 2.76 0 1 1 0 5.52h-2.71z'
      />
      <circle cx={20} cy={33} r={3} />
      <circle
        cx={25}
        cy={42}
        r={3}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle cx={35} cy={45} r={3} />
      <circle cx={45} cy={44} r={3} />
    </g>
  </svg>
);
