import { HydrateClient } from "~/trpc/server";
import { SymptomInput } from "~/app/_components/SymptomInput";

export default function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-gray-50">
        <SymptomInput />
      </main>
    </HydrateClient>
  );
}
