import { LuLoader } from "react-icons/lu";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <main className='flex flex-col'>
            <div className='flex gap-2 h-[calc(100vh-61px)] justify-center items-center'>
                <LuLoader className="animate-spin text-primary" size={150} />
            </div>
        </main>

    );
}