import { neon } from '@neondatabase/serverless';

export interface Product {
  id: string;
  name: string;
  character: string;
  series: string;
  price: number;
  description: string;
  image: string;
  features: string[];
}

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'berserk',
    name: 'The Black Swordsman',
    character: 'Guts',
    series: 'Berserk',
    price: 129.99,
    description:
      'Premium 3D-printed Guts figurine. Hand-finished with industrial-grade resin and matte black coating. Every scar, every sinew — faithfully forged.',
    image: '/images/jakub-zerdzicki-4WwBMdcq-14-unsplash.jpg',
    features: ['Industrial Resin', 'Hand-Finished', 'Limited Edition'],
  },
  {
    id: 'ironman',
    name: 'The Armored Avenger',
    character: 'Tony Stark',
    series: 'Marvel Universe',
    price: 119.99,
    description:
      'Premium 3D-printed Iron Man figurine. Arc reactor LED detail with metallic gold & crimson finish. Stark Industries engineering at its finest.',
    image: '/images/jakub-zerdzicki-AR8vAAw8kv8-unsplash.jpg',
    features: ['LED Detail', 'Metallic Finish', 'Collector\'s Item'],
  },
  {
    id: 'drone',
    name: 'V-9 Scout Drone',
    character: 'Autonomous Recon',
    series: 'Future Warfare',
    price: 89.99,
    description:
      'Premium 3D-printed V-9 Scout Drone model. Stealth composite finish with articulated rotors. The silent eye of the battlefield, on your shelf.',
    image: '/images/karl-hornfeldt-pikP0UyB7I0-unsplash.jpg',
    features: ['Articulated Parts', 'Stealth Finish', 'Display Ready'],
  },
];

// Reusable function to fetch products
export async function getProducts(): Promise<Product[]> {
  // Use Neon if DATABASE_URL is configured
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`SELECT * FROM products ORDER BY price DESC`;
      
      // Parse the JSON features array from Postgres
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        character: row.character,
        series: row.series,
        price: Number(row.price),
        description: row.description,
        image: row.image,
        features: typeof row.features === 'string' ? JSON.parse(row.features) : row.features,
      })) as Product[];
    } catch (error) {
      console.error("Database connection failed, falling back to static data:", error);
      return FALLBACK_PRODUCTS;
    }
  }

  // Fallback to static data if no DB is configured
  return FALLBACK_PRODUCTS;
}
