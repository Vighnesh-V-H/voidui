import { allDocs, type Doc } from 'contentlayer2/generated'
import { notFound } from 'next/navigation'
import { Mdx } from './mdx-components'
import { Metadata } from 'next'

interface DocPageProps {
  params: {
    slug: string[]
  }
}

export function DocPage({ params }: DocPageProps) {
  const slug = params.slug?.join('/') || 'getting-started'
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    notFound()
  }

  return (
    <div className="space-y-4">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
        {doc.title}
      </h1>
      {doc.description && (
        <p className="text-xl text-muted-foreground">
          {doc.description}
        </p>
      )}
      <div className="[&>*:first-child]:-mt-6">
        <Mdx code={doc.body.code} />
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const slug = params.slug?.join('/') || 'getting-started'
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
    },
  }
}

export default DocPage

export function generateStaticParams() {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split('/').filter(Boolean),
  }))
}
