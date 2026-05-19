import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function FormHarness() {
  const form = useForm<{ company: string }>({
    defaultValues: { company: "" },
  });

  useEffect(() => {
    form.setError("company", {
      type: "manual",
      message: "Company is required.",
    });
  }, [form]);

  return (
    <FormProvider {...form}>
      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="company-input">Company</FormLabel>
            <FormControl>
              <Input id="company-input" {...field} />
            </FormControl>
            <FormDescription>Enter the account name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormProvider>
  );
}

describe("Form helpers", () => {
  it("renders form description and error message from context", async () => {
    renderWithProviders(<FormHarness />);

    expect(screen.getByLabelText("Company")).toBeInTheDocument();
    expect(screen.getByText("Enter the account name.")).toBeInTheDocument();
    expect(await screen.findByText("Company is required.")).toBeInTheDocument();
  });
});
