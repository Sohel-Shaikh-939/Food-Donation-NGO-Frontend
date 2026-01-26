const Logo = ({className}) => {
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="0 0 24 24"
            fill="green"
            stroke="green"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.2C17.1 3 20 7 20 7a1 1 0 0 0 1-1c0-1.5-2.5-3-5-3s-5 1.5-5 3a1 1 0 0 0 1 1h.2A7 7 0 0 1 11 20z" />
          </svg>
        </>
      );  
}

export default Logo;