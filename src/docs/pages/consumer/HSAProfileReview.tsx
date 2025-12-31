import * as React from "react";
import { useNavigate } from "react-router-dom";
import { WexButton } from "@/components/wex/wex-button";
import { WexFloatLabel } from "@/components/wex/wex-float-label";
import { WexLabel } from "@/components/wex/wex-label";
import { WexRadioGroup } from "@/components/wex/wex-radio-group";
import { WexCheckbox } from "@/components/wex/wex-checkbox";
import { Stepper } from "./components/Stepper";
import type { Step } from "./components/Stepper";
import { cn } from "@/lib/utils";

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

export default function HSAProfileReview() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = React.useState({
    firstName: "Crystal",
    middleName: "",
    lastName: "Smith",
    birthDate: "07/05/1995",
    participantId: "78445225",
    gender: "Female",
    maritalStatus: "married",
    addressLine1: "123 Main Street",
    addressLine2: "",
    city: "Anytown",
    state: "NY",
    zipCode: "10011",
    mailingAddressSame: true,
    homePhone: "+1 212 555 4567",
    email: "useremail@email.com",
    confirmEmail: "useremail@email.com",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMaritalStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, maritalStatus: value }));
  };

  const handleMailingAddressChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, mailingAddressSame: checked }));
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleBack = () => {
    navigate("/hsa-enrollment/results");
  };

  const handleContinue = () => {
    navigate("/hsa-enrollment/dependents");
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
            currentStepId="profile"
            onStepChange={() => {
              // Step navigation disabled for now
            }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="flex justify-center pt-14 px-8">
            <div className="w-[362px] flex flex-col gap-12">
              {/* Profile Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold leading-8 tracking-[-0.456px] text-black">
                  Review your profile
                </h2>
                <p className="text-base font-normal leading-6 tracking-[-0.176px] text-[#243746]">
                  All fields must be completed. If you need to update any information please contact the administrator
                </p>

                {/* Profile Fields */}
                <div className="flex flex-col gap-4">
                  {/* First Name */}
                  <WexFloatLabel
                    label="First Name"
                    size="lg"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />

                  {/* Middle Name - NOT required */}
                  <WexFloatLabel
                    label="Middle Name"
                    size="lg"
                    value={formData.middleName}
                    onChange={(e) => handleInputChange("middleName", e.target.value)}
                  />

                  {/* Last Name */}
                  <WexFloatLabel
                    label="Last Name"
                    size="lg"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />

                  {/* Birth Date */}
                  <WexFloatLabel
                    label="Birth Date"
                    size="lg"
                    type="text"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    required
                  />

                  {/* Participant Account ID */}
                  <WexFloatLabel
                    label="Participant Account ID"
                    size="lg"
                    value={formData.participantId}
                    onChange={(e) => handleInputChange("participantId", e.target.value)}
                    required
                  />

                  {/* Gender */}
                  <WexFloatLabel
                    label="Gender"
                    size="lg"
                    value={formData.gender}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    required
                  />

                  {/* Marital Status */}
                  <div className="flex items-center gap-3 h-6 mt-2">
                    <span className="text-base leading-6 tracking-[0.32px] text-[#515f6b]">
                      Marital Status:
                    </span>
                    <WexRadioGroup 
                      value={formData.maritalStatus} 
                      onValueChange={handleMaritalStatusChange}
                      className="flex gap-3"
                    >
                      <div className="flex items-center gap-1">
                        <WexRadioGroup.Item value="married" id="married" />
                        <WexLabel htmlFor="married" className="text-sm leading-6 tracking-[-0.084px] text-[#243746]">
                          Married
                        </WexLabel>
                      </div>
                      <div className="flex items-center gap-1">
                        <WexRadioGroup.Item value="single" id="single" />
                        <WexLabel htmlFor="single" className="text-sm leading-6 tracking-[-0.084px] text-[#243746]">
                          Single
                        </WexLabel>
                      </div>
                    </WexRadioGroup>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold leading-8 tracking-[-0.456px] text-black">
                  Contact Information
                </h2>

                {/* Contact Fields */}
                <div className="flex flex-col gap-4">
                  {/* Address Line 1 */}
                  <WexFloatLabel
                    label="Address Line 1"
                    size="lg"
                    value={formData.addressLine1}
                    onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                    required
                  />

                  {/* Address Line 2 - NOT required */}
                  <WexFloatLabel
                    label="Address Line 2"
                    size="lg"
                    value={formData.addressLine2}
                    onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                  />

                  {/* City */}
                  <WexFloatLabel
                    label="City"
                    size="lg"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />

                  {/* State */}
                  <WexFloatLabel
                    label="State"
                    size="lg"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    required
                  />

                  {/* Zip Code */}
                  <WexFloatLabel
                    label="Zip Code"
                    size="lg"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    required
                  />

                  {/* Mailing Address Checkbox */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base leading-6 tracking-[0.32px] text-[#515f6b]">
                      Mailing Address:
                    </span>
                    <div className="flex items-center gap-1">
                      <WexCheckbox
                        checked={formData.mailingAddressSame}
                        onCheckedChange={handleMailingAddressChange}
                      />
                      <WexLabel htmlFor="mailing-address" className="text-sm leading-6 tracking-[-0.084px] text-[#243746]">
                        Same as Home Address
                      </WexLabel>
                    </div>
                  </div>

                  {/* Home Phone */}
                  <WexFloatLabel
                    label="Home Phone"
                    size="lg"
                    type="tel"
                    value={formData.homePhone}
                    onChange={(e) => handleInputChange("homePhone", e.target.value)}
                    required
                  />

                  {/* Email Address */}
                  <WexFloatLabel
                    label="Email Address"
                    size="lg"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />

                  {/* Confirm Email Address */}
                  <WexFloatLabel
                    label="Confirm Email Address"
                    size="lg"
                    type="email"
                    value={formData.confirmEmail}
                    onChange={(e) => handleInputChange("confirmEmail", e.target.value)}
                    required
                  />
                </div>

                {/* Email Notice */}
                <p className="text-sm leading-[22px] tracking-[0.28px] text-[#7c858e]">
                  You will receive communications electronically about your benefits in lieu of paper documents. Your email address will not be shared or used for any other purpose.
                </p>
              </div>
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
              Save & Continue
            </WexButton>
          </div>
        </div>
      </div>
    </div>
  );
}

