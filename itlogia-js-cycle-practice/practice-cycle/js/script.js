var meals = [
    {
        name: "Борщ",
        grams: 500,
        kcal: 580
    },
    {
        name: "Блины с творогом",
        grams: 50,
        kcal: 112
    },
    {
        name: "Плов",
        grams: 100,
        kcal: 359
    },
    {
        name: "Печень",
        grams: 100,
        kcal: 205
    },
    {
        name: "Салат мясной",
        grams: 100,
        kcal: 385
    },{
        name: "Каша гречневая",
        grams: 80,
        kcal: 151
    },
    {
        name: "Картофель отварной",
        grams: 30,
        kcal: 28
    },
    {
        name: "Яйца вареные",
        grams: 10,
        kcal: 12.6
    },
];

function checkMeals(array) {
    for(let i = 0; i < array.length; i++) {
        array[i].kcalPer100Gram = calculateKcalPer100Grams(array[i].grams, array[i].kcal);
        if (array[i].kcalPer100Gram > 300){
            showMealInfo(array[i]);
        }
    }
}

function showMealInfo(meal) {
    console.log(`Блюдо ${meal.name} имеет ${meal.kcalPer100Gram} ккал на 100 грамм.`);
}

function calculateKcalPer100Grams(grams, kcal) {
    return Math.round(kcal / grams * 100);
}

checkMeals(meals);