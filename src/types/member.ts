import { Room } from "./room";
import { User } from "./user";

export type Member = {
    role: string;
    room: Room;
    user: User;
}