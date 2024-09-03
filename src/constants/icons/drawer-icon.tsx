export type DrawerIconID = 'close-icon';

export const drawerSVG = (
  <>
    {/* close */}
    <symbol
      id="close-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_225_8684)">
        <path
          d="M19 6L6 19"
          stroke="#4D4744"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 6L19 19"
          stroke="#4D4744"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_225_8684">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </symbol>
  </>
);
