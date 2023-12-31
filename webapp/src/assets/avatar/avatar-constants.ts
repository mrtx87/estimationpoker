/** color **/
//`#ab6d43`
export const HAIR_COLOR_PLACEHOLDER = `black`;
export const SKIN_COLOR_PLACEHOLDER = `#C58E69`;
export const SHIRT_COLOR_PLACEHOLDER = '#2592BF';

/** Heads **/

const blackman = `<svg xmlns="http://www.w3.org/2000/svg" width="208.254" height="216.356" viewBox="0 0 208.254 216.356">
  <g id="slim_guy" data-name="slim guy" transform="translate(21.254 -18.644)">
    <g id="body" transform="translate(-105 -121)">
      <path id="Path_31" data-name="Path 31" d="M110-.021V69H5.746c11.581-38.512,40.488-59.79,77-66.6A149.325,149.325,0,0,1,110-.021Z" transform="translate(78 287)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
      <path id="Path_48" data-name="Path 48" d="M5.746-.021V69H110C98.419,30.488,69.512,9.21,33,2.4A149.325,149.325,0,0,0,5.746-.021Z" transform="translate(182 287)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    </g>
    <path id="Path_1" data-name="Path 1" d="M0,0H39.34V18.358S29.294,23.59,19.459,23.59,0,18.358,0,18.358Z" transform="translate(63.05 149.72)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_2" data-name="Path 2" d="M47.612-2.294l.753,141.934a5.682,5.682,0,0,1-2.1-.29c-4.906-1.864-27.387-11.22-31.287-16.637-4.391-6.1-5.412-12.115-7.912-28.334C5.628,85.053-1.048,76.193-1.505,63.8c-.321-8.673-.537-22.911,5.714-36.879C15.464-3.038,47.612-2.294,47.612-2.294Z" transform="translate(35 21)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_3" data-name="Path 3" d="M-1.569-2.354-1.634,139.64a5.682,5.682,0,0,0,2.1-.29c4.906-1.864,27.387-11.22,31.287-16.637,4.391-6.1,5.412-12.115,7.912-28.334C41.1,85.053,47.778,76.193,48.236,63.8c.321-8.673.537-22.911-5.714-36.879C31.267-3.038-1.569-2.354-1.569-2.354Z" transform="translate(84.06 21)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_302" data-name="Path 302" d="M-1.569-2.354-1.634,139.64a5.682,5.682,0,0,0,2.1-.29c4.906-1.864,27.387-11.22,31.287-16.637,4.391-6.1,5.412-12.115,7.912-28.334C41.1,85.053,47.778,76.193,48.236,63.8c.321-8.673.537-22.911-5.714-36.879C31.267-3.038-1.569-2.354-1.569-2.354Z" transform="translate(84.06 21)" opacity="0.1"/>
  </g>
</svg>`;

const alien = `<svg xmlns="http://www.w3.org/2000/svg" width="208.254" height="216.302" viewBox="0 0 208.254 216.302">
  <g id="alien" transform="translate(33.632 -17.551)">
    <g id="body" transform="translate(-117.379 -122.147)">
      <path id="Path_31" data-name="Path 31" d="M110-.021V69H5.746c11.581-38.512,40.488-59.79,77-66.6A149.325,149.325,0,0,1,110-.021Z" transform="translate(78 287)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
      <path id="Path_48" data-name="Path 48" d="M5.746-.021V69H110C98.419,30.488,69.512,9.21,33,2.4A149.325,149.325,0,0,0,5.746-.021Z" transform="translate(182 287)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    </g>
    <path id="Path_27" data-name="Path 27" d="M0,0H39.34V28.316s-10.046,8.069-19.881,8.069S0,28.316,0,28.316Z" transform="translate(51.204 143.541)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_23" data-name="Path 23" d="M51.723,1.7l.028,142.986c-11.867-.2-25-19.441-35.6-37.121C8.9,92.284,1.317,73.246,2.666,58.4c0-18.582,5.466-29.873,11.728-39.455S36.779,1.7,51.723,1.7Z" transform="translate(18.564 15.873)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_91" data-name="Path 91" d="M1.593,1.678V144.709c11.867-.2,24.842-19.468,35.443-37.148,7.251-15.277,14.557-30.533,14.557-48.472,0-18.582-4.3-30.67-12.058-40.5C31.307,8.461,16.538,1.678,1.593,1.678Z" transform="translate(68.564 15.873)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_306" data-name="Path 306" d="M1.593,1.678V144.709c11.867-.2,24.842-19.468,35.443-37.148,7.251-15.277,14.557-30.533,14.557-48.472,0-18.582-4.3-30.67-12.058-40.5C31.307,8.461,16.538,1.678,1.593,1.678Z" transform="translate(68.564 15.873)" opacity="0.1"/>
    <path id="Path_28" data-name="Path 28" d="M29.535.085C43.077.8,60.341,15.462,60.673,18.809s-13.3,13.84-28.533,10.6S.051,13.533.01,9.628,15.992-.631,29.535.085Z" transform="translate(31.75 80.846) rotate(40)" fill="#313030"/>
    <path id="Path_92" data-name="Path 92" d="M29.525,29.938c13.543-.716,30.807-15.377,31.139-18.725S47.359-2.626,32.13.613.041,16.49,0,20.395,15.982,30.654,29.525,29.938Z" transform="translate(128.214 103.852) rotate(140)" fill="#313030"/>
  </g>
</svg>`;

const blackwoman = `<svg xmlns="http://www.w3.org/2000/svg" width="208.254" height="216.396" viewBox="0 0 208.254 216.396">
  <g id="base_woman" data-name="base woman" transform="translate(-10.746 -17.457)">
    <g id="body" transform="translate(-73 -122.147)">
      <path id="Path_31" data-name="Path 31" d="M110-.021V69H5.746c11.581-38.512,40.488-59.79,77-66.6A149.325,149.325,0,0,1,110-.021Z" transform="translate(78 287)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
      <path id="Path_48" data-name="Path 48" d="M5.746-.021V69H110C98.419,30.488,69.512,9.21,33,2.4A149.325,149.325,0,0,0,5.746-.021Z" transform="translate(182 287)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    </g>
    <path id="Path_17" data-name="Path 17" d="M0,0H39.34V31.749S29.294,40.8,19.459,40.8,0,31.749,0,31.749Z" transform="translate(95.46 141.054)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_18" data-name="Path 18" d="M48.365-1.53V139.484a2.3,2.3,0,0,1-1.72,0c-4.906-1.862-6.2-2.652-14.988-13.132S16.4,108.2,11.5,97.563C5.084,83.623-1.048,76.107-1.505,63.724c-.321-8.664-.537-22.885,5.714-36.838C15.464-3.037,48.365-1.53,48.365-1.53Z" transform="translate(67 19)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_64" data-name="Path 64" d="M-1.635-1.53V139.484a2.3,2.3,0,0,0,1.72,0c4.906-1.862,6.2-2.652,14.988-13.132S30.334,108.2,35.23,97.563c6.417-13.94,12.548-21.456,13.006-33.839.321-8.664.537-22.885-5.714-36.838C31.267-3.037-1.635-1.53-1.635-1.53Z" transform="translate(116.065 19)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_303" data-name="Path 303" d="M-1.635-1.53V139.484a2.3,2.3,0,0,0,1.72,0c4.906-1.862,6.2-2.652,14.988-13.132S30.334,108.2,35.23,97.563c6.417-13.94,12.548-21.456,13.006-33.839.321-8.664.537-22.885-5.714-36.838C31.267-3.037-1.635-1.53-1.635-1.53Z" transform="translate(116.065 19)" opacity="0.1"/>
  </g>
</svg>`;

const thickblackman = `<svg xmlns="http://www.w3.org/2000/svg" width="208.254" height="216.575" viewBox="0 0 208.254 216.575">
  <g id="thick_guy" data-name="thick guy" transform="translate(31.453 -18.568)">
    <g id="body" transform="translate(-115.199 -120.857)">
      <path id="Path_31" data-name="Path 31" d="M110-.021V69H5.746c11.581-38.512,40.488-59.79,77-66.6A149.325,149.325,0,0,1,110-.021Z" transform="translate(78 287)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
      <path id="Path_48" data-name="Path 48" d="M5.746-.021V69H110C98.419,30.488,69.512,9.21,33,2.4A149.325,149.325,0,0,0,5.746-.021Z" transform="translate(182 287)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    </g>
    <path id="Path_1" data-name="Path 1" d="M0,0H39.338V18.358S29.293,23.59,19.458,23.59,0,18.358,0,18.358Z" transform="translate(52.85 149.867)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_2" data-name="Path 2" d="M47.738-2.377l.627,142.013a5.683,5.683,0,0,1-2.1-.29c-4.906-1.864-26.205-6.077-33.151-12.919S3.031,114.022.533,97.82C-.9,88.494.024,74.539-.433,62.143-.755,53.47-1.341,40.349,4.91,26.382,15.1-2.431,47.738-2.377,47.738-2.377Z" transform="translate(24 21)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_30" data-name="Path 30" d="M-1.574-2.431l-.061,142.067a5.833,5.833,0,0,0,2.129-.29c4.972-1.864,26.56-6.077,33.6-12.919s11.2-12.415,13.731-28.617c1.457-9.326.623-21.619,1.086-34.015a107.833,107.833,0,0,0-5.454-36.489C33.989-2.917-1.574-2.431-1.574-2.431Z" transform="translate(73.323 21)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_301" data-name="Path 301" d="M-1.574-2.431l-.061,142.067a5.833,5.833,0,0,0,2.129-.29c4.972-1.864,26.56-6.077,33.6-12.919s11.2-12.415,13.731-28.617c1.457-9.326.623-21.619,1.086-34.015a107.833,107.833,0,0,0-5.454-36.489C33.989-2.917-1.574-2.431-1.574-2.431Z" transform="translate(73.323 21)" opacity="0.1"/>
  </g>
</svg>`

const thickerman = `<svg xmlns="http://www.w3.org/2000/svg" width="208.254" height="216.553" viewBox="0 0 208.254 216.553">
  <g id="fat_guy" data-name="fat guy" transform="translate(31.453 -18.591)">
    <g id="body" transform="translate(-115.199 -120.857)">
      <path id="Path_31" data-name="Path 31" d="M110-.021V69H5.746c11.581-38.512,40.488-59.79,77-66.6A149.325,149.325,0,0,1,110-.021Z" transform="translate(78 287)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
      <path id="Path_48" data-name="Path 48" d="M5.746-.021V69H110C98.419,30.488,69.512,9.21,33,2.4A149.325,149.325,0,0,0,5.746-.021Z" transform="translate(182 287)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    </g>
    <path id="Path_1" data-name="Path 1" d="M0,0H39.338V18.358S29.293,23.59,19.458,23.59,0,18.358,0,18.358Z" transform="translate(52.85 149.867)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_2" data-name="Path 2" d="M47.738-2.377l.627,142.013a5.683,5.683,0,0,1-2.1-.29c-4.906-1.864-30.586-2.585-38.1-9.268S-4.1,120.662-6.6,104.46C-8.035,95.135.024,74.539-.433,62.143-.755,53.47-1.341,40.349,4.91,26.382,15.1-2.431,47.738-2.377,47.738-2.377Z" transform="translate(24 21)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_304" data-name="Path 304" d="M-7.821-3.409-6.77,139.636a5.683,5.683,0,0,0,2.1-.29c4.906-1.864,29.193-3.142,38.1-9.268S45.7,120.662,48.193,104.46c1.437-9.326-5.521-24.117-5.063-36.513.321-8.673,1.21-27.287-5.041-41.255C27.9-2.12,4.4-2.91-7.821-3.409Z" transform="translate(79 22)" fill="${SKIN_COLOR_PLACEHOLDER}"/>
    <path id="Path_305" data-name="Path 305" d="M-7.821-3.409-6.77,139.636a5.683,5.683,0,0,0,2.1-.29c4.906-1.864,29.193-3.142,38.1-9.268S45.7,120.662,48.193,104.46c1.437-9.326-5.521-24.117-5.063-36.513.321-8.673,1.21-27.287-5.041-41.255C27.9-2.12,4.4-2.91-7.821-3.409Z" transform="translate(79 22)" opacity="0.1"/>
  </g>
</svg>`

/** Hairstyles **/

const durag = `<svg id="durag" xmlns="http://www.w3.org/2000/svg" width="240" height="120.949" viewBox="0 0 240 120.949">
  <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Pfad_63" data-name="Pfad 63" d="M56.684,2.14c4.622,0,22.582.606,36.495,15.937s13.56,43.75,13.56,43.75S81.6,46.6,56.684,46.6,7.295,62,7.295,62,7.44,33.376,20.667,18.076,52.063,2.14,56.684,2.14Z" transform="translate(63 13)"/>
  <path id="Pfad_67" data-name="Pfad 67" d="M1.447.317S25.794-14.7,50.1-14.723,98.655.222,98.655.222s.531,3.408.792,6.8.325,6.845.325,6.845S73.713-1.558,49.313-1.344.281,14,.281,14,.4,10.03.688,6.609,1.447.317,1.447.317Z" transform="translate(70 61)" opacity="0.5"/>
  <line id="Linie_1" data-name="Linie 1" y2="29" transform="translate(120 16.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="2" opacity="0.25"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Pfad_65" data-name="Pfad 65" d="M5.028,0H9s3.982,4.275,3.982,17.275c0,6.2-6.958,12.768-7.953,21.449S9,52,9,52L5.028,50.911S-3.67,47.4-2.413,38.724s7.441-15.1,7.441-21.449Z" transform="translate(65.059 68.949)"/>
  <path id="Pfad_69" data-name="Pfad 69" d="M5.028,0H9s3.982,4.275,3.982,17.275c0,6.2-6.958,12.768-7.953,21.449S9,52,9,52L5.028,50.911S-3.67,47.4-2.413,38.724s7.441-15.1,7.441-21.449Z" transform="translate(65.059 68.949)" opacity="0.5"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Pfad_66" data-name="Pfad 66" d="M12.982,17.275c0,6.2-6.958,12.768-7.953,21.449S9,52,9,52L5.028,50.911S-3.67,47.4-2.413,38.724,9.225,22.053,9.225,15.709Z" transform="translate(55.314 56.973) rotate(-12)"/>
  <path id="Pfad_68" data-name="Pfad 68" d="M12.982,17.275c0,6.2-6.958,12.768-7.953,21.449S9,52,9,52L5.028,50.911S-3.67,47.4-2.413,38.724,9.225,22.053,9.225,15.709Z" transform="translate(55.314 56.973) rotate(-12)" opacity="0.5"/>
  <rect fill="${HAIR_COLOR_PLACEHOLDER}" id="Rechteck_2" data-name="Rechteck 2" width="6" height="12" rx="3" transform="matrix(1, 0.017, -0.017, 1, 67.386, 62.897)"/>
  <rect id="Rechteck_5" data-name="Rechteck 5" width="6" height="12" rx="3" transform="matrix(1, 0.017, -0.017, 1, 67.386, 62.897)" opacity="0.5"/>
  <rect fill="${HAIR_COLOR_PLACEHOLDER}" id="Rechteck_3" data-name="Rechteck 3" width="6" height="12" rx="3" transform="matrix(1, 0.017, -0.017, 1, 69.21, 64.897)"/>
  <rect id="Rechteck_4" data-name="Rechteck 4" width="6" height="12" rx="3" transform="matrix(1, 0.017, -0.017, 1, 69.21, 64.897)" opacity="0.5"/>
  <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" fill="rgba(255,255,255,0)"/>
</svg>`

const kaneda = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="93.269" viewBox="0 0 240 93.269">
  <g id="kaneda_hair" data-name="kaneda hair" transform="translate(39 -17.857)">
    <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" transform="translate(-39 22.133)" fill="rgba(255,255,255,0)"/>
    <path id="Pfad_57" data-name="Pfad 57" d="M65-.978V48.155c-9.282,0-31.735,2.958-40.116,9.7-5.822,4.681-10.042,15.317-10.042,15.317l-.176,13.957c-1.231-.355-2.263-8.77-2.263-8.77S7.62,68.1,8.442,43.842,29.1-.978,65-.978Z" transform="translate(18 24)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_58" data-name="Pfad 58" d="M-.468-.978V48.155c9.282,0,24.139-4.741,40.733,9.482,7.221,5.806,4.4,20.435,3.891,23.831a15.438,15.438,0,0,1-1.84,5.5c1.231-.355,9.949-20.87,11.176-40.3S35.43-.978-.468-.978Z" transform="translate(83 24)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_59" data-name="Pfad 59" d="M1.8,0a40.493,40.493,0,0,0,.648,4.447A23.618,23.618,0,0,0,3.568,8.1H.023a10.831,10.831,0,0,1,.068-3.93A16.885,16.885,0,0,1,1.8,0Z" transform="translate(72.824 20.467) rotate(-47)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_65" data-name="Pfad 65" d="M3.253,0s.36,7.456,1.14,13.687S6.372,24.924,6.372,24.924H.135A57.974,57.974,0,0,1,.256,12.83,76.917,76.917,0,0,1,3.253,0Z" transform="translate(61.546 91.269) rotate(-150)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_66" data-name="Pfad 66" d="M3.253,0s.36,7.456,1.14,13.687S6.372,24.924,6.372,24.924H.135A57.974,57.974,0,0,1,.256,12.83,76.917,76.917,0,0,1,3.253,0Z" transform="translate(49.657 92.565) rotate(-141)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_67" data-name="Pfad 67" d="M3.253,0s.36,7.456,1.14,13.687S6.372,24.924,6.372,24.924H.135A57.974,57.974,0,0,1,.256,12.83,76.917,76.917,0,0,1,3.253,0Z" transform="translate(42.979 95.384) rotate(-152)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_64" data-name="Pfad 64" d="M.12.329s3.724,5.461,4.4,10.483,1.018,9.273,1.018,9.273L.536,21.948S-.783,15.487-.1,10.466A52,52,0,0,0,.12.329Z" transform="translate(69.28 90.492) rotate(-156)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_62" data-name="Pfad 62" d="M3.979,0A87.671,87.671,0,0,0,5.364,9.568a51.06,51.06,0,0,0,2.4,7.855H.191A23.457,23.457,0,0,1,.337,8.969,36.459,36.459,0,0,1,3.979,0Z" transform="matrix(0.208, -0.978, 0.978, 0.208, 27.414, 40.765)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_60" data-name="Pfad 60" d="M2.882,11.038a50.445,50.445,0,0,1,.972-6.062A30.118,30.118,0,0,1,5.542,0H.222a13.435,13.435,0,0,0,.1,5.356A21.95,21.95,0,0,0,2.882,11.038Z" transform="translate(67.363 25.472) rotate(111)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_71" data-name="Pfad 71" d="M4.532,26.733A136.3,136.3,0,0,1,5.76,11.6,61.871,61.871,0,0,1,8.714,0L.627-7.243S-1.3,5.627-.256,12.31,4.532,26.733,4.532,26.733Z" transform="matrix(0.829, -0.559, 0.559, 0.829, 107.198, 76.487)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_61" data-name="Pfad 61" d="M2.882,11.038a50.445,50.445,0,0,1,.972-6.062A30.118,30.118,0,0,1,5.542,0H.222a13.435,13.435,0,0,0,.1,5.356A21.95,21.95,0,0,0,2.882,11.038Z" transform="matrix(-0.326, 0.946, -0.946, -0.326, 58.108, 27.928)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_72" data-name="Pfad 72" d="M3.656,20.779s.39-6.216,1.234-11.411A76.556,76.556,0,0,1,7.031,0H.282a37.307,37.307,0,0,0,.13,10.083A52.342,52.342,0,0,0,3.656,20.779Z" transform="translate(118.321 77.198) rotate(-22)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_63" data-name="Pfad 63" d="M3.59,16.665A91.264,91.264,0,0,1,4.8,7.513,52.193,52.193,0,0,1,6.9,0H.277A24.5,24.5,0,0,0,.4,8.087,36.7,36.7,0,0,0,3.59,16.665Z" transform="matrix(0.276, 0.961, -0.961, 0.276, 39.947, 39.961)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_68" data-name="Pfad 68" d="M4.968,23.563s.53-7.049,1.676-12.94A75.029,75.029,0,0,1,9.553,0H.383A35.385,35.385,0,0,0,.56,11.434,52.571,52.571,0,0,0,4.968,23.563Z" transform="translate(77.602 71.154) rotate(-11)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_69" data-name="Pfad 69" d="M6.148,29.111S6.8,20.4,8.222,13.125A92.57,92.57,0,0,1,11.823,0H.474A43.641,43.641,0,0,0,.693,14.126,64.879,64.879,0,0,0,6.148,29.111Z" transform="matrix(0.946, -0.326, 0.326, 0.946, 85.689, 69.216)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_70" data-name="Pfad 70" d="M1.42,26.117s.78-5.963,1.362-13.241S5.175,3.561,5.175,3.561L-.375,1.213a55,55,0,0,0-.693,13.612A35.152,35.152,0,0,0,1.42,26.117Z" transform="matrix(0.875, -0.485, 0.485, 0.875, 97.543, 68.634)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <g id="Gruppe_4" data-name="Gruppe 4" transform="matrix(0.966, -0.259, 0.259, 0.966, -21.114, 7.286)">
      <path id="Pfad_101" data-name="Pfad 101" d="M3.68.574,6.01-6.339l.52,9.6L3.19,5.017Z" transform="translate(22 90)" fill="#371212"/>
      <path id="Pfad_102" data-name="Pfad 102" d="M3.248-.732-2.2-6.878l-.773,10L2.868,4.692a26.555,26.555,0,0,0,.356-2.723A25.118,25.118,0,0,0,3.248-.732Z" transform="translate(134.198 91.568)" fill="#371212"/>
      <path id="Pfad_93" data-name="Pfad 93" d="M8.149-2.138a66.436,66.436,0,0,1,6.776-.6c4.236-.31,16.59-.285,21.331,3.413,0,0,.567,8.144-.605,14.116a25.488,25.488,0,0,1-4.085,9.773S18.408,29.221,8.149,28.778Z" transform="translate(38.295 73.254)" fill="#cff6ed" opacity="0.32"/>
      <path id="Pfad_94" data-name="Pfad 94" d="M-3.284,1.931C-1.124-.888,3.781-2.135,8.284-2.794V29.36c-3.013-.084-6.356-.628-8.446-2.133C-8.522,21.2-6.915,5.188-3.284,1.931Z" transform="translate(38.651 73.254)" fill="#7f7f7f" opacity="0.44"/>
      <path id="Ausschluss_2" data-name="Ausschluss 2" d="M17.57,42.012c-.518,0-1.011-.016-1.463-.049a19.09,19.09,0,0,1-9.049-2.732,13.452,13.452,0,0,1-4.574-4.907,15.124,15.124,0,0,1-1.828-6.79A40.035,40.035,0,0,1,0,19.823a30.921,30.921,0,0,1,.824-6.985,18.246,18.246,0,0,1,3.05-6.711C6.6,2.529,10.713.594,16.107.376,22.268.126,28.541,0,34.751,0,45.4,0,52.268.377,52.336.381l.21,26.745c-.07.8-2.46,3.689-3.484,4.895a39.536,39.536,0,0,1-3.708,4,135.82,135.82,0,0,1-13.446,3.871A70.787,70.787,0,0,1,17.57,42.012ZM29.314,4.23c-1.4,0-2.758.043-3.82.121C18.449,4.7,11.5,5.576,8.4,9.625,6.374,11.442,5.038,16.5,5.291,21.389c.162,3.134,1.136,8.9,5.831,12.28,2.061,1.485,5.18,2.238,9.271,2.238,9.643,0,21.623-4.213,21.743-4.255a25.525,25.525,0,0,0,4.085-9.772c1.158-5.9.61-14.034.6-14.116C42.736,4.575,33.217,4.23,29.314,4.23Z" transform="translate(27.727 66.165)" fill="#4e0a0a"/>
      <path id="Ausschluss_1" data-name="Ausschluss 1" d="M16.331,34.184c-4.414,0-7.78-.813-10.005-2.416C1.26,28.119.209,21.9.033,18.519-.241,13.241,1.2,7.783,3.387,5.822c1.6-2.093,4.286-3.561,8.2-4.487A57.567,57.567,0,0,1,21.836.13C22.98.046,24.443,0,25.954,0c4.213,0,14.488.372,18.9,3.813.025.366.577,8.966-.653,15.233a27.769,27.769,0,0,1-4.408,10.546c-.139.049-3.39,1.187-7.785,2.3A68.508,68.508,0,0,1,16.331,34.184ZM25.7,1.254c-1.4,0-2.758.043-3.82.121C14.839,1.721,7.892,2.6,4.789,6.649,2.764,8.465,1.428,13.523,1.682,18.414c.163,3.134,1.136,8.9,5.831,12.279,2.061,1.485,5.18,2.238,9.271,2.238,9.643,0,21.623-4.213,21.743-4.255A25.533,25.533,0,0,0,42.61,18.9c1.159-5.9.611-14.034.606-14.116C39.127,1.6,29.607,1.254,25.7,1.254Z" transform="translate(31.336 69.142)" fill="#942323"/>
      <path id="Pfad_95" data-name="Pfad 95" d="M36.394-2.138a66.437,66.437,0,0,0-6.776-.6c-4.236-.31-16.59-.285-21.331,3.413,0,0-.567,8.144.605,14.116a25.488,25.488,0,0,0,4.085,9.773s13.159,4.658,23.418,4.214Z" transform="translate(77.061 73.254)" fill="#fff" opacity="0.34"/>
      <path id="Pfad_96" data-name="Pfad 96" d="M5.33,1.931C3.169-.888-1.735-2.135-6.238-2.794V29.36c3.013-.084,6.356-.628,8.446-2.133C10.568,21.2,8.96,5.188,5.33,1.931Z" transform="translate(119.202 73.254)" fill="#979797" opacity="0.44"/>
      <path id="Ausschluss_3" data-name="Ausschluss 3" d="M34.757,42.011h0c-6.214,0-12.488-.126-18.65-.376-5.394-.218-9.509-2.153-12.231-5.752a18.246,18.246,0,0,1-3.05-6.711A30.919,30.919,0,0,1,0,22.188a39.812,39.812,0,0,1,.654-7.711,15.136,15.136,0,0,1,1.828-6.79A13.452,13.452,0,0,1,7.058,2.781,19.09,19.09,0,0,1,16.107.049C16.56.016,17.052,0,17.571,0A70.768,70.768,0,0,1,31.907,2.119,135.883,135.883,0,0,1,45.354,5.99a39.284,39.284,0,0,1,3.689,4c1.019,1.206,3.4,4.1,3.466,4.895L52.354,41.63l-.031,0C51.11,41.7,44.557,42.011,34.757,42.011ZM20.392,6.1h0c-4.089,0-7.208.753-9.27,2.239-4.694,3.382-5.668,9.143-5.831,12.276C5.038,25.51,6.373,30.569,8.4,32.387c3.1,4.047,10.05,4.927,17.1,5.274,1.06.077,2.415.12,3.814.12,3.9,0,13.427-.344,17.517-3.533.006-.08.558-8.191-.606-14.116a25.743,25.743,0,0,0-4.084-9.773c-.119-.042-12.059-4.254-21.742-4.255Z" transform="translate(132.173 108.177) rotate(180)" fill="#4e0a0a"/>
      <path id="Ausschluss_4" data-name="Ausschluss 4" d="M16.331,0C11.917,0,8.55.813,6.326,2.416,1.26,6.065.209,12.283.033,15.665-.241,20.943,1.2,26.4,3.387,28.363c1.6,2.093,4.286,3.561,8.2,4.487a57.567,57.567,0,0,0,10.249,1.2c1.144.084,2.607.13,4.118.13,4.213,0,14.488-.372,18.9-3.813.025-.366.577-8.966-.653-15.233A27.77,27.77,0,0,0,39.795,4.592c-.139-.049-3.39-1.187-7.785-2.3A68.508,68.508,0,0,0,16.331,0ZM25.7,32.93c-1.4,0-2.758-.043-3.82-.121-7.046-.346-13.993-1.225-17.1-5.274-2.025-1.817-3.361-6.875-3.107-11.765.163-3.134,1.136-8.9,5.831-12.279,2.061-1.485,5.18-2.238,9.271-2.238,9.643,0,21.623,4.213,21.743,4.255a25.533,25.533,0,0,1,4.084,9.772c1.159,5.9.611,14.034.606,14.116C39.127,32.586,29.607,32.93,25.7,32.93Z" transform="translate(128.562 103.326) rotate(180)" fill="#942323"/>
    </g>
    <path id="Pfad_142" data-name="Pfad 142" d="M3.979,0A87.671,87.671,0,0,0,5.364,9.568a51.06,51.06,0,0,0,2.4,7.855H.191A23.457,23.457,0,0,1,.337,8.969,36.459,36.459,0,0,1,3.979,0Z" transform="translate(32.462 37.16) rotate(-57)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
  </g>
