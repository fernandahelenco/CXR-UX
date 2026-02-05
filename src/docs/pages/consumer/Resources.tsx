import { useState } from "react";
import { WexButton } from "@/components/wex/wex-button";
import { WexCard } from "@/components/wex/wex-card";
import { WexSeparator } from "@/components/wex/wex-separator";
import { WexCollapsible } from "@/components/wex/wex-collapsible";
import { ConsumerNavigation } from "./ConsumerNavigation";
import { ConsumerFooter } from "./Footer";
import {
  FileText,
  Download,
  Video,
  ExternalLink,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

// Resource data from Figma design
const documents = [
  { id: "1", name: "CCPA" },
  { id: "2", name: "Consumer E-Statement Disclosure and Consent" },
  { id: "3", name: "Deductible Verification Form" },
  { id: "4", name: "Health Reimbursement Arrangement (HRA) Opt-Out Waiver Form" },
  { id: "5", name: "Health Savings Account HSA Death Beneficiary Change Form" },
  { id: "6", name: "HSA Tax Documents" },
  { id: "7", name: "Medical Necessity Form" },
  { id: "8", name: "Privacy Policy" },
  { id: "9", name: "Qualified Reservist Distribution Request Form" },
  { id: "10", name: "Security" },
  { id: "11", name: "Terms and Conditions" },
];

const videos = [
  { id: "1", name: "Getting started with your online account" },
  { id: "2", name: "How to order a new replacement WEX benefits debit card" },
];

const howDoILinks = [
  { id: "1", name: "Change Payment Method" },
  { id: "2", name: "Report Card Lost or Stolen" },
  { id: "3", name: "Update Notification Preferences" },
  { id: "4", name: "Download Mobile App" },
];

const quickLinks = [
  { id: "1", name: "Benefits Toolkit" },
  { id: "2", name: "Blog" },
  { id: "3", name: "Customer Service" },
  { id: "4", name: "Mobile App" },
];

export default function Resources() {
  const [documentsOpen, setDocumentsOpen] = useState(true);
  const [planSummariesOpen, setPlanSummariesOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F1FAFE]">
      <ConsumerNavigation />

      {/* Main Content */}
      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="mx-auto max-w-[1376px]">
          {/* Page Header */}
          <div className="mb-8 flex items-center">
            <h1 className="text-[30px] font-bold leading-[40px] tracking-[-0.63px] text-foreground">
              Resources
            </h1>
          </div>

          {/* Two-Column Layout */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Column A */}
            <div className="flex flex-col gap-6 w-full lg:w-[676px]">
              {/* Forms & Documents Card */}
              <WexCard>
                <WexCard.Content className="p-6">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-[20px] font-medium leading-[32px] tracking-[-0.34px] text-foreground">
                      Forms & Documents
                    </h2>
                    <WexSeparator />

                    {/* Documents Section */}
                    <WexCollapsible open={documentsOpen} onOpenChange={setDocumentsOpen}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-foreground tracking-[-0.176px]">
                          Documents
                        </h3>
                        <WexCollapsible.Trigger asChild>
                          <WexButton variant="ghost" className="h-auto w-auto p-0 flex items-center justify-center">
                            {documentsOpen ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )}
                          </WexButton>
                        </WexCollapsible.Trigger>
                      </div>
                      <WexCollapsible.Content className="mt-2">
                        <div className="flex flex-col gap-2">
                          {documents.map((doc) => (
                            <div key={doc.id} className="flex items-center gap-2">
                              <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
                              <WexButton
                                intent="primary"
                                variant="link"
                                className="flex-1 justify-start text-sm tracking-[-0.084px] h-auto p-0"
                              >
                                {doc.name}
                              </WexButton>
                              <Download className="h-3.5 w-3.5 text-primary shrink-0" />
                            </div>
                          ))}
                        </div>
                      </WexCollapsible.Content>
                    </WexCollapsible>

                    {/* Plan Summaries Section */}
                    <WexCollapsible open={planSummariesOpen} onOpenChange={setPlanSummariesOpen}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-foreground tracking-[-0.176px]">
                          Plan Summaries
                        </h3>
                        <WexCollapsible.Trigger asChild>
                          <WexButton variant="ghost" className="h-auto w-auto p-0 flex items-center justify-center">
                            {planSummariesOpen ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )}
                          </WexButton>
                        </WexCollapsible.Trigger>
                      </div>
                      <WexCollapsible.Content className="mt-2">
                        <div className="text-sm text-muted-foreground">
                          Plan summaries content will go here
                        </div>
                      </WexCollapsible.Content>
                    </WexCollapsible>

                    {/* Rules and Agreements Section */}
                    <WexCollapsible open={rulesOpen} onOpenChange={setRulesOpen}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-foreground tracking-[-0.176px]">
                          Rules and Agreements
                        </h3>
                        <WexCollapsible.Trigger asChild>
                          <WexButton variant="ghost" className="h-auto w-auto p-0 flex items-center justify-center">
                            {rulesOpen ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )}
                          </WexButton>
                        </WexCollapsible.Trigger>
                      </div>
                      <WexCollapsible.Content className="mt-2">
                        <div className="text-sm text-muted-foreground">
                          Rules and agreements content will go here
                        </div>
                      </WexCollapsible.Content>
                    </WexCollapsible>
                  </div>
                </WexCard.Content>
              </WexCard>

              {/* Get the most out of your online account Card */}
              <WexCard>
                <WexCard.Content className="p-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[20px] font-medium leading-[32px] tracking-[-0.34px] text-foreground">
                        Get the most out of your online account
                      </h2>
                      <p className="text-base leading-6 text-foreground">
                        Check out the videos below for guidance on some of the most common topics we get asked about.
                      </p>
                    </div>
                    <WexSeparator />
                    <div className="flex flex-col gap-2">
                      {videos.map((video) => (
                        <div key={video.id} className="flex items-center gap-2">
                          <Video className="h-3.5 w-3.5 text-primary shrink-0" />
                          <WexButton
                            intent="primary"
                            variant="link"
                            className="justify-start text-sm tracking-[-0.084px] h-auto p-0"
                          >
                            {video.name}
                          </WexButton>
                        </div>
                      ))}
                    </div>
                  </div>
                </WexCard.Content>
              </WexCard>
            </div>

            {/* Column B */}
            <div className="flex flex-col gap-6 w-full lg:w-[676px]">
              {/* Contact Us Card */}
              <WexCard>
                <WexCard.Content className="p-6">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-[20px] font-medium leading-[32px] tracking-[-0.34px] text-foreground">
                      Contact Us
                    </h2>
                    <WexSeparator />
                    <div className="text-sm leading-6 text-foreground">
                      <p className="mb-0">Participant Services</p>
                      <p className="mb-0">PO Box 2926</p>
                      <p className="mb-4">Fargo, ND 58109</p>
                      <p className="mb-0">
                        <span className="text-foreground">Phone: </span>
                        <span className="text-primary">(866) 451-3399</span>
                      </p>
                      <p>
                        <span className="text-foreground">Fax: </span>
                        <span className="text-foreground">(866) 451-3245</span>
                      </p>
                    </div>
                  </div>
                </WexCard.Content>
              </WexCard>

              {/* How do I? Card */}
              <WexCard>
                <WexCard.Content className="p-6">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-[20px] font-medium leading-[32px] tracking-[-0.34px] text-foreground">
                      How do I?
                    </h2>
                    <WexSeparator />
                    <div className="flex flex-col gap-2">
                      {howDoILinks.map((link) => (
                        <div key={link.id} className="flex items-center gap-2">
                          <ExternalLink className="h-3.5 w-3.5 text-primary shrink-0" />
                          <WexButton
                            intent="primary"
                            variant="link"
                            className="justify-start text-sm tracking-[-0.084px] h-auto p-0"
                          >
                            {link.name}
                          </WexButton>
                        </div>
                      ))}
                    </div>
                  </div>
                </WexCard.Content>
              </WexCard>

              {/* Quick Links Card */}
              <WexCard>
                <WexCard.Content className="p-6">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-[20px] font-medium leading-[32px] tracking-[-0.34px] text-foreground">
                      Quick Links
                    </h2>
                    <WexSeparator />
                    <WexCollapsible open={quickLinksOpen} onOpenChange={setQuickLinksOpen}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-foreground tracking-[-0.176px]">
                          External Quick Links
                        </h3>
                        <WexCollapsible.Trigger asChild>
                          <WexButton variant="ghost" className="h-auto w-auto p-0 flex items-center justify-center">
                            {quickLinksOpen ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )}
                          </WexButton>
                        </WexCollapsible.Trigger>
                      </div>
                      <WexCollapsible.Content className="mt-2">
                        <div className="flex flex-col gap-2">
                          {quickLinks.map((link) => (
                            <div key={link.id} className="flex items-center gap-2">
                              <ExternalLink className="h-3.5 w-3.5 text-primary shrink-0" />
                              <WexButton
                                intent="primary"
                                variant="link"
                                className="justify-start text-sm tracking-[-0.084px] h-auto p-0"
                              >
                                {link.name}
                              </WexButton>
                            </div>
                          ))}
                        </div>
                      </WexCollapsible.Content>
                    </WexCollapsible>
                  </div>
                </WexCard.Content>
              </WexCard>
            </div>
          </div>
        </div>
      </div>

      <ConsumerFooter />
    </div>
  );
}

