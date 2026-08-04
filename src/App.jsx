import React, { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   SARTA STUDIO — sarta.studio prototype
   Quiet luxury booking platform + client portal
   ───────────────────────────────────────────── */

const C = {
  cream: "#F4EFE6",
  creamWarm: "#EFE3CB",
  creamDeep: "#EDE6D8",
  ink: "#201D1A",
  text: "#45101C",
  burgundy: "#5B0F1F",
  burgundySoft: "#7A2534",
  glacier: "#C7D6EC",
  glacierDeep: "#9FB6D8",
  grey: "#6E6E73",
  line: "rgba(32,29,26,0.16)",
};

const F = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'DM Sans', -apple-system, sans-serif",
  mono: "'Roboto Mono', monospace",
};

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Roboto+Mono:wght@400;500&display=swap');
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; overflow-x: hidden; }
    img, svg { max-width: 100%; }
    * { min-width: 0; }
    ::selection { background: ${C.glacier}; color: ${C.text}; }
    input:focus, textarea:focus, button:focus-visible, a:focus-visible {
      outline: 2px solid ${C.burgundy}; outline-offset: 2px;
    }
    @keyframes riseIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .rise { animation: riseIn .7s cubic-bezier(.2,.6,.2,1) both; }
    .fade { animation: fadeIn .5s ease both; }
    @media (prefers-reduced-motion: reduce) {
      .rise, .fade { animation: none; }
      html { scroll-behavior: auto; }
    }
    @keyframes atmoDrift { 0% { transform: translate(0,0) scale(1); } 50% { transform: translate(2.5%,-2%) scale(1.07); } 100% { transform: translate(0,0) scale(1); } }
    .atmo { animation: atmoDrift 18s ease-in-out infinite; }
    .swatchdrift { animation: atmoDrift 26s ease-in-out infinite; }
    @keyframes gridFadeOut { 0% { opacity: 0.32; } 45% { opacity: 0.32; } 100% { opacity: 0; } }
    .gridfade { animation: gridFadeOut 7s ease forwards; }
    @media (prefers-reduced-motion: reduce) { .gridfade { animation: none; opacity: 0.18; } }
    @keyframes breathe { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
    .breathe { animation: breathe 5s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) { .atmo, .swatchdrift, .breathe { animation: none; } }
    .navburger { display: none; }
    .g2 { grid-template-columns: 1fr 1fr; }
    .g3 { grid-template-columns: repeat(3, 1fr); }
    .g4m2 { grid-template-columns: repeat(4, 1fr); }
    .split { grid-template-columns: 1fr 1fr; }
    .side { grid-template-columns: 200px 1fr; gap: 60px; }
    .foot { grid-template-columns: 2fr 1fr 1fr 1fr; }
    .hiw { grid-template-columns: repeat(4, 1fr); }
    .optcard { grid-template-columns: 120px 1fr auto; }
    .projcard { grid-template-columns: 130px 1fr; }
    .makercard { grid-template-columns: 180px 1fr; }
    .revrow { grid-template-columns: 160px 1fr; }
    @media (max-width: 880px) {
      .navlinks { display: none !important; }
      .navburger { display: flex !important; }
    }
    @media (max-width: 760px) {
      section:not(.hero):not(.strip) { padding: 52px 20px !important; }
      .strip { padding: 0 !important; }
      .sec-inner { padding: 10px 20px 46px !important; }
      .hero { min-height: 0 !important; }
      .hero > div:not([aria-hidden]) { padding: 60px 22px 50px !important; }
      .hero .rise { margin-bottom: 22px !important; }
      .hero .herologo svg { height: 118px !important; }
      h1 { font-size: 21px !important; letter-spacing: 0.1em !important; }
      h2 { font-size: 20px !important; margin-bottom: 26px !important; }
      p { font-size: 13.5px !important; }
      .step { padding: 26px 18px 66px !important; min-height: 0 !important; }
      .step > div:first-child { margin-bottom: 28px !important; }
      .g4m2 { gap: 10px !important; }
      .g4m2 > div { height: 178px !important; margin-top: 0 !important; }
      .g2, .g3, .split { gap: 12px !important; }
      footer > div { padding: 42px 20px 26px !important; }
      .breathe { display: none; }
      .iconrow { grid-template-columns: repeat(3, 1fr) !important; row-gap: 26px; justify-items: center; }
      .herotag { font-size: clamp(54px, 15vw, 84px) !important; line-height: 1.02 !important; margin-bottom: 26px !important; }
      .heromono { font-size: 12px !important; letter-spacing: 0.16em !important; margin-bottom: 12px !important; }
      .heroblurb { font-size: 13.5px !important; line-height: 1.75 !important; margin-bottom: 28px !important; }
      .iconrow > div { border-left: none !important; }
      .step .g3 button { padding: 20px 12px !important; font-size: 18px !important; }
      .step .g4m2 button { padding: 13px 8px !important; font-size: 15px !important; }
      .pills { gap: 8px !important; }
      .pills button { padding: 9px 15px !important; font-size: 12.5px !important; }
      .days button { min-width: 62px !important; padding: 11px 6px !important; font-size: 9.5px !important; }
      .slots { gap: 8px !important; }
      .slots button { padding: 9px 16px !important; font-size: 14px !important; }
      .upload { padding: 24px 14px !important; }
      .upload > div:first-child { font-size: 16px !important; }
      .optcard { padding: 12px !important; gap: 14px !important; }
      .optcard > div:first-child { height: 82px !important; }
      .optcard > div:nth-child(2) > div:first-child { font-size: 16.5px !important; }
      .optcard > div:nth-child(2) > div:nth-child(2) { font-size: 13px !important; }
      .revrow { padding: 12px 16px !important; }
      .revrow > div:last-child { font-size: 15px !important; }
      .pricecard > div { padding-left: 16px !important; padding-right: 16px !important; }
      .step > div:last-child button { padding: 12px 22px !important; }

      .g2, .g3, .split, .side, .foot, .hiw, .makercard { grid-template-columns: 1fr; }
      .side { gap: 26px; }
      .g4m2 { grid-template-columns: repeat(2, 1fr); }
      .optcard { grid-template-columns: 88px 1fr; }
      .projcard { grid-template-columns: 96px 1fr; }
      .revrow { grid-template-columns: 96px 1fr; }
      .foot { grid-template-columns: 1fr 1fr; gap: 30px 20px; }
      .foot > div:first-child { grid-column: 1 / -1; }
      .hiw > div { border-left: none !important; padding-left: 0 !important; border-top: 1px dashed rgba(32,29,26,0.16); padding-top: 24px; margin-top: 24px; }
      .hiw > div:first-child { border-top: none; padding-top: 0; margin-top: 0; }
      .authside { border-left: none !important; padding-left: 0 !important; border-top: 1px dashed rgba(32,29,26,0.25); padding-top: 28px; }
      .sidebar { position: static !important; display: flex; overflow-x: auto; gap: 2px; padding-bottom: 10px; align-items: center; -webkit-overflow-scrolling: touch; }
      .sidebar > div:first-child { display: none; }
      .sidebar button { border-left: none !important; white-space: nowrap; padding: 8px 12px !important; }
      .sidebar > div:last-child { margin-top: 0 !important; margin-left: 8px; }
    }
    button:active { transform: translateY(1px) scale(0.985); }
    .hoverlift { transition: transform .35s cubic-bezier(.2,.6,.2,1), box-shadow .35s; }
    .hoverlift:hover { transform: translateY(-3px); }
  `}</style>
);


/* ── Sarta wordmark — vectorized from brand logotype ── */
const LOGO_D = "M256.77 145.10 L256.15 145.42 L255.23 145.52 L250.24 145.03 L248.36 145.00 L243.81 145.79 L243.11 145.69 L242.54 145.32 L241.96 144.48 L241.50 143.39 L231.87 116.33 L229.70 111.48 L227.23 107.16 L225.61 104.88 L223.80 102.72 L221.99 100.92 L220.02 99.25 L217.15 97.34 L213.07 95.34 L209.83 92.70 L208.98 92.30 L207.79 92.04 L206.55 92.04 L205.30 92.28 L204.09 92.70 L202.68 93.41 L199.15 96.03 L194.98 98.82 L191.89 101.46 L189.12 104.42 L186.42 107.89 L183.92 111.55 L177.08 122.26 L174.89 125.32 L172.75 128.00 L169.99 130.98 L167.17 133.50 L164.10 135.73 L161.08 137.44 L159.08 138.32 L157.02 139.01 L153.07 139.76 L142.47 140.34 L139.57 140.30 L137.38 140.08 L135.57 139.69 L133.83 139.11 L132.16 138.34 L130.55 137.36 L129.01 136.18 L127.56 134.83 L126.29 133.32 L125.41 131.97 L124.43 129.68 L123.84 126.66 L123.54 119.95 L123.58 115.40 L123.82 112.87 L124.29 110.42 L126.50 102.97 L127.08 100.57 L127.34 98.51 L127.28 96.25 L127.38 95.77 L127.73 95.39 L129.72 94.51 L130.36 93.81 L130.70 92.94 L131.26 90.41 L131.82 88.97 L135.33 83.03 L140.34 72.94 L156.62 42.94 L171.73 15.63 L175.26 8.21 L176.20 6.78 L177.39 5.76 L178.38 5.38 L179.82 5.23 L185.26 5.81 L187.29 5.81 L188.83 5.48 L191.45 4.44 L192.36 4.34 L195.38 5.18 L197.71 5.51 L200.66 5.61 L207.29 5.48 L208.10 5.65 L208.81 5.98 L209.69 6.95 L210.41 8.62 L253.00 131.95 L256.56 141.41 L257.11 143.64 L257.08 144.49 L256.88 144.97 Z M445.76 145.78 L445.45 145.51 L445.16 144.91 L444.99 143.16 L445.00 23.25 L445.27 11.09 L445.21 9.98 L444.96 9.03 L444.45 8.31 L443.66 7.84 L442.28 7.52 L440.74 7.40 L429.63 7.70 L415.77 7.30 L412.35 7.47 L409.36 7.86 L407.21 8.37 L405.51 8.99 L403.94 9.81 L402.52 10.88 L400.84 12.83 L400.07 14.22 L398.78 17.25 L398.36 17.81 L397.84 18.20 L396.54 18.55 L391.22 18.71 L389.94 18.39 L389.50 18.02 L389.21 17.48 L388.92 15.64 L388.89 12.10 L389.19 11.13 L389.62 10.57 L390.28 10.08 L392.59 8.90 L393.06 8.32 L392.63 7.67 L390.43 6.27 L390.13 5.90 L390.32 5.74 L391.04 5.62 L395.52 5.54 L428.09 5.55 L452.28 5.37 L515.50 5.54 L518.49 5.62 L519.66 5.84 L519.68 6.02 L519.21 6.27 L515.65 7.46 L515.09 7.83 L514.88 8.25 L515.23 8.95 L518.18 11.56 L519.81 13.52 L520.36 14.47 L520.67 15.35 L520.71 16.13 L520.45 16.77 L519.65 17.43 L518.11 18.00 L515.72 18.47 L510.99 19.11 L509.52 19.03 L508.35 18.47 L507.68 17.70 L506.15 15.14 L505.04 13.68 L503.78 12.38 L502.10 11.05 L498.96 9.32 L497.25 8.67 L495.12 8.09 L492.17 7.60 L488.74 7.37 L474.56 7.71 L464.72 7.21 L462.91 7.45 L462.36 7.72 L461.77 8.37 L461.42 9.26 L461.22 10.30 L460.60 17.40 L460.25 24.96 L460.08 34.10 L460.06 65.10 L460.99 85.57 L461.17 94.31 L460.99 119.20 L461.19 136.11 L461.07 140.19 L460.78 143.78 L460.39 145.33 L460.04 145.75 L459.52 145.97 L458.36 145.89 L455.39 145.02 L453.93 144.81 L451.93 144.99 L447.62 145.90 L446.69 145.98 L445.96 145.87 Z M408.82 154.89 L406.95 155.22 L403.82 155.33 L400.11 155.19 L396.38 154.83 L390.46 153.79 L379.76 151.23 L374.02 149.45 L369.38 147.50 L365.30 145.16 L361.29 142.10 L358.38 139.30 L355.59 135.96 L353.38 132.65 L351.35 128.85 L349.75 125.21 L348.24 121.14 L343.82 107.04 L341.95 101.69 L339.74 96.54 L337.20 91.94 L335.51 89.49 L333.61 87.16 L331.48 84.95 L329.36 83.10 L327.35 81.66 L325.54 80.66 L323.67 79.95 L321.78 79.62 L320.52 79.65 L319.25 79.86 L316.45 80.87 L313.44 82.60 L309.82 85.27 L306.49 88.13 L292.89 100.61 L289.94 103.85 L287.86 106.91 L287.01 108.70 L286.39 110.57 L285.91 112.83 L285.65 115.17 L285.60 119.29 L286.07 130.03 L285.70 137.08 L285.97 142.33 L285.81 143.55 L285.49 144.25 L284.74 144.82 L283.68 145.09 L275.24 145.59 L273.95 145.55 L272.86 145.35 L271.99 144.96 L271.47 144.53 L270.96 143.76 L270.72 143.01 L270.54 140.83 L270.85 134.60 L270.93 129.68 L270.81 106.13 L270.92 19.00 L270.55 8.64 L270.72 7.11 L271.28 6.01 L272.34 5.45 L273.79 5.31 L281.02 5.56 L320.89 5.47 L335.23 5.66 L346.37 5.28 L349.77 5.31 L353.98 5.87 L355.82 6.37 L357.59 7.05 L359.28 7.93 L360.63 8.82 L363.38 11.29 L364.71 12.88 L365.88 14.58 L367.57 17.93 L368.23 19.84 L368.71 21.79 L369.03 23.78 L369.20 26.12 L368.98 30.50 L368.04 35.13 L366.47 39.56 L364.18 44.00 L361.76 47.62 L358.99 51.02 L355.70 54.45 L351.89 57.87 L347.07 61.63 L341.29 65.57 L335.93 68.84 L325.71 74.67 L324.72 75.47 L324.00 76.35 L323.61 77.24 L323.63 78.03 L324.10 78.62 L325.37 78.97 L331.18 78.85 L333.60 79.07 L336.06 79.68 L338.46 80.60 L341.69 82.30 L344.77 84.45 L347.61 86.96 L350.13 89.76 L351.73 91.93 L353.28 94.48 L354.62 97.14 L355.89 100.19 L357.76 105.86 L361.76 120.30 L363.20 124.37 L364.67 127.73 L366.93 131.86 L369.39 135.50 L372.41 139.15 L375.52 142.25 L379.16 145.24 L383.04 147.85 L387.42 150.24 L391.94 152.20 L395.06 153.22 L398.31 153.93 L401.74 154.27 L408.56 154.45 L409.18 154.59 L408.95 154.84 Z M639.15 145.09 L637.88 145.37 L634.01 145.10 L629.27 145.45 L628.00 145.11 L626.79 144.13 L625.86 142.67 L624.98 140.59 L619.43 123.92 L616.99 117.36 L614.47 111.81 L611.76 107.13 L610.13 104.83 L608.33 102.68 L606.59 100.92 L604.70 99.31 L595.76 93.40 L594.15 92.59 L592.48 92.16 L591.32 92.14 L589.82 92.45 L588.32 93.02 L586.58 93.91 L579.95 98.30 L576.15 101.46 L573.52 104.24 L570.80 107.71 L568.50 111.08 L561.84 121.53 L559.57 124.67 L557.11 127.68 L554.23 130.72 L551.13 133.46 L548.05 135.65 L545.06 137.31 L543.06 138.18 L540.99 138.88 L538.85 139.40 L536.63 139.74 L533.39 140.01 L526.53 140.28 L523.98 140.25 L521.79 140.03 L519.95 139.64 L518.47 139.14 L516.74 138.35 L515.11 137.36 L513.60 136.19 L512.23 134.87 L511.01 133.40 L509.99 131.81 L508.94 129.53 L508.20 126.80 L507.83 123.60 L507.84 119.99 L508.29 115.06 L509.30 107.96 L510.03 105.31 L511.47 102.02 L511.81 100.79 L511.83 99.85 L511.48 97.45 L511.60 96.69 L512.21 95.84 L514.29 94.02 L515.34 92.46 L516.39 90.16 L518.75 84.08 L520.45 80.56 L544.34 36.66 L555.98 15.96 L557.42 13.06 L559.57 7.89 L560.35 6.71 L561.30 5.86 L562.47 5.42 L563.84 5.29 L572.06 5.61 L578.79 5.51 L584.29 5.60 L590.26 5.39 L591.77 5.56 L593.08 6.00 L593.92 6.64 L594.56 7.57 L595.16 8.99 L599.18 21.08 L622.69 88.71 L628.21 103.96 L628.77 106.06 L629.11 108.26 L629.28 117.02 L629.67 119.65 L630.28 120.84 L631.86 122.37 L632.74 123.87 L633.78 126.46 L635.69 132.29 L636.32 133.64 L637.24 134.63 L639.59 135.90 L640.10 136.47 L640.32 136.96 L640.56 138.86 L640.29 142.44 L639.98 143.94 L639.33 144.96 Z M74.11 144.66 L71.48 145.15 L69.80 145.31 L68.68 145.14 L68.37 144.71 L68.64 144.26 L69.62 143.66 L74.65 141.78 L76.99 140.61 L80.57 138.17 L83.98 135.36 L87.12 132.21 L89.67 128.98 L91.64 125.72 L93.15 122.23 L94.05 119.19 L94.60 116.09 L94.79 112.96 L94.60 109.85 L94.08 107.11 L93.24 104.44 L91.94 101.59 L90.31 98.87 L88.81 96.82 L86.93 94.64 L85.13 92.84 L82.99 90.97 L80.75 89.28 L78.42 87.74 L75.73 86.21 L72.96 84.83 L68.07 82.81 L62.12 80.85 L56.35 79.27 L43.03 75.94 L36.23 73.91 L32.73 72.65 L29.54 71.31 L26.40 69.78 L23.62 68.19 L20.98 66.40 L18.52 64.41 L16.30 62.19 L14.55 59.98 L13.05 57.59 L11.68 54.75 L10.70 52.07 L9.91 48.98 L9.35 45.19 L9.22 41.37 L9.50 37.59 L10.19 33.89 L11.29 30.30 L12.79 26.84 L14.69 23.56 L16.77 20.74 L19.15 18.13 L21.78 15.76 L24.63 13.68 L27.37 12.06 L29.93 10.85 L32.84 9.74 L42.08 6.68 L45.24 5.84 L47.31 5.50 L49.45 5.38 L58.22 5.71 L64.82 5.29 L67.24 5.42 L69.79 6.04 L77.82 8.71 L81.63 10.16 L84.78 11.59 L88.05 13.46 L90.82 15.51 L93.35 17.88 L95.81 20.77 L97.77 23.67 L99.56 27.06 L100.97 30.62 L101.97 34.30 L102.40 36.80 L102.64 39.31 L102.66 41.82 L102.48 44.32 L102.08 46.78 L101.46 49.20 L100.69 51.22 L99.79 52.74 L99.05 53.61 L98.16 54.31 L97.11 54.82 L95.89 55.11 L88.77 54.93 L87.30 54.61 L86.85 54.08 L86.83 53.46 L87.97 48.36 L88.48 43.44 L88.46 39.64 L88.12 36.16 L87.29 32.10 L86.10 28.48 L84.52 25.03 L82.55 21.80 L80.01 18.60 L77.32 15.96 L74.32 13.65 L70.79 11.53 L66.74 9.68 L62.24 8.16 L57.98 7.18 L54.02 6.77 L51.60 6.84 L49.49 7.15 L47.40 7.70 L45.04 8.59 L42.45 9.85 L39.95 11.31 L37.30 13.13 L35.05 14.92 L32.95 16.85 L31.22 18.69 L29.45 20.89 L28.05 22.96 L26.82 25.13 L25.75 27.39 L24.86 29.73 L24.07 32.42 L23.25 37.03 L23.05 41.71 L23.48 46.36 L24.47 50.60 L26.02 54.66 L28.15 58.47 L30.85 61.96 L34.05 65.07 L37.11 67.44 L40.38 69.51 L44.06 71.40 L47.81 72.95 L51.04 74.03 L54.90 75.12 L69.73 78.59 L76.68 80.46 L83.49 82.81 L89.19 85.39 L92.18 87.06 L94.78 88.77 L97.26 90.67 L99.59 92.77 L101.74 95.06 L103.48 97.27 L105.18 99.89 L106.45 102.38 L107.65 105.57 L108.40 108.91 L108.70 112.35 L108.55 115.81 L107.95 119.23 L106.91 122.55 L105.43 125.71 L103.51 128.64 L101.00 131.56 L98.16 134.17 L94.81 136.66 L91.33 138.78 L87.76 140.53 L83.77 142.09 L79.58 143.37 L74.45 144.59 Z M149.16 137.62 L150.77 137.01 L152.29 136.04 L153.96 134.58 L155.75 132.66 L159.65 128.01 L162.60 124.10 L170.77 111.40 L174.46 106.36 L176.93 103.52 L179.60 100.88 L182.21 98.67 L184.97 96.71 L187.88 95.03 L191.22 93.55 L194.69 92.42 L198.60 91.57 L202.93 91.03 L207.37 90.86 L210.91 90.96 L219.97 91.52 L221.32 91.23 L221.79 90.91 L222.08 90.43 L222.21 89.58 L222.12 88.54 L221.13 84.97 L203.01 32.97 L197.17 15.34 L195.93 12.18 L194.73 9.70 L193.64 8.04 L192.64 7.21 L192.12 7.13 L191.61 7.32 L190.39 8.59 L188.04 12.46 L184.60 18.56 L146.51 88.85 L143.00 96.02 L140.55 102.28 L139.48 105.78 L138.68 109.05 L138.07 112.38 L137.65 115.75 L137.44 119.16 L137.46 122.62 L137.70 125.78 L138.14 128.26 L138.77 130.35 L139.68 132.34 L140.92 134.17 L142.25 135.57 L143.77 136.68 L145.43 137.43 L147.16 137.77 L148.88 137.68 Z M533.65 137.63 L535.02 137.15 L536.54 136.23 L537.97 135.01 L539.53 133.35 L543.80 128.13 L546.95 123.99 L555.46 111.04 L559.37 105.76 L561.83 102.94 L564.23 100.54 L566.79 98.35 L569.51 96.42 L572.39 94.78 L575.70 93.36 L579.19 92.29 L582.81 91.55 L587.16 91.04 L591.92 90.86 L596.41 90.96 L604.59 91.44 L606.01 91.18 L606.51 90.86 L606.82 90.38 L606.97 89.50 L606.88 88.41 L605.95 85.03 L587.97 33.55 L581.79 15.15 L580.46 11.65 L579.15 8.78 L578.20 7.39 L577.28 6.80 L576.33 6.86 L575.43 7.59 L574.57 8.77 L573.09 11.31 L564.36 26.99 L547.50 58.45 L535.48 79.90 L532.03 86.47 L529.09 92.58 L526.67 98.22 L524.77 103.40 L523.69 106.91 L522.87 110.18 L522.30 113.19 L521.92 116.25 L521.74 119.36 L521.80 122.53 L522.07 125.40 L522.55 127.92 L523.31 130.35 L524.24 132.34 L525.45 134.18 L526.72 135.56 L528.20 136.67 L529.86 137.42 L531.62 137.77 L533.37 137.69 Z M289.15 91.96 L291.07 91.09 L293.24 89.71 L301.12 83.34 L305.59 80.19 L310.15 77.37 L325.31 68.55 L329.91 65.63 L333.83 62.90 L338.16 59.54 L342.00 56.11 L345.32 52.67 L348.31 48.99 L350.03 46.50 L351.57 43.90 L352.91 41.21 L353.91 38.72 L354.73 36.17 L355.34 33.55 L355.73 30.88 L355.87 28.17 L355.75 25.44 L355.42 23.05 L354.77 20.33 L353.95 18.03 L352.92 15.87 L351.65 13.90 L350.16 12.17 L348.70 10.93 L347.35 10.08 L345.91 9.38 L342.77 8.40 L339.03 7.80 L334.07 7.51 L325.66 7.44 L304.71 7.62 L291.20 7.25 L289.89 7.39 L288.73 7.75 L287.75 8.39 L286.98 9.25 L286.40 10.27 L285.92 11.72 L285.58 15.02 L285.94 33.05 L285.79 55.78 L285.91 76.63 L285.67 89.30 L285.86 91.00 L286.32 91.90 L286.67 92.15 L287.31 92.31 L288.88 92.05 Z M50.60 146.22 L43.69 145.72 L35.89 144.83 L34.04 144.39 L25.32 141.05 L20.54 138.77 L17.96 137.22 L15.79 135.68 L13.76 133.98 L12.14 132.36 L10.67 130.60 L9.56 128.99 L8.42 127.01 L7.29 124.64 L6.08 121.60 L4.95 118.25 L4.30 115.79 L3.85 113.29 L3.66 111.04 L3.67 109.05 L3.88 107.00 L4.29 104.97 L4.89 103.01 L5.56 101.51 L6.55 99.90 L7.55 98.79 L8.71 97.92 L9.77 97.39 L11.28 96.92 L13.02 96.67 L15.31 96.62 L17.87 96.87 L19.61 97.28 L20.48 97.82 L20.63 98.35 L20.55 98.81 L19.44 101.59 L18.92 103.56 L18.45 107.87 L18.40 110.86 L18.54 113.49 L18.91 116.42 L19.44 118.98 L20.07 121.18 L20.99 123.63 L22.11 126.00 L23.42 128.28 L24.90 130.44 L26.33 132.23 L28.13 134.15 L29.82 135.69 L32.97 138.04 L36.38 140.02 L40.29 141.77 L44.64 143.26 L49.03 144.40 L53.37 145.21 L56.33 145.43 L61.46 145.26 L62.88 145.45 L63.34 145.70 L62.75 146.00 L60.95 146.21 L50.93 146.22 Z";
const LOGO_LINES = [[-699,96,2301,96],[-1466,154,1534,154],[-1642,145,1358,145],[-1640,6,1360,6],[4,-1227,4,1773],[8,-1626,8,1374],[271,-1641,271,1359],[460,-1640,460,1360],[286,-1640,286,1360],[203,-1131,1179,1706],[-331,-1559,647,1277],[52,-1556,1034,1279],[-201,-1132,782,1702],[41,-1559,1013,1279],[1370,-1461,-81,1165],[1149,-1034,-299,1593],[764,-1032,-684,1595],[754,-1038,-696,1589],[1389,-1470,-61,1156],[980,-1452,-468,1175],[1140,-1043,-309,1585]];
const SartaMark = ({ height = 22, color = "currentColor", grid = false, gridFade = false, style = {} }) => {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (!gridFade) return;
    const t = setTimeout(() => setGone(true), 4000);
    return () => clearTimeout(t);
  }, [gridFade]);
  return (
    <svg
      viewBox={grid ? "-85 -55 814 272" : "0 0 644 159"}
      height={height} style={{ display: "block", ...style }} role="img" aria-label="Sarta"
    >
      {grid && LOGO_LINES.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.1"
          style={{ opacity: gridFade && gone ? 0 : 0.45, transition: "opacity 4s ease" }} />
      ))}
      <path d={LOGO_D} fill={color} fillRule="nonzero" shapeRendering="geometricPrecision" />
    </svg>
  );
};

/* ── Atmosphere: slow-breathing ambient gradient (dye-bath tones) ── */
const Atmosphere = ({ dark = false }) => (
  <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
    <div className="atmo" style={{
      position: "absolute", inset: "-22%",
      background: dark
        ? "radial-gradient(46% 56% at 26% 32%, rgba(91,15,31,0.65), transparent 70%), radial-gradient(44% 54% at 76% 58%, rgba(159,182,216,0.2), transparent 70%), radial-gradient(36% 46% at 54% 92%, rgba(199,214,236,0.1), transparent 72%)"
        : "radial-gradient(44% 54% at 26% 30%, rgba(199,214,236,0.5), transparent 70%), radial-gradient(48% 58% at 76% 56%, rgba(91,15,31,0.12), transparent 72%), radial-gradient(40% 50% at 52% 88%, rgba(237,230,216,0.85), transparent 70%)",
    }} />
  </div>
);

/* ── Reveal: content arrives softly on scroll ── */
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0, transform: on ? "none" : "translateY(46px)",
      transition: `opacity 1.25s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1.25s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  );
};

