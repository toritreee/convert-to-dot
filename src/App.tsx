import { useEffect, useRef, useState } from 'react'

import Dot from './dot'
import InputFile from './InputFile'
import fileToImage from './fileToImage'
import Preview from './Preview'
import ViewConfig, { config } from './Config'

function useApp() {
  const [file,setFile] = useState<File>()
  const [image,setImage] = useState<HTMLImageElement>()
  const [config, setConfig] = useState<config>({dotRoughness: 10})

  useEffect(() => {
    if(file==null)return
    fileToImage(file).then((v) => {
      setImage(v)
    })
  },[file])
  return {
    setFile,
    inputImage: image,
    outputImage: image//config.dotRoughness, image.width, image.height
      ? new Dot(image, config.dotRoughness, image.width, image.height).convert()
      : undefined,
    config,
    setConfig
  }
}

function App() {
  const {setFile,inputImage,outputImage,config,setConfig} = useApp()
  return <main>
    <InputFile setFile={setFile} />
    {inputImage ? <Preview image={inputImage} /> : undefined}
    {outputImage ? <Preview image={outputImage} /> : undefined}
    <ViewConfig config={config} setConfig={setConfig}/>
  </main>
}

export default App
