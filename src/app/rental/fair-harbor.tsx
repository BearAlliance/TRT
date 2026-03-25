// FareHarbor Lightframe API - do not remove - see: https://fareharbor.com/help/website/resources/lightframe-api/ -->
'use client'

import Script from 'next/script'

export function FareHarborLightframe() {
  return (
    <Script
      src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"
      strategy="afterInteractive"
    />
  )
}
