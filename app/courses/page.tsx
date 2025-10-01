"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

type Course = {
  id: number;
  title: string;
  description: string;
};

async function getCourses(): Promise<Course[]> {
  try {
    const res = await fetch("/api/courses", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getCourses();
      setCourses(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="p-10">
        <h2 className="text-3xl font-bold mb-6">Available Courses</h2>
        {loading ? (
          <p className="text-gray-500">Loading courses...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div
                  key={course.id}
                  className="border p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No courses available</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
