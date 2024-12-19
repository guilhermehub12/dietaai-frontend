import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-background">
      <div className="flex flex-col items-center space-y-8 text-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="rounded-full bg-foreground/10 p-4"
        />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#1EB500]">Dieta<span className="text-white">.AI</span></h1>

        <p className="max-w-[700] text-lg text-muted-foreground sm:text-xl">Sua dieta personalizada com inteligência artificial</p>

        <Link href="/step">
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600">
            Gerar dieta
          </Button>
        </Link>
      </div>
    </main>
  );
}
