!function(e){function a(a){for(var n,i,o=a[0],l=a[1],c=a[2],p=0,d=[];p<o.length;p++)i=o[p],s[i]&&d.push(s[i][0]),s[i]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);for(m&&m(a);d.length;)d.shift()();return r.push.apply(r,c||[]),t()}function t(){for(var e,a=0;a<r.length;a++){for(var t=r[a],n=!0,o=1;o<t.length;o++){var l=t[o];0!==s[l]&&(n=!1)}n&&(r.splice(a--,1),e=i(i.s=t[0]))}return e}var n={},s={0:0},r=[];function i(a){if(n[a])return n[a].exports;var t=n[a]={i:a,l:!1,exports:{}};return e[a].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=n,i.d=function(e,a,t){i.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,a){if(1&a&&(e=i(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var n in e)i.d(t,n,function(a){return e[a]}.bind(null,n));return t},i.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(a,"a",a),a},i.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},i.p="/";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=a,o=o.slice();for(var c=0;c<o.length;c++)a(o[c]);var m=l;r.push([204,2]),t()}({119:function(e,a,t){e.exports=t.p+"images/fast-dna.svg"},190:function(e,a,t){e.exports=t.p+"images/medium.svg"},191:function(e,a,t){e.exports=t.p+"images/twitter.svg"},192:function(e,a,t){e.exports=t.p+"images/facebook.svg"},193:function(e,a,t){e.exports=t.p+"images/dribble.svg"},194:function(e,a,t){e.exports=t.p+"images/animation.svg"},195:function(e,a,t){e.exports=t.p+"images/colors.svg"},196:function(e,a,t){e.exports=t.p+"images/grids.svg"},197:function(e,a,t){e.exports=t.p+"images/more.svg"},198:function(e,a,t){e.exports=t.p+"images/site-background.svg"},199:function(e,a,t){e.exports=t.p+"images/AdaptiveUIScreens.mp4"},204:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),r=t(120),i=t.n(r),o=t(49),l=t(52),c=t(79),m=t(7),p=t(224),d=t(225),g=t(129),h=t(9),u=t(41),b=t(206),f=t(209),x=t(208);const v={banner:Object.assign({position:"relative",boxSizing:"border-box",marginTop:"30px"},Object(u.c)()),banner_contentRegion:{display:"grid",gridTemplateRows:"repeat(3, 1fr)",boxSizing:"border-box",maxWidth:"calc(1600px + 10%)",padding:"16px 5%",margin:"0 auto",height:"294px",alignItems:"center","@media only screen and (min-width: 768px)":{height:"150px",gridTemplateColumns:"1fr 1fr .5fr",gridTemplateRows:"1fr"},"@media only screen and (min-width: 1084px)":{height:"150px",gridTemplateColumns:"repeat(3, 1fr)",gridTemplateRows:"1fr"}},banner_title:{margin:"0",textDecoration:"none"},banner_abstract:{margin:"0"},banner_action:{"&:after":{content:"''",position:"absolute",top:"0",left:"0",right:"0",bottom:"0"}}},C={button:Object.assign({color:b.c,fill:b.c,textDecoration:"none",width:"60px",background:"transparent",border:"none",justifySelf:"end","&:hover":{color:b.b,fill:b.b},"&:active":{fill:b.a,color:b.a}},Object(x.a)({borderColor:f.a}),{"& svg":{}})};var y=v,E=t(227),w=t(219),j=t(220),O=t(221),N=t(118),S=t(62),P=t(210);const _=Object(m.a)(C)(E.a);class k extends h.a{constructor(){super(...arguments),this.handledProps={action:void 0,backgroundColor:void 0,title:void 0,tag:void 0,value:void 0,drawBackground:void 0,abstract:void 0,managedClasses:void 0,designSystemMergingFunction:void 0}}render(){return s.a.createElement(w.a,Object.assign({},this.generateAttributes(),{tag:this.props.tag,value:this.props.backgroundColor,drawBackground:this.props.drawBackground,designSystemMergingFunction:this.props.designSystemMergingFunction}),s.a.createElement("div",{className:Object(P.a)(this.props.managedClasses,"banner_contentRegion","")},s.a.createElement(j.a,Object.assign({},this.getTitleProps())),s.a.createElement(O.a,Object.assign({},this.getAbstractProps())),s.a.createElement(_,Object.assign({},this.props.action,{className:Object(P.a)(this.props.managedClasses,"banner_action","")}),s.a.createElement("svg",{width:"60",height:"56",viewBox:"0 0 60 56",xmlns:"http://www.w3.org/2000/svg"},s.a.createElement("path",{d:"M59.8242 28L32.2559 55.5684L29.6191 52.9316L52.6758 29.875H0V26.125H52.6758L29.6191 3.06836L32.2559 0.431641L59.8242 28Z"})))))}generateClassNames(){return super.generateClassNames(Object(P.a)(this.props.managedClasses,"banner",""))}getTitleProps(){return Object.assign({},{className:Object(P.a)(this.props.managedClasses,"banner_title",""),size:N.a._3,tag:N.b.h3},this.props.title)}getAbstractProps(){return Object.assign({},{className:Object(P.a)(this.props.managedClasses,"banner_abstract",""),size:S.a._3},this.props.abstract)}generateAttributes(){const e=Object.assign({},this.unhandledProps(),{className:this.generateClassNames()});return Object.assign({},e,{style:Object.assign({},e.style)})}}k.displayName="Banner",k.defaultProps={backgroundColor:"#0078D4"};var T=k;const A=Object(m.a)(y)(T);var D=t(107),L=t(126),F=t(211);var M={contentPlacement:{boxSizing:"border-box",position:"relative",display:"flex",flexDirection:"column",alignItems:"flex-start",width:"100%",borderTop:Object(D.a)("1px solid {0}",L.a),marginTop:"24px"},contentPlacement_contentContainer:{flex:"1",order:"2","& $contentPlacement_heading":{marginTop:"24px"},"& $contentPlacement_paragraph":{margin:"16px 0"}},contentPlacement_image:{order:"1",marginTop:"24px",fill:F.c,"& > img":{maxWidth:"100%"}},contentPlacement_action:{display:"inline-flex",flexDirection:"column"},contentPlacement_heading:{position:"relative"},contentPlacement_paragraph:{paddingRight:"25px"}};class $ extends h.a{constructor(){super(...arguments),this.handledProps={action:void 0,heading:void 0,image:void 0,paragraph:void 0,managedClasses:void 0}}render(){return s.a.createElement("div",Object.assign({},this.unhandledProps(),{className:this.generateClassNames()}),s.a.createElement("div",{className:Object(P.a)(this.props.managedClasses,"contentPlacement_contentContainer","")},s.a.createElement(j.a,Object.assign({},this.getHeadingProps(),{className:Object(P.a)(this.props.managedClasses,"contentPlacement_heading","")})),s.a.createElement(O.a,Object.assign({},this.getParagraphProps(),{className:Object(P.a)(this.props.managedClasses,"contentPlacement_paragraph","")})),"function"==typeof this.props.action?this.props.action(Object(P.a)(this.props.managedClasses,"contentPlacement_action","")):null),"function"==typeof this.props.image?this.props.image(Object(P.a)(this.props.managedClasses,"contentPlacement_image","")):null)}generateClassNames(){return super.generateClassNames(Object(P.a)(this.props.managedClasses,"contentPlacement",""))}getHeadingProps(){return Object.assign({},{tag:N.b.h3,size:N.a._5},this.props.heading)}getParagraphProps(){return Object.assign({},{size:S.a._3},this.props.paragraph)}}$.displayName="ContentPlacement";var I=$;const z=Object(m.a)(M)(I);var B=t(6),H=(t(207),t(28));const W=Object.assign({},B.c,{backgroundColor:"#1B1B1B",accentPalette:Object(B.b)(Object(H.c)("#DC2E5F")),accentBaseColor:"#DC2E5F"});var V=t(65),U=t(212),G=t(21),R=t(213);var Z={feature:Object.assign({boxSizing:"border-box",position:"relative",display:"flex",flexDirection:"column",width:"100%",height:"auto"},Object(V.a)(),Object(U.b)(U.a.e4),{"& $feature_contentContainer, $feature_content":{flex:"1",display:"flex",flexDirection:"column"},"@media only screen and (min-width: 1083px)":{flexDirection:"row"}}),feature_action:{},feature_badge:Object.assign({},Object(G.a)("t8"),{letterSpacing:"4px",color:b.c,borderBottom:Object(D.a)("1px solid {0}",R.c),justifyContent:"flex-start",padding:"16px 20px","@media only screen and (min-width: 1083px)":{padding:"16px 48px"}}),feature_contentContainer:{justifyContent:"center",flex:"initial","@media only screen and (min-width: 1083px)":{width:"25%"}},feature_content:{justifyContent:"flex-start",padding:"12px 20px","@media only screen and (min-width: 1083px)":{padding:"12px 48px"},"& $feature_heading":{marginTop:"24px"},"& $feature_paragraph":{marginTop:"16px",marginBottom:"auto"},"& $feature_action":{marginBottom:"16px",justifySelf:"flex-end"}},feature_heading:{},feature_image:{maxWidth:"100%",height:"auto","@media only screen and (min-width: 1083px)":{width:"75%"}},feature_paragraph:{}},J=t(214);class q extends h.a{constructor(){super(...arguments),this.handledProps={action:void 0,badge:void 0,heading:void 0,image:void 0,paragraph:void 0,managedClasses:void 0}}render(){return s.a.createElement(w.a,Object.assign({},this.unhandledProps(),{className:this.generateClassNames(),value:J.a}),s.a.createElement("div",{className:Object(P.a)(this.props.managedClasses,"feature_contentContainer","")},s.a.createElement("div",{className:Object(P.a)(this.props.managedClasses,"feature_badge","")},s.a.createElement("span",null,this.props.badge)),s.a.createElement("div",{className:Object(P.a)(this.props.managedClasses,"feature_content","")},s.a.createElement(j.a,Object.assign({},this.getHeadingProps(),{className:Object(P.a)(this.props.managedClasses,"feature_heading","")})),s.a.createElement(O.a,Object.assign({},this.getParagraphProps(),{className:Object(P.a)(this.props.managedClasses,"feature_paragraph","")})),"function"==typeof this.props.action?this.props.action(Object(P.a)(this.props.managedClasses,"feature_action","")):null)),"function"==typeof this.props.image?this.props.image(Object(P.a)(this.props.managedClasses,"feature_image","")):null)}generateClassNames(){return super.generateClassNames(Object(P.a)(this.props.managedClasses,"feature",""))}getHeadingProps(){return Object.assign({},{tag:N.b.h3,size:N.a._5},this.props.heading)}getParagraphProps(){return Object.assign({},{size:S.a._2},this.props.paragraph)}}q.displayName="Feature";var Y=q;const K=Object(m.a)(Z)(Y);var Q=t(215),X=t(27);var ee={"@global":{body:{fontFamily:"Segoe UI, SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif",margin:"0",padding:"0"}},footer:{listStyleType:"none",backgroundColor:e=>e.backgroundColor,height:"100%",margin:"0 auto",overflow:"hidden","& span, & a":Object.assign({},Object(G.a)("t8"),{color:Q.a,textDecoration:"none",display:"inline-block"})},footer_wrapper:{margin:"30px auto 0",maxWidth:"calc(1600px + 10%)",padding:"0 5%",boxSizing:"border-box"},currentTitle:Object.assign({},Object(G.a)("t5"),Object(X.b)()),social:{margin:"0px",order:"2",padding:"16px 0",fontSize:"15px",display:"flex","& img":{maxWidth:"24px",padding:"0 24px 4px 0"},"& a":{padding:"0 24px 4px 0",display:"inline-block"},"@media only screen and (max-width: 768px)":{display:"block",float:"unset"}},ul:{order:"1",listStyleType:"none",margin:"0px",padding:"16px 0",fontSize:"15px",display:"flex","& a":{padding:"0 24px 4px 0",display:"inline-block"},"@media only screen and (max-width: 768px)":{display:"block",float:"left"}},container:{width:"100%"},column:{width:"100%",minHeight:"60px",flexWrap:"wrap",margin:"10px 0px 0px",display:"flex",justifyContent:"space-between"}},ae=t(218);const te=t(119),ne=t(190),se=t(191);t(192),t(193);class re extends h.a{constructor(){super(...arguments),this.handledProps={managedClasses:void 0}}render(){return s.a.createElement("footer",Object.assign({},this.unhandledProps(),{className:this.generateClassNames()}),s.a.createElement("div",{className:Object(P.a)(this.props.managedClasses,"footer_wrapper","")},this.props.children,s.a.createElement("div",{className:Object(P.a)(this.props.managedClasses,"headerGrid","")},s.a.createElement("div",{className:Object(P.a)(this.props.managedClasses,"column","")},s.a.createElement("div",{className:Object(P.a)(this.props.managedClasses,"logo","")},s.a.createElement(ae.a,{src:te,alt:"FAST-DNA logo"}))),s.a.createElement("div",{className:Object(P.a)(this.props.managedClasses,"column","")},s.a.createElement("div",{className:Object(P.a)(this.props.managedClasses,"social","")},s.a.createElement("a",{href:"https://medium.com/fast-dna",target:"_blank"},s.a.createElement("img",{src:ne,alt:"Medium logo"})),s.a.createElement("a",{href:"https://twitter.com/FAST_DNA",target:"_blank"},s.a.createElement("img",{src:se,alt:"Twitter logo"}))),s.a.createElement("ul",{className:Object(P.a)(this.props.managedClasses,"ul","")},s.a.createElement("li",null,s.a.createElement("a",{href:"https://github.com/microsoft/fast-dna/blob/master/LICENSE"},"License")),s.a.createElement("li",null,s.a.createElement("a",{href:"https://privacy.microsoft.com/en-US/privacystatement"},"Privacy & Cookies")),s.a.createElement("li",null,s.a.createElement("a",{href:"https://www.microsoft.com/en-us/legal/intellectualproperty/copyright/default.aspx"},"Terms of Use")),s.a.createElement("li",null,s.a.createElement("span",null,"©2019 Microsoft")))))))}generateClassNames(){return super.generateClassNames(Object(P.a)(this.props.managedClasses,"footer",""))}}re.displayName="Footer";var ie=re;const oe=Object(m.a)(ee)(ie);var le=t(228),ce=t(70);var me={divider:{boxSizing:"content-box",height:"0",margin:"0",border:"none",borderTop:Object(D.a)("8px solid {0}",F.c),transition:"all 0.2s ease-in-out"}};const pe=Object(m.a)(me)(le.a);pe.defaultProps={role:ce.a.presentation};var de=t(223),ge=t(222),he=t(217),ue=t(80);const be={heading__3:{position:"relative"}},fe=Object(m.a)({hero:{height:"100vh",position:"relative",overflow:"hidden",title:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%"}},tall:{height:"925px"},headingWrapper:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",height:"100vh",minHeight:"700px",position:"relative",zIndex:"5",padding:"0 5%"},imageZ0:{position:"absolute",top:"0",left:"0",zIndex:"0",width:"100vw",height:"100vh"}})(e=>s.a.createElement(w.a,{className:`${e.managedClasses.hero} ${e.tall?e.managedClasses.tall:""}`,value:"#C22551"},"function"==typeof e.srcBackground?e.srcBackground(e.managedClasses.imageZ0):null,s.a.createElement("div",{className:e.managedClasses.headingWrapper},s.a.createElement(j.a,{jssStyleSheet:be,size:N.a._2,tag:N.b.h1},e.text),s.a.createElement(ge.a,{jssStyleSheet:{divider:{marginTop:"64px",width:"100%",maxWidth:"1299px",borderColor:Object(b.c)(()=>"#000")}},role:ce.a.presentation}),s.a.createElement(he.a,{href:e.destination,appearance:ue.a.lightweight,jssStyleSheet:{callToAction:{marginTop:"48px"}}},e.callToAction)))),xe=Object(m.a)({height1:{height:"10px"},height2:{height:"20px"},height3:{height:"30px"},height4:{height:"40px"},height5:{height:"50px"},height6:{height:"60px"},height7:{height:"70px"},height8:{height:"80px"},height9:{height:"90px"},height10:{height:"100px"},height125:{height:"125px"}})(e=>s.a.createElement(g.a,{span:e.span,row:e.row},s.a.createElement("div",{className:e.managedClasses[`height${e.height}`]}))),ve=t(194),Ce=t(195),ye=t(196),Ee=t(197),we={heading:{children:"Composition"},paragraph:{children:"Create new component compositions by nesting, styling base components, and passing unhandled props. The combinations are endless."}},je={heading:{children:"Design Systems"},paragraph:{children:"Use Fluent by default or customize design system properties to make it your own. Or, create your own design system to use with FAST components."}},Oe={heading:{children:"Technology"},paragraph:{children:"Out of the box, FAST components are built on React, but you can build components on any modern framework using the FAST system."}},Ne={heading:{children:"Web Standards"},paragraph:{children:"All FAST components follow WCAG 2.1, are W3C spec-compliant and use the W3C interaction models when available."}},Se={heading:{children:"Animation"},paragraph:{children:"Design sophisticated animation sequences with the animation library, an interface for the Web Animations API."},action:e=>s.a.createElement("div",{className:e},s.a.createElement(de.a,{href:"https://www.fast.design/docs/en/packages/fast-animation/"},"Documentation"),s.a.createElement(de.a,{href:"https://github.com/microsoft/fast-dna/tree/master/packages/fast-animation"},"Github")),image:e=>s.a.createElement("img",{className:e,src:ve,alt:"green orb representing motion"})},Pe={heading:{children:"Colors"},paragraph:{children:"Create color palettes, extract colors from images, and handle other color operations using our color library."},action:e=>s.a.createElement("div",{className:e},s.a.createElement(de.a,{href:"https://www.fast.design/docs/en/packages/fast-colors/"},"Documentation"),s.a.createElement(de.a,{href:"https://github.com/microsoft/fast-dna/tree/master/packages/fast-colors"},"Github")),image:e=>s.a.createElement("img",{className:e,src:Ce,alt:"controls representing color swatches and computer monitors"})},_e={heading:{children:"Layout & Grid"},paragraph:{children:"Build layouts such as a 12 column grid for content or an application grid with resizable panels."},action:e=>s.a.createElement("div",{className:e},s.a.createElement(de.a,{href:"https://www.fast.design/docs/en/packages/fast-layouts-react/"},"Documentation"),s.a.createElement(de.a,{href:"https://github.com/microsoft/fast-dna/tree/master/packages/fast-colors"},"Github")),image:e=>s.a.createElement("img",{className:e,src:ye,alt:"sevent pink lines of varying length representing a grid"})},ke={heading:{children:"Other useful utilities"},paragraph:{children:"Leverage a toolkit of general utilities such as keyboarding, Right-To-Left (RTL), number, and string manipulation."},action:e=>s.a.createElement("div",{className:e},s.a.createElement(de.a,{href:"https://www.fast.design/docs/en/packages/fast-web-utilities/"},"Documentation"),s.a.createElement(de.a,{href:"https://github.com/microsoft/fast-dna/tree/master/packages/fast-web-utilities"},"Github")),image:e=>s.a.createElement("img",{className:e,src:Ee,alt:"four gradient blue half circles"})},Te={heading:{children:"Discord"},paragraph:{children:"Join our active community on Discord. Follow the latest updates and contributions, ask questions, give feedback, or keep up on our reading list."},action:e=>s.a.createElement(de.a,{href:"https://discord.gg/FcSNfg4",className:e},"Join our discord community"),image:e=>s.a.createElement("svg",{className:e,width:"91",height:"106",viewBox:"0 0 91 106",xmlns:"http://www.w3.org/2000/svg"},s.a.createElement("path",{d:"M35.8297 45.0969C32.8463 45.0969 30.491 47.5184 30.491 50.4727C30.491 53.4269 32.8986 55.8484 35.8297 55.8484C38.8131 55.8484 41.1685 53.4269 41.1685 50.4727C41.2208 47.5184 38.8131 45.0969 35.8297 45.0969ZM54.934 45.0969C51.9506 45.0969 49.5953 47.5184 49.5953 50.4727C49.5953 53.4269 52.003 55.8484 54.934 55.8484C57.9174 55.8484 60.2728 53.4269 60.2728 50.4727C60.2728 47.5184 57.9174 45.0969 54.934 45.0969Z"}),s.a.createElement("path",{d:"M80.1313 0.657959H10.6323C4.77157 0.657959 0 5.4717 0 11.4365V82.1776C0 88.1424 4.77157 92.9561 10.6323 92.9561H69.4472L66.6983 83.2764L73.337 89.5028L79.6127 95.363L90.7636 105.304V11.4365C90.7636 5.4717 85.9921 0.657959 80.1313 0.657959ZM60.1115 68.9921C60.1115 68.9921 58.2443 66.7422 56.6884 64.7539C63.4827 62.818 66.0759 58.5275 66.0759 58.5275C63.9495 59.9402 61.9267 60.9343 60.1115 61.6145C57.5182 62.7133 55.0287 63.4458 52.591 63.8644C47.612 64.8063 43.0479 64.5446 39.158 63.8121C36.2017 63.2366 33.6603 62.3994 31.5339 61.5622C30.341 61.0913 29.0444 60.5157 27.7477 59.7832C27.5921 59.6786 27.4366 59.6262 27.281 59.5216C27.1772 59.4693 27.1254 59.417 27.0735 59.3646C26.1399 58.8414 25.6213 58.4751 25.6213 58.4751C25.6213 58.4751 28.1108 62.661 34.6976 64.6493C33.1417 66.6376 31.2227 68.9921 31.2227 68.9921C19.7605 68.6258 15.4039 61.039 15.4039 61.039C15.4039 44.1909 22.8724 30.5345 22.8724 30.5345C30.341 24.8836 37.4465 25.0406 37.4465 25.0406L37.9651 25.6685C28.6294 28.3893 24.3247 32.5228 24.3247 32.5228C24.3247 32.5228 25.4657 31.8949 27.3847 31.0054C32.9342 28.5462 37.3428 27.866 39.158 27.7091C39.4692 27.6567 39.7285 27.6044 40.0397 27.6044C43.2035 27.1858 46.7822 27.0812 50.5164 27.4998C55.4436 28.0753 60.7338 29.5404 66.1278 32.5228C66.1278 32.5228 62.0305 28.5986 53.2134 25.8778L53.9395 25.0406C53.9395 25.0406 61.045 24.8836 68.5136 30.5345C68.5136 30.5345 75.9821 44.1909 75.9821 61.039C75.9821 61.039 71.5736 68.6258 60.1115 68.9921Z"}))},Ae={heading:{children:"Twitter"},paragraph:{children:"Follow along as we share out the latest happenings on Twitter. You will find important updates, announcements, and sneak peeks."},action:e=>s.a.createElement(de.a,{href:"https://twitter.com/fast_dna",className:e},"Follow along on Twitter"),image:e=>s.a.createElement("svg",{className:e,width:"116",height:"95",viewBox:"0 0 116 95",xmlns:"http://www.w3.org/2000/svg"},s.a.createElement("path",{d:"M36.406 94.2383C80.1396 94.2383 104.07 57.9714 104.07 26.5741C104.07 25.5538 104.07 24.5335 104.024 23.5132C108.662 20.174 112.696 15.9537 115.896 11.1769C111.63 13.0783 107.038 14.3305 102.215 14.9334C107.131 12.0117 110.888 7.32758 112.696 1.76233C108.105 4.49858 103.004 6.44642 97.5774 7.51309C93.218 2.87538 87.0498 0 80.2324 0C67.1077 0 56.4409 10.6667 56.4409 23.7915C56.4409 25.6465 56.6728 27.4552 57.0438 29.2176C37.2872 28.2437 19.7566 18.7364 8.02324 4.35945C5.98265 7.88411 4.82322 11.9653 4.82322 16.3247C4.82322 24.5799 9.04354 31.8611 15.3972 36.1278C11.5015 35.9886 7.83773 34.922 4.63771 33.1596C4.63771 33.2524 4.63771 33.3451 4.63771 33.4843C4.63771 44.9858 12.8465 54.6322 23.6987 56.812C21.7045 57.3685 19.6175 57.6467 17.4378 57.6467C15.9073 57.6467 14.4233 57.5076 12.9856 57.2294C16.0001 66.6903 24.8118 73.5541 35.2002 73.7396C27.0379 80.1396 16.7885 83.9426 5.65801 83.9426C3.75655 83.9426 1.85508 83.8498 0 83.6179C10.4812 90.2962 23.003 94.2383 36.406 94.2383Z"}))},De={heading:{children:"Medium"},paragraph:{children:"Dive deeper on important FAST related topics, find tutorials, and hear our opinions on up and coming industry topics."},action:e=>s.a.createElement(de.a,{href:"https://medium.com/fast-dna",className:e},"Read our blog on Medium"),image:e=>s.a.createElement("svg",{className:e,width:"113",height:"91",viewBox:"0 0 113 91",xmlns:"http://www.w3.org/2000/svg"},s.a.createElement("path",{d:"M13.3996 19.2345C13.54 17.8429 13.011 16.4675 11.9753 15.5308L1.42437 2.77952V0.874756H34.1849L59.507 56.589L81.7694 0.874756H113V2.77952L103.979 11.4568C103.201 12.0515 102.815 13.029 102.977 13.9964V77.7531C102.815 78.7205 103.201 79.698 103.979 80.2927L112.789 88.97V90.8748H68.4753V88.97L77.6018 80.0811C78.4986 79.1816 78.4986 78.9171 78.4986 77.5414V26.007L53.1237 90.6631H49.6947L20.1522 26.007V69.3404C19.9059 71.1622 20.509 72.9964 21.7876 74.3139L33.6573 88.7583V90.6631H0V88.7583L11.8697 74.3139C13.139 72.9942 13.707 71.1479 13.3996 69.3404V19.2345Z"}))},Le={column:{minHeight:"30px",margin:"4px 0"}},Fe={heading:{padding:"20px 0px"}},Me=t(198),$e=t(199),Ie={backgroundColor:"#C22551",drawBackground:!1,title:{children:"Get started on Github"},abstract:{children:"Explore the FAST mono repository on Github and try out our components, utilities, and tools. Or, mix-and-match with your own solutions."},action:{href:"https://github.com/microsoft/fast-dna/"},style:{background:"linear-gradient(90deg, rgba(251,53,109,1) 8%, rgba(0,35,94,1) 100%)"}},ze={badge:"COMPONENTS",heading:{children:"One component, many faces"},paragraph:{children:"Using an unopinionated architecture and Adaptive Styling, one suite of components can blend into any environment."},action:e=>s.a.createElement(de.a,{className:e,href:"https://explore.fast.design"},"View component explorer"),image:e=>s.a.createElement("video",{className:e,role:"img","aria-label":"Video of the Edge browser themes switching from light to dark",autoPlay:!0,loop:!0},s.a.createElement("source",{src:$e,type:"video/mp4"}))},Be=e=>s.a.createElement("img",{className:e,src:Me,alt:"pink and blue waves"});class He extends h.a{constructor(){super(...arguments),this.handledProps={managedClasses:void 0}}render(){return s.a.createElement("div",{className:super.generateClassNames(this.props.managedClasses.homePage)},s.a.createElement(fe,{srcBackground:Be,destination:"https://explore.fast.design",callToAction:"Explore components",text:"An unopinionated system to build adaptive interfaces."}),s.a.createElement(p.a,{jssStyleSheet:{page:{position:"relative",marginTop:"-30vh"}}},s.a.createElement(d.a,{gutter:16},this.components()),s.a.createElement(d.a,{gutter:16},this.utilities()),s.a.createElement(d.a,{gutter:16,row:3},this.community())),s.a.createElement(A,Object.assign({},Ie)))}components(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(xe,{height:5,row:1}),s.a.createElement(g.a,{jssStyleSheet:Le,span:12,row:2},s.a.createElement(K,Object.assign({},ze))),s.a.createElement(xe,{height:5,row:3}),s.a.createElement(g.a,{jssStyleSheet:Le,span:[12,6,6,3],row:4},s.a.createElement(z,Object.assign({},we))),s.a.createElement(g.a,{jssStyleSheet:Le,span:[12,6,6,3],row:[5,4,4]},s.a.createElement(z,Object.assign({},je))),s.a.createElement(g.a,{jssStyleSheet:Le,span:[12,6,6,3],row:[6,5,5,4]},s.a.createElement(z,Object.assign({},Oe))),s.a.createElement(g.a,{jssStyleSheet:Le,span:[12,6,6,3],row:[7,5,5,4]},s.a.createElement(z,Object.assign({},Ne))),s.a.createElement(xe,{height:5,row:8}))}utilities(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(g.a,{jssStyleSheet:Le,span:[12,12,4],row:7},s.a.createElement(pe,null),s.a.createElement(j.a,{jssStyleSheet:Fe,tag:N.b.h2,size:N.a._3},"Utilities")),s.a.createElement(g.a,{jssStyleSheet:Le,span:[12,6,6,3],row:8},s.a.createElement(z,Object.assign({},Se))),s.a.createElement(g.a,{jssStyleSheet:Le,span:[12,6,6,3],row:[9,8,8]},s.a.createElement(z,Object.assign({},Pe))),s.a.createElement(g.a,{jssStyleSheet:Le,span:[12,6,6,3],row:[10,9,9,8]},s.a.createElement(z,Object.assign({},_e))),s.a.createElement(g.a,{jssStyleSheet:Le,span:[12,6,6,3],row:[11,9,9,8]},s.a.createElement(z,Object.assign({},ke))))}community(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(xe,{height:8,row:9}),s.a.createElement(g.a,{jssStyleSheet:Le,span:[12,12,4],row:10},s.a.createElement(pe,null),s.a.createElement(j.a,{jssStyleSheet:Fe,tag:N.b.h2,size:N.a._3},"Community")),s.a.createElement(g.a,{jssStyleSheet:Le,span:[12,12,4],row:11},s.a.createElement(z,Object.assign({jssStyleSheet:{contentPlacement_image:{height:"80px"}}},Te))),s.a.createElement(g.a,{jssStyleSheet:Le,span:[12,12,4],row:[12,12,11]},s.a.createElement(z,Object.assign({jssStyleSheet:{contentPlacement_image:{height:"80px"}}},Ae))),s.a.createElement(g.a,{jssStyleSheet:Le,span:[12,12,4],row:[13,13,11]},s.a.createElement(z,Object.assign({jssStyleSheet:{contentPlacement_image:{height:"80px"}}},De))),s.a.createElement(xe,{height:5,row:18}))}}He.displayName="HomePage";const We=Object(m.a)({"@font-face":{fontFamily:"SegoeUIVF",src:"url(https://res.cloudinary.com/fast-dna/raw/upload/v1558051831/SegoeUI-Roman-VF_web.ttf) format('truetype')",fontWeight:"1 1000"},"@global":{body:{fontFamily:"SegoeUIVF, Segoe UI, SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif",margin:"0",padding:"0",background:e=>e.backgroundColor}},homePage:{}})(He);var Ve=t(39);const Ue="768px";var Ge=t(20),Re=t(226);const Ze=t(119),Je={"@font-face":{fontFamily:"MDL2",src:"url(https://www.microsoft.com/design/fonts/FWMDL2.ttf) format('truetype')"},"@global":{fontFamily:"'MDL2', 'Segoe MDL2 Assets'",position:"absolute"},logo:{position:"relative",zIndex:"1"},active:{fontWeight:"bold",color:Ge.b},navigation:{top:"0",width:"100%",zIndex:"10",position:"absolute","@media only screen and (max-width: 740px)":{padding:"0px"},"a:visited":{color:"white"},"a:active, a:focus":{fontWeight:Object(X.b)()}},navItem:{color:Object(b.c)(()=>"#000"),margin:"0px 16px"},mobileNavItem:{margin:"24px 0px"},mobileNavLink:{color:Object(b.c)(()=>"#000"),textDecoration:"none"},navItems:{display:"flex",flexDirection:"row",width:"100%",marginLeft:"40px",[`@media only screen and (max-width: ${Ue})`]:{maxWidth:"500px"}},hamburgerButton:{display:"none",backgroundColor:"transparent",border:"none",[`@media only screen and (max-width: ${Ue})`]:{position:"relative",right:"0px",display:"block"}},hamburger:{fontSize:"26px",height:"28px",width:"26px",color:"#FFF",fontFamily:'"MDL2", "Segoe MDL2 Assets", "SegoeMDL2Assets"'},desktopNav:{display:"flex",marginTop:"40px",[`@media only screen and (max-width: ${Ue})`]:{display:"none"}},mobileHeader:{marginTop:"25px",[`@media only screen and (min-width: ${Ue})`]:{display:"none"}},mobileNavBase:{height:"100vh",display:"block",position:"absolute",zIndex:"0",backgroundColor:"black",width:"100%",paddingTop:"100px",[`@media only screen and (min-width: ${Ue})`]:{display:"none"}},mobileNav:{top:"calc(-100vh - 100px)"},mobileNavActive:{top:"0px"},animationProps:{transition:"all 0.333s ease"}};function qe(e,a){if("/"===e)return e===a;if(a){const t=/([aA-zZ-])\w+/g,n=a.match(t)&&a.match(t).join("");return e.includes(n)}return!1}function Ye({isMobile:e,route:a,NavData:t,style:n}){const r=Object.keys(t);return e?s.a.createElement(g.a,{span:12,position:1},r.map((e,r)=>{const i=t[e],o=qe(a,i.href)?n.active:"";let c;return c=i.external?s.a.createElement(de.a,{href:i.href,className:`${o} ${n.mobileNavLink}`},i.text):s.a.createElement(l.b,{to:i.href,className:`${o} ${n.mobileNavLink}`},i.text),s.a.createElement("div",{className:n.mobileNavItem,key:r},c)}),s.a.createElement(Re.a,{href:"https://github.com/microsoft/fast-dna/"},"GitHub")):s.a.createElement(g.a,{position:[2],span:11,style:{display:"flex",width:"100%"}},s.a.createElement("div",{className:n.navItems},r.map((e,r)=>{const i=t[e],o=qe(a,i.href)?n.active:"";let c;return c=i.external?s.a.createElement(de.a,{href:i.href,key:r,className:`${o} ${n.navItem}`},i.text):s.a.createElement(l.b,{to:i.href,key:r,className:`${o} ${n.navItem}`},i.text)}),s.a.createElement(Re.a,{href:"https://github.com/microsoft/fast-dna/",jssStyleSheet:{button:{marginLeft:"auto"}}},"GitHub")))}var Ke=Object(m.a)(Je)(e=>{const[a,t]=s.a.useState(!1);return s.a.useEffect(()=>{t(!1)},[e.routeProps.location.pathname]),function(e,a){s.a.useEffect(()=>{document&&document.body&&(!0===a?document.body.setAttribute("style","overflow: hidden"):document.body.setAttribute("style","overflow: auto"))},[a])}(0,a),s.a.createElement(c.a,{designSystem:{density:2}},s.a.createElement(p.a,{className:e.managedClasses.navigation},s.a.createElement(d.a,{gutter:16,gridColumn:1,className:`${e.managedClasses.animationProps} ${e.managedClasses.mobileNavBase} ${a?e.managedClasses.mobileNavActive:e.managedClasses.mobileNav}`}),s.a.createElement(d.a,{gutter:16,className:`${e.managedClasses.animationProps} ${e.managedClasses.mobileNavBase} ${a?e.managedClasses.mobileNavActive:e.managedClasses.mobileNav}`},s.a.createElement(Ye,{NavData:e.NavData,isMobile:!0,route:e.routeProps.location.pathname,style:e.managedClasses})),s.a.createElement(d.a,{gutter:16,className:e.managedClasses.mobileHeader},s.a.createElement(g.a,{position:1,span:1},s.a.createElement("div",{className:e.managedClasses.logo},s.a.createElement(l.b,{to:"/"},s.a.createElement("img",{className:"",src:Ze})))),s.a.createElement(g.a,{position:12,span:1},s.a.createElement("button",{className:e.managedClasses.hamburgerButton,onClick:function(){t(e=>!e)}},s.a.createElement("span",{className:e.managedClasses.hamburger},"")))),s.a.createElement(d.a,{gutter:16,className:e.managedClasses.desktopNav,verticalAlign:Ve.a.center},s.a.createElement(g.a,{position:1,span:1},s.a.createElement("div",null,s.a.createElement(l.b,{to:"/"},s.a.createElement("img",{src:Ze,alt:"FAST-DNA text in white","aria-label":"Home"})))),s.a.createElement(Ye,{NavData:e.NavData,isMobile:!1,route:e.routeProps.location.pathname,style:e.managedClasses}))))});const Qe={components:{external:!0,href:"https://explore.fast.design",text:"COMPONENTS",selected:!1},documentation:{external:!0,href:"https://www.fast.design/docs/en/contributing/install",text:"DOCUMENTATION",selected:!1}},Xe=document.createElement("div");Xe.setAttribute("id","root"),document.body.appendChild(Xe);const ea=Object(o.f)(e=>s.a.createElement(Ke,{NavData:Qe,routeProps:e}));i.a.render(s.a.createElement(c.a,{designSystem:W},s.a.createElement(l.a,null,s.a.createElement(ea,null),s.a.createElement(o.c,null,s.a.createElement(o.a,{exact:!0,path:"/",render:()=>s.a.createElement(We,null)})),s.a.createElement(oe,null))),document.getElementById("root"))}});