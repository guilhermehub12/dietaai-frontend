'use client'

import { Header } from "@/components/header"
import { Select } from "@/components/input/select"
import { Button } from "@/components/ui/button"
import { useDataStore } from "@/store/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Zod schema
const schema = z.object({
    gender: z.string().min(1, { message: "O sexo é obrigatório" }),
    objective: z.string().min(1, { message: "O objetivo é obrigatório" }),
    level: z.string().min(1, { message: "Selecione o seu level" }),
})

type FormData = z.infer<typeof schema>

export default function Create() {
    const router = useRouter()
    const setPageTwo = useDataStore(state => state.setPageTwo)

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const genderOptions = [
        { label: "Masculino", value: "masculino" },
        { label: "Feminino", value: "feminino" },
    ]

    const levelOptions = [
        { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
        { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
        { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
        { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
    ]

    const objectiveOptions = [
        { label: 'Emagrecer', value: 'emagrecer' },
        { label: 'Hipertrofia', value: 'Hipertrofia' },
        { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
        { label: 'Definição', value: 'Definição' },
    ]

    function handleCreate(data: FormData) {
        setPageTwo({
            level: data.level,
            gender: data.gender,
            objective: data.objective
        })
        router.push("/nutrition")
    }

    return (
        <div className="flex flex-col flex-1 bg-background">
            <Header
                step='Passo 2'
                title='Finalizando dieta'
            />

            <div className="px-4 flex-1">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-lg font-bold text-white">Sexo:</label>
                        <Select
                            control={control}
                            name="gender"
                            placeholder="Selecione o seu sexo..."
                            error={errors.gender?.message}
                            options={genderOptions}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-bold text-white">Selecione nível de atividade física:</label>
                        <Select
                            control={control}
                            name="level"
                            placeholder="Selecione o nível de atividade física"
                            error={errors.level?.message}
                            options={levelOptions}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-lg font-bold text-white">Selecione seu objetivo:</label>
                        <Select
                            control={control}
                            name="objective"
                            placeholder="Selecione seu objetivo"
                            error={errors.objective?.message}
                            options={objectiveOptions}
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