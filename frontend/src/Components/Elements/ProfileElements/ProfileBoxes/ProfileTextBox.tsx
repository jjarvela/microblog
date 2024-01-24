export type ProfileTextBoxProps = {
  title: string;
  text: string;
};

function ProfileTextBox({ title, text }: ProfileTextBoxProps) {
  return (
    <div
      draggable
      className="flex min-h-[16rem] flex-col gap-4 rounded-xl border border-black50 p-4"
    >
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

export default ProfileTextBox;
