import { Suspense } from 'react';
import ClientServiceWorker from '../components/ClientServiceWorker';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bharatam-asmi.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BHARATAM – The Chronicles of India',
    template: '%s',
  },
  description:
    "Echoes of a Civilization that Shaped Time — explore India's dynasties, battles, timelines, historical maps, and history quizzes.",
  keywords: [
    'Indian history',
    'dynasties of India',
    'Indian timeline',
    'historical maps of India',
    'Mauryan Empire',
    'Gupta Empire',
    'Mughal Empire',
    'Maratha Empire',
  ],
  authors: [{ name: 'Ashutosh Kesari' }],
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/images/favicon.ico' },
      { url: '/images/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'BHARATAM – The Chronicles of India',
    description: 'Explore Indian dynasties, battles, timelines, maps, and quizzes.',
    type: 'website',
    url: siteUrl,
    siteName: 'BHARATAM',
    images: [
      {
        url: '/images/icon-512.png',
        width: 512,
        height: 512,
        alt: 'BHARATAM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BHARATAM – The Chronicles of India',
    description: 'Explore Indian dynasties, battles, timelines, maps, and quizzes.',
    images: ['/images/icon-512.png'],
  },
};

export const viewport = {
  themeColor: '#070604',
};

const cursorScript = `(function(){
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var x=-200,y=-200,rx=-200,ry=-200,dot,ring,raf;
  function init(){
    dot=document.getElementById('cdot');
    ring=document.getElementById('cring');
    if(!dot||!ring) return;
    dot.style.willChange='transform';
    ring.style.willChange='transform';
    document.addEventListener('mousemove',function(e){
      x=e.clientX; y=e.clientY;
      /* Dot follows instantly — no lerp, zero perceived lag */
      dot.style.transform='translate3d('+x+'px,'+y+'px,0) translate(-50%,-50%)';
    },{passive:true});
    document.addEventListener('mouseover',function(e){
      if(!ring) return;
      var t=e.target.closest('a,button,[data-page],.dc,.bc,.rel-c,.hp-card,.other-dyn-card,.map-card,.quiz-option');
      if(t){ ring.style.width='46px'; ring.style.height='46px'; ring.style.borderColor='rgba(200,148,42,0.9)'; }
      else  { ring.style.width='32px'; ring.style.height='32px'; ring.style.borderColor='rgba(200,148,42,0.55)'; }
    });
    var prev=0;
    (function loop(ts){
      raf=requestAnimationFrame(loop);
      var dt=ts-prev; prev=ts;
      /* Clamp dt so a tab-switch spike doesn't teleport the ring */
      if(dt>64) dt=16;
      /* Frame-rate-independent lerp: factor 0.28 at 60 fps */
      var k=1-Math.pow(1-0.28, dt/16.667);
      rx+=( x-rx)*k; ry+=(y-ry)*k;
      ring.style.transform='translate3d('+rx+'px,'+ry+'px,0) translate(-50%,-50%)';
    })(0);
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  } else { init(); }
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Crimson+Pro:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ClientServiceWorker />
        <canvas id="cvs"></canvas>
        <div className="c-dot" id="cdot"></div>
        <div className="c-ring" id="cring"></div>
        <script dangerouslySetInnerHTML={{ __html: cursorScript }} />
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
