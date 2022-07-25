import { ConjuredItems, SpecialItems } from './consts';

export class Item {
	name: string;
	sellIn: number;
	quality: number;

	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}

export class GildedRose {
	items: Array<Item>;

	constructor(items = [] as Array<Item>) {
		this.items = items;
	}

	updateQuality() {
		// gather conjured item names
		const conjuredItemNames = Object.values(ConjuredItems);

		for (const item of this.items) {
			if (!conjuredItemNames.includes(item.name)) {
				switch (item.name) {
					case SpecialItems.AGED_BRIE: {
						// For increased quality cases, do not touch in case of greater than 50 calculation
						if (item.quality < 50) {
							// "Aged Brie" actually increases in Quality the older it gets
							item.quality = item.quality + 1;
							item.sellIn = item.sellIn - 1;
							// Once the sell by date has passed, Quality increases twice as fast (normally degrades but aged brie increases)
							// The Quality of an item is never more than 50
							if (item.sellIn < 0 && item.quality < 50) item.quality = item.quality + 1;
						} else {
							// sellIn decrease for quality >=50 case
							item.sellIn = item.sellIn - 1;
						}

						continue;
					}

					case SpecialItems.BACKSTAGE: {
						// For increased quality cases, do not touch in case of greater than 50 calculation
						if (item.quality < 50) {
							// "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches
							item.quality = item.quality + 1;
							// Quality increases by 2 when there are 10 days
							if (item.sellIn < 11) item.quality = item.quality + 1;
							// Quality increases by 3 when there are 5 days or less
							if (item.sellIn < 6) item.quality = item.quality + 1;
							// The Quality of an item is never more than 50
							if (item.quality > 50) item.quality = 50;
						}

						item.sellIn = item.sellIn - 1;
						// Quality drops to 0 after the concert
						if (item.sellIn < 0) item.quality = 0;

						continue;
					}

					case SpecialItems.SULFURAS:
						// "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
						continue;

					default: {
						// For decreased quality cases, do not touch in case of negative calculation
						if (item.quality > 0) {
							// The Quality of an item is never negative
							item.quality = item.quality - 1;
							item.sellIn = item.sellIn - 1;
							// Once the sell by date has passed, Quality degrades twice as fast && The Quality of an item is never negative
							if (item.sellIn < 0 && item.quality > 0) item.quality = item.quality - 1;
						} else {
							// sellIn decrease for quality <= 0 case
							item.sellIn = item.sellIn - 1;
						}

						continue;
					}
				}
			} else {
				// For decreased quality cases, do not touch in case of negative calculation
				if (item.quality > 1) {
					// The Quality of an item is never negative && "Conjured" items degrade in Quality twice as fast as normal items
					item.quality = item.quality - 2;
					item.sellIn = item.sellIn - 1;
					// Once the sell by date has passed, Quality degrades twice as fast && The Quality of an item is never negative
					// "Conjured" items degrade in Quality twice as fast as normal items
					if (item.sellIn < 0 && item.quality > 1) item.quality = item.quality - 2;
				} else {
					// sellIn decrease for quality <= 1 case
					item.sellIn = item.sellIn - 1;
				}
			}
		}

		return this.items;
	}
}
