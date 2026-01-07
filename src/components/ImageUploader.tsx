import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  selectedConsoleName: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, selectedConsoleName }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelected(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
          Você escolheu: <span className="text-purple-400">{selectedConsoleName}</span>
        </h2>
        <p className="text-slate-400">
          Agora, envie uma selfie para transformarmos você!
        </p>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-4 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300
          flex flex-col items-center justify-center gap-4 group bg-slate-900/50
          ${dragActive 
            ? "border-purple-500 bg-purple-500/10 scale-105" 
            : "border-slate-700 hover:border-purple-400 hover:bg-slate-800"
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />

        <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-purple-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <div>
          <p className="text-lg font-bold text-white mb-1">Tirar foto ou Upload</p>
          <p className="text-sm text-slate-400">Arraste uma imagem ou clique para selecionar</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;