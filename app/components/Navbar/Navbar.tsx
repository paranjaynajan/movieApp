import Image from "next/image"
import Navimage from "@/public/assets/images/logo1.png"

const NavbarComponent = () => {
    return <nav className="bg-[#0B536D]  w-full flex justify-center items-center py-10 h-[70px]">
        <Image src={Navimage} className="h-auto rounded-md object-contain w-auto" alt="logo" />
    </nav>
}
export default NavbarComponent