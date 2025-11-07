
// app/api/products/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db.getAll();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}
