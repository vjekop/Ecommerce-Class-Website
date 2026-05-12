import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { FALLBACK_PRODUCTS } from '@/lib/db';

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: 'DATABASE_URL is not set. Database not connected.' },
      { status: 500 }
    );
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    // 1. Create the table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        character VARCHAR(255) NOT NULL,
        series VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        features JSONB NOT NULL
      );
    `;

    // 2. Clear existing data to avoid duplicates on re-seed
    await sql`TRUNCATE TABLE products`;

    // 3. Insert the fallback products into the database
    for (const product of FALLBACK_PRODUCTS) {
      await sql`
        INSERT INTO products (id, name, character, series, price, description, image, features)
        VALUES (
          ${product.id}, 
          ${product.name}, 
          ${product.character}, 
          ${product.series}, 
          ${product.price}, 
          ${product.description}, 
          ${product.image}, 
          ${JSON.stringify(product.features)}::jsonb
        )
      `;
    }

    return NextResponse.json({ message: 'Database seeded successfully with 3 products!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
