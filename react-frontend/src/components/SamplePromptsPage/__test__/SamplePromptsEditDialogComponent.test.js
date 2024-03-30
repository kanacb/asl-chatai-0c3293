import React from "react";
import { render, screen } from "@testing-library/react";

import SamplePromptsEditDialogComponent from "../SamplePromptsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders samplePrompts edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SamplePromptsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("samplePrompts-edit-dialog-component")).toBeInTheDocument();
});
