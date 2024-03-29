import { MediaResponse } from "../../generated";
import { BASE_PATH } from "../../generated/base";

interface MediaItemProps {
    media: MediaResponse,
}

const MediaItem: React.FC<MediaItemProps> = (props) => {
    return (
        <div className="media-item border w-40 h-40 ml-4 justify-center items-center">
            {props.media.type?.includes("image") ?
                <img className="object-cover h-full w-full" src={BASE_PATH + '/medias/getImage/' + props.media.id} alt={props.media.title} /> :
                <video controls className="object-cover h-full w-full">
                    <source src={`${BASE_PATH}/medias/getImage/${props.media.id}`} />
                </video>}
            <h3>{props.media.title}</h3>
        </div>
    );
};

export default MediaItem;