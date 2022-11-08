import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Home() {
  const {
    transcript,
    interimTranscript,
    // finalTranscript,
    // resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "ca" });
  };
  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  // if (!browserSupportsSpeechRecognition) {
  //   return <div>This browser doesn't support speech recognition</div>;
  // }

  // if (!isMicrophoneAvailable) {
  //   return <div>Microphone isn't available</div>;
  // }

  // useEffect(() => {
  //   startListening();
  // }, []);

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
      </div>
      <div style={{ height: "1rem" }} />
      <div style={{ fontSize: "25px" }}>{transcript}</div>
    </>
  );
}
