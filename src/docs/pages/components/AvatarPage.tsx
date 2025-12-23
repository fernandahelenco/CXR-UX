import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarBadge } from "@/components/ui/avatar";

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
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
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
              <Avatar size="xs">
                <AvatarFallback>XS</AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground mt-1">xs</p>
            </div>
            <div className="text-center">
              <Avatar size="sm">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground mt-1">sm</p>
            </div>
            <div className="text-center">
              <Avatar size="md">
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground mt-1">md</p>
            </div>
            <div className="text-center">
              <Avatar size="lg">
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground mt-1">lg</p>
            </div>
            <div className="text-center">
              <Avatar size="xl">
                <AvatarFallback>XL</AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground mt-1">xl</p>
            </div>
            <div className="text-center">
              <Avatar size="2xl">
                <AvatarFallback>2XL</AvatarFallback>
              </Avatar>
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
              <Avatar size="xl" shape="circle">
                <AvatarImage src="https://github.com/shadcn.png" alt="Circle avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm text-muted-foreground mt-2">Circle</p>
            </div>
            <div className="text-center">
              <Avatar size="xl" shape="square">
                <AvatarImage src="https://github.com/shadcn.png" alt="Square avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
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
          <AvatarGroup max={4} size="lg">
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User 1" />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User 2" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User 3" />
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/150?img=4" alt="User 4" />
              <AvatarFallback>U4</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="User 5" />
              <AvatarFallback>U5</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/150?img=6" alt="User 6" />
              <AvatarFallback>U6</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </ExampleCard>

        <ExampleCard title="Different Group Sizes">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Small</p>
              <AvatarGroup max={3} size="sm">
                <Avatar size="sm"><AvatarFallback>A</AvatarFallback></Avatar>
                <Avatar size="sm"><AvatarFallback>B</AvatarFallback></Avatar>
                <Avatar size="sm"><AvatarFallback>C</AvatarFallback></Avatar>
                <Avatar size="sm"><AvatarFallback>D</AvatarFallback></Avatar>
              </AvatarGroup>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Large</p>
              <AvatarGroup max={3} size="lg">
                <Avatar size="lg"><AvatarFallback>A</AvatarFallback></Avatar>
                <Avatar size="lg"><AvatarFallback>B</AvatarFallback></Avatar>
                <Avatar size="lg"><AvatarFallback>C</AvatarFallback></Avatar>
                <Avatar size="lg"><AvatarFallback>D</AvatarFallback></Avatar>
              </AvatarGroup>
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
              <Avatar size="lg">
                <AvatarImage src="https://i.pravatar.cc/150?img=10" alt="Online user" />
                <AvatarFallback>ON</AvatarFallback>
                <AvatarBadge status="online" size="lg" />
              </Avatar>
              <p className="text-sm text-muted-foreground mt-2">Online</p>
            </div>
            <div className="text-center">
              <Avatar size="lg">
                <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="Away user" />
                <AvatarFallback>AW</AvatarFallback>
                <AvatarBadge status="away" size="lg" />
              </Avatar>
              <p className="text-sm text-muted-foreground mt-2">Away</p>
            </div>
            <div className="text-center">
              <Avatar size="lg">
                <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Busy user" />
                <AvatarFallback>BY</AvatarFallback>
                <AvatarBadge status="busy" size="lg" />
              </Avatar>
              <p className="text-sm text-muted-foreground mt-2">Busy</p>
            </div>
            <div className="text-center">
              <Avatar size="lg">
                <AvatarImage src="https://i.pravatar.cc/150?img=13" alt="Offline user" />
                <AvatarFallback>OF</AvatarFallback>
                <AvatarBadge status="offline" size="lg" />
              </Avatar>
              <p className="text-sm text-muted-foreground mt-2">Offline</p>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Badge Positions">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <Avatar size="xl">
                <AvatarFallback>BR</AvatarFallback>
                <AvatarBadge status="online" size="xl" position="bottom-right" />
              </Avatar>
              <p className="text-xs text-muted-foreground mt-1">bottom-right</p>
            </div>
            <div className="text-center">
              <Avatar size="xl">
                <AvatarFallback>BL</AvatarFallback>
                <AvatarBadge status="online" size="xl" position="bottom-left" />
              </Avatar>
              <p className="text-xs text-muted-foreground mt-1">bottom-left</p>
            </div>
            <div className="text-center">
              <Avatar size="xl">
                <AvatarFallback>TR</AvatarFallback>
                <AvatarBadge status="online" size="xl" position="top-right" />
              </Avatar>
              <p className="text-xs text-muted-foreground mt-1">top-right</p>
            </div>
            <div className="text-center">
              <Avatar size="xl">
                <AvatarFallback>TL</AvatarFallback>
                <AvatarBadge status="online" size="xl" position="top-left" />
              </Avatar>
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
              <li><code className="bg-muted px-1 rounded">alt</code>: Required on AvatarImage for screen readers</li>
              <li>Fallback text provides meaningful identification when image fails to load</li>
              <li>Status badges should have aria-label describing the status</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarBadge } from "@/components/ui/avatar";

// Basic with sizes
<Avatar size="lg">
  <AvatarImage src="/avatar.png" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Square shape
<Avatar size="xl" shape="square">
  <AvatarFallback>SQ</AvatarFallback>
</Avatar>

// With status badge
<Avatar size="lg">
  <AvatarImage src="/avatar.png" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
  <AvatarBadge status="online" />
</Avatar>

// Grouped avatars
<AvatarGroup max={3} size="md">
  <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>D</AvatarFallback></Avatar>
</AvatarGroup>`}
        />
      </Section>

      <TokenReference tokens={avatarTokens} className="mt-12" />
    </ComponentPage>
  );
}
