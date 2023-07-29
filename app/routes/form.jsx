import { useLoaderData, Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { getSource } from "../api/source";
//import { addProfile } from "../api/create";


//server side
//loader
export async function loader() {
  return getSource();
}

//action
export async function action({ request }) {
  let formData = await request.formData();

  let profile = {
    title: formData.get("name"),
    body: formData.get("description"),
  };

  console.log(profile)
  
   fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: profile.title,
      body: profile.body,
      userId: 1
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));


  return redirect('/profile')
}



//render
export default function Formm() {
  const data = useLoaderData();

  const handleSubmit = ((e) => {
    e.preventDefault()
  });
  
  return (
    <div>
      <Form method="post" >
        <fieldset>
          <b>Sign Up Form</b> <br />
          <label>
            Name <br />
            <input name="name" type="text" required/>
          </label>
          <p>
            <label>
              Body <br />
              <input name="description" required/>
            </label>
          </p>
          <p>
            <label>
              Username <br />
              <select>
                <option></option>
                {data.map((user) => {
                  return (
                    <option value="username" key={user.id}>
                      {user.username}
                    </option>
                  );
                })}
              </select>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" name="human" value="true" required/> I am Human
            </label>
          </p>
          <p>
            <button type="submit" onSubmit={handleSubmit}>Submit</button>
          </p>
        </fieldset>
      </Form>
    </div>
  );
}
