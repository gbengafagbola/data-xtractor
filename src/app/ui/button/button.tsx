import Link from "next/link";

export default function StartButton() {
    return (
        <div className='flex justify-end'>
            <Link href="/xtractor">
            <button className="animate-bounce m-7 px-5 py-4 text-white rounded-3xl bg-gray-700">
                Extract Data
                <span className="ml-2 relative flex-end h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-200 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-200"></span>
                </span>
            </button>
            </Link>
        </div>
    )
}