'use client'

import { Header } from "@/components/header"
import { Input } from "@/components/input"
import { Button } from "@/components/ui/button"

import { useDataStore } from "@/store/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Zod schema for form validation
const schema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório" }),
    weight: z.string().min(1, { message: "O peso é obrigatório" }),
    age: z.string().min(1, { message: "A idade é obrigatória" }),
    height: z.string().min(1, { message: "A altura é obrigatória" }),
})

// Type inference from Zod Schema
type FormData = z.infer<typeof schema>

export default function Step() {
    const router = useRouter()
    const setPageOne = useDataStore(state => state.setPageOne)

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    function handleCreate(data: FormData) {
        console.log("Passando Dados da Página 1")

        setPageOne({
            name: data.name,
            weight: data.weight,
            age: data.age,
            height: data.height,
        })

        router.push('/create')
    }

    return (
        <div className="flex flex-col flex-1 bg-background">
            <Header step="Passo 1" title="Dados pessoais" />

            <div className="px-4 flex-1">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-lg font-bold text-white">Nome:</label>
                        <Input
                            name="name"
                            control={control}
                            placeholder="Digite seu nome"
                            error={errors.name?.message}
                            type="text"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-bold text-white">Peso Atual:</label>
                        <Input
                            name="weight"
                            control={control}
                            placeholder="Digite seu peso (Ex.: 75)"
                            error={errors.weight?.message}
                            type="number"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-bold text-white">Altura atual:</label>
                        <Input
                            name="height"
                            control={control}
                            placeholder="Digite sua altura (Ex.: 1.90)"
                            error={errors.height?.message}
                            type="number"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-bold text-white">Idade atual:</label>
                        <Input
                            name="age"
                            control={control}
                            placeholder="Digite sua idade"
                            error={errors.age?.message}
                            type="number"
                        />
                    </div>

                    <Button
                        onClick={handleSubmit(handleCreate)}
                        className="w-full mt-4"
                        disabled={!isValid}
                    >
                        Avançar
                    </Button>
                </div>
            </div>
        </div>
    )
}
