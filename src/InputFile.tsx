import { MdDeleteOutline } from "react-icons/md";
import { useId } from "react"

type setFile = (v?:File)=>void
function useInputFile(setFile: setFile) {
  return {
    change: (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files
      if (files == null || files.length == 0) return
      setFile(files[0])
    },
    remove: () => {
      setFile(undefined)
    }
  }
}

export default function InputFile({ file, setFile }: { file: File | undefined, setFile: setFile }){
  const Id = useId()
  const InputId = `${Id}-inp`
  const {change,remove} = useInputFile(setFile)


  return <div className="border border-dashed rounded-md bg-gray-100 border-gray-500 p-3 w-auto">
    {!file && <label htmlFor={InputId} className="w-full h-min text-center inline-block hover:bg-gray-300 p-2 rounded-md">
      ファイルを選択してください
    </label>}
    <input type="file" id={InputId} accept="image/*" onChange={change} className="hidden" />
    <ul>
      {
        file && <li className="flex flex-row justify-between hover:bg-gray-300 p-1 transition ease-in-out rounded-md">
          <span className="p-3">{file.name}</span>
          <button onClick={remove}>
            <span className="rounded-full hover:bg-red-300/50 inline-block border-3 p-3 align-bottom transition ease-in-out">
              <MdDeleteOutline />
            </span>
          </button>
        </li>
      }
    </ul>
  </div>
}