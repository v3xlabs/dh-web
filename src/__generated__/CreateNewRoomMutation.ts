/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateNewRoomMutation
// ====================================================

export interface CreateNewRoomMutation_createRoom {
  __typename: "Room";
  id: number;
  name: string;
}

export interface CreateNewRoomMutation {
  createRoom: CreateNewRoomMutation_createRoom;
}

export interface CreateNewRoomMutationVariables {
  name: string;
  description?: string | null;
}
