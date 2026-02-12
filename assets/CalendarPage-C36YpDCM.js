import{r as i,bp as c,j as e}from"./index-BOCzOiCa.js";import{C as u}from"./ComponentPage-Bmag_T2k.js";import{S as n}from"./Section-B6IIjY1w.js";import{E as t,P as x,T as g}from"./PropsTable-8PW4pmst.js";import{C as h}from"./CodeBlock-DItF1vK0.js";import{W as s}from"./wex-calendar-CEGRYpyH.js";import"./circle-question-mark-CC1kHS63.js";import"./triangle-alert-8HQe2d-i.js";import"./sun-MPk2ZJru.js";import"./contrast-1QdVzTcJ.js";import"./eye-D64M99TB.js";import"./flask-conical-Bwc0XbjW.js";import"./palette-xQwd5Lkl.js";import"./prism-css-DGVY_akA.js";import"./copy-TMadlRXl.js";const f=[{name:"mode",type:'"single" | "multiple" | "range"',default:'"single"',description:"Selection mode"},{name:"selected",type:"Date | Date[] | DateRange",description:"Controlled selected date(s)"},{name:"onSelect",type:"(date) => void",description:"Callback when selection changes"},{name:"defaultMonth",type:"Date",description:"Month to display initially"},{name:"numberOfMonths",type:"number",default:"1",description:"Number of months to display"},{name:"disabled",type:"Matcher | Matcher[]",description:"Dates to disable (function or date range)"},{name:"footer",type:"ReactNode",description:"Content to display below the calendar"},{name:"className",type:"string",description:"Additional CSS classes"}],j=[{element:"Container",property:"Background",token:"--background"},{element:"Day",property:"Text",token:"--foreground"},{element:"Day (hover)",property:"Background",token:"--accent"},{element:"Day (selected)",property:"Background",token:"--primary"},{element:"Day (selected)",property:"Text",token:"--primary-foreground"},{element:"Day (outside)",property:"Text",token:"--muted-foreground"},{element:"Day (disabled)",property:"Opacity",token:"50%"},{element:"Navigation",property:"Color",token:"--muted-foreground"}];function E(){const[a,r]=i.useState(new Date),[l,m]=i.useState([new Date,c(new Date,2)]),[d,p]=i.useState({from:new Date,to:c(new Date,7)});return e.jsxs(u,{title:"Calendar",description:"A date picker component with single, multiple, and range selection modes.",status:"stable",registryKey:"calendar",children:[e.jsx(n,{title:"Overview",children:e.jsx(t,{children:e.jsx(s,{mode:"single",selected:a,onSelect:r,className:"rounded-md border"})})}),e.jsx(n,{title:"Selection Modes",description:"Calendar supports different selection modes.",children:e.jsxs("div",{className:"space-y-6",children:[e.jsx(t,{title:"Single Date",description:"Select a single date.",children:e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{mode:"single",selected:a,onSelect:r,className:"rounded-md border"}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Selected: ",a?.toLocaleDateString()||"None"]})]})}),e.jsx(t,{title:"Multiple Dates",description:"Select multiple individual dates.",children:e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{mode:"multiple",selected:l,onSelect:m,className:"rounded-md border"}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Selected: ",l?.length||0," date(s)"]})]})}),e.jsx(t,{title:"Date Range",description:"Select a range of dates.",children:e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{mode:"range",selected:d,onSelect:p,numberOfMonths:2,className:"rounded-md border"}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Range: ",d?.from?.toLocaleDateString()||"Start"," - ",d?.to?.toLocaleDateString()||"End"]})]})})]})}),e.jsx(n,{title:"Variants",description:"Different calendar configurations.",children:e.jsxs("div",{className:"space-y-6",children:[e.jsx(t,{title:"With Default Month",description:"Start on a specific month.",children:e.jsx(s,{mode:"single",defaultMonth:new Date(2024,0),className:"rounded-md border"})}),e.jsxs(t,{title:"Disabled Dates",description:"Prevent selection of certain dates.",children:[e.jsx(s,{mode:"single",disabled:o=>o<new Date||o.getDay()===0||o.getDay()===6,className:"rounded-md border"}),e.jsx("p",{className:"text-sm text-muted-foreground mt-2",children:"Past dates and weekends are disabled."})]}),e.jsx(t,{title:"Two Months",description:"Display multiple months.",children:e.jsx(s,{mode:"single",numberOfMonths:2,className:"rounded-md border"})}),e.jsx(t,{title:"With Footer",description:"Add context below the calendar.",children:e.jsx(s,{mode:"single",selected:a,onSelect:r,className:"rounded-md border",footer:e.jsx("p",{className:"text-sm text-muted-foreground pt-3 border-t mt-3",children:a?`Selected: ${a.toDateString()}`:"Pick a date"})})})]})}),e.jsx(n,{title:"Accessibility",children:e.jsxs("div",{className:"space-y-4 text-foreground",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4",children:[e.jsx("h3",{className:"font-medium mb-2",children:"Keyboard Navigation"}),e.jsxs("ul",{className:"text-sm text-muted-foreground list-disc list-inside space-y-1",children:[e.jsx("li",{children:"Arrow keys: Navigate between dates"}),e.jsx("li",{children:"Enter/Space: Select the focused date"}),e.jsx("li",{children:"Page Up: Previous month"}),e.jsx("li",{children:"Page Down: Next month"}),e.jsx("li",{children:"Shift + Page Up: Previous year"}),e.jsx("li",{children:"Shift + Page Down: Next year"}),e.jsx("li",{children:"Home: First day of month"}),e.jsx("li",{children:"End: Last day of month"})]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4",children:[e.jsx("h3",{className:"font-medium mb-2",children:"Screen Reader Support"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Calendar uses ARIA labels and live regions to announce date changes and selection status to screen reader users."})]})]})}),e.jsx(n,{title:"Usage",children:e.jsx(h,{code:`import { WexCalendar } from "@/components/wex";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

// Single date selection
const [date, setDate] = useState<Date | undefined>(new Date());
<WexCalendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>

// Multiple dates selection
const [dates, setDates] = useState<Date[] | undefined>([]);
<WexCalendar
  mode="multiple"
  selected={dates}
  onSelect={setDates}
/>

// Date range selection
const [range, setRange] = useState<DateRange | undefined>();
<WexCalendar
  mode="range"
  selected={range}
  onSelect={setRange}
  numberOfMonths={2}
/>

// With disabled dates
<WexCalendar
  mode="single"
  disabled={(date) => date < new Date()}
/>`})}),e.jsx(n,{title:"API Reference",children:e.jsx(x,{props:f})}),e.jsx(g,{tokens:j,className:"mt-12"})]})}export{E as default};
