import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useIsMobile } from './useIsMobile'

const links = [
  { path: '/', label: 'HOME' },
  { path: '/projects', label: 'PROJECTS' },
  { path: '/photography', label: 'PHOTOGRAPHY' },
  { path: '/contact', label: 'CONTACT ME' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '16px 24px' : '20px 48px',
          background: 'rgba(8,8,16,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(124,58,237,0.15)',
        }}
      >
        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: isMobile ? '1.1rem' : '1.4rem',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
          >
            &lt;iBuildProjects/&gt;
          </motion.div>
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            {links.map((l) => (
              <Link key={l.path} to={l.path}>
                <motion.div whileHover={{ y: -2 }} style={{ position: 'relative' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.15em',
                      color: pathname === l.path ? 'var(--accent2)' : 'var(--text-muted)',
                      transition: 'color 0.3s',
                    }}
                  >
                    {l.label}
                  </span>
                  {pathname === l.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        right: 0,
                        height: 1,
                        background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        {/* Hamburger button (mobile only) */}
        {isMobile && (
          <motion.button
            onClick={() => setMenuOpen((o) => !o)}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              padding: 4,
              zIndex: 1100,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? i === 0
                      ? { rotate: 45, y: 10 }
                      : i === 1
                      ? { opacity: 0, scaleX: 0 }
                      : { rotate: -45, y: -10 }
                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.25 }}
                style={{
                  display: 'block',
                  width: 24,
                  height: 2,
                  background: menuOpen ? 'var(--accent2)' : 'var(--text)',
                  borderRadius: 2,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </motion.button>
        )}
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              background: 'rgba(8,8,16,0.97)',
              backdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 36,
            }}
          >
            {links.map((l, idx) => (
              <motion.div
                key={l.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
              >
                <Link to={l.path} onClick={() => setMenuOpen(false)}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '2rem',
                      letterSpacing: '-0.02em',
                      color: pathname === l.path ? 'var(--accent2)' : 'var(--text)',
                    }}
                  >
                    {l.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
