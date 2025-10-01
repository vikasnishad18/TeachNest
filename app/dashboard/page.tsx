"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type Course = {
  id: number;
  title: string;
  description: string;
};

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  async function fetchCourses() {
    const res = await fetch("/api/courses");
    const data = await res.json();
    setCourses(data);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      fetchCourses();
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
    if (res.ok) fetchCourses();
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingCourse) return;

    const res = await fetch(`/api/courses/${editingCourse.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editingCourse.title,
        description: editingCourse.description,
      }),
    });

    if (res.ok) {
      setEditingCourse(null);
      fetchCourses();
    }
  }

  return (
    <div>
      <Navbar />
      <main className="p-10">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
          Admin Dashboard
        </h2>

        {/* Add Course Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-6 rounded-xl shadow-xl border 
                     bg-gradient-to-br from-blue-50 to-indigo-100 
                     space-y-4 mb-10"
        >
          <h3 className="text-2xl font-bold text-indigo-900 text-center">
            Add New Course
          </h3>
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-indigo-300 p-3 w-full rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       bg-white text-gray-900 placeholder-gray-500"
            required
          />
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-indigo-300 p-3 w-full rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       bg-white text-gray-900 placeholder-gray-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold 
                       px-6 py-3 rounded-lg hover:bg-indigo-700 
                       transition shadow-md"
          >
            ➕ Add Course
          </button>
        </form>

        {/* Course List */}
        <h3 className="text-3xl font-bold mb-6 text-gray-900">Manage Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-5 rounded-xl shadow-md border bg-white 
                         hover:shadow-lg transition flex justify-between items-center"
            >
              <div>
                <h4 className="font-bold text-xl text-gray-900">
                  {course.title}
                </h4>
                <p className="text-gray-700">{course.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingCourse(course)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg 
                             hover:bg-yellow-600 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg 
                             hover:bg-red-700 transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {editingCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Edit Course
              </h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  value={editingCourse.title}
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, title: e.target.value })
                  }
                  className="border border-yellow-400 p-3 w-full rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <textarea
                  value={editingCourse.description}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      description: e.target.value,
                    })
                  }
                  className="border border-yellow-400 p-3 w-full rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingCourse(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    ✅ Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}