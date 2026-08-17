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
  .mlink { transition: background .3s ease, color .3s ease, padding .3s ease, border-radius .3s ease; }
  .mlink:hover { padding-left: 12px !important; padding-right: 12px !important; border-radius: 12px !important; border-bottom-color: transparent !important; }
  .mlink-0:hover { background: #5B0F1F !important; color: #F8F3E7 !important; }
  .mlink-0:hover span { color: #F8F3E7 !important; }
  .mlink-1:hover { background: #C7D6EC !important; color: #45101C !important; }
  .mlink-1:hover span { color: #45101C !important; }
  .mlink-2:hover { background: #6E6E73 !important; color: #F8F3E7 !important; }
  .mlink-2:hover span { color: #F8F3E7 !important; }
  .mlink-3:hover { background: #9FB6D8 !important; color: #45101C !important; }
  .mlink-3:hover span { color: #45101C !important; }
  .mlink-4:hover { background: #45101C !important; color: #F8F3E7 !important; }
  .mlink-4:hover span { color: #F8F3E7 !important; }
  .mlink-5:hover { background: #EDE6D8 !important; color: #5B0F1F !important; }
  .mlink-5:hover span { color: #5B0F1F !important; }
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
   SARTA — sarta.app (the platform, for makers)
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
    "Stylist — 3 client items to makers",
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
  ["04", "Team Management", "team", "Assign work by specialty and capacity, and keep every maker's queue balanced."],
  ["05", "Business Reporting", "report", "Revenue, turnaround, and repeat clients — the numbers behind the craft."],
  ["06", "Work Requests", "inbox", "Client requests from Sarta Studio land in your queue, matched to your specialties."],
  ["07", "Collaboration", "chat", "Message clients, stylists, and teammates inside the project — never lose a thread."],
  ["08", "Partner Tools", "partner", "Intake and routing tools for brands and retailers sending work into your studio."],
  ["09", "The Sarta Network", "network", "Utilize the Sarta network to outsource work when needed — overflow and out-of-specialty pieces go to trusted makers, and the client relationship stays yours."],
];

const V2CONTENTS = [
  ["intro", "Introduction", "Say hello to Sarta"],
  ["work", "The Work", "Craft, simplified"],
  ["app", "The App", "The tools of the trade"],
  ["clients", "Clients", "Their door is beautiful"],
  ["faq", "FAQs", "Answers to common questions"],
];

const FAQS = [
  ["What is Sarta?", "Sarta is a digital studio for fit and repair — one operating system that brings together bookings, ticketing, fittings, scheduling, payments, and client communication for the mending trades."],
  ["Who can join?", "makers of every kind: tailors, cobblers, leatherworkers, reweavers, embroiderers, and menders — along with stylists, designers, and businesses like tailor shops, studios, brands, and retailers."],
  ["How do clients find me?", "Clients book through Sarta Studio, the beautifully designed client-facing side of the app. Requests arrive in your queue as tickets, matched to your specialties — and everything stays connected, automatically."],
  ["Can I hand off work I can't take?", "Yes. Utilize the Sarta network to outsource work when needed — overflow and out-of-specialty pieces go to trusted makers, and the client relationship stays yours."],
  ["When does early access open?", "We're onboarding makers and studios in small batches. Leave your email below and we'll hold your place at the table."],
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
  { tone: "burgundy", title: "makers", types: "Tailors · Cobblers · Leatherworkers · Reweavers · Embroiderers · Menders", desc: "The hands behind the work — every request, ticket, fitting, and payment in one queue." },
  { tone: "glacier", title: "Stylists", types: "Personal Stylists · Wardrobe Consultants", desc: "Send client pieces to trusted makers and follow every item from request to ready." },
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
                <button key={id} className={`mlink mlink-${i}`} onClick={() => nav(id, l)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "13px 0", fontFamily: F.sans, fontSize: 15, color: active.id === id ? C.burgundy : C.text, borderBottom: `1px dashed ${C.line}`, ...item(i) }}>
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
            Built for makers
          </div>
          <p className="rise heroblurb" style={{ animationDelay: ".5s", fontFamily: F.sans, fontSize: 15.5, fontWeight: 300, lineHeight: 1.8, color: C.grey, maxWidth: 560, margin: "0 0 34px" }}>
            One operating system that brings together bookings, ticketing,
            fittings, scheduling, payments, and client communication, giving
            makers one place to run their business and more space for the
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
              ["Schedule & assign", "Fittings land on the calendar; work routes to the right maker by specialty and capacity."],
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

      {/* maker showcase */}
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
              maker profiles
            </div>
            <h2 style={{ fontFamily: F.mono, fontWeight: 400, fontSize: "clamp(21px,2.7vw,31px)", letterSpacing: "0.1em", lineHeight: 1.35, color: C.text, margin: "0 0 20px" }}>
              <LineReveal lines={["Your craft, on display."]} />
            </h2>
            <p style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: C.grey, margin: "0 0 28px", maxWidth: 460 }}>
              So much of this work disappears the moment it’s done well. Sarta
              gives every maker a place to show it — a profile on Sarta Studio
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
            <div style={{ display: "grid", gap: 10, fontFamily: F.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: C.text, margin: "0 0 24px" }}>
              {(() => {
                const tone = {
                  client: { background: C.glacier, color: C.text, border: `1px solid ${C.glacierDeep}` },
                  stylist: { background: C.grey, color: "#F8F3E7", border: `1px solid ${C.grey}` },
                  maker: { background: C.burgundy, color: "#F8F3E7", border: `1px solid ${C.burgundy}` },
                };
                const flows = [
                  [["Client", "client"], ["The right maker", "maker"]],
                  [["Client", "client"], ["A Stylist", "stylist"], ["The right maker", "maker"]],
                  [["A maker", "maker"], ["A trusted maker", "maker"]],
                ];
                return flows.map((flow, r) => (
                  <div key={r} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                    {flow.map(([label, t], i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <span style={{ color: C.burgundy }}>→</span>}
                        <span style={{ ...tone[t], borderRadius: 100, padding: "7px 13px" }}>{label}</span>
                      </React.Fragment>
                    ))}
                  </div>
                ));
              })()}
            </div>
            <p style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: C.grey, margin: "0 0 28px", maxWidth: 460 }}>
              Work enters from clients — a hem, a resole, a sofa cushion — and
              Sarta routes it to the right hands. Overflow and out-of-specialty
              pieces go to trusted makers, and the client relationship stays yours.
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
        <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: "clamp(14px,1.6vw,18px)", letterSpacing: "0.22em", textTransform: "uppercase", color: C.text, marginBottom: 26 }}>
          Why Sarta
        </div>
        <h2 style={{ fontFamily: F.serif, fontWeight: 600, fontSize: "clamp(26px,3.6vw,42px)", letterSpacing: "0.005em", lineHeight: 1.28, color: C.grey, margin: "0 0 54px", maxWidth: 620 }}>
          <LineReveal lines={["Sarta exists to create a more", "thoughtful relationship between", "people, the objects they own, and", "the makers behind them."]} />
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
            closets instead of buying new. She felt alterations were far more
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
            Mattie created Sarta to make the day-to-day lives of makers easier and
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
            Be one of our founding makers — insider access, design input, and a
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
                      {["maker", "Stylist", "Designer", "Business", "Client"].map((o) => (
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
