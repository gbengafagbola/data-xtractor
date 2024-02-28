'use client'
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import preprocessImage from '../lib/image-processor';
import Header from '../ui/header/header';
import Image from 'next/image';
import DataModal from '../component/modal/modal';

interface ScannedData {
  fullName: string;
  address: string;
  issuanceDate: string;
  expirationDate: string;
}

const IndexPage: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState("");
  const [rawData, setRawData] = useState("");
  const [xtract, setXtract] = useState(false);

  const takeSnapshot = async () => {
    setXtract(true)

    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc)
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    ctx?.drawImage(imageRef.current as HTMLImageElement, 0, 0);
    ctx?.putImageData(preprocessImage(canvas), 0, 0);
    const dataUrl = canvas?.toDataURL("image/jpeg");

    if (dataUrl) {
      try {
        setProgress(0);
        const { data: { text } } = await Tesseract.recognize(
          dataUrl,
          'eng',
          {
            logger: (info) =>
              setProgress(info.progress)
          }
        );

        // console.log(text)
        setIsOpen(true)
        parseLicenseData(text);
        setRawData(text)

        // console.log(isOpen)

      } catch (error) {
        console.error('Error during OCR:', error);
      }
    }
  };


  const parseLicenseData = (text: string) => {
    const fullNameMatch = text.match(/Full Name:(.*?)\n/);
    const addressMatch = text.match(/(?:Address:|Mailing Address:)(.*?)\n/);
    const issuanceDateMatch = text.match(/Issued:(.*?)\n/);
    const expirationDateMatch = text.match(/Expires:(.*?)\n/);

    const fullName = fullNameMatch ? fullNameMatch[1] : "";
    const address = addressMatch ? addressMatch[1] : "";
    const issuanceDate = issuanceDateMatch ? issuanceDateMatch[1] : "";
    const expirationDate = expirationDateMatch ? expirationDateMatch[1] : "";
    setScannedData({ fullName, address, issuanceDate, expirationDate });
  };


  const sendToAPI = (fullName: string, address: string, issuanceDate: string, expirationDate: string) => {
    // TODO: Implement logic to send data to API
    console.log('Sending data to API:', { fullName, address, issuanceDate, expirationDate });
  };

  return (
    <div className='max-h-screen'>
      <Header />
      <div className="flex flex-col items-center">
        <div className="grid grid-rows-2 grid-flow-col gap-8">

          <div className="row-span-2 items-center  justify-center">
            <h1 className='text-lg py-4'>Scan License</h1>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={640}
              height={580}
              mirrored={false}
              screenshotQuality={1}
            />
            <div className="flex justify-center">
              <button className='px-5 py-4 m-7 text-white rounded-3xl bg-gray-700  hover:bg-gray-900 cursor-pointer active:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-100' onClick={takeSnapshot}>
                Scan Your License
              </button>
            </div>
          </div>

          {xtract && (
            <>
              {scannedData && (
                <DataModal isOpen={isOpen} rawData={rawData} setIsOpen={setIsOpen} scannedData={scannedData} />
              )}

              <div className="col-span-2">
                <h6 className='pt-4'>captured image</h6>
                <progress value={progress} max={1} style={{ position: 'relative', marginBottom: '4px', width: '650px', height: '2px' }} />

                <div style={{ position: 'relative', width: '650px', height: '230px' }}>
                  <Image
                    alt="img"
                    src={image}
                    ref={imageRef}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>

              <div className="row-span-1 col-span-2">
                <h6 className='py-2'>processed image</h6>
                <canvas ref={canvasRef} width={650} height={200} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default IndexPage;
