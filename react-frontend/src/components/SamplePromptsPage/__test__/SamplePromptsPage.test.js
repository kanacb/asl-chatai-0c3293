import React from "react";
import { render, screen } from "@testing-library/react";

import SamplePromptsPage from "../SamplePromptsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders samplePrompts page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SamplePromptsPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("samplePrompts-datatable")).toBeInTheDocument();
  expect(screen.getByRole("samplePrompts-add-button")).toBeInTheDocument();
});
