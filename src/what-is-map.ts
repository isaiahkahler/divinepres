// map is a method on every array that lets you transform every element

// [0, 1, 2] == x + 1 ==>  [1,2,3]

const array = [0,1,2];
const mapped = array.map(x => x * x);

// console.log(mapped);

function map<Item, NewItem>(list: Item[], mapper: (item: Item) => NewItem) {
    const newList: NewItem[] = [];

    for (const item of list) {
        const mappedItem = mapper(item);
        newList.push(mappedItem);
    }

    return newList;
}


const alsoMapped = map(array, x => `cool: ${x + 1}`);


