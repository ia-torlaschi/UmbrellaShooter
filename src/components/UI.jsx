export default function UI() {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Crosshair */}
            <div style={{
                width: '10px',
                height: '10px',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 0, 0, 0.5)'
            }} />

            {/* HUD info */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                fontSize: '20px'
            }}>
                HEALTH: 100% <br />
                AMMO: ∞
            </div>

            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                textAlign: 'right'
            }}>
                UMBRELLA CORP <br />
                <span style={{ fontSize: '12px', color: '#aaa' }}>SECURITY DIVISION</span>
            </div>
        </div>
    )
}
