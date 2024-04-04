import React from "react";
import { render, screen } from "@testing-library/react";

import RefFacilitiesPage from "../RefFacilitiesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders refFacilities page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RefFacilitiesPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("refFacilities-datatable")).toBeInTheDocument();
  expect(screen.getByRole("refFacilities-add-button")).toBeInTheDocument();
});
