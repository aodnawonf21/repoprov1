import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"Repostera Pro",description:"Gestión simple para emprendimientos de repostería"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
