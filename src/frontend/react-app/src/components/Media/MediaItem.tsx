import { MediaResponse } from "../../generated";

interface MediaItemProps {
    media: MediaResponse,
}

const MediaItem: React.FC<MediaItemProps> = (props) => {
    return (
        <div className="media-item">
            <img src={props.media.url} alt={props.media.title} />
            <h3>{props.media.title}</h3>
        </div>
    );
};

export default MediaItem;