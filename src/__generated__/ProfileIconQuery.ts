/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileIconQuery
// ====================================================

export interface ProfileIconQuery_me {
  __typename: "User";
  id: number;
  avatar: string;
  username: string;
}

export interface ProfileIconQuery {
  me: ProfileIconQuery_me;
}
