/**
 * For JSON files to work good with TS we need to recreate their basic structure
 * extending the simple string object (Record<string, string>) with sub-levels
 */

type OpenObject = Record<string, string>
type StringsModule = {
  secondLevel: OpenObject & {
    thirdLevel: OpenObject
  }
}
declare module '*multiLevel.json' {
  const content: OpenObject & StringsModule
  export default content
}

/* For single-level JSON files, a simple string object (Record<string, string>) is enough */

declare module '*singleLevel.json' {
  const content: Record<string, string>
  export default content
}

/* For other files, like images, exporting a string suffices */

declare module '*.svg' {
  const content: string
  export default content
}
declare module '*.png' {
  const content: string
  export default content
}
declare module '*.graphql' {
  const content: string
  export default content
}
