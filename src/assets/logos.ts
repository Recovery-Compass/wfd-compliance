// Logo imports for WFD Partnership Dashboard
// These will be used in the premium glassmorphic dashboard

export const RECOVERY_COMPASS_LOGO = '/recovery-compass-logo.png';
export const WFD_LOGO = '/whittier-first-day-logo.png';

// Logo animation variants for framer-motion
export const logoAnimationVariants = {
  initial: { 
    scale: 0, 
    rotate: -180, 
    opacity: 0 
  },
  animate: { 
    scale: 1, 
    rotate: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  },
  hover: {
    scale: 1.05,
    rotate: 5,
    transition: { duration: 0.2 }
  }
};

// Partnership branding configuration
export const PARTNERSHIP_CONFIG = {
  primaryLogo: RECOVERY_COMPASS_LOGO,
  secondaryLogo: WFD_LOGO,
  partnershipText: "Recovery Compass + Whittier First Day Partnership",
  mouDate: "August 29, 2025",
  brandingPosition: "footer" // or "header"
};