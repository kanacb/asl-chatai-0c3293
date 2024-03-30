import React from "react";
import { render, screen } from "@testing-library/react";

import UserPromptsSavedPage from "../UserPromptsSavedPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userPromptsSaved page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserPromptsSavedPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userPromptsSaved-datatable")).toBeInTheDocument();
    expect(screen.getByRole("userPromptsSaved-add-button")).toBeInTheDocument();
});
