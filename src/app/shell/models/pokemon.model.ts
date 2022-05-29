export interface Pokemon {
  abilities?: [
    {
      ability?:{
        name?: string,
        url?: string
      },
      is_hidden?: boolean,
      slot?: number
    }
  ],
  base_experience?: number,
  game_indices?: [
    {
      game_index?: number,
      version?: {
        name?: string,
        url?: string
      }
    }
  ],
  height?: number,
  id?: number,
  moves?: [
    {
      move?: {
        name?: string
      },
      version_group_details?: [
        {
          level_learned_at?: number,
          move_learn_method?: {
            name?: string
          },
          version_group?: {
            name?: string
          }
        }
      ]
    }
  ],
  name?: string,
  species?: {
    url?: string
  },
  sprites?: {
    back_default?: string,
    front_default?: string,
    other?: {
      ['official-artwork']?: {
        front_default?: string
      },
      home?: {
        front_default?: string
      }
    },
  },
  stats?: [
    {
      base_stat?: number,
      effort?: number,
      stat?: {
        name?: string,
      }
    }
  ],
  types?: [
    {
      slot?: number,
      type?: {
        name?: string
      }
    }
  ],
  weight?: number,
}