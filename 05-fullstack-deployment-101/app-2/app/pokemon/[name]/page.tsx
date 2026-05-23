import { getPokemonDetail } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Pemetaan warna berdasarkan Element Type Pokemon
const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-stone-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400 text-gray-900',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300 text-gray-900',
  fighting: 'bg-orange-700',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-indigo-800',
  dragon: 'bg-purple-600',
  dark: 'bg-gray-800',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-300 text-gray-900',
};

// Ini adalah Server Component, akan berjalan di Server saat route ini dipanggil
export default async function PokemonDetail({ params }: { params: { name: string } }) {
  // Fetch data berdasarkan parameter dynamic route (ex: /pokemon/bulbasaur)
  const pokemon = await getPokemonDetail(params.name);
  
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Pokedex
        </Link>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          {/* Header & Gambar */}
          <div className="bg-gray-50/50 p-10 flex justify-center relative border-b border-gray-100">
            <span className="absolute top-6 right-8 text-5xl font-extrabold text-gray-200 tracking-tighter">
              #{String(pokemon.id).padStart(3, '0')}
            </span>
            <Image 
              src={imageUrl} 
              alt={pokemon.name} 
              width={320} 
              height={320} 
              className="relative z-10 drop-shadow-xl" 
              priority 
            />
          </div>

          {/* Konten Detail */}
          <div className="p-8 sm:p-12">
            <h1 className="text-4xl font-extrabold capitalize text-gray-900 text-center mb-6 tracking-tight">
              {pokemon.name}
            </h1>

            {/* Type Badges */}
            <div className="flex justify-center gap-3 mb-10">
              {pokemon.types.map((t: any) => (
                <span 
                  key={t.type.name} 
                  className={`px-5 py-2 rounded-full text-white font-bold text-sm tracking-wide capitalize shadow-sm ${TYPE_COLORS[t.type.name] || 'bg-gray-500'}`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            {/* Fisik */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                <span className="block text-sm text-gray-500 font-semibold mb-1 uppercase tracking-wider">Tinggi</span>
                <span className="text-2xl font-extrabold text-gray-800">{pokemon.height / 10} m</span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                <span className="block text-sm text-gray-500 font-semibold mb-1 uppercase tracking-wider">Berat</span>
                <span className="text-2xl font-extrabold text-gray-800">{pokemon.weight / 10} kg</span>
              </div>
            </div>

            {/* Base Stats */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Base Stats</h3>
              <div className="space-y-4">
                {pokemon.stats.map((s: any) => {
                  // PokeAPI limit stat umumnya sampai 255
                  const statPercent = Math.min((s.base_stat / 255) * 100, 100);
                  // Warna bar berdasarkan besaran stat (Merah, Kuning, Hijau)
                  const barColor = 
                    s.base_stat >= 100 ? 'bg-green-500' : 
                    s.base_stat >= 50 ? 'bg-yellow-400' : 'bg-red-500';

                  return (
                    <div key={s.stat.name} className="flex items-center group">
                      <span className="w-32 text-sm font-semibold text-gray-500 capitalize group-hover:text-gray-900 transition-colors">
                        {s.stat.name.replace('-', ' ')}
                      </span>
                      <span className="w-12 text-sm font-extrabold text-gray-900 text-right mr-4">
                        {s.base_stat}
                      </span>
                      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div
                          className={`h-full ${barColor} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${statPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
