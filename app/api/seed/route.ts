import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { FALLBACK_PRODUCTS } from '@/lib/db';

export async function GET() {
  const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!dbUrl) {
    return NextResponse.json(
      { error: 'Neither POSTGRES_URL nor DATABASE_URL is set in Vercel. Please check your Storage tab.' },
      { status: 500 }
    );
  }

  try {
    const sql = neon(dbUrl);

    // 1. Create/Update the table with model columns
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        character VARCHAR(255) NOT NULL,
        series VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        features JSONB NOT NULL,
        model_path VARCHAR(255) DEFAULT '/models/berserk.glb',
        model_scale NUMERIC(4, 2) DEFAULT 1.0
      );
    `;

    // Ensure columns exist (in case table was already created)
    try {
      await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS model_path VARCHAR(255) DEFAULT '/models/berserk.glb'`;
      await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS model_scale NUMERIC(4, 2) DEFAULT 1.0`;
    } catch (e) {
      // Columns might already exist, ignore
    }

    // 2. Clear existing data to avoid duplicates on re-seed
    await sql`TRUNCATE TABLE products`;

    // 3. Insert the fallback products into the database
    for (const product of FALLBACK_PRODUCTS) {
      await sql`
        INSERT INTO products (id, name, character, series, price, description, image, features, model_path, model_scale)
        VALUES (
          ${product.id}, 
          ${product.name}, 
          ${product.character}, 
          ${product.series}, 
          ${product.price}, 
          ${product.description}, 
          ${product.image}, 
          ${JSON.stringify(product.features)}::jsonb,
          ${product.model_path},
          ${product.model_scale}
        )
      `;
    }

    return NextResponse.json({ message: 'Database seeded successfully with 3 products and model paths!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
