import Image from 'next/image'
import adImage from '@/images/make-your-move.jpg'

export function BikeAd() {
  return (
    <Image
      alt="checkmate Ad"
      src={adImage}
      className="invisible object-cover object-top md:visible"
    />
  )
}
