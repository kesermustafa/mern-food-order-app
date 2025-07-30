export default class FoodDTO {
    constructor({name, price, description, image}) {
        this.name = FoodDTO.cleanString(name);
        this.price = price;
        this.description = FoodDTO.cleanString(description);
        this.image = FoodDTO.cleanString(image);
    }

    static cleanString(value) {
        return typeof value === 'string'
            ? value.trim().replace(/\s+/g, ' ')
            : '';
    }

    static fromPOJO(po) {
        return new FoodDTO(po);
    }

    toPOJO() {
        return {
            name: this.name,
            price: this.price,
            description: this.description,
            image: this.image,
        };
    }

    isValid() {
        const isValidName = typeof this.name === 'string' && this.name.trim().length > 0;
        const isValidPrice = typeof this.price === 'number' && this.price > 0;

        return isValidName && isValidPrice;
    }
}
