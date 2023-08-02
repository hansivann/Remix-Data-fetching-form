import {
  useLoaderData,
  Form,
  useNavigation,
  useRouteError,
  isRouteErrorResponse
} from "@remix-run/react";
import { fetch, redirect } from "@remix-run/node";
import { getSource } from "../api/source";
import { getSession, commitSession } from "../sessions";

export const meta = () => {
  return [
    { title: "Sign Up Form" },
    { name: "Form Exercise", content: "Form Exercise" },
  ];
};

//server side
//loader
export async function loader() {
  return getSource();
}
//action
export async function action({ request }) {
  let formData = await request.formData();
  const value = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: formData.get("name"),
      body: formData.get("description"),
      userId: 1,
      username: formData.get("username"),
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (data) => {


      // put session
      //session
      const title = data.title;
      const body = data.body;
      const id = data.id;
      const userId = data.userId;
      const username = data.username;

      const session = await getSession(request.headers.get("Cookie"));

      session.set("title", title);
      session.set("body", body);
      session.set("id", id);
      session.set("userId", userId);
      session.set("username", username);

      return redirect("/profile", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    })
    .catch((error) => console.log("There is something wrong with the Post", error))
  return value;
}

//render
export default function Formm() {
  const data = useLoaderData();
  let navigation = useNavigation();
  let busy =
    navigation.state === "submitting"
      ? "Submitting.."
      : navigation.state === "idle"
      ? "Submit"
      : "";

  return (
    <div className="mt-56 sm:mx-auto sm:w-full sm:max-w-md ">
      <div className=" bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-6 shadow rounded-lg sm:px-10">
        <Form method="post" class="mb-0 space-y-6">
          <b class="mb-16 mt-8 font-medium text-2xl">Sign Up Form</b> <br />
          <label class="block text-sm font-medium text-gray-700">
            Name <br />
            <div class="mt-1">
              <input
                name="name"
                type="text"
                required
                class="peer ... w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-300 focus-ring-1 focus:ring-orange-300 "
              />
            </div>
          </label>
          <p>
            <label class="block text-sm font-medium text-gray-700">
              Body <br />
              <input
                name="description"
                required
                class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-300 focus-ring-1 focus:ring-orange-300"
              />
            </label>
          </p>
          <p>
            <label class="block text-sm font-medium text-gray-700">
              Username <br />
              <select
                name="username"
                required
                class="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-300 focus-ring-1 focus:ring-orange-300"
              >
                <option value="">Please select</option>
                {data.map((user) => {
                  return (
                    <option name="username" key={user.name.children}>
                      {user.username}
                    </option>
                  );
                })}
              </select>
            </label>
          </p>
          <p class="flex items-center">
            <input
              type="checkbox"
              name="human"
              value="true"
              required
              class="mr-1 rounded border-gray-300 focus:ring-orange-500"
            />{" "}
            <label class="ml-1 block text-sm text-gray-900">I am Human</label>
          </p>
          <p>
            <button
              type="submit"
              class="bg-orange-400 hover:bg-orange-500 text-white font-medium text-sm py-2 px-4 rounded focus:ring-4 "
            >
              {busy}
            </button>
          </p>
        </Form>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p> 
      </div>
    );
    
  }

  let errorMessage = "Unknown error";
  if (error) {
    errorMessage = error.message;
  }

  return (
    <div className="m-8 text-2xl ">
      <h1 className="mb-4">Oops..</h1>
      <p className=" pb-11 ">Something went wrong..</p>
      <div className=" mt-4 sm:mx-auto sm:w-full sm:max-w-md ">
        <pre className=" mt-4 ml-4 text-rose-400 text-sm">{errorMessage}</pre>
      </div>
    </div>
  );
}
