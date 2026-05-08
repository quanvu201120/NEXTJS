import BackButton from "@/components/back-button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-black relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 text-center px-6">
                {/* Số 404 với hiệu ứng Gradient */}
                <h1 className="text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-zinc-400 dark:from-white dark:to-zinc-600 select-none">
                    404
                </h1>

                <div className="mt-4 space-y-2">
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-[400px] mx-auto">
                        Có vẻ như đường dẫn bạn đang truy cập không tồn tại hoặc
                        đã được di chuyển sang một vũ trụ khác.
                    </p>
                </div>

                <div className="mt-10 flex items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="px-8 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-zinc-200 dark:shadow-none"
                    >
                        Về Trang Chủ
                    </Link>

                    <BackButton className="px-8 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-95">
                        Quay Lại
                    </BackButton>
                </div>
            </div>

            {/* Decorative text */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-300 dark:text-zinc-800 font-mono text-sm tracking-widest uppercase">
                Error Code: PAGE_NOT_FOUND
            </div>
        </div>
    );
}
