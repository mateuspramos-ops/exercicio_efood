type Props = {
  tamanho?: 'grande' | 'pequeno'
}

const Logo = ({ tamanho = 'grande' }: Props) => {
  const escala = tamanho === 'pequeno' ? 0.85 : 1
  return (
    <svg
      width={167 * escala}
      height={58 * escala}
      viewBox="0 0 167 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="4"
        width="159"
        height="50"
        fill="#FFEBD9"
        stroke="#E66767"
        strokeWidth="6"
      />
      <text
        x="22"
        y="41"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="34"
        fontStyle="italic"
        fontWeight="700"
        fill="#E66767"
      >
        efood
      </text>
      <g fill="#E66767">
        {/* Garfo */}
        <rect x="126" y="15" width="2.5" height="13" rx="1.25" />
        <rect x="130" y="15" width="2.5" height="13" rx="1.25" />
        <rect x="134" y="15" width="2.5" height="13" rx="1.25" />
        <rect x="129.5" y="15" width="3.5" height="29" rx="1.75" />
        {/* Faca */}
        <path d="M146 15 Q150 15 150 24 L150 30 L146 30 Z" />
        <rect x="146" y="30" width="3.5" height="14" rx="1.75" />
      </g>
    </svg>
  )
}

export default Logo
