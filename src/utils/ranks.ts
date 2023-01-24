export interface IRank {
    name: string
    id: string
    coinsNeeded: number
}

export interface IRankChoice {
    name: string
    value: string
}

function createRank(name: string, id: string, coinsNeeded: number): IRank {
    return {
        name,
        id,
        coinsNeeded
    }
}

function createRankChoice(name: string, value: string): IRankChoice {
    return {
        name,
        value
    }
}

export const ranks: IRank[] = [
    createRank("Default", "default_rank", 0),
    createRank("Poor", "poor_rank", 500),
    createRank("Average", "average_rank", 5000),
    createRank("Wood", "wood_rank", 10000),
    createRank("Copper", "copper_rank", 15000),
    createRank("Silver", "silver_rank", 20000),
    createRank("Gold", "gold_rank", 30000),
    createRank("Diamond", "diamond_rank", 50000),
    createRank("Platinum", "platinum_rank", 75000),
    createRank("Rich", "rich_rank", 100000),
    createRank("MegaRich", "megarich_rank", 150000),
]

export const rankChoices: IRankChoice[] = [
    createRankChoice("Default", "default_rank"),
    createRankChoice("Poor", "poor_rank"),
    createRankChoice("Average", "average_rank"),
    createRankChoice("Wood", "wood_rank"),
    createRankChoice("Copper", "copper_rank"),
    createRankChoice("Silver", "silver_rank"),
    createRankChoice("Gold", "gold_rank"),
    createRankChoice("Diamond", "diamond_rank"),
    createRankChoice("Platinum", "platinum_rank"),
    createRankChoice("Rich", "rich_rank"),
    createRankChoice("MegaRich", "megarich_rank"),
]