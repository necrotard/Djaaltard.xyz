import{H as e,V as t,b as n,it as r,j as i,lt as a,r as o,v as s,w as c}from"./ModalController-DkofyVAc.js";import{c as l,f as u,o as d,r as f,t as p}from"./exports-GL0dN1cC.js";import{c as m,l as h,o as g}from"./wui-text-DNADz5wx.js";function _(){try{return t.returnOpenHref(`${r.SECURE_SITE_SDK_ORIGIN}/loading`,`popupWindow`,`width=600,height=800,scrollbars=yes`)}catch{throw Error(`Could not open social popup`)}}async function v(){n.push(`ConnectingFarcaster`);let e=s.getAuthConnector();if(e&&!o.getAccountData()?.farcasterUrl)try{let{url:t}=await e.provider.getFarcasterUri();o.setAccountProp(`farcasterUrl`,t,o.state.activeChain)}catch(e){n.goBack(),i.showError(e)}}async function y(r){n.push(`ConnectingSocial`);let l=s.getAuthConnector(),u=null;try{let n=setTimeout(()=>{throw Error(`Social login timed out. Please try again.`)},45e3);if(l&&r){if(t.isTelegram()||(u=_()),u)o.setAccountProp(`socialWindow`,a(u),o.state.activeChain);else if(!t.isTelegram())throw Error(`Could not create social popup`);let{uri:i}=await l.provider.getSocialRedirectUri({provider:r});if(!i)throw u?.close(),Error(`Could not fetch the social redirect uri`);if(u&&(u.location.href=i),t.isTelegram()){e.setTelegramSocialProvider(r);let n=t.formatTelegramSocialLoginUrl(i);t.openHref(n,`_top`)}clearTimeout(n)}}catch(e){u?.close();let n=t.parseError(e);i.showError(n),c.sendEvent({type:`track`,event:`SOCIAL_LOGIN_ERROR`,properties:{provider:r,message:n}})}}async function b(e){o.setAccountProp(`socialProvider`,e,o.state.activeChain),c.sendEvent({type:`track`,event:`SOCIAL_LOGIN_STARTED`,properties:{provider:e}}),e===`farcaster`?await v():await y(e)}var x=d`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: ${({borderRadius:e})=>e[20]};
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`,S=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},C=class extends l{constructor(){super(...arguments),this.logo=`google`}render(){return u`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};C.styles=[f,x],S([m()],C.prototype,`logo`,void 0),C=S([h(`wui-logo`)],C);var w=d`
  :host {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({spacing:e})=>e[3]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-text {
    text-transform: capitalize;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,T=function(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},E=class extends l{constructor(){super(...arguments),this.logo=`google`,this.name=`Continue with google`,this.disabled=!1}render(){return u`
      <button ?disabled=${this.disabled} tabindex=${g(this.tabIdx)}>
        <wui-flex gap="2" alignItems="center">
          <wui-image ?boxed=${!0} logo=${this.logo}></wui-image>
          <wui-text variant="lg-regular" color="primary">${this.name}</wui-text>
        </wui-flex>
        <wui-icon name="chevronRight" size="lg" color="default"></wui-icon>
      </button>
    `}};E.styles=[f,p,w],T([m()],E.prototype,`logo`,void 0),T([m()],E.prototype,`name`,void 0),T([m()],E.prototype,`tabIdx`,void 0),T([m({type:Boolean})],E.prototype,`disabled`,void 0),E=T([h(`wui-list-social`)],E);export{b as t};