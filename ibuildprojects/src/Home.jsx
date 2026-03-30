import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import ParticleField from './ParticleField'
import { User, Code, Camera, Bot } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────
const techSkills = [
  { name: 'Python', color: '#3b82f6', icon: '🐍', level: 78 },
  { name: 'Java', color: '#f59e0b', icon: '☕', level: 80 },
  { name: 'JavaScript', color: '#facc15', icon: '⚡', level: 75 },
  { name: 'React.js', color: '#06b6d4', icon: '⚛️', level: 65 },
  { name: 'NumPy', color: '#4f46e5', icon: '🔢', level: 90 },
  { name: 'Pandas', color: '#10b981', icon: '🐼', level: 89 },
  { name: 'Scikit-Learn', color: '#f97316', icon: '🤖', level: 70 },
  { name: 'TensorFlow', color: '#ef4444', icon: '🧠', level: 68 },
  { name: 'SQL', color: '#8b5cf6', icon: '🗄️', level: 85 },
  { name: 'Git', color: '#f43f5e', icon: '🌿', level: 80 },
  { name: 'Matplotlib', color: '#22d3ee', icon: '📊', level: 85 },
  { name: 'Seaborn', color: '#a78bfa', icon: '📈', level: 75 },
]

const lifeSkills = [
  { name: 'Problem Solving', icon: '🧩', desc: 'Breaking complexity into clarity' },
  { name: 'Photography', icon: '📷', desc: 'Capturing moments and stories' },
  { name: 'Communication', icon: '💬', desc: 'Bridging ideas and people' },
  { name: 'Creativity', icon: '🎨', desc: 'Design thinking & innovation' },
  { name: 'Leadership', icon: '🚀', desc: 'Inspiring & guiding teams' },
  { name: 'Adaptability', icon: '🌊', desc: 'Thriving in change' },
]

