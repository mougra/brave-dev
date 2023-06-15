import { useState, useEffect } from 'react'
import { Size } from '../models/models'

export const SCREEN_SM = 623
export const SCREEN_MD = 768
export const SCREEN_LG = 992
export const SCREEN_XL = 1200

export function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    // height: undefined,
    SCREEN_SM: false,
  })
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= SCREEN_SM) {
        setWindowSize({
          width: window.innerWidth,
          // height: window.innerHeight,
          SCREEN_SM: false,
        })
      } else {
        setWindowSize({
          width: window.innerWidth,
          // height: window.innerHeight,
          SCREEN_SM: true,
        })
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}
