import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import { ResponseMethods } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseMethods = req.method as keyof ResponseMethods;
  const { id } = req.query;
  const catcher = (error: Error) => res.status(500).json({ error });

  const handleCase: ResponseMethods = {
    GET: async (_, res: NextApiResponse) => {
      const { Todo } = await connect();
      res.json(await Todo.findById(id).catch(catcher));
    },
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect();
      res.json(
        await Todo.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher)
      );
    },
    DELETE: async (_, res: NextApiResponse) => {
      const { Todo } = await connect();
      res.json(await Todo.findByIdAndRemove(id).catch(catcher));
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No response for this request." });
};

export default handler;
