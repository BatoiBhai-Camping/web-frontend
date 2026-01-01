import './App.css'
import { Button } from "@/components/ui/button"
import AppSideBar from './components/AppSideBar'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Profile from './components/Profile'
import CreatePackage from './components/CreatePackage'
import AllPackages from './components/AllPackages'
import UpdatePackage from './components/UpdatePackage'
import AllBookings from './components/AllBookings'

function App() {
  return (
    <>
      <SidebarProvider>
        <AppSideBar />
        <div className="flex-1 overflow-x-hidden">
          <div className=' w-full flex gap-5 rounded-lg px-4 py-1.5 justify-between items-center bg-gray-100'>
            <div className='p-1 bg-white rounded-[50%]'><SidebarTrigger /></div>
            <div className=' flex justify-center items-center gap-2'>
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>@</AvatarFallback>
              </Avatar>
              <div className='flex flex-col justify-center items-start'>
                <h3 className=''>User Full Name</h3>
                <p className=' text-sm text-gray-500'>example@kk.com</p>
              </div>
            </div>
          </div>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/create_package' element={<CreatePackage/>}/>
            <Route path='/all_packages' element={<AllPackages/>}/>
            <Route path='/update_package' element={<UpdatePackage/>}/>
            <Route path='/all_bookings' element={<AllBookings/>}/>
          </Routes>
        </div>
      </SidebarProvider>
    </>
  )
}

export default App
