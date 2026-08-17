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
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Roboto+Mono:wght@400;500;700&display=swap');
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
    @keyframes stitchMarch { to { stroke-dashoffset: -40; } }
  @keyframes orbitSpin { to { transform: rotate(360deg); } }
  .orbitspin { transform-origin: 240px 240px; animation: orbitSpin 90s linear infinite; }
  @keyframes ringPulse { 0% { transform: translate(-50%,-50%) scale(1); opacity: 0.45; } 100% { transform: translate(-50%,-50%) scale(2.15); opacity: 0; } }
  .pulsering { transform: translate(-50%,-50%); animation: ringPulse 3.4s ease-out infinite; }
  @keyframes liveBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
  .livedot { animation: liveBlink 1.6s ease-in-out infinite; }
  @keyframes tickIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
  .tickfade { display: inline-block; animation: tickIn 0.45s ease; }
  .stitchline { animation: stitchMarch 2.8s linear infinite; }
  @keyframes nodeBob { from { transform: translate(-50%,-56%); } to { transform: translate(-50%,-44%); } }
  .netnode { animation: nodeBob 5s ease-in-out infinite alternate; }
  @keyframes fabricDrift1 { from { transform: translate(0,0); } to { transform: translate(-34px, 14px); } }
  @keyframes fabricDrift2 { from { transform: translate(0,0); } to { transform: translate(28px, -10px); } }
  @keyframes fabricDrift3 { from { transform: translate(0,0); } to { transform: translate(-20px, -12px); } }
  .drift1 { animation: fabricDrift1 16s ease-in-out infinite alternate; }
  .drift2 { animation: fabricDrift2 21s ease-in-out infinite alternate; }
  .drift3 { animation: fabricDrift3 26s ease-in-out infinite alternate; }
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
      .hero > div:not([aria-hidden]) { padding: 118px 22px 50px !important; }
      .hero .rise { margin-bottom: 22px !important; }
      .hero .herologo svg { height: 118px !important; }
      h1 { font-size: 21px !important; letter-spacing: 0.1em !important; }
      h2 { font-size: 20px !important; margin-bottom: 26px !important; }
      p { font-size: 13.5px !important; }
      .step { padding: 26px 18px 66px !important; min-height: 0 !important; }
      .step > div:first-child { margin-bottom: 28px !important; }
      .g4m2 { gap: 12px !important; }
      .g4m2 > div { height: auto !important; margin-top: 0 !important; }
      .g4m2 .audswatch { height: 88px !important; }
      .g2, .g3, .split { gap: 12px !important; }
      footer > div { padding: 42px 20px 26px !important; }
      .breathe { display: none; }
      .iconrow { grid-template-columns: repeat(3, 1fr) !important; row-gap: 26px; justify-items: center; }
      .herotag { font-size: clamp(38px, 11.4vw, 64px) !important; line-height: 1.08 !important; margin-bottom: 24px !important; }
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
      .g4m2 { grid-template-columns: 1fr; }
      .accgrid { grid-template-columns: 1fr !important; }
      .founderrow { grid-template-columns: 1fr !important; }
      .netgrid { grid-template-columns: 1fr !important; }
      .showgrid { grid-template-columns: 1fr !important; }
      .showcards { height: 340px !important; max-width: 340px !important; }
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

const NetTicker = () => {
  const msgs = [
    "Hem — routed to Tailors",
    "Resole — accepted by Cobblers",
    "Moth damage — sent to Reweavers",
    "Zipper — returned & invoiced",
    "Restyle — quote approved",
    "Stylist — 3 client items to Makers",
    "Sofa cushions — to Upholsterers",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % 7), 3200);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 9, background: "#F8F3E7", border: `1px solid ${C.line}`, borderRadius: 100, padding: "9px 16px", boxShadow: "0 10px 26px rgba(69,16,28,0.08)", whiteSpace: "nowrap" }}>
      <span className="livedot" style={{ width: 6, height: 6, borderRadius: "50%", background: C.burgundy, flexShrink: 0 }} />
      <span key={i} className="tickfade" style={{ fontFamily: F.mono, fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: C.text }}>{msgs[i]}</span>
    </div>
  );
};

