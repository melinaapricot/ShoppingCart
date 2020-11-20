export default function Price(props) {
    return <span>
        {(props.cents / 100).toFixed(2)}
        {props.hideCurrency? null : '€'}
    </span>;
}