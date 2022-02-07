import React from "react";
import { render, screen } from "@testing-library/react";
import Sorting from "./Sorting";
import { SortingModel } from "../../../lib/sortingFilterModel";

test("sorting component renders without crashing", () => {
  const sortingModel: SortingModel = {
    direction: "ASC",
    field: "VIEWS",
  };

  render(<Sorting sortingModel={sortingModel} setSortingModel={() => {}} />);
  // check headline is rendered
  expect(screen.getByText(/Sorting/i)).toBeInTheDocument();
  // check that select is rendered
  expect(screen.getByRole("combobox")).toBeInTheDocument();
});

test("sorting components initially shows correct sorting", () => {
  const sortingModel: SortingModel = {
    field: "COMMENTS",
    direction: "ASC",
  };
  render(<Sorting sortingModel={sortingModel} setSortingModel={() => {}} />);
  // check that select has correct value
  expect(screen.getByRole("combobox")).toHaveValue("COMMENTS_ASC");
});

test("sorting components updates select value properly", () => {
  const { rerender } = render(
    <Sorting
      sortingModel={{
        field: "COMMENTS",
        direction: "ASC",
      }}
      setSortingModel={() => {}}
    />
  );
  expect(screen.getByRole("combobox")).toHaveValue("COMMENTS_ASC");
  rerender(
    <Sorting
      sortingModel={{ field: "DATE", direction: "DESC" }}
      setSortingModel={() => {}}
    />
  );
  // check that select has correct value
  expect(screen.getByRole("combobox")).toHaveValue("DATE_DESC");
});
