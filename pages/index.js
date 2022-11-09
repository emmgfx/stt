import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import usePrevious from "../hooks/usePrevious";

const languages = {
  es: "Castellano",
  ca: "Català",
  en: "English",
};

export default function Home() {
  const [lang, setLang] = useState(Object.keys(languages)[0]);
  const prevLang = usePrevious(lang);

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    // resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: lang });

  const stopListening = () => SpeechRecognition.stopListening();

  // if (!browserSupportsSpeechRecognition) {
  //   return <div>This browser doesn't support speech recognition</div>;
  // }

  // if (!isMicrophoneAvailable) {
  //   return <div>Microphone isn't available</div>;
  // }

  // useEffect(() => {
  //   startListening();
  // }, []);

  useEffect(() => {
    if (prevLang === lang) return;
    if (!listening) return;
    stopListening();
    setTimeout(() => startListening(), 200);
  }, [startListening, stopListening, listening, prevLang, lang]);

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <div
          style={{
            width: "25px",
            height: "25px",
            backgroundColor: listening ? "red" : "#a8a8a8",
            borderRadius: "999px",
          }}
        />
        <button
          onClick={() => {
            listening ? stopListening() : startListening();
          }}
        >
          {listening ? "Dejar de escuchar" : "Escuchar"}
        </button>
        <select type="select" onChange={(e) => setLang(e.target.value)}>
          {Object.keys(languages).map((key, index) => {
            return (
              <option key={key} value={key}>
                {languages[key]}
              </option>
            );
          })}
        </select>
      </div>
      <div style={{ height: "1rem" }} />
      <div style={{ fontSize: "25px" }}>
        {finalTranscript}{" "}
        <span style={{ color: "gray" }}>{interimTranscript}</span>
      </div>
    </>
  );
}
