export function Field({
    label,
    value,
    valueClassName = 'text-card-foreground',
}: {
    label: string;
    value: string;
    valueClassName?: string;
}) {
    return (
        <div>
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd className={valueClassName}>{value}</dd>
        </div>
    );
}
