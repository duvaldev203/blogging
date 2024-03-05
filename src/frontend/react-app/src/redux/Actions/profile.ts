import { useSelector } from "react-redux";
import { UPLOAD_IMAGE } from "../../constants/APP_CONSTANTS";
import { UserControllerApi, UserResponse } from "../../generated";
import { ReduxProps } from "../configureStore";
import { TOKEN_LOCAL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY } from "../../constants/LOCAL_STORAGE";

const state = useSelector((state:ReduxProps) => state);
const user : UserResponse = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '{}');
const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;

const profileApi = new UserControllerApi({...state.environment, accessToken: token});
const profileId: number = user.profile?.id ? user.profile?.id : 0; 
export const updateProfile = (imageData : any) => async (dispatch : any) => {
    if ( imageData.entries().next().value[1] != null ) {
        const response = profileApi.changeProfileForm(profileId, imageData);
        dispatch({
            type: UPLOAD_IMAGE,
            payload: (await response).data
        });
    }
}