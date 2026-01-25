import { Card, CardContent } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useJsonPreview } from '@/hooks/use-json-preview'
import ReactJson from '@microlink/react-json-view'

export const Preview = () => {
  const {
    data,
    isPending: isPreviewPending,
    isError: isPreviewError,
  } = useJsonPreview()

  return (
    <Card className="py-6">
      <CardContent>
        {isPreviewPending && <Spinner />}
        {isPreviewError && (
          <p className="text-red-500">Failed to load preview.</p>
        )}
        {!isPreviewPending && !isPreviewError && data.length === 0 && (
          <p className="text-muted-foreground">No data to preview.</p>
        )}

        {!isPreviewPending && !isPreviewError && data.length > 0 && (
          <ReactJson
            src={data}
            name={false}
            enableClipboard={false}
            displayDataTypes={false}
          />
        )}
      </CardContent>
    </Card>
  )
}
