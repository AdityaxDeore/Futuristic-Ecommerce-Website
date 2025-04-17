import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { TShirtDesigner } from "@/components/TShirtDesigner"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Design Your Own T-Shirt</h1>
        <TShirtDesigner />
      </div>
      <Footer />
    </main>
  )
}
