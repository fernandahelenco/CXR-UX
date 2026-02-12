import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { WexButton } from "@/components/wex/wex-button";
import { ConsumerFooter } from "./Footer";
import { WexAlert } from "@/components/wex/wex-alert";
import { WexEmpty } from "@/components/wex/wex-empty";
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
import { WexBadge } from "@/components/wex/wex-badge";
import { WexDropdownMenu } from "@/components/wex/wex-dropdown-menu";
import { wexToast } from "@/components/wex/wex-toast";
import { WexSidebar } from "@/components/wex/wex-sidebar";
import { Stepper } from "./components/Stepper";
import { ConsumerNavigation } from "./ConsumerNavigation";
import { Pencil, Info, Plus, Calendar, X, Trash2, MoreVertical, Eye, RefreshCw, AlertCircle, User, Users, HeartPlus, ShieldCheck, Landmark, CreditCard, Bell, UserLock, Lock } from "lucide-react";
import { WexTabs } from "@/components/wex/wex-tabs";

type SubPage = "my-profile" | "dependents" | "beneficiaries" | "authorized-signers" | "banking" | "debit-card" | "login-security" | "communication" | "report-lost-stolen" | "order-replacement-card";

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

type AuthorizedSigner = {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  ssn: string;
  birthDate: string;
  type: string;
  phone: string;
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

type PurseStatus = {
  accountName: string;
  status: string;
};

type DebitCard = {
  id: string;
  cardholderName: string;
  cardNumber: string; // Last 4 digits
  fullCardNumber?: string; // Full card number for display in modal
  status: "ready-to-activate" | "active";
  expirationDate: string;
  effectiveDate: string;
  purseStatuses?: PurseStatus[]; // Purse status information
};

export default function MyProfile() {
  const personalName = "Emily Rose Smith";
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  // Communication preferences state
  const [activeTab, setActiveTab] = useState("statements");
  const [hsaAccountSummaryPaper, setHsaAccountSummaryPaper] = useState(false);
  const [hsaAccountSummaryEmail, setHsaAccountSummaryEmail] = useState(true);
  const [hsaTaxDocumentsPaper, setHsaTaxDocumentsPaper] = useState(false);
  const [hsaTaxDocumentsEmail, setHsaTaxDocumentsEmail] = useState(true);
  const [goPaperless, setGoPaperless] = useState(false);
  
  // Contact information state
  const [isContactInfoModalOpen, setIsContactInfoModalOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("123-456-7890");
  const [emailAddress, setEmailAddress] = useState("emily.smith@exampleemail.com");
  
  // Contributions preferences state
  const [contributionPostedEmail, setContributionPostedEmail] = useState(true);
  const [balanceBelowAmount, setBalanceBelowAmount] = useState("");
  const [balanceBelowEmail, setBalanceBelowEmail] = useState(true);
  const [contributionsWithinAmount, setContributionsWithinAmount] = useState("");
  const [contributionsWithinEmail, setContributionsWithinEmail] = useState(true);
  
  // Payments preferences state
  const [paymentIssuedEmail, setPaymentIssuedEmail] = useState(true);
  const [withdrawalExceedsAmount, setWithdrawalExceedsAmount] = useState("");
  const [withdrawalExceedsEmail, setWithdrawalExceedsEmail] = useState(true);
  
  // WEX Benefits Card preferences state
  const [cardMailedEmail, setCardMailedEmail] = useState(true);
  const [cardMailedText, setCardMailedText] = useState(true);
  const [followUpNoticeText, setFollowUpNoticeText] = useState(true);
  const [purchaseMadeEmail, setPurchaseMadeEmail] = useState(true);
  const [purchaseMadeText, setPurchaseMadeText] = useState(true);
  const [cardSuspendedText, setCardSuspendedText] = useState(true);
  const [cardPurseSuspendedText, setCardPurseSuspendedText] = useState(true);
  
  // Unsaved changes tracking
  const [pendingTabChange, setPendingTabChange] = useState<string | null>(null);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [isUnsavedChangesDialogOpen, setIsUnsavedChangesDialogOpen] = useState(false);
  
  // Saved state - tracks the last saved values
  const [savedState, setSavedState] = useState(() => ({
    // Statements
    hsaAccountSummaryPaper: false,
    hsaAccountSummaryEmail: true,
    hsaTaxDocumentsPaper: false,
    hsaTaxDocumentsEmail: true,
    goPaperless: false,
    // Contributions
    contributionPostedEmail: true,
    balanceBelowAmount: "",
    balanceBelowEmail: true,
    contributionsWithinAmount: "",
    contributionsWithinEmail: true,
    // Payments
    paymentIssuedEmail: true,
    withdrawalExceedsAmount: "",
    withdrawalExceedsEmail: true,
    // WEX Benefits Card
    cardMailedEmail: true,
    cardMailedText: true,
    followUpNoticeText: true,
    purchaseMadeEmail: true,
    purchaseMadeText: true,
    cardSuspendedText: true,
    cardPurseSuspendedText: true,
  }));
  
  // Check if there are unsaved changes
  const hasUnsavedChanges = () => {
    return (
      hsaAccountSummaryPaper !== savedState.hsaAccountSummaryPaper ||
      hsaAccountSummaryEmail !== savedState.hsaAccountSummaryEmail ||
      hsaTaxDocumentsPaper !== savedState.hsaTaxDocumentsPaper ||
      hsaTaxDocumentsEmail !== savedState.hsaTaxDocumentsEmail ||
      goPaperless !== savedState.goPaperless ||
      contributionPostedEmail !== savedState.contributionPostedEmail ||
      balanceBelowAmount !== savedState.balanceBelowAmount ||
      balanceBelowEmail !== savedState.balanceBelowEmail ||
      contributionsWithinAmount !== savedState.contributionsWithinAmount ||
      contributionsWithinEmail !== savedState.contributionsWithinEmail ||
      paymentIssuedEmail !== savedState.paymentIssuedEmail ||
      withdrawalExceedsAmount !== savedState.withdrawalExceedsAmount ||
      withdrawalExceedsEmail !== savedState.withdrawalExceedsEmail ||
      cardMailedEmail !== savedState.cardMailedEmail ||
      cardMailedText !== savedState.cardMailedText ||
      followUpNoticeText !== savedState.followUpNoticeText ||
      purchaseMadeEmail !== savedState.purchaseMadeEmail ||
      purchaseMadeText !== savedState.purchaseMadeText ||
      cardSuspendedText !== savedState.cardSuspendedText ||
      cardPurseSuspendedText !== savedState.cardPurseSuspendedText
    );
  };
  
  // Handle tab change with unsaved changes check
  const handleTabChange = (newTab: string) => {
    if (hasUnsavedChanges()) {
      setPendingTabChange(newTab);
      setIsUnsavedChangesDialogOpen(true);
    } else {
      setActiveTab(newTab);
    }
  };
  
  // Handle save from dialog
  const handleSaveAndSwitch = () => {
    // Save current state
    setSavedState({
      hsaAccountSummaryPaper,
      hsaAccountSummaryEmail,
      hsaTaxDocumentsPaper,
      hsaTaxDocumentsEmail,
      goPaperless,
      contributionPostedEmail,
      balanceBelowAmount,
      balanceBelowEmail,
      contributionsWithinAmount,
      contributionsWithinEmail,
      paymentIssuedEmail,
      withdrawalExceedsAmount,
      withdrawalExceedsEmail,
      cardMailedEmail,
      cardMailedText,
      followUpNoticeText,
      purchaseMadeEmail,
      purchaseMadeText,
      cardSuspendedText,
      cardPurseSuspendedText,
    });
    wexToast.success("Communication preferences saved successfully");
    setIsUnsavedChangesDialogOpen(false);
    if (pendingTabChange) {
      setActiveTab(pendingTabChange);
      setPendingTabChange(null);
    }
    // Handle pending navigation
    if (pendingNavigation) {
      const url = new URL(pendingNavigation, window.location.origin);
      const subPage = url.searchParams.get("subPage");
      if (subPage) {
        setActiveSubPage(subPage as SubPage);
        setSearchParams({ subPage });
      }
      setPendingNavigation(null);
    }
  };
  
  
  // Sync email toggles with "Go paperless" toggle and turn off paper toggles
  useEffect(() => {
    queueMicrotask(() => {
      setHsaAccountSummaryEmail(goPaperless);
      setHsaTaxDocumentsEmail(goPaperless);
      // When "Go paperless" is turned on, turn off paper toggles
      if (goPaperless) {
        setHsaAccountSummaryPaper(false);
        setHsaTaxDocumentsPaper(false);
      }
    });
  }, [goPaperless]);
  
  // Handler for HSA Account Summary Paper toggle
  const handleHsaAccountSummaryPaperChange = (checked: boolean) => {
    setHsaAccountSummaryPaper(checked);
    // If turning Paper ON and goPaperless is ON, turn off goPaperless
    if (checked && goPaperless) {
      setGoPaperless(false);
    }
  };
  
  // Handler for HSA Tax Documents Paper toggle
  const handleHsaTaxDocumentsPaperChange = (checked: boolean) => {
    setHsaTaxDocumentsPaper(checked);
    // If turning Paper ON and goPaperless is ON, turn off goPaperless
    if (checked && goPaperless) {
      setGoPaperless(false);
    }
  };
  
  // Dependents state
  const [dependents, setDependents] = useState<Dependent[]>([]);
  
  // Beneficiaries state
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  
  // Authorized signers state
  const [authorizedSigners, setAuthorizedSigners] = useState<AuthorizedSigner[]>([]);
  
  // Banking state
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  
  // Debit card state
  const [debitCards, setDebitCards] = useState<DebitCard[]>([
    {
      id: "1",
      cardholderName: "John Johnson",
      cardNumber: "3522",
      fullCardNumber: "1234 1234 1234 3522",
      status: "ready-to-activate",
      expirationDate: "10/31/2025",
      effectiveDate: "10/23/2019",
      purseStatuses: [
        { accountName: "FSA 2021", status: "Suspended" },
        { accountName: "HRA 2021", status: "Suspended" },
        { accountName: "FSA", status: "Suspended" },
        { accountName: "FSA 2018-2026", status: "Suspended" },
      ],
    },
    {
      id: "2",
      cardholderName: "John Johnson",
      cardNumber: "3455",
      fullCardNumber: "1234 1234 1234 3455",
      status: "active",
      expirationDate: "10/31/2025",
      effectiveDate: "10/23/2019",
      purseStatuses: [
        { accountName: "FSA 2021", status: "Suspended" },
        { accountName: "HRA 2021", status: "Suspended" },
        { accountName: "FSA", status: "Suspended" },
        { accountName: "FSA 2018-2026", status: "Suspended" },
      ],
    },
    {
      id: "3",
      cardholderName: "John Johnson",
      cardNumber: "8412",
      fullCardNumber: "1234 1234 1234 8414",
      status: "active",
      expirationDate: "10/31/2025",
      effectiveDate: "10/23/2019",
      purseStatuses: [
        { accountName: "FSA 2021", status: "Suspended" },
        { accountName: "HRA 2021", status: "Suspended" },
        { accountName: "FSA", status: "Suspended" },
        { accountName: "FSA 2018-2026", status: "Suspended" },
      ],
    },
  ]);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  
  // Card details modal state
  const [isCardDetailsModalOpen, setIsCardDetailsModalOpen] = useState(false);
  const [selectedCardForDetails, setSelectedCardForDetails] = useState<DebitCard | null>(null);
  
  // Card activation authentication modal state
  const [isActivationAuthModalOpen, setIsActivationAuthModalOpen] = useState(false);
  const [activationVerificationMethod, setActivationVerificationMethod] = useState<"text" | "email" | "">("");
  
  // Verification code modal state
  const [isVerificationCodeModalOpen, setIsVerificationCodeModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationResendTimer, setVerificationResendTimer] = useState(0);
  
  // Card activation confirmation modal state
  const [isActivateCardModalOpen, setIsActivateCardModalOpen] = useState(false);
  const [cardBeingActivated, setCardBeingActivated] = useState<DebitCard | null>(null);
  
  // Report Lost/Stolen page state
  const [confirmationAnswer, setConfirmationAnswer] = useState<"yes" | "no" | "">("");
  const [mailingAddress, setMailingAddress] = useState({
    name: "John Johnson",
    street: "5050 Lincoln Dr",
    addressLine2: "",
    city: "Edina",
    state: "MN",
    zip: "55436",
    country: "United States",
  });
  const [isMailingAddressModalOpen, setIsMailingAddressModalOpen] = useState(false);
  const [mailingAddressForm, setMailingAddressForm] = useState({
    street: "5050 Lincoln Dr",
    addressLine2: "",
    city: "Edina",
    state: "MN",
    zip: "55436",
    country: "United States",
  });
  const [isStateSelectFocused, setIsStateSelectFocused] = useState(false);
  const [isCountrySelectFocused, setIsCountrySelectFocused] = useState(false);
  
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
  
  // Authorized signer modal state
  const [isAddAuthorizedSignerModalOpen, setIsAddAuthorizedSignerModalOpen] = useState(false);
  const [editingAuthorizedSignerId, setEditingAuthorizedSignerId] = useState<string | null>(null);
  const [isRemoveAuthorizedSignerConfirmOpen, setIsRemoveAuthorizedSignerConfirmOpen] = useState(false);
  const [authorizedSignerToRemove, setAuthorizedSignerToRemove] = useState<AuthorizedSigner | null>(null);
  const [isAuthorizedSignerCalendarOpen, setIsAuthorizedSignerCalendarOpen] = useState(false);
  const [isAuthorizedSignerSsnInvalid, setIsAuthorizedSignerSsnInvalid] = useState(false);
  const [isViewAuthorizedSignerModalOpen, setIsViewAuthorizedSignerModalOpen] = useState(false);
  const [viewingAuthorizedSigner, setViewingAuthorizedSigner] = useState<AuthorizedSigner | null>(null);
  
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
  
  // Form state for authorized signers
  const [authorizedSignerFormData, setAuthorizedSignerFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    ssn: "",
    birthDate: "",
    type: "",
    phone: "",
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


  const [activeSubPage, setActiveSubPage] = useState<SubPage>(() => {
    const subPage = searchParams.get("subPage");
    const validSubPages: SubPage[] = ["my-profile", "dependents", "beneficiaries", "authorized-signers", "banking", "debit-card", "login-security", "communication", "report-lost-stolen", "order-replacement-card"];
    if (subPage && validSubPages.includes(subPage as SubPage)) {
      return subPage as SubPage;
    }
    return "my-profile";
  });

  // Sync activeSubPage with URL params
  useEffect(() => {
    const subPage = searchParams.get("subPage");
    const validSubPages: SubPage[] = ["my-profile", "dependents", "beneficiaries", "authorized-signers", "banking", "debit-card", "login-security", "communication", "report-lost-stolen", "order-replacement-card"];
    queueMicrotask(() => {
      if (subPage && validSubPages.includes(subPage as SubPage)) {
        setActiveSubPage(subPage as SubPage);
      } else if (!subPage) {
        setActiveSubPage("my-profile");
      }
    });
  }, [searchParams]);

  // Intercept navigation away from /my-profile when on communication subPage with unsaved changes
  useEffect(() => {
    // Only check if we're currently on communication subPage and have unsaved changes
    if (activeSubPage === "communication" && hasUnsavedChanges()) {
      // Check if navigating away from /my-profile entirely
      if (location.pathname !== "/my-profile") {
        // Store the intended destination and show dialog
        setPendingNavigation(location.pathname + location.search);
        setIsUnsavedChangesDialogOpen(true);
        // Revert the navigation by going back
        window.history.back();
      }
    }
  }, [location.pathname, location.search, activeSubPage]);

  // Verification code resend timer countdown
  useEffect(() => {
    if (verificationResendTimer > 0) {
      const timer = setTimeout(() => {
        setVerificationResendTimer(verificationResendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [verificationResendTimer]);

  const handleSubPageChange = (subPage: SubPage) => {
    // If we're on communication subPage and have unsaved changes, show dialog
    if (activeSubPage === "communication" && hasUnsavedChanges()) {
      setPendingNavigation(`/my-profile?subPage=${subPage}`);
      setIsUnsavedChangesDialogOpen(true);
    } else {
    setActiveSubPage(subPage);
    setSearchParams({ subPage });
    }
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

  // Authorized signer handlers
  const handleAuthorizedSignerFormChange = (field: string, value: string) => {
    setAuthorizedSignerFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateAuthorizedSignerSsn = (value: string): boolean => {
    if (value === "") return false;
    return !/^[0-9-]*$/.test(value);
  };

  const resetAuthorizedSignerForm = () => {
    setAuthorizedSignerFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      ssn: "",
      birthDate: "",
      type: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
    });
    setIsAuthorizedSignerSsnInvalid(false);
  };

  const handleViewAuthorizedSigner = (signer: AuthorizedSigner) => {
    setViewingAuthorizedSigner(signer);
    setIsViewAuthorizedSignerModalOpen(true);
  };

  const handleEditAuthorizedSigner = (signer: AuthorizedSigner) => {
    setAuthorizedSignerFormData({
      firstName: signer.firstName,
      middleName: signer.middleName || "",
      lastName: signer.lastName,
      ssn: signer.ssn,
      birthDate: signer.birthDate,
      type: signer.type,
      phone: signer.phone,
      addressLine1: signer.addressLine1,
      addressLine2: signer.addressLine2 || "",
      city: signer.city,
      state: signer.state,
      zipCode: signer.zipCode,
    });
    setEditingAuthorizedSignerId(signer.id);
    setIsAddAuthorizedSignerModalOpen(true);
  };

  const handleSaveAuthorizedSigner = () => {
    const fullName = `${authorizedSignerFormData.firstName} ${authorizedSignerFormData.lastName}`;
    
    if (editingAuthorizedSignerId) {
      // Update existing authorized signer
      setAuthorizedSigners((prev) =>
        prev.map((signer) =>
          signer.id === editingAuthorizedSignerId
            ? {
                ...signer,
                firstName: authorizedSignerFormData.firstName,
                middleName: authorizedSignerFormData.middleName || undefined,
                lastName: authorizedSignerFormData.lastName,
                ssn: authorizedSignerFormData.ssn,
                birthDate: authorizedSignerFormData.birthDate,
                type: authorizedSignerFormData.type,
                phone: authorizedSignerFormData.phone,
                addressLine1: authorizedSignerFormData.addressLine1,
                addressLine2: authorizedSignerFormData.addressLine2 || undefined,
                city: authorizedSignerFormData.city,
                state: authorizedSignerFormData.state,
                zipCode: authorizedSignerFormData.zipCode,
              }
            : signer
        )
      );
      
      // Show success toast for edit
      wexToast.success("Authorized signer successfully updated", {
        description: `${fullName}'s information has been updated`,
      });
    } else {
      // Add new authorized signer
      const newAuthorizedSigner: AuthorizedSigner = {
        id: Date.now().toString(),
        firstName: authorizedSignerFormData.firstName,
        middleName: authorizedSignerFormData.middleName || undefined,
        lastName: authorizedSignerFormData.lastName,
        ssn: authorizedSignerFormData.ssn,
        birthDate: authorizedSignerFormData.birthDate,
        type: authorizedSignerFormData.type,
        phone: authorizedSignerFormData.phone,
        addressLine1: authorizedSignerFormData.addressLine1,
        addressLine2: authorizedSignerFormData.addressLine2 || undefined,
        city: authorizedSignerFormData.city,
        state: authorizedSignerFormData.state,
        zipCode: authorizedSignerFormData.zipCode,
      };
      setAuthorizedSigners((prev) => [...prev, newAuthorizedSigner]);
      
      // Show success toast for add
      wexToast.success("Authorized signer successfully added", {
        description: `${fullName} is now an authorized signer`,
      });
    }
    resetAuthorizedSignerForm();
    setEditingAuthorizedSignerId(null);
    setIsAddAuthorizedSignerModalOpen(false);
  };

  const handleRemoveAuthorizedSignerClick = (signer: AuthorizedSigner) => {
    setAuthorizedSignerToRemove(signer);
    setIsRemoveAuthorizedSignerConfirmOpen(true);
  };

  const handleRemoveAuthorizedSigner = (id: string) => {
    const signer = authorizedSigners.find((s) => s.id === id);
    const fullName = signer ? `${signer.firstName} ${signer.lastName}` : "Authorized Signer";
    
    setAuthorizedSigners((prev) => prev.filter((s) => s.id !== id));
    setIsRemoveAuthorizedSignerConfirmOpen(false);
    setAuthorizedSignerToRemove(null);
    
    // Show success toast for removal
    wexToast.success("Authorized signer successfully removed", {
      description: `${fullName} has been removed from your authorized signers`,
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
      queueMicrotask(() => {
        resetForm();
        setEditingDependentId(null);
      });
    }
  }, [isAddDependentModalOpen, editingDependentId]);

  // Reset beneficiary form when modal closes (only if not editing)
  useEffect(() => {
    if (!isAddBeneficiaryModalOpen && !editingBeneficiaryId) {
      queueMicrotask(() => {
        resetBeneficiaryForm();
        setEditingBeneficiaryId(null);
      });
    }
  }, [isAddBeneficiaryModalOpen, editingBeneficiaryId]);

  // Reset authorized signer form when modal closes (only if not editing)
  useEffect(() => {
    if (!isAddAuthorizedSignerModalOpen && !editingAuthorizedSignerId) {
      queueMicrotask(() => {
        resetAuthorizedSignerForm();
        setEditingAuthorizedSignerId(null);
      });
    }
  }, [isAddAuthorizedSignerModalOpen, editingAuthorizedSignerId]);

  // Reset bank account form and step when modal closes
  useEffect(() => {
    if (!isAddBankAccountModalOpen) {
      queueMicrotask(() => {
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
      });
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
      queueMicrotask(() => setResendTimer(45)); // 45 seconds
    }
  }, [showVerificationCode]);

  const menuSections: { 
    title: string; 
    items: { label: string; key: SubPage; icon: React.ComponentType<{ className?: string }> }[] 
  }[] = [
    {
      title: "ACCOUNT",
      items: [
        { label: "My Profile", key: "my-profile", icon: User },
        { label: "Dependents", key: "dependents", icon: Users },
        { label: "Beneficiaries", key: "beneficiaries", icon: HeartPlus },
        { label: "Authorized Signers", key: "authorized-signers", icon: ShieldCheck },
      ],
    },
    {
      title: "PAYMENTS",
      items: [
        { label: "Bank Accounts", key: "banking", icon: Landmark },
        { label: "Debit Card", key: "debit-card", icon: CreditCard },
      ],
    },
    {
      title: "PREFERENCES & SECURITY",
      items: [
        { label: "Login & Security", key: "login-security", icon: UserLock },
        { label: "Communication Preferences", key: "communication", icon: Bell },
      ],
    },
  ];

  const renderContent = (subPage: SubPage) => {
    switch (subPage) {
      case "my-profile":
        return (
          <>
            {/* Page Header */}
            <div className="pt-4 pb-2">
              <div className="px-6 flex items-center">
                <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
              </div>
              <WexSeparator className="mt-4" />
            </div>

            <div className="space-y-0">
              {/* Personal Information Section */}
              <div className="px-6 pt-4 pb-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Personal Information</h3>
                  <WexButton
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary active:text-primary [&>svg]:text-primary"
                  >
                    <Pencil />
                    Edit
                  </WexButton>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-normal text-gray-800">{personalName}</p>
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
              <div className="px-6 pt-4 pb-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Contact Information</h3>
                  <WexButton
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary active:text-primary [&>svg]:text-primary"
                  >
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
              <div className="px-6 pt-4 pb-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Address Information</h3>
                  <WexButton
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary active:text-primary [&>svg]:text-primary"
                  >
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
            <div className="pt-4 pb-2">
              <div className="px-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Dependents</h2>
                <WexButton
                  intent="primary"
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto justify-center border-[#0058a3] text-[#0058a3] hover:bg-blue-50"
                  onClick={() => {
                    resetForm();
                    setEditingDependentId(null);
                    setIsAddDependentModalOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sm:ml-2">Add New Dependent</span>
                </WexButton>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            {dependents.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-8 py-16">
                <WexEmpty className="border-0 py-12">
                  <WexEmpty.Header>
                    <WexEmpty.Media variant="default">
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
                        <Users className="h-10 w-10 text-gray-400" />
                      </div>
                    </WexEmpty.Media>
                    <WexEmpty.Title className="text-lg font-semibold text-[#243746]">
                      Add a Dependent
                    </WexEmpty.Title>
                    <WexEmpty.Description>
                      You have no dependents added yet. Add a dependent to manage their information and benefits.
                    </WexEmpty.Description>
                  </WexEmpty.Header>
                  <WexEmpty.Content>
                    <WexButton
                      intent="primary"
                      onClick={() => {
                        resetForm();
                        setEditingDependentId(null);
                        setIsAddDependentModalOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Dependent</span>
                    </WexButton>
                  </WexEmpty.Content>
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
                          variant="ghost"
                          size="sm"
                          className="text-[#0058a3] hover:bg-blue-50"
                          onClick={() => handleEditDependent(dependent)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </WexButton>
                        <WexButton
                          variant="ghost"
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
            <div className="pt-4 pb-2">
              <div className="px-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Beneficiaries</h2>
                <WexButton
                  intent="primary"
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto justify-center border-[#0058a3] text-[#0058a3] hover:bg-blue-50"
                  onClick={() => {
                    resetBeneficiaryForm();
                    setEditingBeneficiaryId(null);
                    setIsAddBeneficiaryModalOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sm:ml-2">Add New Beneficiary</span>
                </WexButton>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            {beneficiaries.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-8 py-16">
                <WexEmpty className="border-0 py-12">
                  <WexEmpty.Header>
                    <WexEmpty.Media variant="default">
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
                        <HeartPlus className="h-10 w-10 text-gray-400" />
                      </div>
                    </WexEmpty.Media>
                    <WexEmpty.Title className="text-lg font-semibold text-[#243746]">
                      Add a Beneficiary
                    </WexEmpty.Title>
                    <WexEmpty.Description>
                      You have no beneficiaries added yet. Add a beneficiary to designate who will receive your benefits.
                    </WexEmpty.Description>
                  </WexEmpty.Header>
                  <WexEmpty.Content>
                    <WexButton
                      intent="primary"
                      onClick={() => {
                        resetBeneficiaryForm();
                        setEditingBeneficiaryId(null);
                        setIsAddBeneficiaryModalOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Beneficiary</span>
                    </WexButton>
                  </WexEmpty.Content>
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
                          variant="ghost"
                          size="sm"
                          className="text-[#0058a3] hover:bg-blue-50"
                          onClick={() => handleEditBeneficiary(beneficiary)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </WexButton>
                        <WexButton
                          variant="ghost"
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

      case "authorized-signers":
        return (
          <>
            <div className="pt-4 pb-2">
              <div className="px-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Authorized Signers</h2>
                <WexButton
                  intent="primary"
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto justify-center border-[#0058a3] text-[#0058a3] hover:bg-blue-50"
                  onClick={() => {
                    resetAuthorizedSignerForm();
                    setEditingAuthorizedSignerId(null);
                    setIsAddAuthorizedSignerModalOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sm:ml-2">Add Authorized Signer</span>
                </WexButton>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            {authorizedSigners.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-8 py-16">
                <WexEmpty className="border-0 py-12">
                  <WexEmpty.Header>
                    <WexEmpty.Media variant="default">
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
                        <ShieldCheck className="h-10 w-10 text-gray-400" />
                      </div>
                    </WexEmpty.Media>
                    <WexEmpty.Title className="text-lg font-semibold text-[#243746]">
                      Add an Authorized Signer
                    </WexEmpty.Title>
                    <WexEmpty.Description>
                      You have no authorized signers added yet. Add an authorized signer to grant them permission to act on your behalf.
                    </WexEmpty.Description>
                  </WexEmpty.Header>
                  <WexEmpty.Content>
                    <WexButton
                      intent="primary"
                      onClick={() => {
                        resetAuthorizedSignerForm();
                        setEditingAuthorizedSignerId(null);
                        setIsAddAuthorizedSignerModalOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Authorized Signer</span>
                    </WexButton>
                  </WexEmpty.Content>
                </WexEmpty>
              </div>
            ) : (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {authorizedSigners.map((signer) => (
                  <WexCard key={signer.id} className="p-4 w-80">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#243746] mb-0">
                          {signer.firstName} {signer.middleName ? `${signer.middleName} ` : ""}{signer.lastName}
                        </h3>
                        <p className="text-[11px] text-gray-500 mb-3 capitalize">
                          {signer.type}
                        </p>
                        <div className="flex gap-1.5 text-sm text-[#243746]">
                          <span className="text-gray-500">Birth Date:</span>
                          <span>{signer.birthDate || "Not provided"}</span>
                        </div>
                      </div>
                      <WexDropdownMenu>
                        <WexDropdownMenu.Trigger asChild>
                          <WexButton
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4 text-[#243746]" />
                          </WexButton>
                        </WexDropdownMenu.Trigger>
                        <WexDropdownMenu.Content align="end">
                          <WexDropdownMenu.Item
                            className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                            onClick={() => handleViewAuthorizedSigner(signer)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="text-sm text-[#243746] leading-none">View</span>
                          </WexDropdownMenu.Item>
                          <WexDropdownMenu.Item
                            className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                            onClick={() => handleEditAuthorizedSigner(signer)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="text-sm text-[#243746] leading-none">Edit</span>
                          </WexDropdownMenu.Item>
                          <WexDropdownMenu.Item
                            className="flex items-center gap-2 px-3 py-2 cursor-pointer text-red-500"
                            onClick={() => handleRemoveAuthorizedSignerClick(signer)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="text-sm leading-none">Remove</span>
                          </WexDropdownMenu.Item>
                        </WexDropdownMenu.Content>
                      </WexDropdownMenu>
                    </div>
                  </WexCard>
                ))}
              </div>
            )}
          </>
        );

      case "banking":
        return (
          <>
            <div className="pt-4 pb-2">
              <div className="px-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Bank Accounts</h2>
                <WexButton
                  intent="primary"
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto justify-center border-[#0058a3] text-[#0058a3] hover:bg-blue-50"
                  onClick={() => {
                    setBankAccountFormData({
                      verificationMethod: "text",
                      verificationCode: "",
                      accountType: "checking",
                      accountNumber: "",
                      confirmAccountNumber: "",
                      routingNumber: "",
                      accountNickname: "",
                      selectedDirectDepositOptions: [],
                    });
                    setBankAccountStep("step1");
                    setEditingBankAccountId(null);
                    setIsAddBankAccountModalOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sm:ml-2">Add New Bank Account</span>
                </WexButton>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            {bankAccounts.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-8 py-16">
                <WexEmpty className="border-0 py-12">
                  <WexEmpty.Header>
                    <WexEmpty.Media variant="default">
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
                        <Landmark className="h-10 w-10 text-gray-400" />
                      </div>
                    </WexEmpty.Media>
                    <WexEmpty.Title className="text-lg font-semibold text-[#243746]">
                      Add a Bank Account
                    </WexEmpty.Title>
                    <WexEmpty.Description>
                      You have no bank accounts added yet. Connect a bank account to receive reimbursements and deposits directly.
                    </WexEmpty.Description>
                  </WexEmpty.Header>
                  <WexEmpty.Content>
                    <WexButton
                      intent="primary"
                      onClick={() => {
                        setBankAccountFormData({
                          verificationMethod: "text",
                          verificationCode: "",
                          accountType: "checking",
                          accountNumber: "",
                          confirmAccountNumber: "",
                          routingNumber: "",
                          accountNickname: "",
                          selectedDirectDepositOptions: [],
                        });
                        setBankAccountStep("step1");
                        setEditingBankAccountId(null);
                        setIsAddBankAccountModalOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Bank Account</span>
                    </WexButton>
                  </WexEmpty.Content>
                </WexEmpty>
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Your bank information is protected</span>
                </div>
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
                          variant="ghost"
                          size="sm"
                          className="text-[#0058a3] hover:bg-blue-50"
                          onClick={() => handleEditBankAccount(bankAccount)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </WexButton>
                        <WexButton
                          variant="ghost"
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
            {/* Page Header */}
            <div className="border-b border-[#e4e6e9] px-6 py-4">
              <h2 className="text-2xl font-semibold text-[#243746] tracking-[-0.456px] leading-8">
                Debit Card
              </h2>
            </div>
            
            {/* Description */}
            <div className="px-6 py-6">
              <p className="text-base text-[#243746] leading-6 tracking-[-0.221px]">
                Manage your debit cards, activation, status, and replacements.
              </p>
            </div>
            
            {/* Debit Cards Grid */}
            <div className="px-6 pb-6">
              <div className="flex flex-col gap-6">
                {/* Cards Row */}
                <div className="flex gap-8 flex-wrap">
                  {debitCards.map((card) => (
                    <WexCard
                      key={card.id}
                      className="w-[325px] p-4 bg-white rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                    >
                      <div className="flex flex-col gap-2">
                        {/* Card Header */}
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-semibold text-[#1d2c38] tracking-[-0.176px] leading-6 whitespace-nowrap">
                            {card.cardholderName}
                          </h3>
                          <WexDropdownMenu
                            open={openDropdownId === card.id}
                            onOpenChange={(open) =>
                              setOpenDropdownId(open ? card.id : null)
                            }
                          >
                            <WexDropdownMenu.Trigger asChild>
                              <WexButton
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-3.5 w-3.5 text-[#243746]" />
                              </WexButton>
                            </WexDropdownMenu.Trigger>
                            <WexDropdownMenu.Content align="end" className="w-[198px] min-w-[175px]">
                              <WexDropdownMenu.Item
                                className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                                onClick={() => {
                                  setSelectedCardForDetails(card);
                                  setIsCardDetailsModalOpen(true);
                                  setOpenDropdownId(null);
                                }}
                              >
                                <Eye className="h-3.5 w-3.5 text-[#7c858e]" />
                                <span className="text-sm text-[#243746] leading-none">View Details</span>
                              </WexDropdownMenu.Item>
                              <WexDropdownMenu.Item
                                className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                                onClick={() => {
                                  setSearchParams({ subPage: "order-replacement-card", cardId: card.id });
                                  setOpenDropdownId(null);
                                }}
                              >
                                <RefreshCw className="h-3.5 w-3.5 text-[#7c858e]" />
                                <span className="text-sm text-[#243746] leading-none">Order Replacement</span>
                              </WexDropdownMenu.Item>
                            </WexDropdownMenu.Content>
                          </WexDropdownMenu>
                        </div>
                        
                        {/* Card Details */}
                        <div className="flex flex-col gap-1">
                          {/* Card Number and Status */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6 whitespace-nowrap">
                              •••• {card.cardNumber}
                            </span>
                            <WexBadge
                              intent={card.status === "ready-to-activate" ? "success" : "info"}
                              size="sm"
                              className="text-xs font-bold px-1.5 py-0.5 rounded-md"
                            >
                              {card.status === "ready-to-activate"
                                ? "Ready to Activate"
                                : "Active"}
                            </WexBadge>
                          </div>
                          
                          {/* Expiration Date */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6 whitespace-nowrap">
                              Expires:
                            </span>
                            <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6 whitespace-nowrap">
                              {card.expirationDate}
                            </span>
                          </div>
                          
                          {/* Effective Date */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6 whitespace-nowrap">
                              Effective:
                            </span>
                            <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6 whitespace-nowrap">
                              {card.effectiveDate}
                            </span>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <div className="mt-2">
                          {card.status === "ready-to-activate" ? (
                            <WexButton
                              intent="primary"
                              className="w-full"
                              onClick={() => {
                                setCardBeingActivated(card);
                                setIsActivationAuthModalOpen(true);
                              }}
                            >
                              Activate
                            </WexButton>
                          ) : (
                            <WexButton
                              intent="destructive"
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                setSearchParams({ subPage: "report-lost-stolen", cardId: card.id });
                              }}
                            >
                              Report Lost/Stolen
                            </WexButton>
                          )}
                        </div>
                      </div>
                    </WexCard>
                  ))}
                </div>
                
                {/* Informational Alert */}
                <WexAlert
                  intent="info"
                  className="border border-[#bfdbfe] bg-[rgba(239,246,255,0.95)] rounded-md shadow-[0px_4px_8px_0px_rgba(2,5,10,0.04)]"
                >
                  <AlertCircle className="h-4 w-4 text-[#2563eb]" />
                  <WexAlert.Description className="text-base text-[#0058a3] leading-6 tracking-[-0.176px]">
                    <span className="font-normal">
                      Request New Personal Identification Number (PIN) Toll Free Number:{" "}
                    </span>
                    <span className="font-semibold">(866) 898-9795</span>
                  </WexAlert.Description>
                </WexAlert>
              </div>
            </div>
            
            {/* Card Details Modal */}
            <WexDialog open={isCardDetailsModalOpen} onOpenChange={setIsCardDetailsModalOpen}>
              <WexDialog.Content className="w-[400px] p-0 gap-6 [&>div:last-child]:hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-[17.5px] border-b border-[#edeff0]">
                  <WexDialog.Title className="text-[17.5px] font-semibold text-[#243746] leading-normal">
                    Card Details
                  </WexDialog.Title>
                  <WexDialog.Close asChild>
                    <WexButton
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="Close"
                    >
                      <X className="h-3.5 w-3.5 text-[#515f6b]" />
                    </WexButton>
                  </WexDialog.Close>
                </div>
                
                {/* Content */}
                <div className="px-0 pb-6 flex flex-col items-start w-[400px] gap-6">
                  {/* Card Details Section */}
                  <div className="px-6 flex flex-col gap-2 w-full">
                    {/* Status Badge */}
                    {selectedCardForDetails && (
                      <>
                        <WexBadge intent="info" size="sm" className="w-fit">
                          {selectedCardForDetails.status === "active" ? "Active" : "Ready to Activate"}
                        </WexBadge>
                        
                        {/* Cardholder Name */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            Cardholder Name:
                          </span>
                          <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            {selectedCardForDetails.cardholderName}
                          </span>
                        </div>
                        
                        {/* Card Number */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            Card Number:
                          </span>
                          <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            {selectedCardForDetails.fullCardNumber || `•••• ${selectedCardForDetails.cardNumber}`}
                          </span>
                        </div>
                        
                        {/* Expiration Date */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            Expires:
                          </span>
                          <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            {selectedCardForDetails.expirationDate}
                          </span>
                        </div>
                        
                        {/* Effective Date */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            Effective:
                          </span>
                          <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            {selectedCardForDetails.effectiveDate}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Purse Status Section */}
                  {selectedCardForDetails && selectedCardForDetails.purseStatuses && (
                    <div className="px-6 flex flex-col gap-2 w-full">
                      <h3 className="text-sm font-semibold text-[#243746] tracking-[-0.084px] leading-6">
                        Purse Status
                      </h3>
                      {selectedCardForDetails.purseStatuses.map((purseStatus, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                          <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            {purseStatus.accountName}:
                          </span>
                          <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            {purseStatus.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </WexDialog.Content>
            </WexDialog>
            
            {/* Card Activation Authentication Modal */}
            <WexDialog open={isActivationAuthModalOpen} onOpenChange={setIsActivationAuthModalOpen}>
              <WexDialog.Content className="w-[448px] p-0 gap-6 [&>div:last-child]:hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-[17.5px] border-b border-[#edeff0]">
                  <WexDialog.Title className="text-[17.5px] font-semibold text-[#243746] leading-normal">
                    Authentication
                  </WexDialog.Title>
                  <WexDialog.Close asChild>
                    <WexButton
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="Close"
                      onClick={() => {
                        setActivationVerificationMethod("");
                      }}
                    >
                      <X className="h-3.5 w-3.5 text-[#515f6b]" />
                    </WexButton>
                  </WexDialog.Close>
                </div>
                
                {/* Content */}
                <div className="px-0 pb-0 flex flex-col gap-6 w-[448px]">
                  {/* Explanatory Text */}
                  <div className="px-6 flex flex-col items-start justify-center">
                    <p className="text-[17px] font-normal text-[#243746] tracking-[-0.221px] leading-6">
                      Your protection is important to us. We need to take some extra steps to verify your identity. Choose how you'd like to receive a verification code.
                    </p>
                  </div>
                  
                  {/* Verification Method Selection */}
                  <div className="px-6 flex flex-col gap-4">
                    <WexRadioGroup
                      value={activationVerificationMethod}
                      onValueChange={(value) => setActivationVerificationMethod(value as "text" | "email")}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex items-center gap-2 p-4 border border-[#e4e6e9] rounded-[11px] hover:bg-[#f8f9fa]">
                        <WexRadioGroup.Item value="text" id="verify-text-activation" />
                        <WexLabel htmlFor="verify-text-activation" className="cursor-pointer flex-1 text-sm text-[#243746]">
                          <span className="font-semibold">Text Message</span> at (***) ***-1111
                        </WexLabel>
                      </div>
                      <div className="flex items-center gap-2 p-4 border border-[#e4e6e9] rounded-[11px] hover:bg-[#f8f9fa]">
                        <WexRadioGroup.Item value="email" id="verify-email-activation" />
                        <WexLabel htmlFor="verify-email-activation" className="cursor-pointer flex-1 text-sm text-[#243746]">
                          <span className="font-semibold">Email</span> at my***m**@******.com
                        </WexLabel>
                      </div>
                    </WexRadioGroup>
                  </div>
                </div>
                
                {/* Footer */}
                <WexDialog.Footer className="flex gap-2 justify-end p-[17.5px] border-t border-[#edeff0]">
                  <WexButton
                    intent="secondary"
                    variant="outline"
                    onClick={() => {
                      setIsActivationAuthModalOpen(false);
                      setActivationVerificationMethod("");
                    }}
                  >
                    Cancel
                  </WexButton>
                  <WexButton
                    intent="primary"
                    onClick={() => {
                      if (activationVerificationMethod) {
                        if (activationVerificationMethod === "text") {
                          // Close authentication modal and open verification code modal
                          setIsActivationAuthModalOpen(false);
                          setIsVerificationCodeModalOpen(true);
                          setVerificationResendTimer(45); // Start 45-second timer
                        } else {
                          // Handle email method - show toast for now
                          wexToast.success("Verification code will be sent via email");
                          setIsActivationAuthModalOpen(false);
                          setActivationVerificationMethod("");
                        }
                      } else {
                        wexToast.error("Please select a verification method");
                      }
                    }}
                    disabled={!activationVerificationMethod}
                  >
                    Next
                  </WexButton>
                </WexDialog.Footer>
              </WexDialog.Content>
            </WexDialog>
            
            {/* Verification Code Modal */}
            <WexDialog open={isVerificationCodeModalOpen} onOpenChange={setIsVerificationCodeModalOpen}>
              <WexDialog.Content className="w-[448px] p-0 gap-6 [&>div:last-child]:hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-[17.5px] border-b border-[#edeff0]">
                  <WexDialog.Title className="text-[17.5px] font-semibold text-[#243746] leading-normal">
                    Authentication
                  </WexDialog.Title>
                  <WexDialog.Close asChild>
                    <WexButton
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="Close"
                      onClick={() => {
                        setVerificationCode("");
                        setVerificationResendTimer(0);
                      }}
                    >
                      <X className="h-3.5 w-3.5 text-[#515f6b]" />
                    </WexButton>
                  </WexDialog.Close>
                </div>
                
                {/* Content */}
                <div className="px-0 pb-0 flex flex-col gap-6 w-[448px]">
                  {/* Message Text */}
                  <div className="px-6 flex flex-col items-start justify-center">
                    <p className="text-[17px] font-normal text-[#243746] tracking-[-0.221px] leading-6">
                      We sent a 6-digit verification code to (***) ***-1111.
                    </p>
                  </div>
                  
                  {/* Verification Code Input */}
                  <div className="px-6 flex flex-col gap-2">
                    <WexFloatLabel
                      label="Verification Code"
                      value={verificationCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                        setVerificationCode(value);
                      }}
                      maxLength={6}
                      type="text"
                      inputMode="numeric"
                    />
                    
                    {/* Resend Timer */}
                    <p className="text-xs font-normal text-[#243746] leading-[21px]">
                      {verificationResendTimer > 0
                        ? `Resend in ${Math.floor(verificationResendTimer / 60)}:${String(verificationResendTimer % 60).padStart(2, "0")}`
                        : ""}
                    </p>
                  </div>
                  
                  {/* Resend Code Button */}
                  <div className="px-6">
                    <WexButton
                      intent="secondary"
                      variant="outline"
                      className="w-fit"
                      onClick={() => {
                        setVerificationResendTimer(45);
                        wexToast.success("Verification code resent");
                      }}
                      disabled={verificationResendTimer > 0}
                    >
                      Resend Code
                    </WexButton>
                  </div>
                </div>
                
                {/* Footer */}
                <WexDialog.Footer className="flex gap-2 justify-end p-[17.5px] border-t border-[#edeff0]">
                  <WexButton
                    intent="secondary"
                    variant="outline"
                    onClick={() => {
                      setIsVerificationCodeModalOpen(false);
                      setVerificationCode("");
                      setVerificationResendTimer(0);
                    }}
                  >
                    Cancel
                  </WexButton>
                  <WexButton
                    intent="primary"
                    onClick={() => {
                      if (verificationCode.length === 6) {
                        // Close verification code modal and open activation confirmation modal
                        setIsVerificationCodeModalOpen(false);
                        setVerificationCode("");
                        setVerificationResendTimer(0);
                        setIsActivateCardModalOpen(true);
                      } else {
                        wexToast.error("Please enter a 6-digit verification code");
                      }
                    }}
                    disabled={verificationCode.length !== 6}
                  >
                    Next
                  </WexButton>
                </WexDialog.Footer>
              </WexDialog.Content>
            </WexDialog>
            
            {/* Use a different method link */}
            {isVerificationCodeModalOpen && (
              <div className="absolute left-1/2 top-[392px] -translate-x-1/2 z-50">
                <WexButton
                  variant="ghost"
                  className="text-[#243746] hover:underline h-auto p-0"
                  onClick={() => {
                    setIsVerificationCodeModalOpen(false);
                    setVerificationCode("");
                    setVerificationResendTimer(0);
                    setIsActivationAuthModalOpen(true);
                  }}
                >
                  Use a different method
                </WexButton>
              </div>
            )}
            
            {/* Card Activation Confirmation Modal */}
            <WexDialog open={isActivateCardModalOpen} onOpenChange={setIsActivateCardModalOpen}>
              <WexDialog.Content className="w-[448px] p-0 gap-6 [&>div:last-child]:hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-[17.5px] border-b border-[#edeff0]">
                  <WexDialog.Title className="text-[17.5px] font-semibold text-[#243746] leading-normal">
                    Activate Card
                  </WexDialog.Title>
                  <WexDialog.Close asChild>
                    <WexButton
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="Close"
                    >
                      <X className="h-3.5 w-3.5 text-[#515f6b]" />
                    </WexButton>
                  </WexDialog.Close>
                </div>
                
                {/* Content */}
                <div className="px-0 pb-0 flex flex-col gap-6 w-[448px]">
                  {/* Cardholder Information */}
                  <div className="px-6 flex flex-col gap-2">
                    {cardBeingActivated && (
                      <>
                        {/* Cardholder Name */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            Cardholder Name:
                          </span>
                          <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            {cardBeingActivated.cardholderName}
                          </span>
                        </div>
                        
                        {/* Card Number */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            Card Number:
                          </span>
                          <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            x{cardBeingActivated.cardNumber}
                          </span>
                        </div>
                        
                        {/* Marital Status */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            Marital Status:
                          </span>
                          <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6 whitespace-nowrap">
                            Single
                          </span>
                        </div>
                        
                        {/* Status Badge */}
                        <WexBadge intent="success" size="sm" className="w-fit">
                          Ready to Activate
                        </WexBadge>
                      </>
                    )}
                  </div>
                  
                  {/* Disclaimer Text */}
                  <div className="px-6">
                    <p className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6">
                      By activating your card, you agree and consent that you have carefully read and understand the{" "}
                      <WexButton
                        variant="ghost"
                        className="text-[#0058a3] hover:underline h-auto p-0 font-normal inline"
                        onClick={() => {
                          // Handle cardholder agreement link - can open in new tab or show modal
                          wexToast.info("Cardholder agreement link clicked");
                        }}
                      >
                        cardholder agreement
                      </WexButton>
                      . If you are activating your card prior to receiving it, please closely monitor your account notifications and transactions for any unauthorized activity.
                    </p>
                  </div>
                </div>
                
                {/* Footer */}
                <WexDialog.Footer className="flex gap-2 justify-end p-[17.5px] border-t border-[#edeff0]">
                  <WexButton
                    intent="secondary"
                    variant="outline"
                    onClick={() => {
                      setIsActivateCardModalOpen(false);
                      setCardBeingActivated(null);
                    }}
                  >
                    Cancel
                  </WexButton>
                  <WexButton
                    intent="primary"
                    onClick={() => {
                      if (cardBeingActivated) {
                        // Update card status to active
                        setDebitCards((prevCards) =>
                          prevCards.map((card) =>
                            card.id === cardBeingActivated.id
                              ? { ...card, status: "active" as const }
                              : card
                          )
                        );
                        wexToast.success("Card successfully activated", {
                          description: `Card number xxxx${cardBeingActivated.cardNumber} has been successfully activated`,
                        });
                        setIsActivateCardModalOpen(false);
                        setCardBeingActivated(null);
                      }
                    }}
                  >
                    Activate
                  </WexButton>
                </WexDialog.Footer>
              </WexDialog.Content>
            </WexDialog>
          </>
        );

      case "report-lost-stolen": {
        // Get card ID from URL params
        const cardId = searchParams.get("cardId");
        const cardToReport = debitCards.find((card) => card.id === cardId);

        if (!cardToReport) {
          // If card not found, redirect back to debit-card page
          return (
            <>
              <div className="px-6 py-4">
                <WexButton
                  intent="secondary"
                  variant="outline"
                  onClick={() => setSearchParams({ subPage: "debit-card" })}
                >
                  Back to Debit Card
                </WexButton>
              </div>
            </>
          );
        }

        return (
          <>
            {/* Page Header */}
            <div className="border-b border-[#e4e6e9] px-6 py-4">
              <h2 className="text-2xl font-semibold text-[#243746] tracking-[-0.456px] leading-8">
                Report Card Lost/Stolen
              </h2>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              {/* Card Information Section */}
              <div className="border-b border-[#e4e6e9] px-6 pb-6 pt-6">
                <div className="flex items-start justify-between gap-16">
                  <div className="flex flex-col gap-4 flex-1">
                    <h3 className="text-xl font-medium text-[#243746] tracking-[-0.34px] leading-8">
                      Card Information
                    </h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6">
                          Selected Card:
                        </span>
                        <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6">
                          {cardToReport.cardholderName} x{cardToReport.cardNumber}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6">
                          Current Status:
                        </span>
                        <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6">
                          {cardToReport.status === "active" ? "Active" : "Ready to Activate"}
                        </span>
                      </div>
                      {cardToReport.status === "active" && (
                        <div className="flex items-center">
                          <WexBadge intent="success" size="sm" className="w-fit">
                            Active
                          </WexBadge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mailing Address Section */}
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-medium text-[#243746] tracking-[-0.34px] leading-8">
                        Mailing Address
                      </h3>
                      <WexButton
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 gap-1.5"
                        onClick={() => {
                          setMailingAddressForm({
                            street: mailingAddress.street,
                            addressLine2: mailingAddress.addressLine2 || "",
                            city: mailingAddress.city,
                            state: mailingAddress.state,
                            zip: mailingAddress.zip,
                            country: mailingAddress.country,
                          });
                          setIsMailingAddressModalOpen(true);
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5 text-[#0058a3]" />
                        <span className="text-sm font-medium text-[#0058a3]">Edit</span>
                      </WexButton>
                    </div>
                    <div className="flex flex-col text-sm text-[#1d2c38] tracking-[-0.084px] leading-6">
                      <p className="mb-0">{mailingAddress.name}</p>
                      <p className="mb-0">{mailingAddress.street}</p>
                      {mailingAddress.addressLine2 && <p className="mb-0">{mailingAddress.addressLine2}</p>}
                      <p className="mb-0">
                        {mailingAddress.city}, {mailingAddress.state} {mailingAddress.zip}
                      </p>
                      <p>{mailingAddress.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Update Card Status Section */}
              <div className="border-b border-[#e4e6e9] px-6 pb-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-medium text-[#243746] tracking-[-0.34px] leading-8">
                    Update Card Status
                  </h3>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6 w-[190px]">
                      New Status:
                    </span>
                    <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6">
                      Lost/Stolen
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6 w-[190px]">
                      Can you confirm this card has been lost/stolen?
                    </span>
                    <WexRadioGroup
                      value={confirmationAnswer}
                      onValueChange={(value) => setConfirmationAnswer(value as "yes" | "no")}
                      className="flex gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <WexRadioGroup.Item value="yes" id="confirm-yes" />
                        <WexLabel htmlFor="confirm-yes" className="cursor-pointer text-sm text-[#334155]">
                          Yes
                        </WexLabel>
                      </div>
                      <div className="flex items-center gap-2">
                        <WexRadioGroup.Item value="no" id="confirm-no" />
                        <WexLabel htmlFor="confirm-no" className="cursor-pointer text-sm text-[#334155]">
                          No
                        </WexLabel>
                      </div>
                    </WexRadioGroup>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6 w-[190px]">
                      Replacement Fee:
                    </span>
                    <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6">
                      $3.00
                    </span>
                  </div>
                </div>
              </div>

              {/* What Happens Next Section */}
              <div className="border-b border-[#e4e6e9] px-6 pb-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-medium text-[#243746] tracking-[-0.34px] leading-8">
                    What Happens Next
                  </h3>
                  <p className="text-sm font-normal text-[#1d2c38] tracking-[-0.084px] leading-6">
                    A replacement card with a new card number will be automatically issued and mailed to the primary cardholder's address within 5–7 business days.
                  </p>
                  <p className="text-sm font-normal text-[#1d2c38] tracking-[-0.084px] leading-6">
                    A United States mailing address is required to receive a replacement card. Cards cannot be issued to international mailing addresses.
                  </p>
                  <WexAlert
                    intent="info"
                    className="border border-[#bfdbfe] bg-[rgba(239,246,255,0.95)] rounded-md shadow-[0px_4px_8px_0px_rgba(2,5,10,0.04)]"
                  >
                    <AlertCircle className="h-4 w-4 text-[#2563eb]" />
                    <WexAlert.Description className="text-base text-[#0058a3] leading-6 tracking-[-0.176px]">
                      <span className="font-normal">
                        A replacement card fee may apply. If you suspect fraud, please mark the card as Lost/Stolen and contact XX Bank HSA Customer Support at{" "}
                      </span>
                      <span className="font-semibold">1-888-350-5353</span>
                      <span className="font-normal"> to file a report and initiate an investigation.</span>
                    </WexAlert.Description>
                  </WexAlert>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between px-6 pb-6">
                <WexButton
                  intent="secondary"
                  variant="outline"
                  onClick={() => {
                    setSearchParams({ subPage: "debit-card" });
                    setConfirmationAnswer("");
                  }}
                >
                  Cancel
                </WexButton>
                <WexButton
                  intent="primary"
                  onClick={() => {
                    if (confirmationAnswer === "yes") {
                      wexToast.success("Card reported as lost/stolen", {
                        description: `Card number xxxx${cardToReport.cardNumber} has been reported as lost/stolen. A replacement card will be issued.`,
                      });
                      setSearchParams({ subPage: "debit-card" });
                      setConfirmationAnswer("");
                    } else {
                      wexToast.error("Please confirm that the card has been lost/stolen");
                    }
                  }}
                  disabled={confirmationAnswer !== "yes"}
                >
                  Send
                </WexButton>
              </div>
            </div>

            {/* Update Mailing Address Modal */}
            <WexDialog open={isMailingAddressModalOpen} onOpenChange={setIsMailingAddressModalOpen}>
              <WexDialog.Content className="w-[400px] p-0 gap-6 [&>div:last-child]:hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-[17.5px]">
                  <WexDialog.Title className="text-[17.5px] font-semibold text-[#243746] leading-normal">
                    Update Mailing Address
                  </WexDialog.Title>
                  <WexDialog.Close asChild>
                    <WexButton
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="Close"
                    >
                      <X className="h-3.5 w-3.5 text-[#515f6b]" />
                    </WexButton>
                  </WexDialog.Close>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 flex flex-col gap-4">
                  {/* Address */}
                  <WexFloatLabel
                    label="Address"
                    value={mailingAddressForm.street}
                    onChange={(e) => setMailingAddressForm({ ...mailingAddressForm, street: e.target.value })}
                  />

                  {/* Address line 2 */}
                  <WexFloatLabel
                    label="Address line 2"
                    value={mailingAddressForm.addressLine2}
                    onChange={(e) => setMailingAddressForm({ ...mailingAddressForm, addressLine2: e.target.value })}
                  />

                  {/* City */}
                  <WexFloatLabel
                    label="City"
                    value={mailingAddressForm.city}
                    onChange={(e) => setMailingAddressForm({ ...mailingAddressForm, city: e.target.value })}
                  />

                  {/* State - Using Select with Float Label */}
                  <div className="relative w-full">
                    <WexSelect
                      value={mailingAddressForm.state}
                      onValueChange={(value) => setMailingAddressForm({ ...mailingAddressForm, state: value })}
                      onOpenChange={(open) => setIsStateSelectFocused(open)}
                    >
                      <WexSelect.Trigger className="h-14 pt-5 pb-2">
                        <WexSelect.Value placeholder=" " />
                      </WexSelect.Trigger>
                      <WexSelect.Content>
                        <WexSelect.Item value="AL">Alabama</WexSelect.Item>
                        <WexSelect.Item value="AK">Alaska</WexSelect.Item>
                        <WexSelect.Item value="AZ">Arizona</WexSelect.Item>
                        <WexSelect.Item value="AR">Arkansas</WexSelect.Item>
                        <WexSelect.Item value="CA">California</WexSelect.Item>
                        <WexSelect.Item value="CO">Colorado</WexSelect.Item>
                        <WexSelect.Item value="CT">Connecticut</WexSelect.Item>
                        <WexSelect.Item value="DE">Delaware</WexSelect.Item>
                        <WexSelect.Item value="FL">Florida</WexSelect.Item>
                        <WexSelect.Item value="GA">Georgia</WexSelect.Item>
                        <WexSelect.Item value="HI">Hawaii</WexSelect.Item>
                        <WexSelect.Item value="ID">Idaho</WexSelect.Item>
                        <WexSelect.Item value="IL">Illinois</WexSelect.Item>
                        <WexSelect.Item value="IN">Indiana</WexSelect.Item>
                        <WexSelect.Item value="IA">Iowa</WexSelect.Item>
                        <WexSelect.Item value="KS">Kansas</WexSelect.Item>
                        <WexSelect.Item value="KY">Kentucky</WexSelect.Item>
                        <WexSelect.Item value="LA">Louisiana</WexSelect.Item>
                        <WexSelect.Item value="ME">Maine</WexSelect.Item>
                        <WexSelect.Item value="MD">Maryland</WexSelect.Item>
                        <WexSelect.Item value="MA">Massachusetts</WexSelect.Item>
                        <WexSelect.Item value="MI">Michigan</WexSelect.Item>
                        <WexSelect.Item value="MN">Minnesota</WexSelect.Item>
                        <WexSelect.Item value="MS">Mississippi</WexSelect.Item>
                        <WexSelect.Item value="MO">Missouri</WexSelect.Item>
                        <WexSelect.Item value="MT">Montana</WexSelect.Item>
                        <WexSelect.Item value="NE">Nebraska</WexSelect.Item>
                        <WexSelect.Item value="NV">Nevada</WexSelect.Item>
                        <WexSelect.Item value="NH">New Hampshire</WexSelect.Item>
                        <WexSelect.Item value="NJ">New Jersey</WexSelect.Item>
                        <WexSelect.Item value="NM">New Mexico</WexSelect.Item>
                        <WexSelect.Item value="NY">New York</WexSelect.Item>
                        <WexSelect.Item value="NC">North Carolina</WexSelect.Item>
                        <WexSelect.Item value="ND">North Dakota</WexSelect.Item>
                        <WexSelect.Item value="OH">Ohio</WexSelect.Item>
                        <WexSelect.Item value="OK">Oklahoma</WexSelect.Item>
                        <WexSelect.Item value="OR">Oregon</WexSelect.Item>
                        <WexSelect.Item value="PA">Pennsylvania</WexSelect.Item>
                        <WexSelect.Item value="RI">Rhode Island</WexSelect.Item>
                        <WexSelect.Item value="SC">South Carolina</WexSelect.Item>
                        <WexSelect.Item value="SD">South Dakota</WexSelect.Item>
                        <WexSelect.Item value="TN">Tennessee</WexSelect.Item>
                        <WexSelect.Item value="TX">Texas</WexSelect.Item>
                        <WexSelect.Item value="UT">Utah</WexSelect.Item>
                        <WexSelect.Item value="VT">Vermont</WexSelect.Item>
                        <WexSelect.Item value="VA">Virginia</WexSelect.Item>
                        <WexSelect.Item value="WA">Washington</WexSelect.Item>
                        <WexSelect.Item value="WV">West Virginia</WexSelect.Item>
                        <WexSelect.Item value="WI">Wisconsin</WexSelect.Item>
                        <WexSelect.Item value="WY">Wyoming</WexSelect.Item>
                      </WexSelect.Content>
                    </WexSelect>
                    <label
                      className={`absolute pointer-events-none origin-top-left transition-all duration-200 ease-out left-3 text-sm text-[#7c858e] ${
                        mailingAddressForm.state || isStateSelectFocused
                          ? "top-2 scale-75 -translate-y-0 text-xs"
                          : "top-4"
                      }`}
                    >
                      State
                    </label>
                  </div>

                  {/* Zip Code */}
                  <WexFloatLabel
                    label="Zip Code"
                    value={mailingAddressForm.zip}
                    onChange={(e) => setMailingAddressForm({ ...mailingAddressForm, zip: e.target.value })}
                  />

                  {/* Country - Using Select with Float Label */}
                  <div className="relative w-full">
                    <WexSelect
                      value={mailingAddressForm.country}
                      onValueChange={(value) => setMailingAddressForm({ ...mailingAddressForm, country: value })}
                      onOpenChange={(open) => setIsCountrySelectFocused(open)}
                    >
                      <WexSelect.Trigger className="h-14 pt-5 pb-2">
                        <WexSelect.Value placeholder=" " />
                      </WexSelect.Trigger>
                      <WexSelect.Content>
                        <WexSelect.Item value="United States">United States</WexSelect.Item>
                        <WexSelect.Item value="Canada">Canada</WexSelect.Item>
                        <WexSelect.Item value="Mexico">Mexico</WexSelect.Item>
                      </WexSelect.Content>
                    </WexSelect>
                    <label
                      className={`absolute pointer-events-none origin-top-left transition-all duration-200 ease-out left-3 text-sm text-[#7c858e] ${
                        mailingAddressForm.country || isCountrySelectFocused
                          ? "top-2 scale-75 -translate-y-0 text-xs"
                          : "top-4"
                      }`}
                    >
                      Country
                    </label>
                  </div>
                </div>

                {/* Footer */}
                <WexDialog.Footer className="flex gap-2 justify-end p-[17.5px]">
                  <WexButton
                    intent="secondary"
                    variant="outline"
                    onClick={() => {
                      setIsMailingAddressModalOpen(false);
                    }}
                  >
                    Cancel
                  </WexButton>
                  <WexButton
                    intent="primary"
                    onClick={() => {
                      setMailingAddress({
                        ...mailingAddress,
                        street: mailingAddressForm.street,
                        addressLine2: mailingAddressForm.addressLine2,
                        city: mailingAddressForm.city,
                        state: mailingAddressForm.state,
                        zip: mailingAddressForm.zip,
                        country: mailingAddressForm.country,
                      });
                      setIsMailingAddressModalOpen(false);
                      wexToast.success("Address updated");
                    }}
                  >
                    Save
                  </WexButton>
                </WexDialog.Footer>
              </WexDialog.Content>
            </WexDialog>
          </>
        );
      }

      case "order-replacement-card": {
        // Get card ID from URL params
        const orderCardId = searchParams.get("cardId");
        const cardToOrder = debitCards.find((card) => card.id === orderCardId);

        if (!cardToOrder) {
          // If card not found, redirect back to debit-card page
          return (
            <>
              <div className="px-6 py-4">
                <WexButton
                  intent="secondary"
                  variant="outline"
                  onClick={() => setSearchParams({ subPage: "debit-card" })}
                >
                  Back to Debit Card
                </WexButton>
              </div>
            </>
          );
        }

        return (
          <>
            {/* Page Header */}
            <div className="border-b border-[#e4e6e9] px-6 py-4">
              <h2 className="text-2xl font-semibold text-[#243746] tracking-[-0.456px] leading-8">
                Order Replacement Card
              </h2>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              {/* Card Information Section */}
              <div className="border-b border-[#e4e6e9] px-6 pb-6 pt-6">
                <div className="flex items-start justify-between gap-16">
                  <div className="flex flex-col gap-4 flex-1">
                    <h3 className="text-xl font-medium text-[#243746] tracking-[-0.34px] leading-8">
                      Card Information
                    </h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6">
                          Selected Card:
                        </span>
                        <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6">
                          {cardToOrder.cardholderName} x{cardToOrder.cardNumber}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-[#515f6b] tracking-[-0.084px] leading-6">
                          Current Status:
                        </span>
                        <span className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6">
                          {cardToOrder.status === "active" ? "Active" : "Ready to Activate"}
                        </span>
                      </div>
                      {cardToOrder.status === "active" && (
                        <div className="flex items-center">
                          <WexBadge intent="success" size="sm" className="w-fit">
                            Active
                          </WexBadge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mailing Address Section */}
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-medium text-[#243746] tracking-[-0.34px] leading-8">
                        Mailing Address
                      </h3>
                      <WexButton
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 gap-1.5"
                        onClick={() => {
                          setMailingAddressForm({
                            street: mailingAddress.street,
                            addressLine2: mailingAddress.addressLine2 || "",
                            city: mailingAddress.city,
                            state: mailingAddress.state,
                            zip: mailingAddress.zip,
                            country: mailingAddress.country,
                          });
                          setIsMailingAddressModalOpen(true);
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5 text-[#0058a3]" />
                        <span className="text-sm font-medium text-[#0058a3]">Edit</span>
                      </WexButton>
                    </div>
                    <div className="flex flex-col text-sm text-[#1d2c38] tracking-[-0.084px] leading-6">
                      <p className="mb-0">{mailingAddress.name}</p>
                      <p className="mb-0">{mailingAddress.street}</p>
                      {mailingAddress.addressLine2 && <p className="mb-0">{mailingAddress.addressLine2}</p>}
                      <p className="mb-0">
                        {mailingAddress.city}, {mailingAddress.state} {mailingAddress.zip}
                      </p>
                      <p>{mailingAddress.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Happens Next Section */}
              <div className="border-b border-[#e4e6e9] px-6 pb-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-medium text-[#243746] tracking-[-0.34px] leading-8">
                    What Happens Next
                  </h3>
                  <p className="text-sm font-normal text-[#1d2c38] tracking-[-0.084px] leading-6">
                    A replacement card with a new card number will be automatically issued and mailed to the primary cardholder's address within 5–7 business days.
                  </p>
                  <p className="text-sm font-normal text-[#1d2c38] tracking-[-0.084px] leading-6">
                    A United States mailing address is required to receive a replacement card. Cards cannot be issued to international mailing addresses.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between px-6 pb-6">
                <WexButton
                  intent="secondary"
                  variant="outline"
                  onClick={() => {
                    setSearchParams({ subPage: "debit-card" });
                  }}
                >
                  Cancel
                </WexButton>
                <WexButton
                  intent="primary"
                  onClick={() => {
                    wexToast.success("Replacement card ordered", {
                      description: `A replacement card for ${cardToOrder.cardholderName} x${cardToOrder.cardNumber} will be mailed within 5–7 business days.`,
                    });
                    setSearchParams({ subPage: "debit-card" });
                  }}
                >
                  Send
                </WexButton>
              </div>
            </div>

            {/* Update Mailing Address Modal - Reuse existing modal */}
            <WexDialog open={isMailingAddressModalOpen} onOpenChange={setIsMailingAddressModalOpen}>
              <WexDialog.Content className="w-[400px] p-0 gap-6 [&>div:last-child]:hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-[17.5px]">
                  <WexDialog.Title className="text-[17.5px] font-semibold text-[#243746] leading-normal">
                    Update Mailing Address
                  </WexDialog.Title>
                  <WexDialog.Close asChild>
                    <WexButton
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="Close"
                    >
                      <X className="h-3.5 w-3.5 text-[#515f6b]" />
                    </WexButton>
                  </WexDialog.Close>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 flex flex-col gap-4">
                  {/* Address */}
                  <WexFloatLabel
                    label="Address"
                    value={mailingAddressForm.street}
                    onChange={(e) => setMailingAddressForm({ ...mailingAddressForm, street: e.target.value })}
                  />

                  {/* Address line 2 */}
                  <WexFloatLabel
                    label="Address line 2"
                    value={mailingAddressForm.addressLine2}
                    onChange={(e) => setMailingAddressForm({ ...mailingAddressForm, addressLine2: e.target.value })}
                  />

                  {/* City */}
                  <WexFloatLabel
                    label="City"
                    value={mailingAddressForm.city}
                    onChange={(e) => setMailingAddressForm({ ...mailingAddressForm, city: e.target.value })}
                  />

                  {/* State - Using Select with Float Label */}
                  <div className="relative w-full">
                    <WexSelect
                      value={mailingAddressForm.state}
                      onValueChange={(value) => setMailingAddressForm({ ...mailingAddressForm, state: value })}
                      onOpenChange={(open) => setIsStateSelectFocused(open)}
                    >
                      <WexSelect.Trigger className="h-14 pt-5 pb-2">
                        <WexSelect.Value placeholder=" " />
                      </WexSelect.Trigger>
                      <WexSelect.Content>
                        <WexSelect.Item value="AL">Alabama</WexSelect.Item>
                        <WexSelect.Item value="AK">Alaska</WexSelect.Item>
                        <WexSelect.Item value="AZ">Arizona</WexSelect.Item>
                        <WexSelect.Item value="AR">Arkansas</WexSelect.Item>
                        <WexSelect.Item value="CA">California</WexSelect.Item>
                        <WexSelect.Item value="CO">Colorado</WexSelect.Item>
                        <WexSelect.Item value="CT">Connecticut</WexSelect.Item>
                        <WexSelect.Item value="DE">Delaware</WexSelect.Item>
                        <WexSelect.Item value="FL">Florida</WexSelect.Item>
                        <WexSelect.Item value="GA">Georgia</WexSelect.Item>
                        <WexSelect.Item value="HI">Hawaii</WexSelect.Item>
                        <WexSelect.Item value="ID">Idaho</WexSelect.Item>
                        <WexSelect.Item value="IL">Illinois</WexSelect.Item>
                        <WexSelect.Item value="IN">Indiana</WexSelect.Item>
                        <WexSelect.Item value="IA">Iowa</WexSelect.Item>
                        <WexSelect.Item value="KS">Kansas</WexSelect.Item>
                        <WexSelect.Item value="KY">Kentucky</WexSelect.Item>
                        <WexSelect.Item value="LA">Louisiana</WexSelect.Item>
                        <WexSelect.Item value="ME">Maine</WexSelect.Item>
                        <WexSelect.Item value="MD">Maryland</WexSelect.Item>
                        <WexSelect.Item value="MA">Massachusetts</WexSelect.Item>
                        <WexSelect.Item value="MI">Michigan</WexSelect.Item>
                        <WexSelect.Item value="MN">Minnesota</WexSelect.Item>
                        <WexSelect.Item value="MS">Mississippi</WexSelect.Item>
                        <WexSelect.Item value="MO">Missouri</WexSelect.Item>
                        <WexSelect.Item value="MT">Montana</WexSelect.Item>
                        <WexSelect.Item value="NE">Nebraska</WexSelect.Item>
                        <WexSelect.Item value="NV">Nevada</WexSelect.Item>
                        <WexSelect.Item value="NH">New Hampshire</WexSelect.Item>
                        <WexSelect.Item value="NJ">New Jersey</WexSelect.Item>
                        <WexSelect.Item value="NM">New Mexico</WexSelect.Item>
                        <WexSelect.Item value="NY">New York</WexSelect.Item>
                        <WexSelect.Item value="NC">North Carolina</WexSelect.Item>
                        <WexSelect.Item value="ND">North Dakota</WexSelect.Item>
                        <WexSelect.Item value="OH">Ohio</WexSelect.Item>
                        <WexSelect.Item value="OK">Oklahoma</WexSelect.Item>
                        <WexSelect.Item value="OR">Oregon</WexSelect.Item>
                        <WexSelect.Item value="PA">Pennsylvania</WexSelect.Item>
                        <WexSelect.Item value="RI">Rhode Island</WexSelect.Item>
                        <WexSelect.Item value="SC">South Carolina</WexSelect.Item>
                        <WexSelect.Item value="SD">South Dakota</WexSelect.Item>
                        <WexSelect.Item value="TN">Tennessee</WexSelect.Item>
                        <WexSelect.Item value="TX">Texas</WexSelect.Item>
                        <WexSelect.Item value="UT">Utah</WexSelect.Item>
                        <WexSelect.Item value="VT">Vermont</WexSelect.Item>
                        <WexSelect.Item value="VA">Virginia</WexSelect.Item>
                        <WexSelect.Item value="WA">Washington</WexSelect.Item>
                        <WexSelect.Item value="WV">West Virginia</WexSelect.Item>
                        <WexSelect.Item value="WI">Wisconsin</WexSelect.Item>
                        <WexSelect.Item value="WY">Wyoming</WexSelect.Item>
                      </WexSelect.Content>
                    </WexSelect>
                    <label
                      className={`absolute pointer-events-none origin-top-left transition-all duration-200 ease-out left-3 text-sm text-[#7c858e] ${
                        mailingAddressForm.state || isStateSelectFocused
                          ? "top-2 scale-75 -translate-y-0 text-xs"
                          : "top-4"
                      }`}
                    >
                      State
                    </label>
                  </div>

                  {/* Zip Code */}
                  <WexFloatLabel
                    label="Zip Code"
                    value={mailingAddressForm.zip}
                    onChange={(e) => setMailingAddressForm({ ...mailingAddressForm, zip: e.target.value })}
                  />

                  {/* Country - Using Select with Float Label */}
                  <div className="relative w-full">
                    <WexSelect
                      value={mailingAddressForm.country}
                      onValueChange={(value) => setMailingAddressForm({ ...mailingAddressForm, country: value })}
                      onOpenChange={(open) => setIsCountrySelectFocused(open)}
                    >
                      <WexSelect.Trigger className="h-14 pt-5 pb-2">
                        <WexSelect.Value placeholder=" " />
                      </WexSelect.Trigger>
                      <WexSelect.Content>
                        <WexSelect.Item value="United States">United States</WexSelect.Item>
                        <WexSelect.Item value="Canada">Canada</WexSelect.Item>
                        <WexSelect.Item value="Mexico">Mexico</WexSelect.Item>
                      </WexSelect.Content>
                    </WexSelect>
                    <label
                      className={`absolute pointer-events-none origin-top-left transition-all duration-200 ease-out left-3 text-sm text-[#7c858e] ${
                        mailingAddressForm.country || isCountrySelectFocused
                          ? "top-2 scale-75 -translate-y-0 text-xs"
                          : "top-4"
                      }`}
                    >
                      Country
                    </label>
                  </div>
                </div>

                {/* Footer */}
                <WexDialog.Footer className="flex gap-2 justify-end p-[17.5px]">
                  <WexButton
                    intent="secondary"
                    variant="outline"
                    onClick={() => {
                      setIsMailingAddressModalOpen(false);
                    }}
                  >
                    Cancel
                  </WexButton>
                  <WexButton
                    intent="primary"
                    onClick={() => {
                      setMailingAddress({
                        ...mailingAddress,
                        street: mailingAddressForm.street,
                        addressLine2: mailingAddressForm.addressLine2,
                        city: mailingAddressForm.city,
                        state: mailingAddressForm.state,
                        zip: mailingAddressForm.zip,
                        country: mailingAddressForm.country,
                      });
                      setIsMailingAddressModalOpen(false);
                      wexToast.success("Address updated");
                    }}
                  >
                    Save
                  </WexButton>
                </WexDialog.Footer>
              </WexDialog.Content>
            </WexDialog>
          </>
        );
      }

      case "login-security":
        return (
          <>
            <div className="pt-4 pb-2">
              <div className="px-6 flex items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Login & Security</h2>
              </div>
              <WexSeparator className="mt-4" />
            </div>
            <div className="space-y-0">
              <div className="px-6 pt-4 pb-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-medium text-gray-800">Login Info</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5 text-sm">
                      <span className="text-gray-500">Username:</span>
                      <span className="text-gray-800">ux@wex</span>
                    </div>
                    <WexButton
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary active:text-primary [&>svg]:text-primary"
                    >
                      <Pencil />
                      Update Username
                    </WexButton>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1.5 text-sm">
                        <span className="text-gray-500">Password:</span>
                        <span className="text-gray-800">•••••••••••••••</span>
                      </div>
                      <p className="text-sm text-gray-600">Last Update: 01/19/2026</p>
                    </div>
                    <WexButton
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary active:text-primary [&>svg]:text-primary"
                    >
                      <Pencil />
                      Change Password
                    </WexButton>
                  </div>
                </div>
              </div>
              <WexSeparator />
              <div className="px-6 pt-4 pb-6">
                <div className="mb-4">
                  <h3 className="text-xl font-medium text-gray-800">Authentication Methods</h3>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-base font-semibold text-gray-800">Email</span>
                  <WexButton
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary active:text-primary [&>svg]:text-primary"
                  >
                    <Pencil />
                    Update
                  </WexButton>
                </div>
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-gray-800">emily.grace@email.com</p>
                  <p className="text-xs text-gray-600">Last Used: Today</p>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-base font-semibold text-gray-800">Mobile Number</span>
                  <WexButton
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary active:text-primary [&>svg]:text-primary"
                  >
                    <Pencil />
                    Update
                  </WexButton>
                </div>
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-gray-800">+1 (859) 123-1234</p>
                  <p className="text-xs text-gray-600">Last Used: 12/30/2025</p>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-base font-semibold text-gray-800">Authenticator App</span>
                  <WexButton
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary active:text-primary [&>svg]:text-primary"
                  >
                    <Pencil />
                    Setup Now
                  </WexButton>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-800">Not Setup</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-base font-semibold text-gray-800 mb-3">Authentication Settings</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-800 whitespace-nowrap">MFA Frequency:</span>
                    <WexSelect defaultValue="only-when-required">
                      <WexSelect.Trigger className="w-[200px]">
                        <WexSelect.Value />
                      </WexSelect.Trigger>
                      <WexSelect.Content>
                        <WexSelect.Item value="only-when-required">Only when required</WexSelect.Item>
                        <WexSelect.Item value="every-login">At every login</WexSelect.Item>
                      </WexSelect.Content>
                    </WexSelect>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "communication":
        return (
          <>

            {/* Contact Information Section */}
            <div className="px-6 pt-6 pb-6">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xl font-medium leading-8 tracking-[-0.34px] text-[#243746]">
                  Contact information
                </h2>
                  <WexButton
                    variant="ghost"
                    size="sm"
                  className="flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-[#0058a3] hover:bg-gray-100"
                  onClick={() => setIsContactInfoModalOpen(true)}
                  >
                  <Pencil className="h-4 w-4 text-[#0058a3]" />
                    Edit
                  </WexButton>
                </div>
              <div className="flex flex-col gap-2 text-sm tracking-[-0.084px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#515f6b]">Mobile number:</span>
                  <span className="text-[#1d2c38]">{mobileNumber}</span>
                  </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#515f6b]">Email address:</span>
                  <span className="text-[#1d2c38]">{emailAddress}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6">
              <WexTabs value={activeTab} onValueChange={handleTabChange}>
                <WexTabs.List className="bg-white border-b border-[#e4e6e9] border-solid flex items-end pr-[37px]">
                  <WexTabs.Trigger
                    value="statements"
                    className="bg-transparent border-b border-solid pb-[15px] pt-[14px] px-[15.75px] text-sm leading-normal font-normal data-[state=active]:font-bold data-[state=active]:text-[#0058a3] data-[state=active]:border-[#0058a3] data-[state=inactive]:text-[#515f6b] data-[state=inactive]:border-[#e4e6e9]"
                  >
                    Statements
                  </WexTabs.Trigger>
                  <WexTabs.Trigger
                    value="contributions"
                    className="bg-transparent border-b border-solid pb-[15px] pt-[14px] px-[15.75px] text-sm leading-normal font-normal data-[state=active]:font-bold data-[state=active]:text-[#0058a3] data-[state=active]:border-[#0058a3] data-[state=inactive]:text-[#515f6b] data-[state=inactive]:border-[#e4e6e9]"
                  >
                    Contributions
                  </WexTabs.Trigger>
                  <WexTabs.Trigger
                    value="payments"
                    className="bg-transparent border-b border-solid pb-[15px] pt-[14px] px-[15.75px] text-sm leading-normal font-normal data-[state=active]:font-bold data-[state=active]:text-[#0058a3] data-[state=active]:border-[#0058a3] data-[state=inactive]:text-[#515f6b] data-[state=inactive]:border-[#e4e6e9]"
                  >
                    Payments
                  </WexTabs.Trigger>
                  <WexTabs.Trigger
                    value="wex-benefits-card"
                    className="bg-transparent border-b border-solid pb-[15px] pt-[14px] px-[15.75px] text-sm leading-normal font-normal data-[state=active]:font-bold data-[state=active]:text-[#0058a3] data-[state=active]:border-[#0058a3] data-[state=inactive]:text-[#515f6b] data-[state=inactive]:border-[#e4e6e9]"
                  >
                    WEX Benefits Card
                  </WexTabs.Trigger>
                </WexTabs.List>

                {/* Statements Tab Content */}
                <WexTabs.Content value="statements" className="pt-6 pb-6">
                  <div className="flex flex-col gap-6">
                    {/* Statement Delivery Preferences Header */}
                    <div className="flex flex-col gap-1 px-6 md:px-0">
                      <h3 className="text-xl font-bold leading-8 tracking-[-0.34px] text-[#243746]">
                        Statement delivery preferences
                      </h3>
                      <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38] max-w-[1094px]">
                        Set how you want to receive your account documents. Select either Paper, Email, and/or Text for each statement type. Standard text message rates may apply. Disable text alerts by unchecking the boxes below. By opting into our text alerts, you agree to our{" "}
                        <a href="#" className="text-[#0058a3] hover:underline">terms of service</a>. Please review our{" "}
                        <a href="#" className="text-[#0058a3] hover:underline">privacy policy</a> for more information.
                      </p>
                      <div className="flex items-center justify-end gap-2 mt-2">
                        <span className="text-sm font-normal text-[#243746]">Go paperless</span>
                        <WexCheckbox
                          checked={goPaperless}
                          onCheckedChange={(checked) => setGoPaperless(checked === true)}
                        />
                      </div>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block">
                      {/* Table Header */}
                      <div className="h-6 pb-6">
                        <div className="flex items-center justify-between h-full px-6">
                          <div style={{ width: "493px" }}>
                            <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Statements</span>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Paper</span>
                            </div>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Email</span>
                            </div>
                            <div style={{ width: "80px" }} className="flex justify-center">
                              <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Text</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* HSA Account Summary Row */}
                      <div className="border-t border-[#e4e6e9]">
                        <div className="flex items-center justify-between px-6 py-4 min-h-[90px]">
                          <div className="flex flex-col gap-1" style={{ width: "493px" }}>
                            <div className="flex flex-col gap-1">
                              <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
                                HSA Account Summary
                              </h4>
                              <p className="text-sm font-normal italic leading-6 tracking-[-0.084px] text-[#1d2c38]">
                                $1.50 fee per printed summary
                              </p>
                              <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38]">
                                Automatically emailed based on whether or not you have an email address.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={hsaAccountSummaryPaper}
                                onCheckedChange={handleHsaAccountSummaryPaperChange}
                              />
                            </div>
                            <div style={{ width: "35px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={hsaAccountSummaryEmail}
                                onCheckedChange={(checked) => setHsaAccountSummaryEmail(checked === true)}
                              />
                            </div>
                            <div style={{ width: "80px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black">Not available</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* HSA Tax Documents Row */}
                      <div className="border-t border-[#e4e6e9]">
                        <div className="flex items-center justify-between px-6 py-4 min-h-[90px]">
                          <div className="flex flex-col gap-1" style={{ width: "493px" }}>
                            <div className="flex flex-col gap-1">
                              <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
                                HSA Tax Documents
                              </h4>
                              <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38]">
                                Automatically emailed based on whether or not you have an email address.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={hsaTaxDocumentsPaper}
                                onCheckedChange={handleHsaTaxDocumentsPaperChange}
                              />
                            </div>
                            <div style={{ width: "35px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={hsaTaxDocumentsEmail}
                                onCheckedChange={(checked) => setHsaTaxDocumentsEmail(checked === true)}
                              />
                            </div>
                            <div style={{ width: "80px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black">Not available</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden flex flex-col gap-2 px-4">
                      {/* HSA Account Summary Card */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-[#243746]">
                          HSA Account Summary
                        </h4>
                        <p className="text-sm font-normal italic leading-6 tracking-[-0.084px] text-[#1d2c38]">
                          $1.50 fee per printed summary
                        </p>
                        <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38]">
                          Automatically emailed based on whether or not you have an email address.
                        </p>
                  <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Paper</span>
                          <WexCheckbox
                            checked={hsaAccountSummaryPaper}
                            onCheckedChange={handleHsaAccountSummaryPaperChange}
                          />
                  </div>
                  <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Email</span>
                          <WexCheckbox
                            checked={hsaAccountSummaryEmail}
                            onCheckedChange={(checked) => setHsaAccountSummaryEmail(checked === true)}
                          />
                  </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Text</span>
                          <span className="text-xs font-normal leading-6 text-black">Not available</span>
                </div>
                        <WexSeparator className="my-2" />
              </div>

                      {/* HSA Tax Documents Card */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-[#243746]">
                          HSA Tax Documents
                        </h4>
                        <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38]">
                          Automatically emailed based on whether or not you have an email address.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Paper</span>
                          <WexCheckbox
                            checked={hsaTaxDocumentsPaper}
                            onCheckedChange={handleHsaTaxDocumentsPaperChange}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Email</span>
                          <WexCheckbox
                            checked={hsaTaxDocumentsEmail}
                            onCheckedChange={(checked) => setHsaTaxDocumentsEmail(checked === true)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Text</span>
                          <span className="text-xs font-normal leading-6 text-black">Not available</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-end gap-2 md:gap-3 pt-6 mt-6 border-t border-[#e4e6e9] px-4 md:px-0">
                  <WexButton
                      intent="primary"
                      onClick={() => {
                        // Save preferences action
                        setSavedState({
                          hsaAccountSummaryPaper,
                          hsaAccountSummaryEmail,
                          hsaTaxDocumentsPaper,
                          hsaTaxDocumentsEmail,
                          goPaperless,
                          contributionPostedEmail,
                          balanceBelowAmount,
                          balanceBelowEmail,
                          contributionsWithinAmount,
                          contributionsWithinEmail,
                          paymentIssuedEmail,
                          withdrawalExceedsAmount,
                          withdrawalExceedsEmail,
                          cardMailedEmail,
                          cardMailedText,
                          followUpNoticeText,
                          purchaseMadeEmail,
                          purchaseMadeText,
                          cardSuspendedText,
                          cardPurseSuspendedText,
                        });
                        wexToast.success("Communication preferences saved successfully");
                      }}
                      className="w-full md:min-w-[100px] md:w-auto bg-[#0058a3] text-white hover:bg-[#0058a3]/90 order-1 md:order-2"
                    >
                      Save Preferences
                  </WexButton>
                    <WexButton
                      intent="secondary"
                      variant="outline"
                      onClick={() => {
                        // Cancel action - reset to saved values
                        setHsaAccountSummaryPaper(savedState.hsaAccountSummaryPaper);
                        setHsaAccountSummaryEmail(savedState.hsaAccountSummaryEmail);
                        setHsaTaxDocumentsPaper(savedState.hsaTaxDocumentsPaper);
                        setHsaTaxDocumentsEmail(savedState.hsaTaxDocumentsEmail);
                        setGoPaperless(savedState.goPaperless);
                        setContributionPostedEmail(savedState.contributionPostedEmail);
                        setBalanceBelowAmount(savedState.balanceBelowAmount);
                        setBalanceBelowEmail(savedState.balanceBelowEmail);
                        setContributionsWithinAmount(savedState.contributionsWithinAmount);
                        setContributionsWithinEmail(savedState.contributionsWithinEmail);
                        setPaymentIssuedEmail(savedState.paymentIssuedEmail);
                        setWithdrawalExceedsAmount(savedState.withdrawalExceedsAmount);
                        setWithdrawalExceedsEmail(savedState.withdrawalExceedsEmail);
                        setCardMailedEmail(savedState.cardMailedEmail);
                        setCardMailedText(savedState.cardMailedText);
                        setFollowUpNoticeText(savedState.followUpNoticeText);
                        setPurchaseMadeEmail(savedState.purchaseMadeEmail);
                        setPurchaseMadeText(savedState.purchaseMadeText);
                        setCardSuspendedText(savedState.cardSuspendedText);
                        setCardPurseSuspendedText(savedState.cardPurseSuspendedText);
                      }}
                      className="w-full md:min-w-[100px] md:w-auto order-2 md:order-1"
                    >
                      Cancel
                  </WexButton>
                </div>
                </WexTabs.Content>

                {/* Contributions Tab Content */}
                <WexTabs.Content value="contributions" className="pt-6 pb-6">
                  <div className="flex flex-col gap-6">
                    {/* Notification Preferences Header */}
                    <div className="flex flex-col gap-1 px-6 md:px-6">
                      <h3 className="text-xl font-bold leading-8 tracking-[-0.34px] text-[#243746]">
                        Notification preferences
                      </h3>
                      <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38] max-w-[1094px]">
                        Manage how you receive real-time alerts for account activity. You can enable Email and/or Text for each notification. Standard text message rates may apply. Disable text alerts by unchecking the boxes below. By opting into our text alerts, you agree to our{" "}
                        <a href="#" className="text-[#0058a3] hover:underline">terms of service</a>. Please review our{" "}
                        <a href="#" className="text-[#0058a3] hover:underline">privacy policy</a> for more information.
                      </p>
                  </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block">
                      {/* Table Header */}
                      <div className="h-6 pb-6">
                        <div className="flex items-center justify-between h-full px-6">
                          <div style={{ width: "493px" }}>
                            <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Notification type</span>
                  </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Paper</span>
                </div>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Email</span>
              </div>
                            <div style={{ width: "80px" }} className="flex justify-center">
                              <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Text</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contribution Posted Row */}
                      <div className="border-t border-[#e4e6e9]">
                        <div className="flex items-center justify-between px-6 py-4 min-h-[90px]">
                          <div style={{ width: "493px" }}>
                            <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
                              Contribution posted to your HSA
                            </h4>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                            <div style={{ width: "35px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={contributionPostedEmail}
                                onCheckedChange={(checked) => setContributionPostedEmail(checked === true)}
                              />
                            </div>
                            <div style={{ width: "80px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Balance Below Row */}
                      <div className="border-t border-[#e4e6e9]">
                        <div className="flex items-center justify-between px-6 py-4 min-h-[90px]">
                          <div className="flex flex-col gap-1" style={{ width: "493px" }}>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
                                HSA available cash balance is below
                              </span>
                              <div className="flex items-center border border-[#a5aeb4] rounded-md overflow-hidden shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)]">
                                <div className="bg-white border-r border-[#a5aeb4] px-2 py-2 text-sm text-[#a5aeb4] flex items-center justify-center min-w-[35px]">
                                  $
                                </div>
                                <input
                                  type="text"
                                  value={balanceBelowAmount}
                                  onChange={(e) => setBalanceBelowAmount(e.target.value)}
                                  className="px-3 py-2 text-sm border-0 focus:outline-none focus:ring-0 bg-white"
                                  style={{ minWidth: "80px", width: "80px" }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                            <div style={{ width: "35px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={balanceBelowEmail}
                                onCheckedChange={(checked) => setBalanceBelowEmail(checked === true)}
                              />
                            </div>
                            <div style={{ width: "80px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contributions Within Row */}
                      <div className="border-t border-[#e4e6e9]">
                        <div className="flex items-center justify-between px-6 py-4 min-h-[90px]">
                          <div className="flex flex-col gap-1" style={{ width: "493px" }}>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
                                HSA contributions year-to-date are within
                              </span>
                              <div className="flex items-center border border-[#a5aeb4] rounded-md overflow-hidden shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)]">
                                <div className="bg-white border-r border-[#a5aeb4] px-2 py-2 text-sm text-[#a5aeb4] flex items-center justify-center min-w-[35px]">
                                  $
                                </div>
                                <input
                                  type="text"
                                  value={contributionsWithinAmount}
                                  onChange={(e) => setContributionsWithinAmount(e.target.value)}
                                  className="px-3 py-2 text-sm border-0 focus:outline-none focus:ring-0 bg-white"
                                  style={{ minWidth: "80px", width: "80px" }}
                                />
                              </div>
                              <span className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
                                of the IRS maximum
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                            <div style={{ width: "35px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={contributionsWithinEmail}
                                onCheckedChange={(checked) => setContributionsWithinEmail(checked === true)}
                              />
                            </div>
                            <div style={{ width: "80px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden flex flex-col gap-2 px-4">
                      {/* Contribution Posted Card */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-[#243746]">
                          Contribution posted to your HSA
                        </h4>
                  <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Paper</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                  </div>
                  <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Email</span>
                          <WexCheckbox
                            checked={contributionPostedEmail}
                            onCheckedChange={(checked) => setContributionPostedEmail(checked === true)}
                          />
                  </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Text</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                </div>
                        <WexSeparator className="my-2" />
              </div>

                      {/* Balance Below Card */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium leading-6 tracking-[-0.084px] text-[#243746]">
                            HSA available cash balance is below
                          </span>
                          <div className="flex items-center border border-[#a5aeb4] rounded-md overflow-hidden shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)]">
                            <div className="bg-white border-r border-[#a5aeb4] px-2 py-2 text-sm text-[#a5aeb4] flex items-center justify-center min-w-[35px]">
                              $
                            </div>
                            <input
                              type="text"
                              value={balanceBelowAmount}
                              onChange={(e) => setBalanceBelowAmount(e.target.value)}
                              className="px-3 py-2 text-sm border-0 focus:outline-none focus:ring-0 bg-white"
                              style={{ minWidth: "80px", width: "80px" }}
                            />
                          </div>
                        </div>
                        <WexSeparator className="my-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Paper</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Email</span>
                          <WexCheckbox
                            checked={balanceBelowEmail}
                            onCheckedChange={(checked) => setBalanceBelowEmail(checked === true)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Text</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                        <WexSeparator className="my-2" />
                      </div>

                      {/* Contributions Within Card */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium leading-6 tracking-[-0.084px] text-[#243746]">
                            HSA contributions year-to-date are within
                          </span>
                          <div className="flex items-center border border-[#a5aeb4] rounded-md overflow-hidden shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)]">
                            <div className="bg-white border-r border-[#a5aeb4] px-2 py-2 text-sm text-[#a5aeb4] flex items-center justify-center min-w-[35px]">
                              $
                            </div>
                            <input
                              type="text"
                              value={contributionsWithinAmount}
                              onChange={(e) => setContributionsWithinAmount(e.target.value)}
                              className="px-3 py-2 text-sm border-0 focus:outline-none focus:ring-0 bg-white"
                              style={{ minWidth: "80px", width: "80px" }}
                            />
                          </div>
                          <span className="text-sm font-medium leading-6 tracking-[-0.084px] text-[#243746]">
                            of the IRS maximum
                          </span>
                        </div>
                        <WexSeparator className="my-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Paper</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Email</span>
                          <WexCheckbox
                            checked={contributionsWithinEmail}
                            onCheckedChange={(checked) => setContributionsWithinEmail(checked === true)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Text</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-end gap-2 md:gap-3 pt-6 mt-6 border-t border-[#e4e6e9] px-4 md:px-0">
                  <WexButton
                      intent="primary"
                      onClick={() => {
                        // Save preferences action
                        setSavedState({
                          hsaAccountSummaryPaper,
                          hsaAccountSummaryEmail,
                          hsaTaxDocumentsPaper,
                          hsaTaxDocumentsEmail,
                          goPaperless,
                          contributionPostedEmail,
                          balanceBelowAmount,
                          balanceBelowEmail,
                          contributionsWithinAmount,
                          contributionsWithinEmail,
                          paymentIssuedEmail,
                          withdrawalExceedsAmount,
                          withdrawalExceedsEmail,
                          cardMailedEmail,
                          cardMailedText,
                          followUpNoticeText,
                          purchaseMadeEmail,
                          purchaseMadeText,
                          cardSuspendedText,
                          cardPurseSuspendedText,
                        });
                        wexToast.success("Communication preferences saved successfully");
                      }}
                      className="w-full md:min-w-[100px] md:w-auto bg-[#0058a3] text-white hover:bg-[#0058a3]/90 order-1 md:order-2"
                    >
                      Save Preferences
                  </WexButton>
                    <WexButton
                      intent="secondary"
                      variant="outline"
                      onClick={() => {
                        // Cancel action - reset to saved values
                        setHsaAccountSummaryPaper(savedState.hsaAccountSummaryPaper);
                        setHsaAccountSummaryEmail(savedState.hsaAccountSummaryEmail);
                        setHsaTaxDocumentsPaper(savedState.hsaTaxDocumentsPaper);
                        setHsaTaxDocumentsEmail(savedState.hsaTaxDocumentsEmail);
                        setGoPaperless(savedState.goPaperless);
                        setContributionPostedEmail(savedState.contributionPostedEmail);
                        setBalanceBelowAmount(savedState.balanceBelowAmount);
                        setBalanceBelowEmail(savedState.balanceBelowEmail);
                        setContributionsWithinAmount(savedState.contributionsWithinAmount);
                        setContributionsWithinEmail(savedState.contributionsWithinEmail);
                        setPaymentIssuedEmail(savedState.paymentIssuedEmail);
                        setWithdrawalExceedsAmount(savedState.withdrawalExceedsAmount);
                        setWithdrawalExceedsEmail(savedState.withdrawalExceedsEmail);
                        setCardMailedEmail(savedState.cardMailedEmail);
                        setCardMailedText(savedState.cardMailedText);
                        setFollowUpNoticeText(savedState.followUpNoticeText);
                        setPurchaseMadeEmail(savedState.purchaseMadeEmail);
                        setPurchaseMadeText(savedState.purchaseMadeText);
                        setCardSuspendedText(savedState.cardSuspendedText);
                        setCardPurseSuspendedText(savedState.cardPurseSuspendedText);
                      }}
                      className="w-full md:min-w-[100px] md:w-auto order-2 md:order-1"
                    >
                      Cancel
                  </WexButton>
                </div>
                </WexTabs.Content>
                {/* Payments Tab Content */}
                <WexTabs.Content value="payments" className="pt-6 pb-6">
                  <div className="flex flex-col gap-6">
                    {/* Notification Preferences Header */}
                    <div className="flex flex-col gap-1 px-6 md:px-6">
                      <h3 className="text-xl font-bold leading-8 tracking-[-0.34px] text-[#243746]">
                        Notification preferences
                      </h3>
                      <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38] max-w-[1094px]">
                        Manage how you receive real-time alerts for account activity. You can enable Email and/or Text for each notification. Standard text message rates may apply. Disable text alerts by unchecking the boxes below. By opting into our text alerts, you agree to our{" "}
                        <a href="#" className="text-[#0058a3] hover:underline">terms of service</a>. Please review our{" "}
                        <a href="#" className="text-[#0058a3] hover:underline">privacy policy</a> for more information.
                      </p>
                  </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block">
                      {/* Table Header */}
                      <div className="h-6 pb-6">
                        <div className="flex items-center justify-between h-full px-6">
                          <div style={{ width: "493px" }}>
                            <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Notification type</span>
                </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Paper</span>
              </div>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Email</span>
            </div>
                            <div style={{ width: "80px" }} className="flex justify-center">
                              <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Text</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Payment Issued Row */}
                      <div className="border-t border-[#e4e6e9]">
                        <div className="flex items-center justify-between px-6 py-4 min-h-[90px]">
                          <div className="flex flex-col gap-1" style={{ width: "493px" }}>
                            <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
                              Payment issued out of your HSA
                            </h4>
                            <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38]">
                              Automatically emailed based on whether or not you have an email address.
                            </p>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                            <div style={{ width: "35px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={paymentIssuedEmail}
                                onCheckedChange={(checked) => setPaymentIssuedEmail(checked === true)}
                              />
                            </div>
                            <div style={{ width: "80px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Withdrawal Exceeds Row */}
                      <div className="border-t border-[#e4e6e9]">
                        <div className="flex items-center justify-between px-6 py-4 min-h-[90px]">
                          <div className="flex flex-col gap-1" style={{ width: "493px" }}>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
                                Withdrawal from your HSA exceeds
                              </span>
                              <div className="flex items-center border border-[#a5aeb4] rounded-md overflow-hidden shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)]">
                                <div className="bg-white border-r border-[#a5aeb4] px-2 py-2 text-sm text-[#a5aeb4] flex items-center justify-center min-w-[35px]">
                                  $
                                </div>
                                <input
                                  type="text"
                                  value={withdrawalExceedsAmount}
                                  onChange={(e) => setWithdrawalExceedsAmount(e.target.value)}
                                  className="px-3 py-2 text-sm border-0 focus:outline-none focus:ring-0 bg-white"
                                  style={{ minWidth: "80px", width: "80px" }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                            <div style={{ width: "35px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={withdrawalExceedsEmail}
                                onCheckedChange={(checked) => setWithdrawalExceedsEmail(checked === true)}
                              />
                            </div>
                            <div style={{ width: "80px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden flex flex-col gap-2 px-4">
                      {/* Payment Issued Card */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-[#243746]">
                          Payment issued out of your HSA
                        </h4>
                        <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38]">
                          Automatically emailed based on whether or not you have an email address.
                        </p>
                  <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Paper</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                  </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Email</span>
                          <WexCheckbox
                            checked={paymentIssuedEmail}
                            onCheckedChange={(checked) => setPaymentIssuedEmail(checked === true)}
                          />
                </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Text</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
              </div>
                        <WexSeparator className="my-2" />
            </div>

                      {/* Withdrawal Exceeds Card */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium leading-6 tracking-[-0.084px] text-[#243746]">
                            Withdrawal from your HSA exceeds
                          </span>
                          <div className="flex items-center border border-[#a5aeb4] rounded-md overflow-hidden shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)]">
                            <div className="bg-white border-r border-[#a5aeb4] px-2 py-2 text-sm text-[#a5aeb4] flex items-center justify-center min-w-[35px]">
                              $
                            </div>
                            <input
                              type="text"
                              value={withdrawalExceedsAmount}
                              onChange={(e) => setWithdrawalExceedsAmount(e.target.value)}
                              className="px-3 py-2 text-sm border-0 focus:outline-none focus:ring-0 bg-white"
                              style={{ minWidth: "80px", width: "80px" }}
                            />
                          </div>
                        </div>
                        <WexSeparator className="my-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Paper</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Email</span>
                          <WexCheckbox
                            checked={withdrawalExceedsEmail}
                            onCheckedChange={(checked) => setWithdrawalExceedsEmail(checked === true)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Text</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-end gap-2 md:gap-3 pt-6 mt-6 border-t border-[#e4e6e9] px-4 md:px-0">
                    <WexButton
                      intent="primary"
                      onClick={() => {
                        // Save preferences action
                        setSavedState({
                          hsaAccountSummaryPaper,
                          hsaAccountSummaryEmail,
                          hsaTaxDocumentsPaper,
                          hsaTaxDocumentsEmail,
                          goPaperless,
                          contributionPostedEmail,
                          balanceBelowAmount,
                          balanceBelowEmail,
                          contributionsWithinAmount,
                          contributionsWithinEmail,
                          paymentIssuedEmail,
                          withdrawalExceedsAmount,
                          withdrawalExceedsEmail,
                          cardMailedEmail,
                          cardMailedText,
                          followUpNoticeText,
                          purchaseMadeEmail,
                          purchaseMadeText,
                          cardSuspendedText,
                          cardPurseSuspendedText,
                        });
                        wexToast.success("Communication preferences saved successfully");
                      }}
                      className="w-full md:min-w-[100px] md:w-auto bg-[#0058a3] text-white hover:bg-[#0058a3]/90"
                    >
                      Save Preferences
                  </WexButton>
                    <WexButton
                      intent="secondary"
                      variant="outline"
                      onClick={() => {
                        // Cancel action - reset to saved values
                        setHsaAccountSummaryPaper(savedState.hsaAccountSummaryPaper);
                        setHsaAccountSummaryEmail(savedState.hsaAccountSummaryEmail);
                        setHsaTaxDocumentsPaper(savedState.hsaTaxDocumentsPaper);
                        setHsaTaxDocumentsEmail(savedState.hsaTaxDocumentsEmail);
                        setGoPaperless(savedState.goPaperless);
                        setContributionPostedEmail(savedState.contributionPostedEmail);
                        setBalanceBelowAmount(savedState.balanceBelowAmount);
                        setBalanceBelowEmail(savedState.balanceBelowEmail);
                        setContributionsWithinAmount(savedState.contributionsWithinAmount);
                        setContributionsWithinEmail(savedState.contributionsWithinEmail);
                        setPaymentIssuedEmail(savedState.paymentIssuedEmail);
                        setWithdrawalExceedsAmount(savedState.withdrawalExceedsAmount);
                        setWithdrawalExceedsEmail(savedState.withdrawalExceedsEmail);
                        setCardMailedEmail(savedState.cardMailedEmail);
                        setCardMailedText(savedState.cardMailedText);
                        setFollowUpNoticeText(savedState.followUpNoticeText);
                        setPurchaseMadeEmail(savedState.purchaseMadeEmail);
                        setPurchaseMadeText(savedState.purchaseMadeText);
                        setCardSuspendedText(savedState.cardSuspendedText);
                        setCardPurseSuspendedText(savedState.cardPurseSuspendedText);
                      }}
                      className="w-full md:min-w-[100px] md:w-auto"
                    >
                      Cancel
                    </WexButton>
                  </div>
                </WexTabs.Content>
                {/* WEX Benefits Card Tab Content */}
                <WexTabs.Content value="wex-benefits-card" className="pt-6 pb-6">
                  <div className="flex flex-col gap-6">
                    {/* Notification Preferences Header */}
                    <div className="flex flex-col gap-1 px-6 md:px-6">
                      <h3 className="text-xl font-bold leading-8 tracking-[-0.34px] text-[#243746]">
                        Notification preferences
                      </h3>
                      <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38] max-w-[1094px]">
                        Manage how you receive real-time alerts for account activity. You can enable Email and/or Text for each notification. Standard text message rates may apply. Disable text alerts by unchecking the boxes below. By opting into our text alerts, you agree to our{" "}
                        <a href="#" className="text-[#0058a3] hover:underline">terms of service</a>. Please review our{" "}
                        <a href="#" className="text-[#0058a3] hover:underline">privacy policy</a> for more information.
                      </p>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block">
                      {/* Table Header */}
                      <div className="h-6 pb-6">
                        <div className="flex items-center justify-between h-full px-6">
                          <div style={{ width: "493px" }}>
                            <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Notification type</span>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Paper</span>
                            </div>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Email</span>
                            </div>
                            <div style={{ width: "80px" }} className="flex justify-center">
                              <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-[#243746]">Text</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Mailed Row */}
                      <div className="border-t border-[#e4e6e9]">
                        <div className="flex items-center justify-between px-6 py-4 min-h-[90px]">
                          <div style={{ width: "493px" }}>
                            <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
                              WEX Benefit Card has been mailed
                            </h4>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                            <div style={{ width: "35px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={cardMailedEmail}
                                onCheckedChange={(checked) => setCardMailedEmail(checked === true)}
                              />
                            </div>
                            <div style={{ width: "80px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={cardMailedText}
                                onCheckedChange={(checked) => setCardMailedText(checked === true)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Follow Up Notice Row */}
                      <div className="border-t border-[#e4e6e9]">
                        <div className="flex items-center justify-between px-6 py-4 min-h-[90px]">
                          <div className="flex flex-col gap-1" style={{ width: "493px" }}>
                            <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
                              WEX Benefit Card follow up notice has been sent
                            </h4>
                            <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38]">
                              Automatically alert when a debit card follow up notice has been sent about on of your purchases. Helps to quickly know when a receipt needs to be supplied.
                            </p>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                            <div style={{ width: "80px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={followUpNoticeText}
                                onCheckedChange={(checked) => setFollowUpNoticeText(checked === true)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Purchase Made Row */}
                      <div className="border-t border-[#e4e6e9]">
                        <div className="flex items-center justify-between px-6 py-4 min-h-[90px]">
                          <div className="flex flex-col gap-1" style={{ width: "493px" }}>
                            <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
                              WEX Benefit Card purchase has been made
                            </h4>
                            <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38]">
                              Automatically alert when a debit card purchase has been made on one of your accounts. Helps to quickly identify possible fraudulent activity.
                            </p>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                            <div style={{ width: "35px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={purchaseMadeEmail}
                                onCheckedChange={(checked) => setPurchaseMadeEmail(checked === true)}
                              />
                            </div>
                            <div style={{ width: "80px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={purchaseMadeText}
                                onCheckedChange={(checked) => setPurchaseMadeText(checked === true)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Suspended Row */}
                      <div className="border-t border-[#e4e6e9]">
                        <div className="flex items-center justify-between px-6 py-4 min-h-[90px]">
                          <div style={{ width: "493px" }}>
                            <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
                              WEX Benefits Card has been suspended or unsuspended
                            </h4>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                            <div style={{ width: "80px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={cardSuspendedText}
                                onCheckedChange={(checked) => setCardSuspendedText(checked === true)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Purse Suspended Row */}
                      <div className="border-t border-[#e4e6e9]">
                        <div className="flex items-center justify-between px-6 py-4 min-h-[90px]">
                          <div style={{ width: "493px" }}>
                            <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
                              WEX Benefit Card Purse has been suspended or unsuspended
                            </h4>
                          </div>
                          <div className="flex items-center" style={{ gap: "153px" }}>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                            <div style={{ width: "35px" }} className="flex justify-center">
                              <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                            </div>
                            <div style={{ width: "80px", height: "21px" }} className="flex justify-center">
                              <WexCheckbox
                                checked={cardPurseSuspendedText}
                                onCheckedChange={(checked) => setCardPurseSuspendedText(checked === true)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden flex flex-col gap-2 px-4">
                      {/* Card Mailed Card */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-[#243746]">
                          WEX Benefit Card has been mailed
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Paper</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Email</span>
                          <WexCheckbox
                            checked={cardMailedEmail}
                            onCheckedChange={(checked) => setCardMailedEmail(checked === true)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Text</span>
                          <WexCheckbox
                            checked={cardMailedText}
                            onCheckedChange={(checked) => setCardMailedText(checked === true)}
                          />
                        </div>
                        <WexSeparator className="my-2" />
                      </div>

                      {/* Follow Up Notice Card */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-[#243746]">
                          WEX Benefit Card follow up notice has been sent
                        </h4>
                        <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38]">
                          Automatically alert when a debit card follow up notice has been sent about on of your purchases. Helps to quickly know when a receipt needs to be supplied.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Paper</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Email</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Text</span>
                          <WexCheckbox
                            checked={followUpNoticeText}
                            onCheckedChange={(checked) => setFollowUpNoticeText(checked === true)}
                          />
                        </div>
                        <WexSeparator className="my-2" />
                      </div>

                      {/* Purchase Made Card */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-[#243746]">
                          WEX Benefit Card purchase has been made
                        </h4>
                        <p className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#1d2c38]">
                          Automatically alert when a debit card purchase has been made on one of your accounts. Helps to quickly identify possible fraudulent activity.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Paper</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Email</span>
                          <WexCheckbox
                            checked={purchaseMadeEmail}
                            onCheckedChange={(checked) => setPurchaseMadeEmail(checked === true)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Text</span>
                          <WexCheckbox
                            checked={purchaseMadeText}
                            onCheckedChange={(checked) => setPurchaseMadeText(checked === true)}
                          />
                        </div>
                        <WexSeparator className="my-2" />
                      </div>

                      {/* Card Suspended Card */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-[#243746]">
                          WEX Benefits Card has been suspended or unsuspended
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Paper</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Email</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Text</span>
                          <WexCheckbox
                            checked={cardSuspendedText}
                            onCheckedChange={(checked) => setCardSuspendedText(checked === true)}
                          />
                        </div>
                        <WexSeparator className="my-2" />
                      </div>

                      {/* Card Purse Suspended Card */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium leading-6 tracking-[-0.084px] text-[#243746]">
                          WEX Benefit Card Purse has been suspended or unsuspended
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Paper</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Email</span>
                          <span className="text-xs font-normal leading-6 text-black whitespace-nowrap">Not available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal leading-6 tracking-[-0.084px] text-[#243746]">Text</span>
                          <WexCheckbox
                            checked={cardPurseSuspendedText}
                            onCheckedChange={(checked) => setCardPurseSuspendedText(checked === true)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-end gap-2 md:gap-3 pt-6 mt-6 border-t border-[#e4e6e9] px-4 md:px-0">
                    <WexButton
                      intent="primary"
                      onClick={() => {
                        // Save preferences action
                        setSavedState({
                          hsaAccountSummaryPaper,
                          hsaAccountSummaryEmail,
                          hsaTaxDocumentsPaper,
                          hsaTaxDocumentsEmail,
                          goPaperless,
                          contributionPostedEmail,
                          balanceBelowAmount,
                          balanceBelowEmail,
                          contributionsWithinAmount,
                          contributionsWithinEmail,
                          paymentIssuedEmail,
                          withdrawalExceedsAmount,
                          withdrawalExceedsEmail,
                          cardMailedEmail,
                          cardMailedText,
                          followUpNoticeText,
                          purchaseMadeEmail,
                          purchaseMadeText,
                          cardSuspendedText,
                          cardPurseSuspendedText,
                        });
                        wexToast.success("Communication preferences saved successfully");
                      }}
                      className="w-full md:min-w-[100px] md:w-auto bg-[#0058a3] text-white hover:bg-[#0058a3]/90"
                    >
                      Save Preferences
                  </WexButton>
                    <WexButton
                      intent="secondary"
                      variant="outline"
                      onClick={() => {
                        // Cancel action - reset to saved values
                        setHsaAccountSummaryPaper(savedState.hsaAccountSummaryPaper);
                        setHsaAccountSummaryEmail(savedState.hsaAccountSummaryEmail);
                        setHsaTaxDocumentsPaper(savedState.hsaTaxDocumentsPaper);
                        setHsaTaxDocumentsEmail(savedState.hsaTaxDocumentsEmail);
                        setGoPaperless(savedState.goPaperless);
                        setContributionPostedEmail(savedState.contributionPostedEmail);
                        setBalanceBelowAmount(savedState.balanceBelowAmount);
                        setBalanceBelowEmail(savedState.balanceBelowEmail);
                        setContributionsWithinAmount(savedState.contributionsWithinAmount);
                        setContributionsWithinEmail(savedState.contributionsWithinEmail);
                        setPaymentIssuedEmail(savedState.paymentIssuedEmail);
                        setWithdrawalExceedsAmount(savedState.withdrawalExceedsAmount);
                        setWithdrawalExceedsEmail(savedState.withdrawalExceedsEmail);
                        setCardMailedEmail(savedState.cardMailedEmail);
                        setCardMailedText(savedState.cardMailedText);
                        setFollowUpNoticeText(savedState.followUpNoticeText);
                        setPurchaseMadeEmail(savedState.purchaseMadeEmail);
                        setPurchaseMadeText(savedState.purchaseMadeText);
                        setCardSuspendedText(savedState.cardSuspendedText);
                        setCardPurseSuspendedText(savedState.cardPurseSuspendedText);
                      }}
                      className="w-full md:min-w-[100px] md:w-auto"
                    >
                      Cancel
                    </WexButton>
                  </div>
                </WexTabs.Content>
              </WexTabs>
            </div>

            {/* Unsaved Changes Dialog */}
            <WexAlertDialog open={isUnsavedChangesDialogOpen} onOpenChange={setIsUnsavedChangesDialogOpen}>
              <WexAlertDialog.Content>
                <WexAlertDialog.Header>
                  <WexAlertDialog.Title>Unsaved Changes</WexAlertDialog.Title>
                  <WexAlertDialog.Description>
                    You have unsaved changes to your communication preferences. What would you like to do?
                  </WexAlertDialog.Description>
                </WexAlertDialog.Header>
                <WexAlertDialog.Footer>
                  <WexAlertDialog.Action
                    onClick={handleSaveAndSwitch}
                    className="bg-[#0058a3] text-white hover:bg-[#0058a3]/90"
                  >
                    Save preferences
                  </WexAlertDialog.Action>
                  <WexAlertDialog.Cancel
                    onClick={() => {
                      setIsUnsavedChangesDialogOpen(false);
                      setPendingTabChange(null);
                      setPendingNavigation(null);
                    }}
                  >
                    Cancel
                  </WexAlertDialog.Cancel>
                </WexAlertDialog.Footer>
              </WexAlertDialog.Content>
            </WexAlertDialog>
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
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 md:px-8">
        <div className="mx-auto max-w-[1376px]">
          {/* Page Header */}
          <div className="mb-6 space-y-3 md:mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">My Account</h1>
          </div>

          {/* Mobile menu */}
          <div className="mb-4 md:hidden">
            <WexCard className="rounded-2xl">
              <WexCard.Content className="space-y-3 p-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-[0.24px] text-[#243746]">
                    Select section
                  </p>
                  <WexSelect
                    value={activeSubPage}
                    onValueChange={(val) => handleSubPageChange(val as SubPage)}
                  >
                    <WexSelect.Trigger className="h-[44px] w-full">
                      <WexSelect.Value placeholder="Choose section" />
                    </WexSelect.Trigger>
                    <WexSelect.Content>
                      {menuSections.flatMap((section) =>
                        section.items.map((item) => (
                        <WexSelect.Item key={item.key} value={item.key}>
                          {item.label}
                        </WexSelect.Item>
                        ))
                      )}
                    </WexSelect.Content>
                  </WexSelect>
                </div>
              </WexCard.Content>
            </WexCard>
          </div>

          <WexSidebar.Provider defaultOpen={true} className="h-full">
            <WexCard className="rounded-2xl overflow-hidden h-full w-full">
              <div className="flex h-full w-full">
                {/* Left Sidebar (desktop) */}
                <WexSidebar
                  collapsible="none"
                  className="hidden md:flex w-[264px] border-r border-wex-card-border bg-wex-card-bg flex-col h-auto"
                >
                  <WexSidebar.Content className="flex-1 h-full px-2 py-4">
                    <WexSidebar.Group className="flex-1 h-full">
                      <WexSidebar.GroupContent className="flex-1 h-full">
                        <WexSidebar.Menu className="flex-1 h-full">
                          {menuSections.map((section, sectionIndex) => (
                            <div key={section.title}>
                              <WexSidebar.GroupLabel className="px-3 py-[7px]">
                                <span className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-[0.24px]">
                                  {section.title}
                                </span>
                              </WexSidebar.GroupLabel>
                              <div className="space-y-1">
                                {section.items.map((item) => {
                                  const Icon = item.icon;
                                  const isActive = activeSubPage === item.key;
                                  return (
                            <WexSidebar.MenuItem key={item.key}>
                              <WexSidebar.MenuButton
                                        isActive={isActive}
                                onClick={() => handleSubPageChange(item.key)}
                                        className="h-[32px] min-h-[32px] whitespace-normal px-3 py-1 rounded-md data-[active=true]:bg-[#E4F5FD] data-[active=true]:text-[#00437c] data-[active=false]:text-[#1d2c38]"
                              >
                                        <div className="flex items-center gap-2 w-full">
                                          <Icon className={`h-[14px] w-[14px] shrink-0 ${isActive ? 'text-[#00437c]' : 'text-[#1d2c38]'}`} />
                                          <span className="text-sm tracking-[-0.084px]">{item.label}</span>
                                        </div>
                              </WexSidebar.MenuButton>
                            </WexSidebar.MenuItem>
                                  );
                                })}
                              </div>
                              {sectionIndex < menuSections.length - 1 && (
                                <WexSidebar.Separator className="my-2" />
                              )}
                            </div>
                          ))}
                        </WexSidebar.Menu>
                      </WexSidebar.GroupContent>
                    </WexSidebar.Group>
                  </WexSidebar.Content>
                </WexSidebar>

                {/* Main Content Area */}
                <WexSidebar.Inset className="flex-1 min-w-0 bg-wex-card-bg md:peer-data-[variant=inset]:!m-0 md:peer-data-[variant=inset]:!rounded-none md:peer-data-[variant=inset]:!shadow-none md:peer-data-[variant=inset]:!ml-0 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:!ml-0">
                  <div className="flex h-full flex-col">
                    {renderContent(activeSubPage)}
                  </div>
                </WexSidebar.Inset>
              </div>
            </WexCard>
          </WexSidebar.Provider>
        </div>
      </div>

      <ConsumerFooter />

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
                variant="ghost"
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
                intent="secondary"
                variant="outline"
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
                variant="ghost"
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
              <WexButton intent="secondary" variant="outline">
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
                variant="ghost"
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
                intent="secondary"
                variant="outline"
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
                variant="ghost"
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
              <WexButton intent="secondary" variant="outline">
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

      {/* Add New Authorized Signers Modal */}
      <WexDialog open={isAddAuthorizedSignerModalOpen} onOpenChange={setIsAddAuthorizedSignerModalOpen}>
        <WexDialog.Content className="w-[448px] p-0 [&>div:last-child]:hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-[17.5px]">
            <WexDialog.Title className="text-base font-semibold text-[#243746] tracking-[-0.176px] leading-6">
              {editingAuthorizedSignerId ? "Edit Authorized Signer" : "Add Authorized Signer"}
            </WexDialog.Title>
            <WexDialog.Close asChild>
              <WexButton
                variant="ghost"
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
            {/* First Name & MI on same row */}
            <div className="flex gap-4">
              <WexFloatLabel
                label="First Name"
                value={authorizedSignerFormData.firstName}
                onChange={(e) => handleAuthorizedSignerFormChange("firstName", e.target.value)}
                containerClassName="flex-1"
              />
              <WexFloatLabel
                label="MI"
                value={authorizedSignerFormData.middleName}
                onChange={(e) => handleAuthorizedSignerFormChange("middleName", e.target.value)}
                containerClassName="w-20"
              />
            </div>

            {/* Last Name */}
            <WexFloatLabel
              label="Last Name"
              value={authorizedSignerFormData.lastName}
              onChange={(e) => handleAuthorizedSignerFormChange("lastName", e.target.value)}
            />

            {/* SSN & Birth Date on same row */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <WexFloatLabel
                  label="SSN"
                  value={authorizedSignerFormData.ssn}
                  onChange={(e) => {
                    const originalValue = e.target.value;
                    const filteredValue = originalValue.replace(/[^0-9-]/g, "");
                    const hasInvalidChars = originalValue !== filteredValue;
                    setIsAuthorizedSignerSsnInvalid(hasInvalidChars || validateAuthorizedSignerSsn(filteredValue));
                    handleAuthorizedSignerFormChange("ssn", filteredValue);
                  }}
                  invalid={isAuthorizedSignerSsnInvalid}
                />
                {isAuthorizedSignerSsnInvalid && (
                  <p className="text-sm text-destructive font-medium px-3">
                    SSN must be numbers only
                  </p>
                )}
              </div>
              <div className="relative flex-1">
                <WexPopover open={isAuthorizedSignerCalendarOpen} onOpenChange={setIsAuthorizedSignerCalendarOpen}>
                  <WexPopover.Trigger asChild>
                    <div className="relative w-full">
                      <WexFloatLabel
                        label="Birth Date"
                        value={authorizedSignerFormData.birthDate}
                        onChange={(e) => handleAuthorizedSignerFormChange("birthDate", e.target.value)}
                        onClick={() => setIsAuthorizedSignerCalendarOpen(true)}
                        rightIcon={<Calendar className="h-4 w-4" />}
                      />
                    </div>
                  </WexPopover.Trigger>
                  <WexPopover.Content className="w-auto p-0" align="start" side="bottom" sideOffset={4}>
                    <WexCalendar
                      mode="single"
                      selected={
                        authorizedSignerFormData.birthDate
                          ? (() => {
                              const parts = authorizedSignerFormData.birthDate.split("/");
                              if (parts.length === 3) {
                                const month = parseInt(parts[0], 10) - 1;
                                const day = parseInt(parts[1], 10);
                                const year = parseInt(parts[2], 10);
                                const date = new Date(year, month, day);
                                if (!isNaN(date.getTime())) {
                                  return date;
                                }
                              }
                              const date = new Date(authorizedSignerFormData.birthDate);
                              return !isNaN(date.getTime()) ? date : undefined;
                            })()
                          : undefined
                      }
                      onSelect={(date: Date | undefined) => {
                        if (date) {
                          const month = String(date.getMonth() + 1).padStart(2, "0");
                          const day = String(date.getDate()).padStart(2, "0");
                          const year = date.getFullYear();
                          handleAuthorizedSignerFormChange("birthDate", `${month}/${day}/${year}`);
                        } else {
                          handleAuthorizedSignerFormChange("birthDate", "");
                        }
                        setIsAuthorizedSignerCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </WexPopover.Content>
                </WexPopover>
              </div>
            </div>

            {/* Type Select with Float Label Wrapper */}
            <div className="relative w-full">
              <WexSelect
                value={authorizedSignerFormData.type}
                onValueChange={(value) => handleAuthorizedSignerFormChange("type", value)}
              >
                <WexSelect.Trigger className={`h-14 w-full rounded-md px-3 text-sm shadow-sm border border-wex-input-border bg-wex-input-bg text-wex-input-fg hover:border-wex-input-border-hover focus:outline-none focus:border-wex-input-border-focus focus:ring-1 focus:ring-wex-input-focus-ring ${authorizedSignerFormData.type ? "pt-2 pb-2" : "pt-5 pb-2"}`}>
                  <WexSelect.Value placeholder=" " />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  <WexSelect.Item value="authorized-representative">Authorized Representative</WexSelect.Item>
                  <WexSelect.Item value="authorized-signer">Authorized Signer</WexSelect.Item>
                  <WexSelect.Item value="conservator">Conservator</WexSelect.Item>
                  <WexSelect.Item value="guardian">Guardian</WexSelect.Item>
                  <WexSelect.Item value="parent">Parent</WexSelect.Item>
                  <WexSelect.Item value="power-of-attorney">Power of Attorney</WexSelect.Item>
                </WexSelect.Content>
              </WexSelect>
              <label
                className={`absolute pointer-events-none transition-all duration-200 ease-out origin-top-left ${
                  authorizedSignerFormData.type
                    ? "left-3 top-2 text-xs text-[#7c858e] scale-75 -translate-y-2.5"
                    : "left-3 top-4 text-sm text-[#7c858e]"
                }`}
              >
                Type
              </label>
            </div>

            {/* Phone */}
            <WexFloatLabel
              label="Phone"
              value={authorizedSignerFormData.phone}
              onChange={(e) => handleAuthorizedSignerFormChange("phone", e.target.value)}
            />

            {/* Address Line 1 */}
            <WexFloatLabel
              label="Address Line 1"
              value={authorizedSignerFormData.addressLine1}
              onChange={(e) => handleAuthorizedSignerFormChange("addressLine1", e.target.value)}
            />

            {/* Address Line 2 */}
            <WexFloatLabel
              label="Address Line 2"
              value={authorizedSignerFormData.addressLine2}
              onChange={(e) => handleAuthorizedSignerFormChange("addressLine2", e.target.value)}
            />

            {/* City */}
            <WexFloatLabel
              label="City"
              value={authorizedSignerFormData.city}
              onChange={(e) => handleAuthorizedSignerFormChange("city", e.target.value)}
            />

            {/* State & Zip Code on same row */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <WexSelect
                  value={authorizedSignerFormData.state}
                  onValueChange={(value) => handleAuthorizedSignerFormChange("state", value)}
                >
                  <WexSelect.Trigger className={`h-14 w-full rounded-md px-3 text-sm shadow-sm border border-wex-input-border bg-wex-input-bg text-wex-input-fg hover:border-wex-input-border-hover focus:outline-none focus:border-wex-input-border-focus focus:ring-1 focus:ring-wex-input-focus-ring ${authorizedSignerFormData.state ? "pt-2 pb-2" : "pt-5 pb-2"}`}>
                    <WexSelect.Value placeholder=" " />
                  </WexSelect.Trigger>
                  <WexSelect.Content>
                    <WexSelect.Item value="AL">Alabama</WexSelect.Item>
                    <WexSelect.Item value="AK">Alaska</WexSelect.Item>
                    <WexSelect.Item value="AZ">Arizona</WexSelect.Item>
                    <WexSelect.Item value="AR">Arkansas</WexSelect.Item>
                    <WexSelect.Item value="CA">California</WexSelect.Item>
                    <WexSelect.Item value="CO">Colorado</WexSelect.Item>
                    <WexSelect.Item value="CT">Connecticut</WexSelect.Item>
                    <WexSelect.Item value="DE">Delaware</WexSelect.Item>
                    <WexSelect.Item value="FL">Florida</WexSelect.Item>
                    <WexSelect.Item value="GA">Georgia</WexSelect.Item>
                    <WexSelect.Item value="HI">Hawaii</WexSelect.Item>
                    <WexSelect.Item value="ID">Idaho</WexSelect.Item>
                    <WexSelect.Item value="IL">Illinois</WexSelect.Item>
                    <WexSelect.Item value="IN">Indiana</WexSelect.Item>
                    <WexSelect.Item value="IA">Iowa</WexSelect.Item>
                    <WexSelect.Item value="KS">Kansas</WexSelect.Item>
                    <WexSelect.Item value="KY">Kentucky</WexSelect.Item>
                    <WexSelect.Item value="LA">Louisiana</WexSelect.Item>
                    <WexSelect.Item value="ME">Maine</WexSelect.Item>
                    <WexSelect.Item value="MD">Maryland</WexSelect.Item>
                    <WexSelect.Item value="MA">Massachusetts</WexSelect.Item>
                    <WexSelect.Item value="MI">Michigan</WexSelect.Item>
                    <WexSelect.Item value="MN">Minnesota</WexSelect.Item>
                    <WexSelect.Item value="MS">Mississippi</WexSelect.Item>
                    <WexSelect.Item value="MO">Missouri</WexSelect.Item>
                    <WexSelect.Item value="MT">Montana</WexSelect.Item>
                    <WexSelect.Item value="NE">Nebraska</WexSelect.Item>
                    <WexSelect.Item value="NV">Nevada</WexSelect.Item>
                    <WexSelect.Item value="NH">New Hampshire</WexSelect.Item>
                    <WexSelect.Item value="NJ">New Jersey</WexSelect.Item>
                    <WexSelect.Item value="NM">New Mexico</WexSelect.Item>
                    <WexSelect.Item value="NY">New York</WexSelect.Item>
                    <WexSelect.Item value="NC">North Carolina</WexSelect.Item>
                    <WexSelect.Item value="ND">North Dakota</WexSelect.Item>
                    <WexSelect.Item value="OH">Ohio</WexSelect.Item>
                    <WexSelect.Item value="OK">Oklahoma</WexSelect.Item>
                    <WexSelect.Item value="OR">Oregon</WexSelect.Item>
                    <WexSelect.Item value="PA">Pennsylvania</WexSelect.Item>
                    <WexSelect.Item value="RI">Rhode Island</WexSelect.Item>
                    <WexSelect.Item value="SC">South Carolina</WexSelect.Item>
                    <WexSelect.Item value="SD">South Dakota</WexSelect.Item>
                    <WexSelect.Item value="TN">Tennessee</WexSelect.Item>
                    <WexSelect.Item value="TX">Texas</WexSelect.Item>
                    <WexSelect.Item value="UT">Utah</WexSelect.Item>
                    <WexSelect.Item value="VT">Vermont</WexSelect.Item>
                    <WexSelect.Item value="VA">Virginia</WexSelect.Item>
                    <WexSelect.Item value="WA">Washington</WexSelect.Item>
                    <WexSelect.Item value="WV">West Virginia</WexSelect.Item>
                    <WexSelect.Item value="WI">Wisconsin</WexSelect.Item>
                    <WexSelect.Item value="WY">Wyoming</WexSelect.Item>
                  </WexSelect.Content>
                </WexSelect>
                <label
                  className={`absolute pointer-events-none transition-all duration-200 ease-out origin-top-left ${
                    authorizedSignerFormData.state
                      ? "left-3 top-2 text-xs text-[#7c858e] scale-75 -translate-y-2.5"
                      : "left-3 top-4 text-sm text-[#7c858e]"
                  }`}
                >
                  Select State
                </label>
              </div>
              <WexFloatLabel
                label="Zip Code"
                value={authorizedSignerFormData.zipCode}
                onChange={(e) => handleAuthorizedSignerFormChange("zipCode", e.target.value)}
                containerClassName="flex-1"
              />
            </div>
          </div>

          {/* Footer */}
          <WexDialog.Footer className="flex gap-2 justify-end p-[17.5px] pt-0">
            <WexDialog.Close asChild>
              <WexButton
                intent="secondary"
                variant="outline"
                onClick={() => {
                  resetAuthorizedSignerForm();
                  setEditingAuthorizedSignerId(null);
                  setIsAddAuthorizedSignerModalOpen(false);
                }}
              >
                Cancel
              </WexButton>
            </WexDialog.Close>
            <WexButton
              intent="primary"
              onClick={handleSaveAuthorizedSigner}
              disabled={!authorizedSignerFormData.firstName || !authorizedSignerFormData.lastName || !authorizedSignerFormData.ssn || !authorizedSignerFormData.birthDate || !authorizedSignerFormData.type || !authorizedSignerFormData.phone || !authorizedSignerFormData.addressLine1 || !authorizedSignerFormData.city || !authorizedSignerFormData.state || !authorizedSignerFormData.zipCode || isAuthorizedSignerSsnInvalid}
            >
              Save
            </WexButton>
          </WexDialog.Footer>
        </WexDialog.Content>
      </WexDialog>

      {/* Remove Authorized Signer Confirmation Modal */}
      <WexAlertDialog open={isRemoveAuthorizedSignerConfirmOpen} onOpenChange={setIsRemoveAuthorizedSignerConfirmOpen}>
        <WexAlertDialog.Content className="w-[448px] p-0">
          {/* Header */}
          <WexAlertDialog.Header className="p-[17.5px] pb-2">
            <WexAlertDialog.Title className="text-base font-semibold text-[#243746] tracking-[-0.176px] leading-6">
              Remove Authorized Signer
            </WexAlertDialog.Title>
          </WexAlertDialog.Header>

          {/* Content */}
          <div className="px-[24px] pb-0 pt-0">
            <WexAlertDialog.Description className="text-sm text-[#243746] leading-6">
              Are you sure you want to remove <strong>{authorizedSignerToRemove ? `${authorizedSignerToRemove.firstName} ${authorizedSignerToRemove.lastName}` : ""}</strong> from your authorized signers? This action cannot be undone.
            </WexAlertDialog.Description>
          </div>

          {/* Footer */}
          <WexAlertDialog.Footer className="flex gap-2 justify-end p-[17.5px] pt-0">
            <WexAlertDialog.Cancel asChild>
              <WexButton intent="secondary" variant="outline">
                Cancel
              </WexButton>
            </WexAlertDialog.Cancel>
            <WexAlertDialog.Action asChild>
              <WexButton
                intent="destructive"
                className="!bg-wex-button-destructive-bg !text-wex-button-destructive-fg !border !border-wex-button-destructive-border hover:!bg-wex-button-destructive-hover-bg active:!bg-wex-button-destructive-active-bg"
                onClick={() => authorizedSignerToRemove && handleRemoveAuthorizedSigner(authorizedSignerToRemove.id)}
              >
                Remove
              </WexButton>
            </WexAlertDialog.Action>
          </WexAlertDialog.Footer>
        </WexAlertDialog.Content>
      </WexAlertDialog>

      {/* View Authorized Signer Modal */}
      <WexDialog open={isViewAuthorizedSignerModalOpen} onOpenChange={setIsViewAuthorizedSignerModalOpen}>
        <WexDialog.Content className="w-[448px]" size="md">
          <WexDialog.Header>
            <WexDialog.Title>View Authorized Signer</WexDialog.Title>
          </WexDialog.Header>
          
          <div className="space-y-4">
            {viewingAuthorizedSigner && (
              <>
                {/* Name */}
                <div className="space-y-0.5 mt-0">
                  <WexLabel className="text-xs text-muted-foreground mb-0 font-normal">Name</WexLabel>
                  <p className="text-base font-normal text-[#243746] m-0 mt-0">
                    {viewingAuthorizedSigner.firstName} {viewingAuthorizedSigner.middleName ? `${viewingAuthorizedSigner.middleName} ` : ""}{viewingAuthorizedSigner.lastName}
                  </p>
                </div>

                {/* SSN, Birth Date, Type - 3 columns */}
                <div className="grid grid-cols-3 gap-x-4 gap-y-[14px] mt-2">
                  <div className="space-y-0.5 mt-0">
                    <WexLabel className="text-xs text-muted-foreground mb-0 font-normal">SSN</WexLabel>
                    <p className="text-base font-normal text-[#243746] m-0 mt-0">{viewingAuthorizedSigner.ssn}</p>
                  </div>
                  <div className="space-y-0.5 mt-0">
                    <WexLabel className="text-xs text-muted-foreground mb-0 font-normal">Birth Date</WexLabel>
                    <p className="text-base font-normal text-[#243746] m-0 mt-0">{viewingAuthorizedSigner.birthDate}</p>
                  </div>
                  <div className="space-y-0.5 mt-0">
                    <WexLabel className="text-xs text-muted-foreground mb-0 font-normal">Type</WexLabel>
                    <p className="text-base font-normal text-[#243746] capitalize m-0 mt-0">{viewingAuthorizedSigner.type}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-0.5 mt-0">
                  <WexLabel className="text-xs text-muted-foreground mb-0 font-normal">Phone</WexLabel>
                  <p className="text-base font-normal text-[#243746] m-0 mt-0">{viewingAuthorizedSigner.phone}</p>
                </div>

                {/* Address Line 1 */}
                <div className="space-y-0.5 mt-0">
                  <WexLabel className="text-xs text-muted-foreground mb-0 font-normal">Address Line 1</WexLabel>
                  <p className="text-base font-normal text-[#243746] m-0 mt-0">{viewingAuthorizedSigner.addressLine1}</p>
                </div>

                {/* Address Line 2 - conditional */}
                {viewingAuthorizedSigner.addressLine2 && (
                  <div className="space-y-0.5 mt-0">
                    <WexLabel className="text-xs text-muted-foreground mb-0 font-normal">Address Line 2</WexLabel>
                    <p className="text-base font-normal text-[#243746] m-0 mt-0">{viewingAuthorizedSigner.addressLine2}</p>
                  </div>
                )}

                {/* City, State, Zip Code */}
                <div className="grid grid-cols-3 gap-x-4 gap-y-[14px] mt-2">
                  <div className="space-y-0.5 mt-0">
                    <WexLabel className="text-xs text-muted-foreground mb-0 font-normal">City</WexLabel>
                    <p className="text-base font-normal text-[#243746] m-0 mt-0">{viewingAuthorizedSigner.city}</p>
                  </div>
                  <div className="space-y-0.5 mt-0">
                    <WexLabel className="text-xs text-muted-foreground mb-0 font-normal">State</WexLabel>
                    <p className="text-base font-normal text-[#243746] m-0 mt-0">{viewingAuthorizedSigner.state}</p>
                  </div>
                  <div className="space-y-0.5 mt-0">
                    <WexLabel className="text-xs text-muted-foreground mb-0 font-normal">Zip Code</WexLabel>
                    <p className="text-base font-normal text-[#243746] m-0 mt-0">{viewingAuthorizedSigner.zipCode}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </WexDialog.Content>
      </WexDialog>

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
                    variant="ghost"
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
                                  variant="ghost"
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
                      variant="ghost"
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
                      intent="secondary"
                      variant="outline"
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
                variant="ghost"
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
              <WexButton intent="secondary" variant="outline">
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

      {/* Edit Contact Information Modal */}
      <WexDialog open={isContactInfoModalOpen} onOpenChange={setIsContactInfoModalOpen}>
        <WexDialog.Content className="w-[448px] p-0 gap-6 [&>div:last-child]:hidden">
          <div className="flex items-center justify-between p-[17.5px] border-b border-[#edeff0]">
            <WexDialog.Title className="text-[17.5px] font-semibold text-[#243746] leading-normal">
              Edit Contact Information
            </WexDialog.Title>
            <WexDialog.Close asChild>
              <WexButton
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </WexButton>
            </WexDialog.Close>
          </div>
          
          <div className="flex flex-col gap-4 px-[17.5px] pb-[17.5px]">
            <WexFloatLabel
              label="Mobile Phone Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            
            <WexFloatLabel
              label="Email Address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          
          <WexDialog.Footer className="flex gap-2 justify-end p-[17.5px] border-t border-[#edeff0]">
            <WexButton
              intent="secondary"
              variant="outline"
              onClick={() => setIsContactInfoModalOpen(false)}
            >
              Cancel
            </WexButton>
            <WexButton
              intent="primary"
              onClick={() => {
                setIsContactInfoModalOpen(false);
                // Here you would typically save the data to your backend
              }}
            >
              Save
            </WexButton>
          </WexDialog.Footer>
        </WexDialog.Content>
      </WexDialog>
    </div>
  );
}

