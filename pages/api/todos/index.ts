import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import { ResponseMethods } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseMethods = req.method as keyof ResponseMethods;
  const catcher = (error: Error) => res.status(500).json({ error });

  const handleCase: ResponseMethods = {
    GET: async (_, res: NextApiResponse) => {
      const { Todo } = await connect();
      res.json(await Todo.find().catch(catcher));
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect();
      res.json(await Todo.create(req.body).catch(catcher));
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No response for this request." });
};

export default handler;
