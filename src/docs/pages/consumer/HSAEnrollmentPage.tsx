import * as React from "react";
import { useNavigate } from "react-router-dom";
import { WexButton } from "@/components/wex/wex-button";
import { WexCheckbox } from "@/components/wex/wex-checkbox";
import { WexSelect } from "@/components/wex/wex-select";
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

export default function HSAEnrollmentPage() {
  const navigate = useNavigate();
  
  // State management
  const [certificationChecked, setCertificationChecked] = React.useState(false);
  const [coverageLevel, setCoverageLevel] = React.useState<string>("");

  // Check if can proceed (both checkbox and coverage level required)
  const canProceed = certificationChecked && coverageLevel !== "";

  // Handle cancel - navigate to home
  const handleCancel = () => {
    navigate("/");
  };

  // Handle continue - navigate to profile page
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
              // Step navigation disabled for now (only on Eligibility step)
            }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Content */}
        <div className="flex-1 flex flex-col items-center pt-14 pb-32 px-8 overflow-y-auto">
          <div className="w-[400px] flex flex-col gap-8">
            {/* Check if you qualify section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[24px] font-bold text-black leading-[32px] tracking-[-0.456px]">
                Check if you qualify for an HSA
              </h2>

              <p className="text-[16px] leading-[24px] text-[#243746] tracking-[-0.176px]">
                To qualify for an HSA, you must meet the following requirements.
              </p>

              {/* Eligibility Requirements List */}
              <div className="text-[14px] leading-[24px] text-[#7c858e] tracking-[-0.084px]">
                <ul className="list-disc ml-[21px] space-y-0">
                  <li>
                    You must have a qualifying health plan or be opening an account to rollover balances from an existing HSA account.
                  </li>
                  <li>
                    You cannot have any other disqualifying health coverage.
                  </li>
                  <li>
                    You cannot be covered by a first-dollar full coverage health flexible spending account (FSA) or health reimbursement arrangement (HRA). You can be covered by a limited purpose or post-deductible FSA/HRA as well as a retirement or suspended HRA.
                  </li>
                  <li>
                    You cannot be claimed as a dependent on anyone else's tax return.
                  </li>
                  <li>
                    You cannot be enrolled in Medicare, Medicaid, or TRICARE.
                  </li>
                  <li>
                    Other circumstances may affect your eligibility to establish or contribute to an HSA.
                  </li>
                </ul>

                <p className="mt-6 leading-[24px]">
                  Refer to{" "}
                  <span className="text-[#0058a3]">IRS publication 969</span>
                  , "Health Savings Accounts and Other Tax Favored Health Plans", for information about special rules that affect eligibility. You may download a copy of this publication from www.irs.gov. The publication is also available by calling 1-800-829-3676. You are solely responsible for determining whether you are eligible for an HSA, and for determining you remain eligible in the future.
                </p>
              </div>

              {/* Certification Checkbox */}
              <div className="flex gap-2 items-start">
                <WexCheckbox
                  id="certification"
                  checked={certificationChecked}
                  onCheckedChange={(checked) => setCertificationChecked(checked === true)}
                  className="mt-0.5"
                />
                <label
                  htmlFor="certification"
                  className="text-[14px] leading-[24px] text-[#243746] tracking-[-0.084px] cursor-pointer"
                >
                  I certify that I meet the qualifications to open a HSA
                </label>
              </div>
            </div>

            {/* Qualifying Health Plan Coverage section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[24px] font-bold text-black leading-[32px] tracking-[-0.456px]">
                Qualifying Health Plan Coverage
              </h2>

              <p className="text-[16px] leading-[24px] text-[#243746] tracking-[-0.176px]">
                Provide the following information about your qualifying health plan coverage to determine your maximum contribution to your HSA.
              </p>

              {/* Coverage Level Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-[10.5px] text-[#7c858e]">
                  Coverage Level
                </label>
                <WexSelect value={coverageLevel} onValueChange={setCoverageLevel}>
                  <WexSelect.Trigger className="w-full">
                    <WexSelect.Value placeholder="Select coverage level" />
                  </WexSelect.Trigger>
                  <WexSelect.Content>
                    <WexSelect.Item value="individual">Individual</WexSelect.Item>
                    <WexSelect.Item value="family">Family</WexSelect.Item>
                  </WexSelect.Content>
                </WexSelect>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-[32px] left-[32px] right-[32px] flex items-center justify-between">
          {/* Cancel Button */}
          <WexButton
            variant="ghost"
            onClick={handleCancel}
            className="px-4 py-2"
          >
            Cancel
          </WexButton>

          {/* Back and Continue Buttons */}
          <div className="flex gap-2 items-center">
            <WexButton
              intent="secondary"
              variant="outline"
              onClick={() => {}}
              disabled={true}
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
              Save & Continue
            </WexButton>
          </div>
        </div>
      </div>
    </div>
  );
}
