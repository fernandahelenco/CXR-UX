import * as React from "react";
import { useNavigate } from "react-router-dom";
import { WexButton } from "@/components/wex/wex-button";
import { Stepper } from "./components/Stepper";
import type { Step } from "./components/Stepper";

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
 * Success illustration SVG URL from Figma
 */
const successIllustration = "http://localhost:3845/assets/5fa893d9b5199010890d280f8bace11e28fe4c8f.svg";

export default function HSAEligibilityResults() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  const handleBack = () => {
    navigate("/hsa-enrollment");
  };

  const handleContinue = () => {
    navigate("/hsa-enrollment/profile");
  };

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
              // Step navigation disabled for now
            }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Centered Success Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-0 w-[500px]">
            {/* Success Illustration */}
            <div className="relative w-[256px] h-[225px] shrink-0">
              <img 
                src={successIllustration} 
                alt="Success celebration" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Success Message */}
            <div className="flex flex-col gap-3 items-center text-center w-[362px]">
              <h1 className="text-[32px] font-bold leading-[42px] tracking-[0.64px] text-black">
                Great! you're eligible
              </h1>
              <p className="text-base font-normal leading-6 tracking-[-0.176px] text-[#7c858e]">
                Now, let's get some info about you
              </p>
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
              className="px-4 py-2"
            >
              Back
            </WexButton>
            <WexButton
              intent="primary"
              onClick={handleContinue}
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

