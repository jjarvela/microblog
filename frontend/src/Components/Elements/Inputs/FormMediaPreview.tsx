import MaterialSymbolsDeleteForeverOutlineRounded from "../../Icons/MaterialSymbolsDeleteForeverOutlineRounded";

interface FormMediaPreviewProps {
  file: File;
  handleDelete: (file: File) => void;
}

export default function FormMediaPreview({
  file,
  handleDelete,
}: FormMediaPreviewProps) {
  const url = URL.createObjectURL(file);

  return (
    <div className="relative h-[8rem] w-[8rem] overflow-hidden rounded-xl border-[1px] border-black50">
      <MaterialSymbolsDeleteForeverOutlineRounded
        className="absolute right-[0.2rem] top-[0.2rem] cursor-pointer text-lg text-black75 hover:text-primary"
        onClick={() => {
          handleDelete(file);
        }}
      />
      {file.type.includes("image") ? (
        <img
          className="min-h-[100%] min-w-[100%] object-cover"
          src={url}
          onDrop={() => URL.revokeObjectURL(url)}
        />
      ) : (
        <video
          className="min-h-[100%] min-w-[100%] object-cover"
          src={url}
          onDrop={() => URL.revokeObjectURL(url)}
        />
      )}
    </div>
  );
}
