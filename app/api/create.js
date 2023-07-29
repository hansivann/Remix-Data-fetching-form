

//get data from db.json
export async function getProfile() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");


  console.log(response)
  return response.json();
}


// export async function addProfile(){

// }