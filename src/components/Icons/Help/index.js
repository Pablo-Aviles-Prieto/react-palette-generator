export const Help = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='icon icon-tabler icon-tabler-help'
    width={props.width}
    height={props.height}
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='#916DE7'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M0 0h24v24H0z' stroke='none' />
    <circle cx={12} cy={12} r={9} />
    <path d='M12 17v.01M12 13.5a1.5 1.5 0 0 1 1-1.5 2.6 2.6 0 1 0-3-4' />
  </svg>
);
