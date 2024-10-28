export type BottomNavIconID =
  | 'search-icon'
  | 'feed-icon'
  | 'profile-icon'
  | 'talk-icon'
  | 'add-icon';

export const bottomNavSVG = (
  <>
    {/* feed */}
    <symbol
      id="feed-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_373_201)">
        <path
          d="M3.6665 5C3.6665 4.46957 3.87722 3.96086 4.25229 3.58579C4.62736 3.21071 5.13607 3 5.6665 3H19.6665C20.1969 3 20.7056 3.21071 21.0807 3.58579C21.4558 3.96086 21.6665 4.46957 21.6665 5V19C21.6665 19.5304 21.4558 20.0391 21.0807 20.4142C20.7056 20.7893 20.1969 21 19.6665 21H5.6665C5.13607 21 4.62736 20.7893 4.25229 20.4142C3.87722 20.0391 3.6665 19.5304 3.6665 19V5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.6665 17H7.6665"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.6665 14H7.6665"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.6665 11H7.6665"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </symbol>

    {/* add */}
    <symbol
      id="add-icon"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2326_2278)">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2" />
        <path
          d="M16 10L16 22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22 16H10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2326_2278">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </symbol>

    {/* profile */}
    <symbol
      id="profile-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_373_216)">
        <path
          d="M8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 21C5.19444 18.6667 5.58333 14 12 14C18.4167 14 18.8056 18.6667 19 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </symbol>

    {/* search */}
    <symbol
      viewBox="0 0 24 24"
      id="search-icon"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_373_195)">
        <path
          d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 21L15 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </symbol>

    {/* talk */}
    <symbol
      id="talk-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_373_209)">
        <path
          d="M8.3335 9H16.3335"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.3335 13H14.3335"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.3335 4C19.1291 4 19.8922 4.31607 20.4548 4.87868C21.0174 5.44129 21.3335 6.20435 21.3335 7V15C21.3335 15.7956 21.0174 16.5587 20.4548 17.1213C19.8922 17.6839 19.1291 18 18.3335 18H13.3335L8.3335 21V18H6.3335C5.53785 18 4.77478 17.6839 4.21218 17.1213C3.64957 16.5587 3.3335 15.7956 3.3335 15V7C3.3335 6.20435 3.64957 5.44129 4.21218 4.87868C4.77478 4.31607 5.53785 4 6.3335 4H18.3335Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </symbol>
  </>
);
