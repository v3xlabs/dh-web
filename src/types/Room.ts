import { Member } from "./Member";

type RoomState = "audio";

export type Room = {
    id: string;
    name: string;
    description: string;
    state: RoomState;
    members: Member[];
}