import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
	// credit: https://www.youtube.com/watch?v=2q5PdGdlL8Y - How to test legacy code with characterization tests
	it('Generate expected tests', () => {
		const names = [
			'Aged Brie',
			'Backstage passes to a TAFKAL80ETC concert',
			'Sulfuras, Hand of Ragnaros',
			'Normal Item'
		];
		// ranges of breaking points
		const [minSellIn, maxSellIn] = [-1, 12];
		const [minQuality, maxQuality] = [-1, 51];
		// save all cases
		const tests: Array<Array<string | number>> = [];

		for (const name of names) {
			for (let sellIn = minSellIn; sellIn <= maxSellIn; sellIn++) {
				for (let quality = minQuality; quality <= maxQuality; quality++) {
					const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
					const items = gildedRose.updateQuality();
					const outputSellIn = items[0].sellIn;
					const outputQuality = items[0].quality;
					tests.push([
						name,
						sellIn,
						quality,
						outputSellIn,
						outputQuality
					]);
				}
			}
		}

		console.log(JSON.stringify(tests));
		console.log(tests.length);

	});

	it('should foo', () => {
		const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
		const items = gildedRose.updateQuality();
		expect(items[0].name).toBe('fixme');
	});
});
