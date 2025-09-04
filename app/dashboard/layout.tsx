import {SidebarDemo} from '@/app/_components/Sidebar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
    <SidebarDemo/>
    <div className='ml-[300px] w-full'>
    {children}
    </div>
    </div>
  )
}
