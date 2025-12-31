import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { WexButton } from "@/components/wex/wex-button";
import { WexFloatLabel } from "@/components/wex/wex-float-label";
import { WexLabel } from "@/components/wex/wex-label";
import { WexRadioGroup } from "@/components/wex/wex-radio-group";
import { WexSelect } from "@/components/wex/wex-select";
import { Stepper } from "./components/Stepper";
import type { Step } from "./components/Stepper";
import { QuestionOptionCard } from "./components/QuestionOptionCard";
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

/**
 * Dependent data structure
 */
interface Dependent {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  ssn: string;
  birthDate: string;
  gender: string;
  fullTimeStudent: string;
  relationship: string;
}

export default function HSADependentsPage() {
  const navigate = useNavigate();

  // State
  const [hasDependents, setHasDependents] = React.useState<string | null>(null);
  const [dependents, setDependents] = React.useState<Dependent[]>([
    {
      id: "1",
      firstName: "",
      middleName: "",
      lastName: "",
      ssn: "",
      birthDate: "",
      gender: "",
      fullTimeStudent: "no",
      relationship: "",
    },
  ]);

  const handleCancel = () => {
    navigate("/");
  };

  const handleBack = () => {
    navigate("/hsa-enrollment/profile");
  };

  const handleContinue = () => {
    navigate("/hsa-enrollment/beneficiaries");
  };

  const handleDependentChange = (index: number, field: keyof Dependent, value: string) => {
    setDependents((prev) =>
      prev.map((dep, i) => (i === index ? { ...dep, [field]: value } : dep))
    );
  };

  const handleAddDependent = () => {
    setDependents((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        firstName: "",
        middleName: "",
        lastName: "",
        ssn: "",
        birthDate: "",
        gender: "",
        fullTimeStudent: "no",
        relationship: "",
      },
    ]);
  };

  const handleRemoveDependent = (index: number) => {
    setDependents((prev) => prev.filter((_, i) => i !== index));
  };

  const showForm = hasDependents === "yes";
  const canRemove = dependents.length > 1;

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
            currentStepId="dependents"
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
              {/* Question Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold leading-8 tracking-[-0.456px] text-black">
                  Do you have dependents?
                </h2>

                {/* Yes/No Options */}
                <div className="flex flex-col gap-4">
                  <QuestionOptionCard
                    option="Yes"
                    selected={hasDependents === "yes"}
                    onSelect={() => setHasDependents("yes")}
                  />
                  <QuestionOptionCard
                    option="No"
                    selected={hasDependents === "no"}
                    onSelect={() => setHasDependents("no")}
                  />
                </div>
              </div>

              {/* Dependents Form - Only show if Yes is selected */}
              {showForm && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-base font-semibold leading-[22px] tracking-[0.32px] text-black">
                    Add dependent information
                  </h3>

                  {dependents.map((dependent, index) => (
                    <div key={dependent.id} className="flex flex-col gap-4">
                      {index > 0 && (
                        <div className="border-t border-border pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-semibold text-[#243746]">
                              Dependent {index + 1}
                            </h4>
                            {canRemove && (
                              <WexButton
                                intent="ghost"
                                onClick={() => handleRemoveDependent(index)}
                                className="px-3 py-1 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-1.5" />
                                Remove
                              </WexButton>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {index === 0 && canRemove && (
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-[#243746]">
                            Dependent 1
                          </h4>
                          <WexButton
                            intent="ghost"
                            onClick={() => handleRemoveDependent(index)}
                            className="px-3 py-1 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1.5" />
                            Remove
                          </WexButton>
                        </div>
                      )}

                      {/* First Name */}
                      <WexFloatLabel
                        label="First Name"
                        size="lg"
                        value={dependent.firstName}
                        onChange={(e) =>
                          handleDependentChange(index, "firstName", e.target.value)
                        }
                        required
                      />

                      {/* Middle Name */}
                      <WexFloatLabel
                        label="Middle Name"
                        size="lg"
                        value={dependent.middleName}
                        onChange={(e) =>
                          handleDependentChange(index, "middleName", e.target.value)
                        }
                      />

                      {/* Last Name */}
                      <WexFloatLabel
                        label="Last Name"
                        size="lg"
                        value={dependent.lastName}
                        onChange={(e) =>
                          handleDependentChange(index, "lastName", e.target.value)
                        }
                        required
                      />

                      {/* Social Security Number */}
                      <WexFloatLabel
                        label="Social Security Number"
                        size="lg"
                        value={dependent.ssn}
                        onChange={(e) =>
                          handleDependentChange(index, "ssn", e.target.value)
                        }
                        required
                      />

                      {/* Birth Date */}
                      <WexFloatLabel
                        label="Birth Date"
                        size="lg"
                        type="text"
                        value={dependent.birthDate}
                        onChange={(e) =>
                          handleDependentChange(index, "birthDate", e.target.value)
                        }
                        required
                      />

                      {/* Gender */}
                      <WexSelect
                        value={dependent.gender}
                        onValueChange={(value) =>
                          handleDependentChange(index, "gender", value)
                        }
                        required
                      >
                        <WexSelect.Trigger className="h-16">
                          <WexSelect.Value placeholder="Gender" />
                        </WexSelect.Trigger>
                        <WexSelect.Content>
                          <WexSelect.Item value="male">Male</WexSelect.Item>
                          <WexSelect.Item value="female">Female</WexSelect.Item>
                          <WexSelect.Item value="other">Other</WexSelect.Item>
                        </WexSelect.Content>
                      </WexSelect>

                      {/* Full Time Student */}
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-base leading-6 tracking-[0.32px] text-[#515f6b]">
                          Full Time Student:
                        </span>
                        <WexRadioGroup
                          value={dependent.fullTimeStudent}
                          onValueChange={(value) =>
                            handleDependentChange(index, "fullTimeStudent", value)
                          }
                          className="flex gap-3"
                        >
                          <div className="flex items-center gap-1">
                            <WexRadioGroup.Item value="yes" id={`student-yes-${index}`} />
                            <WexLabel
                              htmlFor={`student-yes-${index}`}
                              className="text-sm leading-6 tracking-[-0.084px] text-[#243746]"
                            >
                              Yes
                            </WexLabel>
                          </div>
                          <div className="flex items-center gap-1">
                            <WexRadioGroup.Item value="no" id={`student-no-${index}`} />
                            <WexLabel
                              htmlFor={`student-no-${index}`}
                              className="text-sm leading-6 tracking-[-0.084px] text-[#243746]"
                            >
                              No
                            </WexLabel>
                          </div>
                        </WexRadioGroup>
                      </div>

                      {/* Relationship */}
                      <WexSelect
                        value={dependent.relationship}
                        onValueChange={(value) =>
                          handleDependentChange(index, "relationship", value)
                        }
                        required
                      >
                        <WexSelect.Trigger className="h-16">
                          <WexSelect.Value placeholder="Relationship" />
                        </WexSelect.Trigger>
                        <WexSelect.Content>
                          <WexSelect.Item value="spouse">Spouse</WexSelect.Item>
                          <WexSelect.Item value="child">Child</WexSelect.Item>
                          <WexSelect.Item value="stepchild">Stepchild</WexSelect.Item>
                          <WexSelect.Item value="domestic-partner">Domestic Partner</WexSelect.Item>
                          <WexSelect.Item value="other">Other</WexSelect.Item>
                        </WexSelect.Content>
                      </WexSelect>
                    </div>
                  ))}

                  {/* Add Dependent Button */}
                  <WexButton
                    intent="ghost"
                    onClick={handleAddDependent}
                    className="self-start px-3 py-1"
                  >
                    <Plus className="h-4 w-4 mr-1.5" />
                    Add Dependent
                  </WexButton>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-[32px] left-[32px] right-[32px] flex items-center justify-between">
          {/* Cancel Button */}
          <WexButton intent="ghost" onClick={handleCancel} className="px-4 py-2">
            Cancel
          </WexButton>

          {/* Back and Continue Buttons */}
          <div className="flex gap-2 items-center">
            <WexButton intent="outline" onClick={handleBack} className="px-4 py-2">
              Back
            </WexButton>
            <WexButton intent="primary" onClick={handleContinue} className="px-4 py-2">
              Save & Continue
            </WexButton>
          </div>
        </div>
      </div>
    </div>
  );
}

