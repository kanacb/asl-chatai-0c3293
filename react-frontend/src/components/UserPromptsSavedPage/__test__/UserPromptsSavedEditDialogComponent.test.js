import React from "react";
import { render, screen } from "@testing-library/react";

import UserPromptsSavedEditDialogComponent from "../UserPromptsSavedEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userPromptsSaved edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <UserPromptsSavedEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("userPromptsSaved-edit-dialog-component"),
  ).toBeInTheDocument();
});
