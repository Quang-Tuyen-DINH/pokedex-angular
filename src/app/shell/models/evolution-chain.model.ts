export interface EvolutionChain {
    evolution_details?: [
        {
            min_level?: number
        }
    ],
    evolves_to?: EvolutionChain
    species?: {
        name?: string
    }
}