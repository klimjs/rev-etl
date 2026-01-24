import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Settings } from '@/components/settings'
import { Mapping } from '@/components/mapping'
import { Preview } from '@/components/preview'

export const ETLFlowSetup = () => {
  return (
    <div className="flex flex-col gap-1 mx-auto max-w-2xl min-w-sm p-4">
      <Tabs defaultValue="settings">
        <TabsList>
          <TabsTrigger value="settings" className="px-4">
            Settings
          </TabsTrigger>
          <TabsTrigger value="mapping" className="px-4">
            Mapping
          </TabsTrigger>
          <TabsTrigger value="preview" className="px-4">
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Settings />
        </TabsContent>
        <TabsContent value="mapping">
          <Mapping />
        </TabsContent>
        <TabsContent value="preview">
          <Preview />
        </TabsContent>
      </Tabs>
    </div>
  )
}
