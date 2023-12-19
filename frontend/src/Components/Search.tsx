import UserThumbnail from "./Elements/UserThumbnail";

const Search = () => {
    return(
        <div className="container">
            <h2>This is the main hub for search</h2>
    
            <UserThumbnail 
                profileName="Test User" 
                username="@text" 
                userDescription="this si test"
                followers={5}
                following={23} />
        </div>
    );
};

export default Search;