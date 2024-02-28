import { instructions } from '@/app/lib/information-data';
import Image from "next/image";
import StartButton from '../button/button';

export default function InstructionCard() {
  return (
    <div className='mt-9 flex flex-col'>
      {instructions.map((instruction, i) => {
        return (
          <div key={instruction.id} className="relative flex bg-clip-border shadow-xs w-full max-w-[68rem] flex-row">
            <div className="w-2/5 overflow-hidden mb-5 bg-gray-700 rounded-r-none bg-clip-border items-center shrink-0">

              <Image
                src={instruction.image_url}
                alt={`${instruction.title}'s profile picture`}
                className="object-cover mx-auto"
                width={180}
                height={100}
              />
            </div>

            <div className="p-6">
              <h4 className="block mb-2 text-2xl antialiased font-semibold leading-snug tracking-normal">
                <span className=''> {instruction.id}. </span> {instruction.title}
              </h4>
              <p className="block mb-8 text-base antialiased font-normal leading-relaxed dark:text-gray-500">
                {instruction.body}
              </p>

              <div>
                <hr className='-my-1 bg-[#D9D9D9] w-full' />
                <hr className={`${instruction.margin} bg-[#D9D9D9] h-2 w-1/3`} />
              </div>

            </div>
          </div>
        )
      })}
      <StartButton />
    </div>
  )
}