import { Card, CardContent } from '@/components/ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from '@/components/ui/input-group'
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field'
import { Database } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'

export const Settings = () => {
  // Test tables
  const tables = [
    { label: 'Select a table', value: null },
    { label: 'Users', value: 'users' },
    { label: 'Customers', value: 'customers' },
    { label: 'Orders', value: 'orders' },
  ]

  return (
    <Card className="py-6">
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="connection">Database connection</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="connection"
                placeholder="postgresql://postgres:postgres@server:9999/database"
              />
              <InputGroupAddon>
                <Database />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton>Test</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel>Table</FieldLabel>

            <Select items={tables} disabled={false}>
              <SelectTrigger className="max-w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {tables.map((table) => (
                    <SelectItem key={table.value} value={table.value}>
                      {table.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
