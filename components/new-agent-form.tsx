"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agentFormSchema } from "@/lib/zod-schemas/agent-form-schema";
import * as zod from "zod";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FormData = zod.infer<typeof agentFormSchema>;

interface INewAgentFormProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NewAgentForm = (props: INewAgentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(agentFormSchema),
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isOpen, setIsOpen } = props;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    /* const { name, email, password } = data;

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
    } */
  };

  const closeModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
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
          htmlFor="name"
          className="text-sm font-medium text-gray-700 block"
        >
          Instructions
        </label>
        <textarea
          {...register("instructions")}
          placeholder="Você é um agente de inteligência artificial que ajuda os usuários a encontrar o melhor lugar para viajar."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
        />
        {errors.instructions?.message && (
          <p className="text-red-500 text-sm mt-1">
            {errors.instructions?.message}
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

      <button
        type="button"
        onClick={closeModal}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center"
      >
        Cancelar
      </button>
    </form>
  );
};
