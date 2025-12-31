import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import { WexButton } from "@/components/wex/wex-button";
import { WexCheckbox } from "@/components/wex/wex-checkbox";
import { WexPopover } from "@/components/wex/wex-popover";
import { Stepper } from "./components/Stepper";
import type { Step } from "./components/Stepper";
import { QuestionOptionCard } from "./components/QuestionOptionCard";
import { cn } from "@/lib/utils";

/**
 * Question data structure
 */
interface Question {
  id: string;
  text: string;
  helpText?: string;
  options: string[];
}

/**
 * Eligibility questions data
 */
const eligibilityQuestions: Question[] = [
  {
    id: "q1",
    text: "Do you have a qualifying health plan or an existing HSA to roll over?",
    helpText: "What is a qualifying health plan?",
    options: ["Yes", "No"],
  },
  {
    id: "q2",
    text: "Who is covered by your health plan?",
    options: ["Just me", "Me and Family"],
  },
  {
    id: "q3",
    text: "Are you claimed as a dependent on someone's tax return?",
    options: ["Yes", "No"],
  },
  {
    id: "q4",
    text: "Are you enrolled in Medicare, Medicaid, or TRICARE?",
    options: ["Yes", "No"],
  },
  {
    id: "q5",
    text: "Do you have any disqualifying health coverage?",
    helpText: "Why you cannot have any disqualifying health coverage?",
    options: ["Yes", "No"],
  },
  {
    id: "q6",
    text: "Are you covered by a full-coverage FSA or HRA?",
    helpText: "Why you cannot be covered by a FSA or a HRA?",
    options: ["Yes", "No"],
  },
  {
    id: "q7",
    text: "Do you have a limited-purpose or post-deductible FSA/HRA?",
    options: ["Yes", "No"],
  },
];

/**
 * Stepper steps configuration
 */
const enrollmentSteps: Step[] = [
  { id: "eligibility", label: "Eligibility" },
  { id: "profile", label: "Profile" },
  { id: "dependents", label: "Dependents" },
  { id: "beneficiaries", label: "Beneficiaries" },
  { id: "reimbursement", label: "Reimbursement" },
  { id: "review", label: "Review" },
];

/**
 * Disclaimer text
 */
const disclaimerText = `Refer to IRS publication 969, "Health Savings Accounts and Other Tax Favored Health Plans", for information about special rules that effect eligibility. You may download a copy of this publication from www.irs.gov. The publication is also available by calling 1-800-829-3676. You are solely responsible for determining whether you are eligible for an HSA, and for determining you remain eligible in the future.`;

