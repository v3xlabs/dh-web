/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomDataQuery
// ====================================================

export interface RoomDataQuery_room_members_user {
  __typename: "User";
  id: number;
  avatar: string;
  username: string;
}

export interface RoomDataQuery_room_members {
  __typename: "Member";
  role: number;
  user: RoomDataQuery_room_members_user;
}

export interface RoomDataQuery_room {
  __typename: "Room";
  id: string;
  name: string;
  description: string | null;
  members: RoomDataQuery_room_members[];
}

export interface RoomDataQuery {
  room: RoomDataQuery_room;
}

export interface RoomDataQueryVariables {
  room_id: string;
}
