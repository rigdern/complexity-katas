const {Shop, Item} = require("../src/gilded_rose");

const ItemType = {
  Sulfuras: 'Sulfuras, Hand of Ragnaros',
};

const sulfurasQuality = 80;

describe("Gilded Rose", function() {
  // Sulfuras item tests
  // 

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

  // TODO: Add more tests
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