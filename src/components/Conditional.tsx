import { ReactElement, ReactNode } from "react";
import React from 'react';

interface ConditionProps {
  condition: boolean;
  children: ReactNode;
}

interface IConditionalProps {
  condition?: boolean;
  children: ReactElement | ReactElement[];
}

export const If = ({ condition, children }: ConditionProps) => (condition ? <>{children}</> : null);
export const ElseIf = ({ condition, children }: ConditionProps) => (condition ? <>{children}</> : null);
export const Else = ({ children }: { children: ReactNode }) => <>{children}</>;

export const Conditional = ({ children }: IConditionalProps) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  let previousChild;
  for (const child of childrenArray) {
    if (!child || typeof child !== "object" || !("type" in child)) continue;

    //@ts-ignore
    if (![If, ElseIf, Else].includes(child.type)) {
      throw new Error(
        `Conditional Error: Invalid child component "${
          child.type ?? "Unknown"
        }" of <Conditional>. Only <If>, <ElseIf>, or <Else> are allowed.\n\nCheck the component usage at:`
      );
    }

    //@ts-ignore
    if (child.type === ElseIf && ![If, ElseIf].includes(previousChild?.type)) {
      throw new Error("Conditional Error: <ElseIf> must be preceded by <If> or <ElseIf>");
    }

    //@ts-ignore
    if (child.type === Else && ![If, ElseIf].includes(previousChild?.type)) {
      throw new Error("Conditional Error: <Else> must be preceded by <If> or <ElseIf>");
    }

    previousChild = child;
  }

  const match = childrenArray.find((child) => {
    //@ts-ignore
    return child.props?.condition ?? true;
  });

  return match ? <>{match}</> : null;
};