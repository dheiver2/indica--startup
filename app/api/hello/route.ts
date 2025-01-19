// pages/api/calculate.ts (ou app/api/calculate/route.ts)
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { rentValue, commissionPercentage } = req.body;

    if (!rentValue || !commissionPercentage) {
      return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
    }

    const commission = (rentValue * commissionPercentage) / 100;
    return res.status(200).json({ commission });
  } else {
    return res.status(405).json({ error: 'Método não permitido.' });
  }
}
