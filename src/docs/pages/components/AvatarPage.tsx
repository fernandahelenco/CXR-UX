import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import { WexAvatar } from "@/components/wex";

// Props documentation
const avatarRootProps: PropDefinition[] = [
  { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"', default: '"md"', description: "Avatar size" },
  { name: "shape", type: '"circle" | "rounded" | "square"', default: '"circle"', description: "Avatar shape" },
  { name: "status", type: '"online" | "offline" | "busy" | "away"', description: "Status badge indicator" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

const avatarImageProps: PropDefinition[] = [
  { name: "src", type: "string", required: true, description: "Image source URL" },
  { name: "alt", type: "string", required: true, description: "Alternative text for accessibility" },
];

// Token mappings for Avatar
const avatarTokens: TokenRow[] = [
  { element: "Container", property: "Background", token: "--muted" },
  { element: "Fallback", property: "Text", token: "--muted-foreground" },
  { element: "Badge (online)", property: "Background", token: "bg-green-500" },
  { element: "Badge (offline)", property: "Background", token: "bg-gray-400" },
  { element: "Badge (busy)", property: "Background", token: "bg-red-500" },
  { element: "Badge (away)", property: "Background", token: "bg-yellow-500" },
];

export default function AvatarPage() {
  return (
    <ComponentPage
      title="Avatar"
      description="Image element with fallback for representing a user. Supports sizes, shapes, grouping, and status badges."
      status="stable"
      registryKey="avatar"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="flex items-center gap-4">
            <WexAvatar>
              <WexAvatar.Image src="https://github.com/shadcn.png" alt="User avatar" />
              <WexAvatar.Fallback>CN</WexAvatar.Fallback>
            </WexAvatar>
            <WexAvatar>
              <WexAvatar.Fallback>JD</WexAvatar.Fallback>
            </WexAvatar>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Avatar comes in 6 sizes: xs, sm, md (default), lg, xl, and 2xl.">
        <ExampleCard title="All Sizes">
          <div className="flex items-end gap-4">
            <div className="text-center">
              <WexAvatar size="xs">
                <WexAvatar.Fallback>XS</WexAvatar.Fallback>
              </WexAvatar>
              <p className="text-xs text-muted-foreground mt-1">xs</p>
            </div>
            <div className="text-center">
              <WexAvatar size="sm">
                <WexAvatar.Fallback>SM</WexAvatar.Fallback>
              </WexAvatar>
              <p className="text-xs text-muted-foreground mt-1">sm</p>
            </div>
            <div className="text-center">
              <WexAvatar size="md">
                <WexAvatar.Fallback>MD</WexAvatar.Fallback>
              </WexAvatar>
              <p className="text-xs text-muted-foreground mt-1">md</p>
            </div>
            <div className="text-center">
              <WexAvatar size="lg">
                <WexAvatar.Fallback>LG</WexAvatar.Fallback>
              </WexAvatar>
              <p className="text-xs text-muted-foreground mt-1">lg</p>
            </div>
            <div className="text-center">
              <WexAvatar size="xl">
                <WexAvatar.Fallback>XL</WexAvatar.Fallback>
              </WexAvatar>
              <p className="text-xs text-muted-foreground mt-1">xl</p>
            </div>
            <div className="text-center">
              <WexAvatar size="2xl">
                <WexAvatar.Fallback>2XL</WexAvatar.Fallback>
              </WexAvatar>
              <p className="text-xs text-muted-foreground mt-1">2xl</p>
            </div>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          SHAPES
          ============================================================ */}
      <Section title="Shapes" description="Avatar supports circle (default) and square shapes.">
        <ExampleCard title="Circle vs Square">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <WexAvatar size="xl" shape="circle">
                <WexAvatar.Image src="https://github.com/shadcn.png" alt="Circle avatar" />
                <WexAvatar.Fallback>CN</WexAvatar.Fallback>
              </WexAvatar>
              <p className="text-sm text-muted-foreground mt-2">Circle</p>
            </div>
            <div className="text-center">
              <WexAvatar size="xl" shape="square">
                <WexAvatar.Image src="https://github.com/shadcn.png" alt="Square avatar" />
                <WexAvatar.Fallback>CN</WexAvatar.Fallback>
              </WexAvatar>
              <p className="text-sm text-muted-foreground mt-2">Square</p>
            </div>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          AVATAR GROUP
          ============================================================ */}
      <Section title="Avatar Group" description="Stack multiple avatars with overflow indicator.">
        <ExampleCard title="Grouped Avatars">
          <WexAvatar.Group max={4} size="lg">
            <WexAvatar size="lg">
              <WexAvatar.Image src="https://i.pravatar.cc/150?img=1" alt="User 1" />
              <WexAvatar.Fallback>U1</WexAvatar.Fallback>
            </WexAvatar>
            <WexAvatar size="lg">
              <WexAvatar.Image src="https://i.pravatar.cc/150?img=2" alt="User 2" />
              <WexAvatar.Fallback>U2</WexAvatar.Fallback>
            </WexAvatar>
            <WexAvatar size="lg">
              <WexAvatar.Image src="https://i.pravatar.cc/150?img=3" alt="User 3" />
              <WexAvatar.Fallback>U3</WexAvatar.Fallback>
            </WexAvatar>
            <WexAvatar size="lg">
              <WexAvatar.Image src="https://i.pravatar.cc/150?img=4" alt="User 4" />
              <WexAvatar.Fallback>U4</WexAvatar.Fallback>
            </WexAvatar>
            <WexAvatar size="lg">
              <WexAvatar.Image src="https://i.pravatar.cc/150?img=5" alt="User 5" />
              <WexAvatar.Fallback>U5</WexAvatar.Fallback>
            </WexAvatar>
            <WexAvatar size="lg">
              <WexAvatar.Image src="https://i.pravatar.cc/150?img=6" alt="User 6" />
              <WexAvatar.Fallback>U6</WexAvatar.Fallback>
            </WexAvatar>
          </WexAvatar.Group>
        </ExampleCard>

        <ExampleCard title="Different Group Sizes">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Small</p>
              <WexAvatar.Group max={3} size="sm">
                <WexAvatar size="sm"><WexAvatar.Fallback>A</WexAvatar.Fallback></WexAvatar>
                <WexAvatar size="sm"><WexAvatar.Fallback>B</WexAvatar.Fallback></WexAvatar>
                <WexAvatar size="sm"><WexAvatar.Fallback>C</WexAvatar.Fallback></WexAvatar>
                <WexAvatar size="sm"><WexAvatar.Fallback>D</WexAvatar.Fallback></WexAvatar>
              </WexAvatar.Group>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Large</p>
              <WexAvatar.Group max={3} size="lg">
                <WexAvatar size="lg"><WexAvatar.Fallback>A</WexAvatar.Fallback></WexAvatar>
                <WexAvatar size="lg"><WexAvatar.Fallback>B</WexAvatar.Fallback></WexAvatar>
                <WexAvatar size="lg"><WexAvatar.Fallback>C</WexAvatar.Fallback></WexAvatar>
                <WexAvatar size="lg"><WexAvatar.Fallback>D</WexAvatar.Fallback></WexAvatar>
              </WexAvatar.Group>
            </div>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          STATUS BADGE
          ============================================================ */}
      <Section title="Status Badge" description="Add status indicators to avatars.">
        <ExampleCard title="Status Indicators">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <WexAvatar size="lg">
                <WexAvatar.Image src="https://i.pravatar.cc/150?img=10" alt="Online user" />
                <WexAvatar.Fallback>ON</WexAvatar.Fallback>
                <WexAvatar.Badge status="online" size="lg" />
              </WexAvatar>
              <p className="text-sm text-muted-foreground mt-2">Online</p>
            </div>
            <div className="text-center">
              <WexAvatar size="lg">
                <WexAvatar.Image src="https://i.pravatar.cc/150?img=11" alt="Away user" />
                <WexAvatar.Fallback>AW</WexAvatar.Fallback>
                <WexAvatar.Badge status="away" size="lg" />
              </WexAvatar>
              <p className="text-sm text-muted-foreground mt-2">Away</p>
            </div>
            <div className="text-center">
              <WexAvatar size="lg">
                <WexAvatar.Image src="https://i.pravatar.cc/150?img=12" alt="Busy user" />
                <WexAvatar.Fallback>BY</WexAvatar.Fallback>
                <WexAvatar.Badge status="busy" size="lg" />
              </WexAvatar>
              <p className="text-sm text-muted-foreground mt-2">Busy</p>
            </div>
            <div className="text-center">
              <WexAvatar size="lg">
                <WexAvatar.Image src="https://i.pravatar.cc/150?img=13" alt="Offline user" />
                <WexAvatar.Fallback>OF</WexAvatar.Fallback>
                <WexAvatar.Badge status="offline" size="lg" />
              </WexAvatar>
              <p className="text-sm text-muted-foreground mt-2">Offline</p>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Badge Positions">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <WexAvatar size="xl">
                <WexAvatar.Fallback>BR</WexAvatar.Fallback>
                <WexAvatar.Badge status="online" size="xl" position="bottom-right" />
              </WexAvatar>
              <p className="text-xs text-muted-foreground mt-1">bottom-right</p>
            </div>
            <div className="text-center">
              <WexAvatar size="xl">
                <WexAvatar.Fallback>BL</WexAvatar.Fallback>
                <WexAvatar.Badge status="online" size="xl" position="bottom-left" />
              </WexAvatar>
              <p className="text-xs text-muted-foreground mt-1">bottom-left</p>
            </div>
            <div className="text-center">
              <WexAvatar size="xl">
                <WexAvatar.Fallback>TR</WexAvatar.Fallback>
                <WexAvatar.Badge status="online" size="xl" position="top-right" />
              </WexAvatar>
              <p className="text-xs text-muted-foreground mt-1">top-right</p>
            </div>
            <div className="text-center">
              <WexAvatar size="xl">
                <WexAvatar.Fallback>TL</WexAvatar.Fallback>
                <WexAvatar.Badge status="online" size="xl" position="top-left" />
              </WexAvatar>
              <p className="text-xs text-muted-foreground mt-1">top-left</p>
            </div>
          </div>
        </ExampleCard>
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
              <li><code className="bg-muted px-1 rounded">alt</code>: Required on WexAvatar.Image for screen readers</li>
              <li>Fallback text provides meaningful identification when image fails to load</li>
              <li>Status badges should have aria-label describing the status</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexAvatar } from "@/components/wex";

// Basic with sizes
<WexAvatar size="lg">
  <WexAvatar.Image src="/avatar.png" alt="User" />
  <WexAvatar.Fallback>JD</WexAvatar.Fallback>
</WexAvatar>

// Square shape
<WexAvatar size="xl" shape="square">
  <WexAvatar.Fallback>SQ</WexAvatar.Fallback>
</WexAvatar>

// With status badge
<WexAvatar size="lg">
  <WexAvatar.Image src="/avatar.png" alt="User" />
  <WexAvatar.Fallback>JD</WexAvatar.Fallback>
  <WexAvatar.Badge status="online" />
</WexAvatar>

// Grouped avatars
<WexAvatar.Group max={3} size="md">
  <WexAvatar><WexAvatar.Fallback>A</WexAvatar.Fallback></WexAvatar>
  <WexAvatar><WexAvatar.Fallback>B</WexAvatar.Fallback></WexAvatar>
  <WexAvatar><WexAvatar.Fallback>C</WexAvatar.Fallback></WexAvatar>
  <WexAvatar><WexAvatar.Fallback>D</WexAvatar.Fallback></WexAvatar>
</WexAvatar.Group>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={avatarRootProps} title="WexAvatar" />
        <SubComponentProps name="WexAvatar.Image" props={avatarImageProps} />
      </Section>

      <TokenReference tokens={avatarTokens} className="mt-12" />
    </ComponentPage>
  );
}
