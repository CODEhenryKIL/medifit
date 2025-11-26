import tofuImage from '../assets/tofu_pasta_salad.png';
import risottoImage from '../assets/pumpkin_risotto.png';
import pizzaImage from '../assets/spinach_pizza.png';

export const menuItems = [
    {
        id: 1,
        name: "저당 두부면 샐러드 파스타",
        description: "파스타의 만족감을 주면서 탄수화물을 대폭 줄이고 단백질과 식이섬유를 높였습니다.",
        image: tofuImage,
        imageColor: "#E8F5E9",
        baseNutrition: { calories: 320, protein: 22, fat: 12, carbs: 28 },
        options: {
            noodle: [
                { name: "두부면", cal: 0, protein: 0, fat: 0, carbs: 0 },
                { name: "두부곤약면", cal: -20, protein: -2, fat: 0, carbs: -5 },
                { name: "병아리콩면", cal: 30, protein: 3, fat: 1, carbs: 5 }
            ],
            vegetables: [
                { name: "로메인", cal: 5, protein: 0.5, fat: 0, carbs: 1 },
                { name: "양상추", cal: 5, protein: 0.5, fat: 0, carbs: 1 },
                { name: "케일", cal: 10, protein: 1, fat: 0, carbs: 2 },
                { name: "루꼴라", cal: 5, protein: 0.5, fat: 0, carbs: 1 },
                { name: "오이", cal: 5, protein: 0, fat: 0, carbs: 1 },
                { name: "토마토", cal: 10, protein: 0.5, fat: 0, carbs: 2 },
                { name: "적양파", cal: 5, protein: 0, fat: 0, carbs: 1 },
                { name: "브로콜리", cal: 15, protein: 1.5, fat: 0, carbs: 3 }
            ],
            dressing: [
                { name: "올리브오일", cal: 100, protein: 0, fat: 11, carbs: 0 },
                { name: "레몬", cal: 10, protein: 0, fat: 0, carbs: 2 },
                { name: "요거트", cal: 30, protein: 2, fat: 1, carbs: 3 },
                { name: "허브", cal: 5, protein: 0, fat: 0, carbs: 1 },
                { name: "발사믹", cal: 40, protein: 0, fat: 0, carbs: 10 }
            ]
        }
    },
    {
        id: 2,
        name: "고단백 단호박 크림 리조또",
        description: "리조또의 부드러움은 유지하되, 쌀의 양을 줄이고 단백질과 기능성 재료를 넣었습니다.",
        image: risottoImage,
        imageColor: "#FFF3E0",
        baseNutrition: { calories: 450, protein: 28, fat: 15, carbs: 45 },
        options: {
            grain: [
                { name: "현미", cal: 0, protein: 0, fat: 0, carbs: 0 },
                { name: "보리", cal: -10, protein: 1, fat: 0, carbs: -3 },
                { name: "아르보리오", cal: 20, protein: -1, fat: 0, carbs: 5 }
            ],
            vegetables: [
                { name: "양송이", cal: 10, protein: 1, fat: 0, carbs: 1 },
                { name: "새송이", cal: 15, protein: 1.5, fat: 0, carbs: 2 },
                { name: "표고", cal: 15, protein: 1, fat: 0, carbs: 3 },
                { name: "시금치", cal: 10, protein: 1, fat: 0, carbs: 1 },
                { name: "브로콜리", cal: 15, protein: 1.5, fat: 0, carbs: 3 },
                { name: "샐러리", cal: 5, protein: 0, fat: 0, carbs: 1 }
            ]
        }
    },
    {
        id: 3,
        name: "통곡물 시금치 퓨전 피자",
        description: "도우를 통곡물이나 저탄수 재료로 바꾸고, 치즈와 소스 양을 조절한 건강 피자입니다.",
        image: pizzaImage,
        imageColor: "#E0F2F1",
        baseNutrition: { calories: 380, protein: 25, fat: 14, carbs: 35 },
        options: {
            sauce: [
                { name: "토마토", cal: 20, protein: 1, fat: 0, carbs: 4 },
                { name: "갈릭 요거트", cal: 35, protein: 2, fat: 1, carbs: 5 },
                { name: "바질 페스토", cal: 60, protein: 1, fat: 6, carbs: 1 }
            ],
            topping: [
                { name: "닭가슴살", cal: 50, protein: 10, fat: 1, carbs: 0 },
                { name: "새우", cal: 40, protein: 9, fat: 0.5, carbs: 0 },
                { name: "소고기", cal: 70, protein: 8, fat: 4, carbs: 0 }
            ]
        }
    }
];
