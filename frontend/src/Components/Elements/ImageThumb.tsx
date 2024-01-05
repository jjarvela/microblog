import "./imgThumb.css";

type ImageThumbProps = {
  image: Media;
  width: number;
  height: number;
};
export default function ImageThumb({ image, width, height }: ImageThumbProps) {
  return (
    <div className="img-thumb" style={{ width: width, height: height }}>
      <img
        id={image.id}
        src={image.source}
        style={{ minWidth: width, minHeight: height }}
      ></img>
    </div>
  );
}
