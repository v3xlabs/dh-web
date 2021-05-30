import { User } from "./user";

export type Room = {
    id: string;
    name: string;
    description: string;
    members: User[];
}