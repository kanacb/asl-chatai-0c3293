import React from "react";
import { render, screen } from "@testing-library/react";

import RefFacilitiesCreateDialogComponent from "../RefFacilitiesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders refFacilities create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RefFacilitiesCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("refFacilities-create-dialog-component"),
  ).toBeInTheDocument();
});
