export type CommonIconID =
  | 'arrow-up-icon'
  | 'prev-icon'
  | 'next-icon'
  | 'check-icon'
  | 'camera-icon'
  | 'person-icon'
  | 'square-check-icon'
  | 'square-uncheck-icon';

export const commonSVG = (
  <>
    {/* arrow-up */}
    <symbol
      id="arrow-up-icon"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2801_22274)">
        <path
          d="M5.33398 14.7432L12.0007 8.0765L18.6673 14.7432"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2801_22274">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.743164)"
          />
        </clipPath>
      </defs>
    </symbol>

    {/* prev */}
    <symbol
      id="prev-icon"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2801_22189)">
        <path
          d="M11.5 4.74316L6.5 9.74316L11.5 14.7432"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2801_22189">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(0 0.743164)"
          />
        </clipPath>
      </defs>
    </symbol>
    {/* next */}
    <symbol
      id="next-icon"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2801_22191)">
        <path
          d="M7 4.74316L12 9.74316L7 14.7432"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2801_22191">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(0 0.743164)"
          />
        </clipPath>
      </defs>
    </symbol>

    {/* check-icon */}
    <symbol
      id="check-icon"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="check">
        <path
          id="Vector 123"
          d="M4 9L7.55466 13.4433C7.77125 13.7141 8.19094 13.6875 8.37174 13.3917L13.5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </symbol>

    {/* square-check-icon */}
    <symbol
      id="square-check-icon"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/symbol"
    >
      <g id="ic_20" clipPath="url(#clip0_2801_24302)">
        <g id="Frame 427319707">
          <rect x="2" y="2" width="16" height="16" rx="4" fill="#4D4744" />
          <path
            id="Vector 139"
            d="M6 9.5L9 12.5L14 7.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2801_24302">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </symbol>

    {/* square-uncheck-icon */}
    <symbol
      id="square-uncheck-icon"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="ic_20" clipPath="url(#clip0_2801_24277)">
        <g id="Frame 427319707">
          <rect
            x="2.75"
            y="2.75"
            width="14.5"
            height="14.5"
            rx="3.25"
            stroke="#7E7774"
            strokeWidth="1.5"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2801_24277">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </symbol>

    {/* camera-icon */}
    <symbol
      id="camera-icon"
      viewBox="0 0 56 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.8661 0H27.9998H27.9998H37.1335C38.4776 0 39.6576 0.893959 40.0215 2.18783L40.5458 4.05217C40.9097 5.34604 42.0897 6.24 43.4338 6.24H52.1998C53.8566 6.24 55.1998 7.58315 55.1998 9.24V45C55.1998 46.6569 53.8566 48 52.1998 48H27.9998H27.9998H3.79981C2.14295 48 0.799805 46.6569 0.799805 45V9.24C0.799805 7.58315 2.14295 6.24 3.7998 6.24H12.5658C13.9099 6.24 15.0899 5.34604 15.4538 4.05217L15.9781 2.18783C16.342 0.893958 17.522 0 18.8661 0ZM34.9998 27.2C34.9998 31.066 31.8658 34.2 27.9998 34.2C24.1338 34.2 20.9998 31.066 20.9998 27.2C20.9998 23.334 24.1338 20.2 27.9998 20.2C31.8658 20.2 34.9998 23.334 34.9998 27.2ZM39.9998 27.2C39.9998 33.8274 34.6272 39.2 27.9998 39.2C21.3724 39.2 15.9998 33.8274 15.9998 27.2C15.9998 20.5726 21.3724 15.2 27.9998 15.2C34.6272 15.2 39.9998 20.5726 39.9998 27.2Z"
        fill="currentColor"
      />
    </symbol>

    {/* person */}
    <symbol
      id="person-icon"
      viewBox="0 0 20 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 12.0807C8.38889 12.0807 7.01389 11.5113 5.875 10.3724C4.73611 9.23351 4.16667 7.85851 4.16667 6.2474C4.16667 4.63628 4.73611 3.26128 5.875 2.1224C7.01389 0.983507 8.38889 0.414062 10 0.414062C11.6111 0.414062 12.9861 0.983507 14.125 2.1224C15.2639 3.26128 15.8333 4.63628 15.8333 6.2474C15.8333 7.85851 15.2639 9.23351 14.125 10.3724C12.9861 11.5113 11.6111 12.0807 10 12.0807ZM4.33333 53.7474C3.78105 53.7474 3.33333 53.2997 3.33333 52.7474V37.0807H0.999999C0.447715 37.0807 0 36.633 0 36.0807V22.0807C0 20.2474 0.652778 18.678 1.95833 17.3724C3.26389 16.0668 4.83333 15.4141 6.66667 15.4141H13.3333C15.1667 15.4141 16.7361 16.0668 18.0417 17.3724C19.3472 18.678 20 20.2474 20 22.0807V36.0807C20 36.633 19.5523 37.0807 19 37.0807H16.6667V52.7474C16.6667 53.2997 16.219 53.7474 15.6667 53.7474H4.33333Z"
        fill="currentColor"
      />
    </symbol>
  </>
);
