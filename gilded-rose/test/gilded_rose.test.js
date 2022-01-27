const {Shop, Item} = require("../src/gilded_rose");

const ItemType = {
  SomeNormalItem: 'Some normal item. The name does not have to match a specific string.',
  Sulfuras: 'Sulfuras, Hand of Ragnaros',
};

const sulfurasQuality = 80;
const itemMinQuality = 0;
const itemMaxQuality = 50;

describe("Gilded Rose", function() {
  // Sulfuras item tests
  // 

  it("should not modify the quality of a Sulfuras item", function() {
    for (let sellIn = -10; sellIn <= 10; ++sellIn) {
      const quality = sulfurasQuality;
      const gildedRose = new Shop([new Item(ItemType.Sulfuras, sellIn, quality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality);
    }
  });

  it("should not modify the sell in of a Sulfuras item", function() {
    const quality = sulfurasQuality;
    const sellIn = 5;
    let items = [new Item(ItemType.Sulfuras, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; ++i) {
      items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(sellIn);
    }
  });

  // Normal item tests
  //

  it("should decrease sell in of Normal item by 1 for each day that passes", function() {
    const quality = itemMaxQuality;
    const sellIn = 5;
    let items = [new Item(ItemType.SomeNormalItem, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; ++i) {
      items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(sellIn - 1 - i);
    }
  });

  it("should decrease quality of Normal item by 1 for each day that passes before sell by", function() {
    const quality = itemMaxQuality;
    const sellIn = 5;
    let items = [new Item(ItemType.SomeNormalItem, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < sellIn; ++i) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality - 1 - i);
    }
  });

  it("should decrease quality of Normal item by 2 when sell by is 0", function() {
    const quality = itemMaxQuality;
    const sellIn = 0;
    let items = [new Item(ItemType.SomeNormalItem, sellIn, quality)];
    const gildedRose = new Shop(items);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(quality - 2);
  });

  it("should decrease quality of Normal item by 2 for each day that passes after sell by", function() {
    const quality = itemMaxQuality;
    const sellIn = 0;
    let items = [new Item(ItemType.SomeNormalItem, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; ++i) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(quality - 2*(i+1));
    }
  });

  it("should not drop quality of Normal item to be below 0", function() {
    const quality = 1;
    const sellIn = -1;
    let items = [new Item(ItemType.SomeNormalItem, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; ++i) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    }
  });

  it("should decrease sell in of Normal items by 1 for each day that passes", function() {
    const quality = itemMaxQuality;
    const sellIn = 5;
    let items = [
      new Item(ItemType.SomeNormalItem, sellIn, quality),
      new Item(ItemType.SomeNormalItem, sellIn, quality),
    ];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; ++i) {
      items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(sellIn - 1 - i);
      expect(items[1].sellIn).toBe(sellIn - 1 - i);
    }
  });

  // TODO: Add tests for other item types
  //

});

// Example items
//
// const items = [
//   new Item("+5 Dexterity Vest", 10, 20),
//   new Item("Aged Brie", 2, 0),
//   new Item("Elixir of the Mongoose", 5, 7),
//   new Item("Sulfuras, Hand of Ragnaros", 0, 80),
//   new Item("Sulfuras, Hand of Ragnaros", -1, 80),
//   new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
//   new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
//   new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

//   // This Conjured item does not work properly yet
//   new Item("Conjured Mana Cake", 3, 6),
// ];