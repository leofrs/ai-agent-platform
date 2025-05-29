import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-6">
          Página não encontrada
        </h2>
        <p className="text-gray-500 mb-8">
          Não foi possível encontrar o recurso solicitado. O link pode estar
          quebrado ou a página foi removida.
        </p>
        <Link
          href="/auth"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium transition-all hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
