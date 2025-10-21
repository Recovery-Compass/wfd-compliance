import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'display': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				'text': ['SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'], // Fallback
			},
			spacing: {
				'1': '4px',     // 0.25rem - Micro spacing
				'2': '8px',     // 0.5rem  - Tight spacing
				'3': '12px',    // 0.75rem - Small spacing
				'4': '16px',    // 1rem    - Base spacing
				'6': '24px',    // 1.5rem  - Comfortable spacing
				'8': '32px',    // 2rem    - Large spacing
				'12': '48px',   // 3rem    - Extra large spacing
				'16': '64px',   // 4rem    - Section spacing
				'24': '96px',   // 6rem    - Page spacing
			},
			fontSize: {
				'h1-hero': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
				'h1-page': ['2.5rem', { lineHeight: '1.3', fontWeight: '700' }],
				'h2-section': ['1.75rem', { lineHeight: '1.4', fontWeight: '600' }],
				'h3-card': ['1.25rem', { lineHeight: '1.5', fontWeight: '500' }],
				'body-large': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
				'body-base': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
				'label': ['0.75rem', { lineHeight: '1', fontWeight: '500', textTransform: 'uppercase' }],
				'data-xl': ['4rem', { lineHeight: '1', fontWeight: '700' }],
				'data-large': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					light: 'hsl(var(--primary-light))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: '#f9fafb',
					foreground: 'hsl(var(--card-foreground))'
				},
				ink: { 900: '#111827', 700: '#374151', 600: '#4B5563' },
				line: '#e5e7eb',
				rc: { green: '#2D5F3F' },
				// WFD Brand Colors - Warm sunset/sunrise palette
				wfd: {
					purple: 'hsl(var(--primary))',
					'purple-light': 'hsl(var(--primary-light))',
					gold: 'hsl(var(--wfd-gold))',
					'gold-light': 'hsl(var(--wfd-gold-light))',
					orange: 'hsl(var(--wfd-orange))',
					'orange-light': 'hsl(var(--wfd-orange-light))',
					blue: 'hsl(var(--wfd-blue))',
					'blue-light': 'hsl(var(--wfd-blue-light))',
					navy: '#1e3a5f'
				},
				// Survey specific colors
				survey: {
					'bg-start': 'hsl(var(--survey-bg-start))',
					'bg-end': 'hsl(var(--survey-bg-end))'
				},
				// Status Colors aligned with brand
				danger: {
					DEFAULT: 'hsl(var(--danger))',
					light: 'hsl(var(--danger-light))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					light: 'hsl(var(--warning-light))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					light: 'hsl(var(--success-light))'
				},
				// Recovery Compass Brand Colors
				'rc-primary': '#1A365D',
				'rc-accent': '#3182CE',
				'rc-success': '#38A169',
				'rc-warning': '#D69E2E',
				'rc-error': '#E53E3E',
				'rc-bg': '#F7FAFC',
				// Data Quality Colors
				'quality-red': '#E53E3E',
				'quality-yellow': '#D69E2E',
				'quality-green': '#38A169',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'hover-lift': 'hover-lift 200ms ease-in-out',
				'skeleton': 'skeleton-pulse 1.5s ease-in-out infinite',
				'fade-slide-in': 'fade-slide-in 300ms ease-out'
			},
			maxWidth: {
				'dashboard': '1440px'
			},
			height: {
				'header': '72px',
				'gauge': '400px',
				'card': '240px'
			},
			boxShadow: {
				'enterprise': '0 2px 8px rgba(0,0,0,0.08)',
				'enterprise-hover': '0 8px 24px -4px rgba(74, 20, 140, 0.15)',
				'card-subtle': '0 1px 3px 0 rgba(74, 20, 140, 0.1), 0 1px 2px -1px rgba(74, 20, 140, 0.1)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
