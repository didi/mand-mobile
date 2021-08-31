export default {
  spinner:
    '<svg class="spinner" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background:0 0"><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(30 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(60 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.75s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(90 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(120 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(150 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.5s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(180 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(210 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(240 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.25s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(270 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(300 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"/></rect><rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" fill="#eee" transform="rotate(330 50 50)"><animate attributeName="opacity" values="1;0" dur="1s" begin="0s" repeatCount="indefinite"/></rect></svg>',
  ring: `<svg class="ring" viewBox="0 0 100 100" class="center">
      <defs>
        <linearGradient x1="0" y1="0" x2="1" y2="0" id="ring-a">
          <stop offset="10%" stop-color="#eee" stop-opacity="0"/>
          <stop offset="100%" stop-color="#eee"/>
        </linearGradient>
        <linearGradient x1="0" y1="0" x2="1" y2="0" id="ring-b">
          <stop offset="0%" stop-color="#eee"/>
          <stop offset="100%" stop-color="#eee" stop-opacity=".1"/>
        </linearGradient>
      </defs>
      <g stroke-width="14" fill="none">
        <circle cx="50" cy="50" r="40" stroke="url(#ring-a)" stroke-dasharray="90 0">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;180 50 50;360 50 50" keyTimes="0;0.5;1"/>
        </circle>
        <circle cx="50" cy="50" r="40" stroke-linecap="round" stroke="url(#ring-b)" stroke-dasharray="98 189">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;180 50 50;360 50 50" keyTimes="0;0.5;1"/>
        </circle>
      </g>
    </svg>`,
  'warn-color':
    '<svg class="warn" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background:0 0"><g fill="none" fill-rule="evenodd"><path d="M50.001 100C22.385 100 0 77.615 0 50.001 0 22.385 22.385 0 50.001 0 77.615 0 100 22.385 100 50.001 100 77.615 77.615 100 50.001 100z" fill="#F3F4F5"/><path d="M45.44 22h10.118l-1.821 34.217h-6.78L45.44 22zm9.646 45.366C56.36 68.575 57 70.036 57 71.758c0 1.943-.645 3.47-1.936 4.577-1.293 1.11-2.8 1.665-4.52 1.665-1.75 0-3.278-.547-4.584-1.644C44.654 75.26 44 73.728 44 71.758c0-1.721.626-3.183 1.873-4.392 1.248-1.205 2.776-1.809 4.585-1.809 1.806 0 3.35.604 4.628 1.809z" fill="#666F83"/></g></svg>',
  'success-color':
    '<svg class="success" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background:0 0"><defs><linearGradient x1="85.237%" y1="96.954%" x2="22.272%" y2="5.057%" id="a"><stop stop-color="#F3F4F5" offset="0%"/><stop stop-color="#F9FAFB" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M50.001 100C22.385 100 0 77.615 0 50.001 0 22.385 22.385 0 50.001 0 77.615 0 100 22.385 100 50.001 100 77.615 77.615 100 50.001 100z" fill="url(#a)"/><path fill="#666F83" d="M41.662 61.51L28.137 47.849 22 54.045 41.754 74l6.135-6.197L78 37.197 71.865 31z"/></g></svg>',
  'fail-color':
    '<svg class="fail" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background:0 0"><defs><linearGradient x1="85.237%" y1="96.954%" x2="22.272%" y2="5.057%" id="a"><stop stop-color="#F3F4F5" offset="0%"/><stop stop-color="#F9FAFB" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M50.001 100C22.385 100 0 77.615 0 50.001 0 22.385 22.385 0 50.001 0 77.615 0 100 22.385 100 50.001 100 77.615 77.615 100 50.001 100z" fill="url(#a)"/><path d="M72.225 32.627l-16.97 16.97 16.97 16.972-5.656 5.656-16.972-16.97-16.97 16.97-5.656-5.656 16.97-16.972-16.97-16.97 5.656-5.656 16.97 16.97L66.57 26.97l5.656 5.656z" fill="#666F83"/></g></svg>',
}
