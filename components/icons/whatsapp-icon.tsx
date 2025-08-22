"use client";

import * as React from "react";

export function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g>
        {/* WhatsApp bubble outline */}
        <path
          d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.35 5L2 22l5.05-1.33A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Phone inside using just the stroke style like other Lucide icons */}
        <path
          d="M9.09 7.64c.19-.38.39-.45.65-.47.26-.02.57-.01.85.08.28.09.51.42.71.92s.57 1.36.61 1.46c.04.1.08.25.01.42-.07.17-.1.26-.21.4-.11.14-.23.31-.33.42-.1.11-.21.24-.1.47.11.23.48.99 1.05 1.6.72.77 1.32 1.01 1.52 1.11.2.1.32.08.43-.07.11-.15.53-.64.67-.85.14-.21.29-.17.48-.1.19.07 1.24.6 1.46.71s.35.16.4.26c.05.1.04.6-.14 1.17-.18.57-.86 1.13-1.2 1.21-.33.09-.84.11-1.35 0-.5-.11-1.92-.7-3.27-2.03-2.35-2.32-2.57-3.66-2.57-3.8 0-.14.05-.65.38-1.13.33-.48.63-.61.73-.67z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
