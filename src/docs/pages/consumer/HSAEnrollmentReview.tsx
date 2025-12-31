import * as React from "react";
import { useNavigate } from "react-router-dom";
import { WexButton } from "@/components/wex/wex-button";
import { WexCheckbox } from "@/components/wex/wex-checkbox";
import { WexLabel } from "@/components/wex/wex-label";
import { Stepper } from "./components/Stepper";
import type { Step } from "./components/Stepper";
import { cn } from "@/lib/utils";

/**
 * Stepper steps configuration
 */
const enrollmentSteps: Step[] = [
  { id: "eligibility", label: "Eligibility", status: "complete" },
  { id: "profile", label: "Profile", status: "complete" },
  { id: "dependents", label: "Dependents", status: "complete" },
  { id: "beneficiaries", label: "Beneficiaries", status: "complete" },
  { id: "reimbursement", label: "Reimbursement", status: "complete" },
  { id: "review", label: "Review", status: "active" },
];

/**
 * Review data interfaces
 */
interface ProfileData {
  name: string;
  ssn: string;
  birthDate: string;
  gender: string;
  maritalStatus: string;
  homeAddress: string[];
  mailingAddress: string[];
  homePhone: string;
  email: string;
}

interface Dependent {
  name: string;
  birthDate: string;
  relationship: string;
}

interface Beneficiary {
  name: string;
  sharePercent: string;
  relationship: string;
}

