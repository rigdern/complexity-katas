const {Shop, Item} = require("../src/gilded_rose");

const ItemType = {
  Sulfuras: 'Sulfuras, Hand of Ragnaros',
  AgedBrie: 'Aged Brie',
  ConcertTicket: 'Backstage passes to a TAFKAL80ETC concert'
};

const QUALITY = {
  sulfurasQuality: 80,
  agedBrieQuality: 2,
  concertQuality: 5
};

describe("Gilded Rose", function() {
  // Sulfuras item tests
  // 

  it("should not modify the sell in of a Sulfuras item", function() {
    const quality = QUALITY.sulfurasQuality;
    const sellIn = 5;
    let items = [new Item(ItemType.Sulfuras, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; i++) {
      items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(sellIn);
    }
  });

  it("should increase the quality of the aged brie item", function() {
    const quality = QUALITY.agedBrieQuality;
    const sellIn = 3;
    let items = [new Item(ItemType.AgedBrie, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; i++) {
      items = gildedRose.updateQuality();
      console.log(items[0].quality);
    }
    expect(items[0].quality).toBe(quality + sellIn + ((10 - sellIn) * 2));
  });

  it("should increase the quality of the concert ticket item by 2 until sellin is 5 or less", function() {
    const quality = QUALITY.concertQuality;
    const sellIn = 10;
    let items = [new Item(ItemType.ConcertTicket, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < sellIn-5; i++) {
      items = gildedRose.updateQuality();
      console.log(items[0].quality);
      expect(items[0].quality).toBe(quality + 2*(i+1));
    }

    // for (let i = 0; i < sellin-5; ++i) {
    //   items = gildedRose.updateQuality();
    //   console.log(items[0].quality);
    //   expect(items[0].quality).toBe(quality + sellIn + ((10 - sellIn) * 2));
    // }
    // expect(items[0].quality).toBe(quality + sellIn + ((10 - sellIn) * 2));
  });

  it("should increase the quality of the concert ticket item by 1 until sellin is 10 or less", function() {
    const quality = QUALITY.concertQuality;
    const sellIn = 15;
    let items = [new Item(ItemType.ConcertTicket, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = sellIn; i > 10; i--) {
      items = gildedRose.updateQuality();
      console.log(items[0].quality);
      expect(items[0].quality).toBe(quality + (sellIn - i) + 1);
    }
  });

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