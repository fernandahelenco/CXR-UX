import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Step interface for hierarchical step structure
 */
export interface Step {
  id: string;
  label: string;
  secondarySteps?: Step[]; // Nested secondary steps
}

/**
 * Props for the Stepper component
 */
export interface StepperProps {
  steps: Step[];
  currentStepId: string;
  onStepChange: (stepId: string) => void;
  className?: string;
}

/**
 * Step state type
 */
type StepState = "completed" | "current" | "pending";

/**
 * Stepper Component
 * 
 * A hierarchical steps component that displays primary steps with nested secondary steps.
 * All steps are clickable and allow navigation between any step.
 * 
 * Features:
 * - Vertical layout with connector lines
 * - Primary steps with step numbers (1, 2, 3, etc.)
 * - Secondary steps with checkmarks (completed) or empty (current/pending)
 * - All steps are clickable
 * - Secondary steps only visible when parent is reached
 * - All steps marked as completed when user reaches the last step
 */
export function Stepper({ steps, currentStepId, onStepChange, className }: StepperProps) {
  /**
   * Determine the state of a step based on currentStepId
   * If currentStepId is the last step, all previous steps are completed
   * If a primary step has all its secondary steps completed, mark it as completed
   */
  const getStepState = (stepId: string, allStepIds: string[]): StepState => {
    const currentIndex = allStepIds.indexOf(currentStepId);
    const stepIndex = allStepIds.indexOf(stepId);
    const lastIndex = allStepIds.length - 1;
    
    // If we're at the last step, mark all previous as completed
    if (currentIndex === lastIndex && stepIndex < lastIndex) {
      return "completed";
    }
    
    // Check if this is a primary step with secondary steps
    const primaryStep = steps.find(step => step.id === stepId);
    if (primaryStep && primaryStep.secondarySteps && primaryStep.secondarySteps.length > 0) {
      // Check if ALL secondary steps are completed
      // A secondary step is completed only if it comes BEFORE the current step
      const allSecondaryCompleted = primaryStep.secondarySteps.every(secondary => {
        const secondaryIndex = allStepIds.indexOf(secondary.id);
        // Secondary is completed ONLY if it comes strictly before current step
        // (not equal to, not after)
        return secondaryIndex < currentIndex;
      });
      
      // For primary steps with secondary steps, only mark as completed if ALL secondary steps are done
      if (stepIndex === currentIndex) {
        return "current";
      }
      
      // Only mark primary as completed if ALL secondary steps are completed
      if (allSecondaryCompleted) {
        return "completed";
      }
      
      // If not all secondary steps are completed, the primary should be pending
      // (even if it comes before current step in the sequence)
      return "pending";
    }
    
    // For steps without secondary steps (or secondary steps), use standard logic
    if (stepIndex === currentIndex) return "current";
    if (stepIndex < currentIndex) return "completed";
    return "pending";
  };

  /**
   * Flatten all step IDs in order (primary and secondary)
   */
  const getAllStepIds = (): string[] => {
    const ids: string[] = [];
    steps.forEach((step) => {
      ids.push(step.id);
      if (step.secondarySteps) {
        step.secondarySteps.forEach((secondary) => {
          ids.push(secondary.id);
        });
      }
    });
    return ids;
  };

  /**
   * Check if a primary step has been reached (current or completed)
   */
  const isPrimaryStepReached = (stepId: string, allStepIds: string[]): boolean => {
    const currentIndex = allStepIds.indexOf(currentStepId);
    const stepIndex = allStepIds.indexOf(stepId);
    return stepIndex <= currentIndex;
  };

  /**
   * Handle step click
   */
  const handleStepClick = (stepId: string) => {
    onStepChange(stepId);
  };

  const allStepIds = React.useMemo(() => getAllStepIds(), [steps]);

  return (
    <div className={cn("relative flex flex-col gap-6", className)}>
      {/* Base connector line - gray background, positioned at 12px (center of 24px circle) */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />
      
      <div className="relative flex flex-col gap-6">
        {steps.map((primaryStep, primaryIndex) => {
          const primaryState = getStepState(primaryStep.id, allStepIds);
          const isPrimaryReached = isPrimaryStepReached(primaryStep.id, allStepIds);
          const showSecondarySteps = Boolean(isPrimaryReached && primaryStep.secondarySteps && primaryStep.secondarySteps.length > 0);
          const isCurrentPrimaryWithSecondary = primaryState === "current" && showSecondarySteps;
          const stepNumber = primaryIndex + 1; // Step number (1, 2, 3, etc.)
          
          return (
            <React.Fragment key={primaryStep.id}>
              {/* Primary Step */}
              <div className="relative flex items-center gap-3">
                {/* Step Indicator - 24px circle */}
                <button
                  type="button"
                  onClick={() => handleStepClick(primaryStep.id)}
                  className={cn(
                    "relative z-10 flex items-center justify-center rounded-full bg-background border transition-colors",
                    "hover:opacity-80 cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    // Primary step sizing - 24px (w-6 h-6)
                    "w-6 h-6",
                    // State-based styling
                    primaryState === "current" && [
                      "border-primary border-[3px]",
                    ],
                    primaryState === "pending" && [
                      "border-border",
                    ],
                    primaryState === "completed" && [
                      "border-green-500",
                    ],
                  )}
                  aria-label={`Step ${stepNumber}: ${primaryStep.label}`}
                  aria-current={primaryState === "current" ? "step" : undefined}
                >
                  {primaryState === "completed" ? (
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <span className={cn(
                      "text-sm font-semibold leading-6",
                      primaryState === "current" && "text-primary",
                      primaryState === "pending" && "text-muted-foreground",
                    )}>
                      {stepNumber}
                    </span>
                  )}
                </button>
                
                {/* Step Label - 14px, semibold */}
                <button
                  type="button"
                  onClick={() => handleStepClick(primaryStep.id)}
                  className={cn(
                    "text-sm text-left transition-colors cursor-pointer",
                    "hover:opacity-80",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded",
                    primaryState === "current" 
                      ? "font-semibold text-foreground" 
                      : "font-medium text-muted-foreground",
                  )}
                  aria-label={`Go to step: ${primaryStep.label}`}
                >
                  {primaryStep.label}
                </button>
              </div>

              {/* Connector segment from primary through all secondary steps - blue if current primary */}
              {isCurrentPrimaryWithSecondary && primaryStep.secondarySteps && (
                <div 
                  className="absolute left-3 w-px bg-primary z-0" 
                  style={{ 
                    top: '1.5rem', // 24px from top of primary step (center of circle)
                    // Height: gap to first secondary (1rem) + (number of secondary steps * 1.5rem each)
                    height: `${1 + (primaryStep.secondarySteps.length * 1.5)}rem`
                  }} 
                />
              )}

              {/* Secondary Steps - only show when primary is reached */}
              {showSecondarySteps && primaryStep.secondarySteps && (
                <div className="pl-9 flex flex-col gap-0.5">
                  {primaryStep.secondarySteps.map((secondaryStep, secondaryIndex) => {
                    const secondaryState = getStepState(secondaryStep.id, allStepIds);
                    const isLastSecondary = secondaryIndex === primaryStep.secondarySteps!.length - 1;
                    // Connector line is blue if primary is current, gray otherwise
                    const connectorColor = isCurrentPrimaryWithSecondary ? "bg-primary" : "bg-border";
                    
                    return (
                      <React.Fragment key={secondaryStep.id}>
                        <div className="relative flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            {/* Secondary Step Indicator - 14px circle */}
                            <button
                              type="button"
                              onClick={() => handleStepClick(secondaryStep.id)}
                              className={cn(
                                "relative z-10 flex items-center justify-center rounded-full bg-background border transition-colors",
                                "hover:opacity-80 cursor-pointer",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                // Secondary step sizing - 14px (w-3.5 h-3.5)
                                "w-3.5 h-3.5",
                                // State-based styling
                                secondaryState === "completed" && [
                                  "border-green-500",
                                ],
                                secondaryState === "current" && [
                                  "border-primary",
                                ],
                                secondaryState === "pending" && [
                                  "border-border",
                                ],
                              )}
                              aria-label={`Sub-step ${secondaryIndex + 1}: ${secondaryStep.label}`}
                              aria-current={secondaryState === "current" ? "step" : undefined}
                            >
                              {secondaryState === "completed" ? (
                                <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                              ) : null}
                            </button>
                            
                            {/* Secondary Step Label - 12px, normal */}
                            <button
                              type="button"
                              onClick={() => handleStepClick(secondaryStep.id)}
                              className={cn(
                                "text-xs text-left transition-colors cursor-pointer",
                                "hover:opacity-80",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded",
                                secondaryState === "current" 
                                  ? "font-medium text-foreground" 
                                  : "font-normal text-muted-foreground",
                              )}
                              aria-label={`Go to sub-step: ${secondaryStep.label}`}
                            >
                              {secondaryStep.label}
                            </button>
                          </div>
                          
                          {/* Connector line between secondary steps - 2px gap, 16px height */}
                          {!isLastSecondary && (
                            <div className={cn("h-4 w-px ml-[5px]", connectorColor)} />
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

