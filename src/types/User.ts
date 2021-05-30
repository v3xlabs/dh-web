import { Room } from "./Room";

export type User = {
    id?: string;
    username?: string;
    avatar?: string;
    bio?: string;
    follower_count?: number;
    following_count?: number;
    current_room: Room;
    online?: boolean;
}