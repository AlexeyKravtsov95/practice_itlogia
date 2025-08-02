let meals = `[
    {
        "name": "Борщ",
        "grams": 500,
        "kcal": 580
    },
    {
        "name": "Блины с творогом"
    },
    {
        "name": "Плов",
        "grams": 100,
        "kcal": 359
    },
    {
        "name": "Печень",
        "grams": 100,
        "kcal": 205
    },
    {
        "name": "Салат мясной",
        "grams": 100,
        "kcal": 385
    },
    {
        "name": "Каша гречневая",
        "grams": 80,
        "kcal": 151
    },
    {
        "name": "Картофель отварной",
        "grams": 30,
        "kcal": 28
    },
    {
        "name": "Яйца вареные",
        "grams": 10,
        "kcal": 12.6
    }
]`;

function checkMeals(json) {
    let array = [];

    try {
        array = JSON.parse(json)
    } catch (af) {
        console.log(`Данные невозможно обработать. Причина: ${af.message}`);
    }

    for (let i = 0; i < array.length; i++) {
        try {
            array[i].kcalPer100Gram = calculateKcalPer100Grams(array[i].grams, array[i].kcal);
        } catch (e) {
            array[i].kcalPer100Gram = null;
        }
        showMealInfo(array[i]);
    }
}

function showMealInfo(meal) {
    console.log(`Блюдо ${meal.name} ${meal.kcalPer100Gram ? `имеет ${meal.kcalPer100Gram} ккал на 100 грамм.`: "Нет данных о калориях на 100 грамм."}`);
}

function calculateKcalPer100Grams(grams, kcal) {
    if (!kcal || !grams) {
        throw new Error("Нет данных о граммах и калориях")
    }
    return Math.round(kcal / grams * 100);
}

checkMeals(meals);