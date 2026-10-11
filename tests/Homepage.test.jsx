import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Homepage from "../src/Homepage";

describe("Homepage component", () => {
    it("renders correct heading", () => {
        render(<Homepage />);
        expect(screen.getByRole("heading").textContent).toMatch(/home/i);
    })
});