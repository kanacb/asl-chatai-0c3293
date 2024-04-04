import React from "react";
import { render, screen } from "@testing-library/react";

import RefFaDocsEditDialogComponent from "../RefFaDocsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders refFaDocs edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RefFaDocsEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("refFaDocs-edit-dialog-component"),
  ).toBeInTheDocument();
});
