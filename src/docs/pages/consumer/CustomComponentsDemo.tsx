import { useState } from "react";
import { ConsumerNavigation } from "./ConsumerNavigation";
import { ConsumerFooter } from "./Footer";
import { Stepper, type Step, Workspace, FloatLabelSelect } from "./components";
import { SelectCard, SelectCardGroup, type SelectCardProps } from "./components";
import { WexCard } from "@/components/wex";
import { WexSeparator } from "@/components/wex";
import { WexButton } from "@/components/wex";
import { WexSelect } from "@/components/wex";

/**
 * Custom Components Demo Page
 * 
 * A dedicated page for testing and showcasing custom consumer experience components.
 * Add new components here as you create them.
 */

// Sample data for Stepper component
const stepperSteps: Step[] = [
  {
    id: "step1",
    label: "Label",
    secondarySteps: [
      { id: "step1-1", label: "Label" },
      { id: "step1-2", label: "Label" },
      { id: "step1-3", label: "Label" },
      { id: "step1-4", label: "Label" },
    ],
  },
  {
    id: "step2",
    label: "Label",
  },
  {
    id: "step3",
    label: "Label",
  },
];

// Sample data for SelectCard component
const selectCardData: Omit<SelectCardProps, "type" | "checked" | "onCheckedChange">[] = [
  {
    id: "card1",
    title: "Health Savings Account (HSA)",
    subtext: "Subtext",
    description: "Save and pay for qualified health expenses with tax-free money. Combines with a high-deductible health plan, and funds roll over year after year.",
    showLink: true,
    linkText: "View more",
  },
  {
    id: "card2",
    title: "Flexible Spending Account (FSA)",
    subtext: "Subtext",
    description: "Save and pay for qualified health expenses with tax-free money. Combines with a high-deductible health plan, and funds roll over year after year.",
    showLink: true,
    linkText: "View more",
  },
  {
    id: "card3",
    title: "Health Reimbursement Arrangement (HRA)",
    subtext: "Subtext",
    description: "Save and pay for qualified health expenses with tax-free money. Combines with a high-deductible health plan, and funds roll over year after year.",
    showLink: true,
    linkText: "View more",
  },
];

export default function CustomComponentsDemo() {
  const [currentStep, setCurrentStep] = useState("step1-2");
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const [radioValue, setRadioValue] = useState<string>("");
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [relationship, setRelationship] = useState<string>("");
  const [emptyStateRelationship, setEmptyStateRelationship] = useState<string>("");

  return (
    <div className="min-h-screen bg-[#F1FAFE]">
      <ConsumerNavigation />

      <main className="w-full max-w-[1440px] mx-auto px-8 py-7 space-y-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Custom Components Demo
          </h1>
          <p className="text-muted-foreground">
            Test and showcase custom consumer experience components
          </p>
        </div>

        {/* Stepper Component Demo */}
        <WexCard className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Stepper Component
            </h2>
            <p className="text-sm text-muted-foreground">
              A hierarchical steps component with primary and secondary steps. All steps are clickable.
            </p>
          </div>
          
          <div className="max-w-md">
            <Stepper 
              steps={stepperSteps} 
              currentStepId={currentStep}
              onStepChange={setCurrentStep}
            />
          </div>

          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">
              Current Step: <strong className="text-foreground">{currentStep}</strong>
            </p>
          </div>
        </WexCard>

        <WexSeparator />

        {/* SelectCard Component Demo */}
        <WexCard className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              SelectCard Component
            </h2>
            <p className="text-sm text-muted-foreground">
              A card component that displays content with selection capabilities. Supports both checkbox (multiple selection) and radio (single selection) modes.
            </p>
          </div>

          {/* Checkbox Mode Demo */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Checkbox Mode (Multiple Selection)
            </h3>
            <SelectCardGroup
              type="checkbox"
              value={checkboxValues}
              onValueChange={(value) => setCheckboxValues(value as string[])}
              cards={selectCardData}
            />
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                Selected Cards: <strong className="text-foreground">
                  {checkboxValues.length > 0 ? checkboxValues.join(", ") : "None"}
                </strong>
              </p>
            </div>
          </div>

          <WexSeparator className="my-8" />

          {/* Radio Mode Demo */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Radio Mode (Single Selection)
            </h3>
            <SelectCardGroup
              type="radio"
              value={radioValue}
              onValueChange={(value) => setRadioValue(value as string)}
              cards={selectCardData}
            />
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                Selected Card: <strong className="text-foreground">
                  {radioValue || "None"}
                </strong>
              </p>
            </div>
          </div>

          <WexSeparator className="my-8" />

          {/* Individual Card States Demo */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Individual Card States
            </h3>
            <div className="flex flex-wrap gap-4">
              <SelectCard
                id="default-card"
                title="Default State"
                description="This card is in the default (unselected) state."
                type="checkbox"
                checked={false}
              />
              <SelectCard
                id="checked-card"
                title="Checked State"
                description="This card is in the checked (selected) state."
                type="checkbox"
                checked={true}
              />
              <SelectCard
                id="disabled-card"
                title="Disabled State"
                description="This card is disabled and cannot be selected."
                type="checkbox"
                checked={false}
                disabled={true}
              />
            </div>
          </div>
        </WexCard>

        <WexSeparator />

        {/* FloatLabelSelect Component Demo */}
        <WexCard className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              FloatLabelSelect Component
            </h2>
            <p className="text-sm text-muted-foreground">
              A dropdown select with a floating label that animates from inside the select to above it when a value is selected.
            </p>
          </div>

          <div className="space-y-8">
            {/* States Demo */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                States
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                {/* Empty State */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Empty State (Interactive)</p>
                  <FloatLabelSelect
                    label="Relationship"
                    value={emptyStateRelationship}
                    onValueChange={setEmptyStateRelationship}
                  >
                    <WexSelect.Item value="spouse">Spouse</WexSelect.Item>
                    <WexSelect.Item value="child">Child</WexSelect.Item>
                    <WexSelect.Item value="parent">Parent</WexSelect.Item>
                    <WexSelect.Item value="dependent">Dependent</WexSelect.Item>
                  </FloatLabelSelect>
                  <p className="text-xs text-muted-foreground mt-2">
                    Value: {emptyStateRelationship || "None"}
                  </p>
                </div>

                {/* Filled State */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Filled State (Interactive)</p>
                  <FloatLabelSelect
                    label="Relationship"
                    value={relationship}
                    onValueChange={setRelationship}
                  >
                    <WexSelect.Item value="spouse">Spouse</WexSelect.Item>
                    <WexSelect.Item value="child">Child</WexSelect.Item>
                    <WexSelect.Item value="parent">Parent</WexSelect.Item>
                    <WexSelect.Item value="dependent">Dependent</WexSelect.Item>
                  </FloatLabelSelect>
                </div>
              </div>
            </div>

            {/* Sizes Demo */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Sizes
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Three sizes for different contexts.
              </p>
              <div className="space-y-4 max-w-md">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Small</p>
                  <FloatLabelSelect
                    label="Relationship"
                    value={relationship}
                    onValueChange={setRelationship}
                    size="sm"
                  >
                    <WexSelect.Item value="spouse">Spouse</WexSelect.Item>
                    <WexSelect.Item value="child">Child</WexSelect.Item>
                    <WexSelect.Item value="parent">Parent</WexSelect.Item>
                    <WexSelect.Item value="dependent">Dependent</WexSelect.Item>
                  </FloatLabelSelect>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Medium (Default)</p>
                  <FloatLabelSelect
                    label="Relationship"
                    value={relationship}
                    onValueChange={setRelationship}
                    size="md"
                  >
                    <WexSelect.Item value="spouse">Spouse</WexSelect.Item>
                    <WexSelect.Item value="child">Child</WexSelect.Item>
                    <WexSelect.Item value="parent">Parent</WexSelect.Item>
                    <WexSelect.Item value="dependent">Dependent</WexSelect.Item>
                  </FloatLabelSelect>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Large</p>
                  <FloatLabelSelect
                    label="Relationship"
                    value={relationship}
                    onValueChange={setRelationship}
                    size="lg"
                  >
                    <WexSelect.Item value="spouse">Spouse</WexSelect.Item>
                    <WexSelect.Item value="child">Child</WexSelect.Item>
                    <WexSelect.Item value="parent">Parent</WexSelect.Item>
                    <WexSelect.Item value="dependent">Dependent</WexSelect.Item>
                  </FloatLabelSelect>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">
              Selected Value: <strong className="text-foreground">{relationship || "None"}</strong>
            </p>
          </div>
        </WexCard>

        <WexSeparator />

        {/* Workspace Component Demo */}
        <WexCard className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Workspace Component
            </h2>
            <p className="text-sm text-muted-foreground">
              A full-screen overlay workspace with header, content area, and footer with buttons. Opens with 24px margins and max width of 1920px.
            </p>
          </div>

          <WexButton onClick={() => setIsWorkspaceOpen(true)}>
            Open Workspace
          </WexButton>

          <div className="mt-4 p-4 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">
              Click the button above to open the workspace. It will display with:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside space-y-1">
              <li>Title and close button</li>
              <li>Main content area</li>
              <li>Footer with three buttons (primary, secondary, tertiary)</li>
            </ul>
          </div>
        </WexCard>

      </main>

      <ConsumerFooter />

      {/* Workspace Demo */}
      <Workspace
        open={isWorkspaceOpen}
        onOpenChange={setIsWorkspaceOpen}
        title="Workspace Demo"
        showFooter
        primaryButton={<WexButton>Save</WexButton>}
        secondaryButton={<WexButton variant="outline">Cancel</WexButton>}
        tertiaryButton={<WexButton variant="ghost">Reset</WexButton>}
        stepperContent={
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#1d2c38] uppercase tracking-[0.24px]">
              Steps
            </h3>
            <Stepper
              steps={stepperSteps}
              currentStepId={currentStep}
              onStepChange={setCurrentStep}
            />
          </div>
        }
      >
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-[#1d2c38] mb-4">Main Content Area</h3>
          <p className="text-sm text-[#515f6b] mb-6">
            This is the main content area of the workspace. It can contain any content you need, 
            such as forms, tables, charts, or any other UI elements.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <WexCard className="p-4">
              <h4 className="text-base font-semibold text-[#1d2c38] mb-2">Sample Card 1</h4>
              <p className="text-sm text-[#515f6b]">
                This is a sample card showing how content can be laid out in the workspace.
              </p>
            </WexCard>
            <WexCard className="p-4">
              <h4 className="text-base font-semibold text-[#1d2c38] mb-2">Sample Card 2</h4>
              <p className="text-sm text-[#515f6b]">
                The workspace is fully scrollable and responsive.
              </p>
            </WexCard>
            <WexCard className="p-4">
              <h4 className="text-base font-semibold text-[#1d2c38] mb-2">Sample Card 3</h4>
              <p className="text-sm text-[#515f6b]">
                You can add any number of components here.
              </p>
            </WexCard>
            <WexCard className="p-4">
              <h4 className="text-base font-semibold text-[#1d2c38] mb-2">Sample Card 4</h4>
              <p className="text-sm text-[#515f6b]">
                Close the workspace using the X button in the header.
              </p>
            </WexCard>
          </div>
        </div>
      </Workspace>
    </div>
  );
}

