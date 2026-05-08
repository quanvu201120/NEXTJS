"use client";

export default function BackButton({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <button onClick={() => window.history.back()} className={className}>
            {children}
        </button>
    );
}
