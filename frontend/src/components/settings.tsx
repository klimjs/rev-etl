import { Card, CardContent } from '@/components/ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from '@/components/ui/input-group'
import { Field, FieldLabel } from '@/components/ui/field'
import { Database } from 'lucide-react'

export const Settings = () => {
  return (
    <Card className="py-6">
      <CardContent>
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
      </CardContent>
    </Card>
  )
}
