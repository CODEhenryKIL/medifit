import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HealthResult = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [metrics, setMetrics] = useState({ bmi: 0, bmr: 0, tdee: 0 });

    useEffect(() => {
        const data = localStorage.getItem('userHealthData');
        if (data) {
            const parsed = JSON.parse(data);
            setUserData(parsed);
            if (parsed.height && parsed.weight) {
                // BMI
                const heightM = parsed.height / 100;
                const bmiValue = (parsed.weight / (heightM * heightM)).toFixed(1);

                // BMR (Mifflin-St Jeor Equation)
                let bmrValue = (10 * parsed.weight) + (6.25 * parsed.height) - (5 * calculateAge(parsed.birthdate));
                bmrValue += parsed.gender === 'male' ? 5 : -161;

                // TDEE
                const activityMultipliers = {
                    sedentary: 1.2,
                    lightly_active: 1.375,
                    moderately_active: 1.55,
                    very_active: 1.725
                };
                const tdeeValue = bmrValue * (activityMultipliers[parsed.activityLevel] || 1.2);

                setMetrics({
                    bmi: bmiValue,
                    bmr: Math.round(bmrValue),
                    tdee: Math.round(tdeeValue)
                });
            }
        }
    }, []);

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const getBmiStatus = (bmi) => {
        if (bmi < 18.5) return { label: '저체중', color: '#FF9800' };
        if (bmi < 23) return { label: '정상', color: '#4CAF50' };
        if (bmi < 25) return { label: '과체중', color: '#FF9800' };
        return { label: '비만', color: '#F44336' };
    };

    const status = getBmiStatus(metrics.bmi);
    const percentage = Math.min(Math.max((metrics.bmi / 40) * 100, 0), 100);

    if (!userData) return <div className="container">Loading...</div>;

    return (
        <div className="container" style={{ paddingBottom: '40px' }}>
            <header style={{ marginBottom: '24px', marginTop: '16px' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>건강 분석 결과</h2>
                <p style={{ color: 'var(--color-text-sub)' }}>{userData.name}님의 건강 지표입니다.</p>
            </header>

            <div className="card" style={{ textAlign: 'center', padding: '32px 20px' }}>
                {/* BMI Section */}
                <h3 style={{ fontSize: '1.2rem', color: '#757575', marginBottom: '16px' }}>BMI 지수</h3>
                <div style={{ fontSize: '3.5rem', fontWeight: '800', color: status.color, marginBottom: '8px' }}>
                    {metrics.bmi}
                </div>
                <div style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: status.color,
                    padding: '6px 16px',
                    backgroundColor: `${status.color}20`,
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '24px'
                }}>
                    {status.label}
                </div>

                {/* Simple Gauge */}
                <div style={{
                    height: '12px',
                    backgroundColor: '#E0E0E0',
                    borderRadius: '6px',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '40px'
                }}>
                    <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: status.color,
                        transition: 'width 1s ease-out'
                    }} />
                </div>

                {/* Bell Curve Section */}
                <h3 style={{ fontSize: '1.2rem', color: '#757575', marginBottom: '8px', borderTop: '1px solid #eee', paddingTop: '32px' }}>나의 건강 위치</h3>
                <p style={{ fontSize: '0.9rem', color: '#9E9E9E', marginBottom: '24px' }}>동년배 대비 상위 <strong>{100 - percentage.toFixed(0)}%</strong>에 해당합니다.</p>

                <div style={{ position: 'relative', height: '120px', marginBottom: '16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    {/* Curve SVG */}
                    <svg viewBox="0 0 200 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                        <path d="M0,100 Q50,100 80,50 Q100,0 120,50 Q150,100 200,100" fill="none" stroke="#E0E0E0" strokeWidth="2" />
                        <path d="M0,100 Q50,100 80,50 Q100,0 120,50 Q150,100 200,100" fill="url(#grad1)" opacity="0.2" />
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: 'var(--color-primary)', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#fff', stopOpacity: 0 }} />
                            </linearGradient>
                        </defs>

                        {/* User Position Marker */}
                        <circle cx={percentage * 2} cy={100 - (Math.sin(percentage * Math.PI / 100) * 80)} r="6" fill="var(--color-primary)" stroke="#fff" strokeWidth="2" />
                        <line x1={percentage * 2} y1={100} x2={percentage * 2} y2={100 - (Math.sin(percentage * Math.PI / 100) * 80)} stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="4" />
                    </svg>
                    <div style={{ position: 'absolute', bottom: '-25px', left: `${percentage}%`, transform: 'translateX(-50%)', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                        나
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', fontSize: '0.8rem', color: '#9E9E9E' }}>
                    <span>하위</span>
                    <span>평균</span>
                    <span>상위</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div className="card" style={{ flex: 1, textAlign: 'center', padding: '20px 10px' }}>
                    <h4 style={{ fontSize: '0.9rem', color: '#757575', marginBottom: '8px' }}>기초대사량 (BMR)</h4>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-primary-dark)' }}>
                        {metrics.bmr} <span style={{ fontSize: '0.9rem', fontWeight: '400' }}>kcal</span>
                    </div>
                </div>
                <div className="card" style={{ flex: 1, textAlign: 'center', padding: '20px 10px' }}>
                    <h4 style={{ fontSize: '0.9rem', color: '#757575', marginBottom: '8px' }}>일일 대사량 (TDEE)</h4>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-accent)' }}>
                        {metrics.tdee} <span style={{ fontSize: '0.9rem', fontWeight: '400' }}>kcal</span>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-primary-dark)' }}>영양 가이드</h3>
                <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
                    <strong>{userData.goals[0] === 'weight_loss' ? '다이어트' : '건강 관리'}</strong> 목표 달성을 위해 추천합니다:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.6', color: '#616161' }}>
                    <li>일일 섭취 권장량: <strong>{metrics.tdee - (userData.goals.includes('weight_loss') ? 500 : 0)} kcal</strong></li>
                    <li>단백질 위주의 식단 구성</li>
                    <li>나트륨 섭취 줄이기</li>
                </ul>
            </div>

            <button
                className="btn-primary"
                onClick={() => navigate('/recommendation')}
                style={{
                    marginTop: '16px',
                    boxShadow: '0 8px 16px rgba(76, 175, 80, 0.3)'
                }}
            >
                오늘의 추천 메뉴 보기
            </button>
        </div>
    );
};

export default HealthResult;
