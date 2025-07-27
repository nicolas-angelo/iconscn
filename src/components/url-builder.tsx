'use client'

import { useState, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import {
  SiBun,
  SiNpm,
  SiYarn,
  SiPnpm,
} from '@icons-pack/react-simple-icons'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  CodeTabs,
  type CommandConfig,
} from '@/components/animate-ui/components/code-tabs'
import { cn } from '@/lib/utils'
import { iconStyles, type IconStyle } from '@/types/mdi'

const MultiIconSelect = dynamic(
  () =>
    import('@/components/multi-icon-select').then(
      mod => mod.MultiIconSelect
    ),
  { ssr: false }
)

const baseCommands: Record<string, CommandConfig> = {
  npm: {
    command: 'npx',
    icon: SiNpm,
  },
  pnpm: {
    command: 'pnpm dlx',
    icon: SiPnpm,
  },
  yarn: {
    command: 'npx',
    icon: SiYarn,
  },
  bun: {
    command: 'bunx --bun',
    icon: SiBun,
  },
}

const colorReplacements = {
  '#59c2ff': '#bab1ff',
  '#aad94c': '#6ee6ff',
  '#95e6cb': '#fbfbfb',
}

export function UrlBuilder() {
  const [style, setStyle] = useState<IconStyle>('two-tone')
  const [selected, setSelected] = useState<string[]>([])

  const generateUrl = useCallback(
    (cmd: string) => {
      return selected
        .map(
          tag =>
            `${cmd} shadcn@latest add http://localhost:3000/r/mdi/${style}/${tag}.json`
        )
        .join('\n')
    },
    [selected, style]
  )

  const commands = useMemo(() => {
    return Object.entries(baseCommands).reduce(
      (acc, [key, { command, icon }]) => {
        acc[key] = selected[0]
          ? {
              ...baseCommands[key],
              command: generateUrl(command),
            }
          : {
              ...baseCommands[key],
              command: 'select an icon...',
            }
        return acc
      },
      {} as Record<string, CommandConfig>
    )
  }, [generateUrl, style])

  return (
    <div className="w-full md:max-w-xl flex flex-col gap-6 md:gap-4">
      <div className="flex flex-col md:flex-row gap-4 w-full md:gap-2">
        <Select
          onValueChange={value => setStyle(value as IconStyle)}
          value={style}
        >
          <SelectTrigger
            className={cn(
              'w-full md:w-fit rounded-xl h-9 font-medium px-2 pl-4 py-5',
              'ring-2 hover:ring-offset-2 hover:ring-offset-foreground/70 hover:ring-ring dark:ring-ring/50'
            )}
          >
            <SelectValue placeholder="Select a style" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {iconStyles.map(style => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <MultiIconSelect
          placeholder="Search icons..."
          selectedIcons={selected}
          setSelectedIcons={setSelected}
          style={style}
        />
      </div>
      <CodeTabs
        className="min-w-full"
        codes={commands}
        colorReplacements={colorReplacements}
        copyButton={!!selected[0]}
        defaultValue="npm"
        lang={selected[0] ? 'bash' : 'md'}
        theme="ayu-dark"
      />
    </div>
  )
}
