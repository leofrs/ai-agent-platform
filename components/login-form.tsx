"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/zod-schemas/login-schema";
import * as zod from "zod";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FormData = zod.infer<typeof loginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const { email, password } = data;

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
        setIsLoading(false);
        return;
      }

      const meRes = await fetch("/api/me");
      const data = await meRes.json();

      if (!meRes.ok) {
        toast(resData.message, {
          position: "top-right",
          style: {
            backgroundColor: "#f44336",
            color: "white",
          },
        });
        setIsLoading(false);
        return;
      }

      if (data.userRole === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (data.userRole === "USER") {
        router.push("/dashboard/user");
      } else {
        router.push("/unauthorized");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
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
          "Entrar"
        )}
      </button>

      <div className="text-center text-sm text-gray-500 mt-4">
        Não tem uma conta?{" "}
        <Link
          href="/register"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Cadastre-se
        </Link>
      </div>
    </form>
  );
};
