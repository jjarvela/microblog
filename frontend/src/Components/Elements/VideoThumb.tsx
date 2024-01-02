import "./vidThumb.css";
import { MaterialSymbolsPlayCircleOutline } from "../Icons/MaterialSymbolsPlayIconOutline";

type VidThumbProps = {
  video: string;
  width: number;
  height: number;
};
export function VideoThumb({ video, width, height }: VidThumbProps) {
  return (
    <div className="vid-thumb" style={{ width: width, height: height }}>
      <div className="play-icon text-black25">
        <MaterialSymbolsPlayCircleOutline />
      </div>
      <div className="vid-container">
        <video src={video}></video>
      </div>
    </div>
  );
}
