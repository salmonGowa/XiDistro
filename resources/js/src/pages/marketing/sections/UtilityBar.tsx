import { Link } from 'react-router-dom';
import { MapPinIcon } from '../../../components/ui/icons';

// Thin strip above the main nav, the way carrier sites surface region and help links.
export function UtilityBar() {
    return (
        <div className="bg-foreground text-background">
            <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
                <span className="inline-flex items-center gap-1.5">
                    <MapPinIcon className="h-3.5 w-3.5" />
                    Serving distributors across Kenya
                </span>
                <div className="flex items-center gap-5">
                    <a href="#faq" className="opacity-80 transition-opacity hover:opacity-100">
                        Help &amp; FAQ
                    </a>
                    <a href="#help" className="hidden opacity-80 transition-opacity hover:opacity-100 sm:inline">
                        Contact us
                    </a>
                    <Link to="/login" className="opacity-80 transition-opacity hover:opacity-100">
                        Customer log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
