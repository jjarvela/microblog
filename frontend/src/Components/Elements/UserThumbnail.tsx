import { MdiDotsHorizontal } from "../Icons/MdiThreeDots";
import Button from "./Button";
import { ProfilePicture } from "./ProfilePicture";

type UserThumbnailProps = {
    profileName: string,
    username: string,
    userDescription: string,
    followers: number,
    following: number
};

function UserThumbnail ({profileName, username, userDescription, followers, following}: UserThumbnailProps) {
    return (
        <div className="thumbnail">
            <div className="flex justify-start">
                <ProfilePicture width={80} />
                <div className="flex-grow">
                    <div className="flex justify-between">
                        <div>
                            <div className="flex flex-grow px-3 justify-start h-fit">
                                    <h5 className="me-3 dark:text-white">{profileName}</h5>
                                    <p className="text-black50 pt-1.5">{username}</p>
                            </div>
                            <div className="flex flex-grow px-4 justify-start h-fit">
                                    <small className="me-3 font-semibold text-secondary">{followers} Followers</small>
                                    <small className="font-semibold text-black50">{following} Following</small>
                            </div>
                        </div>
                        <div className="flex justify-end content-start">
                            <Button class="btn-primary"><small>Follow</small></Button>
                            <Button class="btn-primary"><p><MdiDotsHorizontal /></p></Button>
                        </div>
                    </div>
                    <div className="mx-4">
                        <p className="text-black75 dark:text-white">{userDescription}</p>   
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserThumbnail;