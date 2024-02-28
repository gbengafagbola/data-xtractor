import Link from "next/link"

export default function Header() {
    return (
        <div className='pt-4 pl-4 ml-6'>
            <Link href="/"><h2 className='text-2xl pb-4'>Data Xtractor</h2></Link>
            <hr className='bg-[#D9D9D9]' />
        </div>
    )
}