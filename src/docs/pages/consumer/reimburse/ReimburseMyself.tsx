import { type FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConsumerNavigation } from "../ConsumerNavigation";
import { useReimbursement } from "./ReimbursementContext";
import {
  WexButton,
  WexCard,
  WexSelect,
  WexFloatLabel,
  WexAlert,
  WexBadge,
  WexTooltip,
  WexLabel,
  WexSeparator,
  WexSpinner,
} from "@/components/wex";
import {
  Upload,
  CheckCircle2,
  ShieldCheck,
  FileText,
  CalendarRange,
  Wallet,
  Sparkles,
  Info,
  X,
} from "lucide-react";

export default function ReimburseMyself() {
  const navigate = useNavigate();
  const { state, updateState } = useReimbursement();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [variant, setVariant] = useState<"mvp" | "vision">(state.variant || "mvp");

  // Vision workflow specific state
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; preview?: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoFillComplete, setAutoFillComplete] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [manualEntryMode, setManualEntryMode] = useState(false);
  const [autoFilledFields, setAutoFilledFields] = useState<Set<string>>(new Set());

  const formData = {
    account: state.account || "",
    category: state.category || "",
    provider: state.provider || "",
    serviceDate: state.serviceDate || "",
    amount: state.amount || "",
    paymentMethod: state.paymentMethod || "direct-deposit",
  };

  const formattedAmount = useMemo(() => {
    const numeric = Number.parseFloat(formData.amount || "0");
    return numeric.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }, [formData.amount]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleChange = (key: keyof typeof formData, value: string) => {
    updateState({ [key]: value });
    // Remove from auto-filled set if user manually edits
    setAutoFilledFields((prev) => {
      if (prev.has(key)) {
        const next = new Set(prev);
        next.delete(key);
        return next;
      }
      return prev;
    });
  };

  const handleFileUpload = (file: File) => {
    const fileData = {
      name: file.name,
      size: `${(file.size / 1024).toFixed(0)} KB`,
    };
    setUploadedFile(fileData);
    setIsAnalyzing(true);
    setAutoFillComplete(false);
    setManualEntryMode(false);

    // Simulate AI analysis (2-3 seconds)
    setTimeout(() => {
      // Auto-fill form with "extracted" data
      updateState({
        provider: "Dr. Jorge Doe",
        serviceDate: "2025-06-20",
        amount: "150.00",
        category: "medical",
        account: "healthcare-fsa",
      });
      // Track which fields were auto-filled
      setAutoFilledFields(new Set(["provider", "serviceDate", "amount", "category", "account"]));
      setIsAnalyzing(false);
      setAutoFillComplete(true);

      // Hide success message after 3 seconds
      setTimeout(() => setAutoFillComplete(false), 3000);
    }, 2500);
  };

  const handleManualEntry = () => {
    setManualEntryMode(true);
    setAutoFilledFields(new Set());
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setAutoFillComplete(false);
    setAutoFilledFields(new Set());
    setManualEntryMode(false);
  };

  const getAccountLabel = (value: string) => {
    if (value === "dependent-care-fsa") return "Dependent Care FSA";
    if (value === "healthcare-fsa") return "Healthcare FSA";
    if (value === "medical-fsa") return "Medical FSA";
    if (value === "hsa") return "HSA";
    return "—";
  };

  const renderMvp = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Reimburse Myself</h1>
      </div>

      <WexCard>
        <WexCard.Content className="space-y-8 p-6 md:p-8">
          <div>
            <p className="text-sm font-semibold text-foreground">Available Balance</p>
            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-2 text-sm text-foreground">
                Medical FSA
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xl font-semibold text-foreground">$2,734.76</p>
            </div>
          </div>

          <WexSeparator />

          <div className="space-y-4">
            <h2 className="text-base font-semibold text-foreground">Select Accounts</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <WexLabel className="text-sm text-foreground">Pay from</WexLabel>
                <WexSelect
                  value={formData.account || undefined}
                  onValueChange={(value) => handleChange("account", value)}
                >
                  <WexSelect.Trigger className="h-10">
                    <WexSelect.Value placeholder="Select an account" />
                  </WexSelect.Trigger>
                  <WexSelect.Content>
                    <WexSelect.Item value="medical-fsa">Medical FSA</WexSelect.Item>
                    <WexSelect.Item value="dependent-care-fsa">Dependent Care FSA</WexSelect.Item>
                    <WexSelect.Item value="hsa">HSA</WexSelect.Item>
                  </WexSelect.Content>
                </WexSelect>
              </div>

              <div className="space-y-2">
                <WexLabel className="text-sm text-foreground">Pay to</WexLabel>
                <WexSelect
                  value={formData.category || undefined}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <WexSelect.Trigger className="h-10">
                    <WexSelect.Value placeholder="Select recipient" />
                  </WexSelect.Trigger>
                  <WexSelect.Content>
                    <WexSelect.Item value="me">Me</WexSelect.Item>
                    <WexSelect.Item value="provider">Provider</WexSelect.Item>
                    <WexSelect.Item value="dependent">Dependent</WexSelect.Item>
                  </WexSelect.Content>
                </WexSelect>
              </div>

              <p className="text-sm text-muted-foreground">
                Based on your selection, you will be requesting a Claim Reimbursement.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <WexButton variant="ghost" onClick={() => navigate("/")}>
                Cancel
              </WexButton>
              <WexButton
                intent="primary"
                onClick={() => {
                  updateState({ variant: "mvp" });
                  navigate("/reimburse/docs");
                }}
              >
                Next
              </WexButton>
            </div>
          </div>
        </WexCard.Content>
      </WexCard>
    </div>
  );

  const renderVision = () => {
    const isFSA = formData.account.includes("fsa");
    const receiptRequired = isFSA && !manualEntryMode;
    const showFormFields = uploadedFile || manualEntryMode || isAnalyzing;

    const isAutoFilled = (field: string) => autoFilledFields.has(field);

    return (
      <>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Reimburse Myself</h1>
        </div>

        {submitted && (
          <WexAlert intent="success">
            <CheckCircle2 className="h-4 w-4" />
            <WexAlert.Title>Reimbursement submitted</WexAlert.Title>
            <WexAlert.Description>
              We&apos;ve queued your reimbursement. You can track it from Claims or return home to continue browsing.
            </WexAlert.Description>
          </WexAlert>
        )}

        {autoFillComplete && (
          <WexAlert intent="info">
            <CheckCircle2 className="h-4 w-4" />
            <WexAlert.Title>Form auto-filled</WexAlert.Title>
            <WexAlert.Description>
              We extracted details from your receipt. Review and adjust as needed.
            </WexAlert.Description>
          </WexAlert>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <WexCard className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <WexCard.Content className="space-y-6 p-6">
                {/* Receipt Upload - Primary Focus */}
                {!showFormFields && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <WexLabel className="text-lg font-semibold text-foreground">Upload receipt</WexLabel>
                      <WexTooltip>
                        <WexTooltip.Trigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </WexTooltip.Trigger>
                        <WexTooltip.Content>
                          <p className="text-sm">Upload itemized receipt or EOB. We&apos;ll extract details automatically.</p>
                        </WexTooltip.Content>
                      </WexTooltip>
                    </div>

                    <div
                      className="relative rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-muted/50 p-16 transition-all hover:border-primary/50 hover:shadow-md cursor-pointer"
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const file = e.dataTransfer.files[0];
                        if (file) handleFileUpload(file);
                      }}
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*,.pdf";
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) handleFileUpload(file);
                        };
                        input.click();
                      }}
                    >
                      <div className="flex flex-col items-center justify-center gap-5 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow-sm">
                          <Upload className="h-10 w-10 text-primary" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-foreground">Click or drag to upload</p>
                          <p className="text-sm text-muted-foreground mt-2">PDF, JPG, or PNG up to 10MB</p>
                        </div>
                      </div>
                    </div>

                    {/* Skip Option */}
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <span className="text-sm text-muted-foreground">Don&apos;t have a receipt?</span>
                      <WexButton
                        type="button"
                        intent="primary"
                        variant="link"
                        className="h-auto p-0 text-sm"
                        onClick={handleManualEntry}
                      >
                        Enter manually
                      </WexButton>
                      {receiptRequired && (
                        <WexTooltip>
                          <WexTooltip.Trigger asChild>
                            <Info className="h-3.5 w-3.5 text-warning" />
                          </WexTooltip.Trigger>
                          <WexTooltip.Content>
                            <p className="text-sm">Receipt required for FSA accounts</p>
                          </WexTooltip.Content>
                        </WexTooltip>
                      )}
                    </div>
                  </div>
                )}

                {/* Upload Status */}
                {uploadedFile && (
                  <div className="space-y-3">
                    {isAnalyzing ? (
                      <div className="flex items-center gap-3 rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                        <WexSpinner className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Analyzing receipt...</p>
                          <p className="text-xs text-muted-foreground">Extracting details from your document</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between rounded-lg border-2 border-success/20 bg-success/5 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{uploadedFile.name}</p>
                            <p className="text-xs text-muted-foreground">{uploadedFile.size}</p>
                          </div>
                        </div>
                        <WexButton
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveFile}
                          className="h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </WexButton>
                      </div>
                    )}
                  </div>
                )}

                {/* Form Fields - Progressive Disclosure */}
                {showFormFields && (
                  <>
                    <WexSeparator className="transition-opacity" />

                    <div className="rounded-lg border bg-muted/30 p-6 space-y-6 transition-all">
                      {manualEntryMode && (
                        <div className="flex items-center gap-2 pb-2 border-b">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <WexLabel className="text-sm font-medium text-foreground">Manual entry</WexLabel>
                        </div>
                      )}

                      {uploadedFile && !isAnalyzing && (
                        <div className="flex items-center gap-2 pb-2 border-b">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <WexLabel className="text-sm font-medium text-foreground">Review and adjust</WexLabel>
                        </div>
                      )}

                      {/* All fields in vertical order */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <WexLabel htmlFor="vision-account" className="text-sm font-medium">
                              Account
                              {isAutoFilled("account") && (
                                <WexBadge intent="info" className="ml-2 text-xs">
                                  AI-filled
                                </WexBadge>
                              )}
                            </WexLabel>
                            <WexTooltip>
                              <WexTooltip.Trigger asChild>
                                <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                              </WexTooltip.Trigger>
                              <WexTooltip.Content>
                                <p className="text-sm">Select the account to reimburse from</p>
                              </WexTooltip.Content>
                            </WexTooltip>
                          </div>
                          <WexSelect
                            value={formData.account}
                            onValueChange={(value) => handleChange("account", value)}
                          >
                            <WexSelect.Trigger id="vision-account">
                              <WexSelect.Value placeholder="Select account" />
                            </WexSelect.Trigger>
                            <WexSelect.Content>
                              <WexSelect.Item value="hsa">Health Savings Account (HSA)</WexSelect.Item>
                              <WexSelect.Item value="healthcare-fsa">Healthcare FSA</WexSelect.Item>
                              <WexSelect.Item value="dependent-care-fsa">Dependent Care FSA</WexSelect.Item>
                            </WexSelect.Content>
                          </WexSelect>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <WexLabel htmlFor="vision-category" className="text-sm font-medium">
                              Expense type
                              {isAutoFilled("category") && (
                                <WexBadge intent="info" className="ml-2 text-xs">
                                  AI-filled
                                </WexBadge>
                              )}
                            </WexLabel>
                            <WexTooltip>
                              <WexTooltip.Trigger asChild>
                                <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                              </WexTooltip.Trigger>
                              <WexTooltip.Content>
                                <p className="text-sm">Category of the expense</p>
                              </WexTooltip.Content>
                            </WexTooltip>
                          </div>
                          <WexSelect
                            value={formData.category}
                            onValueChange={(value) => handleChange("category", value)}
                          >
                            <WexSelect.Trigger id="vision-category">
                              <WexSelect.Value placeholder="Select category" />
                            </WexSelect.Trigger>
                            <WexSelect.Content>
                              <WexSelect.Item value="medical">Medical</WexSelect.Item>
                              <WexSelect.Item value="vision">Vision</WexSelect.Item>
                              <WexSelect.Item value="dental">Dental</WexSelect.Item>
                              <WexSelect.Item value="dependent-care">Dependent Care</WexSelect.Item>
                            </WexSelect.Content>
                          </WexSelect>
                        </div>

                        <div className="space-y-2">
                          {isAutoFilled("provider") && (
                            <WexBadge intent="info" className="text-xs mb-1">
                              AI-filled
                            </WexBadge>
                          )}
                          <WexFloatLabel
                            label="Provider / Merchant"
                            type="text"
                            value={formData.provider}
                            onChange={(e) => handleChange("provider", e.target.value)}
                            leftIcon={<FileText className="h-4 w-4" />}
                          />
                        </div>

                        <div className="space-y-2">
                          {isAutoFilled("serviceDate") && (
                            <WexBadge intent="info" className="text-xs mb-1">
                              AI-filled
                            </WexBadge>
                          )}
                          <WexFloatLabel
                            label="Date of service"
                            type="date"
                            value={formData.serviceDate}
                            onChange={(e) => handleChange("serviceDate", e.target.value)}
                            leftIcon={<CalendarRange className="h-4 w-4" />}
                          />
                        </div>

                        <div className="space-y-2">
                          {isAutoFilled("amount") && (
                            <WexBadge intent="info" className="text-xs mb-1">
                              AI-filled
                            </WexBadge>
                          )}
                          <WexFloatLabel
                            label="Amount"
                            type="number"
                            step="0.01"
                            value={formData.amount}
                            onChange={(e) => handleChange("amount", e.target.value)}
                            leftIcon={<Wallet className="h-4 w-4" />}
                          />
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <WexLabel htmlFor="vision-payment" className="text-sm font-medium">
                            Reimburse to
                          </WexLabel>
                          <WexTooltip>
                            <WexTooltip.Trigger asChild>
                              <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                            </WexTooltip.Trigger>
                            <WexTooltip.Content>
                              <p className="text-sm">Direct deposit is fastest (2-3 days)</p>
                            </WexTooltip.Content>
                          </WexTooltip>
                        </div>
                        <WexSelect
                          value={formData.paymentMethod}
                          onValueChange={(value) => handleChange("paymentMethod", value)}
                        >
                          <WexSelect.Trigger id="vision-payment">
                            <WexSelect.Value placeholder="Select method" />
                          </WexSelect.Trigger>
                          <WexSelect.Content>
                            <WexSelect.Item value="direct-deposit">Direct deposit</WexSelect.Item>
                            <WexSelect.Item value="check">Mailed check</WexSelect.Item>
                            <WexSelect.Item value="hsa-card-reversal">HSA card reversal</WexSelect.Item>
                          </WexSelect.Content>
                        </WexSelect>
                      </div>
                    </div>

                    <WexSeparator />

                    <div className="flex items-center justify-between">
                      <WexButton type="button" variant="ghost" onClick={() => setShowHelp(!showHelp)}>
                        {showHelp ? "Hide help" : "Need help?"}
                      </WexButton>
                      <div className="flex gap-3">
                        <WexButton type="button" variant="ghost" onClick={() => navigate("/")}>
                          Cancel
                        </WexButton>
                        <WexButton type="submit" intent="primary" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </WexButton>
                      </div>
                    </div>

                    {showHelp && (
                      <WexCard className="border-primary/20 bg-primary/5">
                        <WexCard.Content className="p-4 space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-1">What documents are required?</p>
                            <p className="text-xs text-muted-foreground">
                              Itemized receipt or EOB with provider, patient, date, and amount.
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">When will I get reimbursed?</p>
                            <p className="text-xs text-muted-foreground">
                              Direct deposit: 2-3 business days. Check: 7-10 business days.
                            </p>
                          </div>
                        </WexCard.Content>
                      </WexCard>
                    )}
                  </>
                )}
              </WexCard.Content>
            </form>
          </WexCard>

          {/* Real-time Summary Sidebar */}
          <WexCard>
            <WexCard.Header>
              <WexCard.Title className="text-base">Summary</WexCard.Title>
            </WexCard.Header>
            <WexCard.Content className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Account</span>
                <span className="text-sm font-medium">
                  {showFormFields && formData.account ? getAccountLabel(formData.account) : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="text-sm font-medium">
                  {showFormFields && formData.serviceDate
                    ? (() => {
                        const [year, month, day] = formData.serviceDate.split("-");
                        return `${month}/${day}/${year}`;
                      })()
                    : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-base font-semibold text-foreground">
                  {showFormFields && formData.amount ? formattedAmount : "$0.00"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Method</span>
                <span className="text-sm font-medium">
                  {showFormFields && formData.paymentMethod
                    ? formData.paymentMethod === "direct-deposit"
                      ? "Direct deposit"
                      : formData.paymentMethod === "check"
                        ? "Check"
                        : formData.paymentMethod === "hsa-card-reversal"
                          ? "HSA reversal"
                          : "—"
                    : "—"}
                </span>
              </div>
              <WexSeparator />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                <span>Smart checks enabled</span>
              </div>
            </WexCard.Content>
          </WexCard>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-[#F1FAFE]">
        <ConsumerNavigation />

        <div className="mx-auto max-w-[1440px] px-8 py-8">
          <div className="mx-auto max-w-[1376px] space-y-8">
            {variant === "mvp" ? renderMvp() : renderVision()}
          </div>
        </div>
      </div>

      {/* Floating variant switcher */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-40">
        <div className="pointer-events-auto overflow-hidden rounded-full border bg-card shadow-lg shadow-foreground/10">
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Mode
            </div>
            <WexSelect
              value={variant}
              onValueChange={(value) => {
                const newVariant = value as "mvp" | "vision";
                setVariant(newVariant);
                updateState({ variant: newVariant });
              }}
            >
              <WexSelect.Trigger className="h-8 w-32 border-none px-2">
                <WexSelect.Value />
              </WexSelect.Trigger>
              <WexSelect.Content align="end">
                <WexSelect.Item value="mvp">MVP</WexSelect.Item>
                <WexSelect.Item value="vision">Vision</WexSelect.Item>
              </WexSelect.Content>
            </WexSelect>
          </div>
        </div>
      </div>
    </>
  );
}

