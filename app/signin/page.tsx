"use client";
import ClientOnly from "@/app/components/ClientOnly";
import LoginForm from "@/app/components/Login/Login";

import ToasterProvider from "@/app/providers/ToasterProvider";

export default function Signin() {
  return (
    <main className="">
      <ClientOnly>
        <ToasterProvider />
        <LoginForm />
      </ClientOnly>
    </main>
  );
}
