import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { WexButton, WexInput, WexLabel, WexSwitch } from "@/components/wex";
import { CreditCard, Settings, User } from "lucide-react";

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
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here. Use cards to group related information.</p>
            </CardContent>
            <CardFooter>
              <WexButton>Action</WexButton>
            </CardFooter>
          </Card>
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
            <Card variant="default" className="w-full">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard card with shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The default card has a subtle shadow for elevation.
                </p>
              </CardContent>
            </Card>
          </ExampleCard>

          <ExampleCard title="Elevated">
            <Card variant="elevated" className="w-full">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Card with stronger shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Elevated cards have a more prominent shadow for emphasis.
                </p>
              </CardContent>
            </Card>
          </ExampleCard>

          <ExampleCard title="Outlined">
            <Card variant="outlined" className="w-full">
              <CardHeader>
                <CardTitle>Outlined Card</CardTitle>
                <CardDescription>Card with border, no shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Outlined cards have a visible border without shadow.
                </p>
              </CardContent>
            </Card>
          </ExampleCard>

          <ExampleCard title="Flat">
            <Card variant="flat" className="w-full">
              <CardHeader>
                <CardTitle>Flat Card</CardTitle>
                <CardDescription>Card without border or shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Flat cards blend into the background, no border or shadow.
                </p>
              </CardContent>
            </Card>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          USE CASES
          ============================================================ */}
      <Section title="Use Cases" description="Common card patterns.">
        <div className="grid gap-6 md:grid-cols-2">
          <ExampleCard title="Form Card">
            <Card variant="elevated" className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Enter your details to create an account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <WexLabel htmlFor="email">Email</WexLabel>
                  <WexInput id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="space-y-2">
                  <WexLabel htmlFor="password">Password</WexLabel>
                  <WexInput id="password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <WexButton className="w-full">Create Account</WexButton>
              </CardFooter>
            </Card>
          </ExampleCard>

          <ExampleCard title="Settings Card">
            <Card variant="outlined" className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage your notification preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <WexLabel>Email notifications</WexLabel>
                    <p className="text-sm text-muted-foreground">Receive emails about activity.</p>
                  </div>
                  <WexSwitch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <WexLabel>Push notifications</WexLabel>
                    <p className="text-sm text-muted-foreground">Receive push notifications.</p>
                  </div>
                  <WexSwitch />
                </div>
              </CardContent>
            </Card>
          </ExampleCard>

          <ExampleCard title="User Profile Card">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>John Doe</CardTitle>
                    <CardDescription>@johndoe</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Software engineer at WEX. Building great products.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <WexButton intent="outline" size="sm">Message</WexButton>
                <WexButton size="sm">Follow</WexButton>
              </CardFooter>
            </Card>
          </ExampleCard>

          <ExampleCard title="Stats Card">
            <Card variant="elevated" className="w-full max-w-sm">
              <CardHeader className="pb-2">
                <CardDescription>Total Revenue</CardDescription>
                <CardTitle className="text-3xl">$45,231.89</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+20.1%</span> from last month
                </p>
              </CardContent>
            </Card>
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
            <Card 
              key={item.title} 
              variant="outlined"
              className="cursor-pointer hover:bg-accent/50 transition-colors"
            >
              <CardHeader>
                <item.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
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
          code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

// With variants
<Card variant="default">...</Card>    {/* default */}
<Card variant="elevated">...</Card>   {/* stronger shadow */}
<Card variant="outlined">...</Card>   {/* border, no shadow */}
<Card variant="flat">...</Card>       {/* no border or shadow */}

// Full card structure
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Interactive card
<Card 
  variant="outlined"
  className="cursor-pointer hover:bg-accent/50 transition-colors"
>
  ...
</Card>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Card Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">variant</code>: "default" | "elevated" | "outlined" | "flat"</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={cardTokens} className="mt-12" />
    </ComponentPage>
  );
}
