import{r as x,j as e,i as N,k as G,l as xe,m as fe,n as M,o as D,W as q,C as ge,p as I,a as B,I as K,q as pe,g as Y}from"./index-KN_40-XI.js";import{R as _,P as Z,N as ee,g as be,u as ne,T as ve,A as je,F as te,S as W,a as J,b as P,C as se,p as oe,f as le,c as we}from"./tokenRegistry-EvHRCSey.js";import{W as F}from"./wex-separator-BbDz37h8.js";import{C as Ne,g as ye,a as ce}from"./contrast-1QdVzTcJ.js";import{S as ie,T as de,a as Ce,R as ke}from"./type-Bi2yfX4Z.js";import{C as Se}from"./credit-card-Cy6e3akZ.js";import{C as Te}from"./circle-alert-3ZWRYpuB.js";import{S as ue,M as me}from"./sun-Df2HB9eo.js";import{P as z}from"./palette-BJuYCmte.js";import{D as he}from"./download-Be6O3d1Z.js";import{C as Ee}from"./circle-check-Cq4VdFGr.js";import{T as Ve}from"./triangle-alert-HYFsMCem.js";import{P as L}from"./prism-css-C5FvKf5k.js";import{C as Re}from"./copy-BJjHABng.js";function $e(a,r){const m=ce.AA_NORMAL-r;return a.foreground.includes("foreground")?m>2?`Significantly low contrast (${r.toFixed(1)}:1). Try a much darker background shade or lighter text.`:m>1?"Moderate contrast issue. Try adjusting the background 2-3 shades darker.":"Nearly passing. Adjust the background 1 shade darker or lighter text.":`Current ratio is ${r.toFixed(2)}:1. WCAG AA requires 4.5:1 minimum.`}function Oe(){const[a,r]=x.useState([]),m=x.useCallback(()=>{const o=[];for(const l of Ne){const p=ye(l.foreground,l.background);if(p){const w=p.rating!=="Fail";o.push({pair:l,ratio:p.ratio,rating:p.rating,passes:w,suggestion:w?void 0:$e(l,p.ratio)})}}r(o)},[]);x.useEffect(()=>{if(typeof window>"u")return;m();const o=new MutationObserver(()=>{requestAnimationFrame(m)});return o.observe(document.documentElement,{attributes:!0,attributeFilter:["style","class"]}),o.observe(document.body,{attributes:!0,attributeFilter:["class"]}),()=>{o.disconnect()}},[m]);const d=x.useMemo(()=>a.filter(o=>!o.passes).map(o=>({pair:o.pair,ratio:o.ratio,required:ce.AA_NORMAL,rating:o.rating})),[a]),t=a.filter(o=>o.passes).length,i=a.filter(o=>!o.passes).length,h=a.length,g=i===0&&h>0,n=x.useCallback(o=>a.some(l=>!l.passes&&l.pair.previewCard===o),[a]),f=x.useCallback(o=>a.filter(l=>l.pair.previewCard===o),[a]);return{results:a,issues:d,passCount:t,failCount:i,totalCount:h,isCompliant:g,hasIssuesForCard:n,getIssuesForCard:f}}const Ae=[{id:"button",label:"Button",icon:ie,description:"Buttons with variants (primary, secondary, destructive)"},{id:"card",label:"Card",icon:Se,description:"Card containers with borders and backgrounds"},{id:"input",label:"Input",icon:de,description:"Text input fields and form controls"},{id:"badge",label:"Badge",icon:Ce,description:"Status badges with intent colors"},{id:"alert",label:"Alert",icon:Te,description:"Alert messages with variants"}];function Ie({selectedComponent:a,onSelectComponent:r,className:m}){return e.jsxs("div",{className:N("space-y-2",m),children:[e.jsx("div",{className:"text-xs font-medium text-muted-foreground uppercase tracking-wider px-1 mb-2",children:"Components"}),e.jsx("div",{className:"grid grid-cols-1 gap-1.5",children:Ae.map(d=>{const t=d.icon,i=a===d.id;return e.jsxs("button",{type:"button",onClick:()=>r(d.id),className:N("flex items-center gap-3 px-3 py-2.5 rounded-md border transition-all text-left","hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",i?"border-primary bg-primary/5 ring-1 ring-primary/20":"border-border bg-background"),children:[e.jsx("div",{className:N("w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0",i?"bg-primary/10 text-primary":"bg-muted text-muted-foreground"),children:e.jsx(t,{className:"w-4 h-4"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("div",{className:N("text-sm font-medium","text-foreground"),children:d.label}),e.jsx("div",{className:"text-xs text-muted-foreground truncate",children:d.description})]})]},d.id)})})]})}const Le=[{id:"color-ramps",label:"Color Ramps",icon:z,defaultOpen:!0},{id:"radius-presets",label:"Radius Presets",icon:ie,defaultOpen:!0},{id:"typography",label:"Typography",icon:de,defaultOpen:!1}];function Pe({selectedComponent:a,onSelectComponent:r,selectedFoundation:m,onSelectFoundation:d,onExport:t,onReset:i,hasUnsavedChanges:h=!1,hasOverrides:g=!1}){const{exitThemeBuilder:n,editMode:f,setEditMode:o}=G(),[l,p]=x.useState({"color-ramps":!0,"radius-presets":!0,typography:!1}),w=j=>{p(y=>({...y,[j]:!y[j]}))},C=x.useCallback(()=>{n()},[n]);return e.jsxs("div",{className:"h-full flex flex-col bg-muted/30 border-r border-border",children:[e.jsx("div",{className:"p-4 border-b border-border",children:e.jsx("div",{className:"text-sm font-semibold",children:"Theme Builder"})}),e.jsxs("div",{className:"p-3 border-b border-border",children:[e.jsx("div",{className:"text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2",children:"Editing Mode"}),e.jsxs("div",{className:"flex gap-1 bg-muted rounded-lg p-1",children:[e.jsxs("button",{onClick:()=>o("light"),className:N("flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all",f==="light"?"bg-background shadow-sm text-foreground":"text-muted-foreground hover:text-foreground"),children:[e.jsx(ue,{className:"h-3.5 w-3.5"}),"Light"]}),e.jsxs("button",{onClick:()=>o("dark"),className:N("flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all",f==="dark"?"bg-background shadow-sm text-foreground":"text-muted-foreground hover:text-foreground"),children:[e.jsx(me,{className:"h-3.5 w-3.5"}),"Dark"]})]})]}),e.jsxs("div",{className:"flex-1 overflow-y-auto",children:[e.jsx("div",{className:"p-3 border-b border-border",children:e.jsx(Ie,{selectedComponent:a,onSelectComponent:r})}),e.jsx(F,{}),e.jsxs("div",{className:"p-3",children:[e.jsx("div",{className:"text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3",children:"Foundation"}),e.jsx("div",{className:"space-y-1",children:Le.map(j=>{const y=j.icon,E=m===j.id,s=l[j.id]??j.defaultOpen??!1;return e.jsx("div",{children:e.jsxs("button",{type:"button",onClick:()=>{w(j.id),d(j.id)},className:N("w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-all","hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",E&&"bg-primary/5 text-foreground"),children:[e.jsx(xe,{className:N("h-3.5 w-3.5 transition-transform text-muted-foreground",s&&"rotate-90")}),e.jsx(y,{className:"h-4 w-4 text-muted-foreground"}),e.jsx("span",{className:N("flex-1 text-left",E?"font-medium":"font-normal"),children:j.label})]})},j.id)})})]})]}),e.jsxs("div",{className:"p-3 border-t border-border space-y-1",children:[e.jsx(De,{}),e.jsx(F,{className:"my-2"}),e.jsx(X,{onClick:i,icon:e.jsx(ke,{className:"h-4 w-4"}),label:"Reset All",disabled:!g}),e.jsx(X,{onClick:t,icon:e.jsx(he,{className:"h-4 w-4"}),label:"Export Theme"}),e.jsx(F,{className:"my-2"}),e.jsx(X,{onClick:C,icon:e.jsx(fe,{className:"h-4 w-4"}),label:"Exit Theme Builder",badge:h?"●":void 0})]})]})}function De(){const{results:a,passCount:r,failCount:m,totalCount:d,isCompliant:t}=Oe(),{editMode:i}=G();if(d===0)return null;const h=i==="light"?ue:me;return e.jsxs(M,{children:[e.jsx(M.Trigger,{asChild:!0,children:e.jsxs("button",{className:N("w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",t?"text-success hover:bg-success/10":"text-destructive hover:bg-destructive/10"),children:[e.jsx(h,{className:"h-3.5 w-3.5 text-muted-foreground"}),t?e.jsx(Ee,{className:"h-4 w-4"}):e.jsx(Ve,{className:"h-4 w-4"}),e.jsx("span",{className:"flex-1 text-left",children:t?"Contrast: OK":`Contrast: ${m} Issue${m!==1?"s":""}`}),e.jsxs("span",{className:"text-xs text-muted-foreground",children:[r,"/",d]})]})}),e.jsxs(M.Content,{side:"right",align:"end",className:"w-80 p-0 max-h-96 overflow-y-auto",children:[e.jsxs("div",{className:"p-3 border-b border-border sticky top-0 bg-popover",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm font-semibold",children:[e.jsx(h,{className:"h-4 w-4 text-muted-foreground"}),t?"All Contrast Checks Passing":"Contrast Issues Detected"]}),e.jsxs("div",{className:"text-xs text-muted-foreground mt-1",children:["WCAG AA requires 4.5:1 for normal text (",i," mode)"]})]}),e.jsx("div",{className:"p-3 space-y-2",children:a.map((g,n)=>e.jsxs("div",{className:N("p-2 rounded border text-xs",g.passes?"bg-success/5 border-success/20":"bg-destructive/5 border-destructive/20"),children:[e.jsxs("div",{className:"flex items-center justify-between mb-1",children:[e.jsx("span",{className:"font-medium",children:g.pair.name}),e.jsxs("span",{className:N("px-1.5 py-0.5 rounded text-[10px] font-medium",g.passes?"bg-success/20 text-success":"bg-destructive/20 text-destructive"),children:[g.ratio.toFixed(1),":1"]})]}),e.jsx("div",{className:"text-muted-foreground text-[10px]",children:g.pair.component}),!g.passes&&g.suggestion&&e.jsx("p",{className:"text-muted-foreground text-[10px] mt-1 pt-1 border-t border-border/50",children:g.suggestion})]},n))})]})]})}function X({onClick:a,icon:r,label:m,disabled:d,badge:t}){return e.jsxs("button",{onClick:a,disabled:d,className:N("w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",d?"text-muted-foreground/50 cursor-not-allowed":"text-muted-foreground hover:text-foreground hover:bg-muted/50"),children:[r,e.jsx("span",{children:m}),t&&e.jsx("span",{className:"ml-auto text-warning text-xs",children:t})]})}const Ue=_.map(a=>({token:a.name,label:a.label.replace("Radius ",""),value:a.lightValue}));function Me({value:a,onChange:r,presets:m=Ue,label:d,className:t}){const[i,h]=x.useState({});x.useEffect(()=>{if(typeof window>"u")return;const n=()=>{const l={};m.forEach(p=>{const w=getComputedStyle(document.documentElement).getPropertyValue(p.token).trim();w?l[p.token]=w:l[p.token]=p.value}),h(l)};n();const f=new MutationObserver(()=>{n()});f.observe(document.documentElement,{attributes:!0,attributeFilter:["style","class"]});const o=setInterval(n,200);return()=>{f.disconnect(),clearInterval(o)}},[m]);const g=m.map(n=>({...n,value:i[n.token]||n.value}));return e.jsxs("div",{className:N("space-y-2",t),children:[d&&e.jsx("div",{className:"text-sm font-medium text-foreground",children:d}),e.jsx("div",{className:"flex gap-2",children:g.map(n=>{const f=a===n.token;return e.jsxs("button",{type:"button",onClick:()=>r(n.token),className:N("flex-1 flex items-center gap-3 px-3 py-2 rounded-md border transition-all","hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",f?"border-primary bg-primary/5 ring-1 ring-primary/20":"border-border bg-background"),children:[e.jsx("div",{className:"w-16 h-12 rounded border border-border/50 flex items-center justify-center relative",style:{borderRadius:n.value,backgroundColor:"hsl(var(--wex-palette-slate-700))"},title:`Preview: ${n.value}`,children:e.jsx("span",{className:"text-xs text-white font-mono",children:n.value})}),e.jsx("span",{className:N("text-sm font-medium",f?"text-foreground font-semibold":"text-muted-foreground"),children:n.label})]},n.token)})})]})}function Fe(a){const r=a.match(/^(\w+)-(\d+)$/);return r?{name:r[1],shade:parseInt(r[2],10)}:null}function re({value:a,onSelect:r,children:m,className:d}){const[t,i]=x.useState(!1),h=Fe(a),g=x.useCallback((o,l)=>{r(`${o}-${l}`),i(!1)},[r]),n=x.useCallback(o=>{r(o),i(!1)},[r]),f=e.jsxs("div",{className:"space-y-3",children:[e.jsx("div",{className:"text-sm font-medium text-foreground",children:"Select Palette Shade"}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("div",{className:"text-xs text-muted-foreground font-medium",children:"Neutrals"}),e.jsx("div",{className:"flex gap-1",children:ee.map(o=>{const l=a===o.name;return e.jsx("button",{type:"button",onClick:()=>n(o.name),title:o.label,className:N("w-6 h-6 rounded-sm transition-all border","hover:scale-110 hover:z-10 hover:ring-2 hover:ring-foreground/20","focus:outline-none focus:ring-2 focus:ring-primary",l&&"ring-2 ring-primary ring-offset-1",o.name==="white"&&"border-border"),style:{backgroundColor:`hsl(${o.value})`},children:e.jsx("span",{className:"sr-only",children:o.label})},o.name)})})]}),Z.map(o=>e.jsxs("div",{className:"space-y-1",children:[e.jsx("div",{className:"text-xs text-muted-foreground font-medium",children:o.label}),e.jsx("div",{className:"flex gap-1",children:o.shades.map(l=>{const p=h?.name===o.name&&h?.shade===l.shade;return e.jsx("button",{type:"button",onClick:()=>g(o.name,l.shade),title:`${o.label} ${l.shade}`,className:N("w-6 h-6 rounded-sm transition-all","hover:scale-110 hover:z-10 hover:ring-2 hover:ring-foreground/20","focus:outline-none focus:ring-2 focus:ring-primary",p&&"ring-2 ring-primary ring-offset-1"),style:{backgroundColor:`hsl(var(${l.token}))`},children:e.jsxs("span",{className:"sr-only",children:[o.label," ",l.shade]})},l.shade)})}),e.jsx("div",{className:"flex gap-1",children:o.shades.map(l=>e.jsx("div",{className:"w-6 text-center text-[8px] text-muted-foreground",children:l.shade},l.shade))})]},o.name))]});return m?e.jsxs(M,{open:t,onOpenChange:i,children:[e.jsx(M.Trigger,{asChild:!0,children:e.jsx("div",{className:d,children:m})}),e.jsx(M.Content,{className:"w-80 p-3",align:"start",sideOffset:8,children:f})]}):e.jsx("div",{className:"p-3",children:f})}function Be({value:a,size:r="md",className:m}){const d={sm:"w-4 h-4",md:"w-6 h-6",lg:"w-8 h-8"},[t,i]=x.useState(null),h=`--wex-palette-${a}`;x.useEffect(()=>{if(typeof window>"u")return;const n=()=>{const l=getComputedStyle(document.documentElement).getPropertyValue(h).trim();i(l||null)};n();const f=new MutationObserver(()=>{n()});f.observe(document.documentElement,{attributes:!0,attributeFilter:["style","class"]});const o=setInterval(n,200);return()=>{f.disconnect(),clearInterval(o)}},[h,a]);const g=t?`hsl(${t})`:`hsl(var(${h}))`;return e.jsx(D.Provider,{children:e.jsxs(D,{children:[e.jsx(D.Trigger,{asChild:!0,children:e.jsx("div",{className:N(d[r],"rounded-full border-2 border-border flex-shrink-0 cursor-help",m),style:{backgroundColor:g,minWidth:r==="sm"?"16px":r==="md"?"24px":"32px",minHeight:r==="sm"?"16px":r==="md"?"24px":"32px"}})}),e.jsx(D.Content,{children:e.jsx("p",{className:"text-xs font-mono",children:a})})]})})}function We({tokenName:a,size:r="md"}){const[m,d]=x.useState(null),t={sm:"w-4 h-4",md:"w-6 h-6",lg:"w-8 h-8"};x.useEffect(()=>{if(typeof window>"u")return;const h=()=>{const f=getComputedStyle(document.documentElement).getPropertyValue(a).trim();d(f||null)};h();const g=new MutationObserver(()=>{h()});g.observe(document.documentElement,{attributes:!0,attributeFilter:["style","class"]});const n=setInterval(h,200);return()=>{g.disconnect(),clearInterval(n)}},[a]);const i=m?`hsl(${m})`:`hsl(var(${a}))`;return e.jsx(D.Provider,{children:e.jsxs(D,{children:[e.jsx(D.Trigger,{asChild:!0,children:e.jsx("div",{className:N(t[r],"rounded-full border-2 border-border flex-shrink-0 cursor-help"),style:{backgroundColor:i,minWidth:r==="sm"?"16px":r==="md"?"24px":"32px",minHeight:r==="sm"?"16px":r==="md"?"24px":"32px"}})}),e.jsx(D.Content,{children:e.jsx("p",{className:"text-xs font-mono",children:a})})]})})}function He(a){return{button:"button",card:"card",input:"input",badge:"badge",alert:"alert"}[a]}function Q(a){const r=a.match(/^--wex-component-\w+-(primary|secondary|destructive|success|info|warning|default|neutral|outline|ghost|link)-/);return r&&r[1]?r[1]==="neutral"?"default":r[1]:null}function Ge(a){const r=new Map;return a.forEach(m=>{const d=Q(m.name);r.has(d)||r.set(d,[]),r.get(d).push(m)}),r}function ae(a,r,m){if(a.type==="size"&&a.name.includes("radius")){if(r[a.name]){const t=r[a.name].trim(),i=t.match(/var\((--wex-radius-\w+)\)/);return i&&i[1]?i[1]:(t.startsWith("--wex-radius-"),t)}if(a.references){const t=m==="light"?a.references:a.darkReferences||a.references;if(t&&t.startsWith("--wex-radius-"))return t}const d=m==="light"?a.lightValue:a.darkValue||a.lightValue;if(d&&d.trim().startsWith("var(")){const t=d.trim().match(/var\((--wex-radius-\w+)\)/);if(t&&t[1])return t[1]}return d}if(r[a.name]){const d=r[a.name].trim(),t=d.match(/var\(--wex-palette-(\w+)-(\d+)\)/);if(t)return`${t[1]}-${t[2]}`;const i=d.match(/var\(--wex-palette-(white|black)\)/);return i?i[1]:(/^\w+-\d+$/.test(d)||d==="white"||d==="black",d)}if(a.references){const d=m==="light"?a.references:a.darkReferences||a.references;if(d){const t=d.match(/--wex-palette-(\w+)-(\d+)/);if(t)return`${t[1]}-${t[2]}`;const i=d.match(/--wex-palette-(white|black)/);if(i)return i[1]}}return a.lightValue}function _e({component:a,overrides:r,onTokenChange:m,onVariantChange:d,className:t}){const[i,h]=x.useState(null),{editMode:g}=G();x.useEffect(()=>{d?.(i)},[i,d]);const n=He(a),o=be(n).filter(c=>{const v=c.type==="color"||c.type==="size"&&c.name.includes("radius"),b=c.name.includes("focus-ring");return v&&!b}),l=Ge(o),p=Array.from(l.keys()).filter(c=>c!==null);x.useEffect(()=>{p.length>0&&i===null&&h(p[0])},[p.length,i]);const w=x.useMemo(()=>{if(p.length===0)return o;if(i===null)return[];const c=(l.get(i)||[]).filter(b=>Q(b.name)===i),v=o.filter(b=>Q(b.name)===null);return[...c,...v]},[o,i,p.length,l]),C=w.filter(c=>c.type==="color"),j=w.filter(c=>c.type==="size"&&c.name.includes("radius")),y=x.useMemo(()=>{const c=v=>{const b=v.toLowerCase();return b.includes("title")&&(b.includes("fg")||b.includes("text"))||b.includes("header")&&(b.includes("fg")||b.includes("text"))?1:(b.includes("fg")||b.includes("text"))&&!b.includes("title")&&!b.includes("header")?2:b.includes("bg")?3:b.includes("border")?4:5};return[...C].sort((v,b)=>{const T=c(v.name),k=c(b.name);return T!==k?T-k:v.label.localeCompare(b.label)})},[C]),E={button:"Button",card:"Card",input:"Input",badge:"Badge",alert:"Alert"},s=x.useCallback((c,v)=>{m(c,`var(${v})`)},[m]),u=x.useCallback((c,v)=>{const b=`--wex-palette-${v}`;m(c,`var(${b})`)},[m]);return e.jsxs("div",{className:N("space-y-6",t),children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold",children:E[a]}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Edit component-specific tokens. Changes apply to all instances of this component."})]}),p.length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"text-sm font-medium text-foreground",children:"Variant"}),e.jsx("div",{className:"flex gap-2 flex-wrap",children:p.map(c=>{const v=c.charAt(0).toUpperCase()+c.slice(1);return e.jsx("button",{type:"button",onClick:()=>h(c),className:N("px-3 py-1.5 rounded-md text-sm font-medium transition-all","border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",i===c?"border-primary bg-primary/5 text-foreground":"border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50"),children:v},c)})})]}),e.jsx(F,{}),y.length>0&&e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"text-sm font-medium text-foreground",children:"Colors"}),e.jsx("div",{className:"space-y-3",children:y.map(c=>{const v=ae(c,r,g),b=/^\w+-\d+$/.test(v)||v==="white"||v==="black";return e.jsxs("div",{className:"flex items-center justify-between gap-4 p-3 rounded-md border border-border bg-card",children:[e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("div",{className:"text-sm font-medium",children:c.label}),c.description&&e.jsx("div",{className:"text-xs text-muted-foreground mt-0.5",children:c.description})]}),e.jsx("div",{className:"flex items-center gap-2",children:b?e.jsxs(e.Fragment,{children:[e.jsx(Be,{value:v,size:"sm"}),e.jsx(re,{value:v,onSelect:T=>u(c.name,T),children:e.jsx("button",{type:"button",className:"p-1.5 rounded-md border border-border bg-background hover:bg-muted/50 transition-colors",title:"Change color",children:e.jsx(z,{className:"h-4 w-4"})})})]}):e.jsxs(e.Fragment,{children:[e.jsx(We,{tokenName:c.name,size:"sm"}),e.jsx(re,{value:"blue-500",onSelect:T=>u(c.name,T),children:e.jsx("button",{type:"button",className:"p-1.5 rounded-md border border-border bg-background hover:bg-muted/50 transition-colors",title:"Change to palette color",children:e.jsx(z,{className:"h-4 w-4"})})})]})})]},c.name)})})]}),j.length>0&&e.jsx("div",{className:"space-y-4",children:j.map(c=>{const v=ae(c,r,g);return e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"text-sm font-medium text-foreground",children:c.label}),c.description&&e.jsx("div",{className:"text-xs text-muted-foreground",children:c.description}),e.jsx(Me,{value:v,onChange:b=>s(c.name,b)})]},c.name)})}),w.length===0&&e.jsx("div",{className:"text-center py-8 text-muted-foreground",children:e.jsx("p",{className:"text-sm",children:"No editable tokens found for this component."})})]})}function Ke(a){const r=a.match(/^(\d+(?:\.\d+)?)/);return r?parseFloat(r[1]):0}function Ye({values:a,onChange:r,className:m}){const d=x.useCallback((t,i)=>{const h=Math.max(0,i);r(t,`${h}px`)},[r]);return e.jsxs("div",{className:N("space-y-4",m),children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-semibold text-foreground",children:"Radius Presets"}),e.jsx("p",{className:"text-xs text-muted-foreground mt-1",children:"Edit the base radius values. These cascade to all components that reference them."})]}),e.jsx(F,{}),e.jsx("div",{className:"space-y-4",children:_.map(t=>{const i=a[t.name]||t.lightValue,h=Ke(i);return e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-sm font-medium",children:t.label}),t.description&&e.jsx("div",{className:"text-xs text-muted-foreground mt-0.5",children:t.description})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"number",min:"0",step:"1",value:h,onChange:g=>{const n=parseFloat(g.target.value)||0;d(t.name,n)},className:N("w-20 px-2 py-1.5 rounded-md border border-border bg-background","text-sm font-mono text-right","focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2")}),e.jsx("span",{className:"text-sm text-muted-foreground",children:"px"})]})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-16 h-16 rounded border-2 border-border bg-muted/50 flex items-center justify-center",style:{borderRadius:i},children:e.jsx("div",{className:"text-xs text-muted-foreground",children:"Preview"})}),e.jsx("div",{className:"text-xs text-muted-foreground",children:e.jsx("code",{className:"font-mono",children:i})})]})]},t.name)})})]})}const H={50:97,100:93,200:85,300:72,400:56,500:45,600:38,700:32,800:26,900:20};function Xe(a){const r=(s,u,c)=>a[c][s]||u,m=(s,u,c,v)=>{const b={},T=`--wex-palette-${s}-500`,k=a[v][T];let $=u,A=c,U=H[500];if(k){const O=oe(k);O&&($=O.h,A=O.s,U=O.l)}return[50,100,200,300,400,500,600,700,800,900].forEach(O=>{const S=`--wex-palette-${s}-${O}`;if(a[v][S])b[S]=a[v][S];else{const R=O===500?U:H[O];b[S]=le({h:$,s:A,l:R})}}),b},d=s=>m("purple",270,60,s);let t=`/* ============================================================
`;t+=`   WEX TOKEN EMISSION LAYER
`,t+=`   ============================================================
`,t+=`   This file contains ALL WEX design tokens as CSS variables.
`,t+=`   
`,t+=`   FUTURE: This file will become a Style Dictionary generated output.
`,t+=`   When that happens, this header will change to:
`,t+=`   AUTO-GENERATED by Style Dictionary - DO NOT EDIT
`,t+=`   ============================================================ */

`,t+=`:root {
`,t+=`  /* ===== TYPOGRAPHY (2 tokens) ===== */
`,ve.forEach(s=>{const u=r(s.name,s.lightValue,"light");t+=`  ${s.name}: ${u};
`}),t+=`
`,t+=`  /* ===== ACCESSIBILITY (3 tokens) ===== */
`,je.forEach(s=>{const u=r(s.name,s.lightValue,"light");t+=`  ${s.name}: ${u};
`}),te.filter(s=>s.name.includes("width")||s.name.includes("offset")).forEach(s=>{const u=r(s.name,s.lightValue,"light");t+=`  ${s.name}: ${u};
`}),t+=`
`,t+=`  /* ===== SURFACES (3 tokens) - Now reference palette ===== */
`,W.forEach(s=>{const u=r(s.name,s.lightValue,"light");t+=`  ${s.name}: ${u};
`}),t+=`
`,t+=`  /* ===== TEXT (2 tokens) - Now reference palette ===== */
`,J.forEach(s=>{const u=r(s.name,s.lightValue,"light");t+=`  ${s.name}: ${u};
`}),t+=`
`;const i=P.find(s=>s.name==="--wex-brand-red");if(i){t+=`  /* ===== BRAND (1 token) ===== */
`;const s=r(i.name,i.lightValue,"light");t+=`  ${i.name}: ${s}; /* #c8102e - Official WEX Logo Red */
`,t+=`
`}t+=`  /* ===== PRIMARY (4 tokens) ===== */
`;const h=P.filter(s=>s.name.includes("primary"));h.forEach(s=>{const u=r(s.name,s.lightValue,"light");t+=`  ${s.name}: ${u};
`}),t+=`
`,t+=`  /* ===== LINK (3 tokens) - For text links on page backgrounds ===== */
`;const g=P.filter(s=>s.name.includes("link"));g.forEach(s=>{const u=r(s.name,s.lightValue,"light");t+=`  ${s.name}: ${u};
`}),t+=`
`,t+=`  /* ===== INPUT (1 token) - Now references palette ===== */
`;const n=W.find(s=>s.name==="--wex-input-border");if(n){const s=r(n.name,n.lightValue,"light");t+=`  ${n.name}: ${s};
`}t+=`
`,t+=`  /* ===== FOCUS RING (1 token) ===== */
`;const f=te.find(s=>s.name==="--wex-focus-ring-color");if(f){const s=r(f.name,f.lightValue,"light");t+=`  ${f.name}: ${s};
`}t+=`
`,t+=`  /* ===== DESTRUCTIVE (3 tokens) ===== */
`;const o=P.filter(s=>s.name.includes("destructive"));o.forEach(s=>{const u=r(s.name,s.lightValue,"light");t+=`  ${s.name}: ${u};
`}),t+=`
`,t+=`  /* ===== SUCCESS (3 tokens) ===== */
`;const l=P.filter(s=>s.name.includes("success"));l.forEach(s=>{const u=r(s.name,s.lightValue,"light"),c=s.name==="--wex-success"?" /* Darker for WCAG 4.5:1 text contrast */":"";t+=`  ${s.name}: ${u};${c}
`}),t+=`
`,t+=`  /* ===== WARNING (3 tokens) ===== */
`;const p=P.filter(s=>s.name.includes("warning"));p.forEach(s=>{const u=r(s.name,s.lightValue,"light");t+=`  ${s.name}: ${u};
`}),t+=`
`,t+=`  /* ===== INFO (3 tokens) ===== */
`;const w=P.filter(s=>s.name.includes("info"));w.forEach(s=>{const u=r(s.name,s.lightValue,"light"),c=s.name==="--wex-info"?" /* Darker for WCAG 4.5:1 text contrast */":"";t+=`  ${s.name}: ${u};${c}
`}),t+=`
`,t+=`  /* ===== HIGHLIGHT (4 tokens) =====
`,t+=`     NOTE: *_alpha tokens are reserved for future utilities.
`,t+=`     They must NOT be used via arbitrary color values or Tailwind utilities.
`,t+=`     See WEX_COMPONENT_RULES.md Section 1.2 for rationale.
`,t+=`     ===== */
`;const C=["--wex-highlight-bg","--wex-highlight-bg-alpha","--wex-highlight-fg","--wex-highlight-fg-alpha"],j=["198 87% 97%","1","208 100% 32%","1"];if(C.forEach((s,u)=>{const c=r(s,j[u],"light");t+=`  ${s}: ${c};
`}),t+=`
`,t+=`  /* ===== RADII (3 tokens) ===== */
`,_.forEach(s=>{const u=r(s.name,s.lightValue,"light");t+=`  ${s.name}: ${u};
`}),t+=`
`,t+=`  /* ===== PALETTE RAMPS (50-900 scales) =====
`,t+=`     These are for subtle UI variations and should NOT be used
`,t+=`     directly in components unless explicitly approved.
`,t+=`     Use semantic tokens instead.
`,t+=`     ===== */

`,["blue","green","amber","red","slate","cyan","purple"].forEach(s=>{if(s==="purple"){const u=d("light");t+=`  /* Purple ramp (derived from help) */
`,[50,100,200,300,400,500,600,700,800,900].forEach(c=>{const v=`--wex-palette-purple-${c}`;t+=`  ${v}: ${u[v]};
`})}else{const u=Z.find(c=>c.name===s);if(u){const c=m(u.name,u.hue,u.saturation,"light"),v=u.label;t+=`  /* ${v} ramp${s==="blue"?" (derived from primary)":s==="green"?" (derived from success)":s==="amber"?" (derived from warning)":s==="red"?" (derived from danger)":s==="slate"?" (neutral, derived from text/surfaces)":s==="cyan"?" (derived from info)":""} */
`,[50,100,200,300,400,500,600,700,800,900].forEach(T=>{const k=`--wex-palette-${s}-${T}`;t+=`  ${k}: ${c[k]};
`})}}t+=`
`}),t+=`  /* Neutral extremes (for backgrounds and text) */
`,ee.forEach(s=>{const u=r(s.token,s.value,"light");t+=`  ${s.token}: ${u};
`}),t+=`
`,t+=`  /* ===== CHART (5 tokens) =====
`,t+=`     DESIGN GAP: These are placeholder values.
`,t+=`     Brand team must define official chart colors.
`,t+=`     Currently using primary and derived values as temporary placeholders.
`,t+=`     ===== */
`,se.forEach(s=>{const u=r(s.name,s.lightValue,"light");t+=`  ${s.name}: ${u};
`}),t+=`}

`,t+=`.dark {
`,t+=`  /* ===== SURFACES (dark overrides) ===== */
`,W.forEach(s=>{const u=s.darkValue||s.lightValue,c=r(s.name,u,"dark");t+=`  ${s.name}: ${c};
`}),t+=`
`,t+=`  /* ===== TEXT (dark overrides) ===== */
`,J.forEach(s=>{const u=s.darkValue||s.lightValue,c=r(s.name,u,"dark");t+=`  ${s.name}: ${c};
`}),t+=`
`,t+=`  /* ===== PRIMARY (dark overrides) ===== */
`,t+=`  /* Note: These values are used by button backgrounds - keep dark for white text contrast */
`,h.forEach(s=>{const u=s.darkValue||s.lightValue,c=r(s.name,u,"dark");t+=`  ${s.name}: ${c};
`}),t+=`
`,t+=`  /* ===== LINK (dark overrides) - Brighter for text visibility ===== */
`,g.forEach(s=>{const u=s.darkValue||s.lightValue,c=r(s.name,u,"dark");t+=`  ${s.name}: ${c};
`}),t+=`
`,t+=`  /* ===== INPUT (dark override) ===== */
`,n){const s=n.darkValue||n.lightValue,u=r(n.name,s,"dark");t+=`  ${n.name}: ${u};
`}if(t+=`
`,t+=`  /* ===== FOCUS RING (dark override) ===== */
`,f){const s=f.darkValue||f.lightValue,u=r(f.name,s,"dark");t+=`  ${f.name}: ${u};
`}t+=`
`,t+=`  /* ===== DESTRUCTIVE (dark overrides) ===== */
`,o.forEach(s=>{const u=s.darkValue||s.lightValue,c=r(s.name,u,"dark");t+=`  ${s.name}: ${c};
`}),t+=`
`,t+=`  /* ===== SUCCESS (dark overrides) ===== */
`,t+=`  /* Note: These values are used by button backgrounds - keep dark for white text contrast */
`,l.forEach(s=>{const u=s.darkValue||s.lightValue,c=r(s.name,u,"dark");t+=`  ${s.name}: ${c};
`}),t+=`
`,t+=`  /* ===== WARNING (dark overrides) ===== */
`,t+=`  /* Note: Dark mode uses amber-400 (slightly lighter) for better contrast */
`,p.forEach(s=>{const u=s.darkValue||s.lightValue,c=r(s.name,u,"dark");t+=`  ${s.name}: ${c};
`}),t+=`
`,t+=`  /* ===== INFO (dark overrides) ===== */
`,t+=`  /* Note: These values are used by button backgrounds - keep dark for white text contrast */
`,w.forEach(s=>{const u=s.darkValue||s.lightValue,c=r(s.name,u,"dark");t+=`  ${s.name}: ${c};
`}),t+=`
`,t+=`  /* ===== HIGHLIGHT (dark overrides) ===== */
`;const E=["201 74% 62%","0.16","0 0% 100%","0.87"];return C.forEach((s,u)=>{const c=r(s,E[u],"dark");t+=`  ${s}: ${c};
`}),t+=`
`,t+=`  /* ===== CHART (dark overrides) ===== */
`,se.forEach(s=>{const u=s.darkValue||s.lightValue,c=r(s.name,u,"dark");t+=`  ${s.name}: ${c};
`}),t+=`}
`,t}function qe(){return`/* ============================================================
   SHADCN SEMANTIC BRIDGE
   ============================================================
   This file maps WEX tokens to shadcn semantic variables.
   
   This file is HAND-AUTHORED (semantic decisions require intent).
   It will NOT become a Style Dictionary output.
   
   RULES:
   - All values MUST reference --wex-* variables
   - NO raw HSL values allowed
   - State variants (hover, active) are included for Tailwind utilities
   ============================================================ */

:root {
  /* ===== BACKGROUNDS ===== */
  --background: var(--wex-content-bg);
  --foreground: var(--wex-text);

  /* ===== CARD ===== */
  --card: var(--wex-content-bg);
  --card-foreground: var(--wex-text);

  /* ===== POPOVER ===== */
  --popover: var(--wex-content-bg);
  --popover-foreground: var(--wex-text);

  /* ===== BRAND ===== */
  --brand-red: var(--wex-brand-red);

  /* ===== PRIMARY (with state) ===== */
  --primary: var(--wex-primary);
  --primary-foreground: var(--wex-primary-contrast);
  --primary-hover: var(--wex-primary-hover);

  /* ===== LINK (for text links) ===== */
  --link: var(--wex-link);
  --link-hover: var(--wex-link-hover);
  --link-active: var(--wex-link-active);

  /* ===== SECONDARY (with state) ===== */
  --secondary: var(--wex-content-border);
  --secondary-foreground: var(--wex-text);
  --secondary-hover: var(--wex-surface-subtle);

  /* ===== MUTED ===== */
  --muted: var(--wex-surface-subtle);
  --muted-foreground: var(--wex-text-muted);

  /* ===== ACCENT (subtle interactive hover surface) ===== */
  --accent: var(--wex-surface-subtle);
  --accent-foreground: var(--wex-text);

  /* ===== DESTRUCTIVE (with state) ===== */
  --destructive: var(--wex-destructive);
  --destructive-foreground: var(--wex-destructive-foreground);
  --destructive-hover: var(--wex-destructive-hover);

  /* ===== SUCCESS (with state) ===== */
  --success: var(--wex-success);
  --success-foreground: var(--wex-success-foreground);
  --success-hover: var(--wex-success-hover);

  /* ===== WARNING (with state) ===== */
  --warning: var(--wex-warning);
  --warning-foreground: var(--wex-warning-foreground);
  --warning-hover: var(--wex-warning-hover);

  /* ===== INFO (with state) ===== */
  --info: var(--wex-info);
  --info-foreground: var(--wex-info-foreground);
  --info-hover: var(--wex-info-hover);

  /* ===== BORDERS & INPUTS ===== */
  --border: var(--wex-content-border);
  --input: var(--wex-input-border);
  --ring: var(--wex-focus-ring-color);

  /* ===== RADII ===== */
  --radius: var(--wex-radius-md);

  /* ===== SIDEBAR (maps to existing surface tokens) ===== */
  --sidebar-background: var(--wex-content-bg);
  --sidebar-foreground: var(--wex-text);
  --sidebar-primary: var(--wex-primary);
  --sidebar-primary-foreground: var(--wex-primary-contrast);
  --sidebar-accent: var(--wex-surface-subtle);
  --sidebar-accent-foreground: var(--wex-text);
  --sidebar-border: var(--wex-content-border);
  --sidebar-ring: var(--wex-focus-ring-color);

  /* ===== CHART (placeholder - requires brand guidance) ===== */
  --chart-1: var(--wex-chart-1);
  --chart-2: var(--wex-chart-2);
  --chart-3: var(--wex-chart-3);
  --chart-4: var(--wex-chart-4);
  --chart-5: var(--wex-chart-5);
}

.dark {
  /* ===== SECONDARY (dark mode hover adjustment) ===== */
  --secondary-hover: var(--wex-content-border);
}
`}function Je(a){const r=new Set;if(Object.keys(a.light).forEach(i=>{i.startsWith("--wex-component-")&&r.add(i)}),Object.keys(a.dark).forEach(i=>{i.startsWith("--wex-component-")&&r.add(i)}),r.size===0)return`/* ============================================================
   WEX COMPONENT SLOT TOKENS (LAYER 3) - NO CHANGES
   ============================================================
   No component tokens were modified in this theme.
   ============================================================ */
`;const m=new Map;r.forEach(i=>{const h=i.match(/^--wex-component-(\w+)-/);if(h){const g=h[1];m.has(g)||m.set(g,[]);const n=a.light[i]||a.dark[i]||"";m.get(g).push({token:i,value:n})}});let d=`/* ============================================================
   WEX COMPONENT SLOT TOKENS (LAYER 3) - CHANGED TOKENS ONLY
   ============================================================
   This file contains only the component tokens that were modified.
   Add these to your wex.components-bridge.css file.
   ============================================================ */

:root {
`;m.forEach((i,h)=>{d+=`  /* ===== ${h.toUpperCase()} ===== */
`,i.forEach(({token:g,value:n})=>{d+=`  ${g}: ${n};
`}),d+=`
`}),d+=`}

/* ============================================================
   DARK MODE OVERRIDES (if any)
   ============================================================ */

@media (prefers-color-scheme: dark) {
  :root {
`;let t=!1;return r.forEach(i=>{a.dark[i]&&a.dark[i]!==a.light[i]&&(t=!0,d+=`    ${i}: ${a.dark[i]};
`)}),t||(d+=`    /* No dark mode overrides for component tokens */
`),d+=`  }
}
`,d}function ze(a){const r={wex:{}},m=(h,g,n)=>a[n][h]||g,d=(h,g,n,f)=>{const o={},l=`--wex-palette-${h}-500`,p=a[f][l];let w=g,C=n,j=H[500];if(p){const y=oe(p);y&&(w=y.h,C=y.s,j=y.l)}return[50,100,200,300,400,500,600,700,800,900].forEach(y=>{const E=`--wex-palette-${h}-${y}`;if(a[f][E])o[E]=a[f][E];else{const s=y===500?j:H[y];o[E]=le({h:w,s:C,l:s})}}),o},t=(h,g,n)=>{const f=g.split(".");let o=h;for(let l=0;l<f.length-1;l++){const p=f[l];(!(p in o)||typeof o[p]!="object"||o[p]===null)&&(o[p]={}),o=o[p]}o[f[f.length-1]]=n},i=(h,g="")=>{Z.forEach(n=>{const f=d(n.name,n.hue,n.saturation,h);Object.entries(f).forEach(([o,l])=>{const p=o.replace("--wex-","").replace(/-/g,".");t(r.wex,p+g,{value:l,type:"color"})})}),ee.forEach(n=>{const f=m(n.token,n.value,h),o=n.token.replace("--wex-","").replace(/-/g,".");t(r.wex,o+g,{value:f,type:"color"})}),P.forEach(n=>{const f=h==="dark"&&n.darkValue||n.lightValue,o=m(n.name,f,h),l=n.name.replace("--wex-","").replace(/-/g,".");t(r.wex,l+g,{value:o,type:"color"})}),W.forEach(n=>{const f=h==="dark"&&n.darkValue||n.lightValue,o=m(n.name,f,h),l=n.name.replace("--wex-","").replace(/-/g,".");t(r.wex,l+g,{value:o,type:"color"})}),J.forEach(n=>{const f=h==="dark"&&n.darkValue||n.lightValue,o=m(n.name,f,h),l=n.name.replace("--wex-","").replace(/-/g,".");t(r.wex,l+g,{value:o,type:"color"})}),we.forEach(n=>{if(n.type==="color"){const f=h==="dark"&&n.darkValue||n.lightValue,o=m(n.name,f,h),l=n.name.replace("--wex-","").replace(/-/g,".");t(r.wex,l+g,{value:o,type:"color"})}})};return i("light"),i("dark",".dark"),JSON.stringify(r,null,2)}function Qe(a){const{getAllOverrides:r}=ne(),m=r(),[d,t]=x.useState(!1),[i,h]=x.useState(!1),[g,n]=x.useState(!1),[f,o]=x.useState(!1),[l,p]=x.useState("tokens"),w=x.useMemo(()=>Xe(m),[m]),C=x.useMemo(()=>qe(),[]),j=x.useMemo(()=>Je(m),[m]),y=x.useMemo(()=>ze(m),[m]),E=x.useMemo(()=>{try{return L.highlight(w,L.languages.css,"css")}catch{return w}},[w]),s=x.useMemo(()=>{try{return L.highlight(C,L.languages.css,"css")}catch{return C}},[C]),u=x.useMemo(()=>{try{return L.highlight(j,L.languages.css,"css")}catch{return j}},[j]),c=x.useMemo(()=>{try{return L.highlight(y,L.languages.json,"json")}catch{return y}},[y]),v=x.useCallback(async()=>{try{await navigator.clipboard.writeText(w),t(!0),setTimeout(()=>t(!1),2e3)}catch(S){console.error("Failed to copy CSS:",S)}},[w]),b=x.useCallback(async()=>{try{await navigator.clipboard.writeText(C),h(!0),setTimeout(()=>h(!1),2e3)}catch(S){console.error("Failed to copy shadcn bridge:",S)}},[C]),T=x.useCallback(async()=>{try{await navigator.clipboard.writeText(j),n(!0),setTimeout(()=>n(!1),2e3)}catch(S){console.error("Failed to copy components bridge:",S)}},[j]),k=x.useCallback(async()=>{try{await navigator.clipboard.writeText(y),o(!0),setTimeout(()=>o(!1),2e3)}catch(S){console.error("Failed to copy JSON:",S)}},[y]),$=x.useCallback(()=>{const S=new Blob([w],{type:"text/css"}),R=URL.createObjectURL(S),V=document.createElement("a");V.href=R,V.download="tokens.css",V.click(),URL.revokeObjectURL(R)},[w]),A=x.useCallback(()=>{const S=new Blob([C],{type:"text/css"}),R=URL.createObjectURL(S),V=document.createElement("a");V.href=R,V.download="shadcn-bridge.css",V.click(),URL.revokeObjectURL(R)},[C]),U=x.useCallback(()=>{const S=new Blob([j],{type:"text/css"}),R=URL.createObjectURL(S),V=document.createElement("a");V.href=R,V.download="components-bridge.css",V.click(),URL.revokeObjectURL(R)},[j]),O=x.useCallback(()=>{const S=new Blob([y],{type:"application/json"}),R=URL.createObjectURL(S),V=document.createElement("a");V.href=R,V.download="wex-tokens.json",V.click(),URL.revokeObjectURL(R)},[y]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        /* Light mode colors - subtle, readable colors */
        .language-css .token.selector,
        .language-css .token.property,
        .language-css .token.function {
          color: #0066cc;
        }
        .language-css .token.string {
          color: #008000;
        }
        .language-css .token.punctuation {
          color: #666666;
        }
        .language-css .token.attr-name {
          color: #d97706;
        }
        .language-json .token.property {
          color: #0066cc;
        }
        .language-json .token.string {
          color: #008000;
        }
        .language-json .token.number {
          color: #dc2626;
        }
        .language-json .token.boolean {
          color: #0066cc;
        }
        .language-json .token.punctuation {
          color: #666666;
        }
        
        /* Dark mode colors - brighter, more vibrant */
        .dark .language-css .token.selector,
        .dark .language-css .token.property,
        .dark .language-css .token.function {
          color: #c792ea;
        }
        .dark .language-css .token.string {
          color: #c3e88d;
        }
        .dark .language-css .token.punctuation {
          color: #89ddff;
        }
        .dark .language-css .token.attr-name {
          color: #ffcb6b;
        }
        .dark .language-json .token.property {
          color: #c792ea;
        }
        .dark .language-json .token.string {
          color: #c3e88d;
        }
        .dark .language-json .token.number {
          color: #f78c6c;
        }
        .dark .language-json .token.boolean {
          color: #c792ea;
        }
        .dark .language-json .token.punctuation {
          color: #89ddff;
        }
      `}),e.jsxs("div",{className:"h-full flex flex-col",children:[e.jsx("div",{className:"border-b border-border bg-muted/30",children:e.jsxs("div",{className:"flex items-center gap-1 px-4",children:[e.jsx("button",{onClick:()=>p("tokens"),className:N("px-3 py-2 text-xs font-medium border-b-2 transition-colors",l==="tokens"?"border-primary text-foreground":"border-transparent text-muted-foreground hover:text-foreground"),children:"tokens.css"}),e.jsx("button",{onClick:()=>p("shadcn"),className:N("px-3 py-2 text-xs font-medium border-b-2 transition-colors",l==="shadcn"?"border-primary text-foreground":"border-transparent text-muted-foreground hover:text-foreground"),children:"shadcn-bridge.css"}),e.jsx("button",{onClick:()=>p("components"),className:N("px-3 py-2 text-xs font-medium border-b-2 transition-colors",l==="components"?"border-primary text-foreground":"border-transparent text-muted-foreground hover:text-foreground"),children:"components-bridge.css"}),e.jsx("button",{onClick:()=>p("json"),className:N("px-3 py-2 text-xs font-medium border-b-2 transition-colors",l==="json"?"border-primary text-foreground":"border-transparent text-muted-foreground hover:text-foreground"),children:"tokens.json"})]})}),e.jsx("div",{className:"flex-1 overflow-y-auto px-6 py-6",children:e.jsx("div",{className:"max-w-7xl mx-auto",children:e.jsxs("div",{className:"rounded-lg border border-border bg-card overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"text-xs font-medium",children:[l==="tokens"&&"tokens.css",l==="shadcn"&&"shadcn-bridge.css",l==="components"&&"components-bridge.css",l==="json"&&"tokens.json"]}),e.jsxs("span",{className:"text-[10px] text-muted-foreground",children:["(",l==="tokens"&&w.split(`
`).length,l==="shadcn"&&C.split(`
`).length,l==="components"&&j.split(`
`).length,l==="json"&&y.split(`
`).length," lines)"]})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(q,{variant:"ghost",size:"sm",onClick:l==="tokens"?v:l==="shadcn"?b:l==="components"?T:k,className:"h-7 px-2",children:l==="tokens"&&d||l==="shadcn"&&i||l==="components"&&g||l==="json"&&f?e.jsx(ge,{className:"h-3 w-3 text-success"}):e.jsx(Re,{className:"h-3 w-3"})}),e.jsx(q,{variant:"ghost",size:"sm",onClick:l==="tokens"?$:l==="shadcn"?A:l==="components"?U:O,className:"h-7 px-2",children:e.jsx(he,{className:"h-3 w-3"})})]})]}),e.jsx("div",{className:"p-4 overflow-x-auto overflow-y-auto max-h-[500px] bg-muted/50 dark:bg-slate-950",children:e.jsx("pre",{className:"text-xs font-mono !m-0 !bg-transparent text-foreground dark:text-slate-100",children:e.jsx("code",{className:N(l==="json"?"language-json":"language-css","!text-sm !leading-relaxed"),dangerouslySetInnerHTML:{__html:l==="tokens"?E:l==="shadcn"?s:l==="components"?u:c}})})})]})})})]})]})}function xt(){const{editMode:a}=G(),{resetAll:r,hasOverrides:m,setToken:d,getAllOverrides:t,overrides:i}=ne(),[h,g]=x.useState(null),[n,f]=x.useState(null),[o,l]=x.useState(null),[p,w]=x.useState(!1),[C,j]=x.useState(!1),y=x.useMemo(()=>({...i.light,...i.dark}),[i]),E=x.useMemo(()=>{const k=t(),$={};return _.forEach(A=>{const U=k.light[A.name]||A.lightValue;$[A.name]=U}),$},[t]),s=x.useCallback(k=>{g(k),f(null),w(!1)},[]),u=x.useCallback(k=>{f(k),g(null),w(!1)},[]),c=x.useCallback((k,$)=>{d(k,$,a)},[a,d]),v=x.useCallback((k,$)=>{d(k,$,a)},[a,d]),b=x.useCallback(()=>{w(!0),g(null),f(null)},[]),T=x.useCallback(()=>{r(),g(null),f(null),j(!1),window.location.reload()},[r]);return e.jsxs("div",{className:"h-full flex overflow-hidden",children:[e.jsx("div",{className:"w-72 flex-shrink-0 h-full overflow-hidden",children:e.jsx(Pe,{selectedComponent:h,onSelectComponent:s,selectedFoundation:n,onSelectFoundation:u,onExport:b,onReset:()=>j(!0),hasUnsavedChanges:m,hasOverrides:m})}),e.jsx("div",{className:"flex-1 h-full overflow-y-auto bg-background",children:p?e.jsx(Qe,{onClose:()=>w(!1)}):h?e.jsxs("div",{className:"p-6 max-w-4xl mx-auto",children:[e.jsx(_e,{component:h,overrides:y,onTokenChange:c,onVariantChange:l}),e.jsx("div",{className:"mt-8",children:e.jsx(Ze,{component:h,variant:o})})]}):n==="radius-presets"?e.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:e.jsx(Ye,{values:E,onChange:v})}):n==="color-ramps"?e.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold",children:"Color Ramps"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Edit global color palette ramps. Changes cascade to all components."})]}),e.jsx("div",{className:"text-sm text-muted-foreground",children:"Color ramp editing will be implemented in a future update."})]})}):n==="typography"?e.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold",children:"Typography"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Edit global typography tokens. Changes cascade to all components."})]}),e.jsx("div",{className:"text-sm text-muted-foreground",children:"Typography editing will be implemented in a future update."})]})}):e.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:e.jsxs("div",{className:"text-center py-12",children:[e.jsx("h2",{className:"text-lg font-semibold mb-2",children:"Theme Builder"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Select a component from the left to start editing, or choose a foundation preset."})]})})}),e.jsx(I,{open:C,onOpenChange:j,children:e.jsxs(I.Content,{children:[e.jsxs(I.Header,{children:[e.jsx(I.Title,{children:"Reset All Changes?"}),e.jsx(I.Description,{children:"This will reset all theme customizations back to their default values. This action cannot be undone."})]}),e.jsxs(I.Footer,{children:[e.jsx(I.Cancel,{children:"Cancel"}),e.jsx(I.Action,{onClick:T,children:"Reset All"})]})]})})]})}function Ze({component:a,variant:r}){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{children:e.jsx("h3",{className:"text-sm font-semibold mb-4",children:"Live Preview"})}),e.jsxs("div",{className:"space-y-4",children:[a==="button"&&r&&e.jsx("div",{className:"flex flex-wrap gap-4",children:e.jsx(q,{intent:r,children:r.charAt(0).toUpperCase()+r.slice(1)})}),a==="card"&&e.jsxs(B,{children:[e.jsx(B.Header,{children:e.jsx(B.Title,{children:"Card Title"})}),e.jsx(B.Content,{children:e.jsx("p",{children:"This is a card component preview. Edit the card tokens to see changes here."})})]}),a==="input"&&e.jsxs("div",{className:"space-y-4 max-w-md",children:[e.jsx(K,{placeholder:"Default input"}),e.jsx(K,{variant:"filled",placeholder:"Filled input"}),e.jsx(K,{invalid:!0,placeholder:"Invalid input"})]}),a==="badge"&&r&&e.jsx("div",{className:"flex flex-wrap gap-4",children:e.jsx(pe,{intent:r,children:r.charAt(0).toUpperCase()+r.slice(1)})}),a==="alert"&&r&&e.jsx("div",{className:"space-y-4 max-w-2xl",children:e.jsxs(Y,{intent:r,style:{borderRadius:"var(--wex-component-alert-radius)"},children:[e.jsxs(Y.Title,{children:[r.charAt(0).toUpperCase()+r.slice(1)," Alert"]}),e.jsxs(Y.Description,{children:["This is a ",r," alert message. Edit the ",r," variant tokens above to see changes here."]})]})}),!r&&a!=="card"&&a!=="input"&&e.jsx("div",{className:"text-sm text-muted-foreground",children:"Select a variant above to see the preview."})]})]})}export{xt as default};
