import { Card, CardContent } from '@/components/ui/card'

export const Settings = () => {
  return (
    <Card>
      <CardContent className="text-muted-foreground">
        <p>Connect to their Postgres database using a connection string.</p>
        <p>Select a table they want to sync from.</p>
      </CardContent>
    </Card>
  )
}
