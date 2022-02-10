import { fireEvent, render, screen } from "@testing-library/react";
import Expandable from "./Expandable";

test("Expandable component renders without crashing", () => {
  const content = <p>Hello, i am the content!</p>;
  render(<Expandable heading="Test Expandable" content={content} />);

  // check headline is rendered
  expect(screen.getByText(/Test Expandable/i)).toBeInTheDocument();
  // check that content is hidden initially
  expect(screen.queryByText("i am the content")).not.toBeInTheDocument();
});

test("Expanding feature of expandable component", async () => {
  const content = <p data-testid="test-123">Text Content 123</p>;
  render(<Expandable heading="Heading" content={content} />);

  // check that content is hidden initially
  expect(screen.queryByTestId("test-123")).not.toBeInTheDocument();

  // click expand button and verify content element is now rendered
  fireEvent.click(screen.getByText("Heading"));
  await screen.findByTestId("test-123");
  expect(screen.getByTestId("test-123")).toContainHTML('Text Content 123')
});
