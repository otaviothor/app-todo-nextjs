import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  id: string | string[];
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  res.status(200).json({ id });
};

export default handler;