/* ── Signature: basting-stitch divider ── */
const Stitch = ({ color = C.text, width = "100%", style = {} }) => (
  <svg width={width} height="6" style={{ display: "block", opacity: 0.35, ...style }} aria-hidden="true">
    <line x1="0" y1="3" x2="100%" y2="3" stroke={color} strokeWidth="1" strokeDasharray="14 9" />
  </svg>
);

const Eyebrow = ({ children, color = C.grey, style = {} }) => (
  <div style={{ fontFamily: F.mono, fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase", color, ...style }}>
    {children}
  </div>
);

const Btn = ({ children, primary, onClick, small, style = {}, ghost }) => (
  <button
    onClick={onClick}
    className="hoverlift"
    style={{
      fontFamily: F.mono, fontSize: small ? 10.5 : 11.5, letterSpacing: "0.14em",
      textTransform: "uppercase", cursor: "pointer",
      padding: small ? "10px 20px" : "16px 34px",
      background: primary ? C.burgundy : "transparent",
      color: primary ? C.cream : ghost ? C.grey : C.text,
      border: primary ? `1px solid ${C.burgundy}` : `1px solid ${ghost ? C.line : C.text}`,
      borderRadius: 100, ...style,
    }}
  >
    {children}
  </button>
);

const TextLink = ({ children, onClick, style = {} }) => (
  <button onClick={onClick} style={{
    fontFamily: F.mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
    background: "none", border: "none", cursor: "pointer", color: C.burgundy,
    padding: 0, borderBottom: `1px solid ${C.burgundy}`, paddingBottom: 3, ...style,
  }}>{children}</button>
);

/* ── Grain: film-grain overlay for brand gradients ── */
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`;

const TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.22' numOctaves='3'/%3E%3C/filter%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)' opacity='0.5'/%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.35'/%3E%3C/svg%3E")`;

const Grain = ({ opacity = 0.5 }) => (
  <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity, mixBlendMode: "soft-light", pointerEvents: "none" }} />
);

