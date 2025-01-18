// app/api/calculate/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { rentValue, commissionPercentage } = await request.json();

  if (!rentValue || !commissionPercentage) {
    return NextResponse.json(
      { error: 'Valores de aluguel e percentual são obrigatórios.' },
      { status: 400 }
    );
  }

  const commission = (rentValue * commissionPercentage) / 100;

  return NextResponse.json({ commission });
}