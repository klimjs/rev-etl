import { useState } from 'react'
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Settings } from '@/components/settings'
import { Mapping } from '@/components/mapping'
import { Preview } from '@/components/preview'
import { useWarehouseStore } from '@/store/warehouse-store'

export const ETLFlowSetup = () => {
  const { connectionStatus, selectedTable, mapping } = useWarehouseStore()
  const [activeTab, setActiveTab] =
    useState<TabsPrimitive.Tab.Value>('settings')

  const isMappingEnabled = connectionStatus === 'success' && !!selectedTable
  const isPreviewEnabled =
    connectionStatus === 'success' && !!selectedTable && mapping.length > 0

  return (
    <div className="flex flex-col gap-1 mx-auto max-w-2xl min-w-sm p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="settings" className="px-4">
            Settings
          </TabsTrigger>
          <TabsTrigger
            value="mapping"
            className="px-4"
            disabled={!isMappingEnabled}
          >
            Mapping
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="px-4"
            disabled={!isPreviewEnabled}
          >
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Settings />
        </TabsContent>
        <TabsContent value="mapping">
          <Mapping setActiveTab={setActiveTab} />
        </TabsContent>
        <TabsContent value="preview">
          <Preview />
        </TabsContent>
      </Tabs>
    </div>
  )
}
