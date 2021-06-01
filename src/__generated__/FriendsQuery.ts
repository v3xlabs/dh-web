/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FriendsQuery
// ====================================================

export interface FriendsQuery_me_following_current_room {
  __typename: "Room";
  name: string;
}

export interface FriendsQuery_me_following {
  __typename: "User";
  avatar: string;
  username: string;
  current_room: FriendsQuery_me_following_current_room | null;
}

export interface FriendsQuery_me {
  __typename: "User";
  following: FriendsQuery_me_following[];
}

export interface FriendsQuery {
  me: FriendsQuery_me;
}
