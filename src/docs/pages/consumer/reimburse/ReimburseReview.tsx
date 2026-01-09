import { useNavigate } from "react-router-dom";
import { ConsumerNavigation } from "../ConsumerNavigation";
import { useReimbursement } from "./ReimbursementContext";
import {
  WexButton,
  WexCard,
  WexInput,
  WexTextarea,
  WexRadioGroup,
  WexLabel,
  WexSeparator,
  WexAlert,
} from "@/components/wex";
import { Info, AlertCircle } from "lucide-react";

export default function ReimburseReview() {
  const navigate = useNavigate();
  const { state, updateState } = useReimbursement();

  // Use extracted data or fallback to form data
  const extractedData = state.extractedData || {};
  const formData = {
    startDate: extractedData.startDate || state.serviceDate || "06/20/2026",
    endDate: extractedData.endDate || state.serviceDate || "06/20/2026",
    amount: extractedData.amount || state.amount || "$150.00",
    provider: extractedData.provider || state.provider || "Dr. Jorge Doe",
    category: extractedData.category || state.category || "Medical",
    type: extractedData.type || "Office Visit",
    description: extractedData.description || "",
  };

  const recipient = state.recipient || "adam";
  const didDrive = state.didDrive || "no";

  const handleRecipientChange = (value: string) => {
    updateState({ recipient: value });
  };

  const handleDriveChange = (value: string) => {
    updateState({ didDrive: value });
  };

  return (
    <div className="min-h-screen bg-[#F1FAFE]">
      <ConsumerNavigation />

      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="mx-auto max-w-[1376px] space-y-8">
          <h1 className="text-2xl font-semibold text-foreground">Reimburse Myself</h1>

          <WexCard>
            <WexCard.Content className="space-y-8 p-6 md:p-8">
              <div>
                <p className="text-sm font-semibold text-foreground">Available Balance</p>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    Medical FSA <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xl font-semibold text-foreground">$2,734.76</p>
                </div>
              </div>

              <WexSeparator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-foreground">Uploaded document</h2>
                </div>
                <WexAlert intent="info" className="rounded-md bg-primary/5 px-3 py-2 text-xs text-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <WexAlert.Description>
                    The form has been pre-filled for your convenience. Please review and correct any errors to ensure accuracy.
                  </WexAlert.Description>
                </WexAlert>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-3">
                    <div className="grid gap-4">
                      <div className="space-y-1">
                        <WexLabel className="text-sm text-foreground">Start Date of Service</WexLabel>
                        <WexInput value={formData.startDate} readOnly />
                      </div>
                      <div className="space-y-1">
                        <WexLabel className="text-sm text-foreground">End Date of Service</WexLabel>
                        <WexInput value={formData.endDate} readOnly />
                      </div>
                      <div className="space-y-1">
                        <WexLabel className="text-sm text-foreground">Amount</WexLabel>
                        <WexInput value={formData.amount} readOnly />
                      </div>
                      <div className="space-y-1">
                        <WexLabel className="text-sm text-foreground">Provider</WexLabel>
                        <WexInput value={formData.provider} readOnly />
                      </div>
                      <div className="space-y-1">
                        <WexLabel className="text-sm text-foreground">Category</WexLabel>
                        <WexInput value={formData.category} readOnly />
                      </div>
                      <div className="space-y-1">
                        <WexLabel className="text-sm text-foreground">Type</WexLabel>
                        <WexInput value={formData.type} readOnly />
                      </div>
                      <div className="space-y-1">
                        <WexLabel className="text-sm text-foreground">Description</WexLabel>
                        <WexTextarea rows={3} value={formData.description} readOnly />
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Recipient</p>
                        <WexRadioGroup value={recipient} onValueChange={handleRecipientChange} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <WexRadioGroup.Item value="adam" id="recipient-adam" />
                            <WexLabel htmlFor="recipient-adam" className="text-sm font-medium text-foreground">
                              Adam Smith
                            </WexLabel>
                          </div>
                          <WexButton intent="primary" variant="link" className="px-0 justify-start h-auto p-0">
                            + Add a dependent
                          </WexButton>
                        </WexRadioGroup>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          Did you drive to receive this product or service?
                        </p>
                        <WexRadioGroup value={didDrive} onValueChange={handleDriveChange} className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <WexRadioGroup.Item value="yes" id="drive-yes" />
                            <WexLabel htmlFor="drive-yes" className="text-sm text-foreground">
                              Yes
                            </WexLabel>
                          </div>
                          <div className="flex items-center gap-2">
                            <WexRadioGroup.Item value="no" id="drive-no" />
                            <WexLabel htmlFor="drive-no" className="text-sm text-foreground">
                              No
                            </WexLabel>
                          </div>
                        </WexRadioGroup>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-center lg:justify-end">
                    <div className="flex h-full w-full max-w-[360px] items-center justify-center rounded-md border bg-muted p-4">
                      <div className="h-[360px] w-[260px] rounded-sm bg-card shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              <WexSeparator />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Extracted information</h3>
                <WexCard>
                  <WexCard.Content className="p-0">
                    <div className="flex items-center justify-between px-4 py-3 text-sm">
                      <span className="text-muted-foreground">Eligible Items</span>
                      <span className="text-foreground">$150.00</span>
                    </div>
                    <WexSeparator />
                    <div className="flex items-center justify-between px-4 py-3 text-sm">
                      <span className="text-muted-foreground">Office Visit</span>
                      <span className="text-foreground">$150.00</span>
                    </div>
                    <WexSeparator />
                    <div className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground">
                      <span>Total</span>
                      <span>$150.00</span>
                    </div>
                  </WexCard.Content>
                </WexCard>
              </div>

              <div className="flex items-center justify-between pt-2">
                <WexButton variant="ghost" onClick={() => navigate("/")}>
                  Cancel
                </WexButton>
                <div className="flex gap-2">
                  <WexButton intent="secondary" onClick={() => navigate("/reimburse/docs")}>
                    Previous
                  </WexButton>
                  <WexButton intent="primary" onClick={() => navigate("/reimburse/confirm")}>
                    Next
                  </WexButton>
                </div>
              </div>
            </WexCard.Content>
          </WexCard>
        </div>
      </div>
    </div>
  );
}

