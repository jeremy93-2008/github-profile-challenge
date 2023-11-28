import { Header } from "./templates/Header";
import { Body } from "./templates/Body";

export function App() {
  return (
    <main className="flex flex-col h-screen bg-darkGrayGithub">
      <Header />
      <Body />
    </main>
  )
}
