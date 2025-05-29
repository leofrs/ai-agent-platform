"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/zod-schemas/register-schema";
import * as zod from "zod";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FormData = zod.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const { name, email, password } = data;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const resData = await res.json();

      if (!res.ok) {
        toast(resData.message, {
          position: "top-right",
          style: {
            backgroundColor: "#f44336",
            color: "white",
          },
        });
        return;
      }

      toast(resData.message, {
        position: "top-right",
        style: {
          backgroundColor: "#4caf50",
          color: "white",
        },
      });

      router.push("auth");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast("Erro inesperado. Tente novamente mais tarde.", {
        position: "top-right",
        style: {
          backgroundColor: "#f44336",
          color: "white",
        },
      });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-gray-700 block"
        >
          Nome completo
        </label>
        <input
          {...register("name")}
          placeholder="Digite seu nome"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-700 block"
        >
          Email
        </label>
        <input
          {...register("email")}
          placeholder="seu@email.com"
          type="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-700 block"
        >
          Senha
        </label>

        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {errors.password?.message && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password?.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center"
      >
        {isLoading ? (
          <LoaderCircle className="animate-spin w-5 h-5" />
        ) : (
          "Criar conta"
        )}
      </button>

      <div className="text-center text-sm text-gray-500 mt-4">
        Já tem uma conta?{" "}
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Entrar
        </Link>
      </div>
    </form>
  );
};
