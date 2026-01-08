import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { DocsLayout } from "./layout/DocsLayout";
import { ReimbursementProvider } from "./pages/consumer/reimburse/ReimbursementContext";
import { ScrollToTop } from "./components/ScrollToTop";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LightModeBoundary } from "./components/LightModeBoundary";

// Lazy load pages for code splitting
const OverviewPage = React.lazy(() => import("@/docs/pages/OverviewPage"));
const GettingStartedPage = React.lazy(() => import("@/docs/pages/GettingStartedPage"));
const ChangelogPage = React.lazy(() => import("@/docs/pages/ChangelogPage"));
const AccessibilityPage = React.lazy(() => import("@/docs/pages/AccessibilityPage"));
const StoryPage = React.lazy(() => import("@/docs/pages/StoryPage"));
const UnitTestsPage = React.lazy(() => import("@/docs/pages/UnitTestsPage"));
const ContributingPage = React.lazy(() => import("@/docs/pages/ContributingPage"));
const ArchitecturePage = React.lazy(() => import("@/docs/pages/ArchitecturePage"));
const ThemeBuilderPage = React.lazy(() => import("@/docs/pages/ThemeBuilderPage"));
const ThemeExportPage = React.lazy(() => import("@/docs/pages/ThemeExportPage"));

// Consumer Experience page - standalone route
const ConsumerExperiencePage = React.lazy(() => import("@/docs/pages/ConsumerExperiencePage"));

// Account Overview page - standalone route
const AccountOverviewPage = React.lazy(() => import("@/docs/pages/AccountOverviewPage"));

// Message Center page - standalone route
const MessageCenterPage = React.lazy(() => import("@/docs/pages/consumer/MessageCenter"));

// My Profile page - standalone route
const MyProfilePage = React.lazy(() => import("@/docs/pages/consumer/MyProfile"));

// Resources page - standalone route
const ResourcesPage = React.lazy(() => import("@/docs/pages/consumer/Resources"));

// Claims page - standalone route
const ClaimsPage = React.lazy(() => import("@/docs/pages/consumer/Claims"));

// Reimbursement flow pages - standalone routes
const ReimburseMyselfPage = React.lazy(() => import("@/docs/pages/consumer/reimburse/ReimburseMyself"));
const ReimburseDocsPage = React.lazy(() => import("@/docs/pages/consumer/reimburse/ReimburseDocs"));
const ReimburseAnalyzePage = React.lazy(() => import("@/docs/pages/consumer/reimburse/ReimburseAnalyze"));
const ReimburseReviewPage = React.lazy(() => import("@/docs/pages/consumer/reimburse/ReimburseReview"));
const ReimburseConfirmPage = React.lazy(() => import("@/docs/pages/consumer/reimburse/ReimburseConfirm"));

// Login page - standalone route
const LoginPage = React.lazy(() => import("@/docs/pages/Login"));

// Custom Components Demo page - standalone route
const CustomComponentsDemo = React.lazy(() => import("@/docs/pages/consumer/CustomComponentsDemo"));

// HSA Enrollment page - standalone route
const HSAEnrollmentPage = React.lazy(() => import("@/docs/pages/consumer/HSAEnrollmentPage"));

// HSA Eligibility Results page - standalone route
const HSAEligibilityResults = React.lazy(() => import("@/docs/pages/consumer/HSAEligibilityResults"));

// HSA Profile Review page - standalone route
const HSAProfileReview = React.lazy(() => import("@/docs/pages/consumer/HSAProfileReview"));

// HSA Dependents page - standalone route
const HSADependentsPage = React.lazy(() => import("@/docs/pages/consumer/HSADependentsPage"));

// HSA Beneficiaries page - standalone route
const HSABeneficiariesPage = React.lazy(() => import("@/docs/pages/consumer/HSABeneficiariesPage"));

// HSA Reimbursement page - standalone route
const HSAReimbursementPage = React.lazy(() => import("@/docs/pages/consumer/HSAReimbursementPage"));