</svg>`

const sukuna = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="144.638" viewBox="0 0 240 144.638">
  <g id="sukuna" transform="translate(38 10.766)">
    <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" transform="translate(-38 14.32)" fill="rgba(255,255,255,0)"/>
    <path id="Pfad_154" data-name="Pfad 154" d="M102.836,50.786l8.772,9.432-2.888,18.519-2.574,8.827a134.093,134.093,0,0,0,0-19.492A95.627,95.627,0,0,0,102.836,50.786Z" transform="translate(20 11)" fill="#404040"/>
    <path id="Pfad_155" data-name="Pfad 155" d="M111.609,50.786l-8.772,9.432,2.888,18.519,2.574,8.827a134.093,134.093,0,0,1,0-19.492A95.627,95.627,0,0,1,111.609,50.786Z" transform="translate(-74 11)" fill="#404040"/>
    <path id="Pfad_156" data-name="Pfad 156" d="M-4.713-10.128s3.029,3.389,6.248,4.519a11.521,11.521,0,0,0,6.629,0,14.787,14.787,0,0,1-1.981-5.029c-.5-2.8,1.448-8,1.448-8a45.369,45.369,0,0,0,3.048,5.715,12.282,12.282,0,0,0,2.972,3.2l1.313-3.2a38.22,38.22,0,0,1,.827-8.781,40,40,0,0,1,3.148-8.37l4.6,13.392,2.344-15.4,9.13,8.2,7.73-11.885,8.537,13.445,6.194-11.436,3.181,11.436,9.04-9.762L71.7-20.366l7.533-9.876,2.678,9.876,11.383-8.7-1.685,8.7,10.055-7.868,1.051,15.309,8.035-8.781.737,8.781a5.121,5.121,0,0,1,0,3.2,17.482,17.482,0,0,1-2.243,4.114,11.023,11.023,0,0,0,4.981-.695,36.735,36.735,0,0,0,6.4-3.42l-6.4,10.972a32.513,32.513,0,0,0,10.515,5.12,29.419,29.419,0,0,0,11.338,0s-2.161,5.684-5.852,8.748a18.158,18.158,0,0,1-8.915,3.5s2.937,4.17,6.629,6.1a17.273,17.273,0,0,0,8.138,1.607,18.142,18.142,0,0,1-5.014,5.277,16.758,16.758,0,0,1-6.781,2.107,16.322,16.322,0,0,0,4.343,5.257,13.974,13.974,0,0,0,6.147,2.1,12.013,12.013,0,0,1-5.005.568,22.642,22.642,0,0,1-5.866-1.752,26.353,26.353,0,0,0,2.819,4.953,7.224,7.224,0,0,0,3.046,2.327,13.3,13.3,0,0,1-5.866,2.778,22.382,22.382,0,0,1-7.619-.457l1.524,2.819s-3.545-.475-5.943,1.067-3.649,5.1-3.649,5.1l-2.7-3.219-5.686-6.408h1.2l-1.2-1.547,1.841-.133-3.2-4.3,2.028.267-7.83-8.617,3.087.555L89.921,31.6l2.74.243-4.786-3.954,5.48-2.081-11.645.515-2.668-6.4-4.8,3.148L71.946,19.76l-4.989,3.468V20.48l-3.521,1.931,1.467-3.4-4.3,3.467s-2.407-.069-3.77-.069c-2.163,0-4.245.053-6.531.17-.86.044-.937,2.148-.937,2.148s-3.96-2.411-4.893-2.318c-.792.079-1.416,2.833-1.416,2.833s-3.035-1.621-4.457-1.37c-.764.135-1.51.279-2.539.5-.519.11-3.9-3.192-4.722-2.991-.444.107,1.653,3.73.8,3.973-.485.138-5.181-3.973-5.181-3.973s2.261,4.918,1.433,5.237a29.963,29.963,0,0,0-3.819,1.788c-.488.267-4.891-.989-4.891-.989s3.113,2,2.534,2.534c-.681.631-5.069.907-5.069.907l1.787,3.015-3.975.133,1.814,3.922-4.135.561,3.148,1.12L12.641,43.77l1.707-.373.192,6.4L8.5,56.535,6.022,58V51.36L1.157,54.3l4.865-7.722L-5.417,48.659l5.744-7.6a14.558,14.558,0,0,1-4.454,1.676,18.232,18.232,0,0,1-5.1,0l5.1-3.131,3.4-2.965a7.965,7.965,0,0,1-4.689,2.4,35.778,35.778,0,0,1-8.381,0,31.137,31.137,0,0,0,5.92-5.04,24.564,24.564,0,0,0,3.751-6.183,15.187,15.187,0,0,1-5.1-1.2,26.247,26.247,0,0,1-5.216-3.338,30.175,30.175,0,0,0,5.509.234,17.556,17.556,0,0,0,4.572-1A22.991,22.991,0,0,1-10.4,18.474,75.831,75.831,0,0,1-17.432,10.8a15.574,15.574,0,0,0,7.444,2.11A26.724,26.724,0,0,0-1.08,10.8S-4.1,9.4-5.006,4.173-4.713-10.128-4.713-10.128Z" transform="translate(23 25)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_157" data-name="Pfad 157" d="M1.042,21.209s-.652-6.485.586-11.091A28.875,28.875,0,0,1,5.912,1.484,49.064,49.064,0,0,0,4.062,8.721a17.826,17.826,0,0,0,0,5.5l3.021-.356L7.85,9.848s.984,1.638,1.217,5.861A70.022,70.022,0,0,1,8.3,26.665l-1.217-10.1a6.275,6.275,0,0,0-3.517,1.127A10.353,10.353,0,0,0,1.042,21.209Z" transform="translate(66 50)"/>
    <path id="Pfad_158" data-name="Pfad 158" d="M8.931,21.209s.652-6.485-.586-11.091A28.875,28.875,0,0,0,4.061,1.484,49.064,49.064,0,0,1,5.91,8.721a17.826,17.826,0,0,1,0,5.5l-3.021-.356L2.123,9.848S1.139,11.486.906,15.709a70.022,70.022,0,0,0,.766,10.956l1.217-10.1a6.275,6.275,0,0,1,3.517,1.127A10.353,10.353,0,0,1,8.931,21.209Z" transform="translate(81.453 50)"/>
    <path id="Pfad_159" data-name="Pfad 159" d="M1.359.3c.75,0,1.406,1.739,1.406,3.989A11.937,11.937,0,0,1,1.422,9.031,11.468,11.468,0,0,1,0,4.286C0,2.036.609.3,1.359.3Z" transform="translate(77 55)"/>
    <path id="Pfad_160" data-name="Pfad 160" d="M4.966,6.243a31.894,31.894,0,0,1,4.82-5.177h9.862c2.544,1.473,4.686,5.177,4.686,5.177L31,9s-4.174.744-7.335-.57-2.488-3.514-5.311-4.686c0,0-3.347-1.049-5.98,0S10.957,6.768,7.822,7.939-.166,8.43-.166,8.43Z" transform="translate(64.583 87.181)"/>
    <path id="Pfad_162" data-name="Pfad 162" d="M16.064,10.169,11.951,7.138,10.084,8.491,6.7,5.407l.785-2.165L4.5-.578l1.331,3.82L4.5,4.838l1.439,1.84L4.5,9.751,7.2,29.571l7.782,12.282,5.893.443L25.5,49.388l-3.142-9.995a7.542,7.542,0,0,1-2.616.711,19.21,19.21,0,0,1-3.6-.135L8.3,28.466l-1.3-16,1-3.35,2.3,1.651,2.571-1.84Z" transform="matrix(0.966, -0.259, 0.259, 0.966, 36.348, 87.332)"/>
    <path id="Pfad_163" data-name="Pfad 163" d="M11.56,39.219,7.447,42.25,5.58,40.9,2.2,43.982l.785,2.165L0,49.966l1.331-3.82L0,44.55l1.439-1.84L0,39.637l2.694-19.82L10.477,7.535l5.893-.443L20.991,0,17.849,9.995a7.542,7.542,0,0,0-2.616-.711,19.21,19.21,0,0,0-3.6.135L3.8,20.922l-1.3,16,1,3.35,2.3-1.651,2.571,1.84Z" transform="matrix(-0.966, -0.259, 0.259, -0.966, 108.715, 133.871)"/>
    <path id="Pfad_164" data-name="Pfad 164" d="M8.124,8.292l2.844.971.694-3.295,5.41-2.254L12.792,8.047,12.174,11.4,8.8,10,2.748,12.211Z" transform="translate(104 79)"/>
    <path id="Pfad_165" data-name="Pfad 165" d="M11.7,8.292l-2.844.971L8.158,5.968,2.748,3.714,7.027,8.047,7.645,11.4,11.019,10l6.053,2.211Z" transform="translate(38 79)"/>
    <path id="Pfad_166" data-name="Pfad 166" d="M5.3,5.638A30.323,30.323,0,0,0,11.57-1.22S9.987,5.433,6.705,7.748-3.9,9.623-3.9,9.623,2.016,7.953,5.3,5.638Z" transform="translate(107 78)"/>
    <path id="Pfad_167" data-name="Pfad 167" d="M2.368,5.638A30.323,30.323,0,0,1-3.9-1.22S-2.321,5.433.961,7.748,11.57,9.623,11.57,9.623,5.65,7.953,2.368,5.638Z" transform="translate(47 78)"/>
    <path id="Pfad_168" data-name="Pfad 168" d="M.009,1.062,2.714.341l1.4,8.431Z" transform="translate(72 121)"/>
    <path id="Pfad_169" data-name="Pfad 169" d="M4.112,1.062,1.407.341.009,8.772Z" transform="translate(85.939 121)"/>
  </g>
</svg>`


const kusanagi = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="240" height="137.744" viewBox="0 0 240 137.744">
  <defs>
    <linearGradient id="linear-gradient" x1="0.352" y1="0.608" x2="0.941" y2="0.399" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#e9e9e9"/>
      <stop offset="1" stop-color="#212121"/>
    </linearGradient>
    <linearGradient id="linear-gradient-2" x1="0.414" y1="0.53" x2="0.668" y2="0.483" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#dedede"/>
      <stop offset="1" stop-color="#6f6f6f"/>
    </linearGradient>
  </defs>
  <g id="kusanagi_hair" data-name="kusanagi hair" transform="translate(56.935 0.46)">
    <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" transform="translate(-56.935 5.831)" fill="rgba(255,255,255,0)"/>
    <path id="Pfad_124" data-name="Pfad 124" d="M1.065,25.943H-6.3L8.1,14.872l6.794-4.4L5.028,8.175,23.3,5.016S25.854,2.51,33.567,1.675s11.324,0,20.585,0c8.619,0,16.425-1.68,28.169,1.517a41.663,41.663,0,0,1,18.8,11.269l10.664,7.158H106.4s3.3,4.959,4.526,7.358c5.759,11.231-1.368,35.787-1.368,35.787l-1.793,12.851V71.972L103.3,91.016,101.125,80.98v27.058l-3.46-4.007-3,14.191s-.9-8.508-1.3-7.8c-.273.488-6.067,21.668-6.067,21.668a102.359,102.359,0,0,0,3.034-29.9c-.275-5.583,1-13.332.9-22.594-.015-1.441-2.7,1.386-2.7,1.386s1.81-16.879,1.8-18.64c0-.247-.644-19.5-.644-19.5L88.533,60.326,82.321,39.594l1.3,22.1L71.27,41.761l-1.733,9.751-1.083-8.667-6.934,8.667,1.95-8.667-9.317,13,2.167-9.1-9.1,9.1,6.934-16.251-9.534,7.151L32.484,61.7l1.083-8.884-4.334,3.034,1.3-14.084-5.417,15.6L26.85,39.594,20.133,51.512l1.083-12.784L16.232,52.812s.609,31.057,2.613,47.037,8.884,34.435,8.884,34.435l-5.85-16.06L17.32,111l-1.942,3.753-2.32-12.374-1.58,5.657-1.148-8.3-3.592.114s.476-4.277.635-8.833A51.217,51.217,0,0,0,6.738,80.98c-1.783-8.96-2.392-8.78-2.392-8.78l-3.7,7.394s2.368-9.832,2.368-13.348A31.9,31.9,0,0,0,1.5,58.135c-.746-2.8-1.955-8.761-1.955-8.761s-2.29,6.966-2.385,5.387,2.007-11.7,2.007-11.7L-.6,39.14l-4.617,2.621L-.1,30.5Z" transform="translate(7.735 3)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_127" data-name="Pfad 127" d="M43.805,1.241c-.018-.018-.73-.814-.73-.814S17.785-3.743-4.081-3.743L-5.8,36.56h1.717c22.02,0,45.613-2.054,47.887-3.9S46.419,3.855,43.805,1.241Z" transform="translate(67.355 18.75)" fill="#5d5d5d"/>
    <path id="Pfad_126" data-name="Pfad 126" d="M-2.889,1.241c.018-.018.73-.814.73-.814S23.131-3.743,45-3.743l.894,39.264L45,36.56c-22.02,0-45.613-2.054-47.887-3.9S-5.5,3.855-2.889,1.241Z" transform="translate(16.616 18.75)" fill="#5d5d5d"/>
    <path id="Pfad_128" data-name="Pfad 128" d="M43.02,1.244C40.406-1.37,16.818-3.729-5.2-3.729l-.13,40.291c22.02,0,46.079-2.052,48.353-3.9S45.634,3.858,43.02,1.244Z" transform="translate(67.433 17.948)" fill="#828282"/>
    <path id="Pfad_125" data-name="Pfad 125" d="M-2.889,1.241C-.275-1.373,22.977-3.743,45-3.743v40.3c-22.02,0-45.613-2.054-47.887-3.9S-5.5,3.855-2.889,1.241Z" transform="translate(17.323 17.952)" fill="#828282"/>
    <g id="Ellipse_5" data-name="Ellipse 5" transform="translate(61.122 15.486)" fill="#828282" stroke="#363636" stroke-width="0.4">
      <ellipse cx="1" cy="1.5" rx="1" ry="1.5" stroke="none"/>
      <ellipse cx="1" cy="1.5" rx="0.8" ry="1.3" fill="none"/>
    </g>
    <g id="Ellipse_6" data-name="Ellipse 6" transform="translate(46.122 34.486)" fill="#828282" stroke="#363636" stroke-width="0.4">
      <circle cx="0.5" cy="0.5" r="0.5" stroke="none"/>
      <circle cx="0.5" cy="0.5" r="0.3" fill="none"/>
    </g>
    <g id="Ellipse_7" data-name="Ellipse 7" transform="translate(59.122 48.486)" fill="#828282" stroke="#363636" stroke-width="0.4">
      <ellipse cx="1" cy="0.5" rx="1" ry="0.5" stroke="none"/>
      <ellipse cx="1" cy="0.5" rx="0.8" ry="0.3" fill="none"/>
    </g>
    <g id="Ellipse_8" data-name="Ellipse 8" transform="translate(16.122 46.486)" fill="#828282" stroke="#363636" stroke-width="0.4">
      <circle cx="1" cy="1" r="1" stroke="none"/>
      <circle cx="1" cy="1" r="0.8" fill="none"/>
    </g>
    <g id="Ellipse_9" data-name="Ellipse 9" transform="translate(16.122 20.486)" fill="#828282" stroke="#363636" stroke-width="0.4">
      <ellipse cx="1" cy="0.5" rx="1" ry="0.5" stroke="none"/>
      <ellipse cx="1" cy="0.5" rx="0.8" ry="0.3" fill="none"/>
    </g>
    <g id="Ellipse_10" data-name="Ellipse 10" transform="translate(77.122 34.486)" fill="#828282" stroke="#363636" stroke-width="0.4">
      <circle cx="0.5" cy="0.5" r="0.5" stroke="none"/>
      <circle cx="0.5" cy="0.5" r="0.3" fill="none"/>
    </g>
    <g id="Ellipse_11" data-name="Ellipse 11" transform="translate(63.122 48.486)" fill="#828282" stroke="#363636" stroke-width="0.4">
      <ellipse cx="1" cy="0.5" rx="1" ry="0.5" stroke="none"/>
      <ellipse cx="1" cy="0.5" rx="0.8" ry="0.3" fill="none"/>
    </g>
    <g id="Ellipse_12" data-name="Ellipse 12" transform="translate(107.122 46.486)" fill="#828282" stroke="#363636" stroke-width="0.4">
      <ellipse cx="0.5" cy="1" rx="0.5" ry="1" stroke="none"/>
      <ellipse cx="0.5" cy="1" rx="0.3" ry="0.8" fill="none"/>
    </g>
    <g id="Ellipse_13" data-name="Ellipse 13" transform="translate(107.122 20.486)" fill="#828282" stroke="#363636" stroke-width="0.4">
      <circle cx="0.5" cy="0.5" r="0.5" stroke="none"/>
      <circle cx="0.5" cy="0.5" r="0.3" fill="none"/>
    </g>
    <path id="Pfad_135" data-name="Pfad 135" d="M0,0H8.21l3.415,3.423L9.947,0h2.91l2.462,1.931V15.916l-4.835,1.954,4.157-.236-1.876,1.256,2.554.422V20.68H6.968L0,13.271Z" transform="translate(22.639 23.001) rotate(22)" fill="#fff"/>
    <image id="_removal.ai__1b739251-7702-4d07-9b72-f5ecb998c569-image" data-name="[removal.ai]_1b739251-7702-4d07-9b72-f5ecb998c569-image" width="13.521" height="17.616" transform="translate(22.775 24.709) rotate(22)" opacity="0.82" xlink:href="data:image/png;base64,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"/>
    <path id="Pfad_136" data-name="Pfad 136" d="M1.885.031l1.544,2.7L1.609,1.862Z" transform="translate(32.691 27.791)" fill="url(#linear-gradient)"/>
    <path id="Pfad_137" data-name="Pfad 137" d="M3.828.951l.06-1.17L7.586,9.3l-.8-.756Z" transform="translate(13.789 35.509)" fill="url(#linear-gradient-2)"/>
    <path id="Pfad_138" data-name="Pfad 138" d="M2.118.333l2.94,7.546L-.216,5.949Z" transform="translate(15.501 36.146)" fill="#fff"/>
    <path id="Pfad_143" data-name="Pfad 143" d="M2,0,5.324.541,4.59,8.5Z" transform="translate(72.065 12.512)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_153" data-name="Pfad 153" d="M2,0,5.324.541,4.59,8.5Z" transform="matrix(-0.848, 0.53, -0.53, -0.848, 68.299, 5.686)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_147" data-name="Pfad 147" d="M5.324,0,2,.541,2.734,8.5Z" transform="translate(35.591 12.033) rotate(41)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_144" data-name="Pfad 144" d="M2,0,5.324.541,4.59,8.5Z" transform="matrix(0.914, 0.407, -0.407, 0.914, 72.447, 8.848)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_152" data-name="Pfad 152" d="M2,0,5.324.541,4.59,8.5Z" transform="translate(69.52 9.529) rotate(172)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_146" data-name="Pfad 146" d="M0,8.5l3.324-.541L2.59,0Z" transform="translate(38.836 21.364) rotate(-163)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_145" data-name="Pfad 145" d="M2,0,6.2.718,5.269,11.271Z" transform="matrix(0.927, -0.375, 0.375, 0.927, 72.635, 13.357)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_151" data-name="Pfad 151" d="M2,0,6.2.718,5.269,11.271Z" transform="translate(68.524 4.546) rotate(126)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_148" data-name="Pfad 148" d="M0,11.271l4.2-.718L3.269,0Z" transform="matrix(-0.454, -0.891, 0.891, -0.454, 29.184, 20.437)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_149" data-name="Pfad 149" d="M.767,12.257,6.175,15.9,4.676-.268Z" transform="translate(32.31 63.412) rotate(146)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_150" data-name="Pfad 150" d="M.156,18.447,6.175,15.9,9.485-13.483Z" transform="translate(31.254 71.021) rotate(154)" fill="${HAIR_COLOR_PLACEHOLDER}"/>
  </g>
</svg>`

const cornrows =`<svg id="braids" xmlns="http://www.w3.org/2000/svg" width="240" height="82.111" viewBox="0 0 240 82.111">
  <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Pfad_62" data-name="Pfad 62" d="M31.109,2.906a6.056,6.056,0,0,1,1.609-.719,3.589,3.589,0,0,1,1.5,0,4.353,4.353,0,0,1,1.453-.734,4.064,4.064,0,0,1,1.594,0,4.158,4.158,0,0,1,1.406-.7A5.085,5.085,0,0,1,40.344.688a4.578,4.578,0,0,1,2.047-.781A3.579,3.579,0,0,1,44.5.453a3.878,3.878,0,0,1,1.75-.469,4.576,4.576,0,0,1,1.828.547A4.74,4.74,0,0,1,50.063.109a4.163,4.163,0,0,1,1.828.672,4.291,4.291,0,0,1,1.828.156A4.612,4.612,0,0,1,55.266,2a3.669,3.669,0,0,1,2.719,0,3.179,3.179,0,0,1,1.906,1.781,5.459,5.459,0,0,1,1.391.672,3.348,3.348,0,0,1,.875,1,2.807,2.807,0,0,1,.328-.3,1.124,1.124,0,0,1,.3-.156,3.447,3.447,0,0,1,1.641-2.7,4.2,4.2,0,0,1,3.313-.2,4.535,4.535,0,0,1,1.531-1.062A3.955,3.955,0,0,1,71.047.906,4.343,4.343,0,0,1,72.922.219a3.635,3.635,0,0,1,1.938.438A4.444,4.444,0,0,1,76.672.094a4.119,4.119,0,0,1,1.8.453,4.265,4.265,0,0,1,2.125-.562,3.829,3.829,0,0,1,2.047.828,3.878,3.878,0,0,1,1.594,0,4.757,4.757,0,0,1,1.516.766,4.168,4.168,0,0,1,1.594,0A4.048,4.048,0,0,1,88.75,2.3a4.413,4.413,0,0,1,1.688,0,3.832,3.832,0,0,1,1.422.766,3.963,3.963,0,0,1,2.063.125,4.993,4.993,0,0,1,1.734,1.391,4.953,4.953,0,0,1,1.516.578,3.347,3.347,0,0,1,.984,1.031,4.482,4.482,0,0,1,1.484.516A4.236,4.236,0,0,1,100.75,7.8a3.744,3.744,0,0,1,1.2.781,4.652,4.652,0,0,1,.844,1.281,4.474,4.474,0,0,1,1.844.313,4.247,4.247,0,0,1,1.406,1.234,3.07,3.07,0,0,1,1.7.656,5.309,5.309,0,0,1,1.172,1.828,5.036,5.036,0,0,1,1.75.953,3.632,3.632,0,0,1,.891,1.563,4.018,4.018,0,0,1,1.844,1.047A4.725,4.725,0,0,1,114.3,19.5a5.606,5.606,0,0,1,1.2,1.3,3.146,3.146,0,0,1,.406,1.422,4.206,4.206,0,0,1,1.219,1.172,3.445,3.445,0,0,1,.422,1.531,4.329,4.329,0,0,1,1.156,1.141,4.3,4.3,0,0,1,.531,1.531,4.44,4.44,0,0,1,1.406,1.625,4.338,4.338,0,0,1,.188,2.125,4.675,4.675,0,0,1,.656,1.438,4.084,4.084,0,0,1,0,1.516,3.335,3.335,0,0,1,.3,3.922,3.545,3.545,0,0,1-3.812,1.641,2.117,2.117,0,0,1-.328.25,1.787,1.787,0,0,1-.359.156,4.865,4.865,0,0,1,.453,1.516,3.127,3.127,0,0,1-.234,1.359,3.528,3.528,0,0,1,.531,1.344,5.85,5.85,0,0,1-.062,1.688s1.078,2.313-.328,4.031a3.749,3.749,0,0,1-3.578,1.2,4.451,4.451,0,0,1,.344,1.516,3.467,3.467,0,0,1-.344,1.4,4.918,4.918,0,0,1,.344,1.6,3.877,3.877,0,0,1-.344,1.484,3.573,3.573,0,0,1-.734,4,3.381,3.381,0,0,1-3.969.656,3.968,3.968,0,0,1-.812.313,3.878,3.878,0,0,1-.859.094,4.759,4.759,0,0,1,.656,2.078,4.636,4.636,0,0,1-.594,2.078,4.824,4.824,0,0,1,.078,1.625,3.158,3.158,0,0,1-.594,1.3,3.628,3.628,0,0,1-1.359,3.891,3.3,3.3,0,0,1-3.969,0,3.422,3.422,0,0,1-3.766-1.2,3.7,3.7,0,0,1-.172-4.109,4.776,4.776,0,0,1-.078-1.609,3.722,3.722,0,0,1,.578-1.375,4.682,4.682,0,0,1-.125-1,4.924,4.924,0,0,1,.125-1.016,3.857,3.857,0,0,1-.578-1.422,5.261,5.261,0,0,1,.078-1.687,3.577,3.577,0,0,1-.625-1.422,5.128,5.128,0,0,1,.094-1.734,4.179,4.179,0,0,1-.594-1.469,4.43,4.43,0,0,1,.109-1.609,3.459,3.459,0,0,1-.547-1.094,4.808,4.808,0,0,1-.118-1.348,4.588,4.588,0,0,1-.914-.965,4.338,4.338,0,0,1-.517-1.2,3.594,3.594,0,0,1-1.248-1.207,5.318,5.318,0,0,1-.54-1.887,5.122,5.122,0,0,1-1.757-1.3,4.153,4.153,0,0,1-.711-1.919A4.442,4.442,0,0,1,89.266,41.8a4.1,4.1,0,0,1-.667-1.527,3.682,3.682,0,0,1-1.13-.957,4.438,4.438,0,0,1-.623-1.44A5.36,5.36,0,0,1,86,37.219a4.417,4.417,0,0,1-.621-.794,4.487,4.487,0,0,1-1.489-.643,4.149,4.149,0,0,1-1.033-1.2,5.017,5.017,0,0,1-1.576-.66,3.455,3.455,0,0,1-.981-1.164,5.953,5.953,0,0,1-1.691-.727,2.485,2.485,0,0,1-.849-1.115,4.969,4.969,0,0,1-1.323-.479,3.113,3.113,0,0,1-.895-.827,4,4,0,0,1-1.293,0,4.839,4.839,0,0,1-1.282-.483,5.125,5.125,0,0,1-1.889-.065,3.984,3.984,0,0,1-1.509-.883,3.867,3.867,0,0,1-2.913.2A3.5,3.5,0,0,1,64.6,26.409a3.465,3.465,0,0,1-1.613,0,5.108,5.108,0,0,1-1.6-.876,3.894,3.894,0,0,1-1.422.769,4.265,4.265,0,0,1-1.663,0,3.977,3.977,0,0,1-2.021,1.967,4.071,4.071,0,0,1-2.879-.215,3.866,3.866,0,0,1-1.52.948,4.357,4.357,0,0,1-1.86,0,3.685,3.685,0,0,1-1.2.5,4.458,4.458,0,0,1-1.377,0,2.489,2.489,0,0,1-.841.858,4.311,4.311,0,0,1-1.359.429,3.673,3.673,0,0,1-1.019,1.216,4.528,4.528,0,0,1-1.574.626,3.626,3.626,0,0,1-1,1.234,4.068,4.068,0,0,1-1.538.59,4.322,4.322,0,0,1-1.091,1.288,3.488,3.488,0,0,1-1.484.537,3.182,3.182,0,0,1-.537.787,5.6,5.6,0,0,1-.876.715,4.4,4.4,0,0,1-.626,1.395,4.1,4.1,0,0,1-1.127.984,4.525,4.525,0,0,1-.715,1.538,4.59,4.59,0,0,1-1.323,1.073,4.215,4.215,0,0,1-.715,1.967,4.642,4.642,0,0,1-1.771,1.234,4.127,4.127,0,0,1-.429,1.806A3.886,3.886,0,0,1,28.1,49.033a2.963,2.963,0,0,1-.429,1.109,5.4,5.4,0,0,1-.984,1.037,4.378,4.378,0,0,1-.107,1.306,3.976,3.976,0,0,1-.554,1.145,4.417,4.417,0,0,1,.089,1.61,4.494,4.494,0,0,1-.608,1.5,4.364,4.364,0,0,1,.089,1.592A5.181,5.181,0,0,1,25,59.906a4.526,4.526,0,0,1,.072,1.61A4.462,4.462,0,0,1,24.466,63a4.837,4.837,0,0,1,.143,1.055,3.857,3.857,0,0,1-.143.984,3.9,3.9,0,0,1,.608,1.413,3.8,3.8,0,0,1-.125,1.52,3.872,3.872,0,0,1,0,4.113,3.437,3.437,0,0,1-3.881,1.27,3.947,3.947,0,0,1-3.935.089c-1.862-1.2-1.449-3.988-1.449-3.988a4,4,0,0,1-.659-1.584,2.618,2.618,0,0,1,.236-1.375,4.236,4.236,0,0,1-.629-2,5.063,5.063,0,0,1,.629-2.131L13.6,62.008a3.705,3.705,0,0,1-3.974-.664A3.494,3.494,0,0,1,8.906,57.3a4.57,4.57,0,0,1-.359-1.562,3.43,3.43,0,0,1,.359-1.422,3.958,3.958,0,0,1-.359-1.5,4.215,4.215,0,0,1,.359-1.531,3.818,3.818,0,0,1-3.66-1.372,3.411,3.411,0,0,1-.158-3.776,5.64,5.64,0,0,1-.166-1.7,3.3,3.3,0,0,1,.484-1.359,5.806,5.806,0,0,1-.16-1.594,3.62,3.62,0,0,1,.394-1.328,3.842,3.842,0,0,1-.394-.2,2.734,2.734,0,0,1-.324-.234S2.07,40.2,1.109,37.784s.378-3.594.378-3.594a5.953,5.953,0,0,1,0-1.785,2.041,2.041,0,0,1,.652-1.1,4.965,4.965,0,0,1,.236-2.2A4.271,4.271,0,0,1,3.734,27.5,5.123,5.123,0,0,1,4.3,25.875,3.846,3.846,0,0,1,5.408,24.76,4.367,4.367,0,0,1,5.922,23.2,4.319,4.319,0,0,1,7.07,22.039,4.04,4.04,0,0,1,7.547,20.5a3.876,3.876,0,0,1,1.141-1.109,4.322,4.322,0,0,1,.828-2,4.461,4.461,0,0,1,1.875-1.125,5.038,5.038,0,0,1,1.047-1.656,3.959,3.959,0,0,1,1.609-.844,4.368,4.368,0,0,1,1.063-1.687,4.217,4.217,0,0,1,1.8-.812,4.835,4.835,0,0,1,1.469-1.219,4.069,4.069,0,0,1,1.781-.312A4.52,4.52,0,0,1,21,8.484a4.275,4.275,0,0,1,1.25-.8,3.962,3.962,0,0,1,1.078-1.094,4.627,4.627,0,0,1,1.516-.547,3.943,3.943,0,0,1,1.063-1.094,4.043,4.043,0,0,1,1.453-.5,4.175,4.175,0,0,1,1.594-1.359A4.63,4.63,0,0,1,31.109,2.906Z" transform="translate(59 8)"/>
  <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" fill="rgba(255,255,255,0)"/>
