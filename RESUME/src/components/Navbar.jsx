import { LayoutTemplate } from "lucide-react";
import React from "react";
import { Link } from 'react-router-dom'
import { ProfileInfoCard } from "./Cards";


const Navbar = () => {
  return (
    <div className='h-16 bg-[radial-gradient(circle_at_1px_1px,rgba(139,92,246,0.2)_1px,transparent_0),radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.18)_1px,transparent_0),radial-gradient(circle_at_1px_1px,rgba(236,72,153,0.15)_1px,transparent_0)] bg-[length:20px_20px,30px_30px,25px_25px] bg-[position:0_0,10px_10px,15px_5px] bg-[#000000]  border-zinc-500 backdrop-blur-xl border-b border-violet-100/50 py-2.5 px-4 md:px-0 sticky top-0 z-50'>
        <div className='max-w-6xl ms-auto flex items-center justify-between gap-5'>
            <Link to='/' className="flex items-center justify-between gap-5">
                <div className="flex items-center pb-6 gap-3" >
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-fuchsia-600 rounded-md flex items-center justify-center shadow-sm shadow-violet-200" >
                        <LayoutTemplate className="w-5 h-5 text-white"/>    
                    </div> 

                    <span className="text-xl sm:text-2xl font-black bg-gradient-to-t from-yellow-600 to-fuchsia-600 bg-clip-text text-transparent">
                        ReX    
                    </span>  
                </div>           
            </Link>

            <ProfileInfoCard/>
        </div>
      
    </div>
  )
}

export default Navbar
