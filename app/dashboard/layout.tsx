import {SidebarAdmin} from '@/app/_components/Sidebar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
    <SidebarAdmin/>
    <div className='md:ml-[300px] w-full'>
    {children}
    </div>
    </div>
  )
}