export default function HSAEnrollmentPage() {
  const navigate = useNavigate();
  
  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [certificationChecked, setCertificationChecked] = React.useState(false);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  // Get current question
  const currentQuestion = eligibilityQuestions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id];

  // Check if all questions are answered
  const allQuestionsAnswered = eligibilityQuestions.every(
    (q) => answers[q.id] !== undefined
  );

  // Check if can proceed (all questions answered + certification checked)
  const canProceed = allQuestionsAnswered && certificationChecked;

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: option,
    };
    setAnswers(newAnswers);

    // Auto-advance to next question with animation
    // Only if not on the last question
    if (currentQuestionIndex < eligibilityQuestions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        // Reset transition state after changing question
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 300);
    }
  };

  // Handle back button
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Handle cancel - navigate to home
  const handleCancel = () => {
    navigate("/");
  };

  // Handle continue - navigate to results page
  const handleContinue = () => {
    navigate("/hsa-enrollment/results");
  };

  // Check if showing certification section (all questions answered)
  const showCertification = allQuestionsAnswered;

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className="w-[240px] bg-[#FAFAFA] min-h-screen overflow-clip relative rounded-tr-[32px] shrink-0">
        {/* Title */}
        <p className="absolute font-bold leading-[40px] left-[32px] text-[30px] text-[#243746] top-[56px] tracking-[-0.63px]">
          Enrollment
        </p>

        {/* Stepper */}
        <div className="absolute left-[32px] top-[128px]">
          <Stepper
            steps={enrollmentSteps}
            currentStepId="eligibility"
            onStepChange={() => {
              // Step navigation disabled for now (only on Eligibility step)
            }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Content */}
        <div className="flex-1 flex flex-col items-center pt-14 pb-32 px-8 overflow-y-auto">
          <div className="w-[362px] flex flex-col gap-12">
            {/* Question Title */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-black leading-8 tracking-[-0.456px]">
                Check if you qualify for an HSA
              </h2>

              {/* Current Question - only show if not all questions answered */}
              {!showCertification && currentQuestion && (
                <div 
                  key={currentQuestion.id}
                  className={cn(
                    "flex flex-col gap-4 transition-all duration-300 ease-in-out",
                    isTransitioning 
                      ? "opacity-0 -translate-y-4" 
                      : "opacity-100 translate-y-0"
                  )}
                >
                  {/* Question Text */}
                  <p className="text-base font-normal leading-6 text-[#243746] tracking-[-0.176px]">
                    {currentQuestion.text}
                  </p>

                  {/* Help Text */}
                  {currentQuestion.helpText && (
                    <div 
                      className={cn(
                        "flex gap-2 items-center transition-all duration-300 ease-out",
                        isTransitioning 
                          ? "opacity-0" 
                          : "opacity-100"
                      )}
                      style={{
                        transitionDelay: isTransitioning ? '0ms' : '100ms'
                      }}
                    >
                      {currentQuestion.id === 'q1' ? (
                        <WexPopover>
                          <WexPopover.Trigger asChild>
                            <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                              <Info className="h-4 w-4 text-[#1d2c38] cursor-pointer" />
                              <p className="text-sm font-normal leading-6 text-[#515f6b] tracking-[-0.084px]">
                                {currentQuestion.helpText}
                              </p>
                            </button>
                          </WexPopover.Trigger>
                          <WexPopover.Content className="max-w-[320px] p-4">
                            <p className="text-sm leading-6 text-[#243746]">
                              To be eligible for a Health Savings Account, you must have a high deductible health plan (HDHP) that meets certain requirements described in Section 223 of the Internal Revenue Code.
                            </p>
                          </WexPopover.Content>
                        </WexPopover>
                      ) : currentQuestion.id === 'q5' ? (
                        <WexPopover>
                          <WexPopover.Trigger asChild>
                            <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                              <Info className="h-4 w-4 text-[#1d2c38] cursor-pointer" />
                              <p className="text-sm font-normal leading-6 text-[#515f6b] tracking-[-0.084px] text-left">
                                {currentQuestion.helpText}
                              </p>
                            </button>
                          </WexPopover.Trigger>
                          <WexPopover.Content className="max-w-[400px] p-4">
                            <div className="space-y-3 text-sm leading-6 text-[#243746]">
                              <p>
                                You (and your spouse, if you have family coverage) generally cannot have any other health coverage that is not an HDHP. However, you can still be an eligible individual even if your spouse has non-HDHP coverage provided you are not covered by that plan.
                              </p>
                              <p>
                                You can have additional insurance that provides benefits only for the following items:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Liabilities incurred under workers' compensation laws, tort liabilities, or liabilities related to ownership or use of property</li>
                                <li>A specific disease or illness</li>
                                <li>A fixed amount per day (or other period) of hospitalization</li>
                                <li>Accidents</li>
                                <li>Disability</li>
                                <li>Dental care</li>
                                <li>Vision care</li>
                                <li>Long-term care</li>
                              </ul>
                            </div>
                          </WexPopover.Content>
                        </WexPopover>
                      ) : currentQuestion.id === 'q6' ? (
                        <WexPopover>
                          <WexPopover.Trigger asChild>
                            <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                              <Info className="h-4 w-4 text-[#1d2c38] cursor-pointer" />
                              <p className="text-sm font-normal leading-6 text-[#515f6b] tracking-[-0.084px] text-left">
                                {currentQuestion.helpText}
                              </p>
                            </button>
                          </WexPopover.Trigger>
                          <WexPopover.Content className="max-w-[400px] p-4">
                            <div className="space-y-4 text-sm leading-6 text-[#243746]">
                              <p>
                                You cannot be covered by a first-dollar full coverage health flexible spending account (FSA) or a health reimbursement arrangement (HRA). You can be covered by a limited purpose or post-deductible FSA or HRA as well as a retirement or suspended HRA.
                              </p>
                              
                              <div>
                                <p className="font-semibold mb-2">
                                  The following health benefits make you <span className="italic">ineligible</span> for an HSA:
                                </p>
                                <div className="pl-4">
                                  <p className="font-semibold mb-1">"General"</p>
                                  <p className="mb-3">
                                    FSA's and HRA's in which the reimbursement is provided before any minimum annual deductible has been satisfied under the HDHP. Includes coverage through a spouse's FSA or HRA.
                                  </p>
                                </div>
                              </div>

                              <div>
                                <p className="font-semibold mb-2">
                                  The following health benefits allow you to have an HSA:
                                </p>
                                <div className="pl-4 space-y-3">
                                  <div>
                                    <p className="font-semibold mb-1">"Limited Purpose"</p>
                                    <p>
                                      FSAs and HRAs that restrict reimbursements to certain permitted benefits such as vision, dental or preventive care benefits.
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-semibold mb-1">"Retirement"</p>
                                    <p>
                                      HRAs that only provide reimbursement after retirement.
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-semibold mb-1">"Suspended"</p>
                                    <p>
                                      HRAs where the employee has elected to forgo health reimbursements for the coverage period.
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-semibold mb-1">"Post-deductible"</p>
                                    <p>
                                      FSAs or HRAs that only provide reimbursement after the minimum annual deductible has been satisfied under the HDHP.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </WexPopover.Content>
                        </WexPopover>
                      ) : (
                        <>
                          <Info className="h-4 w-4 text-[#1d2c38]" />
                          <p className="text-sm font-normal leading-6 text-[#515f6b] tracking-[-0.084px]">
                            {currentQuestion.helpText}
                          </p>
                        </>
                      )}
                    </div>
                  )}

                  {/* Option Cards */}
                  <div className="flex flex-col gap-4">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={option}
                        className={cn(
                          "transition-all duration-300 ease-out",
                          isTransitioning 
                            ? "opacity-0 -translate-y-2" 
                            : "opacity-100 translate-y-0"
                        )}
                        style={{
                          transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`
                        }}
                      >
                        <QuestionOptionCard
                          option={option}
                          selected={currentAnswer === option}
                          onSelect={() => handleOptionSelect(option)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certification Section - shown after all questions */}
              {showCertification && (
                <div className="flex flex-col gap-4 mt-8">
                  {/* Disclaimer Text */}
                  <p className="text-sm font-normal leading-6 text-[#7c858e] tracking-[-0.084px]">
                    {disclaimerText}
                  </p>

                  {/* Certification Checkbox */}
                  <div className="flex gap-2 items-start">
                    <WexCheckbox
                      id="certification"
                      checked={certificationChecked}
                      onCheckedChange={setCertificationChecked}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor="certification"
                      className="text-sm font-normal leading-6 text-[#243746] tracking-[-0.084px] cursor-pointer"
                    >
                      I certify that I meet the qualifications to open a Health Savings Account
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-[32px] left-[32px] right-[32px] flex items-center justify-between">
          {/* Cancel Button */}
          <WexButton
            intent="ghost"
            onClick={handleCancel}
            className="px-4 py-2"
          >
            Cancel
          </WexButton>

          {/* Back and Continue Buttons */}
          <div className="flex gap-2 items-center">
            <WexButton
              intent="outline"
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2"
            >
              Back
            </WexButton>
            <WexButton
              intent="primary"
              onClick={handleContinue}
              disabled={!canProceed}
              className="px-4 py-2"
            >
              Continue
            </WexButton>
          </div>
        </div>
      </div>
    </div>
  );
}

