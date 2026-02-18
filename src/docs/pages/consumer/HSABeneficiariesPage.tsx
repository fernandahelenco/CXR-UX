import * as React from "react";
import { Plus, Trash2, Info } from "lucide-react";
import { WexButton } from "@/components/wex/wex-button";
import { WexFloatLabel } from "@/components/wex/wex-float-label";
import { WexLabel } from "@/components/wex/wex-label";
import { WexRadioGroup } from "@/components/wex/wex-radio-group";
import { WexSelect } from "@/components/wex/wex-select";
import { WexCheckbox } from "@/components/wex/wex-checkbox";
import { QuestionOptionCard } from "./components/QuestionOptionCard";

/**
 * Beneficiary data structure
 */
interface Beneficiary {
  id: string;
  type: "existing_dependent" | "new";
  // For existing dependents
  dependentId?: string;
  dependentName?: string;
  // For new beneficiaries
  firstName?: string;
  middleName?: string;
  lastName?: string;
  ssn?: string;
  birthDate?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  relationship?: string;
  // Common fields
  sharePercentage: string;
  beneficiaryType: "Primary" | "Contingent" | "";
}

/**
 * Dependent data structure (for selection)
 */
interface Dependent {
  id: string;
  name: string;
}

export default function HSABeneficiariesPage() {
  // Mock dependents data - in real app, this would come from previous page or context
  const availableDependents: Dependent[] = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Sarah Doe" },
  ];

  // State
  const [hasBeneficiaries, setHasBeneficiaries] = React.useState<string | null>(null);
  const [selectedDependentIds, setSelectedDependentIds] = React.useState<Set<string>>(new Set());
  const [dependentBeneficiaries, setDependentBeneficiaries] = React.useState<Map<string, Partial<Beneficiary>>>(new Map());
  const [newBeneficiaries, setNewBeneficiaries] = React.useState<Beneficiary[]>([]);
  const [validationError, setValidationError] = React.useState<string>("");

  // Handle dependent checkbox toggle
  const handleDependentToggle = (dependentId: string, dependentName: string) => {
    const newSelected = new Set(selectedDependentIds);
    const newBeneficiaries = new Map(dependentBeneficiaries);
    
    if (newSelected.has(dependentId)) {
      newSelected.delete(dependentId);
      newBeneficiaries.delete(dependentId);
    } else {
      newSelected.add(dependentId);
      newBeneficiaries.set(dependentId, {
        id: dependentId,
        type: "existing_dependent",
        dependentId,
        dependentName,
        sharePercentage: "",
        beneficiaryType: "",
      });
    }
    
    setSelectedDependentIds(newSelected);
    setDependentBeneficiaries(newBeneficiaries);
  };

  // Update dependent beneficiary field
  const handleDependentBeneficiaryChange = (
    dependentId: string,
    field: keyof Beneficiary,
    value: string
  ) => {
    const newBeneficiaries = new Map(dependentBeneficiaries);
    const current = newBeneficiaries.get(dependentId) || {};
    newBeneficiaries.set(dependentId, { ...current, [field]: value });
    setDependentBeneficiaries(newBeneficiaries);
  };

  // Add new beneficiary
  const handleAddNewBeneficiary = () => {
    setNewBeneficiaries((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "new",
        firstName: "",
        middleName: "",
        lastName: "",
        ssn: "",
        birthDate: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        relationship: "",
        sharePercentage: "",
        beneficiaryType: "",
      },
    ]);
  };

  // Remove new beneficiary
  const handleRemoveNewBeneficiary = (index: number) => {
    setNewBeneficiaries((prev) => prev.filter((_, i) => i !== index));
  };

  // Update new beneficiary field
  const handleNewBeneficiaryChange = (
    index: number,
    field: keyof Beneficiary,
    value: string
  ) => {
    setNewBeneficiaries((prev) =>
      prev.map((ben, i) => (i === index ? { ...ben, [field]: value } : ben))
    );
  };

  // Validate share percentages
  const validateSharePercentages = React.useCallback((): void => {
    if (hasBeneficiaries !== "yes") {
      setValidationError("");
      return;
    }

    let total = 0;

    // Add dependent beneficiaries
    dependentBeneficiaries.forEach((ben) => {
      const percentage = parseFloat(ben.sharePercentage || "0");
      total += percentage;
    });

    // Add new beneficiaries
    newBeneficiaries.forEach((ben) => {
      const percentage = parseFloat(ben.sharePercentage || "0");
      total += percentage;
    });

    if (total !== 100) {
      setValidationError(`Share percentages must total 100%. Current total: ${total}%`);
      return;
    }

    setValidationError("");
  }, [dependentBeneficiaries, newBeneficiaries, hasBeneficiaries]);

  React.useEffect(() => {
    validateSharePercentages();
  }, [validateSharePercentages]);

  const showForm = hasBeneficiaries === "yes";
  const canRemoveNewBeneficiary = newBeneficiaries.length > 1;

  return (
    <div className="flex flex-1 flex-col items-center pt-14 pb-16 px-8">
      <div className="w-[362px] flex flex-col gap-12">
              {/* Question Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold leading-8 tracking-[-0.456px] text-black">
                  Do you have Beneficiaries?
                </h2>

                {/* Info text */}
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-[#1d2c38]" />
                  <p className="text-sm leading-6 tracking-[-0.084px] text-[#515f6b]">
                    Why you may designate a beneficiary for your HSA?
                  </p>
                </div>

                {/* Yes/No Options */}
                <div className="flex flex-col gap-4">
                  <QuestionOptionCard
                    option="Yes"
                    selected={hasBeneficiaries === "yes"}
                    onSelect={() => setHasBeneficiaries("yes")}
                  />
                  <QuestionOptionCard
                    option="No"
                    selected={hasBeneficiaries === "no"}
                    onSelect={() => setHasBeneficiaries("no")}
                  />
                </div>
              </div>

              {/* Beneficiaries Form - Only show if Yes is selected */}
              {showForm && (
                <>
                  {/* Section A: Select Existing Dependents */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-base font-semibold leading-[22px] tracking-[0.32px] text-black">
                      Select an existing dependent
                    </h3>
                    <p className="text-base leading-6 tracking-[-0.176px] text-[#515f6b]">
                      You can select a beneficiary from your dependents or pre-fill the form with the
                      dependent information
                    </p>

                    {/* List of dependents */}
                    <div className="flex flex-col gap-3">
                      {availableDependents.map((dependent) => {
                        const isSelected = selectedDependentIds.has(dependent.id);
                        const beneficiaryData = dependentBeneficiaries.get(dependent.id);

                        return (
                          <div key={dependent.id} className="flex flex-col gap-3">
                            {/* Checkbox */}
                            <div className="flex items-center gap-2">
                              <WexCheckbox
                                id={`dependent-${dependent.id}`}
                                checked={isSelected}
                                onCheckedChange={() =>
                                  handleDependentToggle(dependent.id, dependent.name)
                                }
                              />
                              <WexLabel
                                htmlFor={`dependent-${dependent.id}`}
                                className="text-sm leading-6 tracking-[-0.084px] text-[#243746]"
                              >
                                {dependent.name}
                              </WexLabel>
                            </div>

                            {/* Show additional fields when checked */}
                            {isSelected && (
                              <div className="ml-6 flex flex-col gap-3">
                                {/* Share Percentage */}
                                <div className="relative">
                                  <WexFloatLabel
                                    label="Share Percentage"
                                    size="lg"
                                    value={beneficiaryData?.sharePercentage || ""}
                                    onChange={(e) =>
                                      handleDependentBeneficiaryChange(
                                        dependent.id,
                                        "sharePercentage",
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                  <Info className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1d2c38]" />
                                </div>

                                {/* Type: Primary/Contingent */}
                                <div className="flex items-center gap-3">
                                  <Info className="h-5 w-5 text-[#1d2c38]" />
                                  <span className="text-base leading-6 tracking-[0.32px] text-[#515f6b]">
                                    Type:
                                  </span>
                                  <WexRadioGroup
                                    value={beneficiaryData?.beneficiaryType || ""}
                                    onValueChange={(value) =>
                                      handleDependentBeneficiaryChange(
                                        dependent.id,
                                        "beneficiaryType",
                                        value
                                      )
                                    }
                                    className="flex gap-3"
                                  >
                                    <div className="flex items-center gap-1">
                                      <WexRadioGroup.Item
                                        value="Primary"
                                        id={`type-primary-${dependent.id}`}
                                      />
                                      <WexLabel
                                        htmlFor={`type-primary-${dependent.id}`}
                                        className="text-sm leading-6 tracking-[-0.084px] text-[#243746]"
                                      >
                                        Primary
                                      </WexLabel>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <WexRadioGroup.Item
                                        value="Contingent"
                                        id={`type-contingent-${dependent.id}`}
                                      />
                                      <WexLabel
                                        htmlFor={`type-contingent-${dependent.id}`}
                                        className="text-sm leading-6 tracking-[-0.084px] text-[#243746]"
                                      >
                                        Contingent
                                      </WexLabel>
                                    </div>
                                  </WexRadioGroup>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section B: Add New Beneficiaries */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-base font-semibold leading-[22px] tracking-[0.32px] text-black">
                      Add a new Beneficiary
                    </h3>

                    {/* New beneficiary forms */}
                    {newBeneficiaries.map((beneficiary, index) => (
                      <div key={beneficiary.id} className="flex flex-col gap-4">
                        {index > 0 && (
                          <div className="border-t border-border pt-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-semibold text-[#243746]">
                                New Beneficiary {index + 1}
                              </h4>
                              {canRemoveNewBeneficiary && (
                                <WexButton
                                  variant="ghost"
                                  onClick={() => handleRemoveNewBeneficiary(index)}
                                  className="px-3 py-1 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-1.5" />
                                  Remove
                                </WexButton>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {index === 0 && canRemoveNewBeneficiary && (
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-[#243746]">
                              New Beneficiary 1
                            </h4>
                            <WexButton
                              variant="ghost"
                              onClick={() => handleRemoveNewBeneficiary(index)}
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
                          value={beneficiary.firstName || ""}
                          onChange={(e) =>
                            handleNewBeneficiaryChange(index, "firstName", e.target.value)
                          }
                          required
                        />

                        {/* Middle Name */}
                        <WexFloatLabel
                          label="Middle Name"
                          size="lg"
                          value={beneficiary.middleName || ""}
                          onChange={(e) =>
                            handleNewBeneficiaryChange(index, "middleName", e.target.value)
                          }
                        />

                        {/* Last Name */}
                        <WexFloatLabel
                          label="Last Name"
                          size="lg"
                          value={beneficiary.lastName || ""}
                          onChange={(e) =>
                            handleNewBeneficiaryChange(index, "lastName", e.target.value)
                          }
                          required
                        />

                        {/* Social Security Number */}
                        <WexFloatLabel
                          label="Social Security Number"
                          size="lg"
                          value={beneficiary.ssn || ""}
                          onChange={(e) =>
                            handleNewBeneficiaryChange(index, "ssn", e.target.value)
                          }
                          required
                        />

                        {/* Birth Date */}
                        <WexFloatLabel
                          label="Birth Date"
                          size="lg"
                          type="text"
                          value={beneficiary.birthDate || ""}
                          onChange={(e) =>
                            handleNewBeneficiaryChange(index, "birthDate", e.target.value)
                          }
                          required
                        />

                        {/* Address Line 1 */}
                        <WexFloatLabel
                          label="Address Line 1"
                          size="lg"
                          value={beneficiary.addressLine1 || ""}
                          onChange={(e) =>
                            handleNewBeneficiaryChange(index, "addressLine1", e.target.value)
                          }
                          required
                        />

                        {/* Address Line 2 */}
                        <WexFloatLabel
                          label="Address Line 2"
                          size="lg"
                          value={beneficiary.addressLine2 || ""}
                          onChange={(e) =>
                            handleNewBeneficiaryChange(index, "addressLine2", e.target.value)
                          }
                        />

                        {/* City */}
                        <WexFloatLabel
                          label="City"
                          size="lg"
                          value={beneficiary.city || ""}
                          onChange={(e) =>
                            handleNewBeneficiaryChange(index, "city", e.target.value)
                          }
                          required
                        />

                        {/* State */}
                        <WexSelect
                          value={beneficiary.state || ""}
                          onValueChange={(value) =>
                            handleNewBeneficiaryChange(index, "state", value)
                          }
                          required
                        >
                          <WexSelect.Trigger className="h-16">
                            <WexSelect.Value placeholder="State" />
                          </WexSelect.Trigger>
                          <WexSelect.Content>
                            <WexSelect.Item value="NY">New York</WexSelect.Item>
                            <WexSelect.Item value="CA">California</WexSelect.Item>
                            <WexSelect.Item value="TX">Texas</WexSelect.Item>
                            <WexSelect.Item value="FL">Florida</WexSelect.Item>
                            <WexSelect.Item value="IL">Illinois</WexSelect.Item>
                            {/* Add more states as needed */}
                          </WexSelect.Content>
                        </WexSelect>

                        {/* Zip Code */}
                        <WexFloatLabel
                          label="Zip Code"
                          size="lg"
                          value={beneficiary.zipCode || ""}
                          onChange={(e) =>
                            handleNewBeneficiaryChange(index, "zipCode", e.target.value)
                          }
                          required
                        />

                        {/* Type: Primary/Contingent */}
                        <div className="flex items-center gap-3">
                          <Info className="h-5 w-5 text-[#1d2c38]" />
                          <span className="text-base leading-6 tracking-[0.32px] text-[#515f6b]">
                            Type:
                          </span>
                          <WexRadioGroup
                            value={beneficiary.beneficiaryType || ""}
                            onValueChange={(value) =>
                              handleNewBeneficiaryChange(index, "beneficiaryType", value)
                            }
                            className="flex gap-3"
                          >
                            <div className="flex items-center gap-1">
                              <WexRadioGroup.Item
                                value="Primary"
                                id={`new-type-primary-${index}`}
                              />
                              <WexLabel
                                htmlFor={`new-type-primary-${index}`}
                                className="text-sm leading-6 tracking-[-0.084px] text-[#243746]"
                              >
                                Primary
                              </WexLabel>
                            </div>
                            <div className="flex items-center gap-1">
                              <WexRadioGroup.Item
                                value="Contingent"
                                id={`new-type-contingent-${index}`}
                              />
                              <WexLabel
                                htmlFor={`new-type-contingent-${index}`}
                                className="text-sm leading-6 tracking-[-0.084px] text-[#243746]"
                              >
                                Contingent
                              </WexLabel>
                            </div>
                          </WexRadioGroup>
                        </div>

                        {/* Relationship */}
                        <WexSelect
                          value={beneficiary.relationship || ""}
                          onValueChange={(value) =>
                            handleNewBeneficiaryChange(index, "relationship", value)
                          }
                          required
                        >
                          <WexSelect.Trigger className="h-16">
                            <WexSelect.Value placeholder="Relationship" />
                          </WexSelect.Trigger>
                          <WexSelect.Content>
                            <WexSelect.Item value="spouse">Spouse</WexSelect.Item>
                            <WexSelect.Item value="child">Child</WexSelect.Item>
                            <WexSelect.Item value="parent">Parent</WexSelect.Item>
                            <WexSelect.Item value="sibling">Sibling</WexSelect.Item>
                            <WexSelect.Item value="other">Other</WexSelect.Item>
                          </WexSelect.Content>
                        </WexSelect>

                        {/* Share Percentage */}
                        <div className="relative">
                          <WexFloatLabel
                            label="Share Percentage"
                            size="lg"
                            value={beneficiary.sharePercentage || ""}
                            onChange={(e) =>
                              handleNewBeneficiaryChange(index, "sharePercentage", e.target.value)
                            }
                            required
                          />
                          <Info className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1d2c38]" />
                        </div>
                      </div>
                    ))}

                    {/* Add New Beneficiary Button */}
                    <WexButton
                      variant="ghost"
                      onClick={handleAddNewBeneficiary}
                      className="self-start px-3 py-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add New Beneficiary</span>
                    </WexButton>
                  </div>

                  {/* Validation Error */}
                  {validationError && (
                    <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                      <p className="text-sm text-destructive font-medium">{validationError}</p>
                    </div>
                  )}
                </>
              )}
      </div>
    </div>
  );
}

