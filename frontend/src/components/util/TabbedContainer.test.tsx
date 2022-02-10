import { fireEvent, render, screen } from "@testing-library/react";
import TabbedContainer from "./TabbedContainer";

test("Tabbed Container is rendered without crashing", () => {
  const content1 = <p>Hello, i am the content 1!</p>;
  const content2 = <p>Hello, i am the content 2!</p>;
  render(
    <TabbedContainer
      titles={["Tab 1", "Tab 2"]}
      contents={[content1, content2]}
    />
  );

  // check tab headings are rendered
  expect(screen.getByText("Tab 1")).toBeInTheDocument();
  expect(screen.getByText("Tab 2")).toBeInTheDocument();

  // check that first tab is initally shown
  expect(screen.getByText("Hello, i am the content 1!")).toBeInTheDocument();
  // check that second tab is initially not shown
  expect(
    screen.queryByText("Hello, i am the content 2!")
  ).not.toBeInTheDocument();
});

test("Tabbed Container switches correctly between tabs", async () => {
  const content1 = <p>Hello, i am the content 1!</p>;
  const content2 = <p data-testid="test">Hello, i am the content 2!</p>;
  render(
    <TabbedContainer
      titles={["Tab 1", "Tab 2"]}
      contents={[content1, content2]}
    />
  );

  // expect second tab to be not shon intitally
  expect(
    screen.queryByText("Hello, i am the content 2!")
  ).not.toBeInTheDocument();

  fireEvent.click(screen.getByText("Tab 2"));
  await screen.findByTestId("test");

  expect(screen.getByTestId("test")).toContainHTML(
    "Hello, i am the content 2!"
  );
});