/* ── Fabric swatch: textile gradient panels for imagery ── */
const Swatch = ({ tone = "burgundy", label, sub, h = 320, style = {} }) => {
  const tones = {
    burgundy: `linear-gradient(160deg, #4A0C19 0%, ${C.burgundy} 45%, #6E1B2C 100%)`,
    glacier: `linear-gradient(160deg, #B3C7E4 0%, ${C.glacier} 50%, #D9E3F2 100%)`,
    cream: `linear-gradient(160deg, #E7DECC 0%, ${C.creamDeep} 55%, #F7F2E9 100%)`,
    ink: `linear-gradient(160deg, #171512 0%, ${C.ink} 55%, #35302B 100%)`,
    red: `linear-gradient(160deg, #8E1414 0%, #B01818 55%, #C93A2E 100%)`,
    grey: `linear-gradient(160deg, #56565B 0%, ${C.grey} 55%, #8C8C91 100%)`,
  };
  const weave = `repeating-linear-gradient(45deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 5px),
                 repeating-linear-gradient(-45deg, rgba(0,0,0,0.05) 0 1px, transparent 1px 5px)`;
  return (
    <div style={{ position: "relative", height: h, overflow: "hidden", borderRadius: 2, ...style }}>
      <div className="swatchdrift" style={{ position: "absolute", inset: "-16%", background: tones[tone] }} />
      <div style={{ position: "absolute", inset: 0, background: weave }} />
      <div style={{ position: "absolute", inset: 14, border: `1px solid rgba(244,239,230,0.28)` }} />
      {label && (
        <div style={{ position: "absolute", left: 24, right: 24, bottom: 20 }}>
          <div style={{
            fontFamily: F.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
            color: tone === "glacier" || tone === "cream" ? C.text : C.cream, opacity: 0.9,
          }}>{label}</div>
          {sub && (
            <div style={{
              fontFamily: F.sans, fontSize: 12, fontWeight: 300, lineHeight: 1.5, marginTop: 8,
              color: tone === "glacier" || tone === "cream" ? C.grey : "rgba(244,239,230,0.8)",
            }}>{sub}</div>
          )}
        </div>
      )}
    </div>
  );
};


