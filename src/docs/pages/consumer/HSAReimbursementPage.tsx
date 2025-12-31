import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Building, Receipt, CreditCard, Info, Copy } from "lucide-react";
import { WexButton } from "@/components/wex/wex-button";
import { WexFloatLabel } from "@/components/wex/wex-float-label";
import { WexLabel } from "@/components/wex/wex-label";
import { WexRadioGroup } from "@/components/wex/wex-radio-group";
import { WexSelect } from "@/components/wex/wex-select";
import { Stepper } from "./components/Stepper";
import type { Step } from "./components/Stepper";
import { SelectCardGroup } from "./components/SelectCard";
import { cn } from "@/lib/utils";

/**
 * Stepper steps configuration
 */
const enrollmentSteps: Step[] = [
  { id: "eligibility", label: "Eligibility", status: "complete" },
  { id: "profile", label: "Profile", status: "complete" },
  { id: "dependents", label: "Dependents", status: "complete" },
  { id: "beneficiaries", label: "Beneficiaries", status: "complete" },
  { id: "reimbursement", label: "Reimbursement", status: "active" },
  { id: "review", label: "Review" },
];

/**
 * Reimbursement method type
 */
type ReimbursementMethod = "direct-deposit" | "check" | "debit-card" | null;

/**
 * Bank account form data
 */
interface BankAccountData {
  routingNumber: string;
  accountNumber: string;
  confirmAccountNumber: string;
  accountType: string;
  accountNickname: string;
}

/**
 * Bank information form data
 */
interface BankInformationData {
  bankName: string;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
}

/**
 * Debit card questionnaire data
 */
interface DebitCardData {
  alternateMethod: string;
  separateCards: string;
}

/**
 * SVG assets from Figma
 */
const WEX_LOGO_SVG = "http://localhost:3845/assets/7060817bc7b10e987b718d2e158a2317d0216b42.svg";
const MASTERCARD_LOGO_SVG = "http://localhost:3845/assets/183128c06b9f2e5d26e081a01b9d83b3147cebec.svg";

