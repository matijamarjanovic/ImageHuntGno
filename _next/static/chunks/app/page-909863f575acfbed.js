(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5678:function(e,t,a){Promise.resolve().then(a.bind(a,1465))},3239:function(e,t,a){"use strict";a.d(t,{_:function(){return r}});var n=a(9629);class r{static waitForAdena(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5e3,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;return new Promise((a,n)=>{let r=Date.now(),o=()=>{window.adena?a():Date.now()-r>e?n(Error("Adena wallet extension not found within timeout.")):setTimeout(o,t)};o()})}static async validateAdena(){try{await this.waitForAdena(),console.log("Adena wallet found")}catch(e){throw console.error("Adena wallet validation failed:",e),Error("Adena not installed")}}static async establishConnection(e){await r.validateAdena();let t=window.adena;if(!t)throw Error("Adena is not defined");let a=await t.AddEstablish(e);if(a.status!==n.CT.SUCCESS&&a.type!==n.h3.ALREADY_CONNECTED)throw Error("unable to establish connection")}static async getAccountInfo(){await r.validateAdena();let e=window.adena;if(!e)throw Error("Adena is not defined");let t=await e.GetAccount();if(t.status!==n.CT.SUCCESS)throw Error("unable to fetch account info");return t.data}static async switchNetwork(e){await r.validateAdena();let t=window.adena;if(!t)throw Error("Adena is not defined");let a=await t.SwitchNetwork(e);if(a.status!==n.CT.SUCCESS&&a.type!==n.h3.REDUNDANT_CHANGE_REQUESTED)throw Error("unable to switch Adena network")}static async sendTransaction(e,t){await r.validateAdena();let a=window.adena;if(!a)throw Error("Adena is not defined");let o=await a.DoContract({messages:e,gasFee:1e5,gasWanted:t});if(o.status!==n.CT.SUCCESS)throw Error("unable to send transaction: ".concat(o.message));return o.data}}},9629:function(e,t,a){"use strict";var n,r,o,s,i,l,c,d;a.d(t,{CT:function(){return n},h3:function(){return r},mB:function(){return s}}),(i=n||(n={})).SUCCESS="success",i.FAILURE="failure",(l=r||(r={})).ALREADY_CONNECTED="ALREADY_CONNECTED",l.REDUNDANT_CHANGE_REQUESTED="REDUNDANT_CHANGE_REQUEST",(c=o||(o={})).ACTIVE="ACTIVE",c.INACTIVE="IN_ACTIVE",(d=s||(s={})).MSG_SEND="/bank.MsgSend",d.MSG_CALL="/vm.m_call",d.MSG_ADD_PKG="/vm.m_addpkg",d.MSG_RUN="/vm.m_run"},1585:function(e,t){"use strict";let a="portal-loop",n="wss://rpc.gno.land:443/websocket",r="gno.land/r/matijamarjanovic/imagehuntgame";if(!a||!n||!r)throw Error("Missing environment variables");t.Z={CHAIN_ID:a,CHAIN_RPC:n,REALM_PATH:r}},5019:function(e,t,a){"use strict";let n=(0,a(2265).createContext)({address:"",chainID:"",setAddress:()=>{},setChainID:()=>{}});t.Z=n},8653:function(e,t,a){"use strict";let n=(0,a(2265).createContext)({provider:null,setProvider:()=>{}});t.Z=n},1465:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return u}});var n=a(7437),r=a(2265),o=a(5019),s=a(8653),i=a(1585);let l=e=>{let t=e.match(/\((.*?)string\)/);if(!t||t.length<2)throw Error("Invalid response format");let a=t[1].trim().replaceAll('"',"");return a?a.split("`").filter(Boolean).map(e=>e.startsWith("http")?e:"").filter(e=>""!==e.trim()):(console.log("No images found"),[])};var c=a(3239),d=a(9629);function u(){let{address:e}=(0,r.useContext)(o.Z),{provider:t}=(0,r.useContext)(s.Z),[a,u]=(0,r.useState)([]),[h,f]=(0,r.useState)(null),[w,m]=(0,r.useState)(null),[E,g]=(0,r.useState)(null),[A,C]=(0,r.useState)(0),[v,S]=(0,r.useState)(0),[N,_]=(0,r.useState)(!1),[p,b]=(0,r.useState)(!1),x=()=>{g(null),C(0),S(0),m(null),_(!1),b(!1),a.length>0&&m(Math.floor(Math.random()*a.length*2))};(0,r.useEffect)(()=>{a.length>0&&m(Math.floor(Math.random()*a.length))},[a]);let T=e=>{if(null!==w&&!p){if(S(e=>e+1),e===w){g("Congratulations! You found the treasure!");let e=a.length-v;alert("You won! Your score is: ".concat(e)),C(e),_(!0),b(!0)}else{let t="",a=e%5,n=w%5,r=Math.floor(e/5),o=Math.floor(w/5);a<n?t+="The treasure is more to the right.\n":a>n&&(t+="The treasure is more to the left.\n"),r<o?t+="The treasure is further down.\n":r>o&&(t+="The treasure is further up.\n"),g(t)}}},D=async()=>{try{if(t){let e=await t.evaluateExpression(i.Z.REALM_PATH,"GetImages()"),a=l(e);u(a),x()}}catch(e){console.error("Error fetching images:",e),f("Error fetching images.")}};(0,r.useEffect)(()=>{D()},[]);let y=async()=>{if(!e){alert("Address not found.");return}try{await c._.sendTransaction([{type:d.mB.MSG_CALL,value:{caller:e,send:"",pkg_path:i.Z.REALM_PATH,func:"SetScore",args:[e,A.toString()]}}],2e6),alert("Score saved successfully!")}catch(e){console.error("Error saving score:",e),alert("Failed to save score.")}};return(0,n.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen p-8 bg-slate-800",children:[(0,n.jsx)("h1",{className:"text-3xl font-bold mb-6",children:"Treasure Hunt Game"}),(0,n.jsxs)("div",{className:"flex space-x-4 mb-6",children:[(0,n.jsx)("button",{onClick:x,className:"bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition",children:"Reset Game"}),N&&(0,n.jsx)("button",{onClick:y,className:"bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition",children:"Save Score"})]}),h&&(0,n.jsx)("div",{className:"text-red-500 mb-4",children:h}),E&&(0,n.jsx)("div",{className:"text-yellow-400 mb-4",children:E}),(0,n.jsx)("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4",children:a.concat(a).map((e,t)=>(0,n.jsx)("div",{className:"relative group border border-gray-300 rounded-lg overflow-hidden shadow-md max-w-[10rem] cursor-pointer",onClick:()=>T(t),children:(0,n.jsx)("img",{src:e,alt:"Image ".concat(t+1),className:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",style:{aspectRatio:"4 / 3"}})},t))})]})}}},function(e){e.O(0,[971,117,744],function(){return e(e.s=5678)}),_N_E=e.O()}]);