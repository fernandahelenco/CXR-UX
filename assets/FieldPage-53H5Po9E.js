import{j as e,bF as i,I as r}from"./index-DHqvZd8T.js";import{C as s}from"./ComponentPage-ClfxT8Kn.js";import{S as t}from"./Section-B02Ntc2Q.js";import{E as l,P as a,S as o,T as d}from"./PropsTable-DUlbEnJK.js";import{C as n}from"./CodeBlock-DXqL_qSy.js";import"./circle-question-mark-Ch0d6anM.js";import"./triangle-alert-DgndxeYq.js";import"./sun-BZ4cQaFO.js";import"./contrast-1QdVzTcJ.js";import"./eye-CPFCPVC6.js";import"./flask-conical-DOKijKJ8.js";import"./palette-D8crG8w7.js";import"./prism-css-pq4xnKqV.js";import"./copy-BdbFTSKf.js";const c=[{name:"orientation",type:'"vertical" | "horizontal"',default:'"vertical"',description:"Layout orientation of label and input"},{name:"data-invalid",type:'"true" | undefined',description:"Marks the field as invalid for error styling"},{name:"className",type:"string",description:"Additional CSS classes"},{name:"children",type:"ReactNode",required:!0,description:"Field content (Label, Input, Description, Error)"}],m=[{name:"htmlFor",type:"string",required:!0,description:"ID of the associated input element"},{name:"children",type:"ReactNode",required:!0,description:"Label text"}],p=[{element:"Label",property:"Text",token:"--foreground"},{element:"Description",property:"Text",token:"--muted-foreground"},{element:"Error",property:"Text",token:"--destructive"},{element:"Required (*)",property:"Color",token:"--destructive"}];function w(){return e.jsxs(s,{title:"Field",description:"Form field container with label, description, and error handling.",status:"stable",registryKey:"field",children:[e.jsx(t,{title:"Overview",children:e.jsx(l,{children:e.jsxs(i,{className:"max-w-sm",children:[e.jsx(i.Label,{htmlFor:"email-field",children:"Email"}),e.jsx(r,{id:"email-field",type:"email",placeholder:"you@example.com"}),e.jsx(i.Description,{children:"We'll never share your email."})]})})}),e.jsx(t,{title:"Variants",description:"Different field configurations.",children:e.jsxs("div",{className:"space-y-6 max-w-sm",children:[e.jsx(l,{title:"With Error",description:"Field with validation error.",children:e.jsxs(i,{"data-invalid":"true",children:[e.jsx(i.Label,{htmlFor:"error-field",children:"Username"}),e.jsx(r,{id:"error-field","aria-invalid":"true",defaultValue:"ab"}),e.jsx(i.Error,{children:"Username must be at least 3 characters."})]})}),e.jsx(l,{title:"Horizontal Layout",description:"Label and input side by side.",children:e.jsxs(i,{orientation:"horizontal",children:[e.jsx(i.Label,{htmlFor:"horizontal-field",children:"Name"}),e.jsx(r,{id:"horizontal-field",placeholder:"John Doe"})]})}),e.jsx(l,{title:"Field Group",description:"Group of related fields.",children:e.jsxs(i.Group,{children:[e.jsxs(i,{children:[e.jsx(i.Label,{htmlFor:"first-name",children:"First Name"}),e.jsx(r,{id:"first-name"})]}),e.jsxs(i,{children:[e.jsx(i.Label,{htmlFor:"last-name",children:"Last Name"}),e.jsx(r,{id:"last-name"})]})]})}),e.jsx(l,{title:"Fieldset with Legend",description:"Grouped fields with a title.",children:e.jsxs(i.Set,{children:[e.jsx(i.Legend,{children:"Contact Information"}),e.jsxs(i,{children:[e.jsx(i.Label,{htmlFor:"contact-email",children:"Email"}),e.jsx(r,{id:"contact-email",type:"email"})]}),e.jsxs(i,{children:[e.jsx(i.Label,{htmlFor:"contact-phone",children:"Phone"}),e.jsx(r,{id:"contact-phone",type:"tel"})]})]})})]})}),e.jsx(t,{title:"Accessibility",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4",children:[e.jsx("h3",{className:"font-medium mb-2",children:"Label Association"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Always use WexField.Label with the htmlFor prop to associate labels with their inputs for screen reader accessibility."})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-4",children:[e.jsx("h3",{className:"font-medium mb-2",children:"Error Announcements"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:'WexField.Error uses role="alert" to announce validation errors to screen readers when they appear.'})]})]})}),e.jsx(t,{title:"Usage",children:e.jsx(n,{code:`import { WexField, WexInput } from "@/components/wex";

// Basic field
<WexField>
  <WexField.Label htmlFor="email">Email</WexField.Label>
  <WexInput id="email" type="email" />
  <WexField.Description>We'll never share your email.</WexField.Description>
</WexField>

// Field with error
<WexField data-invalid="true">
  <WexField.Label htmlFor="username">Username</WexField.Label>
  <WexInput id="username" aria-invalid="true" />
  <WexField.Error>Username is required.</WexField.Error>
</WexField>

// Field group
<WexField.Group>
  <WexField>
    <WexField.Label htmlFor="first">First Name</WexField.Label>
    <WexInput id="first" />
  </WexField>
  <WexField>
    <WexField.Label htmlFor="last">Last Name</WexField.Label>
    <WexInput id="last" />
  </WexField>
</WexField.Group>`})}),e.jsxs(t,{title:"API Reference",children:[e.jsx(a,{props:c,title:"WexField"}),e.jsx(o,{name:"WexField.Label",props:m})]}),e.jsx(d,{tokens:p,className:"mt-12"})]})}export{w as default};
