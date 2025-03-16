import React from 'react';
import '@testing-library/jest-dom';
import { Conditional, If, ElseIf, Else } from "../index";
import { render, screen } from '@testing-library/react';

describe("Conditional Component", () => {
  test("renders the If block when condition is true", () => {
    render(
      <Conditional>
        <If condition={true}>Welcome, Admin!</If>
        <ElseIf condition={true}>Welcome, Editor!</ElseIf>
        <Else>Welcome, Guest!</Else>
      </Conditional>
    );

    expect(screen.getByText("Welcome, Admin!")).toBeInTheDocument();
  });

  test("renders the ElseIf block if If condition is false", () => {
    render(
      <Conditional>
        <If condition={false}>Welcome, Admin!</If>
        <ElseIf condition={true}>Welcome, Editor!</ElseIf>
        <Else>Welcome, Guest!</Else>
      </Conditional>
    );

    expect(screen.getByText("Welcome, Editor!")).toBeInTheDocument();
  });

  test("renders the Else block if no conditions match", () => {
    render(
      <Conditional>
        <If condition={false}>Welcome, Admin!</If>
        <ElseIf condition={false}>Welcome, Editor!</ElseIf>
        <Else>Welcome, Guest!</Else>
      </Conditional>
    );

    expect(screen.getByText("Welcome, Guest!")).toBeInTheDocument();
  });

  test("renders only the first matching condition", () => {
    render(
      <Conditional>
        <If condition={true}>First Match</If>
        <ElseIf condition={true}>Should Not Appear</ElseIf>
        <Else>Should Not Appear</Else>
      </Conditional>
    );

    expect(screen.getByText("First Match")).toBeInTheDocument();
    expect(screen.queryByText("Should Not Appear")).not.toBeInTheDocument();
  });

  test("renders nothing if no conditions are met and there is no Else", () => {
    const { container } = render(
      <Conditional>
        <If condition={false}>Won't Render</If>
        <ElseIf condition={false}>Won't Render</ElseIf>
      </Conditional>
    );

    expect(container).toBeEmptyDOMElement();
  });
});