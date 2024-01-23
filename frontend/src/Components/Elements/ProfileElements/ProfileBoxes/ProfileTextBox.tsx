export type ProfileTextBoxProps = {
  title: string;
  text: string;
};

function ProfileTextBox({ title, text }: ProfileTextBoxProps) {
  return (
    <div className="rounded-xl border border-black50 p-2">
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

export default ProfileTextBox;
