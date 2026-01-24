import { Card, CardContent } from '@/components/ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from '@/components/ui/input-group'
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from '@/components/ui/field'
import { Database, CircleCheck, CircleX } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { useConnection } from '@/hooks/use-connection'
import { useTables } from '@/hooks/use-tables'

// TODO: 2 separate components for connection and tables
export const Settings = () => {
  const {
    connectionString,
    setConnectionString,
    testConnection,
    isPending: isConnectionPending,
    isSuccess: isConnectionSuccess,
    isError: isConnectionError,
  } = useConnection()

  const {
    tables,
    selectedTable,
    setSelectedTable,
    isPending: isTablesPending,
    isSuccess: isTablesSuccess,
    isError: isTablesError,
    error: tablesError,
  } = useTables(isConnectionSuccess)

  const renderConnectionIcon = () => {
    if (isConnectionPending) return <Spinner />
    if (isConnectionSuccess) return <CircleCheck className="text-green-600" />
    if (isConnectionError) return <CircleX className="text-red-500" />
    return <Database />
  }

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
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
              />
              <InputGroupAddon>{renderConnectionIcon()}</InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={() => testConnection()}
                  disabled={isConnectionPending || !connectionString}
                >
                  Test
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field data-invalid={isTablesError}>
            <div className="flex gap-1 items-center">
              <FieldLabel>Table</FieldLabel>
              {isTablesPending && <Spinner />}
            </div>

            <Select
              value={selectedTable}
              onValueChange={setSelectedTable}
              disabled={
                !isConnectionSuccess || !isTablesSuccess || isTablesPending
              }
            >
              <SelectTrigger className="max-w-64" aria-invalid={isTablesError}>
                <SelectValue placeholder="Select a table" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {tables.map((table) => (
                    <SelectItem key={table} value={table}>
                      {table}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <FieldError>{tablesError?.message}</FieldError>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
