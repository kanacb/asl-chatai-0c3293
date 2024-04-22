import React from "react";
import { render, screen } from "@testing-library/react";

import UserInvitationsEditDialogComponent from "../UserInvitationsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userInvitations edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserInvitationsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userInvitations-edit-dialog-component")).toBeInTheDocument();
});
