import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Página no encontrada | Cenotes Kin-Ha",
  robots: { index: false },
};

// Con dos layouts raíz (español e inglés), Next.js necesita un 404 global propio.
export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body className="grid min-h-screen place-items-center bg-[#062c24] px-6 text-center text-white">
        <main>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#69d8cb]">404</p>
          <h1 className="mt-4 text-4xl font-medium">Esta página no existe · This page doesn&apos;t exist</h1>
          {/* El 404 está fuera de los layouts: enlaces normales a propósito. */}
          {/* eslint-disable @next/next/no-html-link-for-pages */}
          <p className="mt-8 flex justify-center gap-6 font-semibold">
            <a href="/" className="underline underline-offset-4">Ir al inicio</a>
            <a href="/en" className="underline underline-offset-4">Go to home</a>
          </p>
        </main>
      </body>
    </html>
  );
}
