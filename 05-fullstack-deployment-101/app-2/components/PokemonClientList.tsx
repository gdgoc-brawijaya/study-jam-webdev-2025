'use client'; // Ini mendefinisikan bahwa komponen ini berjalan di Client (Browser)

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import PokemonCard from './PokemonCard';

interface Pokemon {
  name: string;
  url: string;
}

export default function PokemonClientList({ initialPokemon }: { initialPokemon: Pokemon[] }) {
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(20);

  // Filter Pokemon berdasarkan input search (berjalan sangat cepat di client)
  const filtered = useMemo(() => {
    if (!search) return initialPokemon;
    return initialPokemon.filter(p => p.name.includes(search.toLowerCase()));
  }, [search, initialPokemon]);

  // Handle pagination (Load More) di client-side
  const displayed = filtered.slice(0, limit);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Cari nama Pokemon..."
          className="block w-full pl-11 pr-4 py-4 border-2 border-transparent rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-900 transition-all shadow-sm text-lg"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setLimit(20); // Reset batas pagination ketika sedang mencari
          }}
        />
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {displayed.map((p) => (
          <PokemonCard key={p.name} name={p.name} url={p.url} />
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Tidak ada Pokemon yang cocok dengan "{search}"</p>
        </div>
      )}

      {/* Load More Button */}
      {limit < filtered.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setLimit(l => l + 20)}
            className="px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg active:scale-95 transform"
          >
            Muat Lebih Banyak
          </button>
        </div>
      )}
    </div>
  );
}
