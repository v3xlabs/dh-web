/* TypeScript file generated from SaferLink.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

const $$toRE258795630: { [key: string]: any } = {"External": 0, "Internal": 1};

// @ts-ignore: Implicit any on import
import * as SaferLinkBS__Es6Import from './SaferLink.bs';
const SaferLinkBS: any = SaferLinkBS__Es6Import;

// tslint:disable-next-line:interface-over-type-literal
export type target = "External" | "Internal";

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly children: React.ReactNode; 
  readonly href: string; 
  readonly target: target
};

export const make: React.ComponentType<{
  readonly children: React.ReactNode; 
  readonly href: string; 
  readonly target: target
}> = function SaferLink(Arg1: any) {
  const $props = {children:Arg1.children, href:Arg1.href, target:$$toRE258795630[Arg1.target]};
  const result = React.createElement(SaferLinkBS.make, $props);
  return result
};
