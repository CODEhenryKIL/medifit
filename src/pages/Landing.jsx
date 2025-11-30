import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/landing-hero.png';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            height: '100dvh',
            position: 'relative',
            backgroundColor: '#fff', /* Fallback */
            overflow: 'hidden'
        }}>
            {/* Full Background Image */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '70%', /* Image takes up top 70% */
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 85%', /* Shift image up further */
                transform: 'scale(1.05)', /* Zoom in 5% to hide borders */
                zIndex: 0
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))'
                }} />
            </div>

            {/* Bottom Sheet Content */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '40%', /* Overlaps slightly */
                backgroundColor: '#fff',
                borderTopLeftRadius: '32px',
                borderTopRightRadius: '32px',
                padding: '40px 24px',
                textAlign: 'center',
                zIndex: 1,
                boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <h1 style={{
                    fontSize: '2.8rem',
                    color: 'var(--color-primary-dark)',
                    marginBottom: '0.5rem',
                    fontWeight: '800',
                    letterSpacing: '-1px'
                }}>
                    MediFit
                </h1>
                <p style={{
                    color: '#666',
                    fontSize: '1.2rem',
                    marginBottom: '40px',
                    lineHeight: '1.6'
                }}>
                    오직 나를 위한,<br />
                    맛있고 건강한 한 끼 처방
                </p>
                <button
                    className="btn-primary"
                    onClick={() => navigate('/register')}
                    style={{
                        height: '56px',
                        fontSize: '1.1rem',
                        boxShadow: '0 8px 20px rgba(76, 175, 80, 0.4)',
                        borderRadius: '16px'
                    }}
                >
                    시작하기
                </button>
            </div>
        </div>
    );
};

export default Landing;
