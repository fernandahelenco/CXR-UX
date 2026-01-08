import type { FoundationRegistryEntry } from "./types";

/**
 * Foundation registry - drives navigation for design foundations
 */
export const foundationRegistry: FoundationRegistryEntry[] = [
  {
    name: "Design Tokens",
    route: "/foundations/token-architecture",
    importPath: "@/docs/pages/foundations/TokenArchitecturePage",
    description: "4-layer token architecture and component slots",
  },
  {
    name: "Colors",
    route: "/foundations/colors",
    importPath: "@/docs/pages/foundations/ColorsPage",
    description: "Color palette and semantic usage",
  },
  {
    name: "Typography",
    route: "/foundations/typography",
    importPath: "@/docs/pages/foundations/TypographyPage",
    description: "Font families and type scale",
  },
  {
    name: "Spacing",
    route: "/foundations/spacing",
    importPath: "@/docs/pages/foundations/SpacingPage",
    description: "Spacing scale and layout",
  },
  {
    name: "Elevation",
    route: "/foundations/elevation",
    importPath: "@/docs/pages/foundations/ElevationPage",
    description: "Shadow and layering system",
  },
  {
    name: "Icons",
    route: "/foundations/icons",
    importPath: "@/docs/pages/foundations/IconsPage",
    description: "Browse and search all available Lucide React icons",
  },
  {
    name: "Prime Parity",
    route: "/foundations/primeng-parity",
    importPath: "@/docs/pages/foundations/PrimeNGParityPage",
    description: "Component comparison with PrimeNG",
  },
];