// ─── Skill orb ────────────────────────────────────────────────────────────────
function SkillOrb({ skill, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0, rotateY: -90 }}
      animate={inView ? { scale: 1, opacity: 1, rotateY: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ perspective: 600 }}
    >
      <motion.div
        animate={
          hovered
            ? { y: -8, boxShadow: `0 20px 60px ${skill.color}44` }
            : { y: 0, boxShadow: `0 4px 20px ${skill.color}22` }
        }
        style={{
          background: `linear-gradient(135deg, ${skill.color}18, ${skill.color}08)`,
          border: `1px solid ${skill.color}44`,
          borderRadius: 16,
          padding: '20px 18px',
          textAlign: 'center',
          cursor: 'default',
          backdropFilter: 'blur(12px)',
          minWidth: 118,
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: 8 }}>{skill.icon}</div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: skill.color,
            letterSpacing: '0.04em',
            marginBottom: 10,
          }}
        >
          {skill.name}
        </div>
        <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : {}}
            transition={{ delay: index * 0.06 + 0.4, duration: 1, ease: 'easeOut' }}
            style={{ height: '100%', background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`, borderRadius: 2 }}
          />
        </div>
        <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
          {skill.level}%
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Life card ────────────────────────────────────────────────────────────────
function LifeCard({ skill, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ x: index % 2 === 0 ? -60 : 60, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, rotateZ: index % 2 === 0 ? 0.8 : -0.8 }}
      style={{
        background: 'rgba(17,17,36,0.7)',
        border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: 14,
        padding: '22px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        backdropFilter: 'blur(12px)',
      }}
    >
      <span style={{ fontSize: '2rem' }}>{skill.icon}</span>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}>
          {skill.name}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{skill.desc}</div>
      </div>
    </motion.div>
  )
}

// ─── Spinning ring ────────────────────────────────────────────────────────────
function SpinRing({ size, color, speed, reverse }) {
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        border: `1px solid ${color}`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    />
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 140])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  const words = ['Developer.', 'Designer.', 'Creator.', 'Photographer', 'Explorer.']
  const [wordIdx, setWordIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.section
      style={{
        y,
        opacity,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 100,
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Orbital rings */}
      <div
        style={{
          position: 'absolute',
          right: '10%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 420,
          height: 420,
          pointerEvents: 'none',
        }}
      >
        <SpinRing size={420} color="rgba(124,58,237,0.14)" speed={22} />
        <SpinRing size={300} color="rgba(6,182,212,0.2)" speed={15} reverse />
        <SpinRing size={180} color="rgba(245,158,11,0.18)" speed={9} />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 110,
            height: 110,
            background: 'radial-gradient(circle, rgba(124,58,237,0.55), rgba(6,182,212,0.2), transparent)',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(18px)',
          }}
        />
        {/* Planet dots */}
        {[
          { r: 210, angle: 30, icon: '⚛️', speed: 22 },
          { r: 150, angle: 120, icon: '🐍', speed: 15 },
          { r: 90, angle: 240, icon: '🤖', speed: 9 },
        ].map((p, i) => (
          <OrbitDot key={i} {...p} />
        ))}
      </div>

      {/* Copy */}
      <div style={{ maxWidth: 680, paddingLeft: 72, zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--accent2)',
            letterSpacing: '0.22em',
            marginBottom: 18,
          }}
        >
          HELLO WORLD — I AM
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 14,
          }}
        >
          Mithlesh
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Yeole
          </span>
        </motion.h1>

        {/* Rotating role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26, height: '2.2rem', overflow: 'hidden' }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            I&apos;m a
          </span>
          <motion.div
            key={wordIdx}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              background: 'linear-gradient(90deg, var(--accent3), var(--accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {words[wordIdx]}
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44 }}
          style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 500, marginBottom: 34 }}
        >
          Passionate about building intelligent systems, crafting beautiful interfaces,
          and capturing the world through my lens. I turn ideas into experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54 }}
          style={{ display: 'flex', gap: 14 }}
        >
          <motion.a
            href="/photography"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '14px 32px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              borderRadius: 10,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.73rem',
              letterSpacing: '0.1em',
              color: '#fff',
              display: 'inline-block',
            }}
          >
            VIEW WORK →
          </motion.a>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '14px 32px',
              border: '1px solid rgba(124,58,237,0.4)',
              borderRadius: 10,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.73rem',
              letterSpacing: '0.1em',
              color: 'var(--text)',
              display: 'inline-block',
            }}
          >
            CONTACT ME
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: 1, height: 40, background: 'linear-gradient(180deg, var(--accent), transparent)' }}
        />
      </motion.div>
    </motion.section>
  )
}

// Orbit dot component
function OrbitDot({ r, angle, icon, speed }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute',
        width: r * 2,
        height: r * 2,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: `translateX(-50%) rotate(${angle}deg) translateY(-${r}px) rotate(-${angle}deg)`,
          width: 36,
          height: 36,
          background: 'rgba(17,17,36,0.9)',
          border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
        }}
      >
        {icon}
      </div>
    </motion.div>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 72px',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        gap: 80,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {/* Avatar blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', flexShrink: 0 }}
      >
        <motion.div
          animate={{
            borderRadius: [
              '30% 70% 70% 30% / 30% 30% 70% 70%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '30% 70% 70% 30% / 30% 30% 70% 70%',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 260,
            height: 260,
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 40px 80px rgba(124,58,237,0.3)',
          }}
        >
          <User size={80} color="white" />
        </motion.div>

        {[
          { icon: <Code size={20} />, x: -24, y: 20, delay: 0 },
          { icon: <Camera size={20} />, x: 268, y: 60, delay: 0.3 },
          { icon: <Bot size={20} />, x: 230, y: 210, delay: 0.6 },
        ].map((b, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, delay: b.delay, repeat: Infinity }}
            style={{
              position: 'absolute',
              left: b.x,
              top: b.y,
              width: 48,
              height: 48,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}
          >
            {b.icon}
          </motion.div>
        ))}
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{ flex: 1, minWidth: 280 }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent3)', letterSpacing: '0.25em', marginBottom: 14 }}>
          00 — ABOUT ME
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 3vw, 3rem)', letterSpacing: '-0.02em', marginBottom: 22 }}>
          The Story Behind <br />
          <span style={{ color: 'var(--accent2)' }}>The Code</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: 14, maxWidth: 520 }}>
          I&apos;m a passionate developer and data enthusiast who loves bridging the gap between
          data-driven insights and beautiful user experiences. When I&apos;m not writing code,
          I&apos;m out with my camera capturing the world.
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, maxWidth: 520 }}>
          My journey spans machine learning, full-stack development, and visual storytelling —
          all united by a curiosity that never stops asking{' '}
          <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>"what if?"</span>
        </p>
      </motion.div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    // { value: '12+', label: 'Projects Built' },
    { value: '2+', label: 'Years Coding' },
    { value: '10000+', label: 'Photos Taken' },
    { value: '∞', label: 'Curiosity' },
  ]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div
      ref={ref}
      style={{
        margin: '0 72px',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.07))',
        border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: 20,
        padding: '40px 60px',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: 30,
        zIndex: 1,
        position: 'relative',
      }}
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1 }}
          style={{ textAlign: 'center' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '3rem',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {s.value}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Skills section ───────────────────────────────────────────────────────────
function SkillsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} style={{ padding: '120px 72px', position: 'relative', zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.25em', marginBottom: 10 }}>
          01 — TECHNICAL ARSENAL
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em', background: 'linear-gradient(90deg, var(--text), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Skills & Technologies
        </h2>
      </motion.div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
        {techSkills.map((s, i) => <SkillOrb key={s.name} skill={s} index={i} />)}
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} style={{ marginTop: 80 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent2)', letterSpacing: '0.25em', marginBottom: 10 }}>
          02 — BEYOND THE CODE
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 3rem)', letterSpacing: '-0.02em', marginBottom: 36, background: 'linear-gradient(90deg, var(--text), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Life Skills
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {lifeSkills.map((s, i) => <LifeCard key={s.name} skill={s} index={i} />)}
        </div>
      </motion.div>
    </section>
  )
}

// ─── Home page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <ParticleField />

      {/* Ambient blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)', top: -200, right: -100, filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)', bottom: 200, left: -100, filter: 'blur(40px)' }} />
      </div>

      <Hero />
      <AboutSection />
      <StatsStrip />
      <SkillsSection />
      <div style={{ height: 120 }} />
    </motion.div>
  )
}
