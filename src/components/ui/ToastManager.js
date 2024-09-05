// src/components/ui/ToastManager.js
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Fonction pour afficher un toast
export const showToast = (message, description, type = 'success') => {
    const icon = type === 'success' ? <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" /> : <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />;

    toast(
        <div className="flex items-center space-x-3 max-w-xs"> {/* Ajout de max-w-xs pour limiter la largeur */}
            <div className="flex-shrink-0">{icon}</div>
            <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-gray-900 truncate">{message}</p>
                {description && <p className="text-xs text-gray-500 whitespace-normal">{description}</p>} {/* whitespace-normal pour autoriser les retours à la ligne */}
            </div>
        </div>,
        {
            className: "relative rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 p-2",
            autoClose: 5000,
            closeOnClick: true,
            hideProgressBar: true,
        }
    );
};

// ToastContainer que vous pouvez utiliser dans le layout
export function ToastProvider() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className="text-sm leading-6 font-medium p-0"
            toastClassName="relative flex min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white shadow-default sm:w-96"
            bodyClassName="flex text-sm font-white block p-3"
        />
    );
}
