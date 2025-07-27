import Image from 'next/image'
import Link from 'next/link'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Header = ({
  title,
  logo,
  repo,
}: {
  title: string
  logo: string
  repo: string
}) => (
  <div className="flex items-center justify-between p-3 h-14 border-b-2 border-border shadow-sm relative">
    <div className="flex items-center gap-2">
      <Image
        alt="Faststack Logo"
        className="size-7"
        height={36}
        priority
        src={logo}
        width={36}
      />
      <h1 className="text-xl font-bold font-mono">{title}</h1>
    </div>
    <Button asChild variant="ghost">
      <Link href={repo}>
        <SiGithub className="size-6 text-foreground/90" />
      </Link>
    </Button>
  </div>
)

export const Footer = ({ xUsername }: { xUsername: string }) => (
  <div className="text-sm text-muted-foreground flex flex-col items-center justify-center py-4">
    <p className="text-muted-foreground text-sm">
      Made with ❤️ in NYC by{' '}
      <Link
        className="text-brand-primary"
        href={`https://x.com/${xUsername}`}
      >
        @{xUsername}
      </Link>
    </p>
    <p className="text-muted-foreground text-sm">© Faststack Labs 2025</p>
  </div>
)

export const Hero = ({
  title,
  subtitle,
  description,
  features = [],
  className,
}: {
  title: string
  subtitle: string
  description: string
  features?: string[]
  className?: string
}) => (
  <div
    className={cn(
      'flex flex-col text-center max-w-lg text-sm text-muted-foreground',
      className
    )}
  >
    <div className="flex flex-col gap-1 mb-4">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <h4 className="font-medium text-brand-primary">{subtitle}</h4>
    </div>
    <p className="text-sm">{description}</p>
    {features.map(feature => (
      <p className="text-sm" key={feature}>
        {feature}
      </p>
    ))}
  </div>
)
