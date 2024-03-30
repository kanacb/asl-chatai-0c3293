import React from "react";
import { render, screen } from "@testing-library/react";

import RefFaDocsCreateDialogComponent from "../RefFaDocsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders refFaDocs create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RefFaDocsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("refFaDocs-create-dialog-component")).toBeInTheDocument();
});
