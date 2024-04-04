import React from "react";
import { render, screen } from "@testing-library/react";

import RefFaDocsPage from "../RefFaDocsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders refFaDocs page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RefFaDocsPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("refFaDocs-datatable")).toBeInTheDocument();
  expect(screen.getByRole("refFaDocs-add-button")).toBeInTheDocument();
});
