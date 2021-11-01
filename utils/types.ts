export interface ResponseMethods {
  GET?: () => void;
  POST?: () => void;
  PUT?: () => void;
  DELETE?: () => void;
}

export interface Todo {
  _id?: string;
  item: string;
  completed: boolean;
}
