'use client'

import { api } from "@/service/api"
import { useDataStore } from "@/store/data"
import { useQuery } from "@tanstack/react-query"
import { Data } from "@/types/data"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Clock, Copy, HeartIcon, Receipt } from "lucide-react"
import { useState } from "react"

interface ResponseData {
    data: Data
}

export default function Nutrition() {
    const router = useRouter()
    const user = useDataStore(state => state.user)
    const [copied, setCopied] = useState(false)

    const { data, isFetching, error } = useQuery({
        queryKey: ["nutrition"],
        queryFn: async () => {
            try {
                if (!user) {
                    throw new Error("Failed to load nutrition");
                }

                const response = await api.post<ResponseData>("/create", {
                    name: user.name,
                    age: user.age,
                    gender: user.gender,
                    height: user.height,
                    weight: user.weight,
                    objective: user.objective,
                    level: user.level
                })

                return response.data.data
            } catch (error) {
                console.error(error)
                throw error
            }
        }
    })

    function handleCopyDiet() {
        if (!data) return

        const supplements = `${data?.suplementos.map(item => ` ${item}`)}`
        const foods = `${data?.refeicoes.map(item => `\n- Nome: ${item.nome}\n- Horário: ${item.horario}\n- Alimentos: ${item.alimentos.map(alimento => ` ${alimento}`)}`)}`
        const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica Suplemento: ${supplements}`

        navigator.clipboard.writeText(message)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (isFetching) {
        return (
            <div className="flex flex-1 bg-background justify-center items-center">
                <div className="text-center">
                    <h2 className="text-xl text-white mb-2">Estamos gerando sua dieta!</h2>
                    <p className="text-lg text-white">Consultando IA...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-1 bg-background justify-center items-center">
                <div className="text-center">
                    <h2 className="text-xl text-white mb-2">Falha ao gerar dieta!</h2>
                    <Button onClick={() => router.push('/')}>
                        Tente novamente
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-background flex-1">
            {/* Header */}
            <div className="bg-white rounded-b-[14px] pt-16 pb-5 mb-4">
                <div className="flex flex-row items-center justify-between px-4">
                    <h1 className="text-3xl font-bold text-background">Minha dieta</h1>
                    <Button
                        onClick={handleCopyDiet}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Copy className="h-4 w-4" />
                        {copied ? 'Copiado!' : 'Copiar'}
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 flex-1">
                {data && Object.keys(data).length > 0 && (
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-xl font-bold text-white">Nome: {data.nome}</h2>
                            <p className="text-lg text-white">Foco: {data.objetivo}</p>
                        </div>

                        {/* Meals */}
                        <div className="bg-white p-4 rounded-lg space-y-4">
                            <h3 className="text-lg font-bold">Refeições:</h3>
                            {data.refeicoes.map((refeicao) => (
                                <div
                                    key={refeicao.nome}
                                    className="bg-gray-100 p-4 rounded-md space-y-2"
                                >
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-bold">{refeicao.nome}</h4>
                                        <Receipt className="h-5 w-5" />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        <p>Horário: {refeicao.horario}</p>
                                    </div>

                                    <div className="mt-2">
                                        <p className="font-semibold">Alimentos:</p>
                                        {refeicao.alimentos.map(alimento => (
                                            <p key={alimento} className="pl-2">{alimento}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Supplements */}
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="text-lg font-bold mb-2">Dica suplementos:</h3>
                            {data.suplementos.map(item => (
                                <p key={item}>{item}</p>
                            ))}
                        </div>

                        {/* New Diet Button */}
                        <Button
                            onClick={() => router.replace("/")}
                            className="w-full"
                        >
                            Gerar nova dieta
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}