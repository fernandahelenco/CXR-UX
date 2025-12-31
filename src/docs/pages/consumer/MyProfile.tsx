import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { WexButton } from "@/components/wex/wex-button";
import { WexAlert } from "@/components/wex/wex-alert";
import { WexEmpty } from "@/components/wex/wex-empty";
import { WexAvatar } from "@/components/wex/wex-avatar";
import { WexSeparator } from "@/components/wex/wex-separator";
import { WexCard } from "@/components/wex/wex-card";
import { WexDialog } from "@/components/wex/wex-dialog";
import { WexAlertDialog } from "@/components/wex/wex-alert-dialog";
import { WexFloatLabel } from "@/components/wex/wex-float-label";
import { WexSelect } from "@/components/wex/wex-select";
import { WexRadioGroup } from "@/components/wex/wex-radio-group";
import { WexLabel } from "@/components/wex/wex-label";
import { WexPopover } from "@/components/wex/wex-popover";
import { WexCalendar } from "@/components/wex/wex-calendar";
import { WexCheckbox } from "@/components/wex";
import { wexToast } from "@/components/wex/wex-toast";
import { Stepper } from "./components/Stepper";
import { ConsumerNavigation } from "./ConsumerNavigation";
import { Pencil, Info, Plus, Calendar, X, Trash2 } from "lucide-react";

type SubPage = "my-profile" | "dependents" | "beneficiaries" | "banking" | "debit-card" | "login-security" | "communication";

type Dependent = {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  ssn: string;
  birthDate: string;
  gender: string;
  isFullTimeStudent: boolean;
  relationship: string;
};

type Beneficiary = {
  id: string;
  firstName: string;
  lastName: string;
  ssn: string;
  birthDate: string;
  relationship: string;
  beneficiaryType: "primary" | "contingent";
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
};

type BankAccount = {
  id: string;
  routingNumber: string;
  accountNumber: string;
  confirmAccountNumber: string;
  accountNickname: string;
  accountType: "checking" | "saving";
  verificationMethod: "text" | "email";
  selectedDirectDepositOptions: string[]; // Array of selected plan years/accounts
};

