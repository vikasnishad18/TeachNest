import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to <span className="text-blue-600">CRUD App</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Manage your courses, students, and data with ease. A simple project built using Next.js + MySQL.
        </p>
        <a
          href="/courses"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          Explore Courses
        </a>
      </main>
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 py-16">
        <div className="p-6 border rounded-lg shadow hover:shadow-lg">
          <h3 className="text-xl font-bold mb-2">Create</h3>
          <p>Add new courses or users easily.</p>
        </div>
        <div className="p-6 border rounded-lg shadow hover:shadow-lg">
          <h3 className="text-xl font-bold mb-2">Read</h3>
          <p>View all records in a simple dashboard.</p>
        </div>
        <div className="p-6 border rounded-lg shadow hover:shadow-lg">
          <h3 className="text-xl font-bold mb-2">Update / Delete</h3>
          <p>Modify or remove data instantly.</p>
        </div>
      </section>
      <footer className="bg-gray-100 text-center py-6 mt-12">
        <p className="text-gray-600">© 2025 CRUD App. Built with ❤️ using Next.js & MySQL.</p>
      </footer>
    </div>
  );
}