const FOUNDER_PHOTO = "data:image/jpeg;base64,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";

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
    ["The Sarta Network", "network", "network"],
    ["Why Sarta", "about", "partner"],
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
            maxHeight: open ? 440 : 0,
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
  <div aria-hidden="true" style={{ overflow: "hidden", padding: "64px 0 30px" }}>
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

const LEGAL = {
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: August 17, 2026",
    body: [
      ["p", "Sarta is operated by Artform Alterations LLC (“Sarta,” “we,” “us”). This policy explains what information we collect through sarta.app and sarta.studio, how we use it, and the choices you have."],
      ["h", "What we collect"],
      ["p", "When you request early access or contact us, we collect the information you provide: your name, email address, phone number, and what you’re interested in. When you send a booking inquiry on sarta.studio, we collect the details you include about yourself and your items. We do not collect payment information through these sites."],
      ["h", "How we use it"],
      ["p", "We use your information to respond to you, provide early access and product updates, operate and improve Sarta, and communicate about services you’ve requested. We do not sell your personal information."],
      ["h", "Where it lives"],
      ["p", "Form submissions are processed by Formspree and delivered to our email. Our sites are hosted on Vercel with code stored on GitHub. These providers process data on our behalf under their own security practices."],
      ["h", "Sharing"],
      ["p", "We share information only with the service providers above as needed to run the sites, or if required by law. We do not sell or rent your information to anyone."],
      ["h", "Cookies & analytics"],
      ["p", "Our sites do not set tracking cookies or run third-party advertising. If we add analytics in the future, we will update this policy."],
      ["h", "Your choices"],
      ["p", "You can unsubscribe from our emails at any time using the link in the email or by writing to us. You can also ask us what information we hold about you, or ask us to correct or delete it, by emailing mattie@artformalterations.com. We’ll respond promptly."],
      ["h", "Retention & children"],
      ["p", "We keep your information only as long as needed for the purposes above. Our sites are not directed to children under 13, and we do not knowingly collect their information."],
      ["h", "Changes & contact"],
      ["p", "If this policy changes, we’ll post the new version here with an updated date. Questions? Email mattie@artformalterations.com."],
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "Last updated: August 17, 2026",
    body: [
      ["p", "Welcome to Sarta. These terms govern your use of sarta.app and sarta.studio, operated by Artform Alterations LLC. By using these sites, you agree to these terms."],
      ["h", "What these sites are"],
      ["p", "sarta.app and sarta.studio are informational sites for the Sarta platform and studio. Submitting an early access request or booking inquiry does not create an obligation for us to provide access or services; we’ll follow up to confirm any engagement."],
      ["h", "Your use"],
      ["p", "You agree to provide accurate information in forms, and not to misuse the sites — including attempting to disrupt them, scrape them, or use them for unlawful purposes."],
      ["h", "Our content"],
      ["p", "The Sarta name, logomarks, designs, text, and imagery on these sites belong to Artform Alterations LLC or are used with permission. You may not reproduce them without our written consent."],
      ["h", "Third-party services"],
      ["p", "Our sites rely on third-party services (such as form processing and hosting) and may link to other sites. We aren’t responsible for third-party content or practices."],
      ["h", "Disclaimers"],
      ["p", "The sites are provided “as is” without warranties of any kind. To the fullest extent permitted by law, Artform Alterations LLC is not liable for indirect, incidental, or consequential damages arising from use of the sites."],
      ["h", "Governing law & changes"],
      ["p", "These terms are governed by the laws of the State of Illinois. We may update these terms from time to time; continued use after changes means you accept the updated terms."],
      ["h", "Contact"],
      ["p", "Questions about these terms? Email mattie@artformalterations.com."],
    ],
  },
};

