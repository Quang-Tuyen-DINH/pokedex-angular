export interface Species {
  base_happiness?: number,
  capture_rate?: number,
  egg_groups?: [
    {
      name?: string
    }
  ],
  evolution_chain: {
    url?: string
  }
  evolves_from_species?: {
    name?: string
  },
  growth_rate?: {
    name?: string
  },
  habitat?: {
    name?: string
  },
  is_legendary?: boolean,
  is_mythical?: boolean
}