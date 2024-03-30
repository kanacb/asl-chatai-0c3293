import React from "react";
import { render, screen } from "@testing-library/react";

import SessionsPage from "../SessionsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders sessions page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SessionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("sessions-datatable")).toBeInTheDocument();
    expect(screen.getByRole("sessions-add-button")).toBeInTheDocument();
});