const LegalPage = ({ page, onClose }) => {
  const doc = LEGAL[page];
  useEffect(() => { window.scrollTo({ top: 0 }); }, [page]);
  if (!doc) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: C.cream, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "90px 24px 120px" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "fixed", top: 18, right: 18, width: 44, height: 44, borderRadius: "50%", border: `1px solid ${C.line}`, background: "#F8F3E7", color: C.burgundy, fontSize: 18, cursor: "pointer" }}>✕</button>
        <div style={{ marginBottom: 26 }}><SartaMark height={20} color={C.burgundy} /></div>
        <h1 style={{ fontFamily: F.mono, fontWeight: 400, fontSize: "clamp(22px,3vw,32px)", letterSpacing: "0.08em", color: C.text, margin: "0 0 8px" }}>{doc.title}</h1>
        <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: C.grey, marginBottom: 36 }}>{doc.updated}</div>
        {doc.body.map(([kind, text], i) =>
          kind === "h" ? (
            <h2 key={i} style={{ fontFamily: F.mono, fontWeight: 400, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: C.burgundy, margin: "34px 0 10px" }}>{text}</h2>
          ) : (
            <p key={i} style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: C.grey, margin: "0 0 14px" }}>{text}</p>
          )
        )}
        <button onClick={onClose} style={{ marginTop: 40, fontFamily: F.mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", padding: "13px 22px", borderRadius: 100, border: `1px solid ${C.burgundy}`, background: "transparent", color: C.burgundy, cursor: "pointer" }}>
          ← Back to Sarta
        </button>
      </div>
    </div>
  );
};

