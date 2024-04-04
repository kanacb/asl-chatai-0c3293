import React from "react";
import { render, screen } from "@testing-library/react";

import RefBanksCreateDialogComponent from "../RefBanksCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders refBanks create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RefBanksCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("refBanks-create-dialog-component"),
  ).toBeInTheDocument();
});
