"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon, Menu, X } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/ui/ThemeToggle"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  defaultActive?: string
  logo?: string
}

export function AnimeNavBar({ items, className, defaultActive = "Home", logo }: NavBarProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>(defaultActive)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sync active tab with current route
  useEffect(() => {
    const path = location.pathname
    const routeToNavMap: Record<string, string> = {
      '/': 'Home',
      '/services': 'Services',
      '/teams': 'About Us',
      '/client': 'Client',
      '/blog': 'Blog',
    }
    // Match /blog/:slug as Blog too
    const matchedNav = routeToNavMap[path] ?? (path.startsWith('/blog') ? 'Blog' : null)
    if (matchedNav) {
      setActiveTab(matchedNav)
    } else if (path === '/' || location.hash) {
      setActiveTab('Home')
    }
  }, [location.pathname, location.hash])

  // Close dropdown on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname, location.hash])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  if (!mounted) return null

  const handleNavClick = (item: NavItem) => {
    setMobileOpen(false)
    if (item.name === 'Contact' || item.url === '/contact') {
      navigate('/#contact')
      setTimeout(() => {
        const el = document.getElementById('contact')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 800)
      setActiveTab('Home')
      return
    }
    setActiveTab(item.name)
    if (item.url.startsWith('/')) {
      navigate(item.url)
    } else if (item.url.startsWith('#')) {
      const element = document.querySelector(item.url)
      if (element) element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* ── DESKTOP: pill nav (md and above) ── */}
      <div className="hidden md:flex fixed top-5 left-0 right-0 z-[9999] px-4 justify-center pt-6">
        <motion.div
          className="flex items-center gap-3 bg-white/80 border border-black/10 dark:bg-black/50 dark:border-white/10 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg relative transition-colors duration-300"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {logo && (
            <div className="flex items-center pl-1 pr-1 mr-1">
              <img src={logo} alt="Logo" className="h-8 w-auto object-contain brightness-0 dark:brightness-0 dark:invert transition-all duration-300" />
            </div>
          )}

          <div className="flex items-center gap-3">
            {items.map((item) => {
              const isActive = activeTab === item.name
              const isHovered = hoveredTab === item.name
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={() => setHoveredTab(item.name)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                    "text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white",
                    isActive && "text-black dark:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.03, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                      <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                      <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                      <div className="absolute inset-[-12px] bg-primary/5 rounded-full blur-3xl" />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                        style={{ animation: "shine 3s ease-in-out infinite" }} />
                    </motion.div>
                  )}
                  <span className="relative z-10">{item.name}</span>
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 bg-black/10 dark:bg-white/10 rounded-full -z-10"
                      />
                    )}
                  </AnimatePresence>
                </button>
              )
            })}
          </div>

          <div className="flex items-center pl-2 border-l border-black/10 dark:border-white/10 ml-1">
            <ThemeToggle />
          </div>
        </motion.div>
      </div>

      {/* ── MOBILE: top bar + hamburger ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[9999]">
        {/* Top bar */}
        <motion.div
          className="flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-black/80 backdrop-blur-lg border-b border-black/10 dark:border-white/10 transition-colors duration-300"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Logo */}
          {logo ? (
            <img src={logo} alt="Logo" className="h-7 w-auto object-contain brightness-0 dark:brightness-0 dark:invert transition-all duration-300" />
          ) : (
            <span className="text-sm font-bold tracking-tight text-black dark:text-white">Stellar Wave</span>
          )}

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <X size={20} className="text-black dark:text-white" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <Menu size={20} className="text-black dark:text-white" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

        {/* Dropdown menu */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 top-[56px] bg-black/40 backdrop-blur-sm z-[-1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />

              {/* Menu panel */}
              <motion.div
                className="bg-white dark:bg-[#0a0a0a] border-b border-black/10 dark:border-white/10 shadow-2xl"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ overflow: "hidden" }}
              >
                <nav className="flex flex-col px-4 py-4 gap-1">
                  {items.map((item, i) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.name
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => handleNavClick(item)}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.25, ease: "easeOut" }}
                        className={cn(
                          "flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-left transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-black dark:text-white font-semibold"
                            : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
                        )}
                      >
                        <span className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200",
                          isActive ? "bg-primary/20 text-primary" : "bg-black/5 dark:bg-white/10"
                        )}>
                          <Icon size={16} strokeWidth={2.5} />
                        </span>
                        <span className="text-sm font-medium tracking-tight">{item.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active-dot"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
