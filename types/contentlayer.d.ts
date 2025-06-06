/// <reference types="next-contentlayer2/types/next" />

// This file is used to provide type definitions for the contentlayer2 generated content
// The actual types will be generated at build time by contentlayer2

declare module 'contentlayer2/generated' {
  import { DocumentTypes } from '.contentlayer2/generated/types'
  
  // Export all document types
  export const allDocs: DocumentTypes[]
  
  // You can add more specific type exports here if needed
  export type Doc = Extract<DocumentTypes, { _type: 'Doc' }>
}