export default function MyProfile() {
  const personalName = "Emily Rose Smith";
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Dependents state
  const [dependents, setDependents] = useState<Dependent[]>([]);
  
  // Beneficiaries state
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  
  // Banking state
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  
  // Modal state
  const [isAddDependentModalOpen, setIsAddDependentModalOpen] = useState(false);
  const [editingDependentId, setEditingDependentId] = useState<string | null>(null);
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);
  const [dependentToRemove, setDependentToRemove] = useState<Dependent | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // Beneficiary modal state
  const [isAddBeneficiaryModalOpen, setIsAddBeneficiaryModalOpen] = useState(false);
  const [editingBeneficiaryId, setEditingBeneficiaryId] = useState<string | null>(null);
  const [isRemoveBeneficiaryConfirmOpen, setIsRemoveBeneficiaryConfirmOpen] = useState(false);
  const [beneficiaryToRemove, setBeneficiaryToRemove] = useState<Beneficiary | null>(null);
  const [isBeneficiaryCalendarOpen, setIsBeneficiaryCalendarOpen] = useState(false);
  
  // Banking modal state
  const [isAddBankAccountModalOpen, setIsAddBankAccountModalOpen] = useState(false);
  const [editingBankAccountId, setEditingBankAccountId] = useState<string | null>(null);
  const [isRemoveBankAccountConfirmOpen, setIsRemoveBankAccountConfirmOpen] = useState(false);
  const [bankAccountToRemove, setBankAccountToRemove] = useState<BankAccount | null>(null);
  const [bankAccountStep, setBankAccountStep] = useState<string>("step1");
  
  // Form state for dependents
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    ssn: "",
    birthDate: "",
    gender: "",
    isFullTimeStudent: "no",
    relationship: "",
  });
  
  // Form state for beneficiaries
  const [beneficiaryFormData, setBeneficiaryFormData] = useState({
    firstName: "",
    lastName: "",
    ssn: "",
    birthDate: "",
    relationship: "",
    beneficiaryType: "primary",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
  });
  
  // Form state for bank accounts
  const [bankAccountFormData, setBankAccountFormData] = useState({
    verificationMethod: "text" as "text" | "email",
    verificationCode: "",
    // Step 2 fields
    routingNumber: "",
    accountNumber: "",
    confirmAccountNumber: "",
    accountNickname: "",
    accountType: "checking" as "checking" | "saving",
    // Step 3 fields
    selectedDirectDepositOptions: [] as string[],
  });
  
  // Verification code resend timer state
  const [resendTimer, setResendTimer] = useState(0);
  const [showVerificationCode, setShowVerificationCode] = useState(false);

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    const first = parts[0][0] || "";
    const last = parts[parts.length - 1][0] || "";
    return `${first}${last}`.toUpperCase();
  };

  const [activeSubPage, setActiveSubPage] = useState<SubPage>(() => {
    const subPage = searchParams.get("subPage");
    const validSubPages: SubPage[] = ["my-profile", "dependents", "beneficiaries", "banking", "debit-card", "login-security", "communication"];
    if (subPage && validSubPages.includes(subPage as SubPage)) {
      return subPage as SubPage;
    }
    return "my-profile";
  });

  // Sync activeSubPage with URL params
  useEffect(() => {
    const subPage = searchParams.get("subPage");
    const validSubPages: SubPage[] = ["my-profile", "dependents", "beneficiaries", "banking", "debit-card", "login-security", "communication"];
    if (subPage && validSubPages.includes(subPage as SubPage)) {
      setActiveSubPage(subPage as SubPage);
    } else if (!subPage) {
      setActiveSubPage("my-profile");
    }
  }, [searchParams]);

  const handleSubPageChange = (subPage: SubPage) => {
    setActiveSubPage(subPage);
    setSearchParams({ subPage });
  };

  const handleFormChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      ssn: "",
      birthDate: "",
      gender: "",
      isFullTimeStudent: "no",
      relationship: "",
    });
  };

  const handleEditDependent = (dependent: Dependent) => {
    setFormData({
      firstName: dependent.firstName,
      middleName: dependent.middleName || "",
      lastName: dependent.lastName,
      ssn: dependent.ssn,
      birthDate: dependent.birthDate,
      gender: dependent.gender,
      isFullTimeStudent: dependent.isFullTimeStudent ? "yes" : "no",
      relationship: dependent.relationship,
    });
    setEditingDependentId(dependent.id);
    setIsAddDependentModalOpen(true);
  };

  const handleSaveDependent = () => {
    const fullName = `${formData.firstName} ${formData.lastName}`;
    
    if (editingDependentId) {
      // Update existing dependent
      setDependents((prev) =>
        prev.map((dep) =>
          dep.id === editingDependentId
            ? {
                ...dep,
                firstName: formData.firstName,
                middleName: formData.middleName || undefined,
                lastName: formData.lastName,
                ssn: formData.ssn,
                birthDate: formData.birthDate,
                gender: formData.gender,
                isFullTimeStudent: formData.isFullTimeStudent === "yes",
                relationship: formData.relationship,
              }
            : dep
        )
      );
      
      // Show success toast for edit
      wexToast.success("Dependent successfully updated", {
        description: `${fullName}'s information has been updated`,
      });
    } else {
      // Add new dependent
      const newDependent: Dependent = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        middleName: formData.middleName || undefined,
        lastName: formData.lastName,
        ssn: formData.ssn,
        birthDate: formData.birthDate,
        gender: formData.gender,
        isFullTimeStudent: formData.isFullTimeStudent === "yes",
        relationship: formData.relationship,
      };
      setDependents((prev) => [...prev, newDependent]);
      
      // Show success toast for add
      wexToast.success("Dependent successfully added", {
        description: `${fullName} is now a dependent`,
      });
    }
    resetForm();
    setEditingDependentId(null);
    setIsAddDependentModalOpen(false);
  };

  const handleRemoveDependent = (id: string) => {
    const dependent = dependents.find((dep) => dep.id === id);
    const fullName = dependent ? `${dependent.firstName} ${dependent.lastName}` : "Dependent";
    
    setDependents((prev) => prev.filter((dep) => dep.id !== id));
    setIsRemoveConfirmOpen(false);
    setDependentToRemove(null);
    
    // Show success toast for removal
    wexToast.success("Dependent successfully removed", {
      description: `${fullName} has been removed from your dependents`,
    });
  };

  const handleRemoveClick = (dependent: Dependent) => {
    setDependentToRemove(dependent);
    setIsRemoveConfirmOpen(true);
  };

  // Beneficiary handlers
  const handleBeneficiaryFormChange = (field: string, value: string) => {
    setBeneficiaryFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetBeneficiaryForm = () => {
    setBeneficiaryFormData({
      firstName: "",
      lastName: "",
      ssn: "",
      birthDate: "",
      relationship: "",
      beneficiaryType: "primary",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
    });
  };

  const handleEditBeneficiary = (beneficiary: Beneficiary) => {
    setBeneficiaryFormData({
      firstName: beneficiary.firstName,
      lastName: beneficiary.lastName,
      ssn: beneficiary.ssn,
      birthDate: beneficiary.birthDate,
      relationship: beneficiary.relationship,
      beneficiaryType: beneficiary.beneficiaryType,
      addressLine1: beneficiary.addressLine1,
      addressLine2: beneficiary.addressLine2 || "",
      city: beneficiary.city,
      state: beneficiary.state,
      zipCode: beneficiary.zipCode,
    });
    setEditingBeneficiaryId(beneficiary.id);
    setIsAddBeneficiaryModalOpen(true);
  };

  const handleSaveBeneficiary = () => {
    const fullName = `${beneficiaryFormData.firstName} ${beneficiaryFormData.lastName}`;
    
    if (editingBeneficiaryId) {
      // Update existing beneficiary
      setBeneficiaries((prev) =>
        prev.map((ben) =>
          ben.id === editingBeneficiaryId
            ? {
                ...ben,
                firstName: beneficiaryFormData.firstName,
                lastName: beneficiaryFormData.lastName,
                ssn: beneficiaryFormData.ssn,
                birthDate: beneficiaryFormData.birthDate,
                relationship: beneficiaryFormData.relationship,
                beneficiaryType: beneficiaryFormData.beneficiaryType as "primary" | "contingent",
                addressLine1: beneficiaryFormData.addressLine1,
                addressLine2: beneficiaryFormData.addressLine2 || undefined,
                city: beneficiaryFormData.city,
                state: beneficiaryFormData.state,
                zipCode: beneficiaryFormData.zipCode,
              }
            : ben
        )
      );
      
      // Show success toast for edit
      wexToast.success("Beneficiary successfully updated", {
        description: `${fullName}'s information has been updated`,
      });
    } else {
      // Add new beneficiary
      const newBeneficiary: Beneficiary = {
        id: Date.now().toString(),
        firstName: beneficiaryFormData.firstName,
        lastName: beneficiaryFormData.lastName,
        ssn: beneficiaryFormData.ssn,
        birthDate: beneficiaryFormData.birthDate,
        relationship: beneficiaryFormData.relationship,
        beneficiaryType: beneficiaryFormData.beneficiaryType as "primary" | "contingent",
        addressLine1: beneficiaryFormData.addressLine1,
        addressLine2: beneficiaryFormData.addressLine2 || undefined,
        city: beneficiaryFormData.city,
        state: beneficiaryFormData.state,
        zipCode: beneficiaryFormData.zipCode,
      };
      setBeneficiaries((prev) => [...prev, newBeneficiary]);
      
      // Show success toast for add
      wexToast.success("Beneficiary successfully added", {
        description: `${fullName} is now a beneficiary`,
      });
    }
    resetBeneficiaryForm();
    setEditingBeneficiaryId(null);
    setIsAddBeneficiaryModalOpen(false);
  };

  const handleRemoveBeneficiaryClick = (beneficiary: Beneficiary) => {
    setBeneficiaryToRemove(beneficiary);
    setIsRemoveBeneficiaryConfirmOpen(true);
  };

  const handleRemoveBeneficiary = (id: string) => {
    const beneficiary = beneficiaries.find((ben) => ben.id === id);
    const fullName = beneficiary ? `${beneficiary.firstName} ${beneficiary.lastName}` : "Beneficiary";
    
    setBeneficiaries((prev) => prev.filter((ben) => ben.id !== id));
    setIsRemoveBeneficiaryConfirmOpen(false);
    setBeneficiaryToRemove(null);
    
    // Show success toast for removal
    wexToast.success("Beneficiary successfully removed", {
      description: `${fullName} has been removed from your beneficiaries`,
    });
  };

  // Bank account handlers
  const handleBankAccountFormChange = (field: string, value: string) => {
    setBankAccountFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBankAccountNext = () => {
    if (bankAccountStep === "step1") {
      setBankAccountStep("step2");
    } else if (bankAccountStep === "step2") {
      // Ensure selectedDirectDepositOptions is initialized before moving to step 3
      setBankAccountFormData((prev) => ({
        ...prev,
        selectedDirectDepositOptions: prev.selectedDirectDepositOptions || [],
      }));
      setBankAccountStep("step3");
    }
  };

  const handleBankAccountBack = () => {
    if (bankAccountStep === "step2") {
      setBankAccountStep("step1");
    } else if (bankAccountStep === "step3") {
      setBankAccountStep("step2");
    }
  };

  const handleSaveBankAccount = () => {
    // This will be called on step 3 completion
    const newBankAccount: BankAccount = {
      id: editingBankAccountId || Date.now().toString(),
      routingNumber: bankAccountFormData.routingNumber,
      accountNumber: bankAccountFormData.accountNumber,
      confirmAccountNumber: bankAccountFormData.confirmAccountNumber,
      accountNickname: bankAccountFormData.accountNickname,
      accountType: bankAccountFormData.accountType,
      verificationMethod: bankAccountFormData.verificationMethod,
      selectedDirectDepositOptions: bankAccountFormData.selectedDirectDepositOptions || [],
    };
    
    if (editingBankAccountId) {
      setBankAccounts((prev) =>
        prev.map((acc) =>
          acc.id === editingBankAccountId
            ? { ...newBankAccount, id: acc.id }
            : acc
        )
      );
      const accountName = bankAccountFormData.accountNickname || `${bankAccountFormData.accountType.charAt(0).toUpperCase() + bankAccountFormData.accountType.slice(1)} Account`;
      wexToast.success("Bank account successfully updated", {
        description: `${accountName}'s information has been updated`,
      });
    } else {
      setBankAccounts((prev) => [...prev, newBankAccount]);
      const accountName = bankAccountFormData.accountNickname || `${bankAccountFormData.accountType.charAt(0).toUpperCase() + bankAccountFormData.accountType.slice(1)} Account`;
      wexToast.success("Bank account successfully added", {
        description: `${accountName} has been added`,
      });
    }
    
    setIsAddBankAccountModalOpen(false);
    setBankAccountStep("step1");
    setEditingBankAccountId(null);
    setShowVerificationCode(false);
  };

  const handleEditBankAccount = (bankAccount: BankAccount) => {
    setBankAccountFormData({
      verificationMethod: bankAccount.verificationMethod,
      verificationCode: "",
      routingNumber: bankAccount.routingNumber,
      accountNumber: bankAccount.accountNumber,
      confirmAccountNumber: bankAccount.accountNumber, // Pre-fill with account number for editing
      accountNickname: bankAccount.accountNickname,
      accountType: bankAccount.accountType,
      selectedDirectDepositOptions: bankAccount.selectedDirectDepositOptions || [],
    });
    setEditingBankAccountId(bankAccount.id);
    setIsAddBankAccountModalOpen(true);
    setBankAccountStep("step2"); // Start at step 2 when editing
    setShowVerificationCode(false);
  };

  const handleRemoveBankAccountClick = (bankAccount: BankAccount) => {
    setBankAccountToRemove(bankAccount);
    setIsRemoveBankAccountConfirmOpen(true);
  };

  const handleRemoveBankAccount = (id: string) => {
    const bankAccount = bankAccounts.find((acc) => acc.id === id);
    const accountName = bankAccount 
      ? (bankAccount.accountNickname || `${bankAccount.accountType.charAt(0).toUpperCase() + bankAccount.accountType.slice(1)} Account`)
      : "Bank account";
    
    setBankAccounts((prev) => prev.filter((acc) => acc.id !== id));
    setIsRemoveBankAccountConfirmOpen(false);
    setBankAccountToRemove(null);
    
    // Show success toast for removal
    wexToast.success("Bank account successfully removed", {
      description: `${accountName} has been removed from your accounts`,
    });
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "Not provided";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // US States list for dropdown
  const usStates = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  // Reset form when modal closes (only if not editing)
  useEffect(() => {
    if (!isAddDependentModalOpen && !editingDependentId) {
      resetForm();
      setEditingDependentId(null);
    }
  }, [isAddDependentModalOpen, editingDependentId]);

  // Reset beneficiary form when modal closes (only if not editing)
  useEffect(() => {
    if (!isAddBeneficiaryModalOpen && !editingBeneficiaryId) {
      resetBeneficiaryForm();
      setEditingBeneficiaryId(null);
    }
  }, [isAddBeneficiaryModalOpen, editingBeneficiaryId]);

  // Reset bank account form and step when modal closes
  useEffect(() => {
    if (!isAddBankAccountModalOpen) {
      setBankAccountFormData({
        verificationMethod: "text",
        verificationCode: "",
        routingNumber: "",
        accountNumber: "",
        confirmAccountNumber: "",
        accountNickname: "",
        accountType: "checking",
        selectedDirectDepositOptions: [],
      });
      setBankAccountStep("step1");
      setEditingBankAccountId(null);
      setShowVerificationCode(false);
      setResendTimer(0);
    }
  }, [isAddBankAccountModalOpen]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Start timer when verification code is shown
  useEffect(() => {
    if (showVerificationCode && resendTimer === 0) {
      setResendTimer(45); // 45 seconds
    }
  }, [showVerificationCode]);

  const menuItems: { label: string; key: SubPage }[] = [
    { label: "My Profile", key: "my-profile" },
    { label: "Dependents", key: "dependents" },
    { label: "Beneficiaries", key: "beneficiaries" },
    { label: "Banking", key: "banking" },
    { label: "Debit Card", key: "debit-card" },
    { label: "Login & Security", key: "login-security" },
    { label: "Communication Preferences", key: "communication" },
  ];

  const renderContent = (subPage: SubPage) => {
    switch (subPage) {
      case "my-profile":
        return (
          <>
            {/* Page Header with Avatar */}
            <div className="p-4">
              <div className="flex items-center gap-3">
                <WexAvatar className="h-10 w-10">
                  <WexAvatar.Fallback className="text-base font-medium bg-gray-200">
                    {getInitials(personalName)}
                  </WexAvatar.Fallback>
                </WexAvatar>
                <h2 className="text-2xl font-semibold text-gray-800">My profile</h2>
              </div>
              <WexSeparator className="mt-4" />
            </div>

            {/* Info Banner */}
            <div className="px-6 py-6">
              <WexAlert intent="info" className="border border-[#bfdbfe] bg-[rgba(239,246,255,0.95)] shadow-[0px_4px_8px_0px_rgba(2,5,10,0.04)] rounded-md px-[10.5px] py-[7px] [&>svg]:h-4 [&>svg]:w-4 gap-[7px]">
                <Info className="h-4 w-4 text-[#0058a3]" />
                <WexAlert.Description className="text-[#0058a3] text-base leading-6 tracking-[-0.176px] m-0 whitespace-normal inline">
                  Certain profile information is managed by your organization to keep records consistent and secure. If you notice something incorrect or need an update, please contact your administrator.
                </WexAlert.Description>
              </WexAlert>
            </div>

            <div className="space-y-0">
              {/* Personal Information Section */}
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Personal Information</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Edit
                  </WexButton>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{personalName}</p>
                  </div>
                  <div className="flex gap-1.5 text-sm">
                    <span className="text-gray-500">Date of birth:</span>
                    <span className="text-gray-800">12/13/1989</span>
                  </div>
                  <div className="flex gap-1.5 text-sm">
                    <span className="text-gray-500">Gender:</span>
                    <span className="text-gray-800">Female</span>
                  </div>
                  <div className="flex gap-1.5 text-sm">
                    <span className="text-gray-500">Marital Status:</span>
                    <span className="text-gray-800">Single</span>
                  </div>
                </div>
              </div>

              <WexSeparator />

              {/* Contact Information Section */}
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Contact Information</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Edit
                  </WexButton>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Primary email address:</span>
                    <span className="text-gray-800">emily.grace@email.com</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Secondary email address:</span>
                    <span className="text-gray-800">emily.grace2@email.com</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Mobile Number:</span>
                    <span className="text-gray-800">+1 (859) 123-12345</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Home Number:</span>
                    <span className="text-gray-800">+1 (859) 123-12345</span>
                  </div>
                </div>
              </div>

              <WexSeparator />

              {/* Address Information Section */}
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Address Information</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Edit
                  </WexButton>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Home Address:</span>
                    <span className="text-gray-800">123 Main Street</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">City:</span>
                    <span className="text-gray-800">Anytown</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Province/State:</span>
                    <span className="text-gray-800">NY</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Zip Code:</span>
                    <span className="text-gray-800">123456</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Country:</span>
                    <span className="text-gray-800">United States</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Mailing Address:</span>
                    <span className="text-gray-800">The same as my home address</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "dependents":
        return (
          <>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Dependents</h2>
                <WexButton
                  intent="outline"
                  className="border-[#0058a3] text-[#0058a3] hover:bg-blue-50"
                  onClick={() => {
                    resetForm();
                    setEditingDependentId(null);
                    setIsAddDependentModalOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Dependent
                </WexButton>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            {dependents.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-8 py-16">
                <WexEmpty className="border-0 py-12">
                  <WexEmpty.Header>
                    <WexEmpty.Media variant="default">
                      <img 
                        src="/empty-state-illustration.svg" 
                        alt="" 
                        className="h-[191px] w-[235px]"
                      />
                    </WexEmpty.Media>
                    <WexEmpty.Title className="text-base font-normal text-[#243746]">
                      You have no dependents added yet
                    </WexEmpty.Title>
                  </WexEmpty.Header>
                </WexEmpty>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {dependents.map((dependent) => (
                  <div key={dependent.id} className="border-b border-[#e4e6e9] pb-4 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-[#243746] mb-2">
                          {dependent.firstName} {dependent.middleName ? `${dependent.middleName} ` : ""}{dependent.lastName}
                        </h3>
                        <div className="space-y-1 text-sm text-[#243746]">
                          <div className="flex gap-1.5">
                            <span className="text-gray-500">Date of Birth:</span>
                            <span>{formatDate(dependent.birthDate)}</span>
                          </div>
                          <div className="flex gap-1.5">
                            <span className="text-gray-500">Full Time Student:</span>
                            <span>{dependent.isFullTimeStudent ? "Yes" : "No"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <WexButton
                          intent="ghost"
                          size="sm"
                          className="text-[#0058a3] hover:bg-blue-50"
                          onClick={() => handleEditDependent(dependent)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </WexButton>
                        <WexButton
                          intent="ghost"
                          size="sm"
                          className="text-[#d23f57] hover:bg-red-50"
                          onClick={() => handleRemoveClick(dependent)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </WexButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        );

      case "beneficiaries":
        return (
          <>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Beneficiaries</h2>
                <WexButton
                  intent="outline"
                  className="border-[#0058a3] text-[#0058a3] hover:bg-blue-50"
                  onClick={() => {
                    resetBeneficiaryForm();
                    setEditingBeneficiaryId(null);
                    setIsAddBeneficiaryModalOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Beneficiary
                </WexButton>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            {beneficiaries.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-8 py-16">
                <WexEmpty className="border-0 py-12">
                  <WexEmpty.Header>
                    <WexEmpty.Media variant="default">
                      <img 
                        src="/empty-state-illustration.svg" 
                        alt="" 
                        className="h-[191px] w-[235px]"
                      />
                    </WexEmpty.Media>
                    <WexEmpty.Title className="text-base font-normal text-[#243746]">
                      You have no beneficiaries added yet
                    </WexEmpty.Title>
                  </WexEmpty.Header>
                </WexEmpty>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {beneficiaries.map((beneficiary) => (
                  <div key={beneficiary.id} className="border-b border-[#e4e6e9] pb-4 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-[#243746] mb-2">
                          {beneficiary.firstName} {beneficiary.lastName}
                        </h3>
                        <div className="space-y-1 text-sm text-[#243746]">
                          <div className="flex gap-1.5">
                            <span className="text-gray-500">Type:</span>
                            <span className="capitalize">{beneficiary.beneficiaryType}</span>
                          </div>
                          <div className="flex gap-1.5">
                            <span className="text-gray-500">Relationship:</span>
                            <span>{beneficiary.relationship}</span>
                          </div>
                          <div className="flex gap-1.5">
                            <span className="text-gray-500">Address:</span>
                            <span>{beneficiary.addressLine1}, {beneficiary.city}, {beneficiary.state} {beneficiary.zipCode}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <WexButton
                          intent="ghost"
                          size="sm"
                          className="text-[#0058a3] hover:bg-blue-50"
                          onClick={() => handleEditBeneficiary(beneficiary)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </WexButton>
                        <WexButton
                          intent="ghost"
                          size="sm"
                          className="text-[#d23f57] hover:bg-red-50"
                          onClick={() => handleRemoveBeneficiaryClick(beneficiary)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </WexButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        );

      case "banking":
        return (
          <>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Banking</h2>
                <WexButton
                  intent="outline"
                  className="border-[#0058a3] text-[#0058a3] hover:bg-blue-50"
                  onClick={() => {
                    setBankAccountFormData({
                      verificationMethod: "text",
                      accountType: "",
                      accountNumber: "",
                      routingNumber: "",
                      bankName: "",
                      accountHolderName: "",
                    });
                    setBankAccountStep("step1");
                    setEditingBankAccountId(null);
                    setIsAddBankAccountModalOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Bank Account
                </WexButton>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            {bankAccounts.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-8 py-16">
                <WexEmpty className="border-0 py-12">
                  <WexEmpty.Header>
                    <WexEmpty.Media variant="default">
                      <img 
                        src="/empty-state-illustration.svg" 
                        alt="" 
                        className="h-[191px] w-[235px]"
                      />
                    </WexEmpty.Media>
                    <WexEmpty.Title className="text-base font-normal text-[#243746]">
                      You have no bank accounts added yet
                    </WexEmpty.Title>
                  </WexEmpty.Header>
                </WexEmpty>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {bankAccounts.map((bankAccount) => (
                  <div key={bankAccount.id} className="border-b border-[#e4e6e9] pb-4 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-[#243746] mb-2">
                          {bankAccount.accountNickname || `${bankAccount.accountType.charAt(0).toUpperCase() + bankAccount.accountType.slice(1)} Account`}
                        </h3>
                        <div className="space-y-1 text-sm text-[#243746]">
                          <div className="flex gap-1.5">
                            <span className="text-gray-500">Account Type:</span>
                            <span className="capitalize">{bankAccount.accountType}</span>
                          </div>
                          <div className="flex gap-1.5">
                            <span className="text-gray-500">Account Number:</span>
                            <span>****{bankAccount.accountNumber.slice(-4)}</span>
                          </div>
                          <div className="flex gap-1.5">
                            <span className="text-gray-500">Routing Number:</span>
                            <span>****{bankAccount.routingNumber.slice(-4)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <WexButton
                          intent="ghost"
                          size="sm"
                          className="text-[#0058a3] hover:bg-blue-50"
                          onClick={() => handleEditBankAccount(bankAccount)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </WexButton>
                        <WexButton
                          intent="ghost"
                          size="sm"
                          className="text-[#d23f57] hover:bg-red-50"
                          onClick={() => handleRemoveBankAccountClick(bankAccount)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </WexButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        );

      case "debit-card":
        return (
          <>
            <div className="p-4">
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Debit Card</h2>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center justify-center rounded-lg p-8">
                <WexEmpty className="border-0 py-12">
                  <WexEmpty.Header>
                    <WexEmpty.Media variant="default">
                      <img 
                        src="/empty-state-illustration.svg" 
                        alt="" 
                        className="h-[191px] w-[235px]"
                      />
                    </WexEmpty.Media>
                    <WexEmpty.Title className="text-base font-normal text-[#243746]">
                      No debit card information available
                    </WexEmpty.Title>
                  </WexEmpty.Header>
                </WexEmpty>
              </div>
            </div>
          </>
        );

      case "login-security":
        return (
          <>
            <div className="p-4">
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Login & Security</h2>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            <div className="space-y-0">
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Password</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Change Password
                  </WexButton>
                </div>
                <p className="text-sm text-gray-600">Last updated: 3 months ago</p>
              </div>
              <WexSeparator />
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Two-Factor Authentication</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Manage
                  </WexButton>
                </div>
                <p className="text-sm text-gray-600">Status: Not enabled</p>
              </div>
              <WexSeparator />
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Security Questions</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Update
                  </WexButton>
                </div>
                <p className="text-sm text-gray-600">3 security questions configured</p>
              </div>
            </div>
          </>
        );

      case "communication":
        return (
          <>
            <div className="p-4">
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Communication Preferences</h2>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            <div className="space-y-0">
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Email Preferences</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Edit
                  </WexButton>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Account notifications</span>
                    <span className="text-gray-500">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Marketing emails</span>
                    <span className="text-gray-500">Disabled</span>
                  </div>
                </div>
              </div>
              <WexSeparator />
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">SMS Preferences</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Edit
                  </WexButton>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Transaction alerts</span>
                    <span className="text-gray-500">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Security alerts</span>
                    <span className="text-gray-500">Enabled</span>
                  </div>
                </div>
              </div>
              <WexSeparator />
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Push Notifications</h3>
                  <WexButton intent="ghost" size="sm">
                    <Pencil />
                    Edit
                  </WexButton>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Mobile app notifications</span>
                    <span className="text-gray-500">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F1FAFE]">
      <ConsumerNavigation />

      {/* Main Content */}
      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="mx-auto max-w-[1376px]">
          {/* Page Header */}
          <div className="mb-8 flex items-center">
            <h1 className="text-2xl font-semibold text-gray-800">My Account</h1>
          </div>

          <div className="flex gap-0">
            {/* Left Sidebar */}
            <WexCard className="w-[260px] rounded-l-2xl rounded-r-none border-r-0">
              <WexCard.Content className="px-4 py-6">
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <WexButton
                      key={item.key}
                      intent={activeSubPage === item.key ? "primary" : "ghost"}
                      size="md"
                      onClick={() => handleSubPageChange(item.key)}
                      className="w-full justify-start text-left whitespace-normal h-auto min-h-[44px] py-2"
                    >
                      {item.label}
                    </WexButton>
                  ))}
                </div>
              </WexCard.Content>
            </WexCard>

            {/* Main Content Area */}
            <WexCard className="flex-1 rounded-r-2xl rounded-l-none border-l-0">
              <WexCard.Content className="p-0">
                {renderContent(activeSubPage)}
              </WexCard.Content>
            </WexCard>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-4">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <WexButton intent="ghost" className="h-auto p-0 text-sm text-gray-500">
              Copyright
            </WexButton>
            <span>•</span>
            <WexButton intent="ghost" className="h-auto p-0 text-sm text-gray-500">
              Disclaimer
            </WexButton>
            <span>•</span>
            <WexButton intent="ghost" className="h-auto p-0 text-sm text-gray-500">
              Privacy Policy
            </WexButton>
            <span>•</span>
            <WexButton intent="ghost" className="h-auto p-0 text-sm text-gray-500">
              Terms of Use
            </WexButton>
          </div>
          <p className="mt-2 text-center text-sm text-gray-500">
            WEX Health Inc. 2004-2026. All rights reserved. Powered by WEX Health.
          </p>
        </div>
      </footer>

      {/* Add New Dependent Modal */}
      <WexDialog open={isAddDependentModalOpen} onOpenChange={setIsAddDependentModalOpen}>
        <WexDialog.Content className="w-[448px] p-0 [&>div:last-child]:hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-[17.5px]">
            <WexDialog.Title className="text-base font-semibold text-[#243746] tracking-[-0.176px] leading-6">
              {editingDependentId ? "Edit Dependent" : "Add New Dependent"}
            </WexDialog.Title>
            <WexDialog.Close asChild>
              <WexButton
                intent="ghost"
                size="icon"
                className="h-6 w-6"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-[#515F6B]" />
              </WexButton>
            </WexDialog.Close>
          </div>

          {/* Form Content */}
          <div className="flex flex-col gap-4 px-[24px] pb-0">
            <WexFloatLabel
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleFormChange("firstName", e.target.value)}
            />
            <WexFloatLabel
              label="Middle Name"
              value={formData.middleName}
              onChange={(e) => handleFormChange("middleName", e.target.value)}
            />
            <WexFloatLabel
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => handleFormChange("lastName", e.target.value)}
            />
            <WexFloatLabel
              label="SSN"
              value={formData.ssn}
              onChange={(e) => handleFormChange("ssn", e.target.value)}
            />
            {/* Birth Date with Calendar Picker */}
            <WexPopover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <WexPopover.Trigger asChild>
                <div className="relative w-full">
                  <WexFloatLabel
                    label="Birth Date"
                    value={formData.birthDate}
                    onChange={(e) => handleFormChange("birthDate", e.target.value)}
                    onClick={() => setIsCalendarOpen(true)}
                    rightIcon={<Calendar className="h-4 w-4" />}
                  />
                </div>
              </WexPopover.Trigger>
              <WexPopover.Content className="w-auto p-0" align="start" side="bottom" sideOffset={4}>
                <WexCalendar
                  mode="single"
                  selected={
                    formData.birthDate
                      ? (() => {
                          // Parse MM/DD/YYYY format
                          const parts = formData.birthDate.split("/");
                          if (parts.length === 3) {
                            const month = parseInt(parts[0], 10) - 1; // Month is 0-indexed
                            const day = parseInt(parts[1], 10);
                            const year = parseInt(parts[2], 10);
                            const date = new Date(year, month, day);
                            if (!isNaN(date.getTime())) {
                              return date;
                            }
                          }
                          // Fallback: try parsing as ISO string
                          const date = new Date(formData.birthDate);
                          return !isNaN(date.getTime()) ? date : undefined;
                        })()
                      : undefined
                  }
                  onSelect={(date: Date | undefined) => {
                    if (date) {
                      // Format date as MM/DD/YYYY
                      const month = String(date.getMonth() + 1).padStart(2, "0");
                      const day = String(date.getDate()).padStart(2, "0");
                      const year = date.getFullYear();
                      handleFormChange("birthDate", `${month}/${day}/${year}`);
                    } else {
                      handleFormChange("birthDate", "");
                    }
                    setIsCalendarOpen(false);
                  }}
                  initialFocus
                />
              </WexPopover.Content>
            </WexPopover>
            
            {/* Gender Select with Float Label Wrapper */}
            <div className="relative w-full">
              <WexSelect
                value={formData.gender}
                onValueChange={(value) => handleFormChange("gender", value)}
              >
                <WexSelect.Trigger className={`h-14 w-full rounded-md px-3 text-sm shadow-sm border border-wex-input-border bg-wex-input-bg text-wex-input-fg hover:border-wex-input-border-hover focus:outline-none focus:border-wex-input-border-focus focus:ring-1 focus:ring-wex-input-focus-ring ${formData.gender ? "pt-2 pb-2" : "pt-5 pb-2"}`}>
                  <WexSelect.Value placeholder=" " />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  <WexSelect.Item value="male">Male</WexSelect.Item>
                  <WexSelect.Item value="female">Female</WexSelect.Item>
                  <WexSelect.Item value="other">Other</WexSelect.Item>
                  <WexSelect.Item value="prefer-not-to-say">Prefer not to say</WexSelect.Item>
                </WexSelect.Content>
              </WexSelect>
              <label
                className={`absolute pointer-events-none transition-all duration-200 ease-out origin-top-left ${
                  formData.gender
                    ? "left-3 top-2 text-xs text-[#7c858e] scale-75 -translate-y-2.5"
                    : "left-3 top-4 text-sm text-[#7c858e]"
                }`}
              >
                Gender
              </label>
            </div>

            {/* Full time student Radio Group */}
            <div className="flex gap-4 items-center">
              <span className="text-base text-[#243746] tracking-[-0.176px]">Full time student?</span>
              <WexRadioGroup
                value={formData.isFullTimeStudent}
                onValueChange={(value) => handleFormChange("isFullTimeStudent", value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <WexRadioGroup.Item value="yes" id="student-yes" />
                  <WexLabel htmlFor="student-yes" className="cursor-pointer">Yes</WexLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <WexRadioGroup.Item value="no" id="student-no" />
                  <WexLabel htmlFor="student-no" className="cursor-pointer">No</WexLabel>
                </div>
              </WexRadioGroup>
            </div>

            {/* Relationship Select with Float Label Wrapper */}
            <div className="relative w-full">
              <WexSelect
                value={formData.relationship}
                onValueChange={(value) => handleFormChange("relationship", value)}
              >
                <WexSelect.Trigger className={`h-14 w-full rounded-md px-3 text-sm shadow-sm border border-wex-input-border bg-wex-input-bg text-wex-input-fg hover:border-wex-input-border-hover focus:outline-none focus:border-wex-input-border-focus focus:ring-1 focus:ring-wex-input-focus-ring ${formData.relationship ? "pt-2 pb-2" : "pt-5 pb-2"}`}>
                  <WexSelect.Value placeholder=" " />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  <WexSelect.Item value="spouse">Spouse</WexSelect.Item>
                  <WexSelect.Item value="child">Child</WexSelect.Item>
                  <WexSelect.Item value="other">Other</WexSelect.Item>
                </WexSelect.Content>
              </WexSelect>
              <label
                className={`absolute pointer-events-none transition-all duration-200 ease-out origin-top-left ${
                  formData.relationship
                    ? "left-3 top-2 text-xs text-[#7c858e] scale-75 -translate-y-2.5"
                    : "left-3 top-4 text-sm text-[#7c858e]"
                }`}
              >
                Relationship
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-2 justify-end p-[17.5px] pt-0">
            <WexDialog.Close asChild>
              <WexButton
                intent="outline"
                onClick={() => {
                  resetForm();
                  setEditingDependentId(null);
                  setIsAddDependentModalOpen(false);
                }}
              >
                Cancel
              </WexButton>
            </WexDialog.Close>
            <WexButton
              intent="primary"
              onClick={handleSaveDependent}
              disabled={!formData.firstName || !formData.lastName || !formData.ssn || !formData.birthDate || !formData.gender || !formData.relationship}
            >
              Save
            </WexButton>
          </div>
        </WexDialog.Content>
      </WexDialog>

      {/* Remove Dependent Confirmation Modal */}
      <WexAlertDialog open={isRemoveConfirmOpen} onOpenChange={setIsRemoveConfirmOpen}>
        <WexAlertDialog.Content className="w-[448px] p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-[17.5px]">
            <WexAlertDialog.Title className="text-base font-semibold text-[#243746] tracking-[-0.176px] leading-6">
              Remove Dependent
            </WexAlertDialog.Title>
            <WexAlertDialog.Cancel asChild>
              <WexButton
                intent="ghost"
                size="icon"
                className="h-6 w-6 !border-0 !shadow-none !bg-transparent hover:!bg-wex-button-tertiary-hover-bg"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-[#515F6B]" />
              </WexButton>
            </WexAlertDialog.Cancel>
          </div>

          {/* Content */}
          <div className="px-[24px] pb-0">
            <WexAlertDialog.Description className="text-sm text-[#243746] leading-6">
              Are you sure you want to remove <strong>{dependentToRemove ? `${dependentToRemove.firstName} ${dependentToRemove.lastName}` : ""}</strong> from your dependents? This action cannot be undone.
            </WexAlertDialog.Description>
          </div>

          {/* Footer */}
          <div className="flex gap-2 justify-end p-[17.5px] pt-0">
            <WexAlertDialog.Cancel asChild>
              <WexButton intent="outline">
                Cancel
              </WexButton>
            </WexAlertDialog.Cancel>
            <WexAlertDialog.Action asChild>
              <WexButton
                intent="destructive"
                className="!bg-wex-button-destructive-bg !text-wex-button-destructive-fg !border !border-wex-button-destructive-border hover:!bg-wex-button-destructive-hover-bg active:!bg-wex-button-destructive-active-bg"
                onClick={() => dependentToRemove && handleRemoveDependent(dependentToRemove.id)}
              >
                Remove
              </WexButton>
            </WexAlertDialog.Action>
          </div>
        </WexAlertDialog.Content>
      </WexAlertDialog>

      {/* Add New Beneficiary Modal */}
      <WexDialog open={isAddBeneficiaryModalOpen} onOpenChange={setIsAddBeneficiaryModalOpen}>
        <WexDialog.Content className="w-[448px] p-0 [&>div:last-child]:hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-[17.5px]">
            <WexDialog.Title className="text-base font-semibold text-[#243746] tracking-[-0.176px] leading-6">
              {editingBeneficiaryId ? "Edit Beneficiary" : "Add New Beneficiary"}
            </WexDialog.Title>
            <WexDialog.Close asChild>
              <WexButton
                intent="ghost"
                size="icon"
                className="h-6 w-6 !border-0 !shadow-none !bg-transparent hover:!bg-wex-button-tertiary-hover-bg"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-[#515F6B]" />
              </WexButton>
            </WexDialog.Close>
          </div>

          {/* Form Content */}
          <div className="flex flex-col gap-4 px-[24px] pb-0">
            {/* Personal Information */}
            <WexFloatLabel
              label="First Name"
              value={beneficiaryFormData.firstName}
              onChange={(e) => handleBeneficiaryFormChange("firstName", e.target.value)}
            />
            <WexFloatLabel
              label="Last Name"
              value={beneficiaryFormData.lastName}
              onChange={(e) => handleBeneficiaryFormChange("lastName", e.target.value)}
            />
            <WexFloatLabel
              label="SSN"
              value={beneficiaryFormData.ssn}
              onChange={(e) => handleBeneficiaryFormChange("ssn", e.target.value)}
            />
            
            {/* Birth Date with Calendar Picker */}
            <WexPopover open={isBeneficiaryCalendarOpen} onOpenChange={setIsBeneficiaryCalendarOpen}>
              <WexPopover.Trigger asChild>
                <div className="relative w-full">
                  <WexFloatLabel
                    label="Birth Date"
                    value={beneficiaryFormData.birthDate}
                    onChange={(e) => handleBeneficiaryFormChange("birthDate", e.target.value)}
                    onClick={() => setIsBeneficiaryCalendarOpen(true)}
                    rightIcon={<Calendar className="h-4 w-4" />}
                  />
                </div>
              </WexPopover.Trigger>
              <WexPopover.Content className="w-auto p-0" align="start" side="bottom" sideOffset={4}>
                <WexCalendar
                  mode="single"
                  selected={
                    beneficiaryFormData.birthDate
                      ? (() => {
                          const parts = beneficiaryFormData.birthDate.split("/");
                          if (parts.length === 3) {
                            const month = parseInt(parts[0], 10) - 1;
                            const day = parseInt(parts[1], 10);
                            const year = parseInt(parts[2], 10);
                            const date = new Date(year, month, day);
                            if (!isNaN(date.getTime())) {
                              return date;
                            }
                          }
                          const date = new Date(beneficiaryFormData.birthDate);
                          return !isNaN(date.getTime()) ? date : undefined;
                        })()
                      : undefined
                  }
                  onSelect={(date: Date | undefined) => {
                    if (date) {
                      const month = String(date.getMonth() + 1).padStart(2, "0");
                      const day = String(date.getDate()).padStart(2, "0");
                      const year = date.getFullYear();
                      handleBeneficiaryFormChange("birthDate", `${month}/${day}/${year}`);
                    } else {
                      handleBeneficiaryFormChange("birthDate", "");
                    }
                    setIsBeneficiaryCalendarOpen(false);
                  }}
                  initialFocus
                />
              </WexPopover.Content>
            </WexPopover>

            {/* Relationship Select with Float Label Wrapper */}
            <div className="relative w-full">
              <WexSelect
                value={beneficiaryFormData.relationship}
                onValueChange={(value) => handleBeneficiaryFormChange("relationship", value)}
              >
                <WexSelect.Trigger className={`h-14 w-full rounded-md px-3 text-sm shadow-sm border border-wex-input-border bg-wex-input-bg text-wex-input-fg hover:border-wex-input-border-hover focus:outline-none focus:border-wex-input-border-focus focus:ring-1 focus:ring-wex-input-focus-ring ${beneficiaryFormData.relationship ? "pt-2 pb-2" : "pt-5 pb-2"}`}>
                  <WexSelect.Value placeholder=" " />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  <WexSelect.Item value="spouse">Spouse</WexSelect.Item>
                  <WexSelect.Item value="child">Child</WexSelect.Item>
                  <WexSelect.Item value="parent">Parent</WexSelect.Item>
                  <WexSelect.Item value="sibling">Sibling</WexSelect.Item>
                  <WexSelect.Item value="other">Other</WexSelect.Item>
                </WexSelect.Content>
              </WexSelect>
              <label
                className={`absolute pointer-events-none transition-all duration-200 ease-out origin-top-left ${
                  beneficiaryFormData.relationship
                    ? "left-3 top-2 text-xs text-[#7c858e] scale-75 -translate-y-2.5"
                    : "left-3 top-4 text-sm text-[#7c858e]"
                }`}
              >
                Relationship
              </label>
            </div>

            {/* Beneficiary Type Radio Group */}
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-1">
                <span className="text-base text-[#243746] tracking-[-0.176px]">Beneficiary Type</span>
                <Info className="h-4 w-4 text-[#7c858e]" />
              </div>
              <WexRadioGroup
                value={beneficiaryFormData.beneficiaryType}
                onValueChange={(value) => handleBeneficiaryFormChange("beneficiaryType", value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <WexRadioGroup.Item value="primary" id="beneficiary-primary" />
                  <WexLabel htmlFor="beneficiary-primary" className="cursor-pointer">Primary</WexLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <WexRadioGroup.Item value="contingent" id="beneficiary-contingent" />
                  <WexLabel htmlFor="beneficiary-contingent" className="cursor-pointer">Contingent</WexLabel>
                </div>
              </WexRadioGroup>
            </div>

            {/* Address Information */}
            <WexFloatLabel
              label="Address line 1"
              value={beneficiaryFormData.addressLine1}
              onChange={(e) => handleBeneficiaryFormChange("addressLine1", e.target.value)}
            />
            <WexFloatLabel
              label="Address line 2"
              value={beneficiaryFormData.addressLine2}
              onChange={(e) => handleBeneficiaryFormChange("addressLine2", e.target.value)}
            />
            <WexFloatLabel
              label="City"
              value={beneficiaryFormData.city}
              onChange={(e) => handleBeneficiaryFormChange("city", e.target.value)}
            />
            
            {/* State Select with Float Label Wrapper */}
            <div className="relative w-full">
              <WexSelect
                value={beneficiaryFormData.state}
                onValueChange={(value) => handleBeneficiaryFormChange("state", value)}
              >
                <WexSelect.Trigger className={`h-14 w-full rounded-md px-3 text-sm shadow-sm border border-wex-input-border bg-wex-input-bg text-wex-input-fg hover:border-wex-input-border-hover focus:outline-none focus:border-wex-input-border-focus focus:ring-1 focus:ring-wex-input-focus-ring ${beneficiaryFormData.state ? "pt-2 pb-2" : "pt-5 pb-2"}`}>
                  <WexSelect.Value placeholder=" " />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  {usStates.map((state) => (
                    <WexSelect.Item key={state} value={state}>
                      {state}
                    </WexSelect.Item>
                  ))}
                </WexSelect.Content>
              </WexSelect>
              <label
                className={`absolute pointer-events-none transition-all duration-200 ease-out origin-top-left ${
                  beneficiaryFormData.state
                    ? "left-3 top-2 text-xs text-[#7c858e] scale-75 -translate-y-2.5"
                    : "left-3 top-4 text-sm text-[#7c858e]"
                }`}
              >
                Select State
              </label>
            </div>

            <WexFloatLabel
              label="Zip Code"
              value={beneficiaryFormData.zipCode}
              onChange={(e) => handleBeneficiaryFormChange("zipCode", e.target.value)}
            />
          </div>

          {/* Footer */}
          <div className="flex gap-2 justify-end p-[17.5px] pt-0">
            <WexDialog.Close asChild>
              <WexButton
                intent="outline"
                onClick={() => {
                  resetBeneficiaryForm();
                  setEditingBeneficiaryId(null);
                  setIsAddBeneficiaryModalOpen(false);
                }}
              >
                Cancel
              </WexButton>
            </WexDialog.Close>
            <WexButton
              intent="primary"
              onClick={handleSaveBeneficiary}
              disabled={!beneficiaryFormData.firstName || !beneficiaryFormData.lastName || !beneficiaryFormData.ssn || !beneficiaryFormData.birthDate || !beneficiaryFormData.relationship || !beneficiaryFormData.addressLine1 || !beneficiaryFormData.city || !beneficiaryFormData.state || !beneficiaryFormData.zipCode}
            >
              Save
            </WexButton>
          </div>
        </WexDialog.Content>
      </WexDialog>

      {/* Remove Beneficiary Confirmation Modal */}
      <WexAlertDialog open={isRemoveBeneficiaryConfirmOpen} onOpenChange={setIsRemoveBeneficiaryConfirmOpen}>
        <WexAlertDialog.Content className="w-[448px] p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-[17.5px]">
            <WexAlertDialog.Title className="text-base font-semibold text-[#243746] tracking-[-0.176px] leading-6">
              Remove Beneficiary
            </WexAlertDialog.Title>
            <WexAlertDialog.Cancel asChild>
              <WexButton
                intent="ghost"
                size="icon"
                className="h-6 w-6 !border-0 !shadow-none !bg-transparent hover:!bg-wex-button-tertiary-hover-bg"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-[#515F6B]" />
              </WexButton>
            </WexAlertDialog.Cancel>
          </div>

          {/* Content */}
          <div className="px-[24px] pb-0">
            <WexAlertDialog.Description className="text-sm text-[#243746] leading-6">
              Are you sure you want to remove <strong>{beneficiaryToRemove ? `${beneficiaryToRemove.firstName} ${beneficiaryToRemove.lastName}` : ""}</strong> from your beneficiaries? This action cannot be undone.
            </WexAlertDialog.Description>
          </div>

          {/* Footer */}
          <WexAlertDialog.Footer className="flex gap-2 justify-end p-[17.5px] pt-0">
            <WexAlertDialog.Cancel asChild>
              <WexButton intent="outline">
                Cancel
              </WexButton>
            </WexAlertDialog.Cancel>
            <WexAlertDialog.Action asChild>
              <WexButton
                intent="destructive"
                className="!bg-wex-button-destructive-bg !text-wex-button-destructive-fg !border !border-wex-button-destructive-border hover:!bg-wex-button-destructive-hover-bg active:!bg-wex-button-destructive-active-bg"
                onClick={() => beneficiaryToRemove && handleRemoveBeneficiary(beneficiaryToRemove.id)}
              >
                Remove
              </WexButton>
            </WexAlertDialog.Action>
          </WexAlertDialog.Footer>
        </WexAlertDialog.Content>
      </WexAlertDialog>

      {/* Add Bank Account Multi-Step Modal */}
      <WexDialog open={isAddBankAccountModalOpen} onOpenChange={setIsAddBankAccountModalOpen}>
        <WexDialog.Content className="w-[800px] p-0 [&>div:last-child]:hidden">
          <div className="flex">
            {/* Left Sidebar - Progress Indicator */}
            <div className="w-[240px] border-r border-[#e4e6e9] bg-[#f8f9fa] p-6">
              <Stepper
                steps={[
                  { id: "step1", label: "Authentication" },
                  { id: "step2", label: "Bank Information" },
                  { id: "step3", label: "Direct Deposit (optional)" },
                ]}
                currentStepId={bankAccountStep}
                onStepChange={(stepId) => {
                  setBankAccountStep(stepId);
                }}
              />
            </div>

            {/* Right Content Area */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center justify-between p-[17.5px] border-b border-[#e4e6e9]">
                <WexDialog.Title className="text-base font-semibold text-[#243746] tracking-[-0.176px] leading-6">
                  Add Bank Account
                </WexDialog.Title>
                <WexDialog.Close asChild>
                  <WexButton
                    intent="ghost"
                    size="icon"
                    className="h-6 w-6 !border-0 !shadow-none !bg-transparent hover:!bg-wex-button-tertiary-hover-bg"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4 text-[#515F6B]" />
                  </WexButton>
                </WexDialog.Close>
              </div>

              {/* Step Content */}
              <div className="p-6">
                {bankAccountStep === "step1" && (
                  <div className="space-y-6">
                    {!showVerificationCode ? (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold text-[#243746] mb-2">Authentication</h3>
                          <p className="text-sm text-[#243746] leading-6">
                            To protect your account, we need to confirm that you're the one adding this bank information. Choose how you'd like to receive a verification code.
                          </p>
                        </div>
                        <WexRadioGroup
                          value={bankAccountFormData.verificationMethod}
                          onValueChange={(value) => handleBankAccountFormChange("verificationMethod", value)}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 p-4 border border-[#e4e6e9] rounded-md hover:bg-[#f8f9fa]">
                            <WexRadioGroup.Item value="text" id="verify-text" />
                            <WexLabel htmlFor="verify-text" className="cursor-pointer flex-1">
                              <span className="text-sm text-[#243746]">Text Message at (***) ***-1111</span>
                            </WexLabel>
                          </div>
                          <div className="flex items-center space-x-3 p-4 border border-[#e4e6e9] rounded-md hover:bg-[#f8f9fa]">
                            <WexRadioGroup.Item value="email" id="verify-email" />
                            <WexLabel htmlFor="verify-email" className="cursor-pointer flex-1">
                              <span className="text-sm text-[#243746]">Email at my***m**@******.com</span>
                            </WexLabel>
                          </div>
                        </WexRadioGroup>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold text-[#243746] mb-2">Authentication</h3>
                          <p className="text-sm text-[#243746] leading-6 mb-4">
                            We sent a 6-digit verification code to {bankAccountFormData.verificationMethod === "text" ? "(***) ***-1111" : "my***m**@******.com"}.
                          </p>
                        </div>
                        <div className="space-y-4">
                          <WexFloatLabel
                            label="Verification Code"
                            value={bankAccountFormData.verificationCode}
                            onChange={(e) => handleBankAccountFormChange("verificationCode", e.target.value)}
                            maxLength={6}
                          />
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-[#7c858e]">
                              {resendTimer > 0 ? (
                                `Resend in ${Math.floor(resendTimer / 60)}:${String(resendTimer % 60).padStart(2, "0")}`
                              ) : (
                                <WexButton
                                  intent="ghost"
                                  size="sm"
                                  className="h-auto p-0 text-sm text-[#243746] hover:underline"
                                  onClick={() => {
                                    setResendTimer(45);
                                    // In a real app, this would resend the code
                                  }}
                                >
                                  Resend Code
                                </WexButton>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {bankAccountStep === "step2" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#243746] mb-4">Bank Information</h3>
                    
                    {/* Routing Number */}
                    <div className="relative">
                      <WexFloatLabel
                        label="Routing Number"
                        value={bankAccountFormData.routingNumber}
                        onChange={(e) => handleBankAccountFormChange("routingNumber", e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        aria-label="Help"
                      >
                        <Info className="h-4 w-4 text-[#7c858e]" />
                      </button>
                    </div>
                    
                    {/* Account Number */}
                    <WexFloatLabel
                      label="Account Number"
                      value={bankAccountFormData.accountNumber}
                      onChange={(e) => handleBankAccountFormChange("accountNumber", e.target.value)}
                    />
                    
                    {/* Confirm Account Number */}
                    <WexFloatLabel
                      label="Confirm Account Number"
                      value={bankAccountFormData.confirmAccountNumber}
                      onChange={(e) => handleBankAccountFormChange("confirmAccountNumber", e.target.value)}
                    />
                    
                    {/* Account Nickname */}
                    <div className="relative">
                      <WexFloatLabel
                        label="Account Nickname"
                        value={bankAccountFormData.accountNickname}
                        onChange={(e) => handleBankAccountFormChange("accountNickname", e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        aria-label="Help"
                      >
                        <Info className="h-4 w-4 text-[#7c858e]" />
                      </button>
                    </div>
                    
                    {/* Account Type */}
                    <div className="space-y-2">
                      <WexLabel className="text-sm text-[#243746]">Account Type:</WexLabel>
                      <WexRadioGroup
                        value={bankAccountFormData.accountType}
                        onValueChange={(value) => handleBankAccountFormChange("accountType", value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <WexRadioGroup.Item value="checking" id="account-checking" />
                          <WexLabel htmlFor="account-checking" className="cursor-pointer">Checking</WexLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <WexRadioGroup.Item value="saving" id="account-saving" />
                          <WexLabel htmlFor="account-saving" className="cursor-pointer">Saving</WexLabel>
                        </div>
                      </WexRadioGroup>
                    </div>
                  </div>
                )}

                {bankAccountStep === "step3" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[#243746] mb-2">Direct Deposit (optional)</h3>
                      <p className="text-sm text-[#243746] leading-6">
                        Select one or multiple plan years. You can update this later at any time.
                      </p>
                    </div>
                    
                    {/* Information Alert */}
                    <WexAlert intent="info" className="bg-[#E6F4FF] border-[#B3D9FF]">
                      <Info className="h-4 w-4 text-[#0058a3]" />
                      <WexAlert.Description className="text-sm text-[#243746]">
                        Don't want to set up direct deposit right now? You can finish without enabling it. Your payments will continue by check.
                      </WexAlert.Description>
                    </WexAlert>
                    
                    {/* Direct Deposit Options */}
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-4 border border-[#e4e6e9] rounded-md hover:bg-[#f8f9fa]">
                        <WexCheckbox
                          id="direct-deposit-hsa"
                          checked={(bankAccountFormData.selectedDirectDepositOptions || []).includes("hsa")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setBankAccountFormData((prev) => ({
                                ...prev,
                                selectedDirectDepositOptions: [...(prev.selectedDirectDepositOptions || []), "hsa"],
                              }));
                            } else {
                              setBankAccountFormData((prev) => ({
                                ...prev,
                                selectedDirectDepositOptions: (prev.selectedDirectDepositOptions || []).filter((opt) => opt !== "hsa"),
                              }));
                            }
                          }}
                          className="mt-1"
                        />
                        <label htmlFor="direct-deposit-hsa" className="flex-1 cursor-pointer">
                          <div className="text-sm font-medium text-[#243746]">Health Savings Account</div>
                          <div className="text-xs text-[#7c858e] mt-1">Current method: Check</div>
                        </label>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 border border-[#e4e6e9] rounded-md hover:bg-[#f8f9fa]">
                        <WexCheckbox
                          id="direct-deposit-plan-year"
                          checked={(bankAccountFormData.selectedDirectDepositOptions || []).includes("2025")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setBankAccountFormData((prev) => ({
                                ...prev,
                                selectedDirectDepositOptions: [...(prev.selectedDirectDepositOptions || []), "2025"],
                              }));
                            } else {
                              setBankAccountFormData((prev) => ({
                                ...prev,
                                selectedDirectDepositOptions: (prev.selectedDirectDepositOptions || []).filter((opt) => opt !== "2025"),
                              }));
                            }
                          }}
                          className="mt-1"
                        />
                        <label htmlFor="direct-deposit-plan-year" className="flex-1 cursor-pointer">
                          <div className="text-sm font-medium text-[#243746]">01/01/2025-12/31/2025</div>
                          <div className="text-xs text-[#7c858e] mt-1">Current method: Check</div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-[17.5px] border-t border-[#e4e6e9]">
                <div>
                  {showVerificationCode && bankAccountStep === "step1" ? (
                    <WexButton
                      intent="ghost"
                      className="h-auto p-0 text-sm text-[#243746] hover:underline"
                      onClick={() => {
                        setShowVerificationCode(false);
                        setBankAccountFormData((prev) => ({ ...prev, verificationCode: "" }));
                      }}
                    >
                      Use a different method
                    </WexButton>
                  ) : (
                    <WexButton
                      intent="outline"
                      onClick={() => {
                        if (bankAccountStep !== "step1") {
                          handleBankAccountBack();
                        } else if (showVerificationCode) {
                          setShowVerificationCode(false);
                          setBankAccountFormData((prev) => ({ ...prev, verificationCode: "" }));
                        } else {
                          setIsAddBankAccountModalOpen(false);
                        }
                      }}
                    >
                      {bankAccountStep === "step1" && !showVerificationCode ? "Cancel" : bankAccountStep === "step1" ? "Back" : "Back"}
                    </WexButton>
                  )}
                </div>
                <WexButton
                  intent="primary"
                  onClick={() => {
                    if (bankAccountStep === "step1" && !showVerificationCode) {
                      // Show verification code input
                      setShowVerificationCode(true);
                    } else if (bankAccountStep === "step1" && showVerificationCode) {
                      // Verify code and move to next step
                      handleBankAccountNext();
                    } else if (bankAccountStep !== "step3") {
                      handleBankAccountNext();
                    } else {
                      handleSaveBankAccount();
                    }
                  }}
                  disabled={
                    (bankAccountStep === "step1" && !showVerificationCode && !bankAccountFormData.verificationMethod) ||
                    (bankAccountStep === "step1" && showVerificationCode && !bankAccountFormData.verificationCode)
                  }
                >
                  {bankAccountStep === "step1" && showVerificationCode ? "Verify" : bankAccountStep === "step3" ? "Finish" : "Next"}
                </WexButton>
              </div>
            </div>
          </div>
        </WexDialog.Content>
      </WexDialog>

      {/* Remove Bank Account Confirmation Modal */}
      <WexAlertDialog open={isRemoveBankAccountConfirmOpen} onOpenChange={setIsRemoveBankAccountConfirmOpen}>
        <WexAlertDialog.Content className="w-[448px] p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-[17.5px]">
            <WexAlertDialog.Title className="text-base font-semibold text-[#243746] tracking-[-0.176px] leading-6">
              Remove Bank Account
            </WexAlertDialog.Title>
            <WexAlertDialog.Cancel asChild>
              <WexButton
                intent="ghost"
                size="icon"
                className="h-6 w-6 !border-0 !shadow-none !bg-transparent hover:!bg-wex-button-tertiary-hover-bg"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-[#515F6B]" />
              </WexButton>
            </WexAlertDialog.Cancel>
          </div>

          {/* Content */}
          <div className="px-[24px] pb-0">
            <WexAlertDialog.Description className="text-sm text-[#243746] leading-6">
              Are you sure you want to remove <strong>{bankAccountToRemove ? (bankAccountToRemove.accountNickname || `${bankAccountToRemove.accountType.charAt(0).toUpperCase() + bankAccountToRemove.accountType.slice(1)} Account`) : ""}</strong> from your bank accounts? This action cannot be undone.
            </WexAlertDialog.Description>
          </div>

          {/* Footer */}
          <WexAlertDialog.Footer className="flex gap-2 justify-end p-[17.5px] pt-0">
            <WexAlertDialog.Cancel asChild>
              <WexButton intent="outline">
                Cancel
              </WexButton>
            </WexAlertDialog.Cancel>
            <WexAlertDialog.Action asChild>
              <WexButton
                intent="destructive"
                className="!bg-wex-button-destructive-bg !text-wex-button-destructive-fg !border !border-wex-button-destructive-border hover:!bg-wex-button-destructive-hover-bg active:!bg-wex-button-destructive-active-bg"
                onClick={() => bankAccountToRemove && handleRemoveBankAccount(bankAccountToRemove.id)}
              >
                Remove
              </WexButton>
            </WexAlertDialog.Action>
          </WexAlertDialog.Footer>
        </WexAlertDialog.Content>
      </WexAlertDialog>
    </div>
  );
}

