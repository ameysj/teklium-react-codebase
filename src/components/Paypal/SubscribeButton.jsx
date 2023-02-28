
import {PayPalButtons } from "@paypal/react-paypal-js";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";

const SubscribeButton = (props) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const { amount, currency, createSubscription, onApprove, catchError,onError, onCancel,planid,planType} = props;

    return (
            <div>
                { !isPending && <PayPalButtons
                createSubscription={(data, details) => createSubscription({planid,planType},data, details)}
                onApprove={(data, details) => onApprove({planType,planid},data, details)}
                onError={(err) => onError(err)}
                catchError={(err) => catchError(err)}
                onCancel={(err) => onCancel(err)}
                key={amount}
                style={{
                    shape: 'pill',
                    color: 'white',
                    layout: 'vertical',
                    label: 'subscribe'
                }}     
            />
          }
        </div> );
}

export default SubscribeButton;