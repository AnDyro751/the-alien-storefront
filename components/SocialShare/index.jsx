/**
 * Copyright (c) 2021 Angel Mendez - Anture
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {FaFacebookF, FaTwitter, FaPinterest, FaWhatsapp} from 'react-icons/fa'
import {IoLogoWhatsapp} from 'react-icons/io'
const SocialShare = () => {
    return(
        <div className="w-full flex space-x-10 items-center mt-4 md:mt-8" >
            <div className="w-auto" >
                <a href="#" target="_blank" className="p-2">
                    <FaFacebookF 
                    className="text-gray-800"
                    size={20}/>
                </a>
            </div>
            <div className="w-auto" >
                <a href="#" target="_blank" className="p-2">
                    <FaTwitter 
                    className="text-gray-800"
                    size={20}/>
                </a>
            </div>
            <div className="w-auto" >
                <a href="#" target="_blank" className="p-2">
                    <FaPinterest 
                    className="text-gray-800"
                    size={20}/>
                </a>
            </div>
            <div className="w-auto" >
                <a href="#" target="_blank" className="p-2">
                    <IoLogoWhatsapp
                    className="text-gray-800"
                    size={20}/>
                </a>
            </div>
        </div>
    )
}

export default SocialShare