/* ─────────────────────────────────────────────
   SARTA — sarta.app (the platform, for Makers)
   Sibling site to sarta.studio
   ───────────────────────────────────────────── */



/* ── Sarta monogram (constructed from brand logomark geometry) ── */
const MONO_D = "M 31.3 0.0 L 67.0 0.0 L 67.0 42.2 L 49.0 42.2 L 48.2 42.2 L 47.4 42.2 L 46.6 42.1 L 45.8 42.0 L 45.1 41.8 L 44.3 41.6 L 43.5 41.4 L 42.8 41.1 L 42.1 40.8 L 41.3 40.5 L 40.6 40.1 L 39.9 39.7 L 39.3 39.3 L 38.6 38.9 L 38.0 38.4 L 37.4 37.9 L 36.8 37.3 L 36.2 36.8 L 35.7 36.2 L 35.2 35.6 L 34.7 35.0 L 34.3 34.3 L 33.8 33.6 L 33.4 32.9 L 33.1 32.2 L 32.8 31.5 L 32.5 30.8 L 32.2 30.0 L 32.0 29.3 L 31.8 28.5 L 31.6 27.7 L 31.5 26.9 L 31.4 26.2 L 31.4 25.4 L 31.3 24.6 Z M 0.0 42.2 L 62.8 42.2 L 62.8 42.9 L 61.5 43.0 L 60.3 43.2 L 59.0 43.5 L 57.7 43.8 L 56.5 44.1 L 55.3 44.6 L 54.1 45.0 L 52.9 45.6 L 51.7 46.2 L 50.6 46.8 L 49.5 47.5 L 48.5 48.2 L 47.4 49.0 L 46.5 49.8 L 45.5 50.7 L 44.6 51.6 L 43.7 52.6 L 42.9 53.6 L 42.1 54.6 L 41.4 55.7 L 40.7 56.8 L 40.1 57.9 L 39.5 59.1 L 39.0 60.3 L 38.6 61.5 L 38.1 62.7 L 37.8 63.9 L 37.5 65.2 L 37.3 66.5 L 37.1 67.8 L 37.0 69.0 L 36.9 70.3 L 36.9 71.6 L 37.0 72.9 L 37.1 74.2 L 37.3 75.5 L 37.5 76.7 L 37.8 78.0 L 38.1 79.2 L 38.5 80.5 L 39.0 81.7 L 39.5 82.9 L 40.1 84.0 L 40.7 85.2 L 41.4 86.3 L 42.1 87.3 L 42.9 88.4 L 43.7 89.4 L 44.5 90.3 L 45.5 91.2 L 46.4 92.1 L 47.4 93.0 L 48.4 93.7 L 49.5 94.5 L 50.6 95.2 L 51.7 95.8 L 52.8 96.4 L 54.0 96.9 L 55.2 97.4 L 56.4 97.9 L 57.7 98.2 L 58.9 98.5 L 60.2 98.8 L 60.2 100.0 L 0.0 100.0 Z";
const SartaMonogram = ({ height = 44, color = "currentColor", style = {} }) => (
  <svg viewBox="0 0 67 100" height={height} style={{ display: "block", ...style }} role="img" aria-label="Sarta monogram">
    <path d={MONO_D} fill={color} />
  </svg>
);

