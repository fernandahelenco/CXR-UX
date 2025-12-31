import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexTag } from "@/components/wex";

const tagTokens: TokenRow[] = [
  { element: "Neutral", property: "Background", token: "--wex-component-tag-neutral-bg" },
  { element: "Neutral", property: "Text", token: "--wex-component-tag-neutral-fg" },
  { element: "Info", property: "Background", token: "--wex-component-tag-info-bg" },
  { element: "Info", property: "Text", token: "--wex-component-tag-info-fg" },
  { element: "Success", property: "Background", token: "--wex-component-tag-success-bg" },
  { element: "Success", property: "Text", token: "--wex-component-tag-success-fg" },
  { element: "Warning", property: "Background", token: "--wex-component-tag-warning-bg" },
  { element: "Warning", property: "Text", token: "--wex-component-tag-warning-fg" },
  { element: "Destructive", property: "Background", token: "--wex-component-tag-destructive-bg" },
  { element: "Destructive", property: "Text", token: "--wex-component-tag-destructive-fg" },
];

export default function TagPage() {
  return (
    <ComponentPage
      title="Tag"
      description="Subtle, tinted descriptor for UI elements. Often used for categories, labels, or interactive suggestion chips."
      status="stable"
      registryKey="tag"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="flex flex-wrap gap-2">
            <WexTag>Neutral</WexTag>
            <WexTag intent="info">Info</WexTag>
            <WexTag intent="success">Success</WexTag>
            <WexTag intent="warning">Warning</WexTag>
            <WexTag intent="destructive">Destructive</WexTag>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Sizes">
        <ExampleCard>
          <div className="flex items-center gap-4">
            <WexTag size="sm">Small</WexTag>
            <WexTag size="md">Medium</WexTag>
            <WexTag size="lg">Large</WexTag>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Interactive" description="Using asChild to render as a button.">
        <ExampleCard>
          <div className="flex flex-wrap gap-2">
            <WexTag asChild intent="info" className="cursor-pointer hover:bg-info/20">
              <button>Suggestion 1</button>
            </WexTag>
            <WexTag asChild intent="info" className="cursor-pointer hover:bg-info/20">
              <button>Suggestion 2</button>
            </WexTag>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexTag } from "@/components/wex";

<WexTag intent="info">Label</WexTag>

<WexTag asChild intent="success">
  <button onClick={...}>Click Me</button>
</WexTag>`}
        />
      </Section>

      <TokenReference tokens={tagTokens} className="mt-12" />
    </ComponentPage>
  );
}

