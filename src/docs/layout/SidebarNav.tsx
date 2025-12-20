import { DocsNavLink } from "@/docs/components/NavLink";
import { componentRegistry } from "@/docs/registry/components";
import { foundationRegistry } from "@/docs/registry/foundations";

/**
 * Navigation sections rendered from registries
 * 
 * 3-Level Hierarchy:
 * - Level 1: Section headers (OVERVIEW, FOUNDATIONS, COMPONENTS, RESOURCES)
 * - Level 2: Index/group pages (Home, Getting Started, Changelog)
 * - Level 3: Component/foundation pages (Button, Input, Colors, etc.)
 * 
 * Status badges are NOT shown in navigation - they appear on component pages.
 */
export function SidebarNav() {
  return (
    <div className="space-y-6">
      {/* Overview Section - Level 2 pages */}
      <NavSection title="Overview">
        <DocsNavLink to="/" level={2}>Home</DocsNavLink>
        <DocsNavLink to="/getting-started" level={2}>Getting Started</DocsNavLink>
      </NavSection>

      {/* Foundations Section - Level 3 pages */}
      <NavSection title="Foundations">
        {foundationRegistry.map((item) => (
          <DocsNavLink key={item.route} to={item.route} level={3}>
            {item.name}
          </DocsNavLink>
        ))}
      </NavSection>

      {/* Components Section - Level 3 pages */}
      <NavSection title="Components">
        {componentRegistry.map((item) => (
          <DocsNavLink key={item.route} to={item.route} level={3}>
            {item.name}
          </DocsNavLink>
        ))}
      </NavSection>

      {/* Resources Section - Level 2 pages */}
      <NavSection title="Resources">
        <DocsNavLink to="/accessibility" level={2}>Accessibility</DocsNavLink>
        <DocsNavLink to="/changelog" level={2}>Changelog</DocsNavLink>
      </NavSection>
    </div>
  );
}

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Level 1 - Section header
 * Styled as uppercase, smaller text, with clear visual separation
 */
function NavSection({ title, children }: NavSectionProps) {
  return (
    <div>
      <h2 className="mb-3 mt-6 first:mt-0 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}
