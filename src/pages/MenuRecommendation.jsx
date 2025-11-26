import React from 'react';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../data/menuData';

const MenuRecommendation = () => {
    const navigate = useNavigate();

    const handleQuickOrder = () => {
        // Hardcoded quick order for MVP: High Protein Pumpkin Risotto
        // In real app, fetch last order from DB/LocalStore
        const quickOrder = {
            id: 2,
            name: "고단백 단호박 크림 리조또",
            nutrition: { calories: 520, protein: 35, fat: 18, carbs: 55 }, // Example customized stats
            options: { grain: "현미", vegetables: ["양송이", "시금치"] }
        };
        localStorage.setItem('currentOrder', JSON.stringify(quickOrder));

        // Force scroll to top before navigation
        window.scrollTo(0, 0);

        navigate('/order-complete');
    };

    return (
        <div className="container" style={{ paddingBottom: '40px' }}>
            <header style={{ marginBottom: '24px', marginTop: '16px' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>오늘의 추천 메뉴</h2>
                <p style={{ color: 'var(--color-text-sub)' }}>셰프가 엄선한 건강 식단입니다.</p>
            </header>

            {/* Quick Order Section */}
            <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--color-primary)' }}>최근 주문한 메뉴</h3>
                <div
                    className="card"
                    onClick={handleQuickOrder}
                    style={{
                        padding: '16px',
                        cursor: 'pointer',
                        border: '2px solid var(--color-primary)',
                        backgroundColor: '#F1F8E9',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}
                >
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: '#FFF3E0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Use the image from menuItems for consistency */}
                        <img
                            src={menuItems.find(i => i.id === 2)?.image}
                            alt="고단백 단호박 크림 리조또"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '4px', color: '#333' }}>고단백 단호박 크림 리조또</h4>
                        <p style={{ fontSize: '0.85rem', color: '#666' }}>현미, 양송이, 시금치 추가</p>
                    </div>
                    <button style={{
                        padding: '8px 16px',
                        backgroundColor: 'var(--color-primary)',
                        color: '#fff',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                    }}>
                        바로 주문
                    </button>
                </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--color-primary)' }}>추천 메뉴</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {menuItems.map(item => (
                    <div
                        key={item.id}
                        className="card"
                        onClick={() => navigate(`/menu/${item.id}`)}
                        style={{
                            padding: 0,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            border: '1px solid #eee'
                        }}
                    >
                        <div style={{
                            height: '200px',
                            backgroundColor: item.imageColor,
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease'
                                }}
                            />
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <h3 style={{ fontSize: '1.1rem', color: '#333' }}>{item.name}</h3>
                                <span style={{
                                    backgroundColor: 'var(--color-primary-light)',
                                    color: 'var(--color-primary-dark)',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                }}>
                                    {item.baseNutrition.calories} kcal
                                </span>
                            </div>
                            <p style={{ color: '#757575', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuRecommendation;
