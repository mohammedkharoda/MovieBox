import { useEffect } from "react";
import { useTrailerKeyStore } from "@/store/store";

const TrailerModal = () => {
  const trailerKey = useTrailerKeyStore((state) => state.trailerKey);

  const handleCloseModal = () => {
    useTrailerKeyStore.setState({ trailerKey: null });
  };

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    });

    return () => {
      window.removeEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          handleCloseModal();
        }
      });
    };
  }, [trailerKey]);

  if (!trailerKey) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <iframe
          className="rounded-[30px] video-iframe"
          width="800"
          height="500"
          src={`https://www.youtube.com/embed/${trailerKey}?controls=0`}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
