import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import { Wrench } from "lucide-react";

export default function Projects() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ParticleField />

            {/* Ambient background (same as Home) */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div
                    style={{
                        position: "absolute",
                        width: 600,
                        height: 600,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)",
                        top: -200,
                        right: -100,
                        filter: "blur(40px)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        width: 500,
                        height: 500,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)",
                        bottom: 200,
                        left: -100,
                        filter: "blur(40px)",
                    }}
                />
            </div>

            {/* Main Section */}
            <section
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 1,
                    textAlign: "center",
                    padding: "0 24px",
                }}
            >
                {/* Animated Blob */}
                <motion.div
                    animate={{
                        borderRadius: [
                            "30% 70% 70% 30% / 30% 30% 70% 70%",
                            "60% 40% 30% 70% / 60% 30% 70% 40%",
                            "30% 70% 70% 30% / 30% 30% 70% 70%",
                        ],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        width: 260,
                        height: 260,
                        background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 40px 80px rgba(124,58,237,0.3)",
                        margin: "0 auto 40px",
                    }}
                >
                    <Wrench size={80} color="white" />
                </motion.div>

                {/* Text */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.7rem",
                            letterSpacing: "0.25em",
                            color: "var(--accent2)",
                            marginBottom: 14,
                        }}
                    >
                        PROJECTS — WORK IN PROGRESS
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                            letterSpacing: "-0.02em",
                            marginBottom: 16,
                        }}
                    >
                        Under Construction
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            color: "var(--text-muted)",
                            maxWidth: 420,
                            margin: "0 auto",
                            lineHeight: 1.8,
                        }}
                    >
                        I’m currently building and refining my projects.
                        <br />
                        Stay tuned — something exciting is coming soon.
                        Meanwhile check out my socials ; )
                    </motion.p>

                    {/* subtle animated line */}
                    <motion.div
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{
                            height: 2,
                            marginTop: 30,
                            background: "linear-gradient(90deg, var(--accent), var(--accent2))",
                            borderRadius: 2,
                        }}
                    />
                </div>
            </section>
        </motion.div>
    );
}