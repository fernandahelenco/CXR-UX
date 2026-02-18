import{j as t,bp as o,W as e}from"./index-CQs5K25y.js";import{C as i}from"./ComponentPage-D45JhYcb.js";import{S as n}from"./Section-CRDm-i2q.js";import{E as r,P as a,T as s}from"./PropsTable-LIaxCA32.js";import{C as l}from"./CodeBlock-BqnAyGed.js";import"./circle-question-mark-MHNgY4sG.js";import"./triangle-alert-CwoLCa0o.js";import"./sun-xoYNVU34.js";import"./contrast-1QdVzTcJ.js";import"./eye-BCqIZnYh.js";import"./flask-conical-D5_M8rzu.js";import"./palette-C2ln8ptZ.js";import"./prism-css-C4fqG-wf.js";import"./copy-Ci3Zb5HA.js";const u=[{name:"orientation",type:'"horizontal" | "vertical"',default:'"horizontal"',description:"Layout direction"},{name:"attached",type:"boolean",default:"false",description:"Remove gaps between buttons"},{name:"className",type:"string",description:"Additional CSS classes"}],p=[{element:"Container",property:"Gap",token:"(flex container)"},{element:"Separator",property:"Color",token:"--border"},{element:"Note",property:"",token:"Individual buttons use WexButton tokens"}];function C(){return t.jsxs(i,{title:"Button Group",description:"Container for grouping related buttons together.",status:"stable",registryKey:"button-group",children:[t.jsx(n,{title:"Overview",children:t.jsx(r,{children:t.jsxs(o,{children:[t.jsx(e,{variant:"outline",children:"Left"}),t.jsx(e,{variant:"outline",children:"Center"}),t.jsx(e,{variant:"outline",children:"Right"})]})})}),t.jsx(n,{title:"Variants",description:"Different orientations for button groups.",children:t.jsxs("div",{className:"space-y-6",children:[t.jsx(r,{title:"Horizontal",description:"Default horizontal layout.",children:t.jsxs(o,{orientation:"horizontal",children:[t.jsx(e,{variant:"outline",children:"One"}),t.jsx(e,{variant:"outline",children:"Two"}),t.jsx(e,{variant:"outline",children:"Three"})]})}),t.jsx(r,{title:"Vertical",description:"Stacked vertical layout.",children:t.jsxs(o,{orientation:"vertical",children:[t.jsx(e,{variant:"outline",children:"First"}),t.jsx(e,{variant:"outline",children:"Second"}),t.jsx(e,{variant:"outline",children:"Third"})]})}),t.jsx(r,{title:"With Separator",description:"Visual separator between buttons.",children:t.jsxs(o,{children:[t.jsx(e,{variant:"outline",children:"Edit"}),t.jsx(o.Separator,{}),t.jsx(e,{variant:"outline",children:"Delete"})]})})]})}),t.jsx(n,{title:"Accessibility",children:t.jsxs("div",{className:"rounded-lg border border-border bg-card p-4",children:[t.jsx("h3",{className:"font-medium mb-2",children:"Role Group"}),t.jsx("p",{className:"text-sm text-muted-foreground",children:'WexButtonGroup uses role="group" to indicate related buttons to screen readers. Each button remains individually focusable.'})]})}),t.jsx(n,{title:"Usage",children:t.jsx(l,{code:`import { WexButtonGroup, WexButton } from "@/components/wex";

// Horizontal group
<WexButtonGroup>
  <WexButton variant="outline">Left</WexButton>
  <WexButton variant="outline">Center</WexButton>
  <WexButton variant="outline">Right</WexButton>
</WexButtonGroup>

// Vertical group
<WexButtonGroup orientation="vertical">
  <WexButton variant="outline">First</WexButton>
  <WexButton variant="outline">Second</WexButton>
</WexButtonGroup>

// With separator
<WexButtonGroup>
  <WexButton variant="outline">Edit</WexButton>
  <WexButtonGroup.Separator />
  <WexButton variant="outline">Delete</WexButton>
</WexButtonGroup>`})}),t.jsx(n,{title:"API Reference",children:t.jsx(a,{props:u})}),t.jsx(s,{tokens:p,className:"mt-12"})]})}export{C as default};
