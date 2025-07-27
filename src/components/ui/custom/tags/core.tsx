'use client'

import { createContext, useContext, useRef, useMemo } from 'react'
import type { ComponentProps, MouseEventHandler } from 'react'
import { XIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CommandInput } from '@/components/ui/command'
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'

export { TagsContent, type TagsContentProps } from './content'

export type TagComponentType = 'dialog' | 'drawer'

export type TagsProviderProps<T extends TagComponentType = 'dialog'> = {
  title?: string
  description?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  as: T
  children?: React.ReactNode
} & (T extends 'dialog'
  ? React.ComponentProps<typeof Dialog>
  : React.ComponentProps<typeof Drawer>)

type TagsContextType<T extends TagComponentType = 'dialog'> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  as: T
}

const TagsContext = createContext<TagsContextType<TagComponentType>>({
  as: 'dialog',
  open: false,
  onOpenChange: () => {},
})

export const useTagsContext = () => {
  const context = useContext(TagsContext)

  if (!context) {
    throw new Error('useTagsContext must be used within a TagsProvider')
  }

  return context
}

export function Tags<T extends TagComponentType = 'dialog'>({
  open,
  onOpenChange,
  title,
  description,
  children,
  as,
  ...props
}: TagsProviderProps<T>) {
  const isDialog = as === 'dialog'
  const Base = isDialog ? Dialog : Drawer
  const Header = isDialog ? DialogHeader : DrawerHeader
  const Title = isDialog ? DialogTitle : DrawerTitle
  const Description = isDialog ? DialogDescription : DrawerDescription

  const ctx: TagsContextType<T> = useMemo(
    () => ({
      open,
      onOpenChange,
      as,
    }),
    [open, onOpenChange, as]
  )

  return (
    <TagsContext.Provider value={ctx}>
      <Base onOpenChange={onOpenChange} open={open} {...props}>
        <Header className="sr-only">
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Header>
        {children}
      </Base>
    </TagsContext.Provider>
  )
}

type TagsTriggerPropsCore = ComponentProps<typeof Button>
export type TagsTriggerProps = Omit<TagsTriggerPropsCore, 'children'> & {
  placeholder?: string
  selectedItems: string[]
  handleRemove: (item: string) => void
  tagClassName?: string
}

export const TagsTrigger = ({
  className,
  selectedItems,
  handleRemove,
  tagClassName,
  placeholder,
  ...props
}: TagsTriggerProps) => {
  const { open, onOpenChange } = useTagsContext()
  return (
    <Button
      className={cn(
        'relative w-full rounded-xl h-auto justify-between p-2',
        'ring-2 hover:ring-offset-2 hover:ring-offset-foreground/70 hover:ring-ring dark:ring-ring/50',
        className
      )}
      role="combobox"
      variant="outline"
      {...props}
      onClick={() => onOpenChange(!open)}
    >
      <div className="flex flex-wrap items-center gap-1">
        {selectedItems.map(tag => (
          <TagsValue
            className={cn(tagClassName)}
            key={tag}
            onRemove={() => handleRemove(tag)}
            variant="secondary"
          >
            {tag}
          </TagsValue>
        ))}
        <span className="px-2 py-px text-muted-foreground flex items-center">
          <div className="flex items-center space-x-1 h-4">
            <span className="text-primary font-mono text-xs">{'>'}</span>
            <div className="bg-brand-primary h-3 w-1.5 animate-[blink_1s_step-end_infinite]" />
            <span className="sr-only">Loading</span>
          </div>
          {placeholder ?? 'Select a tag...'}
        </span>
      </div>
    </Button>
  )
}

export type TagsValueProps = ComponentProps<typeof Badge>

export const TagsValue = ({
  className,
  children,
  onRemove,
  ...props
}: TagsValueProps & { onRemove?: () => void }) => {
  const handleRemove: MouseEventHandler<HTMLDivElement> = event => {
    event.preventDefault()
    event.stopPropagation()
    onRemove?.()
  }

  return (
    <Badge className={cn('flex items-center gap-2', className)} {...props}>
      {children}
      {onRemove && (
        <div
          className="size-auto cursor-pointer hover:text-muted-foreground"
          onClick={handleRemove}
        >
          <XIcon size={12} />
        </div>
      )}
    </Badge>
  )
}

export type TagsInputProps = ComponentProps<typeof CommandInput>

export const TagsInput = ({
  className,
  value,
  onValueChange,
  ...props
}: TagsInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <CommandInput
      aria-describedby={
        value && value.length > 0 ? 'search-help' : undefined
      }
      aria-label="Search"
      {...props}
      autoFocus={true}
      className={cn('h-9', className)}
      data-slot="command-input"
      onValueChange={onValueChange}
      ref={inputRef}
      value={value}
    />
  )
}
