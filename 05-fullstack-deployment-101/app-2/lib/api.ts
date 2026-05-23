export const POKE_API_BASE = 'https://pokeapi.co/api/v2';

// Server-side fetching: Mengambil list Pokemon (Gen 1)
export async function getPokemonList(limit = 151) {
  const res = await fetch(`${POKE_API_BASE}/pokemon?limit=${limit}`);
  
  if (!res.ok) {
    throw new Error('Gagal mengambil data list Pokemon');
  }
  
  return res.json();
}

// Server-side fetching: Mengambil detail satu Pokemon
export async function getPokemonDetail(name: string) {
  const res = await fetch(`${POKE_API_BASE}/pokemon/${name.toLowerCase()}`);
  
  if (!res.ok) {
    throw new Error(`Gagal mengambil data Pokemon: ${name}`);
  }
  
  return res.json();
}
