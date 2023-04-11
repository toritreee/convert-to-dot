import { useCallback, useEffect, useRef, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import InputFile from "./InputFile";
import fileToImage from "./fileToImage";
import Preview from "./Preview";
import ViewConfig, { config } from "./Config";
import { DotWorker } from "./worker/client";
import { Loading } from "./Loading";
import { MdBalance } from "react-icons/md";

function useApp() {
  const [images, setImages] = useState<{
    file?: File,
    inputImage?: HTMLImageElement
  }>({})
  const { file, inputImage } = images
  const [outputImage, setOutputImage] = useState<HTMLImageElement|number>()


  const [config, setConfig] = useState<config>({ dotRoughness: 10 });
  const remake = useCallback(() => {
    if (inputImage) {
      setOutputImage(10)
      new DotWorker(inputImage, config.dotRoughness).convert().then((v) => {
        setOutputImage(v.image);
      });
    }
  }, [images, config]);

  useEffect(() => {
    if (file != undefined) {
      fileToImage(file).then((v) => {
        setImages({ ...images, inputImage: v });
      });
    } else {
      setImages({ ...images, inputImage: undefined });
    }
    setOutputImage(undefined)
  }, [file]);
  useEffect(() => {
    setOutputImage(undefined);
  }, [config]);
  return {
    setFile: (v?:File)=>setImages({...images,file:v}),
    inputImage,
    outputImage,
    config,
    setConfig,
    remake,
    file,
  };
}

function App() {
  const { setFile, file, inputImage, outputImage, config, setConfig, remake } =
    useApp();
  return (
    <div className="flex items-center flex-col w-full">
      <header className="flex min-h-24 py-10 w-full bg-slate-300 items-center justify-center flex-col gap-5">
        <h1 className="text-4xl">ドット絵製造機</h1>
        <p>ドット絵を生成します。何故かFirefoxでは動きません</p>
      </header>
      <main className="w-[70%] max-w-5xl flex flex-col gap-4 min-h-screen mt-3">
        <InputFile setFile={setFile} file={file} />
        {inputImage &&
          <div className="grid grid-rows-3 grid-cols-1 md:grid-rows-1 md:grid-cols-3 w-auto">
            {inputImage && <Preview image={inputImage} />}
            <ViewConfig config={config} setConfig={setConfig} />
            {outputImage
              ? typeof outputImage === "number"
                ? <Loading pars={outputImage}/>
                : (<Preview image={outputImage} />)
              : (<button onClick={remake}>変換</button>)
            }
          </div>
        }
      </main>
      <footer className="flex flex-col items-baseline pl-[20%] bg-slate-300 w-full p-8">
        <a href="https://github.com/toritreee/convert-to-dot" className="flex align-bottom pb-[2px] hover:pb-0 hover:border-b-2 border-cyan-950"><AiFillGithub className="w-7 h-7" />/convert-to-dot</a>
        <a href="https://github.com/toritreee" className="pb-[2px] hover:pb-0 hover:border-b-2 border-cyan-950"> by @toritreee</a>
        <p className="flex align-bottom"><MdBalance className="w-7 h-7" />Apache License 2.0</p>
      </footer>
    </div>
  );
}

export default App;
