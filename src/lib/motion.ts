/** Linear-style motion tokens — clean, fast, no blur */
export const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const springClean = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
  mass: 0.8,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 120,
  damping: 22,
  mass: 1,
};

export const springSnappy = {
  type: "spring" as const,
  stiffness: 400,
  damping: 32,
};

export const tweenClean = {
  duration: 0.55,
  ease: EASE_OUT_EXPO,
};

export const viewport = { once: true, margin: "-80px" as const };

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...tweenClean },
  },
};
