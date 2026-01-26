import{j as e,W as o}from"./index-DR-Vk8Ta.js";import{C as x}from"./ComponentPage-gh9mEv4v.js";import{S as n}from"./Section-xazZlWmv.js";import{E as r,P as h,T as g}from"./PropsTable-BEscCeJq.js";import{C as a}from"./CodeBlock-Crf3PjyR.js";import{G as d}from"./ProseBlock-6Oj8xtnp.js";import{w as s}from"./wex-toast-BUWzcvfD.js";import"./circle-question-mark-DjxxB4fz.js";import"./triangle-alert-Cu3tyAgz.js";import"./sun-CMrh3GTI.js";import"./contrast-1QdVzTcJ.js";import"./eye-Dmb1_3He.js";import"./flask-conical-uGTsXyf7.js";import"./palette-DGmcYpaE.js";import"./prism-css-CX_HTyBM.js";import"./copy-DnCSTXzQ.js";function b({compliance:t="2.2",level:i="AA",notes:l}){return e.jsx(n,{title:"Accessibility",children:e.jsxs("div",{className:"space-y-4 text-foreground",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4",children:[e.jsxs("h3",{className:"font-medium mb-2",children:["WCAG ",t," Level ",i," Compliant"]}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["This component meets WCAG ",t," Level ",i," accessibility requirements."]})]}),l.map((c,m)=>e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4",children:[e.jsx("h3",{className:"font-medium mb-2",children:c.title}),c.items?e.jsx("ul",{className:"text-sm text-muted-foreground list-disc list-inside space-y-1",children:c.items.map((p,u)=>e.jsx("li",{children:p},u))}):e.jsx("p",{className:"text-sm text-muted-foreground",children:c.description})]},m))]})})}const j=[{name:"message",type:"string | ReactNode",required:!0,description:"Toast message content"},{name:"description",type:"string | ReactNode",description:"Additional description"},{name:"duration",type:"number",default:"4000",description:"Duration in ms"},{name:"position",type:'"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',default:'"top-center"',description:"Toast position"},{name:"action",type:"{ label: string; onClick: () => void }",description:"Action button config"},{name:"cancel",type:"{ label: string; onClick: () => void }",description:"Cancel button config"},{name:"id",type:"string | number",description:"Unique ID for deduplication"},{name:"dismissible",type:"boolean",default:"true",description:"Show close button"}],f=[{element:"Toast",property:"Background",token:"--background"},{element:"Toast",property:"Border",token:"--border"},{element:"Toast",property:"Text",token:"--foreground"},{element:"Success",property:"Icon",token:"--success"},{element:"Error",property:"Icon",token:"--destructive"},{element:"Warning",property:"Icon",token:"--warning"},{element:"Info",property:"Icon",token:"--info"},{element:"Action Button",property:"Background",token:"--primary"}];function B(){const t="top-center";return e.jsxs(x,{title:"Sonner",description:"An opinionated toast component for React.",status:"stable",registryKey:"sonner",children:[e.jsxs(n,{title:"Overview",children:[e.jsx(r,{children:e.jsx(o,{variant:"outline",onClick:()=>s("Event has been created",{position:t}),children:"Show Toast"})}),e.jsxs(d,{children:["Sonner is an opinionated toast component that defaults to top-center positioning with visual stacking behavior. Use ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"WexToaster"})," at your app root and ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"wexToast()"})," to trigger notifications."]})]}),e.jsx(n,{title:"Usage",children:e.jsx(a,{code:`// 1. Add WexToaster to your app root (once)
import { WexToaster } from "@/components/wex";

function App() {
  return (
    <>
      <Routes />
      <WexToaster position="top-center" />
    </>
  );
}

// 2. Trigger toasts anywhere in your app
import { wexToast } from "@/components/wex";

wexToast("Event has been created");`})}),e.jsxs(n,{title:"Variants",description:"Different toast types for various feedback scenarios.",children:[e.jsx(r,{children:e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(o,{variant:"outline",onClick:()=>s("Event has been created",{position:t}),children:"Default"}),e.jsx(o,{variant:"outline",onClick:()=>s.success("Event has been created",{position:t}),children:"Success"}),e.jsx(o,{variant:"outline",onClick:()=>s.info("Be at the area 10 minutes before the event time",{position:t}),children:"Info"}),e.jsx(o,{variant:"outline",onClick:()=>s.warning("Event start time cannot be earlier than 8am",{position:t}),children:"Warning"}),e.jsx(o,{variant:"outline",onClick:()=>s.error("Event has not been created",{position:t}),children:"Error"}),e.jsx(o,{variant:"outline",onClick:()=>s.promise(new Promise(i=>setTimeout(()=>i({name:"Sonner"}),2e3)),{loading:"Loading...",success:i=>`${i.name} toast has been added`,error:"Error",position:t}),children:"Promise"})]})}),e.jsx(d,{children:"Sonner automatically stacks multiple toasts visually. Try clicking multiple buttons in quick succession to see the stacking behavior."}),e.jsx("div",{className:"mt-4",children:e.jsx(a,{code:`// Default toast
wexToast("Event has been created");

// Success toast
wexToast.success("Saved successfully!");

// Error toast
wexToast.error("Something went wrong");

// Warning toast
wexToast.warning("Please review your input");

// Info toast
wexToast.info("New update available");

// Promise toast (loading → success/error)
wexToast.promise(saveData(), {
  loading: "Saving...",
  success: "Data saved!",
  error: "Failed to save",
});`})})]}),e.jsxs(n,{title:"With Description",description:"Add additional context to your toast.",children:[e.jsx(r,{children:e.jsx(o,{variant:"outline",onClick:()=>s("Event has been created",{description:"Sunday, December 03, 2023 at 9:00 AM",position:t}),children:"Show Toast"})}),e.jsx("div",{className:"mt-4",children:e.jsx(a,{code:`wexToast("Event has been created", {
  description: "Sunday, December 03, 2023 at 9:00 AM",
});`})})]}),e.jsxs(n,{title:"With Action",description:"Add an action button to your toast.",children:[e.jsx(r,{children:e.jsx(o,{variant:"outline",onClick:()=>s("Event has been created",{description:"Sunday, December 03, 2023 at 9:00 AM",action:{label:"Undo",onClick:()=>s("Undo clicked",{position:t})},position:t}),children:"Show Toast"})}),e.jsx("div",{className:"mt-4",children:e.jsx(a,{code:`wexToast("Event has been created", {
  description: "Sunday, December 03, 2023 at 9:00 AM",
  action: {
    label: "Undo",
    onClick: () => console.log("Undo clicked"),
  },
});`})})]}),e.jsxs(n,{title:"Loading State",description:"Show a loading toast that updates when complete.",children:[e.jsx(r,{children:e.jsx(o,{variant:"outline",onClick:()=>{const i=s.loading("Saving changes...",{position:t});setTimeout(()=>{s.success("Changes saved!",{id:i,position:t})},2e3)},children:"Show Loading"})}),e.jsx("div",{className:"mt-4",children:e.jsx(a,{code:`// Show loading toast, then update to success
const toastId = wexToast.loading("Saving changes...");

// After async operation completes:
wexToast.success("Changes saved!", { id: toastId });

// Or if it fails:
wexToast.error("Failed to save", { id: toastId });`})})]}),e.jsx(b,{compliance:"2.2",level:"AA",notes:[{title:"ARIA Live Region",description:"Toasts use aria-live='polite' to announce messages without interrupting the user."},{title:"Keyboard Navigation",items:["Tab: Focus action buttons within the toast","Enter: Activate focused action","Escape: Dismiss focused toast"]},{title:"Visual Indicators",description:"Color is not the only indicator of toast type - icons are also used for accessibility."}]}),e.jsx(n,{title:"API Reference",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4",children:[e.jsx("h3",{className:"font-medium mb-2",children:"WexToaster Props"}),e.jsx("ul",{className:"text-sm text-muted-foreground list-disc list-inside space-y-1",children:e.jsxs("li",{children:[e.jsx("code",{className:"bg-muted px-1 rounded",children:"position"}),': "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"']})})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4",children:[e.jsx("h3",{className:"font-medium mb-2",children:"wexToast Methods"}),e.jsxs("ul",{className:"text-sm text-muted-foreground list-disc list-inside space-y-1",children:[e.jsxs("li",{children:[e.jsx("code",{className:"bg-muted px-1 rounded",children:"wexToast(message, options?)"})," - Default toast"]}),e.jsxs("li",{children:[e.jsx("code",{className:"bg-muted px-1 rounded",children:"wexToast.success(message, options?)"})," - Success variant"]}),e.jsxs("li",{children:[e.jsx("code",{className:"bg-muted px-1 rounded",children:"wexToast.error(message, options?)"})," - Error variant"]}),e.jsxs("li",{children:[e.jsx("code",{className:"bg-muted px-1 rounded",children:"wexToast.warning(message, options?)"})," - Warning variant"]}),e.jsxs("li",{children:[e.jsx("code",{className:"bg-muted px-1 rounded",children:"wexToast.info(message, options?)"})," - Info variant"]}),e.jsxs("li",{children:[e.jsx("code",{className:"bg-muted px-1 rounded",children:"wexToast.loading(message, options?)"})," - Loading state"]}),e.jsxs("li",{children:[e.jsx("code",{className:"bg-muted px-1 rounded",children:"wexToast.promise(promise, options)"})," - Async operation"]})]})]})]})}),e.jsxs(n,{title:"API Reference",children:[e.jsxs("p",{className:"text-sm text-muted-foreground mb-4",children:["Use the ",e.jsx("code",{className:"text-sm",children:"wexToast"})," function: ",e.jsx("code",{className:"text-sm",children:'wexToast("Message")'})," or ",e.jsx("code",{className:"text-sm",children:'wexToast.success("Message")'})]}),e.jsx(h,{props:j})]}),e.jsx(g,{tokens:f,className:"mt-12"})]})}export{B as default};
