"use client";
import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function Unauthorized() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = "/";
    }
  }, [countdown]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="text-red-500" size={64} />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Acesso Não Autorizado
        </h2>

        <div className="w-16 h-1 bg-red-500 mx-auto my-4 rounded"></div>

        <p className="text-gray-600 mb-6">
          Você não possui permissão para acessar esta página. Verifique suas
          credenciais ou entre em contato com o administrador do sistema.
        </p>

        <div className="mb-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            Voltar ao Início
          </button>
        </div>

        <div className="text-sm text-gray-500">
          Redirecionamento automático em {countdown} segundos
          <div className="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-1 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
