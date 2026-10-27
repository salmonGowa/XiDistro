import { PencilIcon, TrashIcon } from './icons';

const iconButton =
    'inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card';

// Icon buttons with a full 36px hit area; `label` names the row for screen readers ("Edit Coca-Cola 500ml").
export function RowActions({ label, onEdit, onDelete }: { label: string; onEdit: () => void; onDelete: () => void }) {
    return (
        <div className="flex shrink-0 justify-end gap-1">
            <button
                type="button"
                onClick={onEdit}
                aria-label={`Edit ${label}`}
                title="Edit"
                className={`${iconButton} text-muted-foreground hover:bg-muted hover:text-foreground`}
            >
                <PencilIcon className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={onDelete}
                aria-label={`Delete ${label}`}
                title="Delete"
                className={`${iconButton} text-muted-foreground hover:bg-destructive/10 hover:text-destructive`}
            >
                <TrashIcon className="h-4 w-4" />
            </button>
        </div>
    );
}
