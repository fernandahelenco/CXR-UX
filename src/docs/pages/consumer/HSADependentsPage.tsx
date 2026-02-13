import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { WexButton } from "@/components/wex/wex-button";
import { WexFloatLabel } from "@/components/wex/wex-float-label";
import { WexLabel } from "@/components/wex/wex-label";
import { WexRadioGroup } from "@/components/wex/wex-radio-group";
import { WexSelect } from "@/components/wex/wex-select";
import { QuestionOptionCard } from "./components/QuestionOptionCard";

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

  React.useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/7aa8f91a-0aaf-498c-a001-87600c3e0184',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HSADependentsPage.tsx:74',message:'showForm changed',data:{hasDependents,showForm},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H2'})}).catch(()=>{});
    // #endregion agent log
  }, [hasDependents, showForm]);

  React.useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/7aa8f91a-0aaf-498c-a001-87600c3e0184',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HSADependentsPage.tsx:80',message:'dependents updated',data:{dependentsCount:dependents.length,canRemove},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H3'})}).catch(()=>{});
    // #endregion agent log
  }, [dependents.length, canRemove]);

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/7aa8f91a-0aaf-498c-a001-87600c3e0184',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HSADependentsPage.tsx:72',message:'render start',data:{hasDependents,dependentsCount:dependents.length,showForm,canRemove},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H1'})}).catch(()=>{});
  // #endregion agent log

  return (
    <div className="flex flex-1 flex-col items-center pt-14 pb-16 px-8">
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
                                variant="ghost"
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
                            variant="ghost"
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
                    variant="ghost"
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
  );
}

