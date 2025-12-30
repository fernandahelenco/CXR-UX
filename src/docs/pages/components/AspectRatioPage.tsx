import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexAspectRatio } from "@/components/wex";

// Props documentation
const aspectRatioProps: PropDefinition[] = [
  { name: "ratio", type: "number", default: "1", description: "Width/height ratio (e.g., 16/9 for widescreen)" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

// Token mappings for WexAspectRatio
const aspectRatioTokens: TokenRow[] = [
  { element: "Container", property: "Position", token: "(relative wrapper)" },
  { element: "Note", property: "", token: "No color tokens - layout utility only" },
];

export default function AspectRatioPage() {
  return (
    <ComponentPage
      title="Aspect Ratio"
      description="Displays content within a desired aspect ratio."
      status="stable"
      registryKey="aspect-ratio"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-md">
            <WexAspectRatio ratio={16 / 9} className="bg-muted rounded-md">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                16:9 Aspect Ratio
              </div>
            </WexAspectRatio>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Common Ratios" description="Examples of frequently used aspect ratios.">
        <div className="space-y-4">
          <ExampleCard title="16:9" description="Standard widescreen video format.">
            <div className="w-48">
              <WexAspectRatio ratio={16 / 9} className="bg-muted rounded-md">
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  16:9
                </div>
              </WexAspectRatio>
            </div>
          </ExampleCard>

          <ExampleCard title="4:3" description="Traditional screen format.">
            <div className="w-48">
              <WexAspectRatio ratio={4 / 3} className="bg-muted rounded-md">
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  4:3
                </div>
              </WexAspectRatio>
            </div>
          </ExampleCard>

          <ExampleCard title="1:1" description="Square format for avatars and thumbnails.">
            <div className="w-48">
              <WexAspectRatio ratio={1} className="bg-muted rounded-md">
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  1:1
                </div>
              </WexAspectRatio>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WCAG 2.2 Level AA Compliant</h3>
            <p className="text-sm text-muted-foreground">
              This layout component meets WCAG 2.2 Level AA requirements.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Content Accessibility</h3>
            <p className="text-sm text-muted-foreground">
              The AspectRatio component is a layout wrapper. Ensure content within 
              (images, videos) includes appropriate <code className="bg-muted px-1 rounded">alt</code> text 
              and accessible labels.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexAspectRatio } from "@/components/wex";

// 16:9 video container
<WexAspectRatio ratio={16 / 9}>
  <img src="..." alt="..." className="object-cover" />
</WexAspectRatio>

// Square thumbnail
<WexAspectRatio ratio={1}>
  <img src="..." alt="..." className="object-cover" />
</WexAspectRatio>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={aspectRatioProps} />
      </Section>

      <TokenReference tokens={aspectRatioTokens} className="mt-12" />
    </ComponentPage>
  );
}

