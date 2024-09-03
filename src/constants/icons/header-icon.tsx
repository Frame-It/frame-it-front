export type HeaderIconID =
  | 'notification-icon'
  | 'back-icon'
  | 'share-icon'
  | 'more-icon';

export const headerSVG = (
  <>
    {/* notification */}
    <symbol
      id="notification-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_373_177)">
        <path
          d="M12 4C6.28152 4 5.29297 10.9194 5.25141 15.0956C5.24955 15.2822 5.19782 15.4633 5.09936 15.6217L3.94943 17.4722C3.53547 18.1383 4.01451 19 4.79879 19H12H19.2012C19.9855 19 20.4645 18.1383 20.0506 17.4722L18.9006 15.6217C18.8022 15.4633 18.7504 15.2822 18.7486 15.0956C18.707 10.9194 17.7185 4 12 4Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M14 4C14 2.34315 13.5 1.5 12 1.5C10.5 1.5 10 2.34315 10 4"
          stroke="currentColor"
          strokeWidth="2"
        />
      </g>
    </symbol>

    {/* back */}
    <symbol
      viewBox="0 0 24 24"
      fill="none"
      id="back-icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_211_6674)">
        <path
          d="M15.1665 18.333L8.49988 11.6663L15.1665 4.99967"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </symbol>

    {/* share */}
    <symbol
      viewBox="0 0 24 24"
      fill="none"
      id="share-icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_211_6673)">
        <path
          d="M5.25 12C5.25 12.5967 5.48705 13.169 5.90901 13.591C6.33097 14.0129 6.90326 14.25 7.5 14.25C8.09674 14.25 8.66903 14.0129 9.09099 13.591C9.51295 13.169 9.75 12.5967 9.75 12C9.75 11.4033 9.51295 10.831 9.09099 10.409C8.66903 9.98705 8.09674 9.75 7.5 9.75C6.90326 9.75 6.33097 9.98705 5.90901 10.409C5.48705 10.831 5.25 11.4033 5.25 12Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.25 7.5C14.25 8.09674 14.4871 8.66903 14.909 9.09099C15.331 9.51295 15.9033 9.75 16.5 9.75C17.0967 9.75 17.669 9.51295 18.091 9.09099C18.5129 8.66903 18.75 8.09674 18.75 7.5C18.75 6.90326 18.5129 6.33097 18.091 5.90901C17.669 5.48705 17.0967 5.25 16.5 5.25C15.9033 5.25 15.331 5.48705 14.909 5.90901C14.4871 6.33097 14.25 6.90326 14.25 7.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.25 16.5C14.25 17.0967 14.4871 17.669 14.909 18.091C15.331 18.5129 15.9033 18.75 16.5 18.75C17.0967 18.75 17.669 18.5129 18.091 18.091C18.5129 17.669 18.75 17.0967 18.75 16.5C18.75 15.9033 18.5129 15.331 18.091 14.909C17.669 14.4871 17.0967 14.25 16.5 14.25C15.9033 14.25 15.331 14.4871 14.909 14.909C14.4871 15.331 14.25 15.9033 14.25 16.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5249 11.0246L14.4749 8.47461"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5249 12.9746L14.4749 15.5246"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </symbol>

    {/* more */}
    <symbol
      id="more-icon"
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2802_2779)">
        <circle cx="16" cy="9" r="2" fill="currentColor" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
        <circle cx="16" cy="23" r="2" fill="currentColor" />
      </g>
    </symbol>
  </>
);
