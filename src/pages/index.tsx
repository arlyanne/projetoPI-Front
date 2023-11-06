import {

  ActionFunction,

} from "react-router-dom";

export default function Home() {

  return (
    <div>
     
    </div>
  );
}

// Se utilizar o nome em minusculo, desabilita o hmr.
export async function Loader() {
  return (await fetch("https://jsonplaceholder.typicode.com/todos/1")).json();
}

export const Action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("Nome:", data);
  return {
    body: "Deu tudo certo",
    ok: true,
  };
};
