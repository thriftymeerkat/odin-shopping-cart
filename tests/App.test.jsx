// src/tests/App.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, useOutletContext } from "react-router";
import App from "../src/App";

// Dummy child that uses the context App provides
const DummyChild = () => {
    const { setCart } = useOutletContext();
    return (
    <div>
        <h1>Dummy page</h1>
        <button
        onClick={() =>
            setCart((prev) => ({
            ...prev,
            1: { id: 1, quantity: 2, title: "Test item", image: "", price: 10 },
            }))
        }
        >
        Add item
        </button>
    </div>
    );
};

const renderApp = () => {
    const router = createMemoryRouter(
    [{ path: "/", element: <App />, children: [{ index: true, element: <DummyChild /> }] }],
    { initialEntries: ["/"] }
    );
    return render(<RouterProvider router={router} />);
};

describe("App component", () => {
    it("renders the navbar inside the header", () => {
    renderApp();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("renders the matched child route inside main", () => {
    renderApp();
    const main = screen.getByRole("main");
    expect(main).toContainElement(screen.getByRole("heading", { name: /dummy page/i }));
    });

    it("passes cart state to children and the navbar reflects updates", async () => {
    const user = userEvent.setup();
    renderApp();

    const cartLink = screen.getByRole("link", { name: /^cart/i });
    expect(cartLink).toHaveTextContent(/cart\s*\(\s*0\s*\)/i);

    await user.click(screen.getByRole("button", { name: /add item/i }));

    expect(cartLink).toHaveTextContent(/cart\s*\(\s*2\s*\)/i);
    });
});