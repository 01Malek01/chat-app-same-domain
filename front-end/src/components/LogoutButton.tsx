import { BiLogOut } from "react-icons/bi";


export default function LogoutButton() {
  return (
   //mt-auto is used to push the button to the ((bottom))
    <div className="mt-auto">
      <BiLogOut className="w-6 h-6 text-white cursor-pointer"/>
    </div>
  )
}