</svg>`

const gon =`<svg id="gon" xmlns="http://www.w3.org/2000/svg" width="240" height="99.589" viewBox="0 0 240 99.589">
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_59" data-name="Pfad 59" d="M-16.308,26.916,4.776,39.925-4.2,2.243s4.71,2.8,11.215,7.626A151.961,151.961,0,0,1,20.477,21.533L17.336,4.486l9.421,14.8L38.421,0,49.072,13.037,53.313,0,66.35,14.921l7.1-12.678L70.34,16.564A76.509,76.509,0,0,1,83.108,8.282a45.436,45.436,0,0,1,12.423-3.8l-7.247,21.05,16.564-12.526L98.533,31.057l25.984-14.493s-9.3,21.793-14.477,41.463S98.533,99.589,98.533,99.589L90.408,66.361l5.123,1.327-7.247-12.21,4.247-2.654-6.9-1.062,2.654-4.247L78.2,48.841l2.654-5.574-12.21,4.247V43.267l-6.9,5.574V43.267l-8.427,6.9-11.747-8.76,5.309,7.432L35.992,41.409l2.429,5.043L26.757,41.409l4.722,5.043H18.473l3.185,2.389-4.321,2.92,3.14,1.062-9.7,15.927,6.562-2.389L7.019,99.589A331.284,331.284,0,0,0-1.953,65.047C-7.785,46.879-16.308,26.916-16.308,26.916Z" transform="translate(67)"/>
  <path id="Pfad_60" data-name="Pfad 60" d="M-.639,46.452l13.007,2.389L9.182,23.359s1.65,1.017,8.154,5.84a87.337,87.337,0,0,1,8.038,6.371l-1.858-15.4L31.479,29.2l8.229-14.277L50.856,29.2,55.1,11.679l8.229,13.8,3.982-6.371,1.327,13.8s1.062-2.654,5.043-7.432a21.558,21.558,0,0,1,9.556-6.371L80.852,38.755l9.556-7.7v12.21l15.13-4.513s-2.031,10.871-4.247,26.544-2.758,34.29-2.758,34.29L90.408,66.361l5.123,1.327-7.247-12.21,4.247-2.654-6.9-1.062,2.654-4.247L78.2,48.841l2.654-5.574-12.21,4.247V43.267l-6.9,5.574V43.267l-8.427,6.9-11.747-8.76,5.309,7.432L35.992,41.409l2.429,5.043L26.757,41.409l4.722,5.043H18.473l3.185,2.389-4.321,2.92,3.14,1.062-9.7,15.927,6.562-2.389L7.019,99.589A70.815,70.815,0,0,0,4.4,66.361C-1.428,48.192-.639,46.452-.639,46.452Z" transform="translate(67)" opacity="0.5"/>
  <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" fill="rgba(255,255,255,0)"/>
</svg>`

const sakura =`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="147.955" viewBox="0 0 240 147.955">
  <g id="sakura" transform="translate(0 0.366)">
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Pfad_58" data-name="Pfad 58" d="M9.953,17.944C23.579-4.486,51.449,0,51.449,0s28.607-2.467,41.5,17.944,12.416,28.3,11.921,64.078-11.921,60.632-11.921,60.632v-15.7L81.28,147.589s7.065-16.107,6.28-34.093-6.28-45.308-6.28-45.308S67.037,64.6,55.262,56.523,34.178,35.888,34.178,35.888a252.369,252.369,0,0,1-5.383,32.3c-4.374,19.4-8.355,30.8-10.318,42.168-4.822,27.925,0,37.234,0,37.234s-9.265-8.44-12.112-14.355c-1.177-2.444,0,14.355,0,14.355a192.948,192.948,0,0,1-6.28-25.121C-2.271,109.009-2.322,99.5-3.056,89.72-4.445,71.24-3.673,40.374,9.953,17.944Z" transform="translate(69)"/>
    <path id="Pfad_61" data-name="Pfad 61" d="M-.431-.431,4,0l.475,4.475L0,4Z" transform="translate(120 55.172) rotate(45)" opacity="0.54"/>
    <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" fill="rgba(255,255,255,0)"/>
  </g>
</svg>`

const curlywomenhair =`<svg id="women_hair" data-name="women hair" xmlns="http://www.w3.org/2000/svg" width="240" height="143.253" viewBox="0 0 240 143.253">
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_44" data-name="Pfad 44" d="M15.368,11.522c12.89-7.431,20.232-9.8,40.324-9.8,6.321,0,7.433-.843,11.481,1.68a3.35,3.35,0,0,1,1.4,4.48s1.416-1.22,5.321-1.4c4.054-.188,18.8,3.3,21.842,5.04,13.012,7.431,10.921,18.2,10.921,18.2V81.248L100.5,93.289s-4.969-53.933-19.81-54.773c-.8-.045-1.784-4.642-1.784-4.642l-2.167,4.642c-15.575,1.105-40.757,8.311-51.846,10.529-12.6,2.52-15.121,44.244-15.121,44.244L3.047,81.248V33.875S2.478,18.952,15.368,11.522Z" transform="translate(65 5)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_45" data-name="Pfad 45" d="M-1.184-.089V5.277s-.448-3.319-.448,14.931c0,7.574,12.114,15.925,14.281,29.123s-21.6,22.4-21.6,22.4,17.722-9.2,15.485-22.4S-8.951,28-8.951,20.208C-8.951,1.958-1.184-.089-1.184-.089Z" transform="translate(79.385 66.033) rotate(7)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_53" data-name="Pfad 53" d="M-1.184-.089V5.277s-.448-3.319-.448,14.931c0,7.574,12.114,15.925,14.281,29.123s-21.6,22.4-21.6,22.4,17.722-9.2,15.485-22.4S-8.951,28-8.951,20.208C-8.951,1.958-1.184-.089-1.184-.089Z" transform="translate(72.385 56.033) rotate(7)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_54" data-name="Pfad 54" d="M-1.184-.089V5.277s-.448-3.319-.448,14.931c0,7.574,12.114,15.925,14.281,29.123s-21.6,22.4-21.6,22.4,17.722-9.2,15.485-22.4S-8.951,28-8.951,20.208C-8.951,1.958-1.184-.089-1.184-.089Z" transform="matrix(0.891, 0.454, -0.454, 0.891, 78.595, 46.297)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_55" data-name="Pfad 55" d="M-1.184-.089V3.716S-1.632,1.362-1.632,14.3c0,5.37,12.114,11.292,14.281,20.65s-21.6,15.885-21.6,15.885S8.772,44.312,6.534,34.953-8.951,19.829-8.951,14.3C-8.951,1.362-1.184-.089-1.184-.089Z" transform="translate(85.365 44.841) rotate(69)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_56" data-name="Pfad 56" d="M-1.184-.089V2.346S-1.632.84-1.632,9.123c0,3.437,12.114,7.228,14.281,13.218s-21.6,10.168-21.6,10.168S8.772,28.331,6.534,22.34-8.951,12.66-8.951,9.123C-8.951.84-1.184-.089-1.184-.089Z" transform="translate(80.206 49.336) rotate(101)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_57" data-name="Pfad 57" d="M-1.184-.089V1.418s-.448-.932-.448,4.195c0,2.128,12.114,4.474,14.281,8.182s-21.6,6.294-21.6,6.294S8.772,17.5,6.534,13.794-8.951,7.8-8.951,5.613C-8.951.486-1.184-.089-1.184-.089Z" transform="translate(75.104 46.797) rotate(128)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_48" data-name="Pfad 48" d="M-1.184-.089V5.277s-.448-3.319-.448,14.931c0,7.574,12.114,15.925,14.281,29.123s-21.6,22.4-21.6,22.4,17.722-9.2,15.485-22.4S-8.951,28-8.951,20.208C-8.951,1.958-1.184-.089-1.184-.089Z" transform="translate(76.967 59.771) rotate(-5)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_46" data-name="Pfad 46" d="M7.767,71.822V66.456s-.448,3.319-.448-14.931C7.319,43.951,19.433,35.6,21.6,22.4S0,0,0,0,17.722,9.2,15.485,22.4,0,43.732,0,51.525C0,69.775,7.767,71.822,7.767,71.822Z" transform="translate(175.349 142.115) rotate(177)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_47" data-name="Pfad 47" d="M3.059,73.443l4.709-6.988s-.448,3.319-.448-14.931C7.319,43.951,19.433,35.6,21.6,22.4S0,0,0,0,17.722,9.2,15.485,22.4,0,43.732,0,51.525C0,69.775,3.059,73.443,3.059,73.443Z" transform="translate(186.137 135.356) rotate(169)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_49" data-name="Pfad 49" d="M3.059,49.09,7.767,44.42s-.448,2.219-.448-9.98c0-5.062,12.114-10.644,14.281-19.466S0,0,0,0,17.722,6.152,15.485,14.974,0,29.231,0,34.44C0,46.638,3.059,49.09,3.059,49.09Z" transform="matrix(-0.656, 0.755, -0.755, -0.656, 202.095, 90.414)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_50" data-name="Pfad 50" d="M3.059,31.4l4.709-2.987s-.448,1.419-.448-6.383c0-3.238,12.114-6.808,14.281-12.451S0,0,0,0,17.722,3.935,15.485,9.578,0,18.7,0,22.029C0,29.831,3.059,31.4,3.059,31.4Z" transform="translate(191.75 56.262) rotate(88)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_51" data-name="Pfad 51" d="M3.059,31.4l4.709-2.987s-.448,1.419-.448-6.383c0-3.238,12.114-6.808,14.281-12.451S0,0,0,0,17.722,3.935,15.485,9.578,0,18.7,0,22.029C0,29.831,3.059,31.4,3.059,31.4Z" transform="translate(192.508 52.803) rotate(126)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_52" data-name="Pfad 52" d="M-4.088,39.055,7.767,28.412s-.448,1.419-.448-6.383c0-3.238,12.114-6.808,14.281-12.451S0,0,0,0,17.722,3.935,15.485,9.578.874,21.305.874,24.637C.874,32.439-4.088,39.055-4.088,39.055Z" transform="translate(195.529 47.266) rotate(126)"/>
  <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" fill="rgba(255,255,255,0)"/>
</svg>`

const messyhair =`<svg id="messy_hair" data-name="messy hair" xmlns="http://www.w3.org/2000/svg" width="240" height="148.161" viewBox="0 0 240 148.161">
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_43" data-name="Pfad 43" d="M2.674,38.806a78.641,78.641,0,0,1,6.371-13.38c1-1.669-6.371.754-6.371.754S11.055,22.2,15.7,16.415a51.857,51.857,0,0,1,6.134-5.786c1.577-1.264-3.477,0-3.477,0s11.5-5.193,13.171-5.97C40.9.305,50.185,0,55.521,0A60.013,60.013,0,0,1,87.569,10.374c.927.63.891-2.217.891-2.217s.911,1.047,2.715,3.566l.036-1.349,1.663,3.815c.046.067.276.413.514.774.917.819,2.055,1.922,3.166,3.1,6.692,6.666,12.127,8.578,12.127,8.578l-6.458-1.485a132.054,132.054,0,0,1,6.458,13.653c2.811,7.741,3.648,16.252,3.862,24.068A120.75,120.75,0,0,0,114.52,79.71L111.762,71.8a96.348,96.348,0,0,0-2.016,12.448c-.77,7.509-2.922,17.421-2.922,17.421s.972-10.246.654-8.917c-.167.7-.411,1.685-.654,2.623-.526,2.026-1.951,4.847-2.941,10.414s-3.824,15.8-3.824,15.8,1.745-11.5.922-9.607c-3.463,7.958-5.955,15.8-9.806,21.941a64.717,64.717,0,0,1-12.017,14.232s1.614-4.18,3.825-11.053c.592-1.84-3.825,2.344-3.825,2.344s7.144-13.42,7.881-16.2c1.508-5.693,3.045-12.368,4.173-19.139.335-2.013.625-4.042.911-6.379.278-2.266-3.662,3.937-3.662,3.937a55.832,55.832,0,0,0,4.863-19.337,234.94,234.94,0,0,0-.332-25.467l5.5-3.016-7.281,1.68L75.714,51.7l3.569-7.724L74.8,51.7l6.031-16.8L74.235,51.321l2.1-9.282L73.29,51.7a138.706,138.706,0,0,1-14.518.986c-1.418-.044-19.3,4.184-19.3,4.184s9.97-4.248,7.97-4.184c-1.615.052-16.8,4.184-16.8,4.184l8.832-4.184s-14.8,4.659-17.663,7.523C18.082,63.931,17.025,72.1,17.475,82.3c.755,12.023,8.913,22.475,8.913,22.475s-7.809-10.355-7.45-7.839c.6,4.191,1.344,8.477,2.235,13.042,2.309,3.362,8.606,23.955,8.606,23.955s-5.91-9.5-5.468-7.549c3.452,15.251,6.329,21.782,6.329,21.782s-5.109-2.63-10.416-10.965-4.729-10.816-4.729-10.816l1.569,7.549-6.471-14.9,2.059,6.667s-2.311-3.225-5.2-10.785c-.262-.688-1.184-3.514-1.184-3.514v6.084s-1.926-11.71-3.6-17.4C1.342,95.549-.15,89.731-.15,89.731v9.144S-2.13,81.464-2.29,79.916a94.218,94.218,0,0,1-.137-17.238c.183-2.294-4.324,5-4.324,5A95.276,95.276,0,0,0,.241,46.645,78.87,78.87,0,0,1,2.674,38.806Z" transform="translate(65)"/>
  <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" fill="rgba(255,255,255,0)"/>
</svg>`

const narutouzumaki =`<svg id="naruto" xmlns="http://www.w3.org/2000/svg" width="240" height="92.669" viewBox="0 0 240 92.669">
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_42" data-name="Pfad 42" d="M7.324,13.007l15.4,5.043,2.124-13.8,16.192,6.968L48.29.449,61.748,11.215l9.421-8.523L74.757,15.7l15.7-8.972L88.215,19.738l16.15-4.037-3.589,15.7,11.215,5.832-7.626,7.626,9.421,8.972-9.421,4.935-2.832,33.9L94.465,61.256V75.078l-9.11-21.989L88.5,73.507,74.517,44.86,67.234,65.219,59.643,40.374,51.706,58.766,46.047,42.1l-6.763,21.05L31,42.1,20.649,69.36,18.234,49,12.712,73.507,9.952,58.766l-6.344,33.9L2.319,59.575-12.319,49,2.319,42.1-6.214,28.933H8.651Z" transform="translate(67)"/>
  <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" fill="rgba(255,255,255,0)"/>
</svg>`

const sasuke =`<svg id="sasuke" xmlns="http://www.w3.org/2000/svg" width="240" height="147.875" viewBox="0 0 240 147.875">
  <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" fill="rgba(255,255,255,0)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Pfad_41" data-name="Pfad 41" d="M1.047,35.69C3.179,27.733,14.521,0,50.146,0S97.312,25.658,100,35.69s8.451,47.364,8.451,47.364l-5.325-8.2-1.346,40.551L98.111,100.4,96.22,110.41,92.44,130.419,85.1,100.4l-6.338,45.03S71.176,126.25,66.089,107.4a347.4,347.4,0,0,1-7.672-37.358S56.75,83.472,56.75,91.06v13.676S47.661,83.722,40.072,68.045A231.949,231.949,0,0,1,28.064,37.691S22.477,58.955,17.391,83.055s-1.763,64.82-1.763,64.82l-4.934-17.281L5.383,145.429a101.274,101.274,0,0,1-1.749-10.763,79.367,79.367,0,0,1-.7-10.169l-5.676,11.383s-.167-6.965,0-13.057.666-11.311.666-11.311l-5.916,9.9s.162-6.959,1.734-19.079a108.168,108.168,0,0,1,2.635-14.61L-10.961,98.4S-1.085,43.648,1.047,35.69Z" transform="translate(70)"/>
</svg>`

const geschmiert =`<svg id="geschmiert" xmlns="http://www.w3.org/2000/svg" width="240" height="83.328" viewBox="0 0 240 83.328">
  <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" fill="rgba(255,255,255,0)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Pfad_33" data-name="Pfad 33" d="M17.513,4.737C27.847,2.566,29.4,2.171,41.395,2.171s13.137.466,24.079,2.566C85.013,8.487,96.5,14.932,96.5,34.412s-5.992,48.916-5.992,48.916l-8.1-33.788s-1.683,9.23-2.129,12.237,2.129,7.5,2.129,7.5-10.6-6.852-15.735-13.224A57.863,57.863,0,0,1,58.929,43.4s4.529,13.439,4.686,13.854c2.75,7.284,14.058,15.28,14.058,15.28S63.6,65.4,58.308,58.118,48.742,43.4,48.742,43.4L66.671,72.53,30,42.581s7.314,5.985,14.752,13.472A41.412,41.412,0,0,1,54.618,72.53s-3.748-8-16.382-15.28C38.111,57.177,9.217,43.4,9.217,43.4s3.1.246,8.3,4.841,6.158,12.178,6.158,12.178-5.005-6.908-13.46-7.836S-1.434,49.539-1.434,49.539L-8.508,83.328s-6.348-28.084-6.348-48.916S-5.974,9.671,17.513,4.737Z" transform="translate(79)"/>
</svg>`

const zorro =`<svg id="zorro" xmlns="http://www.w3.org/2000/svg" width="240" height="103" viewBox="0 0 240 103">
  <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" fill="rgba(255,255,255,0)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Pfad_34" data-name="Pfad 34" d="M13.607-3.721a137.1,137.1,0,0,1,7.538-12.161l1.292,5.976s4.567-3.793,5.975-4.669A61.51,61.51,0,0,0,33.648-19.2s-.531,1.521,1.366,1.394c-.03.014,2.48-.876,2.759-.962C39.255-19.223,43.061-20,43.061-20s-.413,1.439,2.277,1.215C48.544-19.053,55.207-20,55.207-20s-2.251,1.237,0,1.215A73.332,73.332,0,0,0,62.646-20a11.5,11.5,0,0,0,5.314,1.974c.993.043-1.524-1.769-1.524-1.769s6.005,2.367,7.65,2.541l5.49-2.541S77.321-17.2,78.5-17.255,82.812-19.8,82.812-19.8s-1.182,2.094.49,2.541c.937.25,4.706-2.541,4.706-2.541l2.843,3.913s1.058,1.651,2.463.74a7.62,7.62,0,0,0,2.277-2.885S97.543-15.2,97.7-13.168a3.988,3.988,0,0,1-1.48,3.262c.689.7,6.963-1.743,6.963-1.743s-2.9,6.614-1.986,7.929a3.461,3.461,0,0,0,2.745,0,16.516,16.516,0,0,0,2.885-3.41v5.046a11.144,11.144,0,0,1-1.26,4.555s2.351.38,3.651-.759a15.6,15.6,0,0,0,2.619-3.8,20.339,20.339,0,0,1-.766,6.528,6.661,6.661,0,0,1-3.03,3.492l5.466,2.459s-4.751.8-4.289,2.785a4.79,4.79,0,0,0,1.853,3.713,19.514,19.514,0,0,1,3.347,3.188s-4.116-.711-3.967.6c.106.919.221,2.159.316,3.416.111,1.459,2.74,10.41,2.74,10.41s-1.467-3.357-2.436-3.036c-.224.039.005,2.234,0,3.036-.01,1.566,2.436,11.842,2.436,11.842s-2.29-4.557-2.436-2.87c-.128,1.489,2.436,10.009,2.436,10.009s-3.19-3.184-3.364-1.946c-.932,6.646-2.1,11.46-2.1,11.46l-2.475,14.3h-2.383l2.383-19.418-2.383-5.01,2.383.611s-3.381-1.4-4.813-8.506c-.474-2.353,1.178-6.442.759-11.842s-.759-8.2-.759-8.2l-1.605-3.6-.7-.245.491-.6L97.7,19.873l.958-.794-28.269.794a15.221,15.221,0,0,1,.759,2.386c.342,1.439.607,3.37.607,3.37a20.491,20.491,0,0,0-2.885-3.37,20.67,20.67,0,0,0-3.644-2.551,8.873,8.873,0,0,1,.607,3.257,20.777,20.777,0,0,1-.607,4.251,32.194,32.194,0,0,0-2.581-4.251,8.769,8.769,0,0,0-2.467-2.276l-3.15.4-3.48-.521-5.326,7.251a25.657,25.657,0,0,1,0-4.1,22.237,22.237,0,0,1,.759-3.852l-3.644-.165-3.75,5.922s.592-.714,0-3.37,0-2.923,0-2.923L18.427,17.795l.8,1.169-1.276.744.9.372-1.312.775s-1.184,7.4-1.184,9.671c0,6.4,1.481,9.395,1.184,12.753-.117,1.323-2.364,3.477-2.262,5.041s2.671,1.215,2.671,1.215l-4.341,2.7h2.748l-4.934,2.611L12.8,77.3H10.632L8.461,63,6.1,49.535,3.67,53.485s.868-6.2,1.158-11.314c.085-1.5-1.158,1.108-1.158,1.108s.613-5,1.185-7.561L2.98,38.148a22.566,22.566,0,0,1,.69-5.01c.621-1.984,1.173-2.384,1.185-2.927.012-.559-1.9-1.583-2.786-4.209a15.578,15.578,0,0,1-.759-5.147l3.545,2.869S3.223,21.447,2.98,15.132A93.231,93.231,0,0,1,3.67,1.711,15.984,15.984,0,0,0,4.855,6.25c.852,1.579,2.224,4.145,2.224,4.145S11.176,1.072,13.607-3.721Z" transform="translate(62 20)"/>
  <path id="Pfad_37" data-name="Pfad 37" d="M-.457,8.6s.278.063.8.625C.869,9.831,2.979,11.184,9.137,9c6.672-2.4,16.78-9.684,16.78-9.684A24.242,24.242,0,0,1,29.978,1.1a4.471,4.471,0,0,1,1.964,2.321A22.339,22.339,0,0,0,28.773,1.1,9.708,9.708,0,0,0,25.917.027s-4.954,3.7-10.532,7.185c-9.059,5.444-13.433,3.7-13.433,3.7L3.2,12.433A10.592,10.592,0,0,1,.837,10.916,5.971,5.971,0,0,1-.457,8.6Z" transform="translate(128 72)"/>
  <path id="Pfad_38" data-name="Pfad 38" d="M4.173.734C6.1.628,8.326,1.969,13.732,1.79c2.655-.088,4.6-1.436,7.367-1.9a8.616,8.616,0,0,1,3.961.238V.734a10.654,10.654,0,0,0-4.093.423c-1.836.484-4.806,1.8-6.734,2.086C11.171,3.507,8.3,2.167,5.177,1.79a10.267,10.267,0,0,0-4.489.158A7.421,7.421,0,0,1,4.173.734Z" transform="translate(131 83)"/>
  <path id="Pfad_39" data-name="Pfad 39" d="M.672-.3,1.2-.437s1.59,15.7.835,27.481S1.2,47,1.2,47H.672s-.4-11.951.531-23.612A136.234,136.234,0,0,0,.672-.3Z" transform="translate(143.287 56)"/>