// HSA Enrollment Review page - standalone route
const HSAEnrollmentReview = React.lazy(() => import("@/docs/pages/consumer/HSAEnrollmentReview"));

// HSA Enrollment Success page - standalone route
const HSAEnrollmentSuccess = React.lazy(() => import("@/docs/pages/consumer/HSAEnrollmentSuccess"));

// Foundation pages
const TokenArchitecturePage = React.lazy(() => import("@/docs/pages/foundations/TokenArchitecturePage"));
const ColorsPage = React.lazy(() => import("@/docs/pages/foundations/ColorsPage"));
const TypographyPage = React.lazy(() => import("@/docs/pages/foundations/TypographyPage"));
const SpacingPage = React.lazy(() => import("@/docs/pages/foundations/SpacingPage"));
const ElevationPage = React.lazy(() => import("@/docs/pages/foundations/ElevationPage"));
const PrimeNGParityPage = React.lazy(() => import("@/docs/pages/foundations/PrimeNGParityPage"));

// Component pages - lazy loaded
const AccordionPage = React.lazy(() => import("@/docs/pages/components/AccordionPage"));
const AlertPage = React.lazy(() => import("@/docs/pages/components/AlertPage"));
const AlertDialogPage = React.lazy(() => import("@/docs/pages/components/AlertDialogPage"));
const AspectRatioPage = React.lazy(() => import("@/docs/pages/components/AspectRatioPage"));
const AvatarPage = React.lazy(() => import("@/docs/pages/components/AvatarPage"));
const BadgePage = React.lazy(() => import("@/docs/pages/components/BadgePage"));
const BreadcrumbPage = React.lazy(() => import("@/docs/pages/components/BreadcrumbPage"));
const ButtonPage = React.lazy(() => import("@/docs/pages/components/ButtonPage"));
const ButtonGroupPage = React.lazy(() => import("@/docs/pages/components/ButtonGroupPage"));
const CalendarPage = React.lazy(() => import("@/docs/pages/components/CalendarPage"));
const CardPage = React.lazy(() => import("@/docs/pages/components/CardPage"));
const CarouselPage = React.lazy(() => import("@/docs/pages/components/CarouselPage"));
const ChartPage = React.lazy(() => import("@/docs/pages/components/ChartPage"));
const CheckboxPage = React.lazy(() => import("@/docs/pages/components/CheckboxPage"));
const CollapsiblePage = React.lazy(() => import("@/docs/pages/components/CollapsiblePage"));
const CommandPage = React.lazy(() => import("@/docs/pages/components/CommandPage"));
const ComboboxPage = React.lazy(() => import("@/docs/pages/components/ComboboxPage"));
const ContextMenuPage = React.lazy(() => import("@/docs/pages/components/ContextMenuPage"));
const DialogPage = React.lazy(() => import("@/docs/pages/components/DialogPage"));
const DrawerPage = React.lazy(() => import("@/docs/pages/components/DrawerPage"));
const DropdownMenuPage = React.lazy(() => import("@/docs/pages/components/DropdownMenuPage"));
const EmptyPage = React.lazy(() => import("@/docs/pages/components/EmptyPage"));
const FieldPage = React.lazy(() => import("@/docs/pages/components/FieldPage"));
const FormPage = React.lazy(() => import("@/docs/pages/components/FormPage"));
const HoverCardPage = React.lazy(() => import("@/docs/pages/components/HoverCardPage"));
const InputPage = React.lazy(() => import("@/docs/pages/components/InputPage"));
const FloatLabelPage = React.lazy(() => import("@/docs/pages/components/FloatLabelPage"));
const InputGroupPage = React.lazy(() => import("@/docs/pages/components/InputGroupPage"));
const InputOTPPage = React.lazy(() => import("@/docs/pages/components/InputOTPPage"));
const ItemPage = React.lazy(() => import("@/docs/pages/components/ItemPage"));
const KbdPage = React.lazy(() => import("@/docs/pages/components/KbdPage"));
const LabelPage = React.lazy(() => import("@/docs/pages/components/LabelPage"));
const MenubarPage = React.lazy(() => import("@/docs/pages/components/MenubarPage"));
const NavigationMenuPage = React.lazy(() => import("@/docs/pages/components/NavigationMenuPage"));
const PaginationPage = React.lazy(() => import("@/docs/pages/components/PaginationPage"));
const PopoverPage = React.lazy(() => import("@/docs/pages/components/PopoverPage"));
const ProgressPage = React.lazy(() => import("@/docs/pages/components/ProgressPage"));
const RadioGroupPage = React.lazy(() => import("@/docs/pages/components/RadioGroupPage"));
const ResizablePage = React.lazy(() => import("@/docs/pages/components/ResizablePage"));
const ScrollAreaPage = React.lazy(() => import("@/docs/pages/components/ScrollAreaPage"));
const SelectPage = React.lazy(() => import("@/docs/pages/components/SelectPage"));
const SeparatorPage = React.lazy(() => import("@/docs/pages/components/SeparatorPage"));
const SheetPage = React.lazy(() => import("@/docs/pages/components/SheetPage"));
const SidebarPage = React.lazy(() => import("@/docs/pages/components/SidebarPage"));
const SkeletonPage = React.lazy(() => import("@/docs/pages/components/SkeletonPage"));
const SliderPage = React.lazy(() => import("@/docs/pages/components/SliderPage"));
const SonnerPage = React.lazy(() => import("@/docs/pages/components/SonnerPage"));
const SpinnerPage = React.lazy(() => import("@/docs/pages/components/SpinnerPage"));
const SwitchPage = React.lazy(() => import("@/docs/pages/components/SwitchPage"));
const TablePage = React.lazy(() => import("@/docs/pages/components/TablePage"));
const DataTablePage = React.lazy(() => import("@/docs/pages/components/DataTablePage"));
const DatePickerPage = React.lazy(() => import("@/docs/pages/components/DatePickerPage"));
const TabsPage = React.lazy(() => import("@/docs/pages/components/TabsPage"));
const TextareaPage = React.lazy(() => import("@/docs/pages/components/TextareaPage"));
const ToastPage = React.lazy(() => import("@/docs/pages/components/ToastPage"));
const TogglePage = React.lazy(() => import("@/docs/pages/components/TogglePage"));
const ToggleGroupPage = React.lazy(() => import("@/docs/pages/components/ToggleGroupPage"));
const TooltipPage = React.lazy(() => import("@/docs/pages/components/TooltipPage"));

