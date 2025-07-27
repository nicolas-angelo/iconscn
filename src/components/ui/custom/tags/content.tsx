'use client'

import { Command } from '@/components/ui/command'
import { DialogContent } from '@/components/ui/dialog'
import { DrawerContent } from '@/components/ui/drawer'
import { useTagsContext } from './core'
import { cn } from '@/lib/utils'

type CommandBaseProps = React.ComponentProps<typeof Command>
type CommandProps = Pick<
  CommandBaseProps,
  | 'className'
  | 'children'
  | 'filter'
  | 'shouldFilter'
  | 'autoFocus'
  | 'aria-describedby'
>

export interface TagsContentProps extends CommandProps {
  inputComponent: React.ReactNode
  dialogContentProps?: React.ComponentProps<typeof DialogContent>
  drawerContentProps?: React.ComponentProps<typeof DrawerContent>
}

export const TagsContent = ({
  className,
  inputComponent,
  children,
  shouldFilter = false,
  dialogContentProps,
  drawerContentProps,
  ...props
}: TagsContentProps) => {
  const { as } = useTagsContext()
  const Content = as === 'dialog' ? DialogContent : DrawerContent
  const containerProps =
    as === 'dialog' ? dialogContentProps : drawerContentProps
  return (
    <Content
      {...containerProps}
      className={cn('overflow-hidden p-0', containerProps?.className)}
    >
      <Command
        data-slot="command"
        {...props}
        className={cn(
          '[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5',
          className
        )}
        shouldFilter={shouldFilter}
      >
        {inputComponent}
        {children}
      </Command>
    </Content>
  )
}
