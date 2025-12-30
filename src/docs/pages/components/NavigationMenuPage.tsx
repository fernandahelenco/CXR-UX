import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexNavigationMenu, wexNavigationMenuTriggerStyle } from "@/components/wex";
import { cn } from "@/lib/utils";

// Props documentation
const navigationMenuRootProps: PropDefinition[] = [
  { name: "value", type: "string", description: "Controlled active item" },
  { name: "defaultValue", type: "string", description: "Default active item" },
  { name: "onValueChange", type: "(value: string) => void", description: "Callback when active changes" },
  { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction" },
];

const navigationMenuLinkProps: PropDefinition[] = [
  { name: "active", type: "boolean", default: "false", description: "Active state styling" },
  { name: "asChild", type: "boolean", default: "false", description: "Merge with child element" },
];

// Token mappings for WexNavigationMenu
// Layer 3 component tokens
const navigationMenuTokens: TokenRow[] = [
  { element: "Trigger (Hover)", property: "Background", token: "--wex-component-navmenu-trigger-hover-bg" },
  { element: "Trigger (Focus)", property: "Background", token: "--wex-component-navmenu-trigger-focus-bg" },
  { element: "Content", property: "Background", token: "--wex-component-navmenu-content-bg" },
  { element: "Link (Hover)", property: "Background", token: "--wex-component-navmenu-link-hover-bg" },
  { element: "Indicator", property: "Color", token: "--wex-component-navmenu-indicator" },
];

export default function NavigationMenuPage() {
  return (
    <ComponentPage
      title="Navigation Menu"
      description="A collection of links for navigating websites."
      status="stable"
      registryKey="navigation-menu"
    >
      <Section title="Overview">
        {/* Custom container that allows dropdown overflow */}
        <div className="rounded-lg border border-border bg-card p-6 min-h-[320px]">
          <WexNavigationMenu>
            <WexNavigationMenu.List>
              <WexNavigationMenu.Item>
                <WexNavigationMenu.Trigger>Getting Started</WexNavigationMenu.Trigger>
                <WexNavigationMenu.Content>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <WexNavigationMenu.Link asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">WEX Design System</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with Radix UI and Tailwind CSS.
                          </p>
                        </a>
                      </WexNavigationMenu.Link>
                    </li>
                    <ListItem href="#" title="Introduction">
                      Learn about the WEX design system foundations.
                    </ListItem>
                    <ListItem href="#" title="Installation">
                      How to install and configure the design system.
                    </ListItem>
                    <ListItem href="#" title="Typography">
                      Styles for headings, paragraphs, lists, and more.
                    </ListItem>
                  </ul>
                </WexNavigationMenu.Content>
              </WexNavigationMenu.Item>
              <WexNavigationMenu.Item>
                <WexNavigationMenu.Trigger>Components</WexNavigationMenu.Trigger>
                <WexNavigationMenu.Content>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <ListItem key={component.title} title={component.title} href={component.href}>
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </WexNavigationMenu.Content>
              </WexNavigationMenu.Item>
              <WexNavigationMenu.Item>
                <WexNavigationMenu.Link href="#" className={wexNavigationMenuTriggerStyle()}>
                  Documentation
                </WexNavigationMenu.Link>
              </WexNavigationMenu.Item>
            </WexNavigationMenu.List>
          </WexNavigationMenu>
        </div>
        <Guidance>
          Navigation Menu provides a horizontal navigation component with dropdown
          support for complex site structures. Click on the menu triggers to see the
          dropdown content. The menu supports keyboard navigation and focus management.
        </Guidance>
      </Section>

      <Section title="Simple Navigation" description="A simpler navigation without dropdowns.">
        <ExampleCard>
          <WexNavigationMenu>
            <WexNavigationMenu.List>
              <WexNavigationMenu.Item>
                <WexNavigationMenu.Link href="#" className={wexNavigationMenuTriggerStyle()}>
                  Home
                </WexNavigationMenu.Link>
              </WexNavigationMenu.Item>
              <WexNavigationMenu.Item>
                <WexNavigationMenu.Link href="#" className={wexNavigationMenuTriggerStyle()}>
                  About
                </WexNavigationMenu.Link>
              </WexNavigationMenu.Item>
              <WexNavigationMenu.Item>
                <WexNavigationMenu.Link href="#" className={wexNavigationMenuTriggerStyle()}>
                  Services
                </WexNavigationMenu.Link>
              </WexNavigationMenu.Item>
              <WexNavigationMenu.Item>
                <WexNavigationMenu.Link href="#" className={wexNavigationMenuTriggerStyle()}>
                  Contact
                </WexNavigationMenu.Link>
              </WexNavigationMenu.Item>
            </WexNavigationMenu.List>
          </WexNavigationMenu>
        </ExampleCard>
      </Section>

      <Section title="States" description="Interactive states of navigation items.">
        <div className="space-y-4">
          <ExampleCard 
            title="Focus State" 
            description="Tab through the navigation items to see the focus ring."
          >
            <WexNavigationMenu>
              <WexNavigationMenu.List>
                <WexNavigationMenu.Item>
                  <WexNavigationMenu.Link href="#" className={wexNavigationMenuTriggerStyle()}>
                    First Item
                  </WexNavigationMenu.Link>
                </WexNavigationMenu.Item>
                <WexNavigationMenu.Item>
                  <WexNavigationMenu.Link href="#" className={wexNavigationMenuTriggerStyle()}>
                    Second Item
                  </WexNavigationMenu.Link>
                </WexNavigationMenu.Item>
                <WexNavigationMenu.Item>
                  <WexNavigationMenu.Link href="#" className={wexNavigationMenuTriggerStyle()}>
                    Third Item
                  </WexNavigationMenu.Link>
                </WexNavigationMenu.Item>
              </WexNavigationMenu.List>
            </WexNavigationMenu>
          </ExampleCard>
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
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Focus navigation items</li>
              <li>Arrow keys: Navigate between items</li>
              <li>Enter or Space: Open dropdown or activate link</li>
              <li>Escape: Close dropdown</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">ARIA Roles</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><code className="bg-muted px-1 rounded">role="navigation"</code>: On container</li>
              <li>Proper link semantics for navigation items</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexNavigationMenu, wexNavigationMenuTriggerStyle } from "@/components/wex";

<WexNavigationMenu>
  <WexNavigationMenu.List>
    <WexNavigationMenu.Item>
      <WexNavigationMenu.Trigger>Getting Started</WexNavigationMenu.Trigger>
      <WexNavigationMenu.Content>
        <WexNavigationMenu.Link href="/docs">Documentation</WexNavigationMenu.Link>
      </WexNavigationMenu.Content>
    </WexNavigationMenu.Item>
    <WexNavigationMenu.Item>
      <WexNavigationMenu.Link href="/about" className={wexNavigationMenuTriggerStyle()}>
        About
      </WexNavigationMenu.Link>
    </WexNavigationMenu.Item>
  </WexNavigationMenu.List>
</WexNavigationMenu>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable 
          props={navigationMenuRootProps}
          subComponents={[
            { name: "WexNavigationMenu.List", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
            { name: "WexNavigationMenu.Item", props: [{ name: "value", type: "string", description: "Unique value for controlled mode" }] },
            { name: "WexNavigationMenu.Trigger", props: [{ name: "className", type: "string", description: "Additional CSS classes" }] },
            { name: "WexNavigationMenu.Content", props: [{ name: "forceMount", type: "boolean", description: "Force mount for animation" }] },
            { name: "WexNavigationMenu.Link", props: navigationMenuLinkProps },
            { name: "WexNavigationMenu.Viewport", props: [] },
            { name: "WexNavigationMenu.Indicator", props: [] },
          ]}
        />
      </Section>

      <TokenReference tokens={navigationMenuTokens} className="mt-12" />
    </ComponentPage>
  );
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description: "A modal dialog that interrupts the user with important content.",
  },
  {
    title: "Button",
    href: "#",
    description: "Displays a button or a component that looks like a button.",
  },
  {
    title: "Card",
    href: "#",
    description: "Displays a card with header, content, and footer.",
  },
  {
    title: "Dialog",
    href: "#",
    description: "A window overlaid on the primary window.",
  },
  {
    title: "Progress",
    href: "#",
    description: "Displays an indicator showing completion progress.",
  },
  {
    title: "Tabs",
    href: "#",
    description: "A set of layered sections of content.",
  },
];

interface ListItemProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}

function ListItem({ className, title, children, href }: ListItemProps) {
  return (
    <li>
      <WexNavigationMenu.Link asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </WexNavigationMenu.Link>
    </li>
  );
}
