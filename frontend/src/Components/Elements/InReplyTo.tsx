type InReplyToProps = {
  username: string;
};

function InReplyTo(props: InReplyToProps) {
  return (
    <div className="ml-5 flex">
      <div>
        <p className="text-black50">In reply to {props.username}'s post</p>
      </div>
    </div>
  );
}

export default InReplyTo;
