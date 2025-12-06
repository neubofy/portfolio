'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaWhatsapp, FaPhoneAlt, FaFingerprint, FaInstagram, FaTelegramPlane, FaFacebook, FaLinkedin, FaGlobe } from 'react-icons/fa';

export default function Contact() {
    const contactMethods = [
        {
            id: 'email',
            icon: <FaEnvelope />,
            label: "Initialize Protocol",
            subLabel: "Email Communication",
            action: "mailto:pawanwashudev@neubofy.bar",
            color: "text-[var(--gold)]",
            border: "group-hover:border-[var(--gold)]",
            bg: "group-hover:bg-[var(--gold)]/10"
        },
        {
            id: 'phone',
            icon: <FaPhoneAlt />,
            label: "Voice Uplink",
            subLabel: "Direct Line",
            action: "tel:9279377276",
            color: "text-cyan-400",
            border: "group-hover:border-cyan-400",
            bg: "group-hover:bg-cyan-400/10"
        },
        {
            id: 'whatsapp',
            icon: <FaWhatsapp />,
            label: "Secure Channel",
            subLabel: "WhatsApp Chat",
            action: "https://wa.me/919279377276",
            color: "text-green-400",
            border: "group-hover:border-green-400",
            bg: "group-hover:bg-green-400/10"
        }
    ];

    return (
        <section id="contact" className="py-32 px-4 md:px-20 min-h-[80vh] flex flex-col justify-center relative overflow-hidden">

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-md">
                        <FaFingerprint className="text-[var(--gold)]" />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Secure Connection Available</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tight">
                        Start the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] to-yellow-200">Signal</span>.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {contactMethods.map((method, index) => (
                        <motion.a
                            key={method.id}
                            href={method.action}
                            target={method.id === 'whatsapp' ? "_blank" : undefined}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group relative h-64 glass-panel rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-6 overflow-hidden transition-all duration-500 hover:scale-[1.02] ${method.border}`}
                        >
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${method.bg}`} />

                            {/* Icon - Always Colored & Animated on Hover */}
                            <div className={`text-5xl transition-all duration-500 relative z-10 ${method.color} group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_currentColor]`}>
                                {method.icon}
                            </div>

                            {/* Text Info */}
                            <div className="text-center relative z-10">
                                <h3 className="text-xl font-bold text-white mb-1 tracking-wide">{method.label}</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">{method.subLabel}</p>
                            </div>

                            {/* Hidden 'Connect' Reveal */}
                            <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/50 backdrop-blur-sm border-t border-white/5 text-center">
                                <span className={`text-xs font-bold uppercase tracking-widest ${method.color}`}>
                                    Connect Now
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Social Network Nodes */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    {[
                        { name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com/pawanwashudev', color: 'text-[#E1306C]', hover: 'hover:border-[#E1306C]' },
                        { name: 'Telegram', icon: <FaTelegramPlane />, url: 'https://t.me/pawanwashudev', color: 'text-[#0088cc]', hover: 'hover:border-[#0088cc]' },
                        { name: 'Facebook', icon: <FaFacebook />, url: 'https://facebook.com/pawanwashudev', color: 'text-[#1877F2]', hover: 'hover:border-[#1877F2]' },
                        { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com/in/pawanwashudev', color: 'text-[#0077B5]', hover: 'hover:border-[#0077B5]' },
                        { name: 'Arratai', icon: <FaGlobe />, url: '#', color: 'text-purple-500', hover: 'hover:border-purple-500' }
                    ].map((social, idx) => (
                        <a
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-105 ${social.hover} group`}
                        >
                            <span className={`text-xl transition-colors ${social.color} group-hover:drop-shadow-[0_0_10px_currentColor]`}>{social.icon}</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors">{social.name}</span>
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
