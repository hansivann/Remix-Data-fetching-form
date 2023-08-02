import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { commitSession, getSession } from "../sessions";

export const meta = () => {
  return [
    { title: "Profile Page" },
    { name: "Form Exercise", content: "Form Exercise" },
  ];
};

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const title = session.get("title");
  const body = session.get("body");
  const userId = session.get("userId");
  const id = session.get("id");
  const username = session.get("username");

  const data = { title, body, userId, id, username };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Profile() {
  const data = useLoaderData();

  console.log(data);
  console.log(data.title);
  return (
    <>
      <div class="mt-56 sm:mx-auto sm:w-full sm:max-w-md">
        <div class=" bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-6 shadow rounded-lg sm:px-10">
          <h1 class="mb-16 mt-8 font-medium text-5xl">Profile</h1>
          <div key={data.id}>
            <p key={data.userId}>Name: {data.title}</p>
            <p>Body: {data.body} </p>
            <p>Username: {data.username}</p>
          </div>
        </div>
      </div>
    </>
  );
}