export default function SartaAppV4() {
  useEffect(() => {
    let m = document.querySelector('meta[name="viewport"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", "viewport"); document.head.appendChild(m); }
    m.setAttribute("content", "width=device-width, initial-scale=1");
  }, []);
  const [legal, setLegal] = useState(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState(false);
  const formReady = firstName.trim() && lastName.trim() && phone.trim() && email.includes("@") && interest;
  const requestAccess = async () => {
    if (!formReady || sending) return;
    setSending(true); setErr(false);
    try {
      const r = await fetch("https://formspree.io/f/xppaangy", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "First name": firstName.trim(),
          "Last name": lastName.trim(),
          "Phone": phone.trim(),
          email,
          "Interested in": interest,
          source: "sarta.app early access",
        }),
      });
      if (r.ok) setSent(true); else setErr(true);
    } catch (e) { setErr(true); }
    setSending(false);
  };
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

      {/* Statement — monogram field with panel */}
      <Reveal><section style={{ position: "relative", overflow: "hidden", padding: "clamp(70px,9vw,120px) 24px" }}>
        {/* cream text panel */}
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto", background: C.cream, border: `1px solid ${C.glacierDeep}55`, padding: "clamp(38px,6vw,62px) clamp(24px,5vw,56px)", textAlign: "center" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 12, border: `1px solid ${C.glacierDeep}33`, pointerEvents: "none" }} />
          <h2 style={{ fontFamily: F.mono, fontWeight: 400, fontSize: "clamp(22px,2.9vw,34px)", letterSpacing: "0.1em", lineHeight: 1.35, color: C.text, margin: "0 0 22px" }}>
            <LineReveal lines={["We stitched both sides together."]} />
          </h2>
          <p style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: C.grey, maxWidth: 540, margin: "0 auto" }}>
            The studio operating system for the mending trades. While you manage
            the work here, your clients experience Sarta through Sarta Studio—a
            beautifully designed space to book services, track projects, and
            communicate with you. Everything stays connected, automatically.
          </p>
        </div>
      </section></Reveal>

      {/* Who it's for — pillars */}
      <Reveal><section id="who" style={{ padding: "50px 0 90px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontFamily: F.mono, fontWeight: 400, fontSize: "clamp(21px,2.7vw,31px)", letterSpacing: "0.1em", lineHeight: 1.35, color: C.text, margin: "0 0 48px" }}>
            <LineReveal lines={["Built for the hands that do the work."]} />
          </h2>
          <div className="g4m2" style={{ display: "grid", gap: 16 }}>
            {AUDIENCES.map((a) => (
              <div key={a.title} className="hoverlift" style={{ border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden", background: C.cream }}>
                <div className="audswatch" style={{ height: 110 }}><Swatch tone={a.tone} h={"100%"} style={{ borderRadius: 0, height: "100%" }} /></div>
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
        <h2 style={{ fontFamily: F.mono, fontWeight: 700, fontSize: "clamp(21px,2.7vw,31px)", letterSpacing: "0.1em", lineHeight: 1.35, color: C.text, margin: "0 0 48px" }}>
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
                <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 26, color: C.burgundy, marginBottom: 18 }}>{i + 1}</div>
                <div style={{ fontFamily: F.sans, fontSize: 15.5, fontWeight: 500, color: C.text, marginBottom: 12 }}>{t}</div>
                <p style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 300, lineHeight: 1.65, color: "rgba(32,29,26,0.62)", margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* Maker showcase */}
      <Reveal><section style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(80px,10vw,140px) 24px" }}>
        <div className="showgrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div className="showcards" style={{ position: "relative", height: 420, maxWidth: 440, width: "100%", margin: "0 auto" }}>
            <div className="hoverlift" style={{ position: "absolute", left: "4%", top: 34, width: "58%", transform: "rotate(-4deg)", borderRadius: 10, overflow: "hidden", boxShadow: "0 24px 60px rgba(69,16,28,0.14)" }}>
              <Swatch tone="burgundy" h={250} label="Bridal recut" sub="Silk gown, resized two sizes and rehemmed" />
            </div>
            <div className="hoverlift" style={{ position: "absolute", right: "2%", top: 0, width: "52%", transform: "rotate(3deg)", borderRadius: 10, overflow: "hidden", boxShadow: "0 24px 60px rgba(69,16,28,0.12)" }}>
              <Swatch tone="glacier" h={215} label="Invisible reweave" sub="Moth damage, vanished from a wool coat" />
            </div>
            <div className="hoverlift" style={{ position: "absolute", left: "26%", bottom: 0, width: "56%", transform: "rotate(-1.5deg)", borderRadius: 10, overflow: "hidden", boxShadow: "0 24px 60px rgba(69,16,28,0.16)" }}>
              <Swatch tone="ink" h={230} label="Heirloom denim" sub="1970s Levi’s, repaired and carried forward" />
            </div>
          </div>
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.burgundy, marginBottom: 20 }}>
              Maker profiles
            </div>
            <h2 style={{ fontFamily: F.mono, fontWeight: 400, fontSize: "clamp(21px,2.7vw,31px)", letterSpacing: "0.1em", lineHeight: 1.35, color: C.text, margin: "0 0 20px" }}>
              <LineReveal lines={["Your craft, on display."]} />
            </h2>
            <p style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: C.grey, margin: "0 0 28px", maxWidth: 460 }}>
              So much of this work disappears the moment it’s done well. Sarta
              gives every Maker a place to show it — a profile on Sarta Studio
              where clients see your work, your specialties, and your story before
              they ever walk in.
            </p>
            <div style={{ display: "grid", gap: 12, maxWidth: 440 }}>
              {[
                "A portfolio of finished work, in your own profile",
                "Specialties, languages, and turnaround — clear to every client",
                "Clients book you directly from your page",
              ].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontFamily: F.mono, color: C.burgundy, fontSize: 13, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, color: C.text, lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section></Reveal>

      {/* Network — stitched constellation */}
      <Reveal><section id="network" style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(90px,11vw,150px) 24px" }}>
        <div className="netgrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.burgundy, marginBottom: 20 }}>
              Overflow, handled
            </div>
            <h2 style={{ fontFamily: F.mono, fontWeight: 400, fontSize: "clamp(21px,2.7vw,31px)", letterSpacing: "0.1em", lineHeight: 1.35, color: C.burgundy, margin: "0 0 20px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.35em" }}>
              <span>The</span>
              <SartaMark height={"clamp(20px, 2.5vw, 29px)"} color={C.burgundy} style={{ display: "block" }} />
              <span>Network.</span>
            </h2>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, fontFamily: F.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: C.text, margin: "0 0 24px" }}>
              <span style={{ background: C.glacier, color: C.text, border: `1px solid ${C.glacierDeep}`, borderRadius: 100, padding: "7px 13px" }}>Client</span>
              <span style={{ color: C.burgundy }}>→</span>
              <span style={{ background: C.grey, color: "#F8F3E7", borderRadius: 100, padding: "7px 13px" }}>A Stylist</span>
              <span style={{ color: C.burgundy }}>→</span>
              <span style={{ background: C.burgundy, color: "#F8F3E7", borderRadius: 100, padding: "7px 13px" }}>The right Maker</span>
            </div>
            <p style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: C.grey, margin: "0 0 28px", maxWidth: 460 }}>
              Work enters from clients — a hem, a resole, a sofa cushion — and
              Sarta routes it to the right hands. Overflow and out-of-specialty
              pieces go to trusted Makers, and the client relationship stays yours.
              Stylists work the same threads, managing their clients’ items and
              sending each piece where it belongs.
            </p>
            <div style={{ display: "grid", gap: 12, maxWidth: 440 }}>
              {[
                "Clients bring work in — the network carries it to completion",
                "Send overflow without losing the client",
                "Stylists manage client wardrobes and send items for care",
                "Tailors, cobblers, reweavers, leatherworkers, upholsterers — every trade, one system",
              ].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontFamily: F.mono, color: C.burgundy, fontSize: 13, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, color: C.text, lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="netwrap" style={{ position: "relative", width: "100%", maxWidth: 460, aspectRatio: "1", margin: "0 auto" }}>
            <svg viewBox="0 0 480 480" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              {[[240,44],[240,436]].map(([x, y], i) => (
                <g key={"t"+i} stroke={C.glacierDeep} strokeWidth="1" opacity="0.8">
                  <line x1={x-6} y1={y} x2={x+6} y2={y} />
                  <line x1={x} y1={y-6} x2={x} y2={y+6} />
                </g>
              ))}
              <circle cx="240" cy="240" r="196" fill="none" stroke={C.glacier} strokeWidth="1" opacity="0.7" />
              <g className="orbitspin">
                <circle cx="240" cy="240" r="126" fill="none" stroke={C.glacier} strokeWidth="1" strokeDasharray="2 7" opacity="0.85" />
                <circle cx="240" cy="114" r="2.5" fill={C.glacierDeep} />
                <circle cx="352" cy="303" r="2.5" fill={C.glacierDeep} />
                <circle cx="128" cy="303" r="2.5" fill={C.glacierDeep} />
              </g>
              {/* even seven-point ring — work in from clients & stylists */}
              {[[44,240],[118,393]].map(([x, y], i) => (
                <g key={"in"+i}>
                  <path id={"routeIn" + i} className="stitchline" d={"M" + x + "," + y + " L240,240"} fill="none" stroke={C.burgundy} strokeWidth="1.5" strokeDasharray="3 7" style={{ animationDelay: `${i * 0.5}s` }} />
                  <circle r="3.2" fill={C.burgundy}>
                    <animateMotion dur="3.4s" repeatCount="indefinite" begin={`${i * 1.2}s`}><mpath href={"#routeIn" + i} /></animateMotion>
                  </circle>
                  <circle r="3.2" fill={C.burgundy}>
                    <animateMotion dur="3.4s" repeatCount="indefinite" begin={`${i * 1.2 + 1.7}s`}><mpath href={"#routeIn" + i} /></animateMotion>
                  </circle>
                  <circle cx={x} cy={y} r="5" fill={i === 0 ? C.glacier : C.grey} stroke={i === 0 ? C.glacierDeep : C.grey} strokeWidth="1.3" />
                </g>
              ))}
              {/* work out to the five trades */}
              {[[118,87],[284,49],[417,155],[417,325],[284,431]].map(([x, y], i) => (
                <g key={i}>
                  <path id={"route" + i} className="stitchline" d={"M240,240 L" + x + "," + y} fill="none" stroke={C.glacierDeep} strokeWidth="1.3" strokeDasharray="3 7" style={{ animationDelay: `${i * 0.35}s` }} />
                  <circle r="3" fill={C.burgundy}>
                    <animateMotion dur="4.2s" repeatCount="indefinite" begin={`${i * 0.85}s`}><mpath href={"#route" + i} /></animateMotion>
                  </circle>
                  {i % 2 === 1 && (
                    <circle r="2.2" fill={C.glacierDeep}>
                      <animateMotion dur="5.6s" repeatCount="indefinite" begin={`${i * 1.1 + 2}s`} keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href={"#route" + i} /></animateMotion>
                    </circle>
                  )}
                  <circle cx={x} cy={y} r="5" fill={C.burgundy} />
                </g>
              ))}
              <path d="M118,87 Q200,40 284,49" fill="none" stroke={C.glacier} strokeWidth="1" strokeDasharray="2 8" opacity="0.7" />
              <path d="M284,431 Q200,440 118,393" fill="none" stroke={C.glacier} strokeWidth="1" strokeDasharray="2 8" opacity="0.7" />
            </svg>
            <div className="pulsering" aria-hidden="true" style={{ position: "absolute", left: "50%", top: "50%", width: 104, height: 104, borderRadius: "50%", border: `1px solid ${C.glacierDeep}`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 104, height: 104, borderRadius: "50%", background: "#F8F3E7", border: `1px solid ${C.line}`, boxShadow: "0 18px 44px rgba(69,16,28,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SartaMonogram height={46} color={C.burgundy} />
            </div>
            <div className="netnode" style={{ position: "absolute", left: "10.5%", top: "50%", transform: "translate(-50%,-50%)", fontFamily: F.mono, fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: C.text, background: C.glacier, border: `1px solid ${C.glacierDeep}`, borderRadius: 100, padding: "8px 14px", whiteSpace: "nowrap", boxShadow: "0 8px 22px rgba(69,16,28,0.08)" }}>
              Clients
            </div>
            <div className="netnode" style={{ position: "absolute", left: "24.5%", top: "82%", transform: "translate(-50%,-50%)", fontFamily: F.mono, fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F8F3E7", background: C.grey, border: `1px solid ${C.grey}`, borderRadius: 100, padding: "8px 14px", whiteSpace: "nowrap", boxShadow: "0 8px 22px rgba(69,16,28,0.10)", animationDelay: "1.4s" }}>
              Stylists
            </div>
            {[
              ["Tailors", "24.5%", "18.1%"],
              ["Cobblers", "59.1%", "10.2%"],
              ["Upholsterers", "86.8%", "32.3%"],
              ["Leatherworkers", "86.8%", "67.7%"],
              ["Reweavers", "59.1%", "89.8%"],
            ].map(([label, left, top], i) => (
              <div key={label} className="netnode" style={{ position: "absolute", left, top, transform: "translate(-50%,-50%)", fontFamily: F.mono, fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F8F3E7", background: C.burgundy, border: `1px solid ${C.burgundy}`, borderRadius: 100, padding: "8px 14px", whiteSpace: "nowrap", boxShadow: "0 8px 22px rgba(69,16,28,0.14)", animationDelay: `${i * 0.7}s` }}>
                {label}
              </div>
            ))}
            <NetTicker />
          </div>
        </div>
      </section></Reveal>

      {/* Why Sarta */}
      <Reveal><section id="about" style={{ maxWidth: 1020, margin: "0 auto", padding: "clamp(80px,10vw,130px) 24px" }}>
        <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.burgundy, marginBottom: 22 }}>
          Why Sarta
        </div>
        <h2 style={{ fontFamily: F.mono, fontWeight: 700, fontSize: "clamp(26px,3.8vw,46px)", letterSpacing: "0.05em", lineHeight: 1.28, color: C.burgundy, margin: "0 0 54px", maxWidth: 860 }}>
          <LineReveal lines={["See the possibility in", "what you already own."]} />
        </h2>
        <div className="founderrow" style={{ display: "grid", gridTemplateColumns: "minmax(240px, 330px) 1fr", gap: "clamp(34px,5vw,60px)", alignItems: "start" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: 340, margin: "0 auto", overflow: "hidden", borderRadius: 18, border: `1px solid ${C.line}` }}>
          <img src={FOUNDER_PHOTO} alt="Mattie Hussey, founder of Sarta" style={{ display: "block", width: "100%", height: "auto" }} />
        </div>
        <div style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.9, color: C.grey, textAlign: "left" }}>
          <p style={{ margin: "0 0 18px" }}>
            Mattie Hussey studied fashion design with an early passion for draping
            and designing from scratch. That perspective shifted at a Chicago
            alterations company, where working closely with tailors introduced her
            to a different side of the industry: functional design, the small,
            thoughtful changes that transform how something fits, feels, and is worn.
          </p>
          <p style={{ margin: "0 0 18px" }}>
            She then worked in the custom clothing industry for 7 years and deepened
            her understanding of fit and construction, but she always gravitated
            towards encouraging her clients to look at what they had in their
            closets instead of buying new. She felt alterations felt far more
            universal. A hem can change an entire outfit. A dart can make a shirt
            feel completely different. And pieces with sentimental value can be
            repaired and carried forward instead of forgotten.
          </p>
          <p style={{ margin: "0 0 18px" }}>
            That appreciation for craft runs in her family: both her father and
            grandfather worked at Levi Strauss when much of its clothing was still
            made in the United States. Building Sarta continues that connection to
            the people and skill behind what we wear.
          </p>
          <p style={{ margin: "0 0 18px" }}>
            Mattie created Sarta to make the day-to-day lives of Makers easier and
            to bring greater visibility to the skilled people whose work so often
            happens behind the scenes.
          </p>
          <p style={{ margin: 0 }}>
            At its core, Sarta is an extension of her belief that good design does not always mean creating something new. Sometimes, it means seeing more possibility in what already exists.
          </p>
        </div>
        </div>
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
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
              {(() => {
                const field = { fontFamily: F.sans, fontSize: 14.5, padding: "14px 18px", border: "1px solid rgba(244,239,230,0.35)", borderRadius: 100, background: "rgba(255,255,255,0.08)", color: C.cream, width: "100%", boxSizing: "border-box" };
                return (
                  <>
                    <div className="accgrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" placeholder="First name" style={field} />
                      <input value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" placeholder="Last name" style={field} />
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone number" style={field} />
                      <input value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && requestAccess()} type="email" inputMode="email" autoComplete="email" placeholder="you@yourstudio.com" style={field} />
                    </div>
                    <div style={{ marginTop: 22, fontFamily: F.mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,239,230,0.55)" }}>
                      I'm interested as a…
                    </div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
                      {["Maker", "Stylist", "Designer", "Business", "Client"].map((o) => (
                        <button key={o} onClick={() => setInterest(o)} style={{
                          fontFamily: F.mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
                          padding: "10px 16px", borderRadius: 100, transition: "all .25s ease",
                          border: `1px solid ${interest === o ? "#F8F3E7" : "rgba(244,239,230,0.35)"}`,
                          background: interest === o ? "#F8F3E7" : "transparent",
                          color: interest === o ? C.burgundy : "rgba(244,239,230,0.85)",
                        }}>{o}</button>
                      ))}
                    </div>
                    <div style={{ marginTop: 22, display: "flex", justifyContent: "center" }}>
                      <Btn primary onClick={requestAccess} style={{ background: "#F8F3E7", borderColor: "#F8F3E7", color: C.burgundy, opacity: sending || !formReady ? 0.55 : 1, pointerEvents: sending ? "none" : "auto" }}>{sending ? "Sending…" : "Request Access"}</Btn>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
          {err && !sent && (
            <div style={{ marginTop: 16, fontFamily: F.sans, fontSize: 13, color: C.glacier }}>
              Hmm, that didn't go through — please try again, or email mattie@artformalterations.com.
            </div>
          )}
          <div style={{ marginTop: 34, fontFamily: F.mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,239,230,0.55)" }}>
            Follow along or reach out — mattie@artformalterations.com
          </div>
        </div>
      </section></Reveal>

      <footer style={{ borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
          <SartaMark height={20} color={C.burgundy} />
          <a href="https://sarta.studio" target="_blank" rel="noreferrer" style={{ fontFamily: F.sans, fontSize: 13, color: C.burgundy, textDecoration: "none" }}>
            Book a Fitting → sarta.studio
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <button onClick={() => setLegal("privacy")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: F.mono, fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: C.grey, textDecoration: "underline", textUnderlineOffset: 3 }}>Privacy Policy</button>
            <button onClick={() => setLegal("terms")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: F.mono, fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: C.grey, textDecoration: "underline", textUnderlineOffset: 3 }}>Terms of Service</button>
            <span style={{ fontFamily: F.mono, fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: C.grey }}>© 2026 Artform Alterations LLC</span>
          </div>
        </div>
      </footer>
      {legal && <LegalPage page={legal} onClose={() => setLegal(null)} />}
    </div>
  );
}
