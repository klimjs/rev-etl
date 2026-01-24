import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { ListTree } from 'lucide-react'
import { useColumns } from '@/hooks/use-columns'
import { useWarehouseStore } from '@/store/warehouse-store'

// TODO: add a hint for the JSON Field TableHead: user.name.first

// TODO: JSON Field validation to prevent invalid JSON paths

export const Mapping = () => {
  const {
    columns,
    isPending: isColumnsPending,
    isError: isColumnsError,
  } = useColumns()

  const { mapping, updateMapping } = useWarehouseStore()

  const getTargetPath = (sourceColumn: string) =>
    mapping.find((m) => m.sourceColumn === sourceColumn)?.targetPath ?? ''

  return (
    <Card className="py-6">
      <CardContent>
        {isColumnsPending && <Spinner />}
        {isColumnsError && (
          <p className="text-red-500">Failed to load columns.</p>
        )}

        {!isColumnsPending && !isColumnsError && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Table Column</TableHead>
                <TableHead>JSON Field</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {columns.map((column) => (
                <TableRow key={column}>
                  <TableCell>{column}</TableCell>
                  <TableCell>
                    <Input
                      value={getTargetPath(column)}
                      onChange={(e) =>
                        updateMapping({
                          sourceColumn: column,
                          targetPath: e.target.value,
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <CardFooter>
        <Button variant="outline" disabled={isColumnsPending || isColumnsError}>
          <ListTree data-icon="inline-start" />
          Preview JSON
        </Button>
      </CardFooter>
    </Card>
  )
}
