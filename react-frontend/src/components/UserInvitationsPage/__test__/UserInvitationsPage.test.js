import React from "react";
import { render, screen } from "@testing-library/react";

import UserInvitationsPage from "../UserInvitationsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userInvitations page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserInvitationsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userInvitations-datatable")).toBeInTheDocument();
    expect(screen.getByRole("userInvitations-add-button")).toBeInTheDocument();
});