</svg>`

const robertsmith =`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="103.35" viewBox="0 0 240 103.35">
  <g id="robert_smith" data-name="robert smith" transform="translate(0 0.143)">
    <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" fill="rgba(255,255,255,0)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_1" data-name="Pfad 1" d="M15.056-3.44H28.1S41.28,8.9,47.086,26.677s4.234,40.987,4.234,40.987S48.774,44.489,39.708,26.713,15.056-3.44,15.056-3.44Z" transform="translate(108 34)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_6" data-name="Pfad 6" d="M15.056-3.44H28.1S34.373,5.642,40.18,23.417,44.414,64.4,44.414,64.4,41.868,41.229,32.8,23.453,15.056-3.44,15.056-3.44Z" transform="translate(120 34)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_9" data-name="Pfad 9" d="M15.056-3.44,28.434,3.691a266.562,266.562,0,0,0,7.538,27.3A77.271,77.271,0,0,0,48.4,54.014S35.854,44.591,28.434,30.992,15.056-3.44,15.056-3.44Z" transform="translate(130.683 34)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_13" data-name="Pfad 13" d="M15.056-3.44,28.434.5A100.963,100.963,0,0,0,35.973,15.6,45.9,45.9,0,0,0,48.4,28.324S35.854,23.115,28.434,15.6,15.056-3.44,15.056-3.44Z" transform="translate(143.564 65.84) rotate(-11)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_14" data-name="Pfad 14" d="M15.056-3.44,28.434.5A100.963,100.963,0,0,0,35.973,15.6,45.9,45.9,0,0,0,48.4,28.324S35.854,23.115,28.434,15.6,15.056-3.44,15.056-3.44Z" transform="translate(178.036 80.124) rotate(-102)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Pfad_15" data-name="Pfad 15" d="M15.056-3.44,28.434.5A100.963,100.963,0,0,0,35.973,15.6,45.9,45.9,0,0,0,48.4,28.324S35.854,23.115,28.434,15.6,15.056-3.44,15.056-3.44Z" transform="translate(179.007 73.384) rotate(-112)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_16" data-name="Pfad 16" d="M15.056-3.44,28.434.5A100.963,100.963,0,0,0,35.973,15.6,45.9,45.9,0,0,0,48.4,28.324S35.854,23.115,28.434,15.6,15.056-3.44,15.056-3.44Z" transform="translate(179.007 60.971) rotate(-112)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_17" data-name="Pfad 17" d="M0,31.764l13.378-3.942a100.963,100.963,0,0,1,7.538-15.093A45.9,45.9,0,0,1,33.344,0S20.8,5.21,13.378,12.728,0,31.764,0,31.764Z" transform="translate(159.476 4.904) rotate(7)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_18" data-name="Pfad 18" d="M0,31.764l13.378-3.942a100.963,100.963,0,0,1,7.538-15.093A45.9,45.9,0,0,1,33.344,0S20.8,5.21,13.378,12.728,0,31.764,0,31.764Z" transform="translate(147.671 9.314) rotate(-11)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_19" data-name="Pfad 19" d="M0,41.706,17.708,36.53a132.116,132.116,0,0,1,9.978-19.818C33.956,6.581,44.136,0,44.136,0S27.529,6.84,17.708,16.712,0,41.706,0,41.706Z" transform="matrix(0.438, -0.899, 0.899, 0.438, 30.015, 42.693)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_20" data-name="Pfad 20" d="M0,31.337l11.748-3.889a105.287,105.287,0,0,1,6.62-14.89A42.971,42.971,0,0,1,29.281,0S18.263,5.139,11.748,12.557,0,31.337,0,31.337Z" transform="matrix(0.438, -0.899, 0.899, 0.438, 44.16, 36.851)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_22" data-name="Pfad 22" d="M1.4,3.147,18.118.007s-5.93-.686.976,11.768S32.406,27.488,32.406,27.488a38.876,38.876,0,0,1-25.7-12.533C-4.107,2.819,1.4,3.147,1.4,3.147Z" transform="translate(80.198 39.996) rotate(-166)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_23" data-name="Pfad 23" d="M-2.913.747l8.963.581s-4.982-8.854,1.924,3.6S26,10.143,26,10.143s-11.948,14.532-22.764,2.4S-2.913.747-2.913.747Z" transform="matrix(0.309, 0.951, -0.951, 0.309, 67.809, 57.705)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_21" data-name="Pfad 21" d="M5.8,9.736l5.952-5.847a105.287,105.287,0,0,0,6.62,14.89A42.971,42.971,0,0,0,29.281,31.336S18.263,26.2,11.748,18.78,5.8,9.736,5.8,9.736Z" transform="matrix(-0.94, 0.342, -0.342, -0.94, 79.953, 64.773)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Pfad_5" data-name="Pfad 5" d="M51.515-3.44H38.476S40.433,5,34.627,22.781s-4.234,40.987-4.234,40.987,2.547-23.175,11.613-40.951S51.515-3.44,51.515-3.44Z" transform="translate(56.65 39.44)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_10" data-name="Pfad 10" d="M51.515-3.44,31.037-2.2s8.439,8.9,2.632,26.674A30.424,30.424,0,0,1,11.462,45.049s21.494-2.8,30.56-20.577S51.515-3.44,51.515-3.44Z" transform="translate(45.992 39.908)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_2" data-name="Pfad 2" d="M12.783,2.02,29.546-3.867s6.041.655,10.49,13.726S39.2,38.975,39.2,38.975s1.688-7.172-5.258-20.243S12.783,2.02,12.783,2.02Z" transform="translate(108.537 27.579) rotate(24)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_3" data-name="Pfad 3" d="M2.926,48.483l7.951,3.54A60.509,60.509,0,0,0,24.54,30.139c4.449-13.071,16.322-25,16.322-25S25.833,17.041,18.887,30.112,2.926,48.483,2.926,48.483Z" transform="matrix(-0.914, 0.407, -0.407, -0.914, 142.285, 78.04)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_4" data-name="Pfad 4" d="M-2.656,43.933H4.229s9.92-7.358,12.986-18.584,6.712-15.076,6.712-15.076S18.107,14.1,13.319,25.326-2.656,43.933-2.656,43.933Z" transform="matrix(-0.914, 0.407, -0.407, -0.914, 128.905, 74.653)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_7" data-name="Pfad 7" d="M3.382,2.747l9.779-4.278L10.105,13.138S4.38,16.092,1.345,25.973,0,52.255,0,52.255-1.915,51.261-1.915,38.2,3.382,2.747,3.382,2.747Z" transform="translate(72 38)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_8" data-name="Pfad 8" d="M7.864,2.747-1.915-1.531,1.141,13.138S6.866,16.092,9.9,25.973s1.345,26.282,1.345,26.282,1.915-.994,1.915-14.058S7.864,2.747,7.864,2.747Z" transform="translate(156.523 38)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_11" data-name="Pfad 11" d="M19.511,17.048C33.476-4.623,68.079-3.1,68.079-3.1V27.042L25.216,39.267l-5.7,17.725L18.289,68.6v7.131S5.546,38.718,19.511,17.048Z" transform="translate(52 8)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_12" data-name="Pfad 12" d="M49.414,18.664C35.949-3.048,0-3.1,0-3.1v30.16l42.679,12.2,5.7,17.725,1.03,10.077-.22,10.746S62.878,40.375,49.414,18.664Z" transform="translate(120 8)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_24" data-name="Pfad 24" d="M11.729,10.7s3.05-4.143,7.17,2.235,6.077,18.676,6.077,18.676.689-.181-10.128-12.317S11.729,10.7,11.729,10.7Z" transform="translate(89.035 38.188) rotate(-166)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_32" data-name="Pfad 32" d="M.574.946,6.426-.394s.811-1.767,5.547,5.949S9.247,25.221,9.247,25.221s4.222-6.624-3.2-14.142S.574.946.574.946Z" transform="translate(90.742 25.221) rotate(-180)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_27" data-name="Pfad 27" d="M5.513,25.126s6.52-3.463,6.316-12.428S4.291,2.919,4.291,2.919s4.278,3.056,1.222,8.353S5.513,25.126,5.513,25.126Z" transform="translate(161.425 1.822) rotate(90)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_29" data-name="Pfad 29" d="M8.863-1.845V10.627A10.521,10.521,0,0,1,.609,21.216s2.037-4.1,2.037-14.694S8.863-1.845,8.863-1.845Z" transform="translate(119.581 -0.609) rotate(90)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_30" data-name="Pfad 30" d="M7.859-2.078s-1.952,4.989,4.125,12.7S2.97,23.389,2.97,23.389s9.168-2.372,2.649-14.873S7.859-2.078,7.859-2.078Z" transform="matrix(-0.105, 0.995, -0.995, -0.105, 108.514, -0.652)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_31" data-name="Pfad 31" d="M-1.292-1.517A52.411,52.411,0,0,1,8.863,10.627C13.6,18.343,2,27.4,2,27.4s7.933-9.63.514-17.149S-1.292-1.517-1.292-1.517Z" transform="translate(101.276 6.433) rotate(99)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_26" data-name="Pfad 26" d="M-6.613,11.441S7.313,24.067,10.909,15.516A17.292,17.292,0,0,0,9.89.032,29.524,29.524,0,0,1,.111,9.811C-6.205,13.479-6.613,11.441-6.613,11.441Z" transform="translate(152.895 3.024)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="Pfad_28" data-name="Pfad 28" d="M4.267,18.376s3.5-1.552,7.1-10.1,2.649-24.448,2.649-24.448S8.6,1.225,7.9,2.61C6.929,4.525,4.053,13.185,2.042,15.222Z" transform="translate(122.729 14.421) rotate(-90)"/>
  </g>
</svg>`

const braids = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="112.187" viewBox="0 0 240 112.187">
  <g id="braids" transform="translate(0 -10)">
    <rect id="Rectangle_32" data-name="Rectangle 32" width="240" height="72" transform="translate(0 10)" fill="rgba(255,255,255,0)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_13" data-name="Ellipse 13" cx="3" cy="3" r="3" transform="translate(114 44)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_301" data-name="Ellipse 301" cx="3" cy="3" r="3" transform="translate(114 49)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_302" data-name="Ellipse 302" cx="3" cy="3" r="3" transform="translate(113 53)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_303" data-name="Ellipse 303" cx="3" cy="3" r="3" transform="translate(111 57)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_304" data-name="Ellipse 304" cx="3" cy="3" r="3" transform="translate(110 61)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_305" data-name="Ellipse 305" cx="3" cy="3" r="3" transform="translate(110 65)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_306" data-name="Ellipse 306" cx="3" cy="3" r="3" transform="translate(109 69)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_307" data-name="Ellipse 307" cx="3" cy="3" r="3" transform="translate(108 72)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_308" data-name="Ellipse 308" cx="3" cy="3" r="3" transform="translate(106 76)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_300" data-name="Ellipse 300" cx="3" cy="3" r="3" transform="translate(118.619 44)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_108" data-name="Ellipse 108" cx="3" cy="3" r="3" transform="translate(113.474 34.58) rotate(9)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_299" data-name="Ellipse 299" cx="3" cy="3" rx="3" ry="3" transform="translate(126.084 40.507) rotate(171)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_156" data-name="Ellipse 156" cx="3" cy="3" r="3" transform="matrix(0.961, 0.276, -0.276, 0.961, 114.224, 24.622)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_298" data-name="Ellipse 298" cx="3" cy="3" r="3" transform="translate(126.049 30.39) rotate(164)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_60" data-name="Ellipse 60" cx="3" cy="3" r="3" transform="matrix(0.998, 0.07, -0.07, 0.998, 113.669, 39.756)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_297" data-name="Ellipse 297" cx="3" cy="3" r="3" transform="matrix(-0.998, 0.07, -0.07, -0.998, 125.369, 45.741)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_107" data-name="Ellipse 107" cx="3" cy="3" r="3" transform="matrix(0.974, 0.225, -0.225, 0.974, 113.811, 30.336)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_296" data-name="Ellipse 296" cx="3" cy="3" rx="3" ry="3" transform="translate(126.158 36.183) rotate(167)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_155" data-name="Ellipse 155" cx="3" cy="3" r="3" transform="matrix(0.94, 0.342, -0.342, 0.94, 115.076, 20.451)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_295" data-name="Ellipse 295" cx="3" cy="3" r="3" transform="translate(125.596 26.089) rotate(160)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_28" data-name="Ellipse 28" cx="3" cy="3" r="3" transform="translate(83.269 61.773) rotate(-33)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_294" data-name="Ellipse 294" cx="3" cy="3" r="3" transform="matrix(-0.839, -0.545, 0.545, -0.839, 152.082, 66.805)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_106" data-name="Ellipse 106" cx="3" cy="3" r="3" transform="translate(80.341 47.327) rotate(-24)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_293" data-name="Ellipse 293" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.914, -0.407, 0.407, -0.914, 155.837, 52.808)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_154" data-name="Ellipse 154" cx="3" cy="3" r="3" transform="translate(79.785 33.236) rotate(-17)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_292" data-name="Ellipse 292" cx="3" cy="3" rx="3" ry="3" transform="translate(157.08 38.974) rotate(-163)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_59" data-name="Ellipse 59" cx="3" cy="3" r="3" transform="translate(81.773 55.341) rotate(-29)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_291" data-name="Ellipse 291" cx="3" cy="3" r="3" transform="matrix(-0.875, -0.485, 0.485, -0.875, 153.937, 60.589)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_105" data-name="Ellipse 105" cx="3" cy="3" r="3" transform="matrix(0.94, -0.342, 0.342, 0.94, 79.87, 40.74)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_290" data-name="Ellipse 290" cx="3" cy="3" rx="3" ry="3" transform="translate(156.697 46.379) rotate(-160)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_153" data-name="Ellipse 153" cx="3" cy="3" r="3" transform="matrix(0.974, -0.225, 0.225, 0.974, 80.119, 26.641)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_289" data-name="Ellipse 289" cx="3" cy="3" rx="3" ry="3" transform="translate(157.15 32.487) rotate(-167)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_36" data-name="Ellipse 36" cx="3" cy="3" r="3" transform="matrix(0.602, -0.799, 0.799, 0.602, 66.535, 90.309)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_288" data-name="Ellipse 288" cx="3" cy="3" r="3" transform="matrix(-0.602, -0.799, 0.799, -0.602, 167.292, 93.92)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_104" data-name="Ellipse 104" cx="3" cy="3" r="3" transform="translate(59.349 72.894) rotate(-44)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_287" data-name="Ellipse 287" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.719, -0.695, 0.695, -0.719, 175.102, 77.21)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_152" data-name="Ellipse 152" cx="3" cy="3" r="3" transform="matrix(0.799, -0.602, 0.602, 0.799, 55.833, 56.054)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_286" data-name="Ellipse 286" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.799, -0.602, 0.602, -0.799, 179.175, 60.846)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_58" data-name="Ellipse 58" cx="3" cy="3" r="3" transform="translate(63.089 82.64) rotate(-49)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_285" data-name="Ellipse 285" cx="3" cy="3" r="3" transform="translate(171.001 86.577) rotate(-131)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_103" data-name="Ellipse 103" cx="3" cy="3" r="3" transform="matrix(0.766, -0.643, 0.643, 0.766, 57.146, 64.781)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_284" data-name="Ellipse 284" cx="3" cy="3" rx="3" ry="3" transform="translate(177.617 69.377) rotate(-140)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_151" data-name="Ellipse 151" cx="3" cy="3" r="3" transform="matrix(0.839, -0.545, 0.545, 0.839, 54.635, 47.733)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_283" data-name="Ellipse 283" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.839, -0.545, 0.545, -0.839, 180.717, 52.765)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_20" data-name="Ellipse 20" cx="3" cy="3" r="3" transform="translate(97.991 50.519) rotate(-11)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_282" data-name="Ellipse 282" cx="3" cy="3" rx="3" ry="3" transform="translate(139.483 56.409) rotate(-169)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_102" data-name="Ellipse 102" cx="3" cy="3" r="3" transform="matrix(0.999, -0.035, 0.035, 0.999, 96.642, 38.515)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_281" data-name="Ellipse 281" cx="3" cy="3" r="3" transform="matrix(-0.999, -0.035, 0.035, -0.999, 141.768, 44.512)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_150" data-name="Ellipse 150" cx="3" cy="3" r="3" transform="translate(97.038 26.476) rotate(5)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_280" data-name="Ellipse 280" cx="3" cy="3" r="3" transform="matrix(-0.996, 0.087, -0.087, -0.996, 142.104, 32.454)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_57" data-name="Ellipse 57" cx="3" cy="3" r="3" transform="translate(97.244 45.142) rotate(-7)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_279" data-name="Ellipse 279" cx="3" cy="3" rx="3" ry="3" transform="translate(140.644 51.098) rotate(-173)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_101" data-name="Ellipse 101" cx="3" cy="3" r="3" transform="translate(96.746 33.087) rotate(2)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_278" data-name="Ellipse 278" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.999, 0.035, -0.035, -0.999, 142.083, 39.084)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_149" data-name="Ellipse 149" cx="3" cy="3" r="3" transform="translate(97.802 21.102) rotate(9)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_277" data-name="Ellipse 277" cx="3" cy="3" rx="3" ry="3" transform="translate(141.756 27.028) rotate(171)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_27" data-name="Ellipse 27" cx="3" cy="3" r="3" transform="matrix(0.719, -0.695, 0.695, 0.719, 73.393, 75.959)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_276" data-name="Ellipse 276" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.719, -0.695, 0.695, -0.719, 161.058, 80.275)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_100" data-name="Ellipse 100" cx="3" cy="3" r="3" transform="translate(68.368 59.794) rotate(-35)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_275" data-name="Ellipse 275" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.819, -0.574, 0.574, -0.819, 166.81, 64.709)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_148" data-name="Ellipse 148" cx="3" cy="3" r="3" transform="translate(66.381 44.151) rotate(-28)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_274" data-name="Ellipse 274" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.883, -0.469, 0.469, -0.883, 169.421, 49.449)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_56" data-name="Ellipse 56" cx="3" cy="3" r="3" transform="translate(70.932 68.804) rotate(-40)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_273" data-name="Ellipse 273" cx="3" cy="3" rx="3" ry="3" transform="translate(163.83 73.401) rotate(-140)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_99" data-name="Ellipse 99" cx="3" cy="3" r="3" transform="translate(67.056 52.342) rotate(-31)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_272" data-name="Ellipse 272" cx="3" cy="3" rx="3" ry="3" transform="translate(168.473 57.485) rotate(-149)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_147" data-name="Ellipse 147" cx="3" cy="3" r="3" transform="translate(65.987 36.595) rotate(-24)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_271" data-name="Ellipse 271" cx="3" cy="3" r="3" transform="matrix(-0.914, -0.407, 0.407, -0.914, 170.192, 42.076)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_35" data-name="Ellipse 35" cx="3" cy="3" r="3" transform="translate(62.107 107.018) rotate(-64)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_270" data-name="Ellipse 270" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.438, -0.899, 0.899, -0.438, 171.119, 109.648)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_98" data-name="Ellipse 98" cx="3" cy="3" r="3" transform="matrix(0.574, -0.819, 0.819, 0.574, 52.362, 88.704)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_269" data-name="Ellipse 269" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.574, -0.819, 0.819, -0.574, 181.342, 92.146)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_146" data-name="Ellipse 146" cx="3" cy="3" r="3" transform="matrix(0.669, -0.743, 0.743, 0.669, 46.971, 70.895)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_268" data-name="Ellipse 268" cx="3" cy="3" rx="3" ry="3" transform="translate(187.189 74.91) rotate(-132)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_55" data-name="Ellipse 55" cx="3" cy="3" r="3" transform="matrix(0.5, -0.866, 0.866, 0.5, 57.507, 99)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_267" data-name="Ellipse 267" cx="3" cy="3" rx="3" ry="3" transform="translate(175.916 102) rotate(-120)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_97" data-name="Ellipse 97" cx="3" cy="3" r="3" transform="translate(49.073 80.065) rotate(-51)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_266" data-name="Ellipse 266" cx="3" cy="3" rx="3" ry="3" transform="translate(184.884 83.841) rotate(-129)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_145" data-name="Ellipse 145" cx="3" cy="3" r="3" transform="matrix(0.719, -0.695, 0.695, 0.719, 44.759, 61.92)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_265" data-name="Ellipse 265" cx="3" cy="3" r="3" transform="matrix(-0.719, -0.695, 0.695, -0.719, 189.692, 66.236)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_14" data-name="Ellipse 14" cx="3" cy="3" r="3" transform="translate(110 45)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_264" data-name="Ellipse 264" cx="3" cy="3" r="3" transform="translate(122.619 45)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_96" data-name="Ellipse 96" cx="3" cy="3" r="3" transform="translate(109.367 34.942) rotate(9)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_263" data-name="Ellipse 263" cx="3" cy="3" rx="3" ry="3" transform="translate(130.191 40.868) rotate(171)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_144" data-name="Ellipse 144" cx="3" cy="3" r="3" transform="matrix(0.961, 0.276, -0.276, 0.961, 110.103, 24.481)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_262" data-name="Ellipse 262" cx="3" cy="3" r="3" transform="translate(130.17 30.249) rotate(164)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_54" data-name="Ellipse 54" cx="3" cy="3" r="3" transform="matrix(0.998, 0.07, -0.07, 0.998, 109.609, 40.474)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_261" data-name="Ellipse 261" cx="3" cy="3" r="3" transform="matrix(-0.998, 0.07, -0.07, -0.998, 129.429, 46.459)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_95" data-name="Ellipse 95" cx="3" cy="3" r="3" transform="matrix(0.974, 0.225, -0.225, 0.974, 109.689, 30.411)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_260" data-name="Ellipse 260" cx="3" cy="3" rx="3" ry="3" transform="translate(130.28 36.257) rotate(167)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_143" data-name="Ellipse 143" cx="3" cy="3" r="3" transform="matrix(0.94, 0.342, -0.342, 0.94, 110.975, 20.023)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_259" data-name="Ellipse 259" cx="3" cy="3" r="3" transform="translate(129.697 25.661) rotate(160)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_26" data-name="Ellipse 26" cx="3" cy="3" r="3" transform="translate(80.459 64.79) rotate(-33)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_258" data-name="Ellipse 258" cx="3" cy="3" r="3" transform="matrix(-0.839, -0.545, 0.545, -0.839, 154.892, 69.822)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_94" data-name="Ellipse 94" cx="3" cy="3" r="3" transform="translate(77.094 49.867) rotate(-24)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_257" data-name="Ellipse 257" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.914, -0.407, 0.407, -0.914, 159.085, 55.348)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_142" data-name="Ellipse 142" cx="3" cy="3" r="3" transform="translate(76.252 35.362) rotate(-17)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_256" data-name="Ellipse 256" cx="3" cy="3" rx="3" ry="3" transform="translate(160.613 41.099) rotate(-163)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_53" data-name="Ellipse 53" cx="3" cy="3" r="3" transform="translate(78.76 58.155) rotate(-29)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_255" data-name="Ellipse 255" cx="3" cy="3" r="3" transform="matrix(-0.875, -0.485, 0.485, -0.875, 156.951, 63.403)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_93" data-name="Ellipse 93" cx="3" cy="3" r="3" transform="matrix(0.94, -0.342, 0.342, 0.94, 76.453, 43.048)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_254" data-name="Ellipse 254" cx="3" cy="3" rx="3" ry="3" transform="translate(160.114 48.686) rotate(-160)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_141" data-name="Ellipse 141" cx="3" cy="3" r="3" transform="matrix(0.974, -0.225, 0.225, 0.974, 76.447, 28.515)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_253" data-name="Ellipse 253" cx="3" cy="3" rx="3" ry="3" transform="translate(160.823 34.362) rotate(-167)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_34" data-name="Ellipse 34" cx="3" cy="3" r="3" transform="matrix(0.602, -0.799, 0.799, 0.602, 64.926, 94.105)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_252" data-name="Ellipse 252" cx="3" cy="3" r="3" transform="matrix(-0.602, -0.799, 0.799, -0.602, 168.901, 97.716)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_92" data-name="Ellipse 92" cx="3" cy="3" r="3" transform="translate(57.167 76.392) rotate(-44)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_251" data-name="Ellipse 251" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.719, -0.695, 0.695, -0.719, 177.285, 80.708)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_140" data-name="Ellipse 140" cx="3" cy="3" r="3" transform="matrix(0.799, -0.602, 0.602, 0.799, 53.24, 59.26)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_250" data-name="Ellipse 250" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.799, -0.602, 0.602, -0.799, 181.768, 64.052)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_52" data-name="Ellipse 52" cx="3" cy="3" r="3" transform="translate(61.22 86.315) rotate(-49)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_249" data-name="Ellipse 249" cx="3" cy="3" r="3" transform="translate(172.871 90.252) rotate(-131)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_91" data-name="Ellipse 91" cx="3" cy="3" r="3" transform="matrix(0.766, -0.643, 0.643, 0.766, 54.724, 68.118)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_248" data-name="Ellipse 248" cx="3" cy="3" rx="3" ry="3" transform="translate(180.038 72.714) rotate(-140)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_139" data-name="Ellipse 139" cx="3" cy="3" r="3" transform="matrix(0.839, -0.545, 0.545, 0.839, 51.825, 50.75)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_247" data-name="Ellipse 247" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.839, -0.545, 0.545, -0.839, 183.527, 55.782)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_19" data-name="Ellipse 19" cx="3" cy="3" r="3" transform="translate(94.255 52.264) rotate(-11)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_246" data-name="Ellipse 246" cx="3" cy="3" rx="3" ry="3" transform="translate(143.219 58.154) rotate(-169)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_90" data-name="Ellipse 90" cx="3" cy="3" r="3" transform="matrix(0.999, -0.035, 0.035, 0.999, 92.68, 39.654)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_245" data-name="Ellipse 245" cx="3" cy="3" r="3" transform="matrix(-0.999, -0.035, 0.035, -0.999, 145.73, 45.65)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_138" data-name="Ellipse 138" cx="3" cy="3" r="3" transform="translate(92.966 27.124) rotate(5)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_244" data-name="Ellipse 244" cx="3" cy="3" r="3" transform="matrix(-0.996, 0.087, -0.087, -0.996, 146.176, 33.101)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_51" data-name="Ellipse 51" cx="3" cy="3" r="3" transform="translate(93.396 46.622) rotate(-7)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_243" data-name="Ellipse 243" cx="3" cy="3" rx="3" ry="3" transform="translate(144.492 52.578) rotate(-173)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_89" data-name="Ellipse 89" cx="3" cy="3" r="3" transform="translate(92.713 33.947) rotate(2)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_242" data-name="Ellipse 242" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.999, 0.035, -0.035, -0.999, 146.115, 39.944)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_137" data-name="Ellipse 137" cx="3" cy="3" r="3" transform="translate(93.695 21.464) rotate(9)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_241" data-name="Ellipse 241" cx="3" cy="3" rx="3" ry="3" transform="translate(145.863 27.39) rotate(171)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_25" data-name="Ellipse 25" cx="3" cy="3" r="3" transform="matrix(0.719, -0.695, 0.695, 0.719, 71.211, 79.457)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_240" data-name="Ellipse 240" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.719, -0.695, 0.695, -0.719, 163.241, 83.773)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_88" data-name="Ellipse 88" cx="3" cy="3" r="3" transform="translate(65.665 62.908) rotate(-35)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_239" data-name="Ellipse 239" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.819, -0.574, 0.574, -0.819, 169.513, 67.822)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_136" data-name="Ellipse 136" cx="3" cy="3" r="3" transform="translate(63.319 46.912) rotate(-28)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_238" data-name="Ellipse 238" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.883, -0.469, 0.469, -0.883, 172.484, 52.209)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_50" data-name="Ellipse 50" cx="3" cy="3" r="3" transform="translate(68.511 72.142) rotate(-40)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_237" data-name="Ellipse 237" cx="3" cy="3" rx="3" ry="3" transform="translate(166.252 76.738) rotate(-140)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_87" data-name="Ellipse 87" cx="3" cy="3" r="3" transform="translate(64.142 55.259) rotate(-31)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_236" data-name="Ellipse 236" cx="3" cy="3" rx="3" ry="3" transform="translate(171.386 60.402) rotate(-149)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_135" data-name="Ellipse 135" cx="3" cy="3" r="3" transform="translate(62.74 39.135) rotate(-24)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_235" data-name="Ellipse 235" cx="3" cy="3" r="3" transform="matrix(-0.914, -0.407, 0.407, -0.914, 173.439, 44.617)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_33" data-name="Ellipse 33" cx="3" cy="3" r="3" transform="translate(61.252 111.051) rotate(-64)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_234" data-name="Ellipse 234" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.438, -0.899, 0.899, -0.438, 171.974, 113.681)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_86" data-name="Ellipse 86" cx="3" cy="3" r="3" transform="matrix(0.574, -0.819, 0.819, 0.574, 50.887, 92.554)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_233" data-name="Ellipse 233" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.574, -0.819, 0.819, -0.574, 182.817, 95.996)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_134" data-name="Ellipse 134" cx="3" cy="3" r="3" transform="matrix(0.669, -0.743, 0.743, 0.669, 45.038, 74.537)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_232" data-name="Ellipse 232" cx="3" cy="3" rx="3" ry="3" transform="translate(189.123 78.552) rotate(-132)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_49" data-name="Ellipse 49" cx="3" cy="3" r="3" transform="matrix(0.5, -0.866, 0.866, 0.5, 56.373, 102.964)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_231" data-name="Ellipse 231" cx="3" cy="3" rx="3" ry="3" transform="translate(177.05 105.964) rotate(-120)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_85" data-name="Ellipse 85" cx="3" cy="3" r="3" transform="translate(47.332 83.803) rotate(-51)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_230" data-name="Ellipse 230" cx="3" cy="3" rx="3" ry="3" transform="translate(186.624 87.579) rotate(-129)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_133" data-name="Ellipse 133" cx="3" cy="3" r="3" transform="matrix(0.719, -0.695, 0.695, 0.719, 42.576, 65.418)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_229" data-name="Ellipse 229" cx="3" cy="3" r="3" transform="matrix(-0.719, -0.695, 0.695, -0.719, 191.875, 69.734)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_15" data-name="Ellipse 15" cx="3" cy="3" r="3" transform="translate(106 46)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_228" data-name="Ellipse 228" cx="3" cy="3" r="3" transform="translate(126.619 46)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_84" data-name="Ellipse 84" cx="3" cy="3" r="3" transform="translate(105.26 35.304) rotate(9)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_227" data-name="Ellipse 227" cx="3" cy="3" rx="3" ry="3" transform="translate(134.298 41.23) rotate(171)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_132" data-name="Ellipse 132" cx="3" cy="3" r="3" transform="matrix(0.961, 0.276, -0.276, 0.961, 105.982, 24.34)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_226" data-name="Ellipse 226" cx="3" cy="3" r="3" transform="translate(134.291 30.107) rotate(164)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_48" data-name="Ellipse 48" cx="3" cy="3" r="3" transform="matrix(0.998, 0.07, -0.07, 0.998, 105.549, 41.193)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_225" data-name="Ellipse 225" cx="3" cy="3" r="3" transform="matrix(-0.998, 0.07, -0.07, -0.998, 133.489, 47.178)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_83" data-name="Ellipse 83" cx="3" cy="3" r="3" transform="matrix(0.974, 0.225, -0.225, 0.974, 105.566, 30.486)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_224" data-name="Ellipse 224" cx="3" cy="3" rx="3" ry="3" transform="translate(134.402 36.332) rotate(167)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_131" data-name="Ellipse 131" cx="3" cy="3" r="3" transform="matrix(0.94, 0.342, -0.342, 0.94, 106.874, 19.594)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_223" data-name="Ellipse 223" cx="3" cy="3" r="3" transform="translate(133.797 25.232) rotate(160)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_24" data-name="Ellipse 24" cx="3" cy="3" r="3" transform="translate(77.649 67.807) rotate(-33)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_222" data-name="Ellipse 222" cx="3" cy="3" r="3" transform="matrix(-0.839, -0.545, 0.545, -0.839, 157.702, 72.839)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_82" data-name="Ellipse 82" cx="3" cy="3" r="3" transform="translate(73.846 52.408) rotate(-24)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_221" data-name="Ellipse 221" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.914, -0.407, 0.407, -0.914, 162.332, 57.889)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_130" data-name="Ellipse 130" cx="3" cy="3" r="3" transform="translate(72.719 37.487) rotate(-17)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_220" data-name="Ellipse 220" cx="3" cy="3" rx="3" ry="3" transform="translate(164.146 43.225) rotate(-163)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_47" data-name="Ellipse 47" cx="3" cy="3" r="3" transform="translate(75.746 60.969) rotate(-29)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_219" data-name="Ellipse 219" cx="3" cy="3" r="3" transform="matrix(-0.875, -0.485, 0.485, -0.875, 159.964, 66.217)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_81" data-name="Ellipse 81" cx="3" cy="3" r="3" transform="matrix(0.94, -0.342, 0.342, 0.94, 73.037, 45.356)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_218" data-name="Ellipse 218" cx="3" cy="3" rx="3" ry="3" transform="translate(163.531 50.994) rotate(-160)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_129" data-name="Ellipse 129" cx="3" cy="3" r="3" transform="matrix(0.974, -0.225, 0.225, 0.974, 72.774, 30.389)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_217" data-name="Ellipse 217" cx="3" cy="3" rx="3" ry="3" transform="translate(164.495 36.236) rotate(-167)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_32" data-name="Ellipse 32" cx="3" cy="3" r="3" transform="matrix(0.602, -0.799, 0.799, 0.602, 63.318, 97.901)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_216" data-name="Ellipse 216" cx="3" cy="3" r="3" transform="matrix(-0.602, -0.799, 0.799, -0.602, 170.51, 101.512)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_80" data-name="Ellipse 80" cx="3" cy="3" r="3" transform="translate(54.984 79.89) rotate(-44)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_215" data-name="Ellipse 215" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.719, -0.695, 0.695, -0.719, 179.467, 84.206)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_128" data-name="Ellipse 128" cx="3" cy="3" r="3" transform="matrix(0.799, -0.602, 0.602, 0.799, 50.648, 62.466)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_214" data-name="Ellipse 214" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.799, -0.602, 0.602, -0.799, 184.361, 67.258)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_46" data-name="Ellipse 46" cx="3" cy="3" r="3" transform="translate(59.35 89.99) rotate(-49)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_213" data-name="Ellipse 213" cx="3" cy="3" r="3" transform="translate(174.741 93.927) rotate(-131)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_79" data-name="Ellipse 79" cx="3" cy="3" r="3" transform="matrix(0.766, -0.643, 0.643, 0.766, 52.303, 71.455)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_212" data-name="Ellipse 212" cx="3" cy="3" rx="3" ry="3" transform="translate(182.46 76.051) rotate(-140)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_127" data-name="Ellipse 127" cx="3" cy="3" r="3" transform="matrix(0.839, -0.545, 0.545, 0.839, 49.015, 53.767)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_211" data-name="Ellipse 211" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.839, -0.545, 0.545, -0.839, 186.337, 58.799)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_18" data-name="Ellipse 18" cx="3" cy="3" r="3" transform="translate(90.519 54.009) rotate(-11)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_210" data-name="Ellipse 210" cx="3" cy="3" rx="3" ry="3" transform="translate(146.955 59.899) rotate(-169)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_78" data-name="Ellipse 78" cx="3" cy="3" r="3" transform="matrix(0.999, -0.035, 0.035, 0.999, 88.717, 40.793)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_209" data-name="Ellipse 209" cx="3" cy="3" r="3" transform="matrix(-0.999, -0.035, 0.035, -0.999, 149.693, 46.789)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_126" data-name="Ellipse 126" cx="3" cy="3" r="3" transform="translate(88.894 27.772) rotate(5)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_208" data-name="Ellipse 208" cx="3" cy="3" r="3" transform="matrix(-0.996, 0.087, -0.087, -0.996, 150.248, 33.749)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_45" data-name="Ellipse 45" cx="3" cy="3" r="3" transform="translate(89.547 48.102) rotate(-7)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_207" data-name="Ellipse 207" cx="3" cy="3" rx="3" ry="3" transform="translate(148.34 54.058) rotate(-173)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_77" data-name="Ellipse 77" cx="3" cy="3" r="3" transform="translate(88.681 34.807) rotate(2)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_206" data-name="Ellipse 206" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.999, 0.035, -0.035, -0.999, 150.148, 40.803)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_125" data-name="Ellipse 125" cx="3" cy="3" r="3" transform="translate(89.588 21.826) rotate(9)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_205" data-name="Ellipse 205" cx="3" cy="3" rx="3" ry="3" transform="translate(149.97 27.752) rotate(171)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_23" data-name="Ellipse 23" cx="3" cy="3" r="3" transform="matrix(0.719, -0.695, 0.695, 0.719, 69.028, 82.955)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_204" data-name="Ellipse 204" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.719, -0.695, 0.695, -0.719, 165.423, 87.271)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_76" data-name="Ellipse 76" cx="3" cy="3" r="3" transform="translate(62.962 66.021) rotate(-35)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_203" data-name="Ellipse 203" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.819, -0.574, 0.574, -0.819, 172.216, 70.936)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_124" data-name="Ellipse 124" cx="3" cy="3" r="3" transform="translate(60.256 49.673) rotate(-28)"/>
    <ellipse  fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_202" data-name="Ellipse 202" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.883, -0.469, 0.469, -0.883, 175.546, 54.97)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_44" data-name="Ellipse 44" cx="3" cy="3" r="3" transform="translate(66.089 75.479) rotate(-40)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_201" data-name="Ellipse 201" cx="3" cy="3" rx="3" ry="3" transform="translate(168.673 80.075) rotate(-140)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_75" data-name="Ellipse 75" cx="3" cy="3" r="3" transform="translate(61.229 58.177) rotate(-31)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_200" data-name="Ellipse 200" cx="3" cy="3" rx="3" ry="3" transform="translate(174.3 63.32) rotate(-149)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_123" data-name="Ellipse 123" cx="3" cy="3" r="3" transform="translate(59.492 41.676) rotate(-24)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_199" data-name="Ellipse 199" cx="3" cy="3" r="3" transform="matrix(-0.914, -0.407, 0.407, -0.914, 176.687, 47.157)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_31" data-name="Ellipse 31" cx="3" cy="3" r="3" transform="translate(60.398 115.085) rotate(-64)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_198" data-name="Ellipse 198" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.438, -0.899, 0.899, -0.438, 172.829, 117.715)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_74" data-name="Ellipse 74" cx="3" cy="3" r="3" transform="matrix(0.574, -0.819, 0.819, 0.574, 49.412, 96.405)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_197" data-name="Ellipse 197" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.574, -0.819, 0.819, -0.574, 184.292, 99.846)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_122" data-name="Ellipse 122" cx="3" cy="3" r="3" transform="matrix(0.669, -0.743, 0.743, 0.669, 43.104, 78.179)"/>
    <ellipse  fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_196" data-name="Ellipse 196" cx="3" cy="3" rx="3" ry="3" transform="translate(191.056 82.193) rotate(-132)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_43" data-name="Ellipse 43" cx="3" cy="3" r="3" transform="matrix(0.5, -0.866, 0.866, 0.5, 55.239, 106.928)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_195" data-name="Ellipse 195" cx="3" cy="3" rx="3" ry="3" transform="translate(178.184 109.928) rotate(-120)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_73" data-name="Ellipse 73" cx="3" cy="3" r="3" transform="translate(45.592 87.541) rotate(-51)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_194" data-name="Ellipse 194" cx="3" cy="3" rx="3" ry="3" transform="translate(188.364 91.317) rotate(-129)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_121" data-name="Ellipse 121" cx="3" cy="3" r="3" transform="matrix(0.719, -0.695, 0.695, 0.719, 40.394, 68.916)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_193" data-name="Ellipse 193" cx="3" cy="3" r="3" transform="matrix(-0.719, -0.695, 0.695, -0.719, 194.058, 73.232)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_16" data-name="Ellipse 16" cx="3" cy="3" r="3" transform="translate(102 48)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_192" data-name="Ellipse 192" cx="3" cy="3" r="3" transform="translate(130.619 48)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_72" data-name="Ellipse 72" cx="3" cy="3" r="3" transform="translate(100.996 36.654) rotate(9)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_191" data-name="Ellipse 191" cx="3" cy="3" rx="3" ry="3" transform="translate(138.562 42.58) rotate(171)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_120" data-name="Ellipse 120" cx="3" cy="3" r="3" transform="matrix(0.961, 0.276, -0.276, 0.961, 101.586, 25.16)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_190" data-name="Ellipse 190" cx="3" cy="3" r="3" transform="translate(138.687 30.927) rotate(164)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_42" data-name="Ellipse 42" cx="3" cy="3" r="3" transform="matrix(0.998, 0.07, -0.07, 0.998, 101.419, 42.909)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_189" data-name="Ellipse 189" cx="3" cy="3" r="3" transform="matrix(-0.998, 0.07, -0.07, -0.998, 137.618, 48.894)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_71" data-name="Ellipse 71" cx="3" cy="3" r="3" transform="matrix(0.974, 0.225, -0.225, 0.974, 101.219, 31.534)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_188" data-name="Ellipse 188" cx="3" cy="3" rx="3" ry="3" transform="translate(138.75 37.381) rotate(167)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_119" data-name="Ellipse 119" cx="3" cy="3" r="3" transform="matrix(0.94, 0.342, -0.342, 0.94, 102.431, 20.106)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_187" data-name="Ellipse 187" cx="3" cy="3" r="3" transform="translate(138.24 25.744) rotate(160)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_22" data-name="Ellipse 22" cx="3" cy="3" r="3" transform="translate(75.384 71.663) rotate(-33)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_186" data-name="Ellipse 186" cx="3" cy="3" r="3" transform="matrix(-0.839, -0.545, 0.545, -0.839, 159.968, 76.695)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_70" data-name="Ellipse 70" cx="3" cy="3" r="3" transform="translate(71.006 55.862) rotate(-24)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_185" data-name="Ellipse 185" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.914, -0.407, 0.407, -0.914, 165.173, 61.343)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_118" data-name="Ellipse 118" cx="3" cy="3" r="3" transform="translate(69.478 40.569) rotate(-17)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_184" data-name="Ellipse 184" cx="3" cy="3" rx="3" ry="3" transform="translate(167.387 46.307) rotate(-163)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_41" data-name="Ellipse 41" cx="3" cy="3" r="3" transform="translate(73.217 64.657) rotate(-29)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_183" data-name="Ellipse 183" cx="3" cy="3" r="3" transform="matrix(-0.875, -0.485, 0.485, -0.875, 162.493, 69.905)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_69" data-name="Ellipse 69" cx="3" cy="3" r="3" transform="matrix(0.94, -0.342, 0.342, 0.94, 69.962, 48.603)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_182" data-name="Ellipse 182" cx="3" cy="3" rx="3" ry="3" transform="translate(166.605 54.242) rotate(-160)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_117" data-name="Ellipse 117" cx="3" cy="3" r="3" transform="matrix(0.974, -0.225, 0.225, 0.974, 69.327, 33.238)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_181" data-name="Ellipse 181" cx="3" cy="3" rx="3" ry="3" transform="translate(167.943 39.084) rotate(-167)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_30" data-name="Ellipse 30" cx="3" cy="3" r="3" transform="matrix(0.602, -0.799, 0.799, 0.602, 62.508, 102.3)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_180" data-name="Ellipse 180" cx="3" cy="3" r="3" transform="matrix(-0.602, -0.799, 0.799, -0.602, 171.32, 105.91)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_68" data-name="Ellipse 68" cx="3" cy="3" r="3" transform="translate(53.496 84.107) rotate(-44)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_179" data-name="Ellipse 179" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.719, -0.695, 0.695, -0.719, 180.955, 88.423)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_116" data-name="Ellipse 116" cx="3" cy="3" r="3" transform="matrix(0.799, -0.602, 0.602, 0.799, 48.657, 66.47)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_178" data-name="Ellipse 178" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.799, -0.602, 0.602, -0.799, 186.352, 71.262)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_40" data-name="Ellipse 40" cx="3" cy="3" r="3" transform="translate(58.236 94.321) rotate(-49)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_177" data-name="Ellipse 177" cx="3" cy="3" r="3" transform="translate(175.855 98.257) rotate(-131)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_67" data-name="Ellipse 67" cx="3" cy="3" r="3" transform="matrix(0.766, -0.643, 0.643, 0.766, 50.524, 75.558)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_176" data-name="Ellipse 176" cx="3" cy="3" rx="3" ry="3" transform="translate(184.238 80.155) rotate(-140)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_115" data-name="Ellipse 115" cx="3" cy="3" r="3" transform="matrix(0.839, -0.545, 0.545, 0.839, 46.749, 57.623)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_175" data-name="Ellipse 175" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.839, -0.545, 0.545, -0.839, 188.602, 62.655)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_17" data-name="Ellipse 17" cx="3" cy="3" r="3" transform="translate(86.975 56.736) rotate(-11)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_174" data-name="Ellipse 174" cx="3" cy="3" rx="3" ry="3" transform="translate(150.5 62.625) rotate(-169)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_66" data-name="Ellipse 66" cx="3" cy="3" r="3" transform="matrix(0.999, -0.035, 0.035, 0.999, 84.789, 42.932)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_173" data-name="Ellipse 173" cx="3" cy="3" r="3" transform="matrix(-0.999, -0.035, 0.035, -0.999, 153.621, 48.928)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_114" data-name="Ellipse 114" cx="3" cy="3" r="3" transform="translate(84.735 29.415) rotate(5)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_172" data-name="Ellipse 172" cx="3" cy="3" r="3" transform="matrix(-0.996, 0.087, -0.087, -0.996, 154.407, 35.393)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_39" data-name="Ellipse 39" cx="3" cy="3" r="3" transform="translate(85.821 50.575) rotate(-7)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_171" data-name="Ellipse 171" cx="3" cy="3" rx="3" ry="3" transform="translate(152.067 56.53) rotate(-173)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_65" data-name="Ellipse 65" cx="3" cy="3" r="3" transform="translate(84.614 36.666) rotate(2)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_170" data-name="Ellipse 170" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.999, 0.035, -0.035, -0.999, 154.215, 42.663)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_113" data-name="Ellipse 113" cx="3" cy="3" r="3" transform="translate(85.324 23.175) rotate(9)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_169" data-name="Ellipse 169" cx="3" cy="3" rx="3" ry="3" transform="translate(154.234 29.102) rotate(171)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_21" data-name="Ellipse 21" cx="3" cy="3" r="3" transform="matrix(0.719, -0.695, 0.695, 0.719, 67.54, 87.173)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_168" data-name="Ellipse 168" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.719, -0.695, 0.695, -0.719, 166.911, 91.489)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_64" data-name="Ellipse 64" cx="3" cy="3" r="3" transform="translate(60.832 69.954) rotate(-35)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_167" data-name="Ellipse 167" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.819, -0.574, 0.574, -0.819, 174.345, 74.868)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_112" data-name="Ellipse 112" cx="3" cy="3" r="3" transform="translate(57.663 53.316) rotate(-28)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_166" data-name="Ellipse 166" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.883, -0.469, 0.469, -0.883, 178.139, 58.614)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_38" data-name="Ellipse 38" cx="3" cy="3" r="3" transform="translate(64.311 79.582) rotate(-40)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_165" data-name="Ellipse 165" cx="3" cy="3" rx="3" ry="3" transform="translate(170.452 84.178) rotate(-140)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_63" data-name="Ellipse 63" cx="3" cy="3" r="3" transform="translate(58.83 61.951) rotate(-31)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_164" data-name="Ellipse 164" cx="3" cy="3" rx="3" ry="3" transform="translate(176.699 67.094) rotate(-149)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_111" data-name="Ellipse 111" cx="3" cy="3" r="3" transform="translate(56.651 45.13) rotate(-24)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_163" data-name="Ellipse 163" cx="3" cy="3" r="3" transform="matrix(-0.914, -0.407, 0.407, -0.914, 179.527, 50.611)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_29" data-name="Ellipse 29" cx="3" cy="3" r="3" transform="translate(60.442 119.557) rotate(-64)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_162" data-name="Ellipse 162" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.438, -0.899, 0.899, -0.438, 172.785, 122.187)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_62" data-name="Ellipse 62" cx="3" cy="3" r="3" transform="matrix(0.574, -0.819, 0.819, 0.574, 48.756, 100.828)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_161" data-name="Ellipse 161" cx="3" cy="3" rx="3" ry="3" transform="matrix(-0.574, -0.819, 0.819, -0.574, 184.948, 104.27)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_110" data-name="Ellipse 110" cx="3" cy="3" r="3" transform="matrix(0.669, -0.743, 0.743, 0.669, 41.914, 82.489)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_160" data-name="Ellipse 160" cx="3" cy="3" rx="3" ry="3" transform="translate(192.246 86.504) rotate(-132)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_37" data-name="Ellipse 37" cx="3" cy="3" r="3" transform="matrix(0.5, -0.866, 0.866, 0.5, 54.971, 111.392)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_159" data-name="Ellipse 159" cx="3" cy="3" rx="3" ry="3" transform="translate(178.452 114.392) rotate(-120)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_61" data-name="Ellipse 61" cx="3" cy="3" r="3" transform="translate(44.629 91.909) rotate(-51)"/>
    <ellipse fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_158" data-name="Ellipse 158" cx="3" cy="3" rx="3" ry="3" transform="translate(189.327 95.684) rotate(-129)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_109" data-name="Ellipse 109" cx="3" cy="3" r="3" transform="matrix(0.719, -0.695, 0.695, 0.719, 38.905, 73.133)"/>
    <circle fill="${HAIR_COLOR_PLACEHOLDER}" id="Ellipse_157" data-name="Ellipse 157" cx="3" cy="3" r="3" transform="matrix(-0.719, -0.695, 0.695, -0.719, 195.546, 77.449)"/>
  </g>
</svg>`

