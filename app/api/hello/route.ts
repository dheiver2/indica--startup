import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { rentValue, commissionPercentage } = await request.json();

    // Validação dos campos
    if (!rentValue || !commissionPercentage) {
      return NextResponse.json(
        { error: 'Por favor, preencha todos os campos.' },
        { status: 400 }
      );
    }

    // Cálculo da comissão
    const commission = (rentValue * commissionPercentage) / 100;

    // Retorna a resposta com a comissão calculada
    return NextResponse.json({ commission }, { status: 200 });
  } catch (error) {
    // Tratamento de erros
    return NextResponse.json(
      { error: 'Erro ao processar a requisição.' },
      { status: 500 }
    );
  }
}