export default function HSAReimbursementPage() {
  const navigate = useNavigate();

  // State for selected reimbursement method
  const [selectedMethod, setSelectedMethod] = React.useState<ReimbursementMethod>(null);

  // State for Direct Deposit forms
  const [bankAccount, setBankAccount] = React.useState<BankAccountData>({
    routingNumber: "",
    accountNumber: "",
    confirmAccountNumber: "",
    accountType: "",
    accountNickname: "",
  });

  const [bankInformation, setBankInformation] = React.useState<BankInformationData>({
    bankName: "",
    addressLine: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // State for Debit Card questionnaire
  const [debitCardData, setDebitCardData] = React.useState<DebitCardData>({
    alternateMethod: "",
    separateCards: "",
  });

  // Reimbursement method cards configuration
  const reimbursementCards = [
    {
      id: "direct-deposit",
      title: "Direct Deposit",
      description: "Your reimbursement will be deposited into your bank account within 2-3 business days from the date we receive substantiation of your claims.",
      icon: <Building className="h-4 w-4 text-muted-foreground" />,
      showLink: false,
    },
    {
      id: "check",
      title: "Check",
      description: "Your reimbursement check will be sent to your home within 3-5 business days from the date we receive substantiation of your claims.",
      icon: <Receipt className="h-4 w-4 text-muted-foreground" />,
      showLink: false,
    },
    {
      id: "debit-card",
      title: "Debit Card",
      description: "Your Debit Card provides convenient access to your benefit dollars. Use the card to pay qualified medical expenses for you and your qualified dependents.",
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
      showLink: false,
    },
  ];

  // Handle method selection
  const handleMethodChange = (value: string) => {
    setSelectedMethod(value as ReimbursementMethod);
  };

  // Handle copy card number
  const handleCopyCardNumber = () => {
    navigator.clipboard.writeText("•••• •••• •••• 2344");
  };

  // Handle navigation
  const handleCancel = () => {
    navigate("/consumer");
  };

  const handleBack = () => {
    navigate("/hsa-enrollment/beneficiaries");
  };

  const handleSaveAndContinue = () => {
    // TODO: Validate form data based on selected method
    // Navigate to review page
    navigate("/hsa-enrollment/review");
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
            currentStepId="reimbursement"
            onStepChange={() => {}}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="flex justify-center pt-14 px-8">
            <div className="w-[362px] flex flex-col gap-12">
          {/* Header Section */}
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl leading-8 tracking-[-0.456px] text-black">
              Reimbursement method
            </h1>
            <p className="text-base leading-6 tracking-[-0.176px] text-[#243746]">
              Select the method in which you like to be reimbursed.
            </p>

            {/* Reimbursement Method Selection */}
            <SelectCardGroup
              type="radio"
              value={selectedMethod || ""}
              onValueChange={handleMethodChange}
              cards={reimbursementCards}
            />
          </div>

          {/* Conditional Content Based on Selection */}
          
          {/* Direct Deposit Form */}
          {selectedMethod === "direct-deposit" && (
            <>
              {/* Bank Account Section */}
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-base leading-[22px] tracking-[0.32px] text-black">
                  Bank Account
                </h2>
                <p className="text-base leading-6 tracking-[-0.176px] text-[#243746]">
                  Enter your bank account information to setup your direct deposit
                </p>

                <div className="flex flex-col gap-4">
                  {/* Routing Number */}
                  <div className="relative">
                    <WexFloatLabel
                      value={bankAccount.routingNumber}
                      onChange={(e) => setBankAccount({ ...bankAccount, routingNumber: e.target.value })}
                      label="Routing Number"
                      required
                      className="h-14"
                    />
                    <Info className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#243746] pointer-events-none" />
                  </div>

                  {/* Account Number */}
                  <WexFloatLabel
                    value={bankAccount.accountNumber}
                    onChange={(e) => setBankAccount({ ...bankAccount, accountNumber: e.target.value })}
                    label="Account Number"
                    required
                    className="h-14"
                  />

                  {/* Confirm Account Number */}
                  <WexFloatLabel
                    value={bankAccount.confirmAccountNumber}
                    onChange={(e) => setBankAccount({ ...bankAccount, confirmAccountNumber: e.target.value })}
                    label="Confirm Account Number"
                    required
                    className="h-14"
                  />

                  {/* Account Type */}
                  <div className="relative">
                    <WexSelect value={bankAccount.accountType} onValueChange={(value) => setBankAccount({ ...bankAccount, accountType: value })}>
                      <WexSelect.Trigger className="h-14 w-full">
                        <WexSelect.Value placeholder="Account Type" />
                      </WexSelect.Trigger>
                      <WexSelect.Content>
                        <WexSelect.Item value="checking">Checking</WexSelect.Item>
                        <WexSelect.Item value="savings">Savings</WexSelect.Item>
                      </WexSelect.Content>
                    </WexSelect>
                    {/* Required indicator */}
                    <div className="absolute left-[5px] top-[5px] w-[6px] h-[6px] rounded-full bg-[#D23F57]" />
                  </div>

                  {/* Account Nickname */}
                  <div className="relative">
                    <WexFloatLabel
                      value={bankAccount.accountNickname}
                      onChange={(e) => setBankAccount({ ...bankAccount, accountNickname: e.target.value })}
                      label="Account Nickname"
                      required
                      className="h-14"
                    />
                    <Info className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#243746] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Bank Information Section */}
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-base leading-[22px] tracking-[0.32px] text-black">
                  Bank Information
                </h2>
                <p className="text-base leading-6 tracking-[-0.176px] text-[#243746]">
                  Enter your bank account information to setup your direct deposit
                </p>

                <div className="flex flex-col gap-4">
                  {/* Bank Name */}
                  <WexFloatLabel
                    value={bankInformation.bankName}
                    onChange={(e) => setBankInformation({ ...bankInformation, bankName: e.target.value })}
                    label="Bank Name"
                    required
                    className="h-14"
                  />

                  {/* Address Line */}
                  <WexFloatLabel
                    value={bankInformation.addressLine}
                    onChange={(e) => setBankInformation({ ...bankInformation, addressLine: e.target.value })}
                    label="Address Line"
                    required
                    className="h-14"
                  />

                  {/* City */}
                  <WexFloatLabel
                    value={bankInformation.city}
                    onChange={(e) => setBankInformation({ ...bankInformation, city: e.target.value })}
                    label="City"
                    required
                    className="h-14"
                  />

                  {/* State */}
                  <div className="relative">
                    <WexSelect value={bankInformation.state} onValueChange={(value) => setBankInformation({ ...bankInformation, state: value })}>
                      <WexSelect.Trigger className="h-14 w-full">
                        <WexSelect.Value placeholder="State" />
                      </WexSelect.Trigger>
                      <WexSelect.Content>
                        <WexSelect.Item value="AL">Alabama</WexSelect.Item>
                        <WexSelect.Item value="AK">Alaska</WexSelect.Item>
                        <WexSelect.Item value="AZ">Arizona</WexSelect.Item>
                        <WexSelect.Item value="CA">California</WexSelect.Item>
                        <WexSelect.Item value="FL">Florida</WexSelect.Item>
                        <WexSelect.Item value="NY">New York</WexSelect.Item>
                        <WexSelect.Item value="TX">Texas</WexSelect.Item>
                        {/* Add more states as needed */}
                      </WexSelect.Content>
                    </WexSelect>
                    {/* Required indicator */}
                    <div className="absolute left-[5px] top-[5px] w-[6px] h-[6px] rounded-full bg-[#D23F57]" />
                  </div>

                  {/* Zip Code */}
                  <WexFloatLabel
                    value={bankInformation.zipCode}
                    onChange={(e) => setBankInformation({ ...bankInformation, zipCode: e.target.value })}
                    label="Zip Code"
                    required
                    className="h-14"
                  />
                </div>
              </div>
            </>
          )}

          {/* Debit Card Section */}
          {selectedMethod === "debit-card" && (
            <div className="flex flex-col gap-4 items-center">
              <p className="text-base leading-6 tracking-[-0.176px] text-[#243746] w-full">
                Debit Card selected. Please answer the questions below.
              </p>

              {/* Debit Card Visual */}
              <div className="w-[362px] h-[240px] bg-[#253746] rounded-[14px] relative shadow-[0px_4.169px_10.422px_0px_rgba(2,13,36,0.15),0px_0px_1.042px_0px_rgba(2,13,36,0.3)]">
                {/* WEX Logo */}
                <div className="absolute left-[16.67px] top-[16.67px]">
                  <img src={WEX_LOGO_SVG} alt="WEX" className="w-[129.231px] h-[36.864px]" />
                </div>

                {/* Card Number */}
                <div className="absolute bottom-[85.46px] left-[22.93px] flex items-center gap-[12.506px]">
                  <p className="font-['Roboto_Mono'] text-[18.76px] leading-[27.097px] text-white">
                    •••• •••• •••• 2344
                  </p>
                  <button
                    onClick={handleCopyCardNumber}
                    className="flex items-center justify-center w-[20.844px] h-[20.844px] text-white hover:opacity-80"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* EXP */}
                <div className="absolute bottom-[18.76px] left-[22.93px] font-['Roboto_Mono'] text-white">
                  <p className="text-[14.59px] leading-normal">EXP</p>
                  <p className="text-[18.76px] leading-[27.097px]">04/27</p>
                </div>

                {/* CVC/CVV */}
                <div className="absolute bottom-[18.76px] left-[126.1px] font-['Roboto_Mono'] text-white">
                  <p className="text-[14.59px] leading-normal">CVC/CVV</p>
                  <p className="text-[18.76px] leading-[27.097px]">•••</p>
                </div>

                {/* Mastercard Logo */}
                <div className="absolute bottom-[16.25px] right-[15.63px]">
                  <img src={MASTERCARD_LOGO_SVG} alt="Mastercard" className="w-[66.7px] h-[41.065px]" />
                </div>
              </div>

              {/* Question 1 */}
              <div className="w-full">
                <ol className="list-decimal ml-6 mb-4">
                  <li className="text-base leading-6 tracking-[-0.176px] text-[#243746]">
                    What alternate reimbursement method would you like to use for the reimbursement of claims that are filled online?
                  </li>
                </ol>

                <WexRadioGroup
                  value={debitCardData.alternateMethod}
                  onValueChange={(value) => setDebitCardData({ ...debitCardData, alternateMethod: value })}
                  className="flex flex-col gap-3 pl-4"
                >
                  <div className="flex items-center gap-2">
                    <WexRadioGroup.Item value="direct-deposit" id="alt-direct-deposit" />
                    <WexLabel htmlFor="alt-direct-deposit" className="text-sm leading-6 tracking-[-0.084px] text-[#243746] cursor-pointer">
                      Direct Deposit
                    </WexLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <WexRadioGroup.Item value="check" id="alt-check" />
                    <WexLabel htmlFor="alt-check" className="text-sm leading-6 tracking-[-0.084px] text-[#243746] cursor-pointer">
                      Check
                    </WexLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <WexRadioGroup.Item value="stored-value-card" id="alt-stored-value" />
                    <WexLabel htmlFor="alt-stored-value" className="text-sm leading-6 tracking-[-0.084px] text-[#243746] cursor-pointer">
                      Stored Value Card
                    </WexLabel>
                  </div>
                </WexRadioGroup>
              </div>

              {/* Question 2 */}
              <div className="w-full">
                <ol className="list-decimal ml-6 mb-4" start={2}>
                  <li className="text-base leading-6 tracking-[-0.176px] text-[#243746]">
                    Are any of your dependents using or would like to use separate debit cards?
                  </li>
                </ol>

                <WexRadioGroup
                  value={debitCardData.separateCards}
                  onValueChange={(value) => setDebitCardData({ ...debitCardData, separateCards: value })}
                  className="flex flex-col gap-3 pl-4"
                >
                  <div className="flex items-center gap-2">
                    <WexRadioGroup.Item value="yes" id="separate-yes" />
                    <WexLabel htmlFor="separate-yes" className="text-sm leading-6 tracking-[-0.084px] text-[#243746] cursor-pointer">
                      Yes
                    </WexLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <WexRadioGroup.Item value="no" id="separate-no" />
                    <WexLabel htmlFor="separate-no" className="text-sm leading-6 tracking-[-0.084px] text-[#243746] cursor-pointer">
                      No
                    </WexLabel>
                  </div>
                </WexRadioGroup>
              </div>
            </div>
          )}
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
            <WexButton intent="primary" onClick={handleSaveAndContinue} className="px-4 py-2">
              Save & Continue
            </WexButton>
          </div>
        </div>
      </div>
    </div>
  );
}