const tyson = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="84.297" viewBox="0 0 240 84.297">
  <g id="tyson" transform="translate(-1 -23)">
    <rect id="Rectangle_30" data-name="Rectangle 30" width="240" height="72" transform="translate(1 23)" fill="rgba(255,255,255,0)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_159" data-name="Path 159" d="M18.344,4.016A19.443,19.443,0,0,1,23.48,4.7a54.525,54.525,0,0,1,5.848,1.75c2,.819,2.136,1.525,2.136,1.525s1.1,1.459,0,4.272-3.276,3.094-4.136,2.953-1.422-2.312-1.422-2.312,2.344,1.406,2.875-1.25-2.375-2.625-3.109-2.406-2.094,2.016-2.094,2.016a6.8,6.8,0,0,0,.078,4.047c.75,1.984,2.3,3.672,4.281,3.516s5.406-3.937,5.406-3.937a7.912,7.912,0,0,1,.065,1.656,7.8,7.8,0,0,1-2.174,3.813,10.336,10.336,0,0,1-4.3,2.266l.842,2.047a37.394,37.394,0,0,1,4.143,3.016A14.4,14.4,0,0,1,34.969,31.3s-4.437-3.031-6.516-4.219a7.319,7.319,0,0,0-4.016-.984s-.758-.39-2.328-3.281c-.54-.995-1.094-2.828-1.984-5.016a12.865,12.865,0,0,0-1.969-3.406,25.347,25.347,0,0,0-8.719-2.766A30.569,30.569,0,0,0,.031,12.641,13.868,13.868,0,0,1,8.25,9.719,28.2,28.2,0,0,1,18.156,11a.658.658,0,0,0,.781-.281c.328-.469-.2-.891-.2-.891a5.593,5.593,0,0,0-1.781-1.016,12.068,12.068,0,0,0-2.547-.484s-3.285-.234-5.641-.156a17.6,17.6,0,0,0-4.172.641A24.237,24.237,0,0,1,11.844,6.8a42.938,42.938,0,0,1,8.125.406s1.625.406,1.656-.156-1.906-1.5-3.469-1.859a27.056,27.056,0,0,0-4.562-.344A12.685,12.685,0,0,1,18.344,4.016Z" transform="translate(132 57)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_160" data-name="Path 160" d="M18.344,31.3a19.443,19.443,0,0,0,5.137-.687,54.525,54.525,0,0,0,5.848-1.75c2-.819,2.136-1.525,2.136-1.525s1.1-1.459,0-4.272-3.276-3.094-4.136-2.953-1.422,2.313-1.422,2.313,2.344-1.406,2.875,1.25-2.375,2.625-3.109,2.406-2.094-2.016-2.094-2.016a6.8,6.8,0,0,1,.078-4.047c.75-1.984,2.3-3.672,4.281-3.516s5.406,3.938,5.406,3.938a7.912,7.912,0,0,0,.065-1.656,7.8,7.8,0,0,0-2.174-3.812,10.336,10.336,0,0,0-4.3-2.266s-.3-1.907,1-2.126,4.219,1.25,4.219,1.25l4.463,1.428S29.683,7.382,27.6,8.569a3.557,3.557,0,0,1-3.436.4A35.063,35.063,0,0,0,22.109,12.5c-.54.995-1.094,2.828-1.984,5.016s-.395,1.949-.692,3.718-.824,2.891-.5,3.36-.2.891-.2.891A5.593,5.593,0,0,1,16.953,26.5a12.068,12.068,0,0,1-2.547.484s-3.285.234-5.641.156A17.6,17.6,0,0,1,4.594,26.5a24.237,24.237,0,0,0,7.25,2.016,42.938,42.938,0,0,0,8.125-.406s1.625-.406,1.656.156-1.906,1.5-3.469,1.859a27.056,27.056,0,0,1-4.562.344A12.685,12.685,0,0,0,18.344,31.3Z" transform="translate(130 76)"/>
  </g>
</svg>`

const brucelee = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="104.685" viewBox="0 0 240 104.685">
  <g id="bruce_lee" data-name="bruce lee" transform="translate(46.211 -35.516)">
    <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" transform="translate(-46.211 35.516)" fill="rgba(255,255,255,0)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_45" data-name="Path 45" d="M56.712-.421V38.159c-6.068,0-40.553,5.532-47.939,12.962C6.659,66.129-.865,59.216-.865,48.738-.865,20.571,12.757-1.822,56.712-.421Z" transform="translate(17 36)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_240" data-name="Path 240" d="M-.865-.421V38.159c6.068,0,40.553,5.532,47.939,12.962,2.114,15.007,9.638,8.094,9.638-2.384C56.712,20.571,43.09-1.822-.865-.421Z" transform="translate(72.777 36)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_44" data-name="Path 44" d="M7.905.968a75.1,75.1,0,0,1,5.243,29.341c-.519,16.172-2.432,23.477-2.432,23.477L-4.038,56.247A78.483,78.483,0,0,0,5.878,33.41C9.391,19.82,7.905.968,7.905.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 38.883, 138.178)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_239" data-name="Path 239" d="M11.943,55.28a75.1,75.1,0,0,0,5.243-29.341C16.667,9.766,14.754,2.461,14.754,2.461L0,0A78.483,78.483,0,0,1,9.915,22.837C13.429,36.427,11.943,55.28,11.943,55.28Z" transform="translate(115.46 82.465) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_198" data-name="Path 198" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 34.253, 126.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_238" data-name="Path 238" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(116.842 84.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_199" data-name="Path 199" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 34.253, 119.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_237" data-name="Path 237" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(116.842 77.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_200" data-name="Path 200" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 34.253, 111.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_236" data-name="Path 236" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(116.842 69.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_201" data-name="Path 201" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 36.253, 106.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_235" data-name="Path 235" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(114.842 64.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_202" data-name="Path 202" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 38.253, 100.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_234" data-name="Path 234" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(112.842 58.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_203" data-name="Path 203" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 43.253, 106.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_233" data-name="Path 233" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(107.842 64.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_204" data-name="Path 204" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 45.253, 100.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_232" data-name="Path 232" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(105.842 58.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_205" data-name="Path 205" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 50.253, 106.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_231" data-name="Path 231" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(100.842 64.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_206" data-name="Path 206" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 52.253, 101.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_230" data-name="Path 230" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(98.842 59.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_207" data-name="Path 207" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 55.253, 99.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_229" data-name="Path 229" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(95.842 57.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_208" data-name="Path 208" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 60.253, 105.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_228" data-name="Path 228" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(90.842 63.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_209" data-name="Path 209" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 63.253, 102.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_227" data-name="Path 227" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(87.842 60.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_210" data-name="Path 210" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 65.253, 97.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_226" data-name="Path 226" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(85.842 55.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_211" data-name="Path 211" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 68.253, 97.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_225" data-name="Path 225" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(82.842 55.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_212" data-name="Path 212" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 71.253, 97.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_224" data-name="Path 224" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(79.842 55.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_213" data-name="Path 213" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 74.253, 96.122)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_223" data-name="Path 223" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(76.842 54.476) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_214" data-name="Path 214" d="M4.786.968A55.488,55.488,0,0,1,8.66,22.645c-.384,11.948-1.8,17.345-1.8,17.345l-10.9,1.819A57.984,57.984,0,0,0,3.288,24.936C5.884,14.9,4.786.968,4.786.968Z" transform="translate(76.09 96.75) rotate(173)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_222" data-name="Path 222" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="translate(70.622 54.761) rotate(7)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_215" data-name="Path 215" d="M8.824,40.841A55.488,55.488,0,0,0,12.7,19.164C12.314,7.215,10.9,1.819,10.9,1.819L0,0A57.984,57.984,0,0,1,7.326,16.873C9.921,26.913,8.824,40.841,8.824,40.841Z" transform="matrix(0.998, -0.07, 0.07, 0.998, 59.408, 58.877)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_221" data-name="Path 221" d="M8.824,0A55.488,55.488,0,0,1,12.7,21.678c-.384,11.948-1.8,17.345-1.8,17.345L0,40.841A57.984,57.984,0,0,0,7.326,23.969C9.921,13.928,8.824,0,8.824,0Z" transform="translate(87.249 95.298) rotate(173)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_47" data-name="Path 47" d="M10.717,22.65,0,23.582Z" transform="matrix(-0.999, -0.035, 0.035, -0.999, 50.731, 83.768)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_220" data-name="Path 220" d="M10.717.933,0,0Z" transform="matrix(0.999, -0.035, 0.035, 0.999, 94.07, 60.2)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_48" data-name="Path 48" d="M10.717,22.65,0,23.582Z" transform="translate(60.795 72.997) rotate(-155)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_219" data-name="Path 219" d="M10.717.933,0,0Z" transform="translate(74.863 51.624) rotate(-25)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_60" data-name="Path 60" d="M10.717.933,0,0Z" transform="translate(111.796 73.936) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_218" data-name="Path 218" d="M10.717,0,0,.933Z" transform="translate(34.038 74.845) rotate(167)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_61" data-name="Path 61" d="M10.717.933,0,0Z" transform="matrix(0.999, -0.035, 0.035, 0.999, 95.751, 60.2)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_217" data-name="Path 217" d="M10.717,0,0,.933Z" transform="matrix(-0.999, -0.035, 0.035, -0.999, 49.84, 61.132)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_62" data-name="Path 62" d="M10.717.933,0,0Z" transform="translate(77.883 47.19) rotate(9)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_216" data-name="Path 216" d="M10.717,0,0,.933Z" transform="translate(67.887 48.111) rotate(171)"/>
  </g>
</svg>`

