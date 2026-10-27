import type { ReactNode, SVGProps } from 'react';

function Icon({ children, ...props }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
            {children}
        </svg>
    );
}

export function StoreIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M3 9l1.5-5h15L21 9" />
            <path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9Z" />
            <path d="M5 13v7h14v-7" />
            <path d="M10 20v-4h4v4" />
        </Icon>
    );
}

export function BoxIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
            <path d="M3 8l9 5 9-5" />
            <path d="M12 13v8" />
        </Icon>
    );
}

export function ClipboardIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <rect x="5" y="4" width="14" height="17" rx="2" />
            <path d="M9 4V3h6v1" />
            <path d="M9 11h6M9 15h4" />
        </Icon>
    );
}

export function TruckIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M3 16V6a1 1 0 0 1 1-1h9v11" />
            <path d="M13 9h4l4 4v3h-8" />
            <circle cx="7.5" cy="17.5" r="1.5" />
            <circle cx="17.5" cy="17.5" r="1.5" />
        </Icon>
    );
}

export function UsersIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
            <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6" />
        </Icon>
    );
}

export function ChartIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M3 3v18h18" />
            <path d="M7 15l4-5 3 3 5-7" />
        </Icon>
    );
}

export function HelpIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14" />
            <path d="M12 17h.01" />
        </Icon>
    );
}

export function ChatIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
        </Icon>
    );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M20 6 9 17l-5-5" />
        </Icon>
    );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M5 12h14M13 6l6 6-6 6" />
        </Icon>
    );
}

export function MapPinIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.5" />
        </Icon>
    );
}

export function GridIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <rect x="3" y="3" width="7" height="9" rx="1.5" />
            <rect x="14" y="3" width="7" height="5" rx="1.5" />
            <rect x="14" y="12" width="7" height="9" rx="1.5" />
            <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </Icon>
    );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
        </Icon>
    );
}

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M12 5v14M5 12h14" />
        </Icon>
    );
}

export function PencilIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
            <path d="m13.5 6.5 4 4" />
        </Icon>
    );
}

export function TrashIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M4 7h16M10 11v6M14 11v6" />
            <path d="M6 7l1 13h10l1-13M9 7V4h6v3" />
        </Icon>
    );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M18 6 6 18M6 6l12 12" />
        </Icon>
    );
}

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </Icon>
    );
}

export function EyeIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
        </Icon>
    );
}

export function EyeOffIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.2 3.2M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" />
        </Icon>
    );
}

export function LogOutIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="m16 17 5-5-5-5M21 12H9" />
        </Icon>
    );
}

export function AlertIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M12 3 2 20h20L12 3Z" />
            <path d="M12 10v4M12 17h.01" />
        </Icon>
    );
}

export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <Icon {...props}>
            <path d="M19 12H5M11 18l-6-6 6-6" />
        </Icon>
    );
}
