import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuItems } from '../data/menuData';

const MenuDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = menuItems.find(i => i.id === parseInt(id));

    const [selections, setSelections] = useState({});
    const [nutrition, setNutrition] = useState({ calories: 0, protein: 0, fat: 0, carbs: 0 });

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

    // Calculate nutrition
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
            setNutrition({
                calories: Math.round(newNut.calories),
                protein: Math.round(newNut.protein * 10) / 10,
                fat: Math.round(newNut.fat * 10) / 10,
                carbs: Math.round(newNut.carbs * 10) / 10
            });
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

            <div className="card" style={{ backgroundColor: '#F1F8E9', border: '1px solid #C5E1A5' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--color-primary-dark)' }}>영양 성분</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
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
