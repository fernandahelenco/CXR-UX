import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexCard, WexAvatar, WexButton, WexInput, WexLabel, WexSwitch } from "@/components/wex";
import { CreditCard, Settings, User } from "lucide-react";

// Props documentation for WexCard
const cardProps: PropDefinition[] = [
  { name: "variant", type: '"default" | "elevated" | "outlined" | "flat"', default: '"default"', description: "Visual style variant" },
  { name: "className", type: "string", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", required: true, description: "Card content" },
];

// Token mappings for Card
// Layer 3 component tokens
const cardTokens: TokenRow[] = [
  { element: "Container", property: "Background", token: "--wex-component-card-bg" },
  { element: "Container", property: "Text", token: "--wex-component-card-fg" },
  { element: "Container", property: "Border", token: "--wex-component-card-border" },
  { element: "Header/Title", property: "Text", token: "--wex-component-card-header-fg" },
  { element: "Footer", property: "Text", token: "--wex-component-card-footer-fg" },
];

export default function CardPage() {
  return (
    <ComponentPage
      title="Card"
      description="Displays content in a contained container with variant styles: default, elevated, outlined, and flat."
      status="stable"
      registryKey="card"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexCard className="w-full max-w-sm">
            <WexCard.Header>
              <WexCard.Title>Card Title</WexCard.Title>
              <WexCard.Description>Card Description</WexCard.Description>
            </WexCard.Header>
            <WexCard.Content>
              <p>Card content goes here. Use cards to group related information.</p>
            </WexCard.Content>
            <WexCard.Footer>
              <WexButton>Action</WexButton>
            </WexCard.Footer>
          </WexCard>
        </ExampleCard>
        <Guidance>
          Cards are versatile containers for grouping related content. They work 
          well for list items, settings panels, and feature highlights.
        </Guidance>
      </Section>

      {/* ============================================================
          VARIANTS
          ============================================================ */}
      <Section title="Variants" description="Four visual styles for different contexts.">
        <div className="grid gap-6 md:grid-cols-2">
          <ExampleCard title="Default">
            <WexCard variant="default" className="w-full">
              <WexCard.Header>
                <WexCard.Title>Default Card</WexCard.Title>
                <WexCard.Description>Standard card with shadow</WexCard.Description>
              </WexCard.Header>
              <WexCard.Content>
                <p className="text-sm text-muted-foreground">
                  The default card has a subtle shadow for elevation.
                </p>
              </WexCard.Content>
            </WexCard>
          </ExampleCard>

          <ExampleCard title="Elevated">
            <WexCard variant="elevated" className="w-full">
              <WexCard.Header>
                <WexCard.Title>Elevated Card</WexCard.Title>
                <WexCard.Description>Card with stronger shadow</WexCard.Description>
              </WexCard.Header>
              <WexCard.Content>
                <p className="text-sm text-muted-foreground">
                  Elevated cards have a more prominent shadow for emphasis.
                </p>
              </WexCard.Content>
            </WexCard>
          </ExampleCard>

          <ExampleCard title="Outlined">
            <WexCard variant="outlined" className="w-full">
              <WexCard.Header>
                <WexCard.Title>Outlined Card</WexCard.Title>
                <WexCard.Description>Card with border, no shadow</WexCard.Description>
              </WexCard.Header>
              <WexCard.Content>
                <p className="text-sm text-muted-foreground">
                  Outlined cards have a visible border without shadow.
                </p>
              </WexCard.Content>
            </WexCard>
          </ExampleCard>

          <ExampleCard title="Flat">
            <WexCard variant="flat" className="w-full">
              <WexCard.Header>
                <WexCard.Title>Flat Card</WexCard.Title>
                <WexCard.Description>Card without border or shadow</WexCard.Description>
              </WexCard.Header>
              <WexCard.Content>
                <p className="text-sm text-muted-foreground">
                  Flat cards blend into the background, no border or shadow.
                </p>
              </WexCard.Content>
            </WexCard>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          USE CASES
          ============================================================ */}
      <Section title="Use Cases" description="Common card patterns.">
        <div className="grid gap-6 md:grid-cols-2">
          <ExampleCard title="Form Card">
            <WexCard variant="elevated" className="w-full max-w-sm">
              <WexCard.Header>
                <WexCard.Title>Create Account</WexCard.Title>
                <WexCard.Description>Enter your details to create an account.</WexCard.Description>
              </WexCard.Header>
              <WexCard.Content className="space-y-4">
                <div className="space-y-2">
                  <WexLabel htmlFor="email">Email</WexLabel>
                  <WexInput id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="space-y-2">
                  <WexLabel htmlFor="password">Password</WexLabel>
                  <WexInput id="password" type="password" />
                </div>
              </WexCard.Content>
              <WexCard.Footer>
                <WexButton className="w-full">Create Account</WexButton>
              </WexCard.Footer>
            </WexCard>
          </ExampleCard>

          <ExampleCard title="Settings Card">
            <WexCard variant="outlined" className="w-full max-w-sm">
              <WexCard.Header>
                <WexCard.Title>Notifications</WexCard.Title>
                <WexCard.Description>Manage your notification preferences.</WexCard.Description>
              </WexCard.Header>
              <WexCard.Content className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <WexLabel htmlFor="email-notifications">Email notifications</WexLabel>
                    <p className="text-sm text-muted-foreground">Receive emails about activity.</p>
                  </div>
                  <WexSwitch id="email-notifications" defaultChecked aria-label="Email notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <WexLabel htmlFor="push-notifications">Push notifications</WexLabel>
                    <p className="text-sm text-muted-foreground">Receive push notifications.</p>
                  </div>
                  <WexSwitch id="push-notifications" aria-label="Push notifications" />
                </div>
              </WexCard.Content>
            </WexCard>
          </ExampleCard>

          <ExampleCard title="User Profile Card">
            <WexCard className="w-full max-w-sm">
              <WexCard.Header>
                <div className="flex items-center gap-4">
                  <WexAvatar>
                    <WexAvatar.Fallback>JD</WexAvatar.Fallback>
                  </WexAvatar>
                  <div>
                    <WexCard.Title>John Doe</WexCard.Title>
                    <WexCard.Description>@johndoe</WexCard.Description>
                  </div>
                </div>
              </WexCard.Header>
              <WexCard.Content>
                <p className="text-sm text-muted-foreground">
                  Software engineer at WEX. Building great products.
                </p>
              </WexCard.Content>
              <WexCard.Footer className="flex gap-2">
                <WexButton intent="outline" size="sm">Message</WexButton>
                <WexButton size="sm">Follow</WexButton>
              </WexCard.Footer>
            </WexCard>
          </ExampleCard>

          <ExampleCard title="Stats Card">
            <WexCard variant="elevated" className="w-full max-w-sm">
              <WexCard.Header className="pb-2">
                <WexCard.Description>Total Revenue</WexCard.Description>
                <WexCard.Title className="text-3xl">$45,231.89</WexCard.Title>
              </WexCard.Header>
              <WexCard.Content>
                <p className="text-xs text-muted-foreground">
                  <span className="text-wex-text-success">+20.1%</span> from last month
                </p>
              </WexCard.Content>
            </WexCard>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          CARD GRID
          ============================================================ */}
      <Section title="Card Grid" description="Multiple cards in a grid layout.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: User, title: "Account", description: "Manage your account settings" },
            { icon: CreditCard, title: "Billing", description: "View billing information" },
            { icon: Settings, title: "Settings", description: "Configure preferences" },
          ].map((item) => (
            <WexCard 
              key={item.title} 
              variant="outlined"
              className="cursor-pointer hover:bg-accent/50 transition-colors"
            >
              <WexCard.Header>
                <item.icon className="h-8 w-8 text-primary mb-2" />
                <WexCard.Title className="text-lg">{item.title}</WexCard.Title>
                <WexCard.Description>{item.description}</WexCard.Description>
              </WexCard.Header>
            </WexCard>
          ))}
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Semantic Structure</h3>
          <p className="text-sm text-muted-foreground">
            Cards use div elements by default. For interactive cards, wrap the 
            Card in a button or anchor tag, or make the card itself focusable.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexCard } from "@/components/wex";

// With variants
<WexCard variant="default">...</WexCard>    {/* default */}
<WexCard variant="elevated">...</WexCard>   {/* stronger shadow */}
<WexCard variant="outlined">...</WexCard>   {/* border, no shadow */}
<WexCard variant="flat">...</WexCard>       {/* no border or shadow */}

// Full card structure
<WexCard variant="elevated">
  <WexCard.Header>
    <WexCard.Title>Title</WexCard.Title>
    <WexCard.Description>Description</WexCard.Description>
  </WexCard.Header>
  <WexCard.Content>
    Content goes here
  </WexCard.Content>
  <WexCard.Footer>
    <Button>Action</Button>
  </WexCard.Footer>
</WexCard>

// Interactive card
<WexCard 
  variant="outlined"
  className="cursor-pointer hover:bg-accent/50 transition-colors"
>
  ...
</WexCard>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={cardProps} />
      </Section>

      <TokenReference tokens={cardTokens} className="mt-12" />
    </ComponentPage>
  );
}