/*const boxercut = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="72" viewBox="0 0 240 72">
  <g id="boxer" transform="translate(0 -10)" opacity="0.33">
    <rect id="Rectangle_29" data-name="Rectangle 29" width="240" height="72" transform="translate(0 10)" fill="rgba(255,255,255,0)"/>
    <path id="Path_157" data-name="Path 157" d="M25.733-.5,26,17.638H4.053s-14.125-1.2-14.125-3.051C-.975,4.283,14.529-.562,25.733-.5Z" transform="translate(94 24)"/>
    <path id="Path_158" data-name="Path 158" d="M-11.055-.576V17.638h22.93S26,16.435,26,14.587C15.715,4.1.208-.773-11.055-.576Z" transform="translate(130 24)"/>
  </g>
</svg>`*/

const headsetEars =`<svg id="headset_mit_ohren" data-name="headset mit ohren" xmlns="http://www.w3.org/2000/svg" width="240" height="130.218" viewBox="0 0 240 130.218">
  <path id="Rechteck_6" data-name="Rechteck 6" d="M9,0h5a0,0,0,0,1,0,0V43a0,0,0,0,1,0,0H8a8,8,0,0,1-8-8V9A9,9,0,0,1,9,0Z" transform="translate(56 54)"/>
  <path id="Rechteck_7" data-name="Rechteck 7" d="M0,0H5a9,9,0,0,1,9,9V35a8,8,0,0,1-8,8H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(169 54)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Pfad_72" data-name="Pfad 72" d="M-5.761-5.817A99.689,99.689,0,0,1,8.123-3.935,68.519,68.519,0,0,1,20,0L0,20A84.6,84.6,0,0,1-3.739,7.928,115.8,115.8,0,0,1-5.761-5.817Z" transform="matrix(0.999, 0.052, -0.052, 0.999, 74.281, 10.452)"/>
  <path  fill="${HAIR_COLOR_PLACEHOLDER}"id="Pfad_74" data-name="Pfad 74" d="M0,25.817a99.689,99.689,0,0,0,13.884-1.882A68.519,68.519,0,0,0,25.761,20l-20-20A84.6,84.6,0,0,0,2.022,12.072,115.8,115.8,0,0,0,0,25.817Z" transform="translate(172.558 30.123) rotate(177)"/>
  <path id="Pfad_73" data-name="Pfad 73" d="M-5.761-5.817A71.645,71.645,0,0,1,4.2-4.469a49.219,49.219,0,0,1,8.521,2.818L-1.628,12.671A60.5,60.5,0,0,1-4.311,4.026,82.783,82.783,0,0,1-5.761-5.817Z" transform="matrix(0.999, 0.052, -0.052, 0.999, 78.503, 15.168)" opacity="0.49"/>
  <path id="Pfad_75" data-name="Pfad 75" d="M0,18.488A71.645,71.645,0,0,0,9.961,17.14a49.219,49.219,0,0,0,8.521-2.818L4.133,0A60.5,60.5,0,0,0,1.451,8.645,82.783,82.783,0,0,0,0,18.488Z" transform="translate(167.952 27.52) rotate(177)" opacity="0.49"/>
  <path id="bügel" d="M-.995,4.4s4.519-36.388,52.4-36.592,50.82,36.143,50.82,36.143L100.7,7.079S93.57-22.584,51.406-22.584.488,7.079.488,7.079Z" transform="translate(69 38)"/>
  <rect id="Rechteck_9" data-name="Rechteck 9" width="4" height="15" transform="translate(174.537 55.671) rotate(169)"/>
  <rect id="Rechteck_10" data-name="Rechteck 10" width="4" height="15" transform="translate(67.61 40.947) rotate(11)"/>
  <path id="Pfad_71" data-name="Pfad 71" d="M0,0H3S-2.008,11.223-2.008,21.973,3,43,3,43H0S-5.008,32.3-5.008,21.551,0,0,0,0Z" transform="translate(146.838 126.867) rotate(-138)"/>
  <path id="Rechteck_11" data-name="Rechteck 11" d="M2,0H6A1,1,0,0,1,7,1V4A1,1,0,0,1,6,5H2A2,2,0,0,1,0,3V2A2,2,0,0,1,2,0Z" transform="matrix(0.934, -0.358, 0.358, 0.934, 139.337, 125.42)" fill="#1c1c1c"/>
  <path id="Rechteck_12" data-name="Rechteck 12" d="M0,0H2A3,3,0,0,1,5,3V39a4,4,0,0,1-4,4H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(69 54)" fill="#1c1c1c"/>
  <path id="Rechteck_13" data-name="Rechteck 13" d="M3,0H5A0,0,0,0,1,5,0V43a0,0,0,0,1,0,0H4a4,4,0,0,1-4-4V3A3,3,0,0,1,3,0Z" transform="translate(165 54)" fill="#1c1c1c"/>
  <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" fill="rgba(255,255,255,0)"/>
</svg>`

const headset =`<svg id="headset" xmlns="http://www.w3.org/2000/svg" width="240" height="130.218" viewBox="0 0 240 130.218">
  <path id="Rechteck_6" data-name="Rechteck 6" d="M9,0h5a0,0,0,0,1,0,0V43a0,0,0,0,1,0,0H8a8,8,0,0,1-8-8V9A9,9,0,0,1,9,0Z" transform="translate(56 54)"/>
  <path id="Rechteck_7" data-name="Rechteck 7" d="M0,0H5a9,9,0,0,1,9,9V35a8,8,0,0,1-8,8H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(169 54)"/>
  <path fill="${HAIR_COLOR_PLACEHOLDER}"  id="bügel" d="M-.995,4.4s4.519-36.388,52.4-36.592,50.82,36.143,50.82,36.143L100.7,7.079S93.57-22.584,51.406-22.584.488,7.079.488,7.079Z" transform="translate(69 38)"/>
  <rect id="Rechteck_9" data-name="Rechteck 9" width="4" height="15" transform="translate(174.537 55.671) rotate(169)"/>
  <rect id="Rechteck_10" data-name="Rechteck 10" width="4" height="15" transform="translate(67.61 40.947) rotate(11)"/>
  <path id="Pfad_71" data-name="Pfad 71" d="M0,0H3S-2.008,11.223-2.008,21.973,3,43,3,43H0S-5.008,32.3-5.008,21.551,0,0,0,0Z" transform="translate(146.838 126.867) rotate(-138)"/>
  <path id="Rechteck_11" data-name="Rechteck 11" d="M2,0H6A1,1,0,0,1,7,1V4A1,1,0,0,1,6,5H2A2,2,0,0,1,0,3V2A2,2,0,0,1,2,0Z" transform="matrix(0.934, -0.358, 0.358, 0.934, 139.337, 125.42)" fill="#1c1c1c"/>
  <path id="Rechteck_12" data-name="Rechteck 12" d="M0,0H2A3,3,0,0,1,5,3V39a4,4,0,0,1-4,4H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(69 54)" fill="#1c1c1c"/>
  <path id="Rechteck_13" data-name="Rechteck 13" d="M3,0H5A0,0,0,0,1,5,0V43a0,0,0,0,1,0,0H4a4,4,0,0,1-4-4V3A3,3,0,0,1,3,0Z" transform="translate(165 54)" fill="#1c1c1c"/>
  <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" fill="rgba(255,255,255,0)"/>
</svg>
`

const waves = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="240" height="72" viewBox="0 0 240 72">
  <defs>
    <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#fff"/>
      <stop offset="1" stop-color="gray"/>
    </linearGradient>
  </defs>
  <g id="waves_in_hair" data-name="waves in hair" transform="translate(0 -10)">
    <rect id="Rectangle_28" data-name="Rectangle 28" width="240" height="72" transform="translate(0 10)" fill="rgba(255,255,255,0)"/>
    <g id="hair">
      <g id="Group_2" data-name="Group 2">
        <path id="Path_146" data-name="Path 146" d="M15.377,2.394a95.675,95.675,0,0,1-1.024,10.393,58.686,58.686,0,0,1-2.2,8.739L3.882,24.439Z" transform="translate(86 79) rotate(180)" fill="#403f3f" opacity="0.69"/>
        <path id="Path_148" data-name="Path 148" d="M10.964,22.021A97.825,97.825,0,0,0,9.925,11.628,86.353,86.353,0,0,0,7.99,2.956L0,0Z" transform="translate(158.505 54.561)" fill="#403f3f" opacity="0.69"/>
        <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_145" data-name="Path 145" d="M40,0V30.911L2.144,32.665l-8.214,2.967s1.89-10.314,5.984-16.612S17.909,0,40,0Z" transform="translate(80 22)"/>
        <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_147" data-name="Path 147" d="M-6.865.011l-.549,30.9,39.2,1.757,8.052,2.924S38.11,25.318,34.016,19.019,15.227.011-6.865.011Z" transform="translate(126.693 22)"/>
      </g>
    </g>
    <g id="waves">
      <path id="Path_149" data-name="Path 149" d="M-9.047,6.987a308.565,308.565,0,0,1,44.72-3.7,336.205,336.205,0,0,1,45.9,3.7l.945,4.566L74.645,8.64,35.673,6.987-1.8,8.64l-8.267,2.992Z" transform="translate(84 46)" opacity="0.31" fill="url(#linear-gradient)"/>
      <path id="Path_150" data-name="Path 150" d="M-7.669,6.7A300.752,300.752,0,0,1,35.673,3.286,315.468,315.468,0,0,1,80.309,6.881l1.265,4.138L74.683,10a328.635,328.635,0,0,0-39.01-2.724A289.686,289.686,0,0,0-1.433,9.891L-9.047,11Z" transform="translate(84 42)" opacity="0.31" fill="url(#linear-gradient)"/>
      <path id="Path_151" data-name="Path 151" d="M-6.016,6.547A276.255,276.255,0,0,1,35.673,3.286,300.443,300.443,0,0,1,78.656,6.609l1.653,4.219L74.683,10a328.635,328.635,0,0,0-39.01-2.724A289.686,289.686,0,0,0-1.433,9.891l-6.235.811.731-2.03Z" transform="translate(84 38)" opacity="0.31" fill="url(#linear-gradient)"/>
      <path id="Path_152" data-name="Path 152" d="M-3.547,6.188a251.649,251.649,0,0,1,39.22-2.9A278.561,278.561,0,0,1,76.2,6.219L77.469,8.25l1.141,2.344L74.683,10a328.635,328.635,0,0,0-39.01-2.724A289.686,289.686,0,0,0-1.433,9.891L-6,10.531S-5.379,9.2-4.766,8.109A22.571,22.571,0,0,1-3.547,6.188Z" transform="translate(84 34)" opacity="0.31" fill="url(#linear-gradient)"/>
      <path id="Path_153" data-name="Path 153" d="M.531,5.625S13.018,3.286,35.673,3.286s36.312,2.37,36.312,2.37l2.078,2.016L76.156,10.2,74.683,10a328.635,328.635,0,0,0-39.01-2.724A289.686,289.686,0,0,0-1.433,9.891l-2.067.3s1.059-1.406,2.067-2.547S.531,5.625.531,5.625Z" transform="translate(84 30)" opacity="0.31" fill="url(#linear-gradient)"/>
      <path id="Path_154" data-name="Path 154" d="M6.317,4.93S15.53,2.985,35.673,3.286s30.312,1.7,30.312,1.7L69.36,7.406l2.578,2.234L71.047,9.5A289.255,289.255,0,0,0,35.673,7.275,240.336,240.336,0,0,0,4.086,9.083L.653,9.6,3.571,6.989Z" transform="translate(84 26)" opacity="0.31" fill="url(#linear-gradient)"/>
      <path id="Path_155" data-name="Path 155" d="M15,4.158s3.563-.933,20.67-.872,20.858.729,20.858.729a41.455,41.455,0,0,1,4.3,1.969c2.238,1.191,5.141,2.984,5.141,2.984l-1.047-.109S54.655,7.471,35.673,7.275,9.922,8.38,9.922,8.38L6.42,8.9l4.154-2.506Z" transform="translate(84 22)" opacity="0.31" fill="url(#linear-gradient)"/>
      <path id="Path_156" data-name="Path 156" d="M35.874,4.039c12.4.051,20.209,3.845,20.209,3.845s-3.347-.491-20.41-.609-20.289.832-20.289.832S23.474,3.987,35.874,4.039Z" transform="translate(84 18)" opacity="0.31" fill="url(#linear-gradient)"/>
    </g>
  </g>
</svg>`

const bammagera = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="145.717" viewBox="0 0 240 145.717">
  <g id="bam_magera" data-name="bam magera" transform="translate(0 -10)">
    <rect id="Rectangle_27" data-name="Rectangle 27" width="240" height="72" transform="translate(0 10)" fill="rgba(255,255,255,0)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_122" data-name="Path 122" d="M8,0S6.643,11.669,10.573,29.977c2.042,9.512,8.772,27.867,9.474,37.256C22.047,93.984,16,107,16,107l-5.545,5.084L7.6,104.656s.969-10.912,2.969-37.662c.682-9.122-4.429-27.115-5.038-36.9C4.413,12.04,8,0,8,0Z" transform="translate(88.945 148.689) rotate(-159)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_143" data-name="Path 143" d="M2.682,112.084S1.325,100.415,5.255,82.107C7.3,72.595,14.027,54.24,14.729,44.851c2-26.75-4.047-39.766-4.047-39.766L5.137,0,2.286,7.428S3.255,18.34,5.255,45.09C5.937,54.212.826,72.205.217,81.994-.9,100.044,2.682,112.084,2.682,112.084Z" transform="translate(114.61 42.144) rotate(-21)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_124" data-name="Path 124" d="M12.864,3.35s-5.408,10.819-.328,32.669c2.639,11.351,15.287,36.3,16.554,47.428,3.61,31.7-6.5,43.839-6.5,43.839l-16.305-.94s12.668-12.269,13.135-43.738C19.58,71.876,8.6,47.45,7.408,35.855,5.2,14.477,12.864,3.35,12.864,3.35Z" transform="matrix(-0.921, -0.391, 0.391, -0.921, 74.103, 161.256)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_142" data-name="Path 142" d="M6.578,123.935S1.17,113.116,6.25,91.267C8.889,79.915,21.537,54.967,22.8,43.839,26.414,12.135,16.305,0,16.305,0L0,.94S12.668,13.209,13.135,44.678C13.294,55.409,2.318,79.836,1.123,91.43-1.081,112.809,6.578,123.935,6.578,123.935Z" transform="matrix(0.921, -0.391, 0.391, 0.921, 120.707, 41.634)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_123" data-name="Path 123" d="M3.5-7.193s3.786,18.2,7.637,37.129,9.5,25.8,10.205,35.187C23.341,91.874,16,107,16,107l-8.024,5.181s.6-18.437,2.6-45.187c.682-9.122-6.353-27.977-6.962-37.766A357.484,357.484,0,0,1,3.5-7.193Z" transform="translate(79.517 145.171) rotate(-155)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_141" data-name="Path 141" d="M.418,119.373S4.2,101.17,8.055,82.244s9.5-25.8,10.205-35.187c2-26.75-5.341-41.876-5.341-41.876L4.895,0s.6,18.437,2.6,45.187C8.173,54.308,1.138,73.163.529,82.953A357.485,357.485,0,0,0,.418,119.373Z" transform="translate(114.624 42.199) rotate(-25)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_125" data-name="Path 125" d="M8.227.562s-.576,13.6,4.75,35.368c2.767,11.308,10.978,33.326,12.359,44.4,3.935,31.539-1.369,46.393-1.369,46.393L7.513,125.6s7.885-14.958,8.064-46.216C15.637,68.72,9.118,47.241,7.8,35.708,5.384,14.443,8.227.562,8.227.562Z" transform="matrix(-0.891, -0.454, 0.454, -0.891, 64.804, 157.411)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_140" data-name="Path 140" d="M1.4,126.157s-.576-13.6,4.75-35.368c2.767-11.308,10.978-33.326,12.359-44.4C22.443,14.854,17.139,0,17.139,0L.685,1.123S8.57,16.081,8.748,47.34C8.809,58,2.29,79.478.977,91.011-1.445,112.276,1.4,126.157,1.4,126.157Z" transform="matrix(0.891, -0.454, 0.454, 0.891, 122.509, 41.404)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_126" data-name="Path 126" d="M8.227.562S7.651,12.69,12.977,32.1c2.767,10.083,10.978,29.714,12.359,39.585,3.935,28.121-1.369,41.365-1.369,41.365l-16.454-1S15.4,98.708,15.576,70.837c.061-9.5-6.458-28.655-7.772-38.939C5.384,12.938,8.227.562,8.227.562Z" transform="matrix(-0.891, -0.454, 0.454, -0.891, 68.011, 138.23)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_139" data-name="Path 139" d="M1.4,112.485S.823,100.357,6.149,80.95C8.917,70.867,17.127,51.236,18.508,41.366,22.443,13.244,17.139,0,17.139,0L.685,1S8.57,14.338,8.748,42.209c.061,9.5-6.458,28.655-7.772,38.939C-1.445,100.108,1.4,112.485,1.4,112.485Z" transform="matrix(0.891, -0.454, 0.454, 0.891, 125.509, 34.404)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_127" data-name="Path 127" d="M8.227.562s-.576,9.459,4.75,24.6c2.767,7.864,10.978,23.176,12.359,30.875C29.271,77.968,23.967,88.3,23.967,88.3L7.513,87.517s7.885-10.4,8.064-32.141C15.637,47.962,9.118,33.025,7.8,25,5.384,10.215,8.227.562,8.227.562Z" transform="matrix(-0.891, -0.454, 0.454, -0.891, 67.993, 123.677)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_138" data-name="Path 138" d="M1.4,87.736s-.576-9.459,4.75-24.6c2.767-7.864,10.978-23.176,12.359-30.875C22.443,10.33,17.139,0,17.139,0L.685.781s7.885,10.4,8.064,32.141C8.809,40.335,2.29,55.273.977,63.294-1.445,78.083,1.4,87.736,1.4,87.736Z" transform="matrix(0.891, -0.454, 0.454, 0.891, 136.763, 41.903)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_128" data-name="Path 128" d="M8.227.562s-.576,9.459,4.75,24.6c2.767,7.864,10.978,23.176,12.359,30.875C29.271,77.968,23.967,88.3,23.967,88.3L7.513,87.517s7.885-10.4,8.064-32.141C15.637,47.962,9.118,33.025,7.8,25,5.384,10.215,8.227.562,8.227.562Z" transform="matrix(-0.891, -0.454, 0.454, -0.891, 65.993, 114.677)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_137" data-name="Path 137" d="M1.4,87.736s-.576-9.459,4.75-24.6c2.767-7.864,10.978-23.176,12.359-30.875C22.443,10.33,17.139,0,17.139,0L.685.781s7.885,10.4,8.064,32.141C8.809,40.335,2.29,55.273.977,63.294-1.445,78.083,1.4,87.736,1.4,87.736Z" transform="matrix(0.891, -0.454, 0.454, 0.891, 138.763, 32.903)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_129" data-name="Path 129" d="M8.227.562s-.576,9.459,4.75,24.6c2.767,7.864,10.978,23.176,12.359,30.875C29.271,77.968,23.967,88.3,23.967,88.3L7.513,87.517s7.885-10.4,8.064-32.141C15.637,47.962,9.118,33.025,7.8,25,5.384,10.215,8.227.562,8.227.562Z" transform="translate(62.529 108.341) rotate(-150)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_136" data-name="Path 136" d="M1.4,87.736s-.576-9.459,4.75-24.6c2.767-7.864,10.978-23.176,12.359-30.875C22.443,10.33,17.139,0,17.139,0L.685.781s7.885,10.4,8.064,32.141C8.809,40.335,2.29,55.273.977,63.294-1.445,78.082,1.4,87.736,1.4,87.736Z" transform="translate(137.993 28.458) rotate(-30)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_130" data-name="Path 130" d="M7.734.562s-.373,6.127,3.077,15.932c1.793,5.094,7.111,15.012,8.005,20,2.549,14.208-.887,20.9-.887,20.9L7.272,56.886s5.107-6.738,5.223-20.819c.039-4.8-4.183-14.477-5.034-19.673C5.892,6.815,7.734.562,7.734.562Z" transform="matrix(-0.819, -0.574, 0.574, -0.819, 62.729, 81.203)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_135" data-name="Path 135" d="M.906,56.83S.533,50.7,3.983,40.9c1.793-5.094,7.111-15.012,8.005-20C14.537,6.691,11.1,0,11.1,0L.444.506S5.551,7.244,5.667,21.325C5.706,26.127,1.483,35.8.633,41-.936,50.577.906,56.83.906,56.83Z" transform="matrix(0.819, -0.574, 0.574, 0.819, 148.704, 30.273)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_131" data-name="Path 131" d="M7.734.562s-.373,6.127,3.077,15.932c1.793,5.094,7.111,15.012,8.005,20,2.549,14.208-.887,20.9-.887,20.9L7.272,56.886s5.107-6.738,5.223-20.819c.039-4.8-4.183-14.477-5.034-19.673C5.892,6.815,7.734.562,7.734.562Z" transform="translate(59.37 71.731) rotate(-135)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_134" data-name="Path 134" d="M.906,56.83S.533,50.7,3.983,40.9c1.793-5.094,7.111-15.012,8.005-20C14.537,6.691,11.1,0,11.1,0L.444.506S5.551,7.244,5.667,21.325C5.706,26.127,1.483,35.8.633,41-.936,50.577.906,56.83.906,56.83Z" transform="translate(143.634 26.321) rotate(-45)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_132" data-name="Path 132" d="M7.734.562s-.373,6.127,3.077,15.932c1.793,5.094,7.111,15.012,8.005,20,2.549,14.208-.887,20.9-.887,20.9L7.272,56.886s5.107-6.738,5.223-20.819c.039-4.8-4.183-14.477-5.034-19.673C5.892,6.815,7.734.562,7.734.562Z" transform="matrix(-0.559, -0.829, 0.829, -0.559, 58.871, 61.066)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_133" data-name="Path 133" d="M.906,56.83S.533,50.7,3.983,40.9c1.793-5.094,7.111-15.012,8.005-20C14.537,6.691,11.1,0,11.1,0L.444.506S5.551,7.244,5.667,21.325C5.706,26.127,1.483,35.8.633,41-.936,50.577.906,56.83.906,56.83Z" transform="translate(136.125 23.312) rotate(-56)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_144" data-name="Path 144" d="M26.5-1.238C48.814-2.449,58.315,1.861,58.315,10.7S41.136,32,26.5,32,.022,17.285.022,8.449,4.186-.027,26.5-1.238Z" transform="translate(92 13)"/>
  </g>
</svg>`


const spikyhair = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="141.372" viewBox="0 0 240 141.372">
  <g id="spiky" transform="translate(0 -10)">
    <rect id="Rectangle_26" data-name="Rectangle 26" width="240" height="72" transform="translate(0 10)" fill="rgba(255,255,255,0)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_114" data-name="Path 114" d="M-5.816-15.758,19.337,54.453,8.137,65.227Z" transform="matrix(-0.966, 0.259, -0.259, -0.966, 191.709, 106.957)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_121" data-name="Path 121" d="M0,80.985,25.153,10.774,13.952,0Z" transform="matrix(0.966, 0.259, -0.259, 0.966, 58.366, 44.447)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_115" data-name="Path 115" d="M-9-23.789,19.337,54.453,8.137,65.227Z" transform="translate(178.246 110.018) rotate(176)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_120" data-name="Path 120" d="M0,89.017,28.342,10.774,17.141,0Z" transform="matrix(0.998, 0.07, -0.07, 0.998, 56.132, 46.321)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_116" data-name="Path 116" d="M4.395-27.835,19.337,54.453,8.137,65.227Z" transform="translate(165.246 112.018) rotate(176)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_119" data-name="Path 119" d="M4.849,88.468,14.942,10.774,3.742,0Z" transform="matrix(0.998, 0.07, -0.07, 0.998, 82.499, 49.256)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_117" data-name="Path 117" d="M12.37-42.107l6.967,96.561L8.137,65.227Z" transform="translate(147.246 108.018) rotate(176)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_118" data-name="Path 118" d="M7.171,81.681,11.2,10.774,0,0Z" transform="matrix(0.998, 0.07, -0.07, 0.998, 104.231, 45.517)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_112" data-name="Path 112" d="M-2.335,51.4C8.335,26.41,2.342,30.649,16.082,15.741S63,0,63,0V29.772s-6.613,18.71-22.363,26.017S-35.076,88.238-35.076,88.238-13,76.4-2.335,51.4Z" transform="translate(57 21)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_113" data-name="Path 113" d="M30.259,51.4C19.59,26.41,25.582,30.649,11.843,15.741S-35.076,0-35.076,0V29.772s6.613,18.71,22.363,26.017S63,88.238,63,88.238,40.929,76.4,30.259,51.4Z" transform="translate(154 21)"/>
  </g>
</svg>`

const hairlinedupUnisex = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="72" viewBox="0 0 240 72">
  <g id="hair_lined_up" data-name="hair lined up" transform="translate(15.097 -9.923)">
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_15" data-name="Path 15" d="M.4.623H50.9V29.964H15.89L.4,70.61Z" transform="translate(54 9.3)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_49" data-name="Path 49" d="M50.9.623H.4V29.964H35.417L50.9,70.61Z" transform="translate(103.5 9.3)"/>
    <rect id="Rectangle_22" data-name="Rectangle 22" width="240" height="72" transform="translate(-15.097 9.923)" fill="rgba(255,255,255,0)"/>
  </g>
</svg>`;

const longhairWoman = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="174.166" viewBox="0 0 240 174.166">
  <g id="long_hair_woman" data-name="long hair woman" transform="translate(15.406 -5.844)">
    <rect id="Rectangle_13" data-name="Rectangle 13" width="240" height="72" transform="translate(-15.406 5.844)" fill="rgba(255,255,255,0)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Union_1" data-name="Union 1" d="M7.635,174.166h0s0-.015-.008-.036c-.235-1.108-1.485-7.089-2.9-16.052-1.424-9.05-3.309-23.09-4.2-38.582-1-17.413-.577-33.075,1.271-46.55A125.689,125.689,0,0,1,6.6,51.22a71.273,71.273,0,0,1,8.711-18.269c7.31-10.644,15.67-18.911,24.847-24.573A58.067,58.067,0,0,1,53.954,2.112,49.52,49.52,0,0,1,68.146,0,50.878,50.878,0,0,1,95.31,8.11c9.021,5.618,17.231,13.976,24.4,24.842a82.208,82.208,0,0,1,9.057,19.09,135.955,135.955,0,0,1,5.252,22.109,246.317,246.317,0,0,1,2.291,46.416c-.546,15.308-2.107,29.067-3.322,37.913-1.306,9.508-2.518,15.624-2.531,15.685L98.945,162.928H98.8a160.254,160.254,0,0,0-16.166-2.9V142.8c.634-.742,1.361-1.6,2.223-2.629l.271-.324c8.644-10.311,14.889-17.759,19.688-28.181,1.723-3.745,3.39-6.951,5-10.052,4.216-8.111,7.546-14.518,7.877-23.452.265-7.149.816-22.025-5.659-36.473a44.512,44.512,0,0,0-3.993-8.092A50.465,50.465,0,0,1,113.2,54.919S90.866,47.1,68.281,47.1s-45.429,7.819-45.429,7.819a65.839,65.839,0,0,1,4.294-18.608,45.828,45.828,0,0,0-2.421,5.378C18.249,56.14,18.8,71.014,19.067,78.162c.33,8.935,3.66,15.341,7.876,23.453,1.612,3.1,3.279,6.307,5,10.051,4.8,10.422,11.044,17.871,19.688,28.181l.271.324c.55.656,1.092,1.3,1.656,1.964v18.331c-8.139,1.208-15.915,2.75-16.774,2.922h-.054l-29.1,10.778Z" transform="translate(36.336 5.844)"/>
  </g>
