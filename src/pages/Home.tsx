import React, { useState, useCallback } from "react";
import { ConsoleOption, ProcessingState } from "../../types";
import { CONSOLES } from "../../constants";
import ConsoleButton from "../components/ConsoleButton";
import ImageUploader from "../components/ImageUploader";
import { generateConsoleAvatar } from "../../services/geminiService";
import museu15AnosPng from "../assets/images/museu_15_anos.png";

const Home: React.FC = () => {
  const [selectedConsole, setSelectedConsole] = useState<ConsoleOption | null>(
    null
  );
  const [processingState, setProcessingState] =
    useState<ProcessingState>("idle");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleConsoleSelect = useCallback((consoleData: ConsoleOption) => {
    setSelectedConsole(consoleData);
    setProcessingState("idle");
    setResultImage(null);
    setErrorMsg(null);
  }, []);

  const scrollToViewRef = useCallback(
    (node: HTMLDivElement | HTMLElement | null) => {
      if (node !== null) {
        // requestAnimationFrame is cleaner than setTimeout for UI tasks
        // as it aligns with the browser's paint cycle
        requestAnimationFrame(() => {
          node.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }
    },
    []
  );

  const handleImageUpload = async (file: File) => {
    if (!selectedConsole) return;

    setProcessingState("processing");
    setErrorMsg(null);

    try {
      const generatedImageUrl = await generateConsoleAvatar(
        file,
        selectedConsole.name
      );
      setResultImage(generatedImageUrl);
      setProcessingState("completed");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "Ops! A Nano Banana escorregou em um pixel. Tente novamente."
      );
      setProcessingState("error");
    }
  };

  const resetApp = () => {
    setSelectedConsole(null);
    setProcessingState("idle");
    setResultImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden pb-20 mt-5">
      <div className="animate-scanline fixed inset-0 pointer-events-none z-50"></div>

      <header className="relative w-full min-h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b-4 border-purple-900 bg-black py-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/1920/1080?grayscale&blur=2"
            alt="Museu VideoGame Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-black/80"></div>
        </div>

        <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto flex flex-col items-center">
          <div className="w-full flex flex-col items-center justify-center mb-8 min-h-[100px]">
            {!imageError ? (
              <img
                src={museu15AnosPng}
                alt="Museu do VideoGame Itinerante - 15 Anos"
                className="w-auto max-h-[40vh] max-w-full object-contain drop-shadow-[0_0_35px_rgba(168,85,247,0.25)] hover:scale-[1.02] transition-transform duration-700"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="animate-fade-in">
                <div className="inline-block px-4 py-1 mb-4 border border-purple-500 rounded-full bg-purple-900/30 backdrop-blur-sm animate-pulse">
                  <span className="text-purple-300 font-bold tracking-wider text-xs md:text-sm">
                    COMEMORAÇÃO 15 ANOS
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-retro leading-snug md:leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                  MUSEU DO VIDEOGAME
                  <br />
                  ITINERANTE
                </h1>
              </div>
            )}
          </div>

          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-light tracking-wide">
            Viaje no tempo através dos pixels.{" "}
            <br className="hidden md:block" />
            Descubra sua versão na história dos games.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 -mt-10 relative z-20">
        {processingState !== "completed" && (
          <section className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-slate-800 shadow-2xl mb-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                O museu tá de aniversário, qual console você escolheria pro tema
                da festa?
              </h2>
              <p className="text-slate-400">
                Escolha o seu console favorito abaixo:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {CONSOLES.map((consoleItem) => (
                <ConsoleButton
                  key={consoleItem.id}
                  consoleData={consoleItem}
                  isSelected={selectedConsole?.id === consoleItem.id}
                  onClick={handleConsoleSelect}
                />
              ))}
            </div>
          </section>
        )}

        <div>
          {selectedConsole && processingState === "idle" && (
            <section
              ref={(el) => scrollToViewRef(el)}
              className="bg-slate-900 rounded-3xl p-8 border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)] animate-fade-in-up"
            >
              <ImageUploader
                onImageSelected={handleImageUpload}
                selectedConsoleName={selectedConsole.name}
              />
            </section>
          )}
        </div>

        {processingState === "processing" && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-40 h-40 mb-8 relative animate-pulse flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-600/30 blur-2xl rounded-full"></div>
              {!imageError ? (
                <img
                  src={museu15AnosPng}
                  alt="Carregando..."
                  className="w-full h-full object-contain relative z-10"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-6xl relative z-10">👾</span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Preparando a festa com Nano Banana...
            </h3>
            <p className="text-slate-400">
              Reimaginando sua foto no tema {selectedConsole?.name}
            </p>
          </div>
        )}

        {processingState === "error" && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <p className="text-red-400 text-xl mb-4 font-bold">GAME OVER</p>
            <p className="text-white mb-6">{errorMsg}</p>
            <button
              onClick={() => setProcessingState("idle")}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors"
            >
              TRY AGAIN
            </button>
          </div>
        )}

        {processingState === "completed" && resultImage && selectedConsole && (
          <section
            className="max-w-4xl mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 animate-fade-in"
            ref={(el) => el?.scrollIntoView({ behavior: "smooth" })}
          >
            <div className="p-[0.15rem] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500">
              <div className="bg-slate-950 p-4 m-1 md:p-12 text-center rounded-2xl">
                <div className="mb-8">
                  <h2 className="font-retro text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-green-500 mb-2">
                    LEVEL COMPLETED!
                  </h2>
                  <p className="text-slate-400">
                    Sua festa tema {selectedConsole.name} está pronta.
                  </p>
                </div>

                <div className="relative inline-block group">
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${selectedConsole.gradient.replace(
                      "bg-",
                      "from-"
                    )} to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}
                  ></div>
                  <div className="relative">
                    <img
                      src={resultImage}
                      alt="Generated Avatar"
                      className="rounded-lg shadow-2xl max-h-[60vh] w-auto mx-auto border-4 border-slate-900"
                    />
                    <div className="absolute bottom-4 right-4 w-24 md:w-32 opacity-90 drop-shadow-lg filter brightness-110">
                      {!imageError ? (
                        <img
                          src={museu15AnosPng}
                          alt="Museu 15 Anos"
                          className="w-full h-auto object-contain"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <div className="text-white font-retro text-[10px] bg-black/50 px-2 py-1 border border-white/20 rounded">
                          MUSEU 15 ANOS
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
                  <a
                    href={resultImage}
                    download={`museu-15anos-${selectedConsole.id}.png`}
                    className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    SALVAR IMAGEM
                  </a>
                  <button
                    onClick={resetApp}
                    className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-transform hover:scale-105 flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v3.25a1 1 0 11-2 0V13.011a7.002 7.002 0 01-11.378-2.618 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                    JOGAR NOVAMENTE
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="mt-20 py-8 text-center text-slate-500 text-sm relative z-20 bg-slate-950 border-t border-slate-900">
        <p>© 2024 Museu do VideoGame Itinerante. 15 Anos de História.</p>
        <p className="mt-1">Powered by Gemini Nano Banana</p>
      </footer>
    </div>
  );
};

export default Home;
