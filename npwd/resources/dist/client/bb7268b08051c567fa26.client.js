!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";(function(e){var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function a(e){try{l(i.next(e))}catch(e){s(e)}}function r(e){try{l(i.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,r)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.verifyExportArgType=t.onNpwdEvent=t.RegisterNuiProxy=t.playerLoaded=t.RegisterNuiCB=void 0;const o=n(4),s=n(3);t.default=class{constructor(e){this._defaultSettings={promiseTimeout:15e3},this.setSettings(e)}setSettings(e){this._settings=Object.assign(Object.assign({},this._defaultSettings),e)}emitNetPromise(e,...t){return new Promise((n,i)=>{let s=!1;setTimeout(()=>{s=!0,i(`${e} has timed out after ${this._settings.promiseTimeout} ms`)},this._settings.promiseTimeout);const a=(0,o.uuidv4)(),r=`${e}:${a}`;emitNet(e,r,...t);const l=e=>{removeEventListener(r,l),s||n(e)};onNet(r,l)})}};t.RegisterNuiCB=(e,t)=>{RegisterNuiCallbackType(e),on("__cfx_nui:"+e,t)};t.playerLoaded=()=>new Promise(t=>{const n=setInterval(()=>{e.isPlayerLoaded&&t(n)},50)}).then(e=>clearInterval(e));t.RegisterNuiProxy=n=>{RegisterNuiCallbackType(n),on("__cfx_nui:"+n,(o,a)=>i(void 0,void 0,void 0,(function*(){e.isPlayerLoaded||(yield(0,t.playerLoaded)());try{const e=yield s.ClUtils.emitNetPromise(n,o);a(e)}catch(e){console.error("Error encountered while listening to resp. Error:",e),a({status:"error"})}})))};t.onNpwdEvent=(e,t)=>{onNet(e,t)};t.verifyExportArgType=(e,t,n)=>{const i=typeof t;if(!n.includes(i))throw new Error(`Export ${e} was called with incorrect argument type (${n.join(", ")}. Passed: ${t}, Type: ${i})`)}}).call(this,n(1))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.sendPhoneEvent=t.sendMatchEvent=t.sendCameraEvent=t.sendContactsEvent=t.sendMarketplaceEvent=t.sendNotesEvent=t.sendMessageEvent=t.sendTwitterMessage=t.sendMessage=void 0;const o=i(n(14));function s(e,t,n){return SendNUIMessage({app:e,method:t,data:n})}t.sendMessage=s,t.sendTwitterMessage=function(e,t={}){return s(o.default.TWITTER,e,t)},t.sendMessageEvent=function(e,t={}){return s(o.default.MESSAGES,e,t)},t.sendNotesEvent=function(e,t={}){return s(o.default.NOTES,e,t)},t.sendMarketplaceEvent=function(e,t={}){s(o.default.MARKETPLACE,e,t)},t.sendContactsEvent=function(e,t={}){s(o.default.CONTACTS,e,t)},t.sendCameraEvent=function(e,t={}){s(o.default.CAMERA,e,t)},t.sendMatchEvent=function(e,t={}){return s(o.default.MATCH,e,t)},t.sendPhoneEvent=function(e,t={}){return s(o.default.PHONE,e,t)}},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ClUtils=void 0;const o=i(n(0));n(5),n(6),n(16),n(18),n(19),n(21),n(23),n(24),n(26),n(12),n(30),n(9),n(32),n(33),t.ClUtils=new o.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.uuidv4=t.Delay=void 0;t.Delay=e=>new Promise(t=>setTimeout(t,e));t.uuidv4=()=>{let e="";for(let t=0;t<32;t+=1)switch(t){case 8:case 20:e+="-",e+=(16*Math.random()|0).toString(16);break;case 12:e+="-",e+="4";break;case 16:e+="-",e+=(4*Math.random()|8).toString(16);break;default:e+=(16*Math.random()|0).toString(16)}return e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.config=void 0,t.config=(()=>{let e=JSON.parse(LoadResourceFile(GetCurrentResourceName(),"config.json")),t=GetConvar("npwd:phoneAsItem","");return""!==t&&(t=JSON.parse(t),Object.entries(e.PhoneAsItem).forEach(([n,i])=>{t[n]&&typeof i==typeof t[n]&&(e.PhoneAsItem[n]=t[n])})),e})()},function(e,t,n){"use strict";(function(e){var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function a(e){try{l(i.next(e))}catch(e){s(e)}}function r(e){try{l(i.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,r)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.checkHasPhone=t.hidePhone=t.showPhone=void 0;const o=n(2),s=n(7),a=n(5),r=n(8),l=n(0);e.isPhoneOpen=!1,e.isPhoneDisabled=!1,e.isPlayerLoaded=!1;const E=e.exports;onNet(s.PhoneEvents.SET_PLAYER_LOADED,t=>{e.isPlayerLoaded=t,t||(0,o.sendMessage)("PHONE",s.PhoneEvents.UNLOAD_CHARACTER,{})}),RegisterKeyMapping(a.config.general.toggleCommand,"Toggle Phone","keyboard",a.config.general.toggleKey),setTimeout(()=>{emit("chat:addSuggestion",""+a.config.general.toggleCommand,"Toggle displaying your cellphone")},1e3);t.showPhone=()=>i(void 0,void 0,void 0,(function*(){e.isPhoneOpen=!0;const t=(()=>{let e=GetClockHours(),t=GetClockMinutes();return e<10&&(e="0"+e),t<10&&(t="0"+t),`${e}:${t}`})();yield r.animationService.openPhone(),emitNet(s.PhoneEvents.FETCH_CREDENTIALS),SetCursorLocation(.9,.922),(0,o.sendMessage)("PHONE",s.PhoneEvents.SET_VISIBILITY,!0),(0,o.sendMessage)("PHONE",s.PhoneEvents.SET_TIME,t),SetNuiFocus(!0,!0),SetNuiFocusKeepInput(!0),emit("npwd:disableControlActions",!0)}));t.hidePhone=()=>i(void 0,void 0,void 0,(function*(){e.isPhoneOpen=!1,(0,o.sendMessage)("PHONE",s.PhoneEvents.SET_VISIBILITY,!1),yield r.animationService.closePhone(),SetNuiFocus(!1,!1),SetNuiFocusKeepInput(!1),emit("npwd:disableControlActions",!1)})),RegisterCommand(a.config.general.toggleCommand,()=>i(void 0,void 0,void 0,(function*(){e.isPhoneDisabled||(yield function(){return i(this,void 0,void 0,(function*(){if(yield(0,t.checkHasPhone)())return e.isPhoneOpen?yield(0,t.hidePhone)():void(yield(0,t.showPhone)())}))}())})),!1),RegisterCommand("phone:restart",()=>i(void 0,void 0,void 0,(function*(){yield(0,t.hidePhone)(),(0,o.sendMessage)("PHONE","phoneRestart",{})})),!1);t.checkHasPhone=()=>i(void 0,void 0,void 0,(function*(){if(!a.config.PhoneAsItem.enabled)return!0;const e=yield Promise.resolve(E[a.config.PhoneAsItem.exportResource][a.config.PhoneAsItem.exportFunction]());if("number"!=typeof e&&"boolean"!=typeof e)throw new Error("You must return either a boolean or number from your export function");return!!e})),onNet(s.PhoneEvents.SEND_CREDENTIALS,e=>{(0,o.sendMessage)("SIMCARD",s.PhoneEvents.SET_NUMBER,e)}),on("onResourceStop",e=>{e===GetCurrentResourceName()&&((0,o.sendMessage)("PHONE",s.PhoneEvents.SET_VISIBILITY,!1),SetNuiFocus(!1,!1),r.animationService.endPhoneCall(),r.animationService.closePhone(),ClearPedTasks(PlayerPedId()))}),(0,l.RegisterNuiCB)(s.PhoneEvents.CLOSE_PHONE,(e,n)=>i(void 0,void 0,void 0,(function*(){yield(0,t.hidePhone)(),n()}))),(0,l.RegisterNuiCB)(s.PhoneEvents.TOGGLE_KEYS,({keepGameFocus:t},n)=>i(void 0,void 0,void 0,(function*(){e.isPhoneOpen&&SetNuiFocusKeepInput(t),n({})}))),a.config.PhoneAsItem.enabled&&setTimeout(()=>{let e=!1;const{exportResource:t,exportFunction:n}=a.config.PhoneAsItem;emit(`__cfx_export_${t}_${n}`,()=>{e=!0}),e||console.log("\n^1Incorrect PhoneAsItem configuration detected. Export does not exist.^0\n")},100)}).call(this,n(1))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ErrorStringKeys=t.PhoneEvents=t.PHONE_NUMBER_REGEX=void 0,t.PHONE_NUMBER_REGEX=/^([0-9]{3}-[0-9]{4})|([0-9]{7})$/,function(e){e.OPEN_APP="npwd:openApp",e.OPEN_PHONE="npwd:open",e.CLOSE_PHONE="npwd:close",e.UNLOAD_CHARACTER="npwd:unloadCharacter",e.SET_VISIBILITY="npwd:setVisibility",e.ADD_SNACKBAR_ALERT="npwd:setSnackarAlert",e.SET_NUMBER="npwd:setNumber",e.SET_PHONE_READY="npwd:phoneReady",e.SET_CONFIG="npwd:setPhoneConfig",e.SET_TIME="npwd:setGameTime",e.SEND_CREDENTIALS="npwd:sendCredentials",e.FETCH_CREDENTIALS="npwd:getCredentials",e.TOGGLE_KEYS="npwd:toggleAllControls",e.SET_PLAYER_LOADED="npwd:setPlayerLoaded",e.IS_PHONE_DISABLED="npwd:isPhoneDisabled"}(t.PhoneEvents||(t.PhoneEvents={})),function(e){e.SERVER_ERROR="GENERAL_SERVER_ERROR",e.DELETE_FAILED="DELETE_FAILED",e.ADD_FAILED="ADD_FAILED",e.UPDATE_FAILED="UPDATED_FAILED",e.FETCH_FAILED="FETCH_FAILED"}(t.ErrorStringKeys||(t.ErrorStringKeys={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.animationService=void 0;const i=n(15);t.animationService=new i.AnimationService},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function a(e){try{l(i.next(e))}catch(e){s(e)}}function r(e){try{l(i.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,r)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.removePhoneProp=t.newPhoneProp=void 0;const o=n(4);let s=0,a=!1;function r(){0!=s&&(DeleteEntity(s),s=0,a=!1)}t.newPhoneProp=()=>i(void 0,void 0,void 0,(function*(){if(r(),a)a&&console.log("prop already created");else{for(RequestModel("prop_amb_phone");!HasModelLoaded("prop_amb_phone");)yield(0,o.Delay)(1);const e=PlayerPedId(),[t,n,i]=GetEntityCoords(e,!0);s=CreateObject(GetHashKey("prop_amb_phone"),t,n,i+.2,!0,!0,!0);const r=GetPedBoneIndex(e,28422);AttachEntityToEntity(s,e,r,0,0,0,0,0,-0,!0,!0,!1,!0,1,!0),a=!0}})),t.removePhoneProp=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ContactEvents=t.ContactsDatabaseLimits=t.ContactResp=void 0,function(e){e.ADD_FAILED="CONTACT.FEEDBACK.ADD_FAILED",e.UPDATE_FAILED="CONTACT.FEEDBACK.UPDATE_FAILED",e.INVALID_HOST="GENERIC_INVALID_IMAGE_HOST"}(t.ContactResp||(t.ContactResp={})),function(e){e[e.avatar=255]="avatar",e[e.number=20]="number",e[e.display=255]="display"}(t.ContactsDatabaseLimits||(t.ContactsDatabaseLimits={})),function(e){e.GET_CONTACTS="npwd:getContacts",e.ADD_CONTACT="npwd:addContacts",e.UPDATE_CONTACT="npwd:updateContact",e.DELETE_CONTACT="npwd:deleteContact",e.ADD_CONTACT_EXPORT="npwd:addContactExport"}(t.ContactEvents||(t.ContactEvents={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NotesEvents=void 0,function(e){e.ADD_NOTE="npwd:addNote",e.FETCH_ALL_NOTES="npwd:fetchAllNotes",e.DELETE_NOTE="npwd:deleteNote",e.UPDATE_NOTE="npwd:updateNote",e.ADD_NOTE_EXPORT="npwd:addNoteExport"}(t.NotesEvents||(t.NotesEvents={}))},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function a(e){try{l(i.next(e))}catch(e){s(e)}}function r(e){try{l(i.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,r)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.initializeCallHandler=void 0;const o=n(13),s=n(28),a=n(8),r=n(29),l=n(0),E=n(3),c=new s.CallService;t.initializeCallHandler=(e,t)=>i(void 0,void 0,void 0,(function*(){if(!c.isInCall())try{const n=yield E.ClUtils.emitNetPromise(o.CallEvents.INITIALIZE_CALL,e);if(a.animationService.startPhoneCall(),"ok"!==n.status)return t(n);const{transmitter:i,isTransmitter:s,receiver:r,isUnavailable:l}=n.data;c.handleStartCall(i,r,s,l),t(n)}catch(e){console.error(e),t({status:"error",errorMsg:"CLIENT_TIMED_OUT"})}})),(0,l.RegisterNuiCB)(o.CallEvents.INITIALIZE_CALL,t.initializeCallHandler),(0,r.onNetTyped)(o.CallEvents.START_CALL,e=>{const{transmitter:t,isTransmitter:n,receiver:i,isUnavailable:o}=e;c.handleStartCall(t,i,n,o)}),(0,l.RegisterNuiCB)(o.CallEvents.ACCEPT_CALL,(e,t)=>{a.animationService.startPhoneCall(),(0,r.emitNetTyped)(o.CallEvents.ACCEPT_CALL,e),t({})}),(0,r.onNetTyped)(o.CallEvents.WAS_ACCEPTED,e=>{c.handleCallAccepted(e)}),(0,l.RegisterNuiCB)(o.CallEvents.REJECTED,(e,t)=>{(0,r.emitNetTyped)(o.CallEvents.REJECTED,e),t({})}),onNet(o.CallEvents.WAS_REJECTED,()=>i(void 0,void 0,void 0,(function*(){c.handleRejectCall(),a.animationService.endPhoneCall()}))),(0,l.RegisterNuiCB)(o.CallEvents.END_CALL,(e,t)=>i(void 0,void 0,void 0,(function*(){try{const n=yield E.ClUtils.emitNetPromise(o.CallEvents.END_CALL,e);if("error"===n.status)return console.error(n.errorMsg);c.handleEndCall(),t({})}catch(e){console.error(e),t({status:"error",errorMsg:"CLIENT_TIMED_OUT"})}a.animationService.endPhoneCall()}))),onNet(o.CallEvents.WAS_ENDED,()=>{c.handleEndCall(),a.animationService.endPhoneCall()}),(0,l.RegisterNuiProxy)(o.CallEvents.FETCH_CALLS),onNet(o.CallEvents.SEND_ALERT,e=>{c.handleSendAlert(e)})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CallEvents=t.CallRejectReasons=void 0,function(e){e[e.DECLINED=0]="DECLINED",e[e.BUSY_LINE=1]="BUSY_LINE"}(t.CallRejectReasons||(t.CallRejectReasons={})),function(e){e.INITIALIZE_CALL="npwd:beginCall",e.START_CALL="npwd:startCall",e.ACCEPT_CALL="npwd:acceptCall",e.END_CALL="npwd:endCall",e.WAS_ENDED="npwd:callEnded",e.WAS_ACCEPTED="npwd:callAccepted",e.REJECTED="npwd:rejectCall",e.WAS_REJECTED="npwd:callRejected",e.FETCH_CALLS="npwd:fetchCalls",e.SET_CALL_INFO="npwd:setCaller",e.SET_CALL_MODAL="npwd:callModal",e.SEND_ALERT="npwd:callSetAlert",e.SAVE_CALL="npwd:saveCall"}(t.CallEvents||(t.CallEvents={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={TWITTER:"TWITTER",MATCH:"MATCH",MESSAGES:"MESSAGES",NOTES:"NOTES",MARKETPLACE:"MARKETPLACE",CONTACTS:"CONTACTS",GARAGE:"GARAGE",CAMERA:"CAMERA",PHONE:"PHONE"}},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function a(e){try{l(i.next(e))}catch(e){s(e)}}function r(e){try{l(i.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,r)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.AnimationService=t.AnimationState=void 0;const o=n(9),s=n(4);var a;!function(e){e[e.ON_CALL=0]="ON_CALL",e[e.PHONE_OPEN=1]="PHONE_OPEN",e[e.ON_CAMERA=2]="ON_CAMERA"}(a=t.AnimationState||(t.AnimationState={}));t.AnimationService=class{constructor(){this.onCall=!1,this.phoneOpen=!1,this.onCamera=!1}createAnimationInterval(){this.animationInterval=setInterval(()=>i(this,void 0,void 0,(function*(){const e=PlayerPedId();this.onCall?this.handleCallAnimation(e):this.phoneOpen&&!this.onCamera&&this.handleOpenAnimation(e)})),250)}setPhoneState(e,t){switch(e){case a.ON_CALL:this.onCall=t;break;case a.PHONE_OPEN:this.phoneOpen=t;break;case a.ON_CAMERA:this.onCamera=t}this.onCall||this.phoneOpen?this.animationInterval||this.createAnimationInterval():this.animationInterval&&(clearInterval(this.animationInterval),this.animationInterval=null)}handleCallAnimation(e){IsPedInAnyVehicle(e,!0)?this.handleOnCallInVehicle(e):this.handleOnCallNormal(e)}handleOpenAnimation(e){IsPedInAnyVehicle(e,!0)?this.handleOpenVehicleAnim(e):this.handleOpenNormalAnim(e)}handleCallEndAnimation(e){IsPedInAnyVehicle(e,!0)?this.handleCallEndVehicleAnim(e):this.handleCallEndNormalAnim(e)}handleCloseAnimation(e){IsPedInAnyVehicle(e,!0)?this.handleCloseVehicleAnim(e):this.handleCloseNormalAnim(e)}openPhone(){return i(this,void 0,void 0,(function*(){(0,o.newPhoneProp)(),this.onCall||this.handleOpenAnimation(PlayerPedId()),this.setPhoneState(a.PHONE_OPEN,!0)}))}closePhone(){return i(this,void 0,void 0,(function*(){(0,o.removePhoneProp)(),this.setPhoneState(a.PHONE_OPEN,!1),this.onCall||this.handleCloseAnimation(PlayerPedId())}))}startPhoneCall(){return i(this,void 0,void 0,(function*(){this.handleCallAnimation(PlayerPedId()),this.setPhoneState(a.ON_CALL,!0)}))}endPhoneCall(){return i(this,void 0,void 0,(function*(){this.handleCallEndAnimation(PlayerPedId()),this.setPhoneState(a.ON_CALL,!1)}))}openCamera(){return i(this,void 0,void 0,(function*(){this.setPhoneState(a.ON_CAMERA,!0)}))}closeCamera(){return i(this,void 0,void 0,(function*(){this.setPhoneState(a.ON_CAMERA,!1)}))}loadAnimDict(e){return i(this,void 0,void 0,(function*(){for(RequestAnimDict(e);!HasAnimDictLoaded(e);)yield(0,s.Delay)(100)}))}handleOpenVehicleAnim(e){return i(this,void 0,void 0,(function*(){const t="anim@cellphone@in_car@ps",n="cellphone_text_in";yield this.loadAnimDict(t),IsEntityPlayingAnim(e,t,n,3)||(SetCurrentPedWeapon(e,2725352035,!0),TaskPlayAnim(e,t,n,7,-1,-1,50,0,!1,!1,!1))}))}handleOpenNormalAnim(e){return i(this,void 0,void 0,(function*(){const t="cellphone@",n="cellphone_text_in";yield this.loadAnimDict(t),IsEntityPlayingAnim(e,t,n,3)||(SetCurrentPedWeapon(e,2725352035,!0),TaskPlayAnim(e,t,n,8,-1,-1,50,0,!1,!1,!1))}))}handleCloseVehicleAnim(e){return i(this,void 0,void 0,(function*(){const t="anim@cellphone@in_car@ps";StopAnimTask(e,t,"cellphone_text_in",1),StopAnimTask(e,t,"cellphone_call_to_text",1),(0,o.removePhoneProp)()}))}handleCloseNormalAnim(e){return i(this,void 0,void 0,(function*(){const t="cellphone@",n="cellphone_text_out";StopAnimTask(e,t,"cellphone_text_in",1),yield(0,s.Delay)(100),yield this.loadAnimDict(t),TaskPlayAnim(e,t,n,7,-1,-1,50,0,!1,!1,!1),yield(0,s.Delay)(200),StopAnimTask(e,t,n,1),(0,o.removePhoneProp)()}))}handleOnCallInVehicle(e){return i(this,void 0,void 0,(function*(){const t="anim@cellphone@in_car@ps",n="cellphone_call_listen_base";IsEntityPlayingAnim(e,t,n,3)||(yield this.loadAnimDict(t),TaskPlayAnim(e,t,n,3,3,-1,49,0,!1,!1,!1))}))}handleOnCallNormal(e){return i(this,void 0,void 0,(function*(){const t="cellphone@",n="cellphone_call_listen_base";IsEntityPlayingAnim(e,t,n,3)||(yield this.loadAnimDict(t),TaskPlayAnim(e,t,n,3,3,-1,49,0,!1,!1,!1))}))}handleCallEndVehicleAnim(e){return i(this,void 0,void 0,(function*(){const t="anim@cellphone@in_car@ps";StopAnimTask(e,t,"cellphone_call_listen_base",1),yield this.loadAnimDict(t),TaskPlayAnim(e,t,"cellphone_call_to_text",1.3,5,-1,50,0,!1,!1,!1)}))}handleCallEndNormalAnim(e){return i(this,void 0,void 0,(function*(){IsEntityPlayingAnim(e,"cellphone@","cellphone_call_listen_base",49)&&(yield this.loadAnimDict("cellphone@"),TaskPlayAnim(e,"cellphone@","cellphone_call_to_text",2.5,8,-1,50,0,!1,!1,!1))}))}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(17),o=n(2),s=n(0);(0,s.RegisterNuiProxy)(i.TwitterEvents.GET_OR_CREATE_PROFILE),(0,s.RegisterNuiProxy)(i.TwitterEvents.DELETE_TWEET),(0,s.RegisterNuiProxy)(i.TwitterEvents.UPDATE_PROFILE),(0,s.RegisterNuiProxy)(i.TwitterEvents.CREATE_PROFILE),(0,s.RegisterNuiProxy)(i.TwitterEvents.FETCH_TWEETS),(0,s.RegisterNuiProxy)(i.TwitterEvents.CREATE_TWEET),(0,s.RegisterNuiProxy)(i.TwitterEvents.FETCH_TWEETS_FILTERED),(0,s.RegisterNuiProxy)(i.TwitterEvents.TOGGLE_LIKE),(0,s.RegisterNuiProxy)(i.TwitterEvents.REPORT),(0,s.RegisterNuiProxy)(i.TwitterEvents.RETWEET),onNet(i.TwitterEvents.CREATE_TWEET_BROADCAST,e=>{(0,o.sendTwitterMessage)(i.TwitterEvents.CREATE_TWEET_BROADCAST,e)})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TwitterEvents=void 0,function(e){e.FETCH_TWEETS="npwd:fetchTweets",e.FETCH_TWEETS_FILTERED="npwd:fetchTweetsFiltered",e.CREATE_PROFILE="npwd:createTwitterProfile",e.GET_OR_CREATE_PROFILE="npwd:getOrCreateTwitterProfile",e.UPDATE_PROFILE="npwd:updateTwitterProfile",e.CREATE_TWEET="npwd:createTweet",e.CREATE_TWEET_BROADCAST="createTweetBroadcast",e.DELETE_TWEET="npwd:deleteTweet",e.TOGGLE_LIKE="npwd:toggleLike",e.RETWEET="npwd:retweet",e.REPORT="npwd:reportTweet"}(t.TwitterEvents||(t.TwitterEvents={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(10),o=n(0);(0,o.RegisterNuiProxy)(i.ContactEvents.GET_CONTACTS),(0,o.RegisterNuiProxy)(i.ContactEvents.ADD_CONTACT),(0,o.RegisterNuiProxy)(i.ContactEvents.DELETE_CONTACT),(0,o.RegisterNuiProxy)(i.ContactEvents.UPDATE_CONTACT)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(20),o=n(0),s=n(2);(0,o.RegisterNuiProxy)(i.MarketplaceEvents.FETCH_LISTING),(0,o.RegisterNuiProxy)(i.MarketplaceEvents.ADD_LISTING),(0,o.RegisterNuiProxy)(i.MarketplaceEvents.DELETE_LISTING),(0,o.RegisterNuiProxy)(i.MarketplaceEvents.REPORT_LISTING),onNet(i.MarketplaceEvents.BROADCAST_ADD,e=>{(0,s.sendMarketplaceEvent)(i.MarketplaceEvents.BROADCAST_ADD,e)}),onNet(i.MarketplaceEvents.BROADCAST_DELETE,e=>{(0,s.sendMarketplaceEvent)(i.MarketplaceEvents.BROADCAST_DELETE,e)})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MarketplaceEvents=t.MarketplaceResp=t.MarketplaceDatabaseLimits=void 0,function(e){e[e.title=255]="title",e[e.description=255]="description",e[e.url=255]="url"}(t.MarketplaceDatabaseLimits||(t.MarketplaceDatabaseLimits={})),function(e){e.CREATE_FAILED="MARKETPLACE.FEEDBACK.CREATE_LISTING_FAILED",e.DUPLICATE="MARKETPLACE.FEEDBACK.DUPLICATE_LISTING",e.INVALID_IMAGE_HOST="GENERIC_INVALID_IMAGE_HOST"}(t.MarketplaceResp||(t.MarketplaceResp={})),function(e){e.ADD_LISTING="npwd:addListing",e.FETCH_LISTING="npwd:fetchAllListings",e.DELETE_LISTING="npwd:marketplaceDeleteListing",e.DELETE_LISTINGS_ON_DROP="npwd:marketplaceDeleteListingsOnDrop",e.REPORT_LISTING="npwd:reportListing",e.BROADCAST_ADD="npwd:sendMarketplaceBroadcastAdd",e.BROADCAST_DELETE="npwd:sendMarketplaceBroadcastDelete"}(t.MarketplaceEvents||(t.MarketplaceEvents={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(0),o=n(22);(0,i.RegisterNuiProxy)(o.GarageEvents.TRACK_VEHICLE),(0,i.RegisterNuiProxy)(o.GarageEvents.FETCH_VEHICLES)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GarageEvents=void 0,function(e){e.TRACK_VEHICLE="npwd:trackVehicle",e.FETCH_VEHICLES="npwd:fetchAllVehicles"}(t.GarageEvents||(t.GarageEvents={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(11),o=n(0);(0,o.RegisterNuiProxy)(i.NotesEvents.ADD_NOTE),(0,o.RegisterNuiProxy)(i.NotesEvents.FETCH_ALL_NOTES),(0,o.RegisterNuiProxy)(i.NotesEvents.UPDATE_NOTE),(0,o.RegisterNuiProxy)(i.NotesEvents.DELETE_NOTE)},function(e,t,n){"use strict";(function(e){var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function a(e){try{l(i.next(e))}catch(e){s(e)}}function r(e){try{l(i.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,r)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(25),s=n(4),a=n(2),r=n(7),l=n(3),E=n(5),c=n(8),d=n(0),u=GetConvar("SCREENSHOT_BASIC_TOKEN","none"),_=e.exports;let C=!1;function A(){SetNuiFocus(!0,!0),(0,a.sendMessage)("PHONE",r.PhoneEvents.SET_VISIBILITY,!0)}(0,d.RegisterNuiCB)(o.PhotoEvents.TAKE_PHOTO,(e,t)=>i(void 0,void 0,void 0,(function*(){yield c.animationService.openCamera(),emit("npwd:disableControlActions",!1);let e=!1;for(CreateMobilePhone(1),CellCamActivate(!0,!0),SetNuiFocus(!1,!1),(0,a.sendMessage)("PHONE",r.PhoneEvents.SET_VISIBILITY,!1),SetNuiFocus(!1,!1),C=!0,emit(o.PhotoEvents.NPWD_PHOTO_MODE_STARTED);C;){if(yield(0,s.Delay)(0),IsControlJustPressed(1,27))e=!e,n=e,Citizen.invokeNative("0x2491A93618B7D838",n);else{if(IsControlJustPressed(1,176)){const e=yield T();t(e);break}if(IsControlJustPressed(1,194)){yield h();break}}BeginTextCommandDisplayHelp("THREESTRINGS"),AddTextComponentString("Exit Camera Mode: ~INPUT_CELLPHONE_CANCEL~"),AddTextComponentString("Toggle Front/Back: ~INPUT_PHONE~"),AddTextComponentString("Take Picture: ~INPUT_CELLPHONE_SELECT~"),EndTextCommandDisplayHelp(0,!0,!1,-1)}var n;ClearHelp(!0),emit(o.PhotoEvents.NPWD_PHOTO_MODE_ENDED),emit("npwd:disableControlActions",!0),yield c.animationService.closeCamera()})));const T=()=>i(void 0,void 0,void 0,(function*(){ClearHelp(!0),yield(0,s.Delay)(0),setTimeout(()=>{DestroyMobilePhone(),CellCamActivate(!1,!1),A(),c.animationService.openPhone(),emit("npwd:disableControlActions",!0)},200);const e=yield p();return C=!1,e})),h=()=>i(void 0,void 0,void 0,(function*(){(0,a.sendCameraEvent)(o.PhotoEvents.CAMERA_EXITED),ClearHelp(!0),yield c.animationService.closeCamera(),emit("npwd:disableControlActions",!0),DestroyMobilePhone(),CellCamActivate(!1,!1),A(),C=!1})),p=()=>new Promise((e,t)=>{if("none"===u&&E.config.images.useAuthorization)return console.error("Screenshot basic token not found. Please set in server.cfg");_["screenshot-basic"].requestScreenshotUpload(E.config.images.url,E.config.images.type,{encoding:E.config.images.imageEncoding,headers:{authorization:E.config.images.useAuthorization?`${E.config.images.authorizationPrefix} ${u}`:void 0,"content-type":E.config.images.contentType}},n=>i(void 0,void 0,void 0,(function*(){try{let t=JSON.parse(n);for(const e of E.config.images.returnedDataIndexes)t=t[e];const i=yield l.ClUtils.emitNetPromise(o.PhotoEvents.UPLOAD_PHOTO,t);e(i)}catch(e){t(e.message)}})))});(0,d.RegisterNuiProxy)(o.PhotoEvents.FETCH_PHOTOS),(0,d.RegisterNuiProxy)(o.PhotoEvents.DELETE_PHOTO)}).call(this,n(1))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PhotoEvents=t.PhotoResp=void 0,function(e){e.GENERIC="CAMERA.FAILED_TO_TAKE_PHOTO",e.INVALID_IMAGE_HOST="GENERIC_INVALID_IMAGE_HOST"}(t.PhotoResp||(t.PhotoResp={})),function(e){e.TAKE_PHOTO="npwd:TakePhoto",e.CAMERA_EXITED="npwd:cameraExited",e.NPWD_PHOTO_MODE_STARTED="npwd:PhotoModeStarted",e.NPWD_PHOTO_MODE_ENDED="npwd:PhotoModeEnded",e.TAKE_PHOTO_SUCCESS="npwd:TakePhotoSuccess",e.UPLOAD_PHOTO="npwd:UploadPhoto",e.FETCH_PHOTOS="npwd:FetchPhotos",e.DELETE_PHOTO="npwd:deletePhoto"}(t.PhotoEvents||(t.PhotoEvents={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(27),o=n(2),s=n(0);(0,s.RegisterNuiProxy)(i.MessageEvents.FETCH_MESSAGE_CONVERSATIONS),(0,s.RegisterNuiProxy)(i.MessageEvents.DELETE_MESSAGE),(0,s.RegisterNuiProxy)(i.MessageEvents.FETCH_MESSAGES),(0,s.RegisterNuiProxy)(i.MessageEvents.CREATE_MESSAGE_CONVERSATION),(0,s.RegisterNuiProxy)(i.MessageEvents.DELETE_CONVERSATION),(0,s.RegisterNuiProxy)(i.MessageEvents.SEND_MESSAGE),onNet(i.MessageEvents.SEND_MESSAGE_SUCCESS,e=>{(0,o.sendMessageEvent)(i.MessageEvents.SEND_MESSAGE_SUCCESS,e)}),onNet(i.MessageEvents.CREATE_MESSAGE_BROADCAST,e=>{(0,o.sendMessageEvent)(i.MessageEvents.CREATE_MESSAGE_BROADCAST,e)}),onNet(i.MessageEvents.CREATE_MESSAGE_CONVERSATION_SUCCESS,e=>{(0,o.sendMessageEvent)(i.MessageEvents.CREATE_MESSAGE_CONVERSATION_SUCCESS,e)})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MessageEvents=void 0,function(e){e.FETCH_MESSAGE_CONVERSATIONS="npwd:fetchMessageGroups",e.FETCH_MESSAGE_GROUPS_SUCCESS="npwd:fetchMessageGroupsSuccess",e.FETCH_MESSAGE_GROUPS_FAILED="npwd:fetchMessageGroupsFailed",e.CREATE_MESSAGE_CONVERSATION="npwd:createMessageGroup",e.CREATE_MESSAGE_CONVERSATION_SUCCESS="npwd:createMessageConversationSuccess",e.CREATE_MESSAGE_GROUP_SUCCESS="npwd:createMessageGroupSuccess",e.CREATE_MESSAGE_GROUP_FAILED="npwd:createMessageGroupFailed",e.SEND_MESSAGE="npwd:sendMessage",e.SEND_EMBED_MESSAGE="npwd:sendEmbedMessage",e.SEND_MESSAGE_SUCCESS="npwd:sendMessageSuccess",e.SEND_MESSAGE_FAILED="npwd:sendMessageFailed",e.DELETE_MESSAGE="npwd:deleteMessage",e.FETCH_MESSAGES="npwd:fetchMessages",e.FETCH_MESSAGES_SUCCESS="npwd:fetchMessagesSuccess",e.FETCH_MESSAGES_FAILED="npwd:fetchMessagesFailed",e.FETCH_INITIAL_MESSAGES="npwd:fetchInitialMessages",e.ACTION_RESULT="npwd:setMessagesAlert",e.CREATE_MESSAGE_BROADCAST="npwd:createMessagesBroadcast",e.SET_MESSAGE_READ="npwd:setReadMessages",e.DELETE_CONVERSATION="nwpd:deleteConversation"}(t.MessageEvents||(t.MessageEvents={}))},function(e,t,n){"use strict";(function(e){var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function a(e){try{l(i.next(e))}catch(e){s(e)}}function r(e){try{l(i.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,r)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.CallService=void 0;const o=n(6),s=n(13),a=e.exports;class r{constructor(){this.currentCall=0}static sendCallAction(e,t){SendNUIMessage({app:"CALL",method:e,data:t})}isInCall(){return 0!==this.currentCall}openCallModal(e){r.sendCallAction(s.CallEvents.SET_CALL_MODAL,e)}handleRejectCall(){this.isInCall()||(this.openCallModal(!1),r.sendCallAction(s.CallEvents.SET_CALL_INFO,null))}handleStartCall(e,t,n,a){return i(this,void 0,void 0,(function*(){if(this.isInCall()||!(yield(0,o.checkHasPhone)()))return emitNet(s.CallEvents.REJECTED,{transmitterNumber:e},s.CallRejectReasons.BUSY_LINE);this.openCallModal(!0),SendNUIMessage({app:"CALL",method:s.CallEvents.SET_CALL_INFO,data:{active:!0,transmitter:e,receiver:t,isTransmitter:n,accepted:!1,isUnavailable:a}})}))}handleCallAccepted(e){this.currentCall=e.channelId,a["pma-voice"].setCallChannel(e.channelId),r.sendCallAction(s.CallEvents.SET_CALL_INFO,e)}handleEndCall(){this.currentCall=0,a["pma-voice"].setCallChannel(0),this.openCallModal(!1),r.sendCallAction(s.CallEvents.SET_CALL_INFO,null)}handleSendAlert(e){SendNUIMessage({app:"DIALER",method:s.CallEvents.SEND_ALERT,data:e})}}t.CallService=r}).call(this,n(1))},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.emitNetTyped=t.onNetTyped=t.clean=t.getSource=void 0;t.getSource=()=>e.source;t.clean=e=>e?e.replace(/[^0-9a-z]/gi,""):e;t.onNetTyped=(e,t)=>onNet(e,t);t.emitNetTyped=(e,t,n)=>{if(n)return emitNet(e,n,t);emitNet(e,t)}}).call(this,n(1))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(31),o=n(2),s=n(0);(0,s.RegisterNuiProxy)(i.MatchEvents.GET_PROFILES),(0,s.RegisterNuiProxy)(i.MatchEvents.GET_MY_PROFILE),(0,s.RegisterNuiProxy)(i.MatchEvents.GET_MATCHES),(0,s.RegisterNuiProxy)(i.MatchEvents.SAVE_LIKES),(0,s.RegisterNuiProxy)(i.MatchEvents.CREATE_MY_PROFILE),(0,s.RegisterNuiProxy)(i.MatchEvents.UPDATE_MY_PROFILE),onNet(i.MatchEvents.SAVE_LIKES_BROADCAST,e=>{(0,o.sendMatchEvent)(i.MatchEvents.SAVE_LIKES_BROADCAST,e)}),onNet(i.MatchEvents.CREATE_MATCH_ACCOUNT_BROADCAST,e=>{(0,o.sendMatchEvent)(i.MatchEvents.CREATE_MATCH_ACCOUNT_BROADCAST,e)})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MatchEvents=t.MatchResp=void 0,function(e){e.UPDATE_FAILED="MATCH.FEEDBACK.UPDATE_PROFILE_FAILED"}(t.MatchResp||(t.MatchResp={})),function(e){e.INITIALIZE="phone:initializeMatch",e.GET_PROFILES="phone:getMatchProfiles",e.CREATE_MY_PROFILE="phone:createMyProfile",e.GET_MY_PROFILE="phone:getMyProfile",e.UPDATE_MY_PROFILE="phone:updateMyProfile",e.GET_MATCHES="phone:getMatches",e.SAVE_LIKES="phone:saveLikes",e.SAVE_LIKES_BROADCAST="phone:saveLikesBroadcast",e.CREATE_MATCH_ACCOUNT_BROADCAST="phone:matchAccountBroadcast"}(t.MatchEvents||(t.MatchEvents={}))},function(e,t,n){"use strict";(function(e){var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function a(e){try{l(i.next(e))}catch(e){s(e)}}function r(e){try{l(i.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,r)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(2),s=n(7),a=n(0),r=n(12),l=n(10),E=n(11),c=n(6),d=e.exports;d("openApp",e=>{(0,a.verifyExportArgType)("openApp",e,["string"]),(0,o.sendMessage)("PHONE",s.PhoneEvents.OPEN_APP,e)}),d("setPhoneVisible",t=>i(void 0,void 0,void 0,(function*(){(0,a.verifyExportArgType)("setPhoneVisible",t,["boolean","number"]);const n=e.isPhoneDisabled,i=e.isPhoneOpen;if(n&&!t&&i)return;!!t?yield(0,c.showPhone)():yield(0,c.hidePhone)()}))),d("isPhoneVisible",()=>e.isPhoneOpen),d("setPhoneDisabled",t=>{(0,a.verifyExportArgType)("setPhoneVisible",t,["boolean","number"]);const n=!!t;e.isPhoneDisabled=n,(0,o.sendPhoneEvent)(s.PhoneEvents.IS_PHONE_DISABLED,t)}),d("isPhoneDisabled",()=>e.isPhoneDisabled),d("startPhoneCall",e=>{(0,a.verifyExportArgType)("startPhoneCall",e,["string"]),(0,r.initializeCallHandler)({receiverNumber:e})}),d("fillNewContact",e=>{(0,a.verifyExportArgType)("fillNewContact",e,["object"]),(0,o.sendContactsEvent)(l.ContactEvents.ADD_CONTACT_EXPORT,e)}),d("fillNewNote",e=>{(0,a.verifyExportArgType)("fillNewNote",e,["object"]),(0,o.sendNotesEvent)(E.NotesEvents.ADD_NOTE_EXPORT,e)})}).call(this,n(1))},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});const i=n(0),o=n(34);(0,i.RegisterNuiCB)(o.SettingEvents.NUI_SETTINGS_UPDATED,(t,n)=>{e.exports["pma-voice"].setCallVolume(t.callVolume),n({})})}).call(this,n(1))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SettingEvents=void 0,function(e){e.NUI_SETTINGS_UPDATED="npwd:nuiSettingsUpdated"}(t.SettingEvents||(t.SettingEvents={}))}]);