</svg>`;

const shorthair = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="100.324" viewBox="0 0 240 100.324">
  <g id="short_hair" data-name="short hair" transform="translate(2 -5.385)">
    <rect id="Rectangle_15" data-name="Rectangle 15" width="240" height="72" transform="translate(-2 5.385)" fill="rgba(255,255,255,0)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_11" data-name="Path 11" d="M-9.364,94.709s-5.37-65.69,3.267-81.827S40.65-5.615,40.65-5.615V25.778S14.383,22.925,2.628,32.121C-2.144,35.854.974,45.439-3.99,61.294S-9.364,94.709-9.364,94.709Z" transform="translate(77.418 11)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_63" data-name="Path 63" d="M39,94.709s5.37-65.69-3.267-81.827-46.747-18.5-46.747-18.5V25.778s26.268-2.854,38.022,6.342c4.772,3.734,1.655,13.318,6.618,29.174S39,94.709,39,94.709Z" transform="translate(128.014 11)"/>
  </g>
</svg>`


const bartsimpson = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="72" viewBox="0 0 240 72">
  <g id="bartsimpson" transform="translate(14.771 -11.586)">
    <rect id="Rectangle_12" data-name="Rectangle 12" width="240" height="72" transform="translate(-14.771 11.586)" fill="rgba(255,255,255,0)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_46" data-name="Path 46" d="M49.382,1.159c-.21-.238-12.349,17.92-12.349,17.92l-6.6-18.021L21.164,12.876,16.284,1.058l-8.54,8.39L-.155.586v26.14l37.188,4.605L50.167,70.586S50.44,2.353,49.382,1.159Z" transform="translate(104.53 11)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_47" data-name="Path 47" d="M.661,1.159C.872.921,13.01,19.079,13.01,19.079l6.6-18.021,9.272,11.818,4.88-11.818,8.54,8.39L50.2.586v26.14L13.01,31.331-.124,70.586S-.4,2.353.661,1.159Z" transform="translate(54.884 11)"/>
  </g>
</svg>`;


const slickhairUnisex = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="84.036" viewBox="0 0 240 84.036">
  <g id="slick" transform="translate(2.931 -9.581)">
    <rect id="Rectangle_16" data-name="Rectangle 16" width="240" height="72" transform="translate(-2.931 9.581)" fill="rgba(255,255,255,0)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_16" data-name="Path 16" d="M14.149,12.613c19.883-20.892,38.6-11.092,61,3.118S104.627,5.4,104.114,84.618c0,0-1.711-28.595-18.173-39.712s-69.9-4.581-69.9-4.581L4.676,84.618S-5.733,33.5,14.149,12.613Z" transform="translate(62.504 9)"/>
  </g>
</svg>`;

const iro = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="72" viewBox="0 0 240 72">
  <g id="iro" transform="translate(40 -2.061)">
    <rect id="Rectangle_20" data-name="Rectangle 20" width="240" height="72" transform="translate(-40 2.061)" fill="rgba(255,255,255,0)"/>
    <path id="Path_51" data-name="Path 51" d="M.647-14.57A70.488,70.488,0,0,1,10.387,10c2.851,14.672-.746,22.264-.746,22.264L7.6,33.733Z" transform="translate(38.406 58.713) rotate(-146)" fill="#393838" opacity="0.5"/>
    <path id="Path_52" data-name="Path 52" d="M-.038,48.2A69.815,69.815,0,0,0,9.741,23.654C12.591,8.982,8.994,1.389,8.994,1.389L6.906-.151Z" transform="translate(102.5 30.454) rotate(-34)" fill="#393838" opacity="0.5"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_31" data-name="Path 31" d="M29.363.061,29.5,24.288c-14.5,0-31.622.293-31.622.293Z" transform="translate(50.48 2)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_50" data-name="Path 50" d="M-1.984.061l-.137,24.227c14.5,0,31.622.293,31.622.293Z" transform="translate(81.48 2)"/>
  </g>
</svg>`

/** Shirts **/
const kanedashirt = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <g id="kaneda_clothes" data-name="kaneda clothes" transform="translate(39 -12.271)">
    <path id="Rectangle_41" data-name="Rectangle 41" d="M0,0H240V240H0Z" transform="translate(-39 12.271)" fill="#fff" opacity="0"/>
    <path id="Path_176" data-name="Path 176" d="M110.828,49.86V69.418H5.446C17.027,30.906,46.247,9.982,82.759,3.172l1.933,5.993Z" transform="translate(-29.505 182.582)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Path_177" data-name="Path 177" d="M18.428,46.813,5.746,53.124,3.723,69.418H110.564C103.846,47.081,91.39,30.4,74.734,18.825c-5.614-3.9-18.619-9.992-18.619-9.992S34.23,3.379,34.7,5.19c1.028,3.947,2.1,12.384-5.608,15.509-.251.1-5.834-1.367-6.311-1.088C13.615,24.822,18.428,46.813,18.428,46.813Z" transform="translate(75.495 182.582)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="path_176_ov" data-name="path 176 ov" d="M112.966,53.976l-2.138,12.611v2.831H5.446C17.027,30.906,46.382,10.433,82.894,3.623l1.8,5.542Z" transform="translate(-29.505 182.582)" fill="#515151" opacity="0.3"/>
    <path id="path_177_ov" data-name="path 177 ov" d="M18.428,46.813,7.859,54.4,3.723,69.418H110.564C103.846,47.081,91.39,30.4,74.734,18.825c-5.614-3.9-18.619-9.992-18.619-9.992S34.23,3.379,34.7,5.19c1.028,3.947,2.1,12.384-5.608,15.509-.251.1-5.834-1.367-6.311-1.088C13.615,24.822,18.428,46.813,18.428,46.813Z" transform="translate(75.495 182.582)" fill="#515151" opacity="0.3"/>
    <path id="Pfad_80" data-name="Pfad 80" d="M-2.24,2.376s26.608-6.708,55.8-11.333V4.189S64.763,40.7,75.887,40.315s13.735-1.961,13.735-1.961L92.908,2.37V-7.237s18.869,1.231,22.743,2.892L142.47,1.738l-13.1,8.479L110.89,41.579l-35,6.161C47.045,42.979,4.2,37.1,4.2,37.1L5.6,8.537Z" transform="translate(8 189)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="pfad_80_ov" data-name="pfad 80 ov" d="M-2.24,2.376s26.608-6.708,55.8-11.333V4.189S64.763,40.7,75.887,40.315s13.735-1.961,13.735-1.961L92.908,2.37V-7.237s18.869,1.231,22.743,2.892L142.47,1.738l-13.1,8.479L110.89,41.579l-35,6.161C47.045,42.979,4.2,37.1,4.2,37.1L5.6,8.537Z" transform="translate(8 189)" fill="#515151" opacity="0.3"/>
    <path id="Pfad_74" data-name="Pfad 74" d="M.186.186,10.953-3.729l-.028.405L10.653.561l.2.6L0,5Z" transform="matrix(0.998, -0.07, 0.07, 0.998, 50.839, 193.39)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_73" data-name="Pfad 73" d="M0,1.1S7.518.275,14.018,0,26,0,26,0a4,4,0,0,1,4,4V20L0,16.89Z" transform="matrix(0.995, 0.105, -0.105, 0.995, 51.121, 192.487)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_77" data-name="Pfad 77" d="M-7.02-.123c3.036-.128,11.246,4.008,19.391,8.6C21.121,13.4,29.709,18.88,29.709,18.88l.155,1.471L-.178,17.14-4.994,9.4Z" transform="matrix(-0.995, -0.105, 0.105, -0.995, 76.879, 232.391)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_81" data-name="Pfad 81" d="M-13.925,3.027c1.688-.071-.845.771,7.24.768,5.95,0,22.439-1.179,26.055.859A21.97,21.97,0,0,1,29.709,18.88l-7.072,6.528L.258,12.282l-13.8-5.647Z" transform="matrix(-0.995, -0.105, 0.105, -0.995, 69.879, 238.391)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_75" data-name="Pfad 75" d="M.692,4.783,14,7.961l-.03-.4-.038-4.1L1.03.017Z" transform="matrix(-0.998, -0.07, 0.07, -0.998, 114.307, 198.379)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_76" data-name="Pfad 76" d="M0,18.9s6.592.825,12.292,1.1S22.8,20,22.8,20a3.778,3.778,0,0,0,3.507-4l.152-14.083L2.9,4.182Z" transform="matrix(-0.995, 0.105, -0.105, -0.995, 115.969, 212.377)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_78" data-name="Pfad 78" d="M-8.706,22.632c2.648.232,10.74-4.873,18.368-10.17,7.062-4.9,13.677-10,13.677-10L24.333,0,.356,2.864l-8,9.65Z" transform="matrix(0.995, -0.105, 0.105, 0.995, 88.803, 210.17)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_79" data-name="Pfad 79" d="M-1.208.147c.07-1.333,42.343,9.537,42.343,9.537,3.314,0,6.94,11.933,6.94,15.247L73.057,48.973,6.6,38.451C3.841,38.451.551,33.6.551,30.843l.1-28.6S-1.278,1.479-1.208.147Z" transform="translate(6.956 191.127) rotate(-3)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_86" data-name="Pfad 86" d="M19.341,4.372l8.452-2.181s5.979,5.473,5.924,12.517c-.028,3.448,1.59,5.62-.951,12.749s-11.2,15.776-11.2,15.776S12.25,42.418-.643,46.941-34.5,56.164-34.5,56.164-35.827,48.8-28.56,39.079-5.774,28.387,2.5,19.9,12.835,9.09,19.341,4.372Z" transform="matrix(0.995, 0.105, -0.105, 0.995, 123.528, 184.77)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_106" data-name="Pfad 106" d="M-1.208.147c.025-.484,19.191,3.619,26.993,5.679L40.009,9.419a6,6,0,0,1,2.492.825,10.706,10.706,0,0,1,2.54,3.884,36.661,36.661,0,0,1,3.087,10.685,115.918,115.918,0,0,1,13.4,10.763A132.44,132.44,0,0,1,74.054,49.837L69.9,48.553,7.335,38.568,6.6,38.451C3.841,38.451.551,33.6.551,30.843l.1-28.6S-1.278,1.479-1.208.147Z" transform="translate(6.956 191.127) rotate(-3)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_113" data-name="Pfad 113" d="M25.358,1.353S35.616,8.186,41.866,14.436,52.585,24.658,52.585,24.658C28.72,16.294,28,20.874,26.64,20.66s-8.251.858-8.251.858-1.288-.382-1.482-.858a15.234,15.234,0,0,1-.431-2.025Z" transform="translate(30.773 212.035)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_141" data-name="Pfad 141" d="M25.358,1.353S35.616,8.186,41.866,14.436,52.585,24.658,52.585,24.658C28.72,16.294,28,20.874,26.64,20.66s-8.251.858-8.251.858-1.288-.382-1.482-.858a15.234,15.234,0,0,1-.431-2.025Z" transform="translate(30.773 212.035)" opacity="0.3"/>
    <path id="Pfad_112" data-name="Pfad 112" d="M24.342,1.326s11.274,6.86,17.524,13.11S51.5,24.7,51.5,24.7c-23.864-8.364-27.663-5.436-29.02-5.649s-8.251.858-8.251.858-1.288-.382-1.482-.858.474-2.176.474-2.176Z" transform="translate(32 212)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Pfad_114" data-name="Pfad 114" d="M-1.427-1.427A34,34,0,0,1,1.525-3.443L19.583,4.938s.313,9.092-2.62,12.025c-4.6,4.6-13.944,4.446-18.39,0C-6.024,12.366-6.024,3.171-1.427-1.427Z" transform="translate(30.723 204.719)" fill="#b51e1e"/>
    <path id="Pfad_115" data-name="Pfad 115" d="M.213.283s-1.63-3.954,6.763-2.254C14.709.075,18.316,8.78,18.316,8.78Z" transform="translate(32 201)" fill="#971c1c"/>
    <path id="Pfad_116" data-name="Pfad 116" d="M-.99,0h6.9A4.725,4.725,0,0,1,6.948,2.99,4.82,4.82,0,0,1,5.911,6L-.035,5.946-2.013.483C-1.811.192-.99,0-.99,0Z" transform="translate(43.886 208.979) rotate(135)" fill="#7c7cc1"/>
    <path id="Pfad_117" data-name="Pfad 117" d="M2.206,0h6.9a4.725,4.725,0,0,1,1.037,2.99A4.82,4.82,0,0,1,9.107,6h-6.9A2.955,2.955,0,0,1,0,2.99,2.92,2.92,0,0,1,2.206,0Z" transform="translate(29.73 214.64) rotate(-45)" fill="#d686a6"/>
    <path id="Pfad_118" data-name="Pfad 118" d="M.334,1.288A5.755,5.755,0,0,1,3.467,2.781,6.985,6.985,0,0,1,4.984,5.25L-.3,2.781S-.654,1.272.334,1.288Z" transform="translate(40 202)" fill="#3f3f61"/>
    <path id="Pfad_139" data-name="Pfad 139" d="M-1.18.188C-1.11-1.144,41.7,9.795,41.7,9.795c1.012,0,2.493,2.512,4.1,6.264a37.721,37.721,0,0,1,2.218,8.514L42.3,20.842C36.336,17.241,8.291,3.579,8.291,3.579Z" transform="translate(7.038 191.107) rotate(-3)" fill="#202020" opacity="0.3"/>
    <path id="Pfad_140" data-name="Pfad 140" d="M24.342,1.326s11.274,6.86,17.524,13.11S51.5,24.7,51.5,24.7c-23.864-8.364-27.663-5.436-29.02-5.649s-8.251.858-8.251.858-1.288-.382-1.482-.858.474-2.176.474-2.176Z" transform="translate(32 212)" fill="#fff" opacity="0.3"/>
  </g>
</svg>`

const sasukeshirt = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240.271" viewBox="0 0 240 240.271">
  <g id="Gruppe_2" data-name="Gruppe 2" transform="translate(0 0.271)">
    <path id="Rectangle_41" data-name="Rectangle 41" d="M0,0H240V240H0Z" transform="translate(0 -0.271)" fill="#fff" opacity="0"/>
    <path fill="${SHIRT_COLOR_PLACEHOLDER}"  id="Path_176" data-name="Path 176" d="M110.828,15.081V69.418H5.446C17.027,30.906,46.234,9.21,82.746,2.4c0,0,1.5,5.043,11.968,9.288S110.828,15.081,110.828,15.081Z" transform="translate(10 170.582)"/>
    <path fill="${SHIRT_COLOR_PLACEHOLDER}"  id="Path_177" data-name="Path 177" d="M5.746,15.081,3.723,69.418H110.564C98.982,30.906,70.34,9.21,33.831,2.4c0,0-1.5,5.043-11.968,9.288S5.746,15.081,5.746,15.081Z" transform="translate(115 170.582)"/>
    <rect fill="${SHIRT_COLOR_PLACEHOLDER}"  id="Rechteck_3" data-name="Rechteck 3" width="26" height="18" transform="translate(107 173)"/>
    <rect id="Rechteck_4" data-name="Rechteck 4" width="26" height="18" transform="translate(107 173)" opacity="0.03"/>
    <path fill="${SHIRT_COLOR_PLACEHOLDER}"  id="Pfad_42" data-name="Pfad 42" d="M1.451,1.717s-.895-.1,5.264-.209S25,0,25,0a32.116,32.116,0,0,1,1.693,9.461c0,4.75-.073,13.376-.073,13.376L-1.72,17.455A52.74,52.74,0,0,0,.16,8.985,64.017,64.017,0,0,1,1.451,1.717Z" transform="translate(94.425 160.023) rotate(30)"/>
    <path fill="${SHIRT_COLOR_PLACEHOLDER}"  id="Pfad_43" data-name="Pfad 43" d="M3.171,21.121s-.895.1,5.264.209S26.72,22.837,26.72,22.837a32.116,32.116,0,0,0,1.693-9.461C28.412,8.626,28.34,0,28.34,0L0,5.383a52.74,52.74,0,0,1,1.879,8.47A64.018,64.018,0,0,0,3.171,21.121Z" transform="translate(157.541 178.941) rotate(150)"/>
    <path id="Pfad_44" data-name="Pfad 44" d="M1.451,1.717s-.895-.1,5.264-.209S25,0,25,0a32.116,32.116,0,0,1,1.693,9.461c0,4.75-.073,13.376-.073,13.376L-1.72,17.455A52.74,52.74,0,0,0,.16,8.985,64.017,64.017,0,0,1,1.451,1.717Z" transform="translate(94.425 160.023) rotate(30)" fill="#fff" opacity="0.1"/>
    <path id="Pfad_45" data-name="Pfad 45" d="M3.171,21.121s-.895.1,5.264.209S26.72,22.837,26.72,22.837a32.116,32.116,0,0,0,1.693-9.461C28.412,8.626,28.34,0,28.34,0L0,5.383a52.74,52.74,0,0,1,1.879,8.47A64.018,64.018,0,0,0,3.171,21.121Z" transform="translate(157.541 178.941) rotate(150)" fill="#fff" opacity="0.1"/>
    <rect id="Rechteck_5" data-name="Rechteck 5" width="49" height="3" transform="translate(119 191) rotate(90)" opacity="0.35"/>
  </g>
</svg>`

const santa = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240.271" viewBox="0 0 240 240.271">
  <g id="Gruppe_2" data-name="Gruppe 2" transform="translate(0 0.271)">
    <path  fill="${SHIRT_COLOR_PLACEHOLDER}" id="Path_176" data-name="Path 176" d="M110.828,15.081V69.418L5.746,69c11.581-38.512,40.488-59.79,77-66.6,0,0,1.5,5.043,11.968,9.288S110.828,15.081,110.828,15.081Z" transform="translate(10 170.582)"/>
    <path  fill="${SHIRT_COLOR_PLACEHOLDER}" id="Path_177" data-name="Path 177" d="M5.746,15.081V69.418L110.828,69C99.246,30.488,70.34,9.21,33.831,2.4c0,0-1.5,5.043-11.968,9.288S5.746,15.081,5.746,15.081Z" transform="translate(115 170.582)"/>
    <path id="Differenzmenge_1" data-name="Differenzmenge 1" d="M40.142,129.106l0,0a108.6,108.6,0,0,1-9.487-11.053,77.629,77.629,0,0,1-6.912-10.85,35.537,35.537,0,0,1-3.957-11.76c-.308-2.582-.579-5.058-.84-7.452-1.282-11.731-2.39-21.863-6.813-33.46A187.549,187.549,0,0,1,5.744,34.273C4.3,28.615,3.061,22.78,2.073,16.93.389,6.964,0,.337,0,.271.013.315,1.408,4.935,7.772,9.543c5.842,4.23,17.171,9.272,37.971,9.272s32.27-5.042,38.228-9.272C90.429,4.959,91.985.317,92,.271L92,.3a183.685,183.685,0,0,1-1.768,23.317,165.538,165.538,0,0,1-4.466,21.92,104.076,104.076,0,0,1-8.862,22.3c-.658,1.187-1.282,2.33-1.885,3.434a116.025,116.025,0,0,1-8.284,13.655A89.794,89.794,0,0,1,53.1,99.346a38.143,38.143,0,0,0-11.729,19.476A37.559,37.559,0,0,0,40.142,129.1ZM31.4,27.271a2.4,2.4,0,0,0-2.4,2.4,5.606,5.606,0,0,0,5.6,5.6,59.745,59.745,0,0,0,11.084,1.243A53.617,53.617,0,0,0,56.4,35.271a5.606,5.606,0,0,0,5.6-5.6,2.4,2.4,0,0,0-2.4-2.4,46.282,46.282,0,0,1-4.63.248,23.92,23.92,0,0,1-3.708-.248,13.02,13.02,0,0,1-5.578-2.232,28.526,28.526,0,0,1-7.012,2.232,22.666,22.666,0,0,1-3.473.248A28.739,28.739,0,0,1,31.4,27.271Z" transform="translate(74 103.729)" fill="#ece0e0"/>
    <rect id="Rectangle_41" data-name="Rectangle 41" width="240" height="240" transform="translate(0 -0.271)" fill="#fff" opacity="0"/>
  </g>
</svg>
`


const staysafe = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="240" height="240" viewBox="0 0 240 240">
  <defs>
    <linearGradient id="linear-gradient" x1="0.603" y1="0.44" x2="-2.391" y2="1.608" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#fff"/>
      <stop offset="1" stop-color="gray"/>
    </linearGradient>
    <linearGradient id="linear-gradient-2" x1="0.085" y1="0.278" x2="4.325" y2="2.305" xlink:href="#linear-gradient"/>
    <linearGradient id="linear-gradient-3" x1="0.536" y1="0.46" x2="0.514" y2="-0.08" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#beedf6"/>
      <stop offset="1" stop-color="#60767a"/>
    </linearGradient>
    <linearGradient id="linear-gradient-4" x1="0.464" y1="0.46" x2="0.486" y2="-0.08" xlink:href="#linear-gradient-3"/>
    <linearGradient id="linear-gradient-9" x1="0.5" y1="0" x2="0.5" y2="1" xlink:href="#linear-gradient"/>
  </defs>
  <g id="grey_shirt" data-name="grey shirt" transform="translate(-68 -116)">
    <path id="Path_36" data-name="Path 36" d="M-46.159,58s4.244-29.726,26.886-45.975S25.71-7.5,25.71-7.5s.821,15.041,9.112,22.488S58.9,22.451,58.9,22.451L61.814,58H-46.159Z" transform="translate(129 298)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Path_307" data-name="Path 307" d="M58.9,58S54.654,28.274,32.012,12.025-12.97-7.5-12.97-7.5s-.821,15.041-9.112,22.488-26.553,7.571-26.553,7.571L-46.159,58H58.9Z" transform="translate(234 298)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <g id="mask" transform="translate(68 127)">
      <rect id="Rectangle_24" data-name="Rectangle 24" width="240" height="240" transform="translate(0 -11)" fill="rgba(255,255,255,0)"/>
      <path id="Path_105" data-name="Path 105" d="M20.9,24.642s-9.51-17.633-9.51-5.883,10.785,40.1,10.785,40.1" transform="translate(60.114 68.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1"/>
      <path id="Path_106" data-name="Path 106" d="M12.661,24.642s9.51-17.633,9.51-5.883-10.785,40.1-10.785,40.1" transform="translate(146.114 68.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1"/>
      <path id="Path_94" data-name="Path 94" d="M-2.166,5.424,27.107,1.841,37.391-.844l.156,6.267-10.28,2.6L-2.166,11.974Z" transform="translate(82.614 87)" fill="url(#linear-gradient)"/>
      <path id="Path_103" data-name="Path 103" d="M37.547,5.424,8.274,1.841-1.79-.844l-.375,6.267L8.111,8.329l29.435,3.645Z" transform="translate(121.748 87)" fill="url(#linear-gradient-2)"/>
      <path id="Path_95" data-name="Path 95" d="M-2.166,5.424,27.107,1.841,37.547-.922V15.083l-10.44.716L-5.032,19.792l2.866-9.826Z" transform="translate(82.614 93)" fill="#c0ebf3"/>
      <path id="Path_102" data-name="Path 102" d="M34.681,5.424,5.408,1.841-5.032-.922V15.083l10.44.716,32.138,3.992L34.681,9.966Z" transform="translate(124.614 93)" fill="#c0ebf3"/>
      <path id="Path_96" data-name="Path 96" d="M-5.032,3.587,27.107-.4l10.44-.517L37.436,17.3,27.107,15.8-2.984,11.366-3.5,9.728Z" transform="translate(82.614 109)" fill="url(#linear-gradient-3)"/>
      <path id="Path_101" data-name="Path 101" d="M37.547,3.587,5.408-.4-5.032-.922l.256,18.3L5.408,15.8,35.5,11.366l.512-1.638Z" transform="translate(124.614 109)" fill="url(#linear-gradient-4)"/>
      <path id="Path_97" data-name="Path 97" d="M-2.984-6.737l30.091,4.3L37.547-.922V10.765L27.107,8.821-.733.837Z" transform="translate(82.614 127)" fill="url(#linear-gradient-3)"/>
      <path id="Path_100" data-name="Path 100" d="M37.547-6.737,7.455-2.438-2.984-.922V10.765L7.455,8.821,35.3.837Z" transform="translate(122.567 127)" fill="url(#linear-gradient-4)"/>
      <path id="Path_98" data-name="Path 98" d="M-.733-11.265l27.84,7.983,10.44,1.945-.172,15.306a70.172,70.172,0,0,1-16-5.378A55.977,55.977,0,0,1,8.581-.723Z" transform="translate(82.614 139)" fill="url(#linear-gradient-3)"/>
      <path id="Path_99" data-name="Path 99" d="M37.547-11.265,9.707-3.282-.733-1.337l.36,15.29A69.7,69.7,0,0,0,15.439,8.591,55.977,55.977,0,0,0,28.233-.723Z" transform="translate(120.315 139)" fill="url(#linear-gradient-4)"/>
      <path id="Path_104" data-name="Path 104" d="M-.219-.312C-.266,16.3-.191,66.445-.191,66.445" transform="translate(120.114 86.5)" opacity="0.51" fill="url(#linear-gradient-9)"/>
    </g>
  </g>
</svg>`

const smoker = `<svg id="shirt" xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <path id="Path_163" data-name="Path 163" d="M24.94,8.274C52.675-2.2,59.911-.109,59.911-.109s.711,7.017,5.928,10.3,14.938,2.847,14.938,2.847V68H13.524V48.486l-30.845-.12S-2.794,18.746,24.94,8.274Z" transform="translate(40 172)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  <path id="Path_164" data-name="Path 164" d="M38.515,8.274C10.781-2.2,3.545-.109,3.545-.109S2.833,6.907-2.383,10.2s-14.938,2.847-14.938,2.847V68H49.932V48.486l30.845-.12S66.25,18.746,38.515,8.274Z" transform="translate(137 172)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  <g id="Group_3" data-name="Group 3" transform="translate(49.179 131.157)">
    <circle id="Ellipse_7" data-name="Ellipse 7" cx="22" cy="22" r="22" transform="translate(48.821 64.843)" fill="#fff" opacity="0.31"/>
    <g id="Ellipse_418" data-name="Ellipse 418" transform="translate(50.821 66.843)" fill="none" stroke="#333232" stroke-width="2">
      <circle cx="20" cy="20" r="20" stroke="none"/>
      <circle cx="20" cy="20" r="19" fill="none"/>
    </g>
    <path id="Path_298" data-name="Path 298" d="M0,0V39" transform="translate(71.321 67.343)" fill="none" stroke="#333232" stroke-width="2"/>
    <line id="Line_3" data-name="Line 3" x1="10" y2="12" transform="translate(61.321 91.343)" fill="none" stroke="#333232" stroke-width="2"/>
    <line id="Line_4" data-name="Line 4" x2="10" y2="12" transform="translate(71.321 91.343)" fill="none" stroke="#333232" stroke-width="2"/>
  </g>
  <rect id="Rectangle_43" data-name="Rectangle 43" width="240" height="240" fill="#fff" opacity="0"/>
