"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { meetingFormSchema } from "@/lib/zod-schemas/meeting-form-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IAgents } from "@/db/agents-prisma";

type FormData = zod.infer<typeof meetingFormSchema>;

interface INewAgentFormProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  agents: IAgents[];
}

export const NewMeetingForm = (props: INewAgentFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(meetingFormSchema),
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isOpen, setIsOpen, agents } = props;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log("dados do form de marcar reunião:", data);
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
          Titulo
        </label>
        <input
          {...register("title")}
          placeholder="Qual o nome da reunião?"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
        />
        {errors.title?.message && (
          <p className="text-red-500 text-sm mt-1">{errors.title?.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-gray-700 block"
        >
          Agente
        </label>

        <Controller
          control={control}
          name="agent"
          rules={{ required: "Selecione um agente" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um agente" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
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
