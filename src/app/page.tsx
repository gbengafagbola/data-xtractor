import Header from "./ui/header/header";
import InstructionCard from "./ui/instruction-card/instruction-card";

export default function Home() {
  return (
    <main className="max-h-screen">
     <Header />
      <div className="flex flex-col items-center pl-24 pr-24">
        <InstructionCard />
      </div>
    </main>
  );
}
