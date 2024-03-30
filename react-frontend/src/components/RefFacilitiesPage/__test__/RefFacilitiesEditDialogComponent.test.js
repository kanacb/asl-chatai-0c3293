import React from "react";
import { render, screen } from "@testing-library/react";

import RefFacilitiesEditDialogComponent from "../RefFacilitiesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders refFacilities edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RefFacilitiesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("refFacilities-edit-dialog-component")).toBeInTheDocument();
});
