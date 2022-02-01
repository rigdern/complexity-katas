class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const ItemType = {
  SomeNormalItem: 'A normal item. The name does not matter.',
  Sulfuras: 'Sulfuras, Hand of Ragnaros',
  AgedBrie: 'Aged Brie',
  ConcertTicket: 'Backstage passes to a TAFKAL80ETC concert'
};

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQualityNew() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i]
      if (item.name == 'Sulfuras, Hand of Ragnaros') {
        // this.items[i].quality does not change
        // this.items[i].sellIn also does not change
      } else if (item.name == 'Aged Brie') {
        item.quality = Math.min(50, item.quality + (item.sellIn > 0 ? 1 : 2))
        item.sellIn -= 1
      } else if (item.name === ItemType.SomeNormalItem) {
        item.quality = Math.max(0, item.quality - (item.sellIn > 0 ? 1 : 2));
        item.sellIn -= 1;
      } else if (item.name === ItemType.ConcertTicket) {
        if (item.sellIn <= 0) {
          item.quality = 0
        } else {
          let increase = 0
          if (item.sellIn > 10) {
            increase = 1
          } else if (item.sellIn > 5) {
            increase = 2
          } else if (item.sellIn > 0) {
            increase = 3
          }
          // const increase = (3 - Math.floor(item.sellIn / 5)) 
          item.quality = Math.min(50, item.quality + increase)
        }
        item.sellIn -= 1;
      }
    }

    return this.items
  }

  // Observed behaviors in old implementation
  //   - Doesn't report an error if a normal item starts with a quality higher
  //     than the max allowed (50).
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
