import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'

const links = [
  { path: '/', label: 'HOME' },
  { path: '/projects', label: 'PROJECTS' },
  { path: '/photography', label: 'PHOTOGRAPHY' },
  { path: '/contact', label: 'CONTACT ME' },
];

export default function Navbar() {
  const { pathname } = useLocation()

  return (
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
        padding: '20px 48px',
        background: 'rgba(8,8,16,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(124,58,237,0.15)',
      }}
    >
      {/* Logo */}
      <Link to="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.4rem',
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

      {/* Links */}
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
    </motion.nav>
  )
}
