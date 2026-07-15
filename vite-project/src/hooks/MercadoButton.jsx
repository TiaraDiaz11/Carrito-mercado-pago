import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Inicializa Mercado Pago con tu Public Key
initMercadoPago('APP_USR-3be8d87b-9de0-4fa6-89ab-e26b1f968f33');

const MercadoButton = ({ preferenceId }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h1>Botón de Pago</h1>
            <p>Haz clic en el botón para realizar el pago.</p>
            {/* Renderiza el botón de pago */}
            <div style={{ width: '300px' }}>
                <Wallet initialization={{ preferenceId }} />
            </div>
        </div>
    );
};

export default MercadoButton;