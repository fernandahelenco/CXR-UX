import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { Home, Settings, User, FileText, Mail, Calendar } from "lucide-react";

// Props documentation
const sidebarProps: PropDefinition[] = [
  { name: "side", type: '"left" | "right"', default: '"left"', description: "Which side the sidebar appears" },
  { name: "variant", type: '"sidebar" | "floating" | "inset"', default: '"sidebar"', description: "Visual variant" },
  { name: "collapsible", type: '"offcanvas" | "icon" | "none"', default: '"offcanvas"', description: "Collapse behavior" },
  { name: "defaultOpen", type: "boolean", default: "true", description: "Default open state" },
  { name: "open", type: "boolean", description: "Controlled open state" },
  { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open changes" },
];

// Token mappings for WexSidebar
const sidebarTokens: TokenRow[] = [
  { element: "Container", property: "Background", token: "--sidebar" },
  { element: "Container", property: "Border", token: "--sidebar-border" },
  { element: "Item", property: "Text", token: "--sidebar-foreground" },
  { element: "Item (hover)", property: "Background", token: "--sidebar-accent" },
  { element: "Item (hover)", property: "Text", token: "--sidebar-accent-foreground" },
  { element: "Item (active)", property: "Background", token: "--sidebar-accent" },
  { element: "Focus Ring", property: "Color", token: "--sidebar-ring" },
];

// Note: WexSidebar is shown in code examples; visual demos use semantic classes directly

export default function SidebarPage() {
  return (
    <ComponentPage
      title="Sidebar"
      description="A composable, themeable and collapsible sidebar component."
      status="stable"
      registryKey="sidebar"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="flex h-[400px] w-full border border-border rounded-lg overflow-hidden">
            {/* Sidebar preview container */}
            <div className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col">
              <div className="p-4 border-b border-sidebar-border">
                <span className="font-semibold text-sidebar-foreground">Application</span>
              </div>
              <nav className="flex-1 p-2">
                <ul className="space-y-1">
                  <SidebarItem icon={<Home className="h-4 w-4" />} active>Dashboard</SidebarItem>
                  <SidebarItem icon={<FileText className="h-4 w-4" />}>Documents</SidebarItem>
                  <SidebarItem icon={<User className="h-4 w-4" />}>Users</SidebarItem>
                  <SidebarItem icon={<Calendar className="h-4 w-4" />}>Calendar</SidebarItem>
                  <SidebarItem icon={<Mail className="h-4 w-4" />}>Messages</SidebarItem>
                  <SidebarItem icon={<Settings className="h-4 w-4" />}>Settings</SidebarItem>
                </ul>
              </nav>
            </div>
            {/* Main content area */}
            <div className="flex-1 p-6 bg-background">
              <h2 className="text-lg font-semibold text-foreground">Main Content</h2>
              <p className="text-muted-foreground mt-2">
                This is the main content area. The sidebar on the left provides navigation.
              </p>
            </div>
          </div>
        </ExampleCard>
        <Guidance>
          The Sidebar component provides a collapsible navigation panel with theming support. 
          It uses dedicated tokens (--sidebar-*) that map to WEX surface tokens for consistent theming.
        </Guidance>
      </Section>

      <Section title="With Groups" description="Organize navigation items into groups.">
        <ExampleCard>
          <div className="flex h-[450px] w-full border border-border rounded-lg overflow-hidden">
            <div className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col">
              <div className="p-4 border-b border-sidebar-border">
                <span className="font-semibold text-sidebar-foreground">WEX Portal</span>
              </div>
              <nav className="flex-1 p-2 overflow-auto">
                {/* Group 1 */}
                <div className="mb-4">
                  <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Main
                  </span>
                  <ul className="mt-2 space-y-1">
                    <SidebarItem icon={<Home className="h-4 w-4" />} active>Dashboard</SidebarItem>
                    <SidebarItem icon={<FileText className="h-4 w-4" />}>Reports</SidebarItem>
                  </ul>
                </div>
                {/* Group 2 */}
                <div className="mb-4">
                  <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Management
                  </span>
                  <ul className="mt-2 space-y-1">
                    <SidebarItem icon={<User className="h-4 w-4" />}>Users</SidebarItem>
                    <SidebarItem icon={<Calendar className="h-4 w-4" />}>Schedule</SidebarItem>
                    <SidebarItem icon={<Mail className="h-4 w-4" />}>Messages</SidebarItem>
                  </ul>
                </div>
                {/* Group 3 */}
                <div>
                  <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    System
                  </span>
                  <ul className="mt-2 space-y-1">
                    <SidebarItem icon={<Settings className="h-4 w-4" />}>Settings</SidebarItem>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="flex-1 p-6 bg-background">
              <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
              <p className="text-muted-foreground mt-2">
                Welcome to your dashboard. Navigate using the sidebar groups.
              </p>
            </div>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Token Requirements">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Sidebar Tokens</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>--sidebar-background: Main background color</li>
            <li>--sidebar-foreground: Primary text color</li>
            <li>--sidebar-primary: Accent/brand color</li>
            <li>--sidebar-accent: Hover/active states</li>
            <li>--sidebar-border: Border color</li>
            <li>--sidebar-ring: Focus ring color</li>
          </ul>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WCAG 2.2 Level AA Compliant</h3>
            <p className="text-sm text-muted-foreground">
              This component meets WCAG 2.2 Level AA accessibility requirements.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">ARIA Requirements</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><code className="bg-muted px-1 rounded">role="navigation"</code>: On sidebar nav</li>
              <li>Group labels provide context for menu sections</li>
              <li><code className="bg-muted px-1 rounded">aria-current="page"</code>: On active item</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Navigate between menu items</li>
              <li>Arrow keys: Navigate within groups</li>
              <li>Enter: Activate menu item</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexSidebar } from "@/components/wex";

<WexSidebar>
  <WexSidebar.Content>
    <WexSidebar.Group>
      <WexSidebar.GroupLabel>Application</WexSidebar.GroupLabel>
      <WexSidebar.GroupContent>
        <WexSidebar.Menu>
          <WexSidebar.MenuItem>
            <WexSidebar.MenuButton>Dashboard</WexSidebar.MenuButton>
          </WexSidebar.MenuItem>
        </WexSidebar.Menu>
      </WexSidebar.GroupContent>
    </WexSidebar.Group>
  </WexSidebar.Content>
</WexSidebar>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable 
          props={sidebarProps}
          subComponents={[
            { name: "WexSidebar.Header", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
            { name: "WexSidebar.Content", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
            { name: "WexSidebar.Footer", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
            { name: "WexSidebar.Menu", props: [] },
            { name: "WexSidebar.MenuItem", props: [{ name: "asChild", type: "boolean", default: "false", description: "Merge with child element" }] },
            { name: "WexSidebar.MenuButton", props: [{ name: "isActive", type: "boolean", description: "Active state styling" }, { name: "tooltip", type: "string | TooltipConfig", description: "Tooltip when collapsed" }] },
            { name: "WexSidebar.Trigger", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
          ]}
        />
      </Section>

      <TokenReference tokens={sidebarTokens} className="mt-12" />
    </ComponentPage>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

function SidebarItem({ icon, children, active }: SidebarItemProps) {
  return (
    <li>
      <a
        href="#"
        className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors
          ${active
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          }
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar`}
        aria-current={active ? "page" : undefined}
      >
        {icon}
        {children}
      </a>
    </li>
  );
}
