import React from "react";
import { render, screen } from "@testing-library/react";

import ConfigEditDialogComponent from "../ConfigEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders config edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ConfigEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("config-edit-dialog-component")).toBeInTheDocument();
});
