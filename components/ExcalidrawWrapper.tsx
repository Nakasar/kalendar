"use client";

import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import React, { useEffect, useRef } from "react";
import {
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types";
import { resolvablePromise, ResolvablePromise } from "@/lib/utils";

const ExcalidrawWrapper: React.FC = () => {
  const [excalidrawAPI, setExcalidrawAPI] =
    React.useState<ExcalidrawImperativeAPI | null>(null);
  const initialStatePromiseRef = useRef<{
    promise: ResolvablePromise<ExcalidrawInitialDataState | null>;
  }>({ promise: null! });
  if (!initialStatePromiseRef.current.promise) {
    initialStatePromiseRef.current.promise =
      resolvablePromise<ExcalidrawInitialDataState | null>();
  }

  useEffect(() => {
    if (!excalidrawAPI) {
      return;
    }
    const fetchData = async () => {
      initialStatePromiseRef.current.promise.resolve({});
    };
    fetchData();
  }, [excalidrawAPI]);

  return (
    <Excalidraw
      excalidrawAPI={(api) => setExcalidrawAPI(api)}
      initialData={initialStatePromiseRef.current.promise}
      onChange={(elements, appState, files) => {
        console.log(appState);
        console.log(elements);
        console.log(files);
      }}
    ></Excalidraw>
  );
};
export default ExcalidrawWrapper;
