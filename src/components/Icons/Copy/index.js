export const Copy = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='icon icon-tabler icon-tabler-copy'
    width={props.width}
    height={props.height}
    viewBox='0 0 24 24'
    strokeWidth={2}
    stroke='#fff'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M0 0h24v24H0z' stroke='none' />
    <rect x={8} y={8} width={12} height={12} rx={2} />
    <path d='M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2' />
  </svg>
);
