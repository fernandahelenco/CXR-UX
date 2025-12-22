import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        brand: {
          red: "hsl(var(--brand-red) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          hover: "hsl(var(--primary-hover) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          hover: "hsl(var(--secondary-hover) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          hover: "hsl(var(--destructive-hover) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)",
          hover: "hsl(var(--success-hover) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          foreground: "hsl(var(--warning-foreground) / <alpha-value>)",
          hover: "hsl(var(--warning-hover) / <alpha-value>)",
        },
        info: {
          DEFAULT: "hsl(var(--info) / <alpha-value>)",
          foreground: "hsl(var(--info-foreground) / <alpha-value>)",
          hover: "hsl(var(--info-hover) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          primary: "hsl(var(--sidebar-primary) / <alpha-value>)",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          accent: "hsl(var(--sidebar-accent) / <alpha-value>)",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "hsl(var(--sidebar-border) / <alpha-value>)",
          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",
        },
        chart: {
          1: "hsl(var(--chart-1) / <alpha-value>)",
          2: "hsl(var(--chart-2) / <alpha-value>)",
          3: "hsl(var(--chart-3) / <alpha-value>)",
          4: "hsl(var(--chart-4) / <alpha-value>)",
          5: "hsl(var(--chart-5) / <alpha-value>)",
        },
        // ============================================================
        // WEX Component Slot Utilities (Layer 3)
        // ============================================================
        wex: {
          button: {
            primary: {
              bg: "hsl(var(--wex-component-button-primary-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-button-primary-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-button-primary-border) / <alpha-value>)",
              "hover-bg": "hsl(var(--wex-component-button-primary-hover-bg) / <alpha-value>)",
              "active-bg": "hsl(var(--wex-component-button-primary-active-bg) / <alpha-value>)",
              "focus-ring": "hsl(var(--wex-component-button-primary-focus-ring) / <alpha-value>)",
              "disabled-bg": "hsl(var(--wex-component-button-primary-disabled-bg) / <alpha-value>)",
              "disabled-fg": "hsl(var(--wex-component-button-primary-disabled-fg) / <alpha-value>)",
              "disabled-border": "hsl(var(--wex-component-button-primary-disabled-border) / <alpha-value>)",
            },
            secondary: {
              bg: "hsl(var(--wex-component-button-secondary-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-button-secondary-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-button-secondary-border) / <alpha-value>)",
              "hover-bg": "hsl(var(--wex-component-button-secondary-hover-bg) / <alpha-value>)",
              "active-bg": "hsl(var(--wex-component-button-secondary-active-bg) / <alpha-value>)",
              "focus-ring": "hsl(var(--wex-component-button-secondary-focus-ring) / <alpha-value>)",
              "disabled-bg": "hsl(var(--wex-component-button-secondary-disabled-bg) / <alpha-value>)",
              "disabled-fg": "hsl(var(--wex-component-button-secondary-disabled-fg) / <alpha-value>)",
              "disabled-border": "hsl(var(--wex-component-button-secondary-disabled-border) / <alpha-value>)",
            },
            destructive: {
              bg: "hsl(var(--wex-component-button-destructive-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-button-destructive-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-button-destructive-border) / <alpha-value>)",
              "hover-bg": "hsl(var(--wex-component-button-destructive-hover-bg) / <alpha-value>)",
              "active-bg": "hsl(var(--wex-component-button-destructive-active-bg) / <alpha-value>)",
              "focus-ring": "hsl(var(--wex-component-button-destructive-focus-ring) / <alpha-value>)",
              "disabled-bg": "hsl(var(--wex-component-button-destructive-disabled-bg) / <alpha-value>)",
              "disabled-fg": "hsl(var(--wex-component-button-destructive-disabled-fg) / <alpha-value>)",
              "disabled-border": "hsl(var(--wex-component-button-destructive-disabled-border) / <alpha-value>)",
            },
            tertiary: {
              fg: "hsl(var(--wex-component-button-tertiary-fg) / <alpha-value>)",
              "hover-bg": "hsl(var(--wex-component-button-tertiary-hover-bg) / <alpha-value>)",
              "active-bg": "hsl(var(--wex-component-button-tertiary-active-bg) / <alpha-value>)",
              "focus-ring": "hsl(var(--wex-component-button-tertiary-focus-ring) / <alpha-value>)",
              "disabled-fg": "hsl(var(--wex-component-button-tertiary-disabled-fg) / <alpha-value>)",
            },
          },
          input: {
            bg: "hsl(var(--wex-component-input-bg) / <alpha-value>)",
            fg: "hsl(var(--wex-component-input-fg) / <alpha-value>)",
            placeholder: "hsl(var(--wex-component-input-placeholder) / <alpha-value>)",
            border: "hsl(var(--wex-component-input-border) / <alpha-value>)",
            "border-hover": "hsl(var(--wex-component-input-border-hover) / <alpha-value>)",
            "border-focus": "hsl(var(--wex-component-input-border-focus) / <alpha-value>)",
            "focus-ring": "hsl(var(--wex-component-input-focus-ring) / <alpha-value>)",
            "disabled-bg": "hsl(var(--wex-component-input-disabled-bg) / <alpha-value>)",
            "disabled-fg": "hsl(var(--wex-component-input-disabled-fg) / <alpha-value>)",
            "disabled-border": "hsl(var(--wex-component-input-disabled-border) / <alpha-value>)",
          },
          select: {
            "trigger-bg": "hsl(var(--wex-component-select-trigger-bg) / <alpha-value>)",
            "trigger-fg": "hsl(var(--wex-component-select-trigger-fg) / <alpha-value>)",
            "trigger-border": "hsl(var(--wex-component-select-trigger-border) / <alpha-value>)",
            "trigger-focus-ring": "hsl(var(--wex-component-select-trigger-focus-ring) / <alpha-value>)",
            "content-bg": "hsl(var(--wex-component-select-content-bg) / <alpha-value>)",
            "item-hover-bg": "hsl(var(--wex-component-select-item-hover-bg) / <alpha-value>)",
            "item-selected-bg": "hsl(var(--wex-component-select-item-selected-bg) / <alpha-value>)",
            "item-selected-fg": "hsl(var(--wex-component-select-item-selected-fg) / <alpha-value>)",
          },
          table: {
            "header-bg": "hsl(var(--wex-component-table-header-bg) / <alpha-value>)",
            "header-fg": "hsl(var(--wex-component-table-header-fg) / <alpha-value>)",
            "row-bg": "hsl(var(--wex-component-table-row-bg) / <alpha-value>)",
            "row-alt-bg": "hsl(var(--wex-component-table-row-alt-bg) / <alpha-value>)",
            "row-hover-bg": "hsl(var(--wex-component-table-row-hover-bg) / <alpha-value>)",
            border: "hsl(var(--wex-component-table-border) / <alpha-value>)",
            "selected-bg": "hsl(var(--wex-component-table-selected-bg) / <alpha-value>)",
            "selected-fg": "hsl(var(--wex-component-table-selected-fg) / <alpha-value>)",
            "focus-ring": "hsl(var(--wex-component-table-focus-ring) / <alpha-value>)",
            "cell-fg": "hsl(var(--wex-component-table-cell-fg) / <alpha-value>)",
          },
          card: {
            bg: "hsl(var(--wex-component-card-bg) / <alpha-value>)",
            fg: "hsl(var(--wex-component-card-fg) / <alpha-value>)",
            border: "hsl(var(--wex-component-card-border) / <alpha-value>)",
            "header-fg": "hsl(var(--wex-component-card-header-fg) / <alpha-value>)",
            "footer-fg": "hsl(var(--wex-component-card-footer-fg) / <alpha-value>)",
          },
          dialog: {
            bg: "hsl(var(--wex-component-dialog-bg) / <alpha-value>)",
            fg: "hsl(var(--wex-component-dialog-fg) / <alpha-value>)",
            border: "hsl(var(--wex-component-dialog-border) / <alpha-value>)",
            "header-fg": "hsl(var(--wex-component-dialog-header-fg) / <alpha-value>)",
            "footer-fg": "hsl(var(--wex-component-dialog-footer-fg) / <alpha-value>)",
            "focus-ring": "hsl(var(--wex-component-dialog-focus-ring) / <alpha-value>)",
            "close-hover-bg": "hsl(var(--wex-component-dialog-close-hover-bg) / <alpha-value>)",
          },
          badge: {
            neutral: {
              bg: "hsl(var(--wex-component-badge-neutral-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-badge-neutral-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-badge-neutral-border) / <alpha-value>)",
            },
            info: {
              bg: "hsl(var(--wex-component-badge-info-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-badge-info-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-badge-info-border) / <alpha-value>)",
            },
            success: {
              bg: "hsl(var(--wex-component-badge-success-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-badge-success-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-badge-success-border) / <alpha-value>)",
            },
            warning: {
              bg: "hsl(var(--wex-component-badge-warning-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-badge-warning-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-badge-warning-border) / <alpha-value>)",
            },
            destructive: {
              bg: "hsl(var(--wex-component-badge-destructive-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-badge-destructive-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-badge-destructive-border) / <alpha-value>)",
            },
          },
          alert: {
            info: {
              bg: "hsl(var(--wex-component-alert-info-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-alert-info-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-alert-info-border) / <alpha-value>)",
              icon: "hsl(var(--wex-component-alert-info-icon) / <alpha-value>)",
            },
            success: {
              bg: "hsl(var(--wex-component-alert-success-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-alert-success-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-alert-success-border) / <alpha-value>)",
              icon: "hsl(var(--wex-component-alert-success-icon) / <alpha-value>)",
            },
            destructive: {
              bg: "hsl(var(--wex-component-alert-destructive-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-alert-destructive-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-alert-destructive-border) / <alpha-value>)",
              icon: "hsl(var(--wex-component-alert-destructive-icon) / <alpha-value>)",
            },
          },
          toast: {
            info: {
              bg: "hsl(var(--wex-component-toast-info-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-toast-info-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-toast-info-border) / <alpha-value>)",
              icon: "hsl(var(--wex-component-toast-info-icon) / <alpha-value>)",
            },
            success: {
              bg: "hsl(var(--wex-component-toast-success-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-toast-success-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-toast-success-border) / <alpha-value>)",
              icon: "hsl(var(--wex-component-toast-success-icon) / <alpha-value>)",
            },
            destructive: {
              bg: "hsl(var(--wex-component-toast-destructive-bg) / <alpha-value>)",
              fg: "hsl(var(--wex-component-toast-destructive-fg) / <alpha-value>)",
              border: "hsl(var(--wex-component-toast-destructive-border) / <alpha-value>)",
              icon: "hsl(var(--wex-component-toast-destructive-icon) / <alpha-value>)",
            },
            "close-hover-bg": "hsl(var(--wex-component-toast-close-hover-bg) / <alpha-value>)",
          },
          tabs: {
            "trigger-fg": "hsl(var(--wex-component-tabs-trigger-fg) / <alpha-value>)",
            "trigger-hover-bg": "hsl(var(--wex-component-tabs-trigger-hover-bg) / <alpha-value>)",
            "trigger-active-fg": "hsl(var(--wex-component-tabs-trigger-active-fg) / <alpha-value>)",
            indicator: "hsl(var(--wex-component-tabs-indicator) / <alpha-value>)",
            divider: "hsl(var(--wex-component-tabs-divider) / <alpha-value>)",
            "focus-ring": "hsl(var(--wex-component-tabs-focus-ring) / <alpha-value>)",
          },
        },
      },
      borderRadius: {
        lg: "calc(var(--radius) + 2px)",
        md: "var(--radius)",
        sm: "calc(var(--radius) - 2px)",
      },
      fontFamily: {
        sans: ["var(--wex-font-sans)"],
        display: ["var(--wex-font-display)"],
      },
      minHeight: {
        target: "var(--wex-min-target)",
      },
      minWidth: {
        target: "var(--wex-min-target)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
