import { BiLogOut } from "react-icons/bi";
import { useLoggout } from "../ApiHooks/useLoggout";


export default function LogoutButton() {
  const { logout } = useLoggout();
  return (
   //mt-auto is used to push the button to the ((bottom))
    <div className="mt-auto">
      <BiLogOut onClick={logout} className="w-6 h-6 text-white cursor-pointer"/>
    </div>
  )
}
