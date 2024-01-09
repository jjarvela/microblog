import "./vidThumb.css";
import { MaterialSymbolsPlayCircleOutline } from "../Icons/MaterialSymbolsPlayIconOutline";

type VidThumbProps = {
  video: Media;
  width: number;
  height: number;
};
export default function VideoThumb({ video, width, height }: VidThumbProps) {
  return (
    <div className="vid-thumb" style={{ width: width, height: height }}>
      <div className="play-icon text-black25">
        <MaterialSymbolsPlayCircleOutline width={width} height={height} />
      </div>
      <div className="vid-container">
        <video id={video.id} src={video.source}></video>
      </div>
    </div>
  );
}
