import React from 'react'
import { FaGoogle, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
         <div className="flex justify-center gap-4">
             {[FaGoogle, FaFacebookF, FaLinkedinIn, FaTwitter].map((Icon, index) => (
               <button
                 key={index}
                 className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition duration-200"
               >
                 <Icon className="text-gray-600 text-lg" />
               </button>
             ))}
           </div>
  )
}

export default Footer
