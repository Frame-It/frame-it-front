export type RecruitIconID =
  | 'location-icon'
  | 'time-icon'
  | 'bookmark-icon'
  | 'arrow-down-icon'
  | 'reload-icon';

export const recruitSVG = (
  <>
    {/* location */}
    <symbol
      id="location-icon"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_156_4926)">
        <path
          d="M6.69431 12.6783L7.98727 14.7248C8.36959 15.3299 9.24533 15.3491 9.65383 14.7613L10.3828 13.7124C12.7389 10.3223 15.132 5.3112 11.791 2.88585C11.044 2.34352 10.0648 2 8.79297 2C6.89189 2 5.70018 2.76751 4.98053 3.81925C3.15524 6.48687 4.96784 9.94569 6.69431 12.6783Z"
          stroke="#7E7774"
          strokeWidth="1.2"
        />
        <path
          d="M10.9 6.5C10.9 7.54934 10.0493 8.4 9 8.4C7.95066 8.4 7.1 7.54934 7.1 6.5C7.1 5.45066 7.95066 4.6 9 4.6C10.0493 4.6 10.9 5.45066 10.9 6.5Z"
          stroke="#7E7774"
          strokeWidth="1.2"
        />
      </g>
      <defs>
        <clipPath id="clip0_156_4926">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </symbol>

    {/* time */}
    <symbol
      id="time-icon"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_156_4930)">
        <path
          d="M14.9 9C14.9 12.2585 12.2585 14.9 9 14.9C5.74152 14.9 3.1 12.2585 3.1 9C3.1 5.74152 5.74152 3.1 9 3.1C12.2585 3.1 14.9 5.74152 14.9 9Z"
          stroke="#7E7774"
          strokeWidth="1.2"
        />
        <path
          d="M9 6V9.5H12"
          stroke="#7E7774"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_156_4930">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </symbol>

    {/* bookmark */}
    <symbol
      id="bookmark-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2195_8160)">
        <path
          d="M12 4H8.22222C6.99492 4 6 4.99492 6 6.22222V17.7556C6 18.6753 7.05346 19.1968 7.7848 18.6392L11.3263 15.9389C11.7242 15.6355 12.2758 15.6355 12.6737 15.9389L16.2152 18.6392C16.9465 19.1968 18 18.6753 18 17.7556V6.22222C18 4.99492 17.0051 4 15.7778 4H12Z"
          stroke="#7E7774"
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_2195_8160">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </symbol>

    {/* arrow-down */}
    <symbol
      id="arrow-down-icon"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2941_14655)">
        <path
          d="M4 7L9 12L14 7"
          stroke="#4D4744"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2941_14655">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </symbol>

    {/* reload */}
    <symbol
      id="reload-icon"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2941_14650)">
        <path
          d="M12.6739 13.094C11.6712 13.9944 10.3725 14.4949 9.02484 14.5002C7.67718 14.5056 6.37456 14.0154 5.36472 13.123C4.35488 12.2306 3.70826 10.9981 3.54784 9.66002C3.38741 8.32194 3.72437 6.97156 4.49463 5.86571C5.26489 4.75986 6.41472 3.97567 7.72545 3.66229C9.03617 3.34891 10.4164 3.52819 11.6035 4.16604C12.7907 4.8039 13.702 5.85582 14.1642 7.12176M14.5 4.123L14.5 7.17539L11.4476 7.17539"
          stroke="#4D4744"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2941_14650">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </symbol>
  </>
);
