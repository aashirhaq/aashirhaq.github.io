"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function PaymentWalkthrough() {
  const [renewal, setRenewal] = useState(true);
  const [stage, setStage] = useState(0);
  const steps = useRef<HTMLOListElement>(null);
  const route = [
    [renewal ? "Subscription renewal" : "One-time purchase", renewal ? "A subscription comes due for its next charge." : "A customer starts checkout for an order."],
    ["Payment service", "I brought more than ten gateways behind one service so product teams could use a shared payment interface."],
    ["Gateway response", "The service receives the provider’s result. Centralized payment logs support investigation and reconciliation."],
    renewal ? ["Feature access", "The subscription module checks package eligibility to determine which features the customer can use."] : ["Order payment", "The payment outcome returns to the order flow. Subscription eligibility belongs to a separate path."],
  ];
  useEffect(() => {
    const list = steps.current;
    if (!list) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setStage(Number((entry.target as HTMLElement).dataset.step));
      }
    }, {rootMargin: "-25% 0px -48% 0px"});
    for (const item of list.children) observer.observe(item);
    return () => observer.disconnect();
  }, []);
  return <section id="payment-trace" className="work-section">
    <div className="work-wrap">
      <p className="kicker">Golootlo / Production system</p>
      <h2>Follow a payment.</h2>
      <p className="work-deck">From a customer’s charge to the features their subscription unlocks.</p>
      <div className="trace-layout">
        <div className="trace-board">
          <div className="trace-switch" aria-label="Payment path">{["One-time purchase","Subscription renewal"].map((label,i)=><button key={label} type="button" aria-pressed={renewal===Boolean(i)} onClick={()=>setRenewal(Boolean(i))}>{label}</button>)}</div>
          <ol className="trace-map">{route.map(([title],i)=><li key={i} data-active={stage===i}><button aria-label={'Inspect '+title} onClick={()=>{setStage(i);steps.current?.children[i]?.scrollIntoView({block:"center"});}}><span aria-hidden="true">0{i+1}</span>{title}</button></li>)}</ol>
          <Link href="/projects/payment-orchestration/">Read the architecture case study ↗</Link>
        </div>
        <ol ref={steps} className="trace-copy">{route.map(([title,detail],i)=><li key={i} data-step={i}><small>0{i+1}</small><h3>{title}</h3><p>{detail}</p></li>)}</ol>
      </div>
    </div>
  </section>;
}
