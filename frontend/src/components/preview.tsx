import { Card, CardContent } from '@/components/ui/card'

export const Preview = () => {
  return (
    <Card>
      <CardContent className="text-muted-foreground">
        <p>
          Preview the output — select a limited number of rows and see the
          resulting JSON payload.
        </p>
      </CardContent>
    </Card>
  )
}
