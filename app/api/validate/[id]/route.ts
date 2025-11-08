import { NextResponse } from "next/server";
import { getRecordForPasswordCheck } from "@/lib/database/FileServices";

export async function GET(
  { params }: { params: { id: string } }
) {
  try {

    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'ID is mandatory' }, { status: 400 });
    }

    // 1. Validar el paquete (existencia y expiración)


    // fijarme si existe id
    // si existe id, fijarme q coincida password
    // si coincide fijarme q no haya expirado
    // si no coincide devolver invalid
    const record = await getRecordForPasswordCheck(id);
    console.log(record);
    if (!record) {
      return NextResponse.json(
        { response: 'invalid', file: null},
        { status: 200 }
      );
    }

    

  } catch (error) {
    console.error('Error al obtener metadata:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { error: 'Error interno del servidor', details: message },
      { status: 500 }
    );
  }
}