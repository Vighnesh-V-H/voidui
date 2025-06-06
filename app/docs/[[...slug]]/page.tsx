import DocPage from '@/components/doc-page'

export { generateMetadata } from '@/components/doc-page'

interface DocPageProps {
  params: {
    slug: string[]
  }
}

export default function Page({ params }: DocPageProps) {
  return <DocPage params={params} />
}

export const dynamicParams = false
//             <div className="text-foreground">{doc.title}</div>
//           </div>
//           <div className="space-y-2">
//             <h1 className={cn("scroll-m-20 text-3xl font-bold tracking-tight")}>
//               {doc.title}
//             </h1>
//             {doc.description && (
//               <p className="text-base text-muted-foreground">
//                 <Balancer>{doc.description}</Balancer>
//               </p>
//             )}
//           </div>
//           {doc.links ? (
//             <div className="flex items-center space-x-2 pt-4">
//               {doc.links?.doc && (
//                 <Link
//                   href={doc.links.doc}
//                   target="_blank"
//                   rel="noreferrer"
//                   className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
//                 >
//                   Docs
//                   {/* <ExternalLink className="h-3 w-3" /> */}
//                 </Link>
//               )}
//               {doc.links?.api && (
//                 <Link
//                   href={doc.links.api}
//                   target="_blank"
//                   rel="noreferrer"
//                 //   className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
//                 >
//                   API Reference
//                   {/* <ExternalLink className="h-3 w-3" /> */}
//                 </Link>
//               )}
//             </div>
//           ) : null}
//           <div className="pb-12 pt-8">
//             <Mdx code={doc.body.code} />
//           </div>
//           <DocsPager doc={doc} />
//         </div>
//         <div className="hidden text-sm xl:block">
//           <div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4">
//             <div className="no-scrollbar h-full overflow-auto pb-10">
//               {doc.toc && <DashboardTableOfContents toc={toc} />}
//               <OpenInV0Cta className="mt-6 max-w-[80%]" />
//             </div>
//           </div>
//         </div>
//       </main>
//     )
//   }