export default function HSAEnrollmentReview() {
  const navigate = useNavigate();

  // State for checkboxes
  const [affirmation, setAffirmation] = React.useState(false);
  const [eligibilityUnderstanding, setEligibilityUnderstanding] = React.useState(false);
  const [documentReceipt, setDocumentReceipt] = React.useState(false);

  // Mock data - in a real app, this would come from context or API
  const profileData: ProfileData = {
    name: "User name",
    ssn: "xxx-xx-3232",
    birthDate: "01/13/1986",
    gender: "Female",
    maritalStatus: "Married",
    homeAddress: ["520 Test Ave", "Test, AL 54530", "United States"],
    mailingAddress: ["520 Test Ave", "Test, AL 54530", "United States"],
    homePhone: "(123)456-7890",
    email: "username@email.com",
  };

  const dependents: Dependent[] = [
    {
      name: "Dependent name",
      birthDate: "01/01/2000",
      relationship: "Dependent",
    },
  ];

  const beneficiaries: Beneficiary[] = [
    {
      name: "Beneficiary name",
      sharePercent: "100",
      relationship: "Dependent",
    },
  ];

  const reimbursementMethod = {
    type: "Debit Card",
    details: "**** 2454",
  };

  // Handle navigation
  const handleCancel = () => {
    navigate("/consumer");
  };

  const handleBack = () => {
    navigate("/hsa-enrollment/reimbursement");
  };

  const handleSubmit = () => {
    // All checkboxes are validated via disabled button state
    // TODO: Submit enrollment data
    console.log("Enrollment submitted");
    // Navigate to success page
    navigate("/hsa-enrollment/success");
  };

  const handleEdit = (section: string) => {
    // Navigate to the specific section to edit
    switch (section) {
      case "eligibility":
        navigate("/hsa-enrollment");
        break;
      case "profile":
        navigate("/hsa-enrollment/profile");
        break;
      case "dependents":
        navigate("/hsa-enrollment/dependents");
        break;
      case "beneficiaries":
        navigate("/hsa-enrollment/beneficiaries");
        break;
      case "reimbursement":
        navigate("/hsa-enrollment/reimbursement");
        break;
    }
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
            currentStepId="review"
            onStepChange={() => {}}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="flex justify-center pt-14 px-8">
            <div className="w-[400px] flex flex-col gap-12">
              {/* Header Section */}
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-2xl leading-8 tracking-[-0.456px] text-[#253746]">
                  Review and submit enrollment
                </h1>
                <p className="text-base leading-6 tracking-[-0.176px] text-[#515F6B]">
                  Please verify the following information is correct.
                </p>

                {/* Profile Section */}
                <div className="flex flex-col gap-3">
                  <h2 className="font-semibold text-base leading-6 tracking-[0.32px] text-black">
                    Profile
                  </h2>
                  <div className="h-px bg-[#E4E6E9]" />
                  
                  <div className="flex flex-col gap-2">
                    {/* Name */}
                    <div className="flex justify-between text-sm leading-6 tracking-[0.28px] text-black">
                      <span>Name:</span>
                      <span className="text-right">{profileData.name}</span>
                    </div>
                    
                    {/* SSN */}
                    <div className="flex justify-between text-sm leading-6 tracking-[0.28px] text-black bg-[rgba(210,214,217,0.2)] py-1">
                      <span>Social Security Number:</span>
                      <span className="text-right">{profileData.ssn}</span>
                    </div>
                    
                    {/* Birth Date */}
                    <div className="flex justify-between text-sm leading-6 tracking-[0.28px] text-black">
                      <span>Birth Date:</span>
                      <span className="text-right">{profileData.birthDate}</span>
                    </div>
                    
                    {/* Gender */}
                    <div className="flex justify-between text-sm leading-6 tracking-[0.28px] text-black bg-[rgba(210,214,217,0.2)] py-1">
                      <span>Gender:</span>
                      <span className="text-right">{profileData.gender}</span>
                    </div>
                    
                    {/* Marital Status */}
                    <div className="flex justify-between text-sm leading-6 tracking-[0.28px] text-black">
                      <span>Marital Status:</span>
                      <span className="text-right">{profileData.maritalStatus}</span>
                    </div>
                    
                    {/* Home Address */}
                    <div className="flex justify-between text-sm leading-6 tracking-[0.28px] text-black bg-[rgba(210,214,217,0.2)] py-1">
                      <span>Home Address:</span>
                      <span className="text-right">
                        {profileData.homeAddress.map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < profileData.homeAddress.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                    
                    {/* Mailing Address */}
                    <div className="flex justify-between text-sm leading-6 tracking-[0.28px] text-black">
                      <span>Mailing Address:</span>
                      <span className="text-right">
                        {profileData.mailingAddress.map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < profileData.mailingAddress.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                    
                    {/* Home Phone */}
                    <div className="flex justify-between text-sm leading-6 tracking-[0.28px] text-black bg-[rgba(210,214,217,0.2)] py-1">
                      <span>Home Phone:</span>
                      <span className="text-right">{profileData.homePhone}</span>
                    </div>
                    
                    {/* Email Address */}
                    <div className="flex justify-between text-sm leading-6 tracking-[0.28px] text-black">
                      <span>Email Address:</span>
                      <span className="text-right">{profileData.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility Section */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-base leading-6 tracking-[0.32px] text-black">
                    Eligibility
                  </h2>
                  <button
                    onClick={() => handleEdit("eligibility")}
                    className="text-sm leading-6 tracking-[0.28px] text-[#016496] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="h-px bg-[#E4E6E9]" />
                
                <div className="flex justify-between text-sm leading-6 tracking-[0.28px] text-black">
                  <span>Name:</span>
                  <span className="text-right">{profileData.name}</span>
                </div>
              </div>

              {/* Dependents Section */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <h2 className="font-semibold text-base leading-6 tracking-[0.32px] text-black">
                    Dependents
                  </h2>
                  <button
                    onClick={() => handleEdit("dependents")}
                    className="text-sm leading-6 tracking-[0.28px] text-[#016496] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="h-px bg-[#E4E6E9]" />
                
                {/* Table */}
                <div className="border border-[#E4E6E9] rounded-sm overflow-hidden">
                  {/* Header Row */}
                  <div className="flex bg-[#F7F7F7] border-b border-[#E4E6E9]">
                    <div className="flex-[0_0_148px] px-4 py-2 font-semibold text-sm leading-6 tracking-[-0.084px] text-[#1D2C38]">
                      Name
                    </div>
                    <div className="flex-1 px-4 py-2 font-semibold text-sm leading-6 tracking-[-0.084px] text-[#1D2C38] border-l border-[#E4E6E9]">
                      Birth Date
                    </div>
                    <div className="flex-1 px-4 py-2 font-semibold text-sm leading-6 tracking-[-0.084px] text-[#1D2C38] border-l border-[#E4E6E9]">
                      Relationship
                    </div>
                  </div>
                  
                  {/* Data Rows */}
                  {dependents.map((dependent, index) => (
                    <div key={index} className="flex border-b border-[#E4E6E9] last:border-b-0">
                      <div className="flex-[0_0_148px] px-4 py-2 text-sm leading-6 tracking-[-0.084px] text-[#12181D]">
                        {dependent.name}
                      </div>
                      <div className="flex-1 px-4 py-2 text-sm leading-6 tracking-[-0.084px] text-[#12181D] border-l border-[#E4E6E9]">
                        {dependent.birthDate}
                      </div>
                      <div className="flex-1 px-4 py-2 text-sm leading-6 tracking-[-0.084px] text-[#12181D] border-l border-[#E4E6E9]">
                        {dependent.relationship}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beneficiaries Section */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <h2 className="font-semibold text-base leading-6 tracking-[0.32px] text-black">
                    Beneficiaries
                  </h2>
                  <button
                    onClick={() => handleEdit("beneficiaries")}
                    className="text-sm leading-6 tracking-[0.28px] text-[#016496] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="h-px bg-[#E4E6E9]" />
                
                {/* Table */}
                <div className="border border-[#E4E6E9] rounded-sm overflow-hidden">
                  {/* Header Row */}
                  <div className="flex bg-[#F7F7F7] border-b border-[#E4E6E9]">
                    <div className="flex-[0_0_165px] px-4 py-2 font-semibold text-sm leading-6 tracking-[-0.084px] text-[#1D2C38]">
                      Name
                    </div>
                    <div className="flex-[0_0_100px] px-4 py-2 font-semibold text-sm leading-6 tracking-[-0.084px] text-[#1D2C38] border-l border-[#E4E6E9] whitespace-nowrap">
                      Share %
                    </div>
                    <div className="flex-1 px-4 py-2 font-semibold text-sm leading-6 tracking-[-0.084px] text-[#1D2C38] border-l border-[#E4E6E9]">
                      Relationship
                    </div>
                  </div>
                  
                  {/* Data Rows */}
                  {beneficiaries.map((beneficiary, index) => (
                    <div key={index} className="flex border-b border-[#E4E6E9] last:border-b-0">
                      <div className="flex-[0_0_165px] px-4 py-2 text-sm leading-6 tracking-[-0.084px] text-[#12181D]">
                        {beneficiary.name}
                      </div>
                      <div className="flex-[0_0_100px] px-4 py-2 text-sm leading-6 tracking-[-0.084px] text-[#12181D] border-l border-[#E4E6E9]">
                        {beneficiary.sharePercent}
                      </div>
                      <div className="flex-1 px-4 py-2 text-sm leading-6 tracking-[-0.084px] text-[#12181D] border-l border-[#E4E6E9]">
                        {beneficiary.relationship}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reimbursement Method Section */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-base leading-6 tracking-[0.32px] text-black">
                    Reimbursement Method
                  </h2>
                  <button
                    onClick={() => handleEdit("reimbursement")}
                    className="text-sm leading-6 tracking-[0.28px] text-[#016496] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="h-px bg-[#E4E6E9]" />
                
                <div className="flex justify-between text-sm leading-6 tracking-[0.28px] text-black">
                  <span>{reimbursementMethod.type}</span>
                  <span className="text-right">{reimbursementMethod.details}</span>
                </div>
              </div>

              {/* Submit Enrollment Section */}
              <div className="flex flex-col gap-4">
                <h2 className="font-bold text-base leading-normal tracking-[-0.304px] text-[#253746]">
                  Submit Enrollment
                </h2>
                <p className="text-sm leading-6 tracking-[-0.084px] text-[#515F6B]">
                  By submitting the enrollment, you are requesting that a Health Savings Account be opened in your name. <span className="text-red-600">All fields are required.</span>
                </p>
                
                {/* Checkboxes */}
                <div className="flex flex-col gap-6">
                  {/* Checkbox 1 */}
                  <div className="flex gap-1 items-start">
                    <WexCheckbox
                      id="affirmation"
                      checked={affirmation}
                      onCheckedChange={(checked) => setAffirmation(checked as boolean)}
                      className="mt-0.5"
                      required
                    />
                    <WexLabel
                      htmlFor="affirmation"
                      className="text-sm leading-6 tracking-[-0.084px] text-[#243746] cursor-pointer"
                    >
                      <span className="text-red-600">* </span>I affirm that all information I have provided is true and correct and may be relied upon by the Designated Representative and the HSA Custodian.
                    </WexLabel>
                  </div>

                  {/* Checkbox 2 */}
                  <div className="flex gap-1 items-start">
                    <WexCheckbox
                      id="eligibility"
                      checked={eligibilityUnderstanding}
                      onCheckedChange={(checked) => setEligibilityUnderstanding(checked as boolean)}
                      className="mt-0.5"
                      required
                    />
                    <WexLabel
                      htmlFor="eligibility"
                      className="text-sm leading-6 tracking-[-0.084px] text-[#243746] cursor-pointer"
                    >
                      <span className="text-red-600">* </span>I understand HSA eligibility and am responsible for ensuring I qualify for contributions each year, that contributions stay within legal limits (considering my coverage and deductible), and for understanding the tax implications of contributions and distributions. I will seek professional tax or legal advice for any related questions.
                    </WexLabel>
                  </div>

                  {/* Checkbox 3 */}
                  <div className="flex gap-1 items-start">
                    <WexCheckbox
                      id="documents"
                      checked={documentReceipt}
                      onCheckedChange={(checked) => setDocumentReceipt(checked as boolean)}
                      className="mt-0.5"
                      required
                    />
                    <WexLabel
                      htmlFor="documents"
                      className="text-sm leading-6 tracking-[-0.084px] text-[#243746] cursor-pointer"
                    >
                      <span className="text-red-600">* </span>I confirm receipt of enrollment documents, understand my right to revoke within 7 days, and acknowledge that I haven't received tax or legal advice from the Custodian/Representative. I will seek my own professional advice and hold the Custodian/Representative harmless for my actions.
                    </WexLabel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed at Bottom */}
        <div className="absolute bottom-[32px] left-[32px] right-[32px] flex items-center justify-between">
          <WexButton intent="ghost" onClick={handleCancel} className="px-4 py-2">
            Cancel
          </WexButton>

          <div className="flex gap-2 items-center">
            <WexButton intent="outline" onClick={handleBack} className="px-4 py-2">
              Back
            </WexButton>
            <WexButton 
              intent="primary" 
              onClick={handleSubmit} 
              className="px-4 py-2"
              disabled={!affirmation || !eligibilityUnderstanding || !documentReceipt}
            >
              Submit Enrollment
            </WexButton>
          </div>
        </div>
      </div>
    </div>
  );
}