/**
 * Loading fallback for lazy-loaded pages
 */
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  );
}

/**
 * Protected DocsLayout wrapper
 * Combines authentication check with DocsLayout
 */
function ProtectedDocsLayout() {
  return (
    <ProtectedRoute>
      <DocsLayout />
    </ProtectedRoute>
  );
}

/**
 * Docs routes configuration
 * Consumer Experience is the landing page, Design System docs wrapped in DocsLayout
 */
export function DocsRoutes() {
  // Wrap consumer-facing pages to enforce light mode without persisting it
  const withConsumerLight = (node: React.ReactNode) => (
    <ProtectedRoute>
      <LightModeBoundary>{node}</LightModeBoundary>
    </ProtectedRoute>
  );

  // Wrap public pages (e.g., login) to enforce light mode without auth gate
  const withLightOnly = (node: React.ReactNode) => (
    <LightModeBoundary>{node}</LightModeBoundary>
  );

  return (
    <React.Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <Routes>
        {/* Standalone Login route - bypasses DocsLayout and protection */}
        <Route
          path="login"
          element={withLightOnly(
            <LoginPage
              onLoginSuccess={() => {
                window.location.href = import.meta.env.BASE_URL
              }}
            />
          )}
        />

        {/* All other routes are protected */}
        <Route index element={withConsumerLight(<ConsumerExperiencePage />)} />
        
        {/* Standalone Account Overview route - bypasses DocsLayout */}
        <Route path="account-overview" element={withConsumerLight(<AccountOverviewPage />)} />
        
        {/* Standalone Message Center route - bypasses DocsLayout */}
        <Route path="message-center" element={withConsumerLight(<MessageCenterPage />)} />
        
        {/* Standalone My Profile route - bypasses DocsLayout */}
        <Route path="my-profile" element={withConsumerLight(<MyProfilePage />)} />

        {/* Standalone Resources route - bypasses DocsLayout */}
        <Route path="resources" element={withConsumerLight(<ResourcesPage />)} />

        {/* Standalone Claims route - bypasses DocsLayout */}
        <Route path="claims" element={withConsumerLight(<ClaimsPage />)} />

        {/* Standalone Reimbursement flow routes - bypasses DocsLayout, wrapped with ReimbursementProvider */}
        <Route
          path="reimburse/*"
          element={
            withConsumerLight(
              <ReimbursementProvider>
                <Routes>
                  <Route index element={<ReimburseMyselfPage />} />
                  <Route path="docs" element={<ReimburseDocsPage />} />
                  <Route path="analyze" element={<ReimburseAnalyzePage />} />
                  <Route path="review" element={<ReimburseReviewPage />} />
                  <Route path="confirm" element={<ReimburseConfirmPage />} />
                </Routes>
              </ReimbursementProvider>
            )
          }
        />
        
        {/* Custom Components Demo route - bypasses DocsLayout */}
        <Route path="/custom-components-demo" element={withConsumerLight(<CustomComponentsDemo />)} />
        
        {/* Standalone HSA Enrollment route - bypasses DocsLayout */}
        <Route path="hsa-enrollment" element={withConsumerLight(<HSAEnrollmentPage />)} />
        
        {/* Standalone HSA Eligibility Results route - bypasses DocsLayout */}
        <Route path="hsa-enrollment/results" element={withConsumerLight(<HSAEligibilityResults />)} />
        
        {/* Standalone HSA Profile Review route - bypasses DocsLayout */}
        <Route path="hsa-enrollment/profile" element={withConsumerLight(<HSAProfileReview />)} />
        
        {/* Standalone HSA Dependents route - bypasses DocsLayout */}
        <Route path="hsa-enrollment/dependents" element={withConsumerLight(<HSADependentsPage />)} />
        
        {/* Standalone HSA Beneficiaries route - bypasses DocsLayout */}
        <Route path="hsa-enrollment/beneficiaries" element={withConsumerLight(<HSABeneficiariesPage />)} />
        
        {/* Standalone HSA Reimbursement route - bypasses DocsLayout */}
        <Route path="hsa-enrollment/reimbursement" element={withConsumerLight(<HSAReimbursementPage />)} />
        
        {/* Standalone HSA Enrollment Review route - bypasses DocsLayout */}
        <Route path="hsa-enrollment/review" element={withConsumerLight(<HSAEnrollmentReview />)} />
        
        {/* Standalone HSA Enrollment Success route - bypasses DocsLayout */}
        <Route path="hsa-enrollment/success" element={withConsumerLight(<HSAEnrollmentSuccess />)} />
        
        <Route element={<ProtectedDocsLayout />}>
          {/* Design System overview moved to /design-system */}
          <Route path="design-system" element={<OverviewPage />} />
          <Route path="getting-started" element={<GettingStartedPage />} />
          <Route path="changelog" element={<ChangelogPage />} />
          <Route path="accessibility" element={<AccessibilityPage />} />
          <Route path="story" element={<StoryPage />} />
          <Route path="unit-tests" element={<UnitTestsPage />} />
          <Route path="contributing" element={<ContributingPage />} />
          <Route path="architecture" element={<ArchitecturePage />} />
          <Route path="theme-builder/export" element={<ThemeExportPage />} />
          <Route path="theme-builder" element={<ThemeBuilderPage />} />

          {/* Foundation pages */}
          {/* Redirect old tokens path to consolidated token-architecture page */}
          <Route path="foundations/tokens" element={<TokenArchitecturePage />} />
          <Route path="foundations/token-architecture" element={<TokenArchitecturePage />} />
          <Route path="foundations/colors" element={<ColorsPage />} />
          <Route path="foundations/typography" element={<TypographyPage />} />
          <Route path="foundations/spacing" element={<SpacingPage />} />
          <Route path="foundations/elevation" element={<ElevationPage />} />
          <Route path="foundations/primeng-parity" element={<PrimeNGParityPage />} />

          {/* Component pages */}
          <Route path="components/accordion" element={<AccordionPage />} />
          <Route path="components/alert" element={<AlertPage />} />
          <Route path="components/alert-dialog" element={<AlertDialogPage />} />
          <Route path="components/aspect-ratio" element={<AspectRatioPage />} />
          <Route path="components/avatar" element={<AvatarPage />} />
          <Route path="components/badge" element={<BadgePage />} />
          <Route path="components/breadcrumb" element={<BreadcrumbPage />} />
          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/button-group" element={<ButtonGroupPage />} />
          <Route path="components/calendar" element={<CalendarPage />} />
          <Route path="components/card" element={<CardPage />} />
          <Route path="components/carousel" element={<CarouselPage />} />
          <Route path="components/chart" element={<ChartPage />} />
          <Route path="components/checkbox" element={<CheckboxPage />} />
          <Route path="components/collapsible" element={<CollapsiblePage />} />
          <Route path="components/command" element={<CommandPage />} />
          <Route path="components/combobox" element={<ComboboxPage />} />
          <Route path="components/context-menu" element={<ContextMenuPage />} />
          <Route path="components/dialog" element={<DialogPage />} />
          <Route path="components/drawer" element={<DrawerPage />} />
          <Route path="components/dropdown-menu" element={<DropdownMenuPage />} />
          <Route path="components/empty" element={<EmptyPage />} />
          <Route path="components/field" element={<FieldPage />} />
          <Route path="components/form" element={<FormPage />} />
          <Route path="components/hover-card" element={<HoverCardPage />} />
          <Route path="components/input" element={<InputPage />} />
          <Route path="components/float-label" element={<FloatLabelPage />} />
          <Route path="components/input-group" element={<InputGroupPage />} />
          <Route path="components/input-otp" element={<InputOTPPage />} />
          <Route path="components/item" element={<ItemPage />} />
          <Route path="components/kbd" element={<KbdPage />} />
          <Route path="components/label" element={<LabelPage />} />
          <Route path="components/menubar" element={<MenubarPage />} />
          <Route path="components/navigation-menu" element={<NavigationMenuPage />} />
          <Route path="components/pagination" element={<PaginationPage />} />
          <Route path="components/popover" element={<PopoverPage />} />
          <Route path="components/progress" element={<ProgressPage />} />
          <Route path="components/radio-group" element={<RadioGroupPage />} />
          <Route path="components/resizable" element={<ResizablePage />} />
          <Route path="components/scroll-area" element={<ScrollAreaPage />} />
          <Route path="components/select" element={<SelectPage />} />
          <Route path="components/separator" element={<SeparatorPage />} />
          <Route path="components/sheet" element={<SheetPage />} />
          <Route path="components/sidebar" element={<SidebarPage />} />
          <Route path="components/skeleton" element={<SkeletonPage />} />
          <Route path="components/slider" element={<SliderPage />} />
          <Route path="components/sonner" element={<SonnerPage />} />
          <Route path="components/spinner" element={<SpinnerPage />} />
          <Route path="components/switch" element={<SwitchPage />} />
          <Route path="components/table" element={<TablePage />} />
          <Route path="components/data-table" element={<DataTablePage />} />
          <Route path="components/date-picker" element={<DatePickerPage />} />
          <Route path="components/tabs" element={<TabsPage />} />
          <Route path="components/textarea" element={<TextareaPage />} />
          <Route path="components/toast" element={<ToastPage />} />
          <Route path="components/toggle" element={<TogglePage />} />
          <Route path="components/toggle-group" element={<ToggleGroupPage />} />
          <Route path="components/tooltip" element={<TooltipPage />} />

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}

function NotFoundPage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-2xl font-display font-semibold text-foreground mb-2">
        Page Not Found
      </h1>
      <p className="text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
}
