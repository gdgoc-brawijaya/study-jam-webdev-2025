import { getPokemonList } from '@/lib/api';
import PokemonClientList from '@/components/PokemonClientList';

// Ini adalah Server Component (Default di App Router)
// Data di-fetch langsung di server dan dikirim sebagai props ke Client Component
export default async function Home() {
  // Untuk keperluan demo yang interaktif namun cepat, 
  // kita fetch 151 Pokemon pertama (Generasi 1)
  const data = await getPokemonList(151);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
            PokeExplorer
          </h1>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Next.js 14 Demo
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            Generasi 1 Pokédex
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Cari dan jelajahi 151 Pokemon original. Demo interaktif untuk memahami rendering pada Client Component & Server Component di Next.js.
          </p>
        </div>

        {/* Client Component untuk Search & Render Interaktif */}
        <PokemonClientList initialPokemon={data.results} />
      </main>
    </div>
  );
}
