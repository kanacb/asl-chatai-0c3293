import React from "react";
import { render, screen } from "@testing-library/react";

import RefConfigPage from "../RefConfigPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders refConfig page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RefConfigPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("refConfig-datatable")).toBeInTheDocument();
    expect(screen.getByRole("refConfig-add-button")).toBeInTheDocument();
});
