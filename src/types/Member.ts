import { Room } from "./Room";
import { User } from "./User";

export type Member = {
    role: string;
    room: Room;
    user: User;
}