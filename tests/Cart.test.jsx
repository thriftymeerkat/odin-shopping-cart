import { useState } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router";
import Cart from "../src/Cart";

const renderCart = (initialCart = {}) => {
  const Wrapper = () => {
    const [cart, setCart] = useState(initialCart);
    return <Outlet context={{ cart, setCart }} />;
  };

  const router = createMemoryRouter(
    [{ path: "/", element: <Wrapper />, children: [{ index: true, element: <Cart /> }] }],
    { initialEntries: ["/"] }
  );

  render(<RouterProvider router={router} />);
};

describe("Cart component", () => {
    it("renders empty cart", () => {
        renderCart({});
        expect(screen.getByText(/your cart is empty!/i)).toBeInTheDocument();
    });

    it("renders items from the cart", () => {
        renderCart({
            1: { id: 1, quantity: 1, title: "Test item", image: "", price: 10 },
        });
        
        expect(screen.getByText(/test item/i)).toBeInTheDocument();
        expect(screen.queryByText(/your cart is empty!/i)).not.toBeInTheDocument();
    });

    it("increase quantity button clicks and renders updated quantity", async () => {
        renderCart({
            1: { id: 1, quantity: 1, title: "Test item", image: "", price: 10 },
        });

        const quantity = screen.getByRole("textbox", { name: /quantity, test item/i });
        expect(quantity).toHaveValue("1");

        const button = screen.getByRole("button", { name: /increase quantity/i });
        await userEvent.click(button);

        expect(quantity).toHaveValue("2");
    })

    it("decrease quantity button clicks and renders updated quantity", async () => {
        renderCart({
            1: { id: 1, quantity: 2, title: "Test item", image: "", price: 10 },
        });

        const quantity = screen.getByRole("textbox", { name: /quantity, test item/i });
        expect(quantity).toHaveValue("2");

        const button = screen.getByRole("button", { name: /decrease quantity/i });
        await userEvent.click(button);

        expect(quantity).toHaveValue("1");
    })

    it("increase quantity button clicks and renders updated subtotal", async () => {
        renderCart({
            1: { id: 1, quantity: 1, title: "Test item", image: "", price: 10 },
        });

        const subTotal = screen.getByText(/subtotal:\s*£10\.00/i);
        expect(subTotal).toBeInTheDocument();

        const button = screen.getByRole("button", { name: /increase quantity/i });
        await userEvent.click(button);

        const newSubTotal = screen.getByText(/subtotal:\s*£20\.00/i);
        expect(newSubTotal).toBeInTheDocument();
    })

    it("decrease quantity button clicks and renders updated subtotal", async () => {
        renderCart({
            1: { id: 1, quantity: 2, title: "Test item", image: "", price: 10 },
        });

        const subTotal = screen.getByText(/subtotal:\s*£20\.00/i);
        expect(subTotal).toBeInTheDocument();

        const button = screen.getByRole("button", { name: /decrease quantity/i });
        await userEvent.click(button);

        const newSubTotal = screen.getByText(/subtotal:\s*£10\.00/i);
        expect(newSubTotal).toBeInTheDocument();
    })

    it("increase quantity button clicks and renders updated total", async () => {
        renderCart({
            1: { id: 1, quantity: 1, title: "Test item 1", image: "", price: 10 },
            2: { id: 2, quantity: 1, title: "Test item 2", image: "", price: 5 },
        });

        const total = screen.getByText(/total:\s*£15\.00/i);
        expect(total).toBeInTheDocument();

        const button = screen.getByRole("button", { name: /increase quantity, test item 1/i });
        await userEvent.click(button);

        const newTotal = screen.getByText(/total:\s*£25\.00/i);
        expect(newTotal).toBeInTheDocument();
    })

    it("decrease quantity button clicks and renders updated total", async () => {
        renderCart({
            1: { id: 1, quantity: 2, title: "Test item 1", image: "", price: 10 },
            2: { id: 2, quantity: 1, title: "Test item 2", image: "", price: 5 },
        });

        const total = screen.getByText(/total:\s*£25\.00/i);
        expect(total).toBeInTheDocument();

        const button = screen.getByRole("button", { name: /decrease quantity, test item 1/i });
        await userEvent.click(button);

        const newTotal = screen.getByText(/total:\s*£15\.00/i);
        expect(newTotal).toBeInTheDocument();
    })

    it("remove button clicks and removes item", async () => {
        renderCart({
            1: { id: 1, quantity: 1, title: "Test item 1", image: "", price: 10 },
            2: { id: 1, quantity: 1, title: "Test item 2", image: "", price: 5 },
        });

        const button = screen.getByRole("button", { name: /remove test item 1/i });
        await userEvent.click(button);

        expect(screen.getByText(/test item 1 removed from cart/i)).toBeInTheDocument();
    })

    it("remove button clicks and displays empty cart", async () => {
        renderCart({
            1: { id: 1, quantity: 1, title: "Test item", image: "", price: 10 },
        });

        const button = screen.getByRole("button", { name: /remove test item/i });
        await userEvent.click(button);

        expect(screen.getByText(/your cart is empty!/i)).toBeInTheDocument();
    })
});