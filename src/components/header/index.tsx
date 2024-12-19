'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'

interface HeaderProps {
    step: string;
    title: string;
}

export function Header({ step, title }: HeaderProps) {
    const router = useRouter()

    return (
        <header className="bg-white rounded-b-[14px] mb-4 pt-8 pb-8 px-4">
            <div className="space-y-4">
                <div className="flex flex-row items-center gap-2">
                    <button
                        onClick={() => router.back()}
                        className="p-2 -ml-2 hover:bg-gray-100 rounded"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-lg">{step}</span>
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                    {title}
                </h1>
            </div>
        </header>
    )
}