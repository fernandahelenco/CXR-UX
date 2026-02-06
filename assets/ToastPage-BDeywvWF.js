import{j as e,W as o,b8 as t}from"./index-6zo69QwL.js";import{C as a}from"./ComponentPage-D__tiAq8.js";import{S as n}from"./Section-BauEvoRt.js";import{E as s,P as c,T as d}from"./PropsTable-D73b8hei.js";import{C as r}from"./CodeBlock-OGrpKnv-.js";import{G as l}from"./ProseBlock-2XnAMKOu.js";import"./circle-question-mark-DCs63v13.js";import"./triangle-alert-DUVDPAo6.js";import"./sun-CpsQPHX2.js";import"./contrast-1QdVzTcJ.js";import"./eye-C_tt1qH9.js";import"./flask-conical-j3_kYpd9.js";import"./palette-BMSbw_dV.js";import"./prism-css-DCmN4fe8.js";import"./copy-5CkfTEwr.js";const m=[{name:"message",type:"string | ReactNode",required:!0,description:"Toast message content"},{name:"description",type:"string | ReactNode",description:"Additional description"},{name:"duration",type:"number",default:"4000",description:"Duration in ms (Infinity to persist)"},{name:"position",type:'"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',default:'"bottom-right"',description:"Toast position"},{name:"action",type:"{ label: string; onClick: () => void }",description:"Action button config"},{name:"cancel",type:"{ label: string; onClick: () => void }",description:"Cancel button config"}],p=[{element:"Default",property:"Background",token:"--background"},{element:"Default",property:"Text",token:"--foreground"},{element:"Default",property:"Border",token:"--border"},{element:"Info",property:"Background",token:"--wex-component-toast-info-bg"},{element:"Info",property:"Text",token:"--wex-component-toast-info-fg"},{element:"Info",property:"Border",token:"--wex-component-toast-info-border"},{element:"Success",property:"Background",token:"--wex-component-toast-success-bg"},{element:"Success",property:"Text",token:"--wex-component-toast-success-fg"},{element:"Success",property:"Border",token:"--wex-component-toast-success-border"},{element:"Error",property:"Background",token:"--wex-component-toast-destructive-bg"},{element:"Error",property:"Text",token:"--wex-component-toast-destructive-fg"},{element:"Error",property:"Border",token:"--wex-component-toast-destructive-border"},{element:"Warning",property:"Background",token:"--warning"},{element:"Warning",property:"Text",token:"--warning-foreground"},{element:"Close Button",property:"Hover BG",token:"--wex-component-toast-close-hover-bg"}];function A(){return e.jsxs(a,{title:"Toast",description:"A succinct message that is displayed temporarily.",status:"beta",registryKey:"toast",children:[e.jsxs(n,{title:"Overview",children:[e.jsx("div",{className:"rounded-lg border border-border bg-card p-6 mb-4",children:e.jsxs("p",{className:"text-muted-foreground",children:["Toast notifications provide brief feedback about an operation. We use the ",e.jsx("strong",{children:"Sonner"})," library for toast functionality, which provides a modern, accessible toast system."]})}),e.jsx(s,{children:e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(o,{variant:"outline",onClick:()=>t("Event has been created"),children:"Default Toast"}),e.jsx(o,{variant:"outline",onClick:()=>t.success("Successfully saved!"),children:"Success"}),e.jsx(o,{variant:"outline",onClick:()=>t.error("Something went wrong"),children:"Error"})]})}),e.jsx(l,{children:"Note: The Sonner page provides comprehensive toast documentation. This page exists for reference to the shadcn Toast primitive."})]}),e.jsx(n,{title:"Toast Types",description:"Different toast variants for different scenarios.",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(s,{title:"Default",description:"General notifications.",children:e.jsx(o,{variant:"outline",onClick:()=>t("Your changes have been saved"),children:"Show Default"})}),e.jsx(s,{title:"Success",description:"Positive confirmations.",children:e.jsx(o,{variant:"outline",onClick:()=>t.success("Profile updated successfully"),children:"Show Success"})}),e.jsx(s,{title:"Error",description:"Error messages.",children:e.jsx(o,{variant:"outline",onClick:()=>t.error("Failed to save changes"),children:"Show Error"})}),e.jsx(s,{title:"Warning",description:"Caution messages.",children:e.jsx(o,{variant:"outline",onClick:()=>t.warning("Session expires in 5 minutes"),children:"Show Warning"})}),e.jsx(s,{title:"Info",description:"Informational messages.",children:e.jsx(o,{variant:"outline",onClick:()=>t.info("New version available"),children:"Show Info"})}),e.jsx(s,{title:"With Description",description:"Toast with additional context.",children:e.jsx(o,{variant:"outline",onClick:()=>t("Event Created",{description:"Your event has been scheduled for tomorrow at 3pm."}),children:"With Description"})}),e.jsx(s,{title:"With Action",description:"Toast with action button.",children:e.jsx(o,{variant:"outline",onClick:()=>t("Message sent",{action:{label:"Undo",onClick:()=>t("Undone!")}}),children:"With Action"})}),e.jsx(s,{title:"Loading",description:"For async operations.",children:e.jsx(o,{variant:"outline",onClick:()=>{const i=t.loading("Saving...");setTimeout(()=>{t.success("Saved!",{id:i})},2e3)},children:"Show Loading"})})]})}),e.jsxs(n,{title:"Setup",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4 mb-4",children:[e.jsx("h3",{className:"font-medium mb-2",children:"Required: Add Toaster Component"}),e.jsx("p",{className:"text-sm text-muted-foreground mb-3",children:"The Toaster component must be included once in your application root."})]}),e.jsx(r,{code:`// In App.tsx or layout
import { WexToaster } from "@/components/wex";

function App() {
  return (
    <>
      <YourApp />
      <WexToaster />
    </>
  );
}`})]}),e.jsx(n,{title:"Accessibility",children:e.jsxs("div",{className:"space-y-4 text-foreground",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4",children:[e.jsx("h3",{className:"font-medium mb-2",children:"WCAG 2.2 Level AA Compliant"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Toast notifications meet WCAG 2.2 Level AA accessibility requirements."})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4",children:[e.jsx("h3",{className:"font-medium mb-2",children:"ARIA Live Regions"}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Toasts use ",e.jsx("code",{className:"bg-muted px-1 rounded",children:'aria-live="polite"'})," to announce messages to screen readers without interrupting the user."]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4",children:[e.jsx("h3",{className:"font-medium mb-2",children:"Keyboard Navigation"}),e.jsxs("ul",{className:"text-sm text-muted-foreground list-disc list-inside space-y-1",children:[e.jsx("li",{children:"Tab: Focus action buttons"}),e.jsx("li",{children:"Enter: Activate action"}),e.jsx("li",{children:"Escape: Dismiss toast (when focused)"})]})]})]})}),e.jsx(n,{title:"Usage",children:e.jsx(r,{code:`import { wexToast } from "@/components/wex";

// Basic
wexToast("Hello World");

// Variants
wexToast.success("Saved!");
wexToast.error("Failed!");
wexToast.warning("Caution!");
wexToast.info("FYI...");

// With description
wexToast("Title", {
  description: "More details here.",
});

// With action
wexToast("Undo?", {
  action: {
    label: "Undo",
    onClick: () => console.log("Undone"),
  },
});

// Loading → Success
const id = wexToast.loading("Loading...");
// After async operation:
wexToast.success("Done!", { id });

// Dismiss
wexToast.dismiss(); // All
wexToast.dismiss(id); // Specific`})}),e.jsxs(n,{title:"API Reference",children:[e.jsxs("p",{className:"text-sm text-muted-foreground mb-4",children:["Toast is called as a function: ",e.jsx("code",{className:"text-sm",children:'toast("Message")'})," or ",e.jsx("code",{className:"text-sm",children:'toast.success("Message")'})]}),e.jsx(c,{props:m})]}),e.jsx(d,{tokens:p,className:"mt-12"})]})}export{A as default};
