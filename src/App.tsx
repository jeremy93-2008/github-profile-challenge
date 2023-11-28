import { Header } from "./templates/Header";
import { Body } from "./templates/Body";

export function App() {
  return (
    <main className="flex flex-col min-h-screen bg-darkGrayGithub">
      <Header />
      <Body />
    </main>
  )
}
