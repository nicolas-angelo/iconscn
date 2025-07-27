'use client'

import Image from 'next/image'
import { CheckIcon } from 'lucide-react'
import { CommandItem } from '@/components/ui/command'
import { cn } from '@/lib/utils'

export type TagsItemBaseProps = React.ComponentProps<typeof CommandItem>

export const TagsItemBase = ({
  className,
  ...props
}: TagsItemBaseProps) => (
  <CommandItem
    className={cn(
      'cursor-pointer items-center justify-between',
      className
    )}
    {...props}
  />
)

export interface TagsItemProps extends TagsItemBaseProps {
  handleSelect: (value: string) => void
  handleRemove: (value: string) => void
  value: string
  label: string
  isSelected: boolean
  imgProps: Omit<React.ComponentProps<typeof Image>, 'height' | 'width'>
}

export const TagsItem = ({
  handleSelect,
  handleRemove,
  value,
  label,
  isSelected,
  imgProps,
  ...props
}: TagsItemProps) => {
  return (
    <TagsItemBase {...props} onSelect={handleSelect} value={value}>
      <div className="flex items-center gap-2 text-sm">
        <Image
          {...imgProps}
          alt={label}
          height={20}
          style={{
            filter:
              'invert(83%) sepia(42%) saturate(6856%) hue-rotate(198deg) brightness(106%) contrast(95%)',
          }}
          width={20}
        />
        {label}
      </div>
      {isSelected && (
        <CheckIcon className="text-muted-foreground" size={14} />
      )}
    </TagsItemBase>
  )
}
