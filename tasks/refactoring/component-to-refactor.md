# Component That Should Be Refactored

## Selected Component

[src/features/customers/components/customer-form-dialog.tsx](/Users/valeriiabondarchuk/WorkProjects/matrix-3/src/features/customers/components/customer-form-dialog.tsx)

## Why This Component Needs Refactoring

`CustomerFormDialog` is a strong refactor candidate because it has grown into a large component with multiple responsibilities in one file.

Main signs:

- It is large at about 380 lines.
- It mixes dialog layout, form setup, submit logic, and all field rendering in one component.
- It contains a lot of repeated `FormField` markup for inputs, selects, and date pickers.
- It is harder to scan, test, and extend because one change can affect a long render tree.

## Evidence In The Code

- Form creation and validation setup: lines 58-63
- Reset behavior with `useEffect`: lines 65-67
- Submit logic for create vs update: lines 69-77
- Large render block with many repeated fields: lines 97-357
- Footer actions and submit state: lines 359-374

This means the component is responsible for:

- modal presentation
- form state management
- create/update workflow
- rendering every individual field

That is more than one concern in one place.

## Why Refactoring Would Help

Refactoring this component would improve:

- readability
- maintainability
- testability
- reusability of field groups
- scalability when new customer fields are added

## Suggested Refactor Direction

Split the component into smaller parts, for example:

1. `CustomerFormDialog`
   Responsible only for dialog shell and high-level flow.

2. `CustomerFormFields`
   Responsible only for rendering the form fields.

3. `CustomerFinancialFields` or `CustomerMetadataFields`
   Responsible for grouped sections such as finance, dates, and notes.

4. `useCustomerForm`
   A custom hook for `useForm`, default values, reset behavior, and submit handling.

## Example Refactor Shape

```tsx
export function CustomerFormDialog(props: CustomerFormDialogProps) {
  const formState = useCustomerForm(props.customer, props.onOpenChange);

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <CustomerFormFields form={formState.form} customer={props.customer} />
        <CustomerFormActions
          isPending={formState.isPending}
          customer={props.customer}
        />
      </DialogContent>
    </Dialog>
  );
}
```

## Short Conclusion

`CustomerFormDialog` works correctly, but it is too large and handles too many responsibilities in one place. It should be refactored into smaller components and possibly a custom hook so the code becomes easier to maintain and extend.
