import { useEffect, useState } from "react"
import { WINDOW_WIDTH } from "utils/constants"

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < WINDOW_WIDTH)
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth)

  const observeWidth = () => {
    setIsMobile(window.innerWidth < WINDOW_WIDTH)
    setCurrentWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", observeWidth)
    return () => {
      window.removeEventListener("resize", observeWidth)
    }
  }, [currentWidth])

  return isMobile
}

export default useIsMobile