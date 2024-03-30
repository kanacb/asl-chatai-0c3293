import React from "react";
import { render, screen } from "@testing-library/react";

import RefBanksPage from "../RefBanksPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders refBanks page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RefBanksPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("refBanks-datatable")).toBeInTheDocument();
    expect(screen.getByRole("refBanks-add-button")).toBeInTheDocument();
});
