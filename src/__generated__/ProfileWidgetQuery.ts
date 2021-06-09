/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileWidgetQuery
// ====================================================

export interface ProfileWidgetQuery_me_current_room_room_members_user {
  __typename: "User";
  id: number;
  username: string;
}

export interface ProfileWidgetQuery_me_current_room_room_members {
  __typename: "Member";
  user: ProfileWidgetQuery_me_current_room_room_members_user;
}

export interface ProfileWidgetQuery_me_current_room_room {
  __typename: "Room";
  id: string;
  name: string;
  description: string | null;
  members: ProfileWidgetQuery_me_current_room_room_members[];
}

export interface ProfileWidgetQuery_me_current_room {
  __typename: "Member";
  room: ProfileWidgetQuery_me_current_room_room;
}

export interface ProfileWidgetQuery_me {
  __typename: "User";
  id: number;
  bio: string;
  avatar: string;
  username: string;
  follower_count: number;
  following_count: number;
  current_room: ProfileWidgetQuery_me_current_room | null;
}

export interface ProfileWidgetQuery {
  me: ProfileWidgetQuery_me;
}
