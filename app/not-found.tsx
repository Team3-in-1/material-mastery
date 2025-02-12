import '@/styles/global.css'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className=' flex items-center justify-center w-full h-full z-[1] relative bg-[#f1f3f5] flex-col'>
      <h2 className=' text-[50px] font-mono opacity-50'>404 - Not Found</h2>
      <Link href='/'>Return Home</Link>
    </div>
  )
}
