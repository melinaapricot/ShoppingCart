import React from "react";

interface Props {
    cents: number;
    hideCurrency?: boolean;
}

export default function Price(props: Props) {
    return <span>
        {(props.cents / 100).toFixed(2)}
        {props.hideCurrency? null : '€'}
    </span>;
}