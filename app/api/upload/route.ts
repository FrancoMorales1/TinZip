import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File as FormidableFile } from 'formidable';
import { createFileRecord } from '@/lib/database/FileServices';
import { IFileRecord } from '@/models/FileRecord';
import { NextRequest, NextResponse } from 'next/server';

const url = `${process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : `${process.env.RENDER_URL}/download`}`

  export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) return new Response(JSON.stringify({ error: 'No se subió ningún archivo' }), { status: 400 });

    const ownerEmail = formData.get('origin')?.toString();
    const passwordHash = formData.get('password_hash')?.toString();

    if (!ownerEmail || !passwordHash)
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400 });

    const fileData: IFileRecord = {
      originalFilename: file.name,
      fileSizeInBytes: file.size,
      ownerEmail,
      passwordHash,
      title: formData.get('title')?.toString(),
      description: formData.get('description')?.toString(),
      recipientEmails: formData.get('recipients') ? JSON.parse(formData.get('recipients')!.toString()) : [],
    };

    const newFile = await createFileRecord(fileData);

    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `${process.env.RENDER_URL ?? ''}/download`;

    return new Response(JSON.stringify({ link: `${url}/${newFile.id}` }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: (err as Error).message || 'Error desconocido' }), { status: 500 });
  }
}
