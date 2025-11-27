import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuItems } from '../data/menuData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const MenuDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = menuItems.find(i => i.id === parseInt(id));

    const [selections, setSelections] = useState({});
    const [nutrition, setNutrition] = useState({ calories: 0, protein: 0, fat: 0, carbs: 0 });
    const [chartData, setChartData] = useState([]);
    const [suitabilityScore, setSuitabilityScore] = useState(0);

    // Initialize selections
    useEffect(() => {
        if (item) {
            const initialSelections = {};
            Object.keys(item.options).forEach(key => {
                if (['vegetables', 'topping', 'salad'].includes(key)) {
                    initialSelections[key] = [];
                } else {
                    initialSelections[key] = item.options[key][0].name;
                }
            });
            setSelections(initialSelections);
        }
    }, [item]);

    // Calculate nutrition and metrics
    useEffect(() => {
        if (item && Object.keys(selections).length > 0) {
            let newNut = { ...item.baseNutrition };

            Object.keys(selections).forEach(category => {
                const selectedValue = selections[category];
                const categoryOptions = item.options[category];

                if (Array.isArray(selectedValue)) {
                    selectedValue.forEach(val => {
                        const opt = categoryOptions.find(o => o.name === val);
                        if (opt) {
                            newNut.calories += (opt.cal || 0);
                            newNut.protein += (opt.protein || 0);
                            newNut.fat += (opt.fat || 0);
                            newNut.carbs += (opt.carbs || 0);
                        }
                    });
                } else {
                    const opt = categoryOptions.find(o => o.name === selectedValue);
                    if (opt) {
                        newNut.calories += (opt.cal || 0);
                        newNut.protein += (opt.protein || 0);
                        newNut.fat += (opt.fat || 0);
                        newNut.carbs += (opt.carbs || 0);
                    }
                }
            });

            // Round values
            const finalNutrition = {
                calories: Math.round(newNut.calories),
                protein: Math.round(newNut.protein * 10) / 10,
                fat: Math.round(newNut.fat * 10) / 10,
                carbs: Math.round(newNut.carbs * 10) / 10
            };
            setNutrition(finalNutrition);

            // Calculate Metrics for Chart
            // Logic: Higher score (out of 100) means "better" or "more suitable" for a general healthy diet

            // 1. Weight (Calories): Lower is better (up to a point, but for diet context usually lower)
            // Assume 800kcal is max "bad", 300kcal is "good"
            const weightScore = Math.max(0, Math.min(100, 100 - ((finalNutrition.calories - 300) / 5)));

            // 2. Blood Sugar (Carbs): Lower is better
            // Assume 100g is max "bad"
            const bloodSugarScore = Math.max(0, Math.min(100, 100 - (finalNutrition.carbs * 0.8)));

            // 3. Protein: Higher is better
            // Assume 40g is max "good"
            const proteinScore = Math.max(0, Math.min(100, (finalNutrition.protein / 40) * 100));

            // 4. Fat: Moderate/Lower is better
            // Assume 30g is max "bad"
            const fatScore = Math.max(0, Math.min(100, 100 - (finalNutrition.fat * 2.5)));

            // 5. Gut Health (Vegetables): More veggies = better
            const veggieCount = (selections.vegetables || []).length;
            const gutHealthScore = Math.min(100, 40 + (veggieCount * 20));

            // 6. Blood Pressure (Sodium proxy): Dressing choice
            // Lemon/Olive Oil/Herb = Good, Balsamic/Yogurt = Moderate, Others = Lower
            let bpScore = 70; // Base
            const dressing = selections.dressing;
            if (dressing === '레몬' || dressing === '올리브오일' || dressing === '허브') bpScore += 20;
            else if (dressing === '발사믹' || dressing === '오리엔탈') bpScore -= 10;
            else if (dressing === '요거트') bpScore += 10;
            bpScore = Math.min(100, Math.max(0, bpScore));

            const newChartData = [
                { subject: '체중', A: weightScore, fullMark: 100 },
                { subject: '혈당', A: bloodSugarScore, fullMark: 100 },
                { subject: '단백질', A: proteinScore, fullMark: 100 },
                { subject: '지방', A: fatScore, fullMark: 100 },
                { subject: '장건강', A: gutHealthScore, fullMark: 100 },
                { subject: '혈압', A: bpScore, fullMark: 100 },
            ];
            setChartData(newChartData);

            // Calculate Suitability Score
            const totalScore = newChartData.reduce((acc, curr) => acc + curr.A, 0);
            setSuitabilityScore(Math.round(totalScore / 6));
        }
    }, [selections, item]);

    if (!item) return <div className="container">메뉴를 찾을 수 없습니다.</div>;

    const handleOptionChange = (category, value, isMultiple) => {
        setSelections(prev => {
            if (isMultiple) {
                const current = prev[category] || [];
                const exists = current.includes(value);
                let newValues;
                if (exists) {
                    newValues = current.filter(v => v !== value);
                } else {
                    newValues = [...current, value];
                }
                return { ...prev, [category]: newValues };
            } else {
                return { ...prev, [category]: value };
            }
        });
    };

    const handleOrder = () => {
        const orderData = {
            id: item.id,
            name: item.name,
            nutrition: nutrition,
            options: selections
        };
        localStorage.setItem('currentOrder', JSON.stringify(orderData));

        // Force scroll to top before navigation
        window.scrollTo(0, 0);

        navigate('/order-complete');
    };

    const categoryLabels = {
        noodle: '면 선택',
        vegetables: '채소 (다중 선택)',
        dressing: '드레싱',
        grain: '곡물 선택',
        sauce: '소스 선택',
        topping: '토핑 추가'
    };

    return (
        <div className="container" style={{ paddingBottom: '80px' }}>
            <div style={{
                height: '250px',
                backgroundColor: item.imageColor,
                margin: '-16px -16px 24px -16px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <img
                    src={item.image}
                    alt={item.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>

            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>{item.name}</h2>
            <p style={{ color: '#616161', marginBottom: '24px', lineHeight: '1.5' }}>{item.description}</p>

            {/* Radar Chart Section */}
            <div style={{
                marginBottom: '24px',
                height: '250px',
                backgroundColor: '#fff',
                borderRadius: '16px',
                border: '1px solid #eee',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#666' }} />
                        <Radar
                            name="Suitability"
                            dataKey="A"
                            stroke="var(--color-primary)"
                            fill="var(--color-primary)"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="card" style={{ backgroundColor: '#F1F8E9', border: '1px solid #C5E1A5' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--color-primary-dark)' }}>영양 성분</h3>
                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', gap: '24px' }}>
                    <div>
                        <div style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--color-primary)' }}>{nutrition.calories}</div>
                        <div style={{ fontSize: '0.8rem', color: '#757575' }}>kcal</div>
                    </div>
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{nutrition.protein}g</div>
                        <div style={{ fontSize: '0.8rem', color: '#757575' }}>단백질</div>
                    </div>
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{nutrition.carbs}g</div>
                        <div style={{ fontSize: '0.8rem', color: '#757575' }}>탄수화물</div>
                    </div>
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{nutrition.fat}g</div>
                        <div style={{ fontSize: '0.8rem', color: '#757575' }}>지방</div>
                    </div>
                    {/* Suitability Score */}
                    <div style={{
                        borderLeft: '1px solid #C5E1A5',
                        paddingLeft: '24px',
                        marginLeft: '0px'
                    }}>
                        <div style={{ fontWeight: '800', fontSize: '1.4rem', color: 'var(--color-primary-dark)' }}>{suitabilityScore}</div>
                        <div style={{ fontSize: '0.8rem', color: '#757575', fontWeight: '600' }}>점수</div>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', marginTop: '32px' }}>나만의 메뉴 만들기</h3>

            {Object.keys(item.options).map(category => {
                const isMultiple = ['vegetables', 'topping', 'salad'].includes(category);
                return (
                    <div key={category} style={{ marginBottom: '24px' }}>
                        <h4 style={{ marginBottom: '12px', color: '#424242' }}>
                            {categoryLabels[category] || category}
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {item.options[category].map(opt => {
                                const isSelected = isMultiple
                                    ? selections[category]?.includes(opt.name)
                                    : selections[category] === opt.name;

                                return (
                                    <button
                                        key={opt.name}
                                        onClick={() => handleOptionChange(category, opt.name, isMultiple)}
                                        style={{
                                            padding: '10px 16px',
                                            borderRadius: '20px',
                                            border: `1px solid ${isSelected ? 'var(--color-primary)' : '#E0E0E0'}`,
                                            backgroundColor: isSelected ? 'var(--color-primary-light)' : '#fff',
                                            color: isSelected ? 'var(--color-primary-dark)' : '#757575',
                                            fontWeight: '500',
                                            fontSize: '0.9rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}
                                    >
                                        {opt.name}
                                        {opt.cal !== 0 && (
                                            <span style={{ fontSize: '0.75rem', color: isSelected ? 'var(--color-primary-dark)' : '#999' }}>
                                                {opt.cal > 0 ? `+${opt.cal}` : opt.cal}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            <div style={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                maxWidth: '480px',
                padding: '16px',
                backgroundColor: '#fff',
                boxShadow: '0 -4px 10px rgba(0,0,0,0.05)',
                borderTop: '1px solid #eee'
            }}>
                <button
                    className="btn-primary"
                    onClick={handleOrder}
                >
                    {nutrition.calories}kcal 주문하기
                </button>
            </div>
        </div>
    );
};

export default MenuDetail;
