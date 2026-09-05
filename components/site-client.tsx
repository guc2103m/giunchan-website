'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { nav, contactHref, inquiryTypes } from '@/lib/site-data';

export function Header(){
 const [open,setOpen]=useState(false);
 const pathname=usePathname();
 const [scrolled,setScrolled]=useState(false);
 useEffect(()=>{const update=()=>setScrolled(window.scrollY>28);const frame=requestAnimationFrame(update);window.addEventListener('scroll',update,{passive:true});return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update)}},[]);
 const ko:Record<string,string>={COMPANY:'회사',TECHNOLOGY:'기술',BUSINESS:'사업',BRANDS:'브랜드',INSIGHT:'인사이트',NEWSROOM:'뉴스'};
 return <header className={'site-header'+(scrolled?' is-scrolled':'')}><div className="shell nav-row"><a className="brand" href="/" aria-label="기운찬 홈"><Image src="/assets/giunchan-logo.png" alt="주식회사 기운찬" width={180} height={56} priority unoptimized/></a><nav className="desktop-nav" aria-label="주 메뉴">{nav.map(item=>{const active=pathname===item.href||pathname.startsWith(item.href+'/');return <div className={'nav-item'+(active?' is-active':'')} key={item.href}><a href={item.href} aria-current={active?'page':undefined}><span>{item.label}</span><small>{ko[item.label]}</small></a>{item.children.length>0&&<div className="mega"><b>{item.label}</b>{item.children.map(child=><a href={child.href} key={child.href}>{child.label}<span>→</span></a>)}</div>}</div>})}</nav><div className="nav-actions"><a className="contact-pill" href={contactHref}>문의하기</a><button className="menu-toggle" aria-label={open?'메뉴 닫기':'메뉴 열기'} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></div>{open&&<nav id="mobile-navigation" className="mobile-nav" aria-label="모바일 주 메뉴">{nav.map(item=>item.children.length?<details key={item.href}><summary>{item.label}<ChevronDown size={16}/></summary><a href={item.href} onClick={()=>setOpen(false)}>{item.label} 전체 보기</a>{item.children.map(child=><a href={child.href} key={child.href} onClick={()=>setOpen(false)}>{child.label}</a>)}</details>:<a className="mobile-direct" key={item.href} href={item.href} onClick={()=>setOpen(false)}>{item.label}</a>)}<a className="button dark mobile-inquiry" href={contactHref} onClick={()=>setOpen(false)}>문의하기</a></nav>}</header>
}
export function FAQ({items}:{items:{q:string;a:string}[]}){return <div className="faq">{items.map(item=><details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div>}
export function ContactForm(){
 const [done,setDone]=useState(false);
 const [type,setType]=useState('');
 useEffect(()=>{const selected=new URLSearchParams(window.location.search).get('inquiry');if(selected&&inquiryTypes.includes(selected))setType(selected)},[]);
 if(done)return <div className="form-success" role="status"><h3>문의 작성 시연이 완료되었습니다.</h3><p>내용은 전송되거나 저장되지 않았습니다. 실제 상담은 이메일 또는 전화로 연락해 주세요.</p><p><a href="mailto:guc2203@guc.co.kr">guc2203@guc.co.kr</a> · <a href="tel:0415792203">041-579-2203</a></p><button onClick={()=>setDone(false)} className="button dark">다시 작성</button></div>;
 return <form className="contact-form" onSubmit={e=>{e.preventDefault();setDone(true)}}><div className="field full"><label htmlFor="inquiry-type">문의 유형 *</label><select id="inquiry-type" required value={type} onChange={e=>setType(e.target.value)}><option value="" disabled>문의 유형을 선택해 주세요</option>{inquiryTypes.map(x=><option key={x}>{x}</option>)}</select></div><div className="field"><label htmlFor="company-name">회사명 *</label><input id="company-name" autoComplete="organization" required/></div><div className="field"><label htmlFor="person-name">담당자명 *</label><input id="person-name" autoComplete="name" required/></div><div className="field"><label htmlFor="email">이메일 *</label><input id="email" type="email" autoComplete="email" required/></div><div className="field"><label htmlFor="phone">연락처 *</label><input id="phone" type="tel" autoComplete="tel" required/></div><div className="field full"><label htmlFor="country">국가</label><input id="country" autoComplete="country-name"/></div><div className="field full"><label htmlFor="message">문의 내용 *</label><textarea id="message" rows={7} required/></div><button className="button orange" type="submit">작성 확인 (시연용)</button></form>
}

