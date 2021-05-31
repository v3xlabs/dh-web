/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileWidgetQuery
// ====================================================

export interface ProfileWidgetQuery_me {
  __typename: "User";
  id: number;
  bio: string;
  avatar: string;
  username: string;
  follower_count: number;
  following_count: number;
}

export interface ProfileWidgetQuery {
  me: ProfileWidgetQuery_me;
}
