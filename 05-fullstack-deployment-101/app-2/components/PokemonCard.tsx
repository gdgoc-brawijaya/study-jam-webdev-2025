import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  // Mengekstrak ID dari URL (contoh: "https://pokeapi.co/api/v2/pokemon/1/")
  const segments = url.split('/').filter(Boolean);
  const id = segments[segments.length - 1];
  
  // Mengambil gambar official-artwork dengan resolusi yang bagus
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link 
      href={`/pokemon/${name}`} 
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      <div className="bg-gray-50/50 aspect-square p-6 relative flex items-center justify-center border-b border-gray-100">
        <Image
          src={imageUrl}
          alt={name}
          width={150}
          height={150}
          className="group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
          priority={Number(id) <= 20} // Prioritaskan render gambar untuk Pokemon awal
        />
      </div>
      <div className="p-4 text-center">
        <span className="text-xs text-gray-400 font-mono font-medium block mb-1">
          #{String(id).padStart(3, '0')}
        </span>
        <h3 className="capitalize font-bold text-gray-800 text-lg">
          {name}
        </h3>
      </div>
    </Link>
  );
}
