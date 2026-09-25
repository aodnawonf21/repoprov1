# Repostera Pro

MVP de gestión para emprendimientos de repostería. Aplicación cliente-only construida con Next.js, React, TypeScript, Tailwind CSS y Lucide React. Los datos se persisten en `localStorage` y no se envían a servidores.

## Requisitos

- Node.js 20+
- npm 10+

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000`.

## Build de producción

```bash
npm run build
npm start
```

## Vercel

1. Subí este proyecto a GitHub.
2. En Vercel elegí **Add New Project**.
3. Importá el repositorio.
4. No agregues variables de entorno.
5. Vercel detectará Next.js automáticamente.
6. Deploy.

También podés instalar Vercel CLI y ejecutar `vercel` desde la carpeta del proyecto.

## Arquitectura

- `app/`: App Router y estilos globales.
- `components/`: navegación, UI reutilizable y pantallas.
- `lib/storage.ts`: única capa de persistencia.
- `lib/calculations.ts`: reglas de negocio y cálculos.
- `types/`: modelos TypeScript.
- `data/demo.ts`: datos de demostración iniciales.

## Persistencia

La clave de almacenamiento es `repostera-pro:v1`. El esquema central está separado de los componentes para facilitar reemplazar `localStorage` por una API o base de datos en el futuro.

## Datos demo

La primera ejecución crea automáticamente insumos, productos, clientes, pedidos, pagos, gastos y notificaciones. Desde **Mi perfil → Datos locales** podés eliminar los datos locales. Para empezar de nuevo con demo, borrá los datos locales y recargá la aplicación.

## Navegación

Mobile: `Inicio | Pedidos | + | Clientes | Más`.

- `+`: acceso rápido para crear un pedido en este MVP.
- `Más`: navegación hacia Productos, Insumos, Inventario, Compras, Finanzas, Estadísticas y Calendario.
- Avatar: Mi perfil / Mi negocio / Apariencia.

## Sin backend

Este MVP no usa Supabase, Firebase, autenticación, analytics, APIs externas ni variables de entorno. Todo funciona del lado del cliente.
