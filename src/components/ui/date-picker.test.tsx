import { DatePicker } from "@/components/ui/date-picker";
import { renderWithProviders } from "@/test/test-utils";
import { fireEvent } from "@testing-library/react";

describe("DatePicker", () => {
  it("calls onChange with selected date", async () => {
    const onChange = vi.fn();
    const { container } = renderWithProviders(
      <DatePicker value="2026-05-19" onChange={onChange} />,
    );
    const input = container.querySelector('input[type="date"]');

    expect(input).not.toBeNull();
    fireEvent.change(input as HTMLInputElement, {
      target: { value: "2026-06-01" },
    });

    expect(onChange).toHaveBeenCalledWith("2026-06-01");
  });
});
