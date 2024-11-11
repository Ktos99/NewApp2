import React, { useState, useEffect } from "react";
//import { PDFViewer } from 'react-view-pdf';


import { Viewer, RenderPageProps } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';





const PDFViewBook = ({ match }) => {



  const [bookInfo, setBookInfo] = useState("");


  const defaultLayoutPluginInstance = defaultLayoutPlugin();




  useEffect(() => {
    const getUserBookInfo = async () => {

      try {
        const response = await fetch(`http://localhost:5000/shoppingcart/book/${match.params.book_id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        const parseRes = await response.json();

        //console.log(parseRes.book_price);
        setBookInfo(parseRes);
      } catch (err) {
        console.error(err.message);

      }

    }
    getUserBookInfo();
    //console.log(match);
  }, []);


  const renderPage = (RenderPageProps) => {
    return (
      <>
        {RenderPageProps.canvasLayer.children}
        {RenderPageProps.annotationLayer.children}
      </>
    );
  };

  return (
    <>
      {/* <PDFViewer url={bookInfo.book_pdfurl}/> */}
      {bookInfo.book_pdfurl && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        <Viewer fileUrl={bookInfo.book_pdfurl} plugins={[defaultLayoutPluginInstance]} renderPage={renderPage} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!bookInfo.book_pdfurl && <>No pdf file selected</>}
    </>
  )
}
export default PDFViewBook;