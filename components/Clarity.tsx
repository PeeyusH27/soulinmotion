import Script from 'next/script';

const PROJECT_ID = 'yf636k1heu';

const SNIPPET = `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${PROJECT_ID}");`;

/**
 * Microsoft Clarity — session recordings and heatmaps.
 *
 * The body goes through `dangerouslySetInnerHTML` rather than as children:
 * a Script rendered from a server component drops `children` on the way
 * through the RSC boundary and emits an empty tag, which fails silently.
 *
 * `afterInteractive` so the tag loads once the page is usable rather than
 * blocking first paint; Clarity only needs to be running by the time someone
 * starts scrolling, not before the hero renders.
 */
export default function Clarity() {
  return (
    <Script
      id="ms-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: SNIPPET }}
    />
  );
}
