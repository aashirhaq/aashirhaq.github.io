/** Shared content types for experience entries, case studies and diagrams. */

export type NodeKind =
  | "client"
  | "edge"
  | "service"
  | "store"
  | "cache"
  | "queue"
  | "external"
  | "observability"

export interface DiagramNode {
  id: string
  label: string
  kind: NodeKind
  /** Grid column, 0-indexed left to right. */
  col: number
  /** Grid row within the column, 0-indexed top to bottom. */
  row: number
  /** Optional short annotation rendered in mono beneath the label. */
  note?: string
}

export interface DiagramEdge {
  from: string
  to: string
  label?: string
  /** Render an animated packet travelling along this edge. */
  flow?: boolean
  /** Draw as a dashed line — asynchronous or out-of-band path. */
  async?: boolean
}

export interface Diagram {
  /** Number of grid columns; drives the SVG viewBox width. */
  cols: number
  /** Number of grid rows; drives the SVG viewBox height. */
  rows: number
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  /** Plain-language description, also used as the SVG accessible label. */
  caption: string
}

export interface Metric {
  value: string
  label: string
}

export interface SystemStory {
  problem: string
  scale: string
  system: string
  contribution: string
  result: string
}

export interface Role {
  title: string
  period: string
}

export interface Experience {
  id: string
  company: string
  /** Legal or parent entity, where it differs from the trading name. */
  entity?: string
  location: string
  period: string
  /** Role progression within the same company, most recent first. */
  roles: Role[]
  /** One-line framing of what the company does. */
  context: string
  story: SystemStory
  metrics: Metric[]
  technologies: string[]
  diagram?: Diagram
  /** Featured roles get the full story treatment; others are listed compactly. */
  featured: boolean
}

export interface CaseStudySection {
  heading: string
  body: string
  points?: string[]
}

export interface Project {
  slug: string
  title: string
  tagline: string
  /** Short label for the role played, e.g. "Backend architecture". */
  role: string
  period: string
  org?: string
  technologies: string[]
  metrics: Metric[]
  liveUrl?: string
  /** Featured projects get a dedicated case-study page. */
  featured: boolean
  /** Long-form case study. Only present on featured projects. */
  caseStudy?: {
    problem: string
    constraints: string[]
    sections: CaseStudySection[]
    diagram?: Diagram
    results: string[]
  }
}

export interface StackDomain {
  id: string
  name: string
  /** Shorter label for the stack map, where full names can overrun the viewBox. */
  short?: string
  /** What this domain means in practice for this engineer. */
  summary: string
  items: string[]
}
