'use client'

import { useState, useCallback } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { useSearch } from '@/hooks/use-search'
import {
  Tags,
  TagsInput,
  TagsTrigger,
  TagsContent,
} from './ui/custom/tags/core'
import { TagsList } from './ui/custom/tags/list'
import { TagsItem } from './ui/custom/tags/item'
import { toastWarning } from '@/lib/toast'
import icons from '@/data/icon-search.json'
import type { IconStyle } from '@/types/mdi'

const MUI_CDN_URL = process.env.NEXT_PUBLIC_MUI_CDN_URL

interface MultiIconSelectProps {
  placeholder?: string
  style: IconStyle
  selectedIcons: string[]
  setSelectedIcons: React.Dispatch<React.SetStateAction<string[]>>
}

export function MultiIconSelect({
  style,
  selectedIcons,
  setSelectedIcons,
  placeholder = 'Select an icon...',
}: MultiIconSelectProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [open, setOpen] = useState(false)

  const searchIcons = useCallback(
    (query: string) => {
      return icons.filter(
        icon =>
          icon.name.toLowerCase().includes(query.toLowerCase()) &&
          icon.styles.includes(style)
      )
    },
    [style]
  )

  const {
    results,
    isLoading,
    query,
    setQuery,
    handleKeyDown,
    resetInput,
  } = useSearch({ searchFn: searchIcons })

  const handleSelect = (value: string) => {
    if (selectedIcons.includes(value)) {
      handleRemove(value)
      return
    }

    if (selectedIcons.length >= 5) {
      toastWarning('You can only select up to 5 icons at a time')
      return
    }
    resetInput()
    setSelectedIcons(prev => [...prev, value])
    setOpen(false)
  }

  const handleRemove = (value: string) => {
    if (!selectedIcons.includes(value)) return
    setSelectedIcons(prev => prev.filter(v => v !== value))
  }

  const baseProps = {
    direction: 'top',
    onOpenChange: setOpen,
    open: open,
    as: isDesktop ? 'dialog' : 'drawer',
  } as const

  return (
    <Tags {...baseProps}>
      <TagsTrigger
        className="shrink-1"
        handleRemove={handleRemove}
        placeholder={placeholder}
        selectedItems={selectedIcons}
        tagClassName="bg-brand-primary/70"
      />
      <TagsContent
        aria-describedby="Select an icon"
        inputComponent={
          <TagsInput
            onKeyDown={handleKeyDown}
            onValueChange={setQuery}
            placeholder="Search icons..."
            value={query}
          />
        }
      >
        <TagsList isLoading={isLoading} results={results}>
          {tag => (
            <TagsItem
              handleRemove={handleRemove}
              handleSelect={handleSelect}
              imgProps={{
                alt: tag.name,
                src: `${MUI_CDN_URL}/${style}/${tag.id}.svg`,
              }}
              isSelected={selectedIcons.includes(tag.id)}
              key={tag.id}
              label={tag.name}
              value={tag.id}
            />
          )}
        </TagsList>
      </TagsContent>
    </Tags>
  )
}