/* ── Hero capability icons (1.5px line style) ── */
const ICO = {
  bookings: <g><rect x="3" y="5" width="22" height="20" rx="2"/><line x1="3" y1="11" x2="25" y2="11"/><line x1="9" y1="2.5" x2="9" y2="7"/><line x1="19" y1="2.5" x2="19" y2="7"/><g fill="currentColor" stroke="none">{[0,1,2,3].map(c=>[0,1].map(r=><circle key={c+"-"+r} cx={8+c*4} cy={15.5+r*4} r="1"/>))}</g></g>,
  tickets: <g><path d="M3 9 h22 v4 a3 3 0 0 0 0 6 v4 H3 v-4 a3 3 0 0 0 0-6 z"/><line x1="17" y1="9" x2="17" y2="23" strokeDasharray="2.5 2.5"/></g>,
  fittings: <g><circle cx="14" cy="4" r="1.8"/><path d="M9 8.5 h10 l1.5 9 a8 5.5 0 0 1 -13 0 z"/><line x1="14" y1="19.5" x2="14" y2="24"/><line x1="9.5" y1="25.5" x2="18.5" y2="25.5"/></g>,
  scheduling: <g><circle cx="14" cy="14" r="11"/><polyline points="14,7.5 14,14 18.5,16.5"/></g>,
  payments: <g><rect x="2.5" y="6" width="23" height="16" rx="2"/><line x1="2.5" y1="11" x2="25.5" y2="11" strokeWidth="3"/><line x1="6" y1="17" x2="12" y2="17"/></g>,
  chat: <g><path d="M4 5 h20 a2 2 0 0 1 2 2 v10 a2 2 0 0 1 -2 2 H12 l-5 4.5 V19 H4 a2 2 0 0 1 -2 -2 V7 a2 2 0 0 1 2 -2 z"/></g>,
  team: <g><circle cx="10" cy="10" r="4"/><path d="M3 24 a7 7 0 0 1 14 0"/><circle cx="20" cy="11" r="3"/><path d="M18.5 24 a6 6 0 0 1 7 -5.5"/></g>,
  report: <g><line x1="4" y1="24" x2="24" y2="24"/><line x1="8" y1="24" x2="8" y2="15"/><line x1="14" y1="24" x2="14" y2="8"/><line x1="20" y1="24" x2="20" y2="12"/></g>,
  inbox: <g><path d="M3 15 v6 a2 2 0 0 0 2 2 h18 a2 2 0 0 0 2 -2 v-6"/><path d="M3 15 h6 l2 3 h6 l2 -3 h6"/><line x1="14" y1="4" x2="14" y2="11"/><polyline points="10.5,8 14,11.5 17.5,8"/></g>,
  partner: <g><rect x="3" y="9" width="12" height="12" rx="2"/><rect x="13" y="5" width="12" height="12" rx="2"/></g>,
  network: <g><circle cx="14" cy="14" r="2.5"/><circle cx="5" cy="6" r="2"/><circle cx="23" cy="6" r="2"/><circle cx="14" cy="24.5" r="2"/><line x1="12.3" y1="12.4" x2="6.6" y2="7.5"/><line x1="15.7" y1="12.4" x2="21.4" y2="7.5"/><line x1="14" y1="16.5" x2="14" y2="22.5"/></g>,
};

const CapIcon = ({ name, size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICO[name]}
  </svg>
);

