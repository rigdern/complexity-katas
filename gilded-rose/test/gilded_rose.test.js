const {Shop, Item} = require("../src/gilded_rose");

const ItemType = {
  SomeNormalItem: 'A normal item. The name does not matter.',
  Sulfuras: 'Sulfuras, Hand of Ragnaros',
  AgedBrie: 'Aged Brie',
  ConcertTicket: 'Backstage passes to a TAFKAL80ETC concert'
};

const QUALITY = {
  sulfurasQuality: 80,
  agedBrieQuality: 2,
  normalItemQuality: 25,
  concertQuality: 5,
  itemQualityMin: 0,
  itemQualityMax: 50,
};

describe("New Gilded Rose", function() {
  it("should match the old Sulfuras values", function() {
    const quality = QUALITY.sulfurasQuality;
    const sellIn = 5;
    const gildedRoseOld = new Shop([new Item(ItemType.Sulfuras, sellIn, quality)]);
    const gildedRoseNew = new Shop([new Item(ItemType.Sulfuras, sellIn, quality)]);
    for (let i = 0; i < 10; i++) {
      oldItems = gildedRoseOld.updateQuality()
      newItems = gildedRoseNew.updateQualityNew()
      expect(newItems).toEqual(oldItems)
    }
  })

  it("should match the old Aged Brie values", function() {
    const quality = QUALITY.agedBrieQuality;
    const sellIn = 5;
    const gildedRoseOld = new Shop([new Item(ItemType.AgedBrie, sellIn, quality)]);
    const gildedRoseNew = new Shop([new Item(ItemType.AgedBrie, sellIn, quality)]);
    for (let i = 0; i < 60; i++) {
      oldItems = gildedRoseOld.updateQuality()
      newItems = gildedRoseNew.updateQualityNew()
      expect(newItems).toEqual(oldItems)
    }
  });

  it("should match the old normal item values", function() {
    const quality = QUALITY.normalItemQuality;
    const sellIn = 5;
    const gildedRoseOld = new Shop([new Item(ItemType.SomeNormalItem, sellIn, quality)]);
    const gildedRoseNew = new Shop([new Item(ItemType.SomeNormalItem, sellIn, quality)]);
    for (let i = 0; i < 60; i++) {
      oldItems = gildedRoseOld.updateQuality()
      newItems = gildedRoseNew.updateQualityNew()
      expect(newItems).toEqual(oldItems);
    }
  });
})

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
      // console.log("sulfuras sell in date", sellIn)
    }
  });

  // Aged Brie item tests
  // 

  it("should increase the quality of the aged brie item", function() {
    const quality = QUALITY.agedBrieQuality;
    const sellIn = 3;
    let items = [new Item(ItemType.AgedBrie, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; i++) {
      items = gildedRose.updateQuality();
      // console.log(items[0].quality);
    }
    expect(items[0].quality).toBe(quality + sellIn + ((10 - sellIn) * 2));
  });

  it("should not increase the quality of the aged brie item above 50", function() {
    const quality = 45;
    const sellIn = 3;
    let items = [new Item(ItemType.AgedBrie, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; i++) {
      items = gildedRose.updateQuality();
      // console.log(items[0].quality);
    }
    expect(items[0].quality).toBeLessThanOrEqual(50);
  });

  // Concert ticket item tests
  // 

  it("should increase the quality of the concert ticket item by 2 until sellin is 5 or less", function() {
    const quality = QUALITY.concertQuality;
    const sellIn = 10;
    let items = [new Item(ItemType.ConcertTicket, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < sellIn-5; i++) {
      items = gildedRose.updateQualityNew();
      // console.log(items[0].quality);
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
      items = gildedRose.updateQualityNew();
      // console.log(items[0].quality);
      expect(items[0].quality).toBe(quality + (sellIn - i) + 1);
    }
  });

  it("should increase the quality of the concert ticket item by 3 when sellin is less than 5", function() {
    const quality = QUALITY.concertQuality;
    const sellIn = 5;
    let items = [new Item(ItemType.ConcertTicket, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQualityNew();
      // console.log(items[0].quality);
      expect(items[0].quality).toBe(quality + 3*(i+1));
    }
  });

  it("should drop quality to 0 when sellIn = 0 and forever", function() {
    const quality = QUALITY.concertQuality;
    const sellIn = 0;
    let items = [new Item(ItemType.ConcertTicket, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQualityNew();
      // console.log(items[0].quality);
      expect(items[0].quality).toBe(0);
    }
  });

  it("should never have a quality higher than 50", function() {
    const quality = 40;
    const sellIn = 10;
    let items = [new Item(ItemType.ConcertTicket, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 50; i++) {
      items = gildedRose.updateQualityNew();
      // console.log(items[0].quality);
      expect(items[0].quality).toBeLessThanOrEqual(50);
    }
  });

  // Normal item tests
  //

  it("should decrease sell in of normal item by 1 per day", function() {
    const quality = QUALITY.normalItemQuality;
    const sellIn = 5;
    let currentSellIn = sellIn;
    let items = [new Item(ItemType.SomeNormalItem, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; i++) {
      items = gildedRose.updateQuality();
      --currentSellIn;
      expect(items[0].sellIn).toBe(currentSellIn);
    }
  });

  it("should decrease quality of normal item by 1 per day before expiration", function() {
    const quality = QUALITY.normalItemQuality;
    const sellIn = 100;
    let currentQuality = quality;
    let items = [new Item(ItemType.SomeNormalItem, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; i++) {
      items = gildedRose.updateQuality();
      --currentQuality;
      expect(items[0].quality).toBe(currentQuality);
    }
  });

  it("should decrease quality of normal item by 2 per day at or after expiration", function() {
    const quality = QUALITY.normalItemQuality;
    const sellIn = 0;
    let currentQuality = quality;
    let items = [new Item(ItemType.SomeNormalItem, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; i++) {
      items = gildedRose.updateQuality();
      currentQuality -= 2;
      expect(items[0].quality).toBe(currentQuality);
    }
  });

  it("should never decrease quality of normal item to be below 0", function() {
    const quality = 5;
    const sellIn = 0;
    let items = [new Item(ItemType.SomeNormalItem, sellIn, quality)];
    const gildedRose = new Shop(items);
    for (let i = 0; i < 10; i++) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toBeGreaterThanOrEqual(0);
    }
    expect(items[0].quality).toBe(0);
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