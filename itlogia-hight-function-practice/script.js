let brands = [];
let types = [];
let products = [];

Promise.all(
    [
        fetch("brands.json"),
        fetch("types.json"),
        fetch("products.json"),
    ]
).then(async ([brandsResponse, typesResponse, productsResponse]) => {
    const brandJson = await brandsResponse.json();
    const typesJson = await typesResponse.json();
    const productsJson = await productsResponse.json();
    return [brandJson, typesJson, productsJson];
})
.then (response => {
    brands = response[0];
    types = response[1];
    products = response[2];

    taskSix();
})

function taskOne() {
    let samsung = brands.find(item => item.title.toLocaleLowerCase() === 'samsung');
    if (samsung) {
        let result = products.filter(item => {
            return item.brandId === samsung.id;
        })
        console.log(result);
    }
}

function taskTwo() {
    let result = products.map(item => {
        let brand = brands.find(brandItem => brandItem.id === item.brandId);
        if (brand && brand.title) {
            item.brand = brand.title;
        }
        delete item.brandId;

        let type = types.find(typesItem => typesItem.id === item.typeId);
        if (type && type.name) {
            item.type = type.name;
        }
        delete item.typeId;

        return item;
    })
    console.log(result);
}

function taskThree() {
    let result = products.map(item => {
        let sum = 0;
        item.reviews.forEach(review => {
            sum += review.stars;
        })
        return {
            title: item.title,
            rating: +(sum / item.reviews.length).toFixed(1),
        }
    })
    console.log(result);
}

function taskFour() {
    let maxPower = 0;
    let maxPowerItem = null;
    products.forEach(item => {
        let commonCharacteristics = item.characteristics.find(category => {
            return category.name.toLowerCase() === "основные";
        })

        if (commonCharacteristics && commonCharacteristics.value) {
            let power = commonCharacteristics.value.find(characteristics => {
                return characteristics.name.toLowerCase() === 'мощность';
            })

            if (power && power.value) {
                let powerNum = parseInt(power.value);
                if (!isNaN(powerNum) && powerNum > maxPower) {
                    maxPower = powerNum;
                    maxPowerItem = item;
                }
            }
        }
    })
    console.log(maxPower);
    console.log(maxPowerItem);
}

function taskFive() {
    let result = products.find(item => {
        return item.reviews.findIndex(review => {
            return review.person === "Валерий Рудерман"
        }) > -1;
    })
    console.log(result);
}

function taskSix() {
    let reviews = [];
    products.forEach(item => {
        let itemReviews = item.reviews.filter(review => {
            let dateParts = review.date.split('.');
            let reviewDate = new Date(+dateParts[2], +dateParts[1], +dateParts[0]);
            return reviewDate > new Date(2022, 1, 1);
        })
        reviews.push(itemReviews);
        reviews = reviews.flat()
    })
    console.log(reviews);
}
