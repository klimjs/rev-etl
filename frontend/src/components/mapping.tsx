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
import { ListTree } from 'lucide-react'

// test data
const columns = ['name', 'age', 'email']

export const Mapping = () => {
  return (
    <Card className="py-6">
      <CardContent>
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
                  <Input />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter>
        <Button variant="outline">
          <ListTree data-icon="inline-start" />
          Preview JSON
        </Button>
      </CardFooter>
    </Card>
  )
}
