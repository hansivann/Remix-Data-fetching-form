
export async function getProfile() {
  const response = await fetch ("")

  console.log(response)
  return response.json();
}
