import { useRouter } from "next/router";
import { useState } from "react";
import { Todo } from "../../utils/types";

interface Props {
  todo: Todo;
  url: string;
}

const Show = (props: Props) => {
  const [todo, setTodo] = useState<Todo>(props.todo);
  const router = useRouter();

  const handleComplete = async () => {
    if (!todo.completed) {
      const newTodo: Todo = {
        ...todo,
        completed: true,
      };

      await fetch(`${props.url}/${todo?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      setTodo(newTodo);
    }
  };

  const handleDelete = async () => {
    await fetch(`${props.url}/${todo?._id}`, {
      method: "DELETE",
    });

    router.push("/");
  };

  return (
    <div>
      <h1>{todo.item}</h1>
      <h2>{todo.completed ? "completed" : "incomplete"}</h2>
      <button onClick={handleComplete}>Complete</button>
      <button onClick={handleDelete}>Delete</button>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const url = process.env.API_URL;
  const res = await fetch(`${url}/${context.query.id}`);
  const todo = res.json();

  return {
    props: {
      todo,
      url,
    },
  };
};

export default Show;
