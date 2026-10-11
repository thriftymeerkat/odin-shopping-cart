import { useState } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router";
import Shop from "../src/Shop";

const mockProduct = [
  {
    id: 1,
    title: "test item",
    price: 10,
    description: "test item description",
    category: "test category",
    image: "",
  },
];

const renderShop = (initialCart = {}) => {
  const Wrapper = () => {
    const [cart, setCart] = useState(initialCart);
    return <Outlet context={{ cart, setCart }} />;
  };

  const router = createMemoryRouter(
    [{ path: "/", element: <Wrapper />, children: [{ index: true, element: <Shop /> }] }],
    { initialEntries: ["/"] }
  );

  render(<RouterProvider router={router} />);
};

describe("Shop component", () => {
    beforeEach(() => {
        vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => mockProduct,
        })
        );
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("renders correct heading", () => {
        renderShop();
        expect(screen.getByRole("heading", { name: /shop/i })).toBeInTheDocument();
    });

    it("renders items for shop", async () => {
        renderShop();

        expect(await screen.findByText(mockProduct[0].title)).toBeInTheDocument();
    });

    it("increase quantity button clicks and renders updated quantity", async () => {
        renderShop();

        const quantity = await screen.findByRole("textbox", { name: /quantity, test item/i });
        expect(quantity).toHaveValue("1");

        const button = await screen.findByRole("button", { name: /increase quantity, test item/i });
        await userEvent.click(button);

        expect(quantity).toHaveValue("2");
    })

    it("decrease quantity button clicks and renders updated quantity", async () => {
        renderShop();

        const quantity = await screen.findByRole("textbox", { name: /quantity, test item/i });
        expect(quantity).toHaveValue("1");

        const increaseButton = await screen.findByRole("button", { name: /increase quantity, test item/i });
        await userEvent.click(increaseButton);

        expect(quantity).toHaveValue("2");

        const decreaseButton = await screen.findByRole("button", { name: /decrease quantity, test item/i });
        await userEvent.click(decreaseButton);

        expect(quantity).toHaveValue("1");
    })

    it("decrease quantity button clicks and doesn't drop below 1", async () => {
        renderShop();

        const quantity = await screen.findByRole("textbox", { name: /quantity, test item/i });
        expect(quantity).toHaveValue("1");

        const button = await screen.findByRole("button", { name: /decrease quantity, test item/i });
        await userEvent.click(button);

        expect(quantity).toHaveValue("1");
    })

    it("add to cart button clicks and updates cart", async () => {
        renderShop();

        const button = await screen.findByRole("button", { name: /add to cart, test item/i});
        await userEvent.click(button);

        expect(await screen.findByText(/added 1 test item to cart/i)).toBeInTheDocument();
    })

    it("add to cart button clicks and updates cart", async () => {
        renderShop();

        const button = await screen.findByRole("button", { name: /add to cart, test item/i});
        await userEvent.click(button);

        expect(await screen.findByText(/added 1 test item to cart/i)).toBeInTheDocument();
    })
});