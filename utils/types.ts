import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseMethods {
  GET?: (req: NextApiRequest, res: NextApiResponse) => void;
  POST?: (req: NextApiRequest, res: NextApiResponse) => void;
  PUT?: (req: NextApiRequest, res: NextApiResponse) => void;
  DELETE?: (req: NextApiRequest, res: NextApiResponse) => void;
}

export interface Todo {
  _id?: string;
  item: string;
  completed: boolean;
}
