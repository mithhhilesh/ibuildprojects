import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import ParticleField from './ParticleField'
import { useIsMobile } from './useIsMobile'

const socials = [
  { icon: '🐙', label: 'GitHub', handle: '@mithhhilesh', color: '#7c3aed', url: 'https://github.com/mithhhilesh' },
  { icon: '💼', label: 'LinkedIn', handle: 'mithlesh-yeole01', color: '#06b6d4', url: 'https://www.linkedin.com/in/mithlesh-yeole01/' },
  { icon: '📷', label: 'Instagram', handle: '@cheese._potato', color: '#f59e0b', url: 'https://www.instagram.com/cheese._potato/' },
  { icon: '🐦', label: 'Twitter / X', handle: '@Mithhhilesh', color: '#10b981', url: 'https://twitter.com/Mithhhilesh' },
]

// ─── Magnetic button ──────────────────────────────────────────────────────────
function MagneticButton({ children, style, onClick }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    })
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      style={style}
    >
      {children}
    </motion.button>
  )
}

// ─── Animated floating-label input ───────────────────────────────────────────
function AnimInput({ label, type = 'text', multiline, name }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const Tag = multiline ? 'textarea' : 'input'
  const lifted = focused || value.length > 0

  return (
    <div style={{ position: 'relative', marginBottom: 26 }}>
      <motion.label
        animate={{
          top: lifted ? (multiline ? -9 : -9) : multiline ? 18 : '50%',
          y: lifted ? 0 : multiline ? 0 : '-50%',
          fontSize: lifted ? '0.6rem' : '0.83rem',
          color: focused ? 'var(--accent2)' : 'var(--text-muted)',
        }}
        transition={{ duration: 0.18 }}
        style={{
          position: 'absolute',
          left: 16,
          pointerEvents: 'none',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.04em',
          zIndex: 2,
          background: lifted ? 'var(--bg)' : 'transparent',
          padding: '0 4px',
        }}
      >
        {label}
      </motion.label>

      <Tag
        type={type}
        name={name}
        value={value}
        rows={multiline ? 5 : undefined}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: multiline ? '20px 16px' : '18px 16px',
          background: 'rgba(17,17,36,0.8)',
          border: `1px solid ${focused ? 'var(--accent2)' : 'rgba(124,58,237,0.2)'}`,
          borderRadius: 10,
          color: 'var(--text)',
          fontSize: '0.88rem',
          outline: 'none',
          resize: multiline ? 'vertical' : undefined,
          fontFamily: 'var(--font-body)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          boxShadow: focused ? '0 0 0 3px rgba(6,182,212,0.1)' : 'none',
          cursor: 'none',
        }}
      />
    </div>
  )
}

// ─── Contact page ─────────────────────────────────────────────────────────────
export default function Contact() {
  const isMobile = useIsMobile()
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: 100, minHeight: '100vh', position: 'relative' }}
    >
      <ParticleField count={50} />

      {/* Blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)', bottom: -100, right: -100, filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)', top: 100, left: -100, filter: 'blur(60px)' }} />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1100,
          margin: '0 auto',
          padding: isMobile ? '40px 16px' : '60px 72px',
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: isMobile ? 40 : 64, textAlign: 'center' }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.3em', marginBottom: 14 }}>
            LET&apos;S CONNECT
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 8vw, 4.5rem)',
              letterSpacing: '-0.03em',
              marginBottom: 14,
            }}
          >
            Say{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Hello 👋
            </span>
          </h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.72, maxWidth: 480, margin: '0 auto', fontSize: '0.95rem' }}>
            Whether it&apos;s a project idea, a collaboration, or just a conversation about code and cameras — I&apos;m always up for a good chat.
          </p>
        </motion.div>

        {/* Two-col → single-col on mobile */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 36 : 60,
            alignItems: 'start',
          }}
        >
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: isMobile ? '1.3rem' : '1.55rem', marginBottom: 12 }}>
              Let&apos;s build something amazing together.
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.82, marginBottom: 36, fontSize: '0.95rem' }}>
              I&apos;m currently open to freelance opportunities, internships, and interesting collaborations. My response time is usually under 24 hours.
            </p>

            {/* Info rows */}
            {[
              { icon: '📩', label: 'EMAIL', value: 'mithlesh.yeole@gmail.com', color: 'var(--accent2)' },
              { icon: '📍', label: 'LOCATION', value: 'Nagpur, Maharashtra, India', color: 'var(--text)' },
            ].map((row) => (
              <motion.div
                key={row.label}
                whileHover={{ x: 6 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px 18px',
                  background: 'rgba(17,17,36,0.6)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  borderRadius: 12,
                  marginBottom: 14,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>{row.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 2 }}>{row.label}</div>
                  <div style={{ fontSize: '0.88rem', color: row.color, wordBreak: 'break-all' }}>{row.value}</div>
                </div>
              </motion.div>
            ))}

            {/* Socials */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.2em', margin: '28px 0 16px' }}>FIND ME ON</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.url}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ scale: 1.03, borderColor: s.color }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '11px 13px',
                    background: 'rgba(17,17,36,0.6)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 10,
                    backdropFilter: 'blur(10px)',
                    transition: 'border-color 0.3s',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.73rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.label}</div>
                    <div style={{ fontSize: '0.63rem', color: s.color, fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.handle}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'rgba(11,11,22,0.85)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: 20,
              padding: isMobile ? '28px 20px' : '38px 34px',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', marginBottom: 28 }}>
              Send a Message
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : '0 18px' }}>
              <AnimInput label="First Name" name="first" />
              <AnimInput label="Last Name" name="last" />
            </div>
            <AnimInput label="Email Address" type="email" name="email" />
            <AnimInput label="Subject" name="subject" />
            <AnimInput label="Your message..." multiline name="message" />

            <MagneticButton
              onClick={handleSend}
              style={{
                width: '100%',
                padding: '15px',
                background: sent
                  ? 'linear-gradient(135deg, #10b981, #06b6d4)'
                  : 'linear-gradient(135deg, var(--accent), var(--accent2))',
                border: 'none',
                borderRadius: 12,
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.73rem',
                letterSpacing: '0.14em',
                boxShadow: '0 8px 30px rgba(124,58,237,0.3)',
                transition: 'background 0.5s',
              }}
            >
              {sent ? '✅ MESSAGE SENT!' : 'SEND MESSAGE →'}
            </MagneticButton>
          </motion.div>
        </div>

        {/* Available badge */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ textAlign: 'center', marginTop: 72 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 22px',
              border: '1px solid rgba(124,58,237,0.18)',
              borderRadius: 30,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}
            />
            AVAILABLE FOR OPPORTUNITIES
          </div>
        </motion.div>

        <div style={{ height: 60 }} />
      </div>
    </motion.div>
  )
}
