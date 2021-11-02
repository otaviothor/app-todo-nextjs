// import { NextPage } from "next";
import Link from "next/link";
import { Todo } from "../utils/types";

interface IHomeProps {
  todos: Todo[];
}

const Home = (props: IHomeProps) => {
  const { todos } = props;
  return (
    <div>
      <h1>My todo list</h1>
      <h2>Click on todo to see it individually</h2>
      <Link href="/todos/create" passHref>
        <button>Create a New Todo</button>
      </Link>
      {todos.map((todo) => (
        <div key={todo?._id}>
          <Link href={`/todos/${todo?._id}`} passHref>
            <h3 style={{ cursor: "pointer" }}>
              {todo.item} - {todo.completed ? "completed" : "incompleted"}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(process.env.API_URL as string);
  const todos = await res.json();

  return {
    props: {
      todos,
    },
  };
};

export default Home;
