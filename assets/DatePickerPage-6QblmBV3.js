import{r as n,j as e,c7 as t}from"./index-DF0XF146.js";import{C as p}from"./ComponentPage-CE4x5Eih.js";import{S as a}from"./Section-BiwCOvu3.js";import{E as r,P as m,T as h}from"./PropsTable-BFooEr_X.js";import{C as g}from"./CodeBlock-CeEALK7P.js";import{G as k}from"./ProseBlock-BJMvFE-n.js";import"./circle-question-mark-BcclZdqn.js";import"./triangle-alert-hoXkJLJW.js";import"./sun-BVWsv1P4.js";import"./contrast-1QdVzTcJ.js";import"./eye-CScQVlSC.js";import"./flask-conical-B11ut2xk.js";import"./palette-kspEeazo.js";import"./prism-css-D_z0K3cN.js";import"./copy-aWXWDUBH.js";const u=[{name:"date",type:"Date | undefined",description:"Controlled selected date"},{name:"onDateChange",type:"(date: Date | undefined) => void",description:"Callback when date changes"},{name:"placeholder",type:"string",default:'"Pick a date"',description:"Placeholder text when no date selected"},{name:"fromDate",type:"Date",description:"Minimum selectable date"},{name:"toDate",type:"Date",description:"Maximum selectable date"},{name:"disabled",type:"boolean",default:"false",description:"Disables the date picker"},{name:"className",type:"string",description:"Additional CSS classes"}],D=[{element:"Trigger",property:"Border",token:"--input"},{element:"Trigger",property:"Background",token:"--background"},{element:"Trigger (hover)",property:"Background",token:"--accent"},{element:"Trigger (focus)",property:"Ring",token:"--ring"},{element:"Popover",property:"Background",token:"--popover"},{element:"Popover",property:"Border",token:"--border"},{element:"Calendar",property:"Background",token:"--background"},{element:"Day (selected)",property:"Background",token:"--primary"},{element:"Day (selected)",property:"Text",token:"--primary-foreground"},{element:"Day (today)",property:"Background",token:"--accent"}];function R(){const[i,o]=n.useState(new Date),[s,d]=n.useState(),[c,l]=n.useState();return e.jsxs(p,{title:"Date Picker",description:"Date selection input combining Calendar with Popover for picking dates.",status:"stable",registryKey:"date-picker",children:[e.jsxs(a,{title:"Overview",children:[e.jsx(r,{children:e.jsx(t,{date:i,onDateChange:o,placeholder:"Pick a date"})}),e.jsx(k,{children:"Date Picker provides a convenient way to select dates. It combines the Calendar component with a Popover trigger, allowing users to pick dates from a calendar interface or enter them manually (with WithInput variant)."})]}),e.jsx(a,{title:"Variants",description:"Different date picker configurations.",children:e.jsxs("div",{className:"space-y-8",children:[e.jsx(r,{title:"Basic",description:"Simple date picker with button trigger.",children:e.jsx(t,{date:s,onDateChange:d,placeholder:"Pick a date"})}),e.jsx(r,{title:"With Input Field",description:"Date picker with input field for manual entry.",children:e.jsx(t.WithInput,{date:c,onDateChange:l,placeholder:"Enter or pick a date"})}),e.jsx(r,{title:"With Date Range",description:"Date picker with min/max date constraints.",children:e.jsx(t,{date:i,onDateChange:o,placeholder:"Pick a date",fromDate:new Date(2020,0,1),toDate:new Date(2030,11,31)})}),e.jsx(r,{title:"Disabled",description:"Date picker in disabled state.",children:e.jsx(t,{date:new Date,disabled:!0,placeholder:"Pick a date"})})]})}),e.jsxs(a,{title:"Accessibility",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4",children:[e.jsx("h3",{className:"font-medium mb-2",children:"Keyboard Navigation"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Date Picker supports full keyboard navigation. Use Arrow keys to navigate the calendar, Enter to select a date, Escape to close, and Tab to navigate between elements."})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4 mt-4",children:[e.jsx("h3",{className:"font-medium mb-2",children:"Screen Reader Support"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"The calendar uses proper ARIA labels and roles. Selected dates are announced, and navigation between months is accessible."})]})]}),e.jsx(a,{title:"Usage",children:e.jsx(g,{code:`import { WexDatePicker } from "@/components/wex";

const [date, setDate] = React.useState<Date | undefined>();

// Basic date picker
<WexDatePicker
  date={date}
  onDateChange={setDate}
  placeholder="Pick a date"
/>

// With input field
<WexDatePicker.WithInput
  date={date}
  onDateChange={setDate}
  placeholder="Enter or pick a date"
/>

// With date range constraints
<WexDatePicker
  date={date}
  onDateChange={setDate}
  placeholder="Pick a date"
  fromDate={new Date(2020, 0, 1)}
  toDate={new Date(2030, 11, 31)}
/>`,language:"tsx"})}),e.jsx(a,{title:"API Reference",children:e.jsx(m,{props:u})}),e.jsx(h,{tokens:D,className:"mt-12"})]})}export{R as default};