const CAPS = [
  ["bookings", "Bookings"],
  ["tickets", "Digital Tickets"],
  ["fittings", "Fittings"],
  ["scheduling", "Scheduling"],
  ["payments", "Payments"],
  ["chat", "Client Communication"],
];


/* ─────────────────────────────────────────────
   SARTA — sarta.app  V2 · film-first
   Inspired by video-led product storytelling
   ───────────────────────────────────────────── */

const FEATURES = [
  ["01", "Digital Ticketing", "tickets", "Every garment gets a ticket — photos, measurements, notes, and status from drop-off to done."],
  ["02", "Calendar & Fittings", "bookings", "Appointments, fittings, and due dates on one calendar that respects your working hours."],
  ["03", "Payments", "payments", "Quotes, deposits, invoices, and receipts — collected online or at the counter."],
  ["04", "Team Management", "team", "Assign work by specialty and capacity, and keep every Maker's queue balanced."],
  ["05", "Business Reporting", "report", "Revenue, turnaround, and repeat clients — the numbers behind the craft."],
  ["06", "Work Requests", "inbox", "Client requests from Sarta Studio land in your queue, matched to your specialties."],
  ["07", "Collaboration", "chat", "Message clients, stylists, and teammates inside the project — never lose a thread."],
  ["08", "Partner Tools", "partner", "Intake and routing tools for brands and retailers sending work into your studio."],
  ["09", "The Sarta Network", "network", "Utilize the Sarta network to outsource work when needed — overflow and out-of-specialty pieces go to trusted Makers, and the client relationship stays yours."],
];

const V2CONTENTS = [
  ["intro", "Introduction", "Say hello to Sarta"],
  ["work", "The Work", "Craft made calm"],
  ["app", "The App", "The tools of the trade"],
  ["clients", "Clients", "Their door is beautiful"],
  ["faq", "FAQs", "Answers to common questions"],
];

const FAQS = [
  ["What is Sarta?", "Sarta is a digital studio for fit and repair — one calm operating system that brings together bookings, ticketing, fittings, scheduling, payments, and client communication for the mending trades."],
  ["Who can join?", "Makers of every kind: tailors, cobblers, leatherworkers, reweavers, embroiderers, and menders — along with stylists, designers, and businesses like tailor shops, studios, brands, and retailers."],
  ["How do clients find me?", "Clients book through Sarta Studio, the beautifully designed client-facing side of the app. Requests arrive in your queue as tickets, matched to your specialties — and everything stays connected, automatically."],
  ["Can I hand off work I can't take?", "Yes. Utilize the Sarta network to outsource work when needed — overflow and out-of-specialty pieces go to trusted Makers, and the client relationship stays yours."],
  ["When does early access open?", "We're onboarding Makers and studios in small batches. Leave your email below and we'll hold your place at the table."],
];

const V2Nav = ({ scrollTo }) => {
  const [open, setOpen] = useState(false);
  const links = [["The Work", "work"], ["The App", "app"], ["FAQ", "faq"]];
  const nav = (id) => { setOpen(false); scrollTo(id); };
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(244,239,230,0.9)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.line}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: 0 }}>
          <SartaMark height={18} color={C.text} />
          <span style={{ fontFamily: F.mono, fontSize: 9.5, letterSpacing: "0.3em", textTransform: "uppercase", color: C.burgundy }}>App</span>
        </button>
        <div className="navlinks" style={{ display: "flex", alignItems: "center", gap: 26 }}>
          {links.map(([l, id]) => (
            <button key={id} onClick={() => nav(id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: F.sans, fontSize: 13.5, color: C.text, padding: 0 }}>{l}</button>
          ))}
          <a href="https://sarta.studio" target="_blank" rel="noreferrer" style={{ fontFamily: F.sans, fontSize: 13.5, color: C.grey, textDecoration: "none" }}>Book a Fitting</a>
          <Btn primary small onClick={() => nav("access")}>Early Access</Btn>
        </div>
        <div className="navburger" style={{ alignItems: "center", gap: 12 }}>
          <Btn primary small onClick={() => nav("access")} style={{ padding: "9px 16px" }}>Access</Btn>
          <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <div style={{ width: 20, borderTop: `2px solid ${C.text}`, marginBottom: 5 }} />
            <div style={{ width: 20, borderTop: `2px solid ${C.text}`, marginBottom: 5, opacity: open ? 0 : 1 }} />
            <div style={{ width: 20, borderTop: `2px solid ${C.text}` }} />
          </button>
        </div>
      </div>
      {open && (
        <div className="fade" style={{ borderTop: `1px solid ${C.line}`, padding: "6px 20px 16px", display: "grid", background: "rgba(244,239,230,0.98)" }}>
          {links.map(([l, id]) => (
            <button key={id} onClick={() => nav(id)} style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "14px 0", fontFamily: F.sans, fontSize: 16, color: C.text, borderBottom: `1px dashed ${C.line}` }}>{l}</button>
          ))}
          <a href="https://sarta.studio" target="_blank" rel="noreferrer" style={{ padding: "14px 0", fontFamily: F.sans, fontSize: 16, color: C.grey, textDecoration: "none" }}>Book a Fitting</a>
        </div>
      )}
    </nav>
  );
};

const Faq = ({ q, a }) => {
  const [on, setOn] = useState(false);
  return (
    <div style={{ borderBottom: `1px dashed ${C.line}` }}>
      <button onClick={() => setOn(!on)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, background: "none", border: "none", cursor: "pointer", padding: "20px 2px", textAlign: "left" }}>
        <span style={{ fontFamily: F.sans, fontSize: 15.5, fontWeight: 500, color: C.text }}>{q}</span>
        <span style={{ fontFamily: F.mono, fontSize: 16, color: C.burgundy, transform: on ? "rotate(45deg)" : "none", transition: "transform .3s" }}>+</span>
      </button>
      {on && (
        <p className="fade" style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: C.grey, margin: "0 0 20px", maxWidth: 640 }}>{a}</p>
      )}
    </div>
  );
};

const AUDIENCES = [
  { tone: "burgundy", title: "Makers", types: "Tailors · Cobblers · Leatherworkers · Reweavers · Embroiderers · Menders", desc: "The hands behind the work — every request, ticket, fitting, and payment in one calm queue." },
  { tone: "glacier", title: "Stylists", types: "Personal Stylists · Wardrobe Consultants", desc: "Send client pieces to trusted Makers and follow every item from request to ready." },
  { tone: "red", title: "Designers", types: "Fashion Designers · Custom & Bridal Ateliers", desc: "Sampling, finishing, and production-quality alterations with specialists you trust." },
  { tone: "grey", title: "Businesses", types: "Tailor Shops · Studios · Brands · Retailers", desc: "Teams, capacity, and routing — run the whole floor and every partner channel at once." },
];


/* ── Scroll transitions: masked line reveals + parallax drift ── */
const useSeen = (threshold = 0.25) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
};

const LineReveal = ({ lines, stagger = 0.14 }) => {
  const [ref, seen] = useSeen(0.3);
  return (
    <div ref={ref}>
      {lines.map((l, i) => (
        <div key={i} style={{ overflow: "hidden", paddingBottom: "0.16em", marginBottom: "-0.16em" }}>
          <div style={{
            transform: seen ? "translateY(0)" : "translateY(115%)",
            transition: `transform 1.2s cubic-bezier(.16,1,.3,1) ${i * stagger}s`,
          }}>{l}</div>
        </div>
      ))}
    </div>
  );
};

