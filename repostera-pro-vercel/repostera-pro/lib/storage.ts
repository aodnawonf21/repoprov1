import type {AppData} from "@/types";
const KEY="repostera-pro:v1";
export function getData():AppData|null{if(typeof window==="undefined")return null;try{const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw):null}catch{return null}}
export function saveData(data:AppData){if(typeof window!=="undefined")localStorage.setItem(KEY,JSON.stringify(data))}
export function clearData(){if(typeof window!=="undefined")localStorage.removeItem(KEY)}
export function updateData(mutator:(data:AppData)=>AppData){const current=getData();if(!current)return null;const next=mutator(current);saveData(next);return next}
