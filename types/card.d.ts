declare interface ICard {
    _id: string;
    set: string;
    number: number;
    code: string;
    name: string;
    evolvesFrom: string;
    pokemonType: string;
    hp?: number;
    cardType: string;
    cardVariant: string;
    artist: string;
    ability?: ICardAbility;
    description?: string;
    flavor: string;
    attack_1?: ICardAttack;
    attack_2?: ICardAttack;
    weakness: string;
    retreat: number;
    rarity: string;
    image: string;
}

declare interface ICardAbility {
    name: string;
    effect: string;
}

declare interface ICardAttack {
    energy: string[];
    name: string;
    effect?: string;
    power?: number;
}