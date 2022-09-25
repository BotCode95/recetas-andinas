export interface Receta{
    id: number,
    name: string,
    review: number,
    ingredients: Ingredients[],
    preparation?: string,
    active: boolean

}

export interface Ingredients{
    id: number,
    description?:string
}