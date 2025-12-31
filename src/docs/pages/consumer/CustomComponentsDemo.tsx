import { useState } from "react";
import { ConsumerNavigation } from "./ConsumerNavigation";
import { Stepper, type Step } from "./components";
import { SelectCard, SelectCardGroup, type SelectCardProps } from "./components";
import { WexCard } from "@/components/wex";
import { WexSeparator } from "@/components/wex";

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

      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-12">
        <div className="w-full max-w-[1440px] mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              <span className="text-muted">•</span>
              <a href="#" className="hover:text-foreground transition-colors">Disclaimer</a>
              <span className="text-muted">•</span>
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <span className="text-muted">•</span>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Use</a>
            </div>
            <div className="text-center md:text-right">
              <p>WEX Health, Inc. 2025-2028. All rights reserved. Powered by WEX Health.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

