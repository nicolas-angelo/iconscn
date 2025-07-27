'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import type { IconType } from '@icons-pack/react-simple-icons'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabsContents,
  type TabsProps,
} from '@/components/animate-ui/components/tabs'
import { CopyButton } from '@/components/animate-ui/buttons/copy'
import {
  type BundledLanguage,
  type BundledTheme,
  type CodeToHastOptionsCommon,
  codeToHtml,
} from 'shiki'
import { cn } from '@/lib/utils'

export interface CommandConfig {
  command: string
  icon: IconType
  className?: string
}

type CodeTabsProps = {
  codes: Record<string, CommandConfig>
  copyButton?: boolean
  lang?: BundledLanguage
  theme?: BundledTheme
  colorReplacements?: CodeToHastOptionsCommon['colorReplacements']
  onCopy?: (content: string) => void
} & Omit<TabsProps, 'children'>

function CodeTabs({
  codes,
  lang = 'bash',
  theme = 'github-dark',
  colorReplacements = {},
  className,
  defaultValue,
  value,
  onValueChange,
  copyButton = true,
  onCopy,
  ...props
}: CodeTabsProps) {
  const { resolvedTheme } = useTheme()

  const [highlightedCodes, setHighlightedCodes] = React.useState<Record<
    string,
    CommandConfig
  > | null>(null)

  const [selectedCode, setSelectedCode] = React.useState<string>(
    value ?? defaultValue ?? Object.keys(codes)[0] ?? ''
  )

  React.useEffect(() => {
    async function loadHighlightedCode() {
      try {
        const newHighlightedCodes: Record<string, CommandConfig> = {}

        for (const [command, val] of Object.entries(codes)) {
          const highlighted = await codeToHtml(val.command, {
            lang,
            defaultColor: resolvedTheme === 'dark' ? 'dark' : 'light',
            theme,
            colorReplacements,
          })

          newHighlightedCodes[command] = {
            ...val,
            command: highlighted,
          }
        }

        setHighlightedCodes(newHighlightedCodes)
      } catch (error) {
        console.error('Error highlighting codes', error)
        setHighlightedCodes(codes)
      }
    }
    loadHighlightedCode()
  }, [resolvedTheme, lang, theme, colorReplacements, codes])

  return (
    <Tabs
      className={cn(
        'w-full gap-0 overflow-hidden rounded-xl border bg-[var(--code-block-card)] shadow-lg shadow-black ring-2 dark:ring-ring/50',
        className
      )}
      data-slot="install-tabs"
      {...props}
      onValueChange={val => {
        setSelectedCode(val)
        onValueChange?.(val)
      }}
      value={selectedCode}
    >
      <TabsList
        activeClassName="rounded-none shadow-none bg-transparent after:content-[''] after:absolute after:inset-x-0 after:h-0.5 after:bottom-0 dark:after:bg-white after:bg-black after:rounded-t-full"
        className="relative h-10 w-full justify-between rounded-none border-border/75 border-b px-4 py-0 text-current dark:border-border/50 bg-[var(--code-block-card)]"
        data-slot="install-tabs-list"
      >
        <div className="flex h-full gap-x-3">
          {highlightedCodes &&
            Object.entries(highlightedCodes).map(([code, val]) => (
              <TabsTrigger
                className={cn(
                  'group/tabs px-0 text-muted-foreground data-[state=active]:text-current flex items-center gap-x-1.5',
                  'data-[state=active]:text-brand-primary'
                )}
                key={code}
                value={code}
              >
                <val.icon className="size-4" />
                {code}
              </TabsTrigger>
            ))}
        </div>

        {copyButton && highlightedCodes && (
          <CopyButton
            className="-me-2 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10"
            content={highlightedCodes[selectedCode].command}
            onCopy={onCopy}
            // size="sm"
            variant="ghost"
          />
        )}
      </TabsList>
      <TabsContents data-slot="install-tabs-contents">
        {highlightedCodes &&
          Object.entries(highlightedCodes).map(([code, val]) => (
            <TabsContent
              className="flex flex-1 h-full items-center overflow-auto p-4 text-sm bg-[var(--pre-background)]"
              data-slot="install-tabs-content"
              key={code}
              value={code}
            >
              <div
                className="[&>pre,_&_code]:!bg-transparent [&_code]:!text-[13px] [&>pre,_&_code]:border-none [&>pre,_&_code]:[background:transparent_!important] !font-mono"
                dangerouslySetInnerHTML={{ __html: val.command }}
              />
            </TabsContent>
          ))}
      </TabsContents>
    </Tabs>
  )
}

export { CodeTabs, type CodeTabsProps }