const Drift = ({ children, h = 380, speed = 0.1, radius = 14, style = {} }) => {
  const outer = useRef(null);
  const inner = useRef(null);
  const [seenRef, seen] = useSeen(0.12);
  useEffect(() => {
    const el = outer.current, mv = inner.current;
    if (!el || !mv) return;
    seenRef.current = el;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const r = el.getBoundingClientRect();
        const off = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
        mv.style.transform = `translateY(${off.toFixed(1)}px)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={outer} style={{ position: "relative", height: h, overflow: "hidden", borderRadius: radius, ...style }}>
      <div ref={inner} style={{ position: "absolute", inset: "-14% 0", willChange: "transform" }}>
        <div style={{
          position: "absolute", inset: 0,
          transform: seen ? "scale(1)" : "scale(1.14)",
          transition: "transform 1.5s cubic-bezier(.16,1,.3,1)",
        }}>{children}</div>
      </div>
    </div>
  );
};

const FloatNav = ({ scrollTo }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState({ label: "Home", id: null });
  const E = "cubic-bezier(.16,1,.3,1)";
  const links = [
    ["Who It's For", "who", "team"],
    ["Features", "features", "tickets"],
    ["How It Works", "how", "scheduling"],
    ["Early Access", "access", "inbox"],
  ];
  const nav = (id, label) => { setOpen(false); setActive({ label, id }); scrollTo(id); };
  const goHome = () => { setOpen(false); setActive({ label: "Home", id: null }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const item = (i) => ({
    opacity: open ? 1 : 0,
    transform: open ? "none" : "translateY(16px)",
    transition: open
      ? `opacity .55s ${E} ${0.14 + i * 0.06}s, transform .55s ${E} ${0.14 + i * 0.06}s`
      : `opacity .2s ease, transform .2s ease`,
  });
  return (
    <>
      {/* page dims + blurs behind the open menu */}
      <div onClick={() => setOpen(false)} style={{
        position: "fixed", inset: 0, zIndex: 55,
        background: open ? "rgba(32,29,26,0.24)" : "rgba(32,29,26,0)",
        backdropFilter: open ? "blur(4px)" : "blur(0px)",
        WebkitBackdropFilter: open ? "blur(4px)" : "blur(0px)",
        transition: `background .6s ${E}, backdrop-filter .6s ${E}`,
        pointerEvents: open ? "auto" : "none",
      }} />
      <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 60, width: "min(330px, calc(100vw - 24px))" }}>
        {/* the pill itself morphs into the menu card */}
        <div style={{
          background: "rgba(255,253,248,0.97)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          border: `1px solid ${C.line}`,
          borderRadius: open ? 26 : 100,
          boxShadow: open ? "0 18px 50px rgba(32,29,26,0.18)" : "0 6px 24px rgba(32,29,26,0.08)",
          overflow: "hidden",
          transition: `border-radius .65s ${E}, box-shadow .65s ${E}`,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 18, padding: "12px 22px" }}>
            <button onClick={goHome} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", justifySelf: "start" }}>
              <SartaMark height={17} color={C.burgundy} />
            </button>
            <button onClick={() => (active.id ? nav(active.id, active.label) : goHome())} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: F.sans, fontSize: 14, fontWeight: 500, color: C.glacierDeep, padding: 0, display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", overflow: "hidden", justifySelf: "center" }}>
              {active.id ? (
                <span style={{ color: C.burgundy, display: "flex", flexShrink: 0 }}>
                  <CapIcon name={links.find(([, id]) => id === active.id)?.[2]} size={15} />
                </span>
              ) : (
                <span style={{ display: "flex", flexShrink: 0 }}>
                  <SartaMonogram height={14} color={C.glacierDeep} />
                </span>
              )}
              {active.label}
            </button>
            <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, justifySelf: "end" }}>
              <div style={{ width: 18, borderTop: `2px solid ${C.glacierDeep}`, marginBottom: 5, transition: `transform .45s ${E}`, transform: open ? "translateY(3.5px) rotate(45deg)" : "none" }} />
              <div style={{ width: 18, borderTop: `2px solid ${C.glacierDeep}`, transition: `transform .45s ${E}`, transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
          <div style={{
            maxHeight: open ? 380 : 0,
            opacity: open ? 1 : 0,
            transition: `max-height .65s ${E}, opacity .45s ${E} ${open ? ".05s" : "0s"}`,
          }}>
            <div style={{ padding: "2px 22px 16px" }}>
              {links.map(([l, id, ic], i) => (
                <button key={id} onClick={() => nav(id, l)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "13px 0", fontFamily: F.sans, fontSize: 15, color: active.id === id ? C.burgundy : C.text, borderBottom: `1px dashed ${C.line}`, ...item(i) }}>
                  <span style={{ color: C.burgundy, display: "flex", flexShrink: 0 }}><CapIcon name={ic} size={17} /></span>
                  {l}
                </button>
              ))}
              <a href="https://sarta.studio" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0 4px", fontFamily: F.sans, fontSize: 15, color: C.burgundy, textDecoration: "none", ...item(links.length) }}>
                <span style={{ display: "flex", flexShrink: 0 }}><CapIcon name="fittings" size={17} /></span>
                Book a Fitting → Sarta Studio
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MonogramBand = () => (
  <div aria-hidden="true" style={{ overflow: "hidden", padding: "4px 0 52px" }}>
    {[0, 1].map((r) => (
      <div key={r} style={{ display: "flex", gap: 30, justifyContent: "center", marginLeft: r ? -46 : 0, marginTop: r ? 20 : 0, opacity: r ? 0.5 : 0.72 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{ flexShrink: 0, transform: (i + r) % 2 ? "scaleX(-1)" : "none" }}>
            <SartaMonogram height={r ? 52 : 60} color={r ? C.glacier : C.glacierDeep} />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default function SartaAppV4() {
  useEffect(() => {
    let m = document.querySelector('meta[name="viewport"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", "viewport"); document.head.appendChild(m); }
    m.setAttribute("content", "width=device-width, initial-scale=1");
  }, []);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: C.cream, minHeight: "100vh", color: C.text }}>
      <GlobalStyle />
      <FloatNav scrollTo={scrollTo} />

      {/* Hero — waabi layout on cream */}
      <section className="hero" style={{ position: "relative", minHeight: "96vh", display: "flex", alignItems: "flex-end", overflow: "hidden", background: C.cream }}>
        <div style={{ position: "relative", width: "100%", maxWidth: 1360, margin: "0 auto", padding: "140px 26px 90px" }}>
          <h1 className="herotag" style={{ fontFamily: F.serif, fontWeight: 300, fontSize: "clamp(52px, 9.4vw, 140px)", lineHeight: 1.04, letterSpacing: "-0.012em", color: C.text, margin: "0 0 34px", maxWidth: 1080 }}>
            <LineReveal lines={[
              <span key="a">A space for the</span>,
              <span key="b"><em style={{ fontStyle: "italic", color: C.burgundy }}>craft</em> to live.</span>,
            ]} />
          </h1>
          <div className="rise heromono" style={{ animationDelay: ".35s", fontFamily: F.mono, fontSize: "clamp(13px,1.5vw,17px)", letterSpacing: "0.18em", textTransform: "uppercase", color: C.burgundy, marginBottom: 16 }}>
            Built for Makers
          </div>
          <p className="rise heroblurb" style={{ animationDelay: ".5s", fontFamily: F.sans, fontSize: 15.5, fontWeight: 300, lineHeight: 1.8, color: C.grey, maxWidth: 560, margin: "0 0 34px" }}>
            One calm operating system that brings together bookings, ticketing,
            fittings, scheduling, payments, and client communication, giving
            Makers one place to run their business and more space for the
            craft to live.
          </p>
          <div className="rise" style={{ animationDelay: ".65s", display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn primary onClick={() => scrollTo("access")} style={{ background: C.glacier, borderColor: C.glacier, color: C.text }}>Request Early Access</Btn>
            <Btn onClick={() => window.open("https://sarta.studio", "_blank")} style={{ background: "transparent", borderColor: C.burgundy, color: C.burgundy, borderWidth: 1.5 }}>Visit Sarta Studio</Btn>
          </div>
        </div>
        <button onClick={() => scrollTo("who")} aria-label="Scroll down" style={{
          position: "absolute", right: 24, bottom: 24, width: 44, height: 44, borderRadius: "50%",
          background: C.glacier, color: C.text, border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 6px 18px rgba(159,182,216,0.5)",
        }}>↓</button>
      </section>

      {/* Capability strip */}
      <Reveal><section style={{ maxWidth: 1100, margin: "0 auto", padding: "78px 24px 30px" }}>
        <div className="iconrow" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}>
          {CAPS.map(([k, label], i) => (
            <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "6px 10px", borderLeft: i === 0 ? "none" : `1px solid ${C.line}`, color: C.burgundy }}>
              <CapIcon name={k} size={26} />
              <div style={{ fontFamily: F.mono, fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1.6, textAlign: "center", color: C.text }}>{label}</div>
            </div>
          ))}
        </div>
      </section></Reveal>

      {/* Statement */}
      <Reveal><section style={{ maxWidth: 900, margin: "0 auto", padding: "90px 24px 70px", textAlign: "center" }}>
        <h2 style={{ fontFamily: F.mono, fontWeight: 400, fontSize: "clamp(22px,2.9vw,34px)", letterSpacing: "0.1em", lineHeight: 1.35, color: C.text, margin: "0 0 22px" }}>
          <LineReveal lines={["We stitched both sides together."]} />
        </h2>
        <p style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: C.grey, maxWidth: 620, margin: "0 auto" }}>
          The studio operating system for the mending trades. While you manage
          the work here, your clients experience Sarta through Sarta Studio—a
          beautifully designed space to book services, track projects, and
          communicate with you. Everything stays connected, automatically.
        </p>
      </section></Reveal>

      <MonogramBand />

      {/* Who it's for — pillars */}
      <Reveal><section id="who" style={{ padding: "30px 0 90px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontFamily: F.mono, fontWeight: 400, fontSize: "clamp(21px,2.7vw,31px)", letterSpacing: "0.1em", lineHeight: 1.35, color: C.text, margin: "0 0 48px" }}>
            <LineReveal lines={["Built for the hands that do the work."]} />
          </h2>
          <div className="g4m2" style={{ display: "grid", gap: 16 }}>
            {AUDIENCES.map((a) => (
              <div key={a.title} className="hoverlift" style={{ border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden", background: C.cream }}>
                <Swatch tone={a.tone} h={110} style={{ borderRadius: 0 }} />
                <div style={{ padding: "20px 20px 24px" }}>
                  <div style={{ fontFamily: F.mono, letterSpacing: "0.16em", fontSize: 15, color: C.text, marginBottom: 10 }}>{a.title}</div>
                  <div style={{ fontFamily: F.sans, fontSize: 12.5, fontWeight: 600, lineHeight: 1.7, color: C.burgundy, marginBottom: 10 }}>{a.types}</div>
                  <p style={{ fontFamily: F.sans, fontSize: 12.5, fontWeight: 300, lineHeight: 1.65, color: C.grey, margin: 0 }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* Tools */}
      <Reveal><section id="features" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px" }}>
        <h2 style={{ fontFamily: F.mono, fontWeight: 400, fontSize: "clamp(21px,2.7vw,31px)", letterSpacing: "0.1em", lineHeight: 1.35, color: C.text, margin: "0 0 48px" }}>
          <LineReveal lines={["The tools of the trade."]} />
        </h2>
        <div className="g3" style={{ display: "grid", gap: "34px 44px" }}>
          {FEATURES.map(([n, t, ic, d]) => (
            <div key={n} style={{ borderTop: `1px dashed ${C.line}`, paddingTop: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: F.mono, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: C.text, marginBottom: 8 }}>
                <span style={{ color: C.burgundy, display: "flex" }}><CapIcon name={ic} size={20} /></span>
                {t}
              </div>
              <p style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 300, lineHeight: 1.65, color: C.grey, margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </section></Reveal>

      {/* How it works */}
      <Reveal><section id="how" style={{ padding: "90px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontFamily: F.mono, fontWeight: 400, fontSize: "clamp(21px,2.7vw,31px)", letterSpacing: "0.1em", lineHeight: 1.35, color: C.text, margin: "0 0 48px" }}>
            <LineReveal lines={["From request to receipt."]} />
          </h2>
          <div className="hiw" style={{ display: "grid", gap: 0 }}>
            {[
              ["Requests arrive", "Clients book through Sarta Studio — or you intake at the counter. Either way, it's a ticket."],
              ["Schedule & assign", "Fittings land on the calendar; work routes to the right Maker by specialty and capacity."],
              ["Work & collaborate", "Statuses, photos, and messages live with the project — clients see progress without calling."],
              ["Invoice & learn", "Payments collect themselves, and reporting shows what the studio earned and where time went."],
            ].map(([t, d], i) => (
              <div key={t} style={{ padding: "0 28px 0 0", borderLeft: i === 0 ? "none" : "1px solid rgba(69,16,28,0.25)", paddingLeft: i === 0 ? 0 : 28 }}>
                <div style={{ fontFamily: F.mono, fontSize: 22, color: C.burgundy, marginBottom: 18 }}>{i + 1}</div>
                <div style={{ fontFamily: F.sans, fontSize: 15.5, fontWeight: 500, color: C.text, marginBottom: 12 }}>{t}</div>
                <p style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 300, lineHeight: 1.65, color: "rgba(32,29,26,0.62)", margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* Network */}
      <Reveal><section style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22, color: C.burgundy }}>
          <CapIcon name="network" size={38} />
        </div>
        <h2 style={{ fontFamily: F.mono, fontWeight: 400, fontSize: "clamp(21px,2.7vw,31px)", letterSpacing: "0.1em", lineHeight: 1.35, color: C.glacierDeep, margin: "0 0 20px" }}>
          <LineReveal lines={["The Sarta Network."]} />
        </h2>
        <p style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: C.grey, maxWidth: 560, margin: "0 auto" }}>
          Utilize the Sarta network to outsource work when needed — overflow and
          out-of-specialty pieces go to trusted Makers, and the client
          relationship stays yours.
        </p>
      </section></Reveal>

      {/* Early access + just getting started */}
      <Reveal><section id="access" style={{ background: C.burgundy }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "110px 24px 90px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 26 }}>
            <SartaMonogram height={54} color="#F8F3E7" />
          </div>
          <h2 style={{ fontFamily: F.mono, fontWeight: 400, fontSize: "clamp(22px,2.9vw,34px)", letterSpacing: "0.1em", lineHeight: 1.35, color: "#F8F3E7", margin: "0 0 14px" }}>
            <LineReveal lines={["We're just getting started."]} />
          </h2>
          <p style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: "rgba(244,239,230,0.72)", margin: "0 0 34px" }}>
            Be one of our founding Makers — insider access, design input, and a
            seat at the table while Sarta is stitched together.
          </p>
          {sent ? (
            <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 18, color: C.glacier }}>Thank you — we'll be in touch soon.</div>
          ) : (
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourstudio.com"
                style={{ fontFamily: F.sans, fontSize: 14.5, padding: "14px 18px", border: "1px solid rgba(244,239,230,0.35)", borderRadius: 100, background: "rgba(255,255,255,0.08)", minWidth: 240, color: C.cream }} />
              <Btn primary onClick={() => email.includes("@") && setSent(true)} style={{ background: "#F8F3E7", borderColor: "#F8F3E7", color: C.burgundy }}>Request Access</Btn>
            </div>
          )}
          <div style={{ marginTop: 34, fontFamily: F.mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,239,230,0.55)" }}>
            Follow along or reach out — hello@sarta.app
          </div>
        </div>
      </section></Reveal>

      <footer style={{ borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
          <SartaMark height={20} color={C.burgundy} />
          <a href="https://sarta.studio" target="_blank" rel="noreferrer" style={{ fontFamily: F.sans, fontSize: 13, color: C.burgundy, textDecoration: "none" }}>
            Book a Fitting → sarta.studio
          </a>
          <span style={{ fontFamily: F.mono, fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: C.grey }}>© 2026 Sarta</span>
        </div>
      </footer>
    </div>
  );
}
