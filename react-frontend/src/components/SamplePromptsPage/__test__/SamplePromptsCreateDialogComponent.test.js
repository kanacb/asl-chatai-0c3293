import React from "react";
import { render, screen } from "@testing-library/react";

import SamplePromptsCreateDialogComponent from "../SamplePromptsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders samplePrompts create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SamplePromptsCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("samplePrompts-create-dialog-component"),
  ).toBeInTheDocument();
});
