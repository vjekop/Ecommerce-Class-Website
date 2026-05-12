import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const getDb = () => {
  const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!dbUrl) throw new Error('Database not connected. Please check your environment variables.');
  return neon(dbUrl);
};

// CREATE
export async function POST(req: Request) {
  try {
    const sql = getDb();
    const body = await req.json();
    const { id, name, character, series, price, description, image, features } = body;
    
    // Ensure features is an array (if user types comma separated string)
    const featuresArray = Array.isArray(features) 
      ? features 
      : (typeof features === 'string' ? features.split(',').map((f: string) => f.trim()) : []);

    await sql`
      INSERT INTO products (id, name, character, series, price, description, image, features)
      VALUES (${id}, ${name}, ${character}, ${series}, ${price}, ${description}, ${image}, ${JSON.stringify(featuresArray)}::jsonb)
    `;
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// UPDATE
export async function PUT(req: Request) {
  try {
    const sql = getDb();
    const body = await req.json();
    const { id, name, character, series, price, description, image, features } = body;
    
    const featuresArray = Array.isArray(features) 
      ? features 
      : (typeof features === 'string' ? features.split(',').map((f: string) => f.trim()) : []);

    await sql`
      UPDATE products 
      SET name = ${name}, character = ${character}, series = ${series}, price = ${price}, description = ${description}, image = ${image}, features = ${JSON.stringify(featuresArray)}::jsonb
      WHERE id = ${id}
    `;
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: Request) {
  try {
    const sql = getDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) throw new Error('Product ID required');
    
    await sql`DELETE FROM products WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
