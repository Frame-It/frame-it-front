import React from 'react';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner = ({
  size = 32,
  color = '#7E7774',
}: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={`0 0 32 32`}
        fill="red"
      >
        <g clipPath="url(#clip0_4021_28879)">
          <path
            opacity="0.4"
            d="M5.5 16H9.5"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            opacity="0.8"
            d="M22.5 16H26.5"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 5.5L16 9.5"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            opacity="0.6"
            d="M16 22.5L16 26.5"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            opacity="0.9"
            d="M23.4248 8.57617L20.5964 11.4046"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            opacity="0.5"
            d="M11.4038 20.5957L8.57538 23.4241"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            opacity="0.3"
            d="M8.5752 8.57422L11.4036 11.4026"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            opacity="0.7"
            d="M20.5962 20.5957L23.4246 23.4241"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_4021_28879">
            <rect width={size} height={size} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
