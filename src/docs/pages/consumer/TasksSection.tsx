import { useNavigate } from "react-router-dom";
import { WexCard } from "@/components/wex/wex-card";
import { WexButton } from "@/components/wex/wex-button";
import { WexBadge } from "@/components/wex/wex-badge";
import { WexTag } from "@/components/wex/wex-tag";
import { WexSeparator } from "@/components/wex/wex-separator";
import { ChevronRight, Landmark, Clock, Mail } from "lucide-react";
import { tasksData } from "./mockData";

/**
 * To Do Section Component
 * 
 * Displays pending tasks with an updated layout following the reference image:
 * - Icon in rounded container
 * - Title and description
 * - Action button on the right
 * - Urgent badge when applicable
 */
export function TasksSection() {
  const navigate = useNavigate();
  const pendingCount = tasksData.filter(task => task.isPending).length;

  const getIcon = (category?: string) => {
    switch (category) {
      case "banking":
        return <Landmark className="h-5 w-5 text-blue-600" />;
      case "clock":
        return <Clock className="h-5 w-5 text-orange-600" />;
      case "mail":
        return <Mail className="h-5 w-5 text-blue-600" />;
      default:
        return <Landmark className="h-5 w-5 text-blue-600" />;
    }
  };

  const getIconBg = (category?: string) => {
    switch (category) {
      case "banking":
        return "bg-blue-50";
      case "clock":
        return "bg-orange-50";
      case "mail":
        return "bg-blue-50";
      default:
        return "bg-blue-50";
    }
  };

  return (
    <WexCard>
      <WexCard.Content className="p-6">
        <div className="space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Tasks
              </h2>
              {pendingCount > 0 && (
                <WexBadge 
                  intent="destructive"
                  className="rounded-full h-6 w-6 flex items-center justify-center p-0"
                >
                  {pendingCount}
                </WexBadge>
              )}
            </div>
            <WexButton 
              intent="primary"
              variant="link"
              size="sm"
              className="font-medium h-auto p-0"
              onClick={() => {
                navigate("/message-center");
              }}
            >
              view All
              <ChevronRight className="h-4 w-4" />
            </WexButton>
          </div>

          {/* Task Items */}
          <div className="space-y-0">
            {tasksData.map((task, index) => (
              <div key={task.id}>
                <div className="flex items-center justify-between py-4 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon Container */}
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${getIconBg(task.category)}`}>
                      {getIcon(task.category)}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-base font-display font-medium text-foreground truncate">
                          {task.title}
                        </h3>
                        {task.isUrgent && (
                          <WexTag intent="warning" size="sm" className="uppercase tracking-wider font-bold">
                            Urgent
                          </WexTag>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {task.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center shrink-0">
                    <WexButton
                      intent="primary"
                      size="sm"
                      className="min-w-[120px]"
                      onClick={() => navigate("/message-center")}
                    >
                      {task.actionLabel}
                    </WexButton>
                  </div>
                </div>
                {index < tasksData.length - 1 && <WexSeparator />}
              </div>
            ))}
          </div>
        </div>
      </WexCard.Content>
    </WexCard>
  );
}

