import { BiSearch } from "react-icons/bi";


export default function SearchInput() {
  return (
    <form className=" flex items-center gap-2">
      <input type="text" placeholder="Search" className="input input-bordered rounded  w-full" />
      <button type="submit" className="btn btn-primary"><BiSearch /></button>
    </form>
  )
}
