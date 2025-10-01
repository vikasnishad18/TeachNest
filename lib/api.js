export async function getCourses() {
  const res = await fetch("http://localhost:3000/api/courses");
  return res.json();
}

export async function addCourse(course, token) {
  const res = await fetch("http://localhost:3000/api/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(course)
  });
  return res.json();
}
