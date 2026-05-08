"use client";

import { ProductApiRequest } from "@/apiRequest/product";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Trash2, Check, RotateCcw } from "lucide-react";

export default function DeleteProduct({ id }: { id: number }) {
    const [isConfirming, setIsConfirming] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isConfirming) {
            timeout = setTimeout(() => setIsConfirming(false), 3000);
        }
        return () => clearTimeout(timeout);
    }, [isConfirming]);

    const handleDelete = async () => {
        try {
            await ProductApiRequest.delete(id);
            router.refresh();
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            {!isConfirming ? (
                // TRẠNG THÁI 1: Tối giản, chỉ có Icon và Text mờ
                <button
                    onClick={() => setIsConfirming(true)}
                    className="group flex items-center gap-2 px-4 py-2 text-zinc-400 transition-all hover:text-red-500 active:scale-90"
                >
                    <Trash2 className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    <span className="text-sm font-medium tracking-tight">
                        Xóa
                    </span>
                </button>
            ) : (
                // TRẠNG THÁI 2: Hiện đại, Glassmorphism
                <div className="flex items-center gap-2 animate-in fade-in zoom-in-90 duration-300">
                    <button
                        onClick={handleDelete}
                        className="relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-red-600 to-rose-500 px-5 py-2 text-white shadow-lg shadow-red-500/40 transition-all hover:brightness-110 active:scale-95"
                    >
                        <Check className="h-4 w-4 stroke-[3px]" />
                        <span className="text-xs font-bold uppercase tracking-widest">
                            Xác nhận
                        </span>

                        {/* Hiệu ứng tia sáng quét qua (Shimmer) */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </button>

                    <button
                        onClick={() => setIsConfirming(false)}
                        className="group flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-all hover:bg-zinc-200 hover:text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    >
                        <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-45" />
                    </button>
                </div>
            )}
        </div>
    );
}
