export type DrawerIconID = 'close-icon' | 'edit-icon';

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
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 6L19 19"
          stroke="currentColor"
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

    {/* edit */}
    <symbol
      id="edit-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.63939 16.0391L15.8796 4.97231C16.3279 4.43532 16.8889 4.16489 17.1325 4.36829L19.7791 6.57803C20.0227 6.78143 19.8567 7.38163 19.4083 7.91862L10.1681 18.9854C9.86063 19.3537 9.48513 19.6115 9.19818 19.6515L5.9214 20.4848C5.78256 20.5201 5.65271 20.4023 5.67442 20.2607L6.14241 17.2081C6.15218 17.1444 6.15393 17.0798 6.15997 17.0156C6.1864 16.7347 6.3647 16.3681 6.63939 16.0391Z"
        stroke="#7E7774"
        strokeWidth="2"
      />
      <path
        d="M9.71595 19.0217L6.64551 16.458L5.9615 18.8375L8.0879 20.1914L9.71595 19.0217Z"
        fill="#7E7774"
      />
    </symbol>
  </>
);
