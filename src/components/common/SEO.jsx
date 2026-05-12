import { Helmet } from 'react-helmet-async'
import { BRAND } from '@/config/brand'

export function SEO({
  title,
  description,
  canonicalPath,
  jsonLd,
  image,
}) {
  const site = BRAND.name
  const fullTitle = title ? `${title} | ${site}` : site
  const origin =
    typeof window !== 'undefined' ? window.location.origin : ''
  const url = canonicalPath ? `${origin}${canonicalPath}` : origin

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      {url ? <link rel="canonical" href={url} /> : null}
      <meta property="og:title" content={fullTitle} />
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}
      {image ? <meta property="og:image" content={image} /> : null}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  )
}
