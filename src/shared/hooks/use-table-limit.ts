import { useState, useEffect } from "react"

export function useTableLimit(ref: React.RefObject<HTMLElement | null>, rowHeight = 70) {
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    const calculateLimit = () => {
      if (ref && ref.current) {
        const containerHeight = ref.current.offsetHeight
        const newLimit = Math.max(1, Math.floor(containerHeight/ rowHeight))
        setLimit(newLimit)
      }
    }
    calculateLimit()

    window.addEventListener("resize", calculateLimit)
    return () => {
      window.removeEventListener("resize", calculateLimit)
    }
  }, [ref, rowHeight])

  return limit
}
