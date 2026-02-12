import{j as e,bH as t,S as o}from"./index-BOCzOiCa.js";import{C as i}from"./ComponentPage-Bmag_T2k.js";import{S as n}from"./Section-B6IIjY1w.js";import{E as r,P as s,S as p,T as a}from"./PropsTable-8PW4pmst.js";import{C as d}from"./CodeBlock-DItF1vK0.js";import{M as l}from"./mail-BKyKj2EG.js";import{E as u}from"./eye-D64M99TB.js";import"./circle-question-mark-CC1kHS63.js";import"./triangle-alert-8HQe2d-i.js";import"./sun-MPk2ZJru.js";import"./contrast-1QdVzTcJ.js";import"./flask-conical-Bwc0XbjW.js";import"./palette-xQwd5Lkl.js";import"./prism-css-DGVY_akA.js";import"./copy-TMadlRXl.js";const c=[{name:"className",type:"string",description:"Additional CSS classes for the container"},{name:"children",type:"ReactNode",required:!0,description:"Addon and Input elements"}],x=[{name:"align",type:'"inline-start" | "inline-end"',default:'"inline-start"',description:"Position of the addon"},{name:"children",type:"ReactNode",required:!0,description:"Icon, text, or button content"}],h=[{element:"Input",property:"Background",token:"--background"},{element:"Input",property:"Border",token:"--input"},{element:"Addon",property:"Background",token:"--muted"},{element:"Addon",property:"Text",token:"--muted-foreground"},{element:"Button",property:"",token:"Uses WexButton tokens"}];function P(){return e.jsxs(i,{title:"Input Group",description:"Input with addons, buttons, and text decorations.",status:"stable",registryKey:"input-group",children:[e.jsx(n,{title:"Overview",children:e.jsx(r,{children:e.jsxs(t,{className:"max-w-sm",children:[e.jsx(t.Addon,{children:e.jsx(o,{className:"h-4 w-4","aria-hidden":"true"})}),e.jsx(t.Input,{placeholder:"Search...","aria-label":"Search"})]})})}),e.jsx(n,{title:"Variants",description:"Different input group configurations.",children:e.jsxs("div",{className:"space-y-6 max-w-sm",children:[e.jsx(r,{title:"With Icon Start",description:"Icon before the input.",children:e.jsxs(t,{children:[e.jsx(t.Addon,{align:"inline-start",children:e.jsx(l,{className:"h-4 w-4","aria-hidden":"true"})}),e.jsx(t.Input,{placeholder:"Email address","aria-label":"Email address"})]})}),e.jsx(r,{title:"With Icon End",description:"Icon after the input.",children:e.jsxs(t,{children:[e.jsx(t.Input,{type:"password",placeholder:"Password","aria-label":"Password"}),e.jsx(t.Addon,{align:"inline-end",children:e.jsx(t.Button,{"aria-label":"Toggle password visibility",children:e.jsx(u,{className:"h-4 w-4","aria-hidden":"true"})})})]})}),e.jsx(r,{title:"With Text",description:"Text prefix or suffix.",children:e.jsxs(t,{children:[e.jsx(t.Addon,{children:e.jsx(t.Text,{children:"https://"})}),e.jsx(t.Input,{placeholder:"example.com","aria-label":"Website URL"})]})}),e.jsx(r,{title:"With Button",description:"Action button in the input.",children:e.jsxs(t,{children:[e.jsx(t.Input,{placeholder:"Search...","aria-label":"Search query"}),e.jsx(t.Addon,{align:"inline-end",children:e.jsx(t.Button,{children:"Search"})})]})})]})}),e.jsx(n,{title:"Accessibility",children:e.jsx("div",{className:"rounded-lg border border-border bg-card p-4",children:e.jsx("p",{className:"text-sm text-muted-foreground",children:'Use role="group" to indicate related elements. Ensure icons have aria-hidden="true" if they are decorative, or provide accessible labels for icon buttons.'})})}),e.jsx(n,{title:"Usage",children:e.jsx(d,{code:`import { WexInputGroup } from "@/components/wex";
import { Search, Mail } from "lucide-react";

// With icon
<WexInputGroup>
  <WexInputGroup.Addon>
    <Search className="h-4 w-4" />
  </WexInputGroup.Addon>
  <WexInputGroup.Input placeholder="Search..." />
</WexInputGroup>

// With text
<WexInputGroup>
  <WexInputGroup.Addon>
    <WexInputGroup.Text>https://</WexInputGroup.Text>
  </WexInputGroup.Addon>
  <WexInputGroup.Input placeholder="example.com" />
</WexInputGroup>

// With button
<WexInputGroup>
  <WexInputGroup.Input placeholder="Search..." />
  <WexInputGroup.Addon align="inline-end">
    <WexInputGroup.Button>Go</WexInputGroup.Button>
  </WexInputGroup.Addon>
</WexInputGroup>`})}),e.jsxs(n,{title:"API Reference",children:[e.jsx(s,{props:c,title:"WexInputGroup"}),e.jsx(p,{name:"WexInputGroup.Addon",props:x})]}),e.jsx(a,{tokens:h,className:"mt-12"})]})}export{P as default};
