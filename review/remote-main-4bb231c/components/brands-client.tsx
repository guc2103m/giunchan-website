'use client';
import { useEffect, useState } from 'react';

export function BrandFilters(){
 const [active,setActive]=useState('전체');
 const filters=['전체','마시는 일상','매일의 식탁','매일의 영양','선물하기'];
 return <><div className="brand-filters" aria-label="제품 이용 상황 필터">{filters.map(filter=><button key={filter} type="button" aria-pressed={active===filter} onClick={()=>setActive(filter)}>{filter}</button>)}</div><style>{`.brand-product[data-hidden="true"]{display:none}`}</style><BrandFilterEffect active={active}/></>;
}
function BrandFilterEffect({active}:{active:string}){useEffect(()=>{document.querySelectorAll<HTMLElement>('.brand-product').forEach(item=>{item.dataset.hidden=String(active!=='전체'&&!item.dataset.category?.includes(active))})},[active]);return <span className="sr-only" aria-live="polite">{active} 제품을 표시합니다.</span>}

export function ProductDetails({id,children}:{id:string;children:React.ReactNode}){
 const [open,setOpen]=useState(false);const panel=id+'-details';
 return <div className="brand-detail-toggle"><button type="button" aria-expanded={open} aria-controls={panel} onClick={()=>setOpen(!open)}>{open?'제품 정보 접기':'제품 정보 보기'} <span aria-hidden="true">{open?'−':'+'}</span></button><div id={panel} hidden={!open}>{children}</div></div>;
}
