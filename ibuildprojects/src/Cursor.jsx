import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailX = useSpring(cursorX, { stiffness: 80, damping: 20 })
  const trailY = useSpring(cursorY, { stiffness: 80, damping: 20 })
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detect touch device: suppress the custom cursor entirely
    const checkTouch = () => setIsTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches)
    checkTouch()
    const move = (e) => {
      cursorX.set(e.clientX - 6)
      cursorY.set(e.clientY - 6)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  if (isTouch) return null

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          width: 12,
          height: 12,
          background: 'var(--accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          left: trailX,
          top: trailY,
          width: 36,
          height: 36,
          border: '1px solid var(--accent2)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0.5,
          transform: 'translate(-12px, -12px)',
        }}
      />
    </>
  )
}
