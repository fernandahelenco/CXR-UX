import { useNavigate } from "react-router-dom";
import { WexCard } from "@/components/wex/wex-card";
import { WexInput } from "@/components/wex/wex-input";
import { WexButton } from "@/components/wex/wex-button";
import { Send, Mic, Sparkles } from "lucide-react";
import { aiSuggestions } from "./mockData";

/**
 * AI Chat Section Component
 * 
 * Interactive AI assistant search interface following Figma design:
 * - Bold title (18px H5)
 * - Search input with agent icon, placeholder text, send and mic icons
 * - Suggestion chips with light blue background
 * - Proper spacing: 24px padding, 16px gap between title/input, 12px gap between input/chips
 */
export function AIChatSection() {
  const navigate = useNavigate();

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === "Reimburse Myself") {
      navigate("/reimburse");
    } else if (suggestion === "Enroll in HSA") {
      navigate("/hsa-enrollment");
    }
    // Add other navigation handlers here as needed
  };

  return (
    <WexCard className="border border-border">
      <WexCard.Content className="p-6">
        <div className="flex flex-col gap-4">
          {/* Title - H5/Bold 18px */}
          <h2 className="text-lg font-bold text-foreground leading-6">
            What can we help you with today?
          </h2>

          {/* Search Input Container */}
          <div className="flex flex-col gap-3">
            {/* Input with Icons */}
            <div className="flex gap-4 items-center">
              {/* Main Search Input with left icon */}
              <div className="flex-1 relative">
                <WexInput
                  inputSize="md"
                  type="text"
                  placeholder="Ask the assistant or browse..."
                  leftIcon={<Sparkles className="h-6 w-6" />}
                  className="pr-12"
                />
                {/* Send Icon - positioned absolutely inside input */}
                <WexButton
                  intent="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </WexButton>
              </div>
              
              {/* Mic Icon Button */}
              <WexButton
                intent="ghost"
                size="icon"
                className="h-5 w-5"
                aria-label="Voice input"
              >
                <Mic className="h-5 w-5" />
              </WexButton>
            </div>

            {/* Suggestion Chips with overflow gradient */}
            <div className="relative overflow-hidden w-full">
              <div className="flex gap-2 items-center overflow-x-auto scrollbar-hide">
                {aiSuggestions.map((suggestion, index) => (
                  <WexButton
                    key={index}
                    intent="ghost"
                    size="md"
                    className="rounded-[32px] bg-info/10 text-primary hover:bg-info/20 shrink-0 h-auto py-1"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </WexButton>
                ))}
              </div>
              {/* Gradient overlay on right */}
              <div className="absolute right-0 top-0 bottom-0 w-[18px] bg-gradient-to-r from-transparent to-background pointer-events-none" />
            </div>
          </div>
        </div>
      </WexCard.Content>
    </WexCard>
  );
}
