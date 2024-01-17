type UsernameRepostProps = {
  username: string;
};

function UsernameRepost(props: UsernameRepostProps) {
  return (
    <div className="mb-1 flex">
      <div>
        <p className="text-black50">{props.username} reposted</p>
      </div>
    </div>
  );
}

export default UsernameRepost;
