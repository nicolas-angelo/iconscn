import { Header, Hero, Footer } from '@/components/home'
import { UrlBuilder } from '@/components/url-builder'

export default function Home() {
  return (
    <div className="flex h-dvh flex-col">
      <Header
        logo="/logo-dark.png"
        repo="https://github.com/nicolas-angelo/iconscn"
        title="iconsCN"
      />
      <div className="flex flex-col flex-1 items-center pt-10 md:pt-0 md:justify-center p-3">
        <Hero
          className="mb-16 md:mb-10"
          description="Drop Material Icons straight into your project with shadcn."
          features={['No bulky MUI dependencies or icon fonts needed.']}
          subtitle="4x more styles than Lucide 🚀"
          title="IconsCN - Material UI Edition"
        />
        <UrlBuilder />
      </div>
      <Footer xUsername="_nicolasangelo" />
    </div>
  )
}
