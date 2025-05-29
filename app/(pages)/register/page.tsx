import { RegisterForm } from "@/components/register-form";

<main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
  <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <h2 className="text-2xl font-bold text-white text-center">Entrar</h2>
      <p className="text-blue-100 text-center mt-2">
        Preencha os campos abaixo para começar
      </p>
    </div>
    <RegisterForm />
  </div>
</main>;
