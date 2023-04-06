import { useId } from "react"

type setFile = (v: File) => void

function useInputFile(setFile:setFile) {
  return {
    change: (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files
      if (files == null || files.length == 0) return
      setFile(files[0])
    }
  }
}

export default function InputFile({setFile}:{setFile:setFile}){
  const Id = useId()
  const InputId = `${Id}-inp`
  const {change} = useInputFile(setFile)


  return <div>
    <label htmlFor={InputId}></label>
    <input type="file" id={InputId} accept="image/*" onChange={change}/>
  </div>
}