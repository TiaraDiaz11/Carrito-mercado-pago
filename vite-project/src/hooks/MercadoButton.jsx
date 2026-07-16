import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Inicializa Mercado Pago con tu Public Key
initMercadoPago('APP_USR-3be8d87b-9de0-4fa6-89ab-e26b1f968f33');

const MercadoButton = ({ preferenceId }) => {
    return (
        <div className="mercado-container">
            <h2>Finalizar compra</h2>

            <Wallet 
                initialization={{ preferenceId }}
            />
        </div>
    );
};

export default MercadoButton;