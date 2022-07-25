import { SpecialItems } from './consts';

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
		for (const item of this.items) {
			switch (item.name) {
				case SpecialItems.AGED_BRIE: {
					if (item.quality < 50) item.quality = item.quality + 1;

					item.sellIn = item.sellIn - 1;

					if (item.sellIn < 0) {
						if (item.quality < 50) {
							item.quality = item.quality + 1;
						}
					}

					continue;
				}

				case SpecialItems.BACKSTAGE: {
					if (item.quality < 50) {
						item.quality = item.quality + 1
						if (item.sellIn < 11) {
							if (item.quality < 50) {
								item.quality = item.quality + 1
							}
						}
						if (item.sellIn < 6) {
							if (item.quality < 50) {
								item.quality = item.quality + 1
							}
						}
					}

					item.sellIn = item.sellIn - 1;

					if (item.sellIn < 0) item.quality = item.quality - item.quality;

					continue;
				}

				case SpecialItems.SULFURAS:
					continue;

				default: {
					if (item.quality > 0) item.quality = item.quality - 1;

					item.sellIn = item.sellIn - 1;

					if (item.sellIn < 0) {
						if (item.quality > 0) {
							item.quality = item.quality - 1;
						}
					}
					
					continue;
				}
			}
		}

		return this.items;
	}
}
