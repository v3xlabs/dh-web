/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomListQuery
// ====================================================

export interface RoomListQuery_rooms_members_user {
  __typename: "User";
  id: number;
  avatar: string;
  username: string;
}

export interface RoomListQuery_rooms_members {
  __typename: "Member";
  user: RoomListQuery_rooms_members_user;
}

export interface RoomListQuery_rooms {
  __typename: "Room";
  id: string;
  name: string;
  members: RoomListQuery_rooms_members[];
}

export interface RoomListQuery {
  rooms: RoomListQuery_rooms[];
}
