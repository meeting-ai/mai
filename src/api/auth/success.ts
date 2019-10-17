export const SUCCESS_PAGE = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>MeetingAI</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <style>
      @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
      html {
        font-size: calc(1vw + 1vh);
      }
      body {
        margin: 0;
        background: #444F77;
        text-align: center;
        color: #D9DBE3;
        font-family: 'Muli', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
      svg {
        height: calc(10vw + 10vh);
        width: calc(10vw + 10vh);
      }
      h1 {
        margin-top: 5vw;
        font-size: 3rem;
      }
      p {
        font-size: 1.3rem;
      }
      .emoji {
        animation-name: shake;
        animation-duration: 500ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        display: inline-block;
      }
      .logo {
        height: calc(10vw + 10vh);
        width: calc(10vw + 10vh);
        position: relative;
        margin: auto;
      }
      .ring {
        z-index: 2;
        animation-name: spin, fade;
        animation-duration: 2000ms;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(1, 0, 1, 1); 
      }
      .background {
        animation-name: fade;
        animation-duration: 1000ms;
        animation-iteration-count: 1;
        animation-timing-function: ease-in; 
      }
      .ring, .background {
        position: absolute;
        left: 0;
        top: 0;
        height: calc(10vw + 10vh);
        width: calc(10vw + 10vh);
      }
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes shake {
        0% {
          -webkit-transform: scale(1) rotate(10deg);
        }
        50% {
          -webkit-transform: scale(1.5) rotate(-10deg);
        }
        100% {
          -webkit-transform: scale(1) rotate(10deg);
        }
      }
    </style>
  </head>
  <body>
    <div class="content">
      <div class="logo">
        <div class="ring">
          <svg xmlns="http://www.w3.org/2000/svg" width="748" height="748" viewBox="0 0 748 748">
            <g fill="none" transform="rotate(-27 320.19 461.81)">
              <path stroke="#D9DBE3" stroke-linecap="round" stroke-width="42" d="M123.917357,200.110949 C81.216022,258.363976 56,330.237229 56,408 C56,602.404232 213.595768,760 408,760 C602.404232,760 760,602.404232 760,408 C760,213.595768 602.404232,56 408,56 C340.240125,56 276.952041,75.1460114 223.250468,108.323313" transform="rotate(100 408 408)"/>
              <circle cx="682" cy="184" r="42" fill="#D9DBE3"/>
            </g>
          </svg>
        </div>
        <div class="background">
          <svg xmlns="http://www.w3.org/2000/svg" width="853" height="853" viewBox="0 0 853 853">
            <defs>
              <linearGradient id="bg-a" x1="50%" x2="50%" y1="-13.454%" y2="100%">
                <stop offset="0%" stop-color="#FFF" stop-opacity="0"/>
                <stop offset="98.553%" stop-color="#D9DBE3"/>
              </linearGradient>
              <linearGradient id="bg-b" x1="0%" x2="102%" y1="0%" y2="101%">
                <stop offset="0%" stop-color="#3023AE"/>
                <stop offset="100%" stop-color="#C86DD7"/>
              </linearGradient>
            </defs>
            <g fill="none" transform="translate(-123 -123)">
              <rect width="853" height="853" x="123" y="123" fill="#444F77"/>
              <g transform="translate(324 363)">
                <polygon fill="#6E7E93" points="284.5 0 451 337 118 337"/>
                <polygon fill="url(#bg-a)" points="166.5 0 333 337 0 337"/>
                <polygon fill="url(#bg-b)" points="284.5 0 451 337 118 337" opacity=".653"/>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <h1>MeetingAI</h1>
      <p>You have been succesfully authorized <span class="emoji">🎉</span></p>
    </div>
  </body>
</html>
`;