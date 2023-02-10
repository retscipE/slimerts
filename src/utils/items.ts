export interface IItem {
    name: string
    description: string
    ability: string
    id: string
    coinsNeeded: number
}

function createItem(name: string, description: string, ability: string, id: string, coinsNeeded: number): IItem {
    return {
        name,
        description,
        ability,
        id,
        coinsNeeded
    }
}

export const itemObjects: IItem[] = [
    createItem(
        "Bronze Sword",
        "The most basic sword used by the weakest users",
        "Allows the user to hunt easy enemies",
        "bronze_sword",
        3000
    ),

    createItem(
        "Silver Sword",
        "The average blade forged from the lava in the blacksmith and the most common sword",
        "Allows the user to hunt medium and easy enemies",
        "silver_sword",
        10000
    ),

    createItem(
        "Platinum Sword",
        "The best blade only used by the richest and most powerful users",
        "Allows the user to hunt all enemies",
        "platinum_sword",
        30000
    ),

    createItem(
        "Slime Gun",
        "The gun mainly used by ranchers to capture those dang slimes",
        "Allows the user to capture slimes",
        "slime_gun",
        7500
    )
]