import { useState } from "react";

interface SketchfabModelProps {
  onPartSelected: (partName: string) => void;
}

export const SketchfabModel = ({ onPartSelected }: SketchfabModelProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden bg-gray-100">
      <div className="sketchfab-embed-wrapper w-full h-full">
        <iframe
          title="Realistic Human Body Model"
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/8eb6a0e9f3e64a3b9c2b5c5c5c5c5c5c/embed?autostart=1&preload=1&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1"
          onLoad={() => setIsLoading(false)}
        />
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading 3D model...</p>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-white bg-opacity-75">
        <p className="text-xs text-gray-600 text-center">
          <a
            href="https://sketchfab.com/3d-models/realistic-human-body-8eb6a0e9f3e64a3b9c2b5c5c5c5c5c5c?utm_medium=embed&utm_campaign=share-popup&utm_content=8eb6a0e9f3e64a3b9c2b5c5c5c5c5c5c"
            target="_blank"
            rel="nofollow"
            className="font-bold text-indigo-600 hover:text-indigo-800"
          >
            Realistic Human Body Model
          </a>{" "}
          by{" "}
          <a
            href="https://sketchfab.com/MedicalModels"
            target="_blank"
            rel="nofollow"
            className="font-bold text-indigo-600 hover:text-indigo-800"
          >
            MedicalModels
          </a>{" "}
          on{" "}
          <a
            href="https://sketchfab.com"
            target="_blank"
            rel="nofollow"
            className="font-bold text-indigo-600 hover:text-indigo-800"
          >
            Sketchfab
          </a>
        </p>
      </div>
    </div>
  );
}; 