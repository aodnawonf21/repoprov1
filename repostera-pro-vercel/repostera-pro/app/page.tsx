"use client";
import {useEffect,useMemo,useState} from "react";
import {Bell,Search,UserRound} from "lucide-react";
import {createDemoData} from "@/data/demo";
import {getData,saveData} from "@/lib/storage";
import type {AppData} from "@/types";
import {Sidebar,BottomNav,MoreMenu} from "@/components/navigation";
import {Button,Toast} from "@/components/ui";
import {Dashboard,Orders,Customers,Products,Ingredients,Inventory,Shopping,Finance,Statistics,Calendar,Profile,Notifications} from "@/components/screens";

export default function App(){
 const [data,setData]=useState<AppData|null>(null); const [active,setActive]=useState("home"); const [more,setMore]=useState(false); const [profile,setProfile]=useState(false); const [notifications,setNotifications]=useState(false); const [toast,setToast]=useState(""); const [search,setSearch]=useState("");
 useEffect(()=>{const existing=getData();if(existing){setData(existing)}else{const demo=createDemoData();saveData(demo);setData(demo)}},[]);
 useEffect(()=>{if(!data)return;saveData(data)},[data]);
 useEffect(()=>{if(!data)return;const root=document.documentElement;const theme=data.settings.theme;const dark=theme==="dark"||(theme==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);root.classList.toggle("dark",dark)},[data?.settings.theme]);
 const unread=useMemo(()=>data?.notifications.filter(n=>!n.read).length||0,[data]);
 const update=(mutator:(d:AppData)=>AppData)=>setData(d=>d?mutator(d):d);
 const nav=(id:string)=>{setActive(id);setProfile(false)};
 const showToast=(m:string)=>{setToast(m);window.setTimeout(()=>setToast(""),2800)};
 if(!data)return <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]"><div className="text-center"><div className="serif text-3xl font-bold text-[var(--primary)]">Repostera Pro</div><p className="mt-2 text-sm text-[var(--muted)]">Preparando tu pastelería…</p></div></div>;
 const result=search.trim()?searchResults(data,search):[];
 return <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
   <Sidebar active={active} onNavigate={nav}/>
   <div className="md:pl-64">
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur"><div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8"><div className="serif text-lg font-bold md:hidden">Repostera Pro</div><div className="relative ml-auto hidden w-full max-w-md sm:block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={17}/><input aria-label="Buscar" value={search} onChange={e=>setSearch(e.target.value)} placeholder="¿Qué estás buscando?" className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-9 pr-3 text-sm outline-none focus:border-[var(--primary)]"/>{search&&<div className="absolute left-0 right-0 top-12 z-50 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xl">{result.length?result.map((r:any)=><button key={r.id} onClick={()=>{nav(r.section);setSearch("")}} className="flex w-full items-center justify-between rounded-xl p-3 text-left hover:bg-[var(--bg)]"><div><div className="text-[10px] uppercase text-[var(--muted)]">{r.type}</div><div className="text-sm font-semibold">{r.name}</div></div><span className="text-xs text-[var(--muted)]">Ir</span></button>):<div className="p-3 text-sm text-[var(--muted)]">No encontramos resultados.</div>}</div>}</div><button aria-label="Notificaciones" onClick={()=>setNotifications(true)} className="relative rounded-xl p-2 hover:bg-[var(--surface)]"><Bell size={20}/>{unread>0&&<span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--danger)] px-1 text-[9px] font-bold text-white">{unread}</span>}</button><button aria-label="Mi perfil" onClick={()=>setProfile(true)} className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[var(--accent)] text-sm font-bold text-white">{data.userProfile.avatar?<img src={data.userProfile.avatar} alt="" className="h-full w-full object-cover"/>:(data.userProfile.name||data.businessProfile.businessName||"R")[0].toUpperCase()}</button></div></header>
    <main className="mx-auto max-w-7xl px-4 py-6 pb-28 sm:px-6 lg:px-8 md:pb-8">{active==="home"&&<Dashboard data={data} onNavigate={nav}/>} {active==="orders"&&<Orders data={data} update={update} onToast={showToast}/>} {active==="customers"&&<Customers data={data} update={update} onToast={showToast}/>} {active==="products"&&<Products data={data} update={update} onToast={showToast}/>} {active==="ingredients"&&<Ingredients data={data} update={update} onToast={showToast}/>} {active==="inventory"&&<Inventory data={data} onNavigate={nav}/>} {active==="shopping"&&<Shopping data={data} update={update} onToast={showToast}/>} {active==="finance"&&<Finance data={data}/>} {active==="statistics"&&<Statistics data={data}/>} {active==="calendar"&&<Calendar data={data}/>} </main>
   </div>
   <BottomNav active={active} onNavigate={nav} onCreate={()=>nav("orders")} onMore={()=>setMore(true)}/>
   {more&&<MoreMenu onClose={()=>setMore(false)} onNavigate={nav}/>} {profile&&<div className="fixed inset-0 z-50 overflow-auto bg-[var(--bg)]"><div className="mx-auto min-h-screen max-w-3xl p-4 sm:p-8"><div className="mb-5 flex justify-end"><Button variant="ghost" onClick={()=>setProfile(false)}>Cerrar</Button></div><Profile data={data} update={update} onToast={showToast} onTheme={(theme:string)=>update(d=>({...d,settings:{...d.settings,theme}}))}/></div></div>} {notifications&&<Notifications data={data} update={update} onClose={()=>setNotifications(false)}/>} {toast&&<Toast message={toast} onClose={()=>setToast("")}/>} 
 </div>
}
function searchResults(data:AppData,q:string){const l=q.toLowerCase();return [...data.customers.map(x=>({id:x.id,name:x.name,type:"Clientes",section:"customers"})),...data.orders.map(x=>({id:x.id,name:x.items[0]?.productName||"Pedido",type:"Pedidos",section:"orders"})),...data.products.map(x=>({id:x.id,name:x.name,type:"Productos",section:"products"})),...data.ingredients.map(x=>({id:x.id,name:x.name,type:"Insumos",section:"ingredients"}))].filter(x=>x.name.toLowerCase().includes(l)).slice(0,8)}
