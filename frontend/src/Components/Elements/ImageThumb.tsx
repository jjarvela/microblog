type ImageThumbProps = {
  image: string;
  width: number;
  height: number;
};
export function ImageThumb({ image, width, height }: ImageThumbProps) {
  return (
    <div className="img-thumb" style={{ width: width, height: height }}>
      <img src={image} style={{ minWidth: width, minHeight: height }}></img>
    </div>
  );
}
