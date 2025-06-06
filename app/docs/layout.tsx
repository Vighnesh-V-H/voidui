import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { allDocs } from 'contentlayer2/generated'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Explore our comprehensive documentation',
}

function getSidebarItems() {
  const items = allDocs.reduce<Record<string, Array<{ title: string; href: string }>>>((acc, doc) => {
    const [category, ...rest] = doc.slugAsParams.split('/')
    if (!category) return acc
    
    if (!acc[category]) {
      acc[category] = []
    }
    
    if (rest.length > 0) {
      acc[category].push({
        title: doc.title,
        href: `/docs/${doc.slugAsParams}`,
      })
    }
    
    return acc
  }, {} as Record<string, Array<{ title: string; href: string }>>)
  
  return Object.entries(items).map(([category, categoryItems]) => ({
    category,
    items: categoryItems,
  }))
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = getSidebarItems()

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 border-r border-border bg-secondary/50 overflow-y-auto h-screen sticky top-0">
        <nav className="p-4">
          <Link href="/docs">
            <h2 className="text-lg font-semibold mb-4 hover:underline">Documentation</h2>
          </Link>
          
          <div className="space-y-6">
            {sidebarItems.map((section) => (
              <div key={section.category} className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {section.category}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-1 px-2 py-1.5 text-sm rounded-md hover:bg-accent transition-colors"
                      >
                        <span className="text-muted-foreground">→</span>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-10">
        <div className="prose dark:prose-invert max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
