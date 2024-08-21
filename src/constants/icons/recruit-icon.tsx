export type RecruitIconID = 'location-icon' | 'time-icon';

export const recruitSVG = (
  <>
    {/* location */}
    <symbol
      id="location-icon"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_156_4926)">
        <path
          d="M6.69431 12.6783L7.98727 14.7248C8.36959 15.3299 9.24533 15.3491 9.65383 14.7613L10.3828 13.7124C12.7389 10.3223 15.132 5.3112 11.791 2.88585C11.044 2.34352 10.0648 2 8.79297 2C6.89189 2 5.70018 2.76751 4.98053 3.81925C3.15524 6.48687 4.96784 9.94569 6.69431 12.6783Z"
          stroke="#7E7774"
          stroke-width="1.2"
        />
        <path
          d="M10.9 6.5C10.9 7.54934 10.0493 8.4 9 8.4C7.95066 8.4 7.1 7.54934 7.1 6.5C7.1 5.45066 7.95066 4.6 9 4.6C10.0493 4.6 10.9 5.45066 10.9 6.5Z"
          stroke="#7E7774"
          stroke-width="1.2"
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
      <g clip-path="url(#clip0_156_4930)">
        <path
          d="M14.9 9C14.9 12.2585 12.2585 14.9 9 14.9C5.74152 14.9 3.1 12.2585 3.1 9C3.1 5.74152 5.74152 3.1 9 3.1C12.2585 3.1 14.9 5.74152 14.9 9Z"
          stroke="#7E7774"
          stroke-width="1.2"
        />
        <path
          d="M9 6V9.5H12"
          stroke="#7E7774"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_156_4930">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </symbol>
  </>
);
