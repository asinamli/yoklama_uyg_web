import YoklamaForm from '../YoklamaForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">Öğrenci Yoklama Sistemi</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <YoklamaForm />
      </main>
      
      <footer className="bg-gray-100 border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} - Öğrenci Yoklama Sistemi</p>
        </div>
      </footer>
    </div>
  );
}
