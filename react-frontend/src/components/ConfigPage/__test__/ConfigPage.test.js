import React from "react";
import { render, screen } from "@testing-library/react";

import ConfigPage from "../ConfigPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders config page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ConfigPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("config-datatable")).toBeInTheDocument();
    expect(screen.getByRole("config-add-button")).toBeInTheDocument();
});
