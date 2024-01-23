export type ProfileTextBoxProps = {
  title: string;
  text: string;
};

function ProfileTextBox({ title, text }: ProfileTextBoxProps) {
  return (
    <div
      draggable
      className="min-h-[16rem] break-inside-avoid-column rounded-xl border border-black50 p-2"
    >
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

export default ProfileTextBox;
