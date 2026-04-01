import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import ParticleField from './ParticleField'
import { useEffect } from "react"
import { useIsMobile } from './useIsMobile'

// ─── Flip card ────────────────────────────────────────────────────────────────
function PhotoCard({ photo, index, onView }) {
  const [flipped, setFlipped] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: (index % 3) * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setFlipped((f) => !f)}
      onDoubleClick={() => onView(photo.imageUrl)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          height: 320,
          position: 'relative',
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
        }}
      >
        {/* Front */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: 16,
            overflow: 'hidden',
            backgroundImage: `url(${photo.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <motion.div
              animate={!flipped ? { scale: [1, 1.06, 1] } : {}}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ fontSize: '4.5rem', marginBottom: 14 }}
            >
            </motion.div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.2em',
                background: 'rgba(0,0,0,0.4)',
                padding: '4px 12px',
                borderRadius: 20,
                color: '#fff',
                marginBottom: 8,
              }}
            >
              {photo.category.toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.2rem',
                color: '#fff',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              }}
            >
              {photo.title}
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: 14,
                right: 14,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.52rem',
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.08em',
              }}
            >
              CLICK TO REVEAL →
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: 16,
            transform: 'rotateY(180deg)',
            background: 'var(--surface)',
            border: '1px solid rgba(124,58,237,0.3)',
            padding: 26,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ width: 28, height: 3, background: "linear-gradient(135deg,#7c3aed,#06b6d4)", borderRadius: 2, marginBottom: 14 }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', marginBottom: 10, color: 'var(--text)' }}>
              {photo.title}
            </h3>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.78, fontStyle: 'italic' }}>
              &ldquo;{photo.story}&rdquo;
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent2)', letterSpacing: '0.08em' }}>
              📍 {photo.location}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'var(--text-muted)' }}>
              CLICK TO FLIP
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Photography page ─────────────────────────────────────────────────────────
export default function Photography() {
  const isMobile = useIsMobile()
  const [photos, setPhotos] = useState([])
  const [active, setActive] = useState("All")
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    fetch("https://ibuildprojects.onrender.com/api/photos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPhotos(data)
      })
      .catch((err) => console.log(err))
  }, [])

  const allCategories = ["All", ...new Set(photos.map((p) => p.category))]
  const filtered = active === "All" ? photos : photos.filter((p) => p.category === active)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: 100, minHeight: "100vh", position: "relative" }}
    >
      <ParticleField count={60} />

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.07), transparent 70%)",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: isMobile ? '40px 16px' : '60px 72px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--accent3)", letterSpacing: "0.3em", marginBottom: 14 }}>
            THROUGH THE LENS
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 8vw, 4.5rem)",
              letterSpacing: "-0.03em",
              marginBottom: 14,
            }}
          >
            My{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--accent3), var(--accent))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Visual Stories
            </span>
          </h1>

          <p style={{ color: "var(--text-muted)", maxWidth: 460, margin: "0 auto", lineHeight: 1.72, fontSize: '0.95rem' }}>
            Click any photo to flip it and read the story behind the frame.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 52 }}
        >
          {allCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: isMobile ? '8px 16px' : '8px 20px',
                borderRadius: 30,
                border: active === cat ? "none" : "1px solid rgba(124,58,237,0.3)",
                background: active === cat ? "linear-gradient(135deg, var(--accent), var(--accent2))" : "rgba(17,17,36,0.6)",
                color: active === cat ? "#fff" : "var(--text-muted)",
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.08em',
                cursor: 'pointer',
              }}
            >
              {cat.toUpperCase()}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? '1fr' : "repeat(auto-fill, minmax(290px, 1fr))",
              gap: 22,
            }}
          >
            {filtered.map((photo, i) => (
              <PhotoCard key={photo._id} photo={photo} index={i} onView={setSelectedImage} />
            ))}
          </motion.div>
        </AnimatePresence>

        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999,
              padding: '16px',
            }}
          >
            <img
              src={selectedImage}
              alt="preview"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                borderRadius: 12,
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 80, padding: isMobile ? '30px 16px' : '40px', borderTop: '1px solid rgba(124,58,237,0.12)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? '1rem' : '1.3rem',
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'var(--text-muted)',
              maxWidth: 580,
              margin: '0 auto',
            }}
          >
            &ldquo;photography is an art that tells stories without words&rdquo;
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
