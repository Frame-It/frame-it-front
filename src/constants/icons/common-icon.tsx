export type CommonIconID = 'arrow-up-icon' | 'prev-icon' | 'next-icon';

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
  </>
);
