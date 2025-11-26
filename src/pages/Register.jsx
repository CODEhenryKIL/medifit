import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '이주희',
        birthdate: '1999-01-31',
        gender: 'female',
        height: '161',
        weight: '50',
        disease: '',
        activityLevel: 'sedentary',
        goals: ['weight_loss']
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGoalToggle = (goal) => {
        setFormData(prev => {
            const goals = prev.goals.includes(goal)
                ? prev.goals.filter(g => g !== goal)
                : [...prev.goals, goal];
            return { ...prev, goals };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userHealthData', JSON.stringify(formData));
        navigate('/result');
    };

    const inputStyle = {
        width: '100%',
        padding: '16px',
        borderRadius: '16px',
        border: '1px solid #F5F5F5',
        backgroundColor: '#F9F9F9',
        fontSize: '16px', /* Prevent iOS zoom */
        outline: 'none',
        transition: 'all 0.2s',
        color: '#333',
        fontWeight: '500'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#424242',
        fontSize: '0.95rem'
    };

    const sectionStyle = {
        marginBottom: '24px'
    };

    return (
        <div className="container" style={{ paddingBottom: '40px' }}>
            <header style={{ marginBottom: '32px', marginTop: '16px' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>프로필 설정</h2>
                <p style={{ color: 'var(--color-text-sub)' }}>맞춤형 식단을 위해 정보를 입력해주세요.</p>
            </header>

            <form onSubmit={handleSubmit}>
                {/* Basic Info */}
                <div style={sectionStyle}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-primary)' }}>기본 정보</h3>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={labelStyle}>이름</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            style={inputStyle}
                            placeholder="홍길동"
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ flex: '1 1 0', minWidth: 0 }}> {/* Use flex-basis 0 and min-width 0 to force equal width */}
                            <label style={labelStyle}>생년월일</label>
                            <input
                                type="date"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleInputChange}
                                style={{
                                    ...inputStyle,
                                    width: '100%',
                                    minWidth: 0, /* Allow shrinking */
                                    appearance: 'none', /* Remove default styling */
                                    WebkitAppearance: 'none' /* Safari fix */
                                }}
                                required
                            />
                        </div>
                        <div style={{ flex: '1 1 0', minWidth: 0 }}>
                            <label style={labelStyle}>성별</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                style={{
                                    ...inputStyle,
                                    width: '100%',
                                    minWidth: 0
                                }}
                            >
                                <option value="female">여성</option>
                                <option value="male">남성</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Body Info */}
                <div style={sectionStyle}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-primary)' }}>신체 정보</h3>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>키 (cm)</label>
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleInputChange}
                                style={inputStyle}
                                placeholder="165"
                                required
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>몸무게 (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleInputChange}
                                style={inputStyle}
                                placeholder="55"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Activity Level */}
                <div style={sectionStyle}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-primary)' }}>활동량</h3>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={labelStyle}>평소 활동량이 어느 정도인가요?</label>
                        <select
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleInputChange}
                            style={inputStyle}
                        >
                            <option value="sedentary">거의 없음 (좌식 생활)</option>
                            <option value="lightly_active">가벼운 활동 (주 1-3회 운동)</option>
                            <option value="moderately_active">보통 활동 (주 3-5회 운동)</option>
                            <option value="very_active">많은 활동 (주 6-7회 운동)</option>
                        </select>
                    </div>
                </div>

                {/* Health Info */}
                <div style={sectionStyle}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-primary)' }}>건강 상세</h3>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={labelStyle}>지병이 있으신가요?</label>
                        <input
                            type="text"
                            name="disease"
                            value={formData.disease}
                            onChange={handleInputChange}
                            style={inputStyle}
                            placeholder="예: 당뇨, 고혈압 (없으면 비워두세요)"
                        />
                    </div>

                    <label style={labelStyle}>건강 목표</label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {[
                            { id: 'weight_loss', label: '다이어트' },
                            { id: 'muscle_gain', label: '근육 증가' },
                            { id: 'diabetes_care', label: '당뇨 조절' },
                            { id: 'balanced_diet', label: '균형 잡힌 식단' }
                        ].map(goal => (
                            <button
                                key={goal.id}
                                type="button"
                                onClick={() => handleGoalToggle(goal.id)}
                                style={{
                                    padding: '10px 16px',
                                    borderRadius: '20px',
                                    border: `1px solid ${formData.goals.includes(goal.id) ? 'var(--color-primary)' : '#E0E0E0'}`,
                                    backgroundColor: formData.goals.includes(goal.id) ? 'var(--color-primary-light)' : '#fff',
                                    color: formData.goals.includes(goal.id) ? 'var(--color-primary-dark)' : '#757575',
                                    fontWeight: '600',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {goal.label}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    style={{
                        marginTop: '24px',
                        boxShadow: '0 8px 16px rgba(76, 175, 80, 0.3)'
                    }}
                >
                    내 건강 분석하기
                </button>
            </form>
        </div>
    );
};

export default Register;
