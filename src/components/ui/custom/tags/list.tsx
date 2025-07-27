'use client'

import {
  CommandList,
  CommandEmpty,
  CommandGroup,
} from '@/components/ui/command'
import { Spinner } from '@/components/kibo-ui/spinner'
import { cn } from '@/lib/utils'

export type TagsEmptyProps = React.ComponentProps<typeof CommandEmpty>

export const TagsEmpty = ({
  children,
  className,
  ...props
}: TagsEmptyProps) => (
  <CommandEmpty {...props}>{children ?? 'No tags found.'}</CommandEmpty>
)

export type CommandListProps = React.ComponentProps<typeof CommandList>

type ResultType = { id: string; name: string }

export interface TagsListProps<T extends ResultType>
  extends Omit<CommandListProps, 'results' | 'children'> {
  isLoading: boolean
  results: T[]
  children: (item: T) => React.ReactNode
}

export const TagsList = <T extends ResultType>({
  children,
  isLoading,
  results,
  className,
  ...props
}: TagsListProps<T>) => (
  <CommandList className={cn('min-h-[200px]', className)}>
    {isLoading && (
      <div className="py-6 flex items-center justify-center">
        <Spinner variant="bars" />
      </div>
    )}
    {!isLoading && <TagsEmpty />}
    <CommandGroup>
      {!isLoading && results.map(tag => children(tag))}
    </CommandGroup>
  </CommandList>
)