</svg>`

const cutetop = `<svg id="top" xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <path id="Path_161" data-name="Path 161" d="M0-1.44s21.03-.023,39.052,3.994c15.061,3.357,21.432,7.663,21.432,7.663V34H0Z" transform="translate(60 206)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  <path id="Path_162" data-name="Path 162" d="M60.483-1.44s-21.03-.023-39.052,3.994C6.371,5.91,0,10.216,0,10.216V34H60.483Z" transform="translate(120 206)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  <line id="Line_1" data-name="Line 1" y2="24" transform="translate(61.5 183.5)" fill="none" stroke="${SHIRT_COLOR_PLACEHOLDER}" stroke-linecap="round" stroke-width="3"/>
  <line id="Line_2" data-name="Line 2" y2="24" transform="translate(178.983 183.5)" fill="none" stroke="${SHIRT_COLOR_PLACEHOLDER}" stroke-linecap="round" stroke-width="3"/>
  <rect id="Rectangle_42" data-name="Rectangle 42" width="240" height="240" fill="#fff" opacity="0"/>
</svg>`

const mario = `<svg id="klempner" xmlns="http://www.w3.org/2000/svg" width="240" height="240.271" viewBox="0 0 240 240.271">
  <path id="Path_176" data-name="Path 176" d="M110.828,15.081V69.418L5.746,69c11.581-38.512,40.488-59.79,77-66.6,0,0,1.5,5.043,11.968,9.288S110.828,15.081,110.828,15.081Z" transform="translate(10 170.853)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  <path id="Path_177" data-name="Path 177" d="M5.746,15.081V69.418L110.828,69C99.246,30.488,70.34,9.21,33.831,2.4c0,0-1.5,5.043-11.968,9.288S5.746,15.081,5.746,15.081Z" transform="translate(115 170.853)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  <path id="Path_178" data-name="Path 178" d="M0,9.368A534.311,534.311,0,0,0,59.244,13.1,580.772,580.772,0,0,0,120,9.368V56H0Z" transform="translate(60 184)" fill="#0b66c1"/>
  <path id="Path_180" data-name="Path 180" d="M15.546,3.38,0-3.009V16H15.546Z" transform="translate(164.454 180)" fill="#0b66c1"/>
  <path id="Path_181" data-name="Path 181" d="M0,3.907l15.546-6.54V16H0Z" transform="translate(60 180)" fill="#0b66c1"/>
  <circle id="Ellipse_8" data-name="Ellipse 8" cx="6" cy="6" r="6" transform="translate(166 195)" fill="#ffde91"/>
  <circle id="Ellipse_9" data-name="Ellipse 9" cx="6" cy="6" r="6" transform="translate(62 195)" fill="#ffde91"/>
  <rect id="Rectangle_41" data-name="Rectangle 41" width="240" height="240" fill="#fff" opacity="0"/>
</svg>`

const mutenroshishirt = `<svg id="songoku_shirt" data-name="songoku shirt" xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <g id="body" transform="translate(-68 -116.147)">
    <path id="Path_31" data-name="Path 31" d="M109.7,24.435,110,69H49.191L22.732,33.257C37.192,16.305,59.232,6.784,82.743,2.4,82.2,26.684,100.221,24.435,109.7,24.435Z" transform="translate(78 287)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Path_263" data-name="Path 263" d="M22.444,24.434,22.732,69H83.541L110,33.257C95.54,16.305,73.5,6.784,49.989,2.4,50.537,26.684,31.922,24.434,22.444,24.434Z" transform="translate(165 287)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  </g>
  <path id="Path_296" data-name="Path 296" d="M-1.016,5.7A103.876,103.876,0,0,1,11.253.328,91.532,91.532,0,0,1,23.72-2.95s1.8,19.772,10.117,36.01S61.594,62,61.594,62H0s-1.881.194-1.881-15.306c0-5.44,1.735-13.451,2.595-24.043S-1.016,5.7-1.016,5.7Z" transform="translate(60 178)" fill="#f97b27"/>
  <path id="Path_297" data-name="Path 297" d="M56.135,5.7A103.876,103.876,0,0,0,43.867.328,91.532,91.532,0,0,0,31.4-2.95S29.6,16.822,21.283,33.06-4.737,62-4.737,62H55.119S57,62.194,57,46.694c0-5.44-1.735-13.451-2.595-24.043S56.135,5.7,56.135,5.7Z" transform="translate(125 178)" fill="#f97b27"/>
  <g id="Group_7" data-name="Group 7" transform="translate(87 9)">
    <g id="Ellipse_417" data-name="Ellipse 417" transform="translate(59 198)" fill="#fff" stroke="#1a1a1a" stroke-width="1">
      <ellipse cx="15.5" cy="16.5" rx="15.5" ry="16.5" stroke="none"/>
      <ellipse cx="15.5" cy="16.5" rx="15" ry="16" fill="none"/>
    </g>
    <path id="Path_266" data-name="Path 266" d="M5.109-.967s1.537.689.931,2A52.226,52.226,0,0,0,3.4,8.565c-.69,2.662-.812,5.394-1.67,9.373S.718,22.717.718,22.717" transform="translate(64.879 202.815)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-width="2"/>
    <path id="Path_269" data-name="Path 269" d="M2.584.266a9.272,9.272,0,0,0-1.335,3.35C.96,4.733.909,5.879.549,7.547S-.307,9.454-.307,9.454" transform="translate(78.479 204.059)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-width="2"/>
    <path id="Path_270" data-name="Path 270" d="M3.443,1.073S2.222,1.025,1.557,3.592a15.4,15.4,0,0,0-.293,1.549c-.076.481-.18,1.327-.408,2.381C.5,9.191,0,9.429,0,9.429" transform="matrix(0.259, 0.966, -0.966, 0.259, 85.568, 201.703)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-width="2"/>
    <path id="Path_273" data-name="Path 273" d="M4.294,0A3.318,3.318,0,0,0,2.325,1.97C1.641,3.6,1.919,5.106,1.557,6.5c-.289,1.116-.341,2.262-.7,3.93S0,12.34,0,12.34" transform="matrix(0.259, 0.966, -0.966, 0.259, 86.567, 210.016)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-width="2"/>
    <path id="Path_271" data-name="Path 271" d="M2.5,0C2.21,1.116,1.216,4.464.856,6.133S0,8.039,0,8.039" transform="matrix(0.259, 0.966, -0.966, 0.259, 83.319, 206.596)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-width="2"/>
    <path id="Path_274" data-name="Path 274" d="M2.5,0C2.21,1.116,1.216,4.464.856,6.133S0,8.039,0,8.039" transform="matrix(0.259, 0.966, -0.966, 0.259, 81.506, 215.663)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-width="2"/>
    <path id="Path_276" data-name="Path 276" d="M1.07,7.577C.78,6.461,1.278,4.706.928,2.71A6.389,6.389,0,0,0,0,0" transform="matrix(0.995, -0.105, 0.105, 0.995, 72.738, 216.484)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-width="2"/>
    <path id="Path_277" data-name="Path 277" d="M.668,0C.379,1.116.35,2.893,0,4.889" transform="matrix(-0.974, -0.225, 0.225, -0.974, 81.103, 223.01)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-width="2"/>
    <path id="Path_275" data-name="Path 275" d="M1.308,0C1.018,1.116.516,2.63.156,4.3S.172,5.748.172,5.748" transform="matrix(0.259, 0.966, -0.966, 0.259, 79.916, 222.254)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-width="2"/>
    <path id="Path_272" data-name="Path 272" d="M1.021,0C.731,1.116.36,1.951,0,3.619" transform="translate(82.946 209.06)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-width="2"/>
    <path id="Path_267" data-name="Path 267" d="M8.179,0A16.055,16.055,0,0,1,4.288.527,26.194,26.194,0,0,0,.2.9" transform="translate(64.831 208.255)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-width="2"/>
    <path id="Path_268" data-name="Path 268" d="M5.922,0S5.315.654,3.275.654A5.49,5.49,0,0,0,0,1.664" transform="matrix(0.454, -0.891, 0.891, 0.454, 62.533, 211.274)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-width="2"/>
  </g>
  <rect id="Rectangle_40" data-name="Rectangle 40" width="240" height="240" fill="#fff" opacity="0"/>
</svg>`

const superman = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <g id="superman" transform="translate(-68 -116.147)">
    <path id="Path_31" data-name="Path 31" d="M110,11.241V69H5.746c11.581-38.512,40.488-59.79,77-66.6C91.326.8,100.523,11.241,110,11.241Z" transform="translate(78 287)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Path_48" data-name="Path 48" d="M5.746,11.255V69H110C98.419,30.488,69.512,9.21,33,2.4,24.421.8,15.224,11.255,5.746,11.255Z" transform="translate(182 287)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Path_245" data-name="Path 245" d="M13.3-3.8C30.35-8.386,60.035,1.7,76.349,2c19.271,0,47.045-11.15,64.694-5.8,31.8,9.647,15.2,37.125,15.2,37.125S114.672,3.885,76.349,3.885s-81.47,29.44-81.47,29.44S-25.027,6.5,13.3-3.8Z" transform="translate(112 282.481)" fill="#f64343"/>
    <path id="Subtraction_5" data-name="Subtraction 5" d="M98,167.147h0L75.9,154.284,68,116.147h60l-7.642,38.137L98,167.147Zm-22-46h0l5.785,28.466L98,161.147l16.131-11.534L120,121.147H76Z" transform="translate(90 185)" fill="#5a5555" opacity="0.45"/>
    <rect id="Rectangle_39" data-name="Rectangle 39" width="240" height="240" transform="translate(68 116.147)" fill="#fff" opacity="0"/>
  </g>
</svg>`

const brucejumper = `<svg id="bruce_jumper" data-name="bruce jumper" xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <g id="body" transform="translate(-68 -116.147)">
    <path id="Path_31" data-name="Path 31" d="M110-.021V69H5.746c11.581-38.512,40.488-59.79,77-66.6A149.325,149.325,0,0,1,110-.021Z" transform="translate(78 287)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Path_48" data-name="Path 48" d="M5.746-.021V69H110C98.419,30.488,69.512,9.21,33,2.4A149.325,149.325,0,0,0,5.746-.021Z" transform="translate(182 287)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  </g>
  <path id="Path_241" data-name="Path 241" d="M0,0S10.7,1.056,21.7,1.056,44,0,44,0V17a112.9,112.9,0,0,1-22.3,2.643A103.269,103.269,0,0,1,0,17Z" transform="translate(98 165)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  <path id="Path_244" data-name="Path 244" d="M0,0A86.9,86.9,0,0,0,21.65,3.158,96.29,96.29,0,0,0,44,0V2.6A89.979,89.979,0,0,1,21.65,6,81.249,81.249,0,0,1,0,2.6Z" transform="translate(98 179.643)" opacity="0.1"/>
  <path id="Path_243" data-name="Path 243" d="M0,6.23S19.933,22.914,50.8,24.554s53.928-14.4,53.928-14.4h0S75.176,15.73,51.063,13.191,9.787,7.642,9.787,7.642Z" transform="matrix(-0.799, -0.602, 0.602, -0.799, 219.169, 244.976)"/>
  <path id="Path_295" data-name="Path 295" d="M0,18.442S19.933,1.758,50.8.118s53.928,14.4,53.928,14.4h0S75.176,8.942,51.063,11.481,9.787,17.03,9.787,17.03Z" transform="matrix(0.799, -0.602, 0.602, 0.799, 5.282, 225.272)"/>
  <rect id="Rectangle_38" data-name="Rectangle 38" width="240" height="240" fill="#fff" opacity="0"/>
</svg>`

const naruto = `<svg id="naruto" xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <path id="Path_187" data-name="Path 187" d="M110-.021V69H5.746c11.581-38.512,40.488-59.79,77-66.6A149.325,149.325,0,0,1,110-.021Z" transform="translate(10 170.853)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  <path id="Path_188" data-name="Path 188" d="M5.746-.021V69H110C98.419,30.488,69.512,9.21,33,2.4A149.325,149.325,0,0,0,5.746-.021Z" transform="translate(114 170.853)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  <path id="Path_189" data-name="Path 189" d="M0,0H50.438V46.935L5.128,42.843Z" transform="translate(70 146)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  <path id="Path_308" data-name="Path 308" d="M50.439,0H0V46.643s11.419-.12,24.52-1.348,20.79-2.452,20.79-2.452Z" transform="translate(120 146)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  <path id="Path_190" data-name="Path 190" d="M50.439,0H0V46.643s11.419-.12,24.52-1.348,20.79-2.452,20.79-2.452Z" transform="translate(120 146)" opacity="0.1"/>
  <path id="Path_196" data-name="Path 196" d="M2.407,2.039H97.526A92.694,92.694,0,0,1,100,15.368,73.372,73.372,0,0,1,100,28H0A79.468,79.468,0,0,1,0,15.082,86.693,86.693,0,0,1,2.407,2.039Z" transform="translate(70 58)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
  <rect id="Rectangle_23" data-name="Rectangle 23" width="60" height="22" rx="8" transform="translate(90 62)" fill="#d1cccc"/>
  <path id="Path_197" data-name="Path 197" d="M16.106,11.022s-1.455-10.446-8.3-8.6-6.238,11.991,0,12.113,1.817-6.3,1.817-6.3" transform="translate(111.5 64.5)" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2" opacity="0.95"/>
  <g id="Group_5" data-name="Group 5" transform="translate(-27 7)">
    <path id="Intersection_3" data-name="Intersection 3" d="M15.623,47.787a25.978,25.978,0,0,0-6.375.786l-.021-.134c-.156-1.014.312-1.482,1.287-1.6l7.762-1.092c.779-.117,1.053-.429,1.053-1.209a.959.959,0,0,0-1.053-1.093H7.511c-.976,0-1.4-.39-1.4-1.4V37.324c0-.975.428-1.4,1.4-1.4h12.6c5.071,0,8.073,2.418,8.073,6.864v4.095a7.112,7.112,0,0,1-.855,3.7A25.543,25.543,0,0,0,15.623,47.787Z" transform="translate(132.648 166)" fill="#e23f3f" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
    <path id="Intersection_4" data-name="Intersection 4" d="M9.608,61.7V57.487c0-1.013.391-1.4,1.4-1.4h7.137c.976,0,1.4.391,1.4,1.4V61.86A17.582,17.582,0,0,1,9.608,61.7Zm.819-8.108-.655-4.114a28.687,28.687,0,0,1,5.2-.473,28.028,28.028,0,0,1,11.9,2.612,7.761,7.761,0,0,1-4.361,1.741L11.948,54.8a2.8,2.8,0,0,1-.333.022C10.881,54.817,10.564,54.442,10.427,53.587Z" transform="translate(132.267 166)" fill="#fff" stroke="rgba(0,0,0,0)" stroke-width="1"/>
  </g>
  <rect id="Rectangle_35" data-name="Rectangle 35" width="240" height="240" fill="#fff" opacity="0"/>
</svg>`

const pullover = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <g id="pullover" transform="translate(-67.762 -116.62)">
    <path id="Path_39" data-name="Path 39" d="M110.174,19.769c18.907,0,15.638-17.023,23.443-15.885,49.358,7.2,74.438,44.127,80.147,67.736H5.53C14.245,42.782,36.358,12.013,85.552,4.062,93.178,2.83,91.266,19.769,110.174,19.769Z" transform="translate(78 285)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Path_44" data-name="Path 44" d="M-13.608,4.485c-2.861,0-.737,4.992-3.173,8.6-3.721,5.5-15.066,12.349-17.549,15.936,0,2.772,7.233.406,12.638-3.642S-9.274,15.357-3.726,15.99C6.906,17.2,28.356,29.219,28.356,23.42S5.872,3.229-13.608,4.485Z" transform="translate(222 276)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Path_44-2" data-name="Path 44" d="M7.634,4.485c2.861,0,.737,4.992,3.173,8.6,3.721,5.5,15.066,12.349,17.549,15.936,0,2.772-7.233.406-12.638-3.642S3.3,15.357-2.248,15.99C-12.88,17.2-34.33,29.219-34.33,23.42S-11.846,3.229,7.634,4.485Z" transform="translate(159 276)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Path_44-3" data-name="Path 44" d="M-13.608,4.485c-2.861,0-.737,4.992-3.173,8.6-3.721,5.5-15.066,12.349-17.549,15.936,0,2.772,7.233.406,12.638-3.642S-9.274,15.357-3.726,15.99C6.906,17.2,28.356,29.219,28.356,23.42S5.872,3.229-13.608,4.485Z" transform="translate(222 276)" opacity="0.1"/>
    <path id="Path_44-4" data-name="Path 44" d="M7.634,4.485c2.861,0,.737,4.992,3.173,8.6,3.721,5.5,15.066,12.349,17.549,15.936,0,2.772-7.233.406-12.638-3.642S3.3,15.357-2.248,15.99C-12.88,17.2-34.33,29.219-34.33,23.42S-11.846,3.229,7.634,4.485Z" transform="translate(159 276)" opacity="0.1"/>
    <path id="Path_40" data-name="Path 40" d="M6,0S.589,5.819,0,12.554C-.2,14.8,3.467,21.075,3.645,26.938c.266,8.79-7.192,9.856-7.192,9.856" transform="translate(158.5 289.5)" fill="none" stroke="#3d3c3c" stroke-linecap="round" stroke-width="3"/>
    <path id="Path_41" data-name="Path 41" d="M6,36.794S.589,30.975,0,24.24C-.2,22,3.467,15.719,3.645,9.856,3.911,1.065-3.547,0-3.547,0" transform="translate(213.875 288.779) rotate(-18)" fill="none" stroke="#3d3c3c" stroke-linecap="round" stroke-width="3"/>
    <rect id="Rectangle_36" data-name="Rectangle 36" width="240" height="240" transform="translate(67.762 116.62)" fill="#fff" opacity="0"/>
  </g>
</svg>`

const shortbabyhair = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="104.224" viewBox="0 0 240 104.224">
  <g id="short_hair_babyhair" data-name="short hair babyhair" transform="translate(46.211 -35.516)">
    <rect id="Rectangle_17" data-name="Rectangle 17" width="240" height="72" transform="translate(-46.211 35.516)" fill="rgba(255,255,255,0)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_45" data-name="Path 45" d="M56.712-.421V16.387c-6.068,0-12.079,2.479-18.048,6.364C26.907,30.4,16.16,43.691,8.773,51.122,6.659,66.129-.865,59.216-.865,48.738-.865,20.571,12.757-1.822,56.712-.421Z" transform="translate(17 36)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_44" data-name="Path 44" d="M14.053,1.641,10.717,53.786,0,56Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 38.883, 138.178)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_46" data-name="Path 46" d="M12,0,10.717,22.65,0,23.582Z" transform="matrix(-0.974, 0.225, -0.225, -0.974, 40.814, 96.914)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_47" data-name="Path 47" d="M12,0,10.717,22.65,0,23.582Z" transform="matrix(-0.999, -0.035, 0.035, -0.999, 50.731, 83.768)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_48" data-name="Path 48" d="M12,0,10.717,22.65,0,23.582Z" transform="translate(60.795 72.997) rotate(-155)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_58" data-name="Path 58" d="M-.865-.421V16.387c6.068,0,12.079,2.479,18.048,6.364C28.941,30.4,38.931,45.82,46.318,53.251c2.114,15.007,10.395,5.965,10.395-4.513C56.712,20.571,43.09-1.822-.865-.421Z" transform="translate(74.458 36)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_59" data-name="Path 59" d="M14.053,54.359,10.717,2.214,0,0Z" transform="translate(121.02 83.614) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_60" data-name="Path 60" d="M12,23.582,10.717.933,0,0Z" transform="translate(111.796 73.936) rotate(13)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_61" data-name="Path 61" d="M12,23.582,10.717.933,0,0Z" transform="matrix(0.999, -0.035, 0.035, 0.999, 95.751, 60.2)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_62" data-name="Path 62" d="M12,23.582,10.717.933,0,0Z" transform="translate(77.883 47.19) rotate(9)"/>
  </g>
</svg>`

const cap = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="76.574" viewBox="0 0 240 76.574">
  <g id="cap" transform="translate(39 -45)">
    <rect id="Rectangle_18" data-name="Rectangle 18" width="240" height="72" transform="translate(-39 45)" fill="rgba(255,255,255,0)"/>
    <path id="Path_57" data-name="Path 57" d="M50.137,5.192c27.627,0,49.52,1.1,49.52,12.806S96.151,33.82,50.137,33.562.657,29.7.657,18,22.51,5.192,50.137,5.192Z" transform="translate(30.378 88)" opacity="0.2"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_35" data-name="Path 35" d="M48.423-.238c.136,0,0,44.757,0,44.757L-.454,55.715C-.454,15.414,21.226-.238,48.423-.238Z" transform="translate(32.489 45.238)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_55" data-name="Path 55" d="M-.394-.238c-.136,0,0,44.757,0,44.757l48.877,11.2C48.484,15.414,26.8-.238-.394-.238Z" transform="translate(80.489 45.238)"/>
    <path fill="${HAIR_COLOR_PLACEHOLDER}" id="Path_56" data-name="Path 56" d="M54.9-9.655c30.317,0,66.424,16.285,66.424,22.116S85.22-1.373,54.9-1.373-8.674,18.292-8.674,12.462,24.586-9.655,54.9-9.655Z" transform="translate(25 95.71)"/>
    <path id="Path_300" data-name="Path 300" d="M54.9-9.655c30.317,0,66.424,16.285,66.424,22.116S85.22-1.373,54.9-1.373-8.674,18.292-8.674,12.462,24.586-9.655,54.9-9.655Z" transform="translate(25 95.71)" fill="#fff" opacity="0.3"/>
  </g>
</svg>`

const prideshirt = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="240" height="240" viewBox="0 0 240 240">
  <defs>
    <pattern id="pattern" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" viewBox="0 0 420 298">
      <image width="420" height="298" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaQAAAEqCAYAAABa9iSdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATxSURBVHhe7dghbhBRFIbRuQ3B4GgQJHWQ1JDaSlgBFsMCUNU1iAaDZg1sgc1gSSWCBZAHYvbwPnFOMpl3V/Al/xzHsf5/ALDVxfkHgK0ECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASJh3b16u8w0A28zHt68FCYDtTHYAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBEDCfLu+WjNzngCwx/x6ernONwBsY7IDIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAAS5vHy+TpmzhMA9pg/X1+s8w0A25jsAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIGH+/nyy1nkAwC6zfh96BMB2JjsAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBhPv+4Wus8AGCXuXi41SMAtjPZAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACfPs/v2aY84TAPaYmw/f1/kGgG1MdgAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAwn66/rGOdFwBsMnevHuQIgO1MdgAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQMBx/AMN1SPVzHZNBgAAAABJRU5ErkJggg=="/>
    </pattern>
  </defs>
  <g id="V_shirt" data-name="V shirt" transform="translate(-68 -117)">
    <path id="Path_36" data-name="Path 36" d="M.137-1.521S5.964-3.477,12.363-4.93s13.372-2.4,13.372-2.4L58.9,30.6V58.853H0Z" transform="translate(129 298)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <path id="Path_37" data-name="Path 37" d="M58.761-1.521S52.934-3.477,46.535-4.93s-13.372-2.4-13.372-2.4L-.863,31.38V59L58.9,58.853Z" transform="translate(188 298)" fill="${SHIRT_COLOR_PLACEHOLDER}"/>
    <g id="Ellipse_3" data-name="Ellipse 3" transform="translate(141 311)" stroke="#e6e1e1" stroke-width="1" fill="url(#pattern)">
      <circle cx="10" cy="10" r="10" stroke="none"/>
      <circle cx="10" cy="10" r="9.5" fill="none"/>
    </g>
    <rect id="Rectangle_37" data-name="Rectangle 37" width="240" height="240" transform="translate(68 117)" fill="#fff" opacity="0"/>
  </g>
</svg>`

const rightarrow = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 38 44">
  <path id="Polygon_3" data-name="Polygon 3" d="M22,0,44,38H0Z" transform="translate(38) rotate(90)" fill="#fff"/>
</svg>`;

export class AvatarOption {
    value: string;
    code: number;
    type: string;

    constructor(init: AvatarOption) {
        this.value = init.value;
        this.code = init.code;
        this.type = init.type;
    }
}


export const avatarHairsOptions = [
    new AvatarOption({ value: slickhairUnisex, code: 1, type:'hair'}),
    new AvatarOption({value: messyhair, code: 2, type:'hair'}),
    new AvatarOption({ value: gon, code: 3, type:'hair'}),
    new AvatarOption({ value: cornrows, code: 4, type:'hair'}),
    new AvatarOption({ value: hairlinedupUnisex, code: 5, type:'hair'}),
    new AvatarOption({ value: bartsimpson, code: 6, type:'hair'}),
    new AvatarOption({ value: shorthair, code: 7, type:'hair'}),
    new AvatarOption({ value: shortbabyhair, code: 8, type:'hair'}),
    new AvatarOption({ value: cap, code: 9, type:'hair'}),
    new AvatarOption({value: sakura, code: 10, type:'hair'}),
    new AvatarOption({ value: iro, code: 11, type:'hair'}),
    new AvatarOption({value: curlywomenhair, code: 12, type:'hair'}),
    new AvatarOption({ value: spikyhair, code: 13, type:'hair'}),
    new AvatarOption({ value: bammagera, code: 14, type:'hair'}),
    new AvatarOption({ value: waves, code: 15, type:'hair'}),
    new AvatarOption({ value: brucelee, code: 16, type:'hair'}),
    new AvatarOption({ value: tyson, code: 17, type:'hair'}),
    new AvatarOption({value: durag, code: 18, type:'hair'}),
    new AvatarOption({value: robertsmith, code: 19, type:'hair'}),
    new AvatarOption({value: zorro, code: 20, type:'hair'}),
    new AvatarOption({value: geschmiert, code: 21, type:'hair'}),
    new AvatarOption({value: sasuke, code: 22, type:'hair'}),
    new AvatarOption({value: narutouzumaki, code: 23, type:'hair'}),
    new AvatarOption({value: headset, code: 24, type:'hair'}),
    new AvatarOption({value: headsetEars, code: 25, type:'hair'}),
    new AvatarOption({value: kusanagi, code: 26, type:'hair'}),
    new AvatarOption({value: kaneda, code: 27, type:'hair'}),
    new AvatarOption({value: sukuna, code: 28, type:'hair'}),



    //new AvatarOption({ value: songoku, code: 20, type:'hair'}),
]

export const avatarHeads = {
    blackwoman:  new AvatarOption({ value: blackwoman, code: 1, type:'head'}),
    blackman:  new AvatarOption({ value: blackman, code: 2, type:'head'}),
    alien:  new AvatarOption({ value: alien, code: 3, type:'head'}),
    thickblackman: new AvatarOption({ value: thickblackman, code: 4, type:'head'}),
    thickerman : new AvatarOption({ value: thickerman, code: 5, type:'head'})
}

export const avatarHeadsOptions = [
    avatarHeads.blackwoman,
    avatarHeads.blackman,
    avatarHeads.alien,
    avatarHeads.thickblackman,
    avatarHeads.thickerman
]

export const avatarShirtsOptions = [
    new AvatarOption({ value: pullover, code: 1, type:'shirt'}),
    new AvatarOption({ value: naruto, code: 2, type:'shirt'}),
    new AvatarOption({ value: brucejumper, code: 3, type:'shirt'}),
    new AvatarOption({ value: superman, code: 4, type:'shirt'}),
    new AvatarOption({ value: prideshirt, code: 5, type:'shirt'}),
    new AvatarOption({ value: mutenroshishirt, code: 6, type:'shirt'}),
    new AvatarOption({ value: mario, code: 7, type:'shirt'}),
    new AvatarOption({ value: cutetop, code: 8, type:'shirt'}),
    new AvatarOption({ value: smoker, code: 9, type:'shirt'}),
    new AvatarOption({ value: staysafe, code: 10, type:'shirt'}),
    new AvatarOption({ value: santa, code: 11, type:'shirt'}),
    new AvatarOption({ value: sasukeshirt, code: 12, type:'shirt'}),
    new AvatarOption({ value: kanedashirt, code: 13, type:'shirt'}),
]

export const colorOptions = ['#101010', '#402D1B', '#9A6F44', '#CBA670', '#DCCAAA', '#F2DFBE', '#D8D8D8', '#FFF2BC', '#F5C31F', '#FF861C', '#E93E4A', '#9A3EE9', '#4A90F9', '#1C3863', '#56D99C'];

export const arrows = {
    rightarrow:rightarrow,
}

