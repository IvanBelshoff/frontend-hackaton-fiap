import { MdInfoOutline, MdOutlineDangerous, MdOutlineDone, MdOutlineWarning, MdDarkMode } from "react-icons/md";

interface IAlertpProps {
    type: 'info' | 'danger' | 'sucess' | 'warning' | 'dark';
    message: string;
    view: boolean
}
export const Alert = ({ view, message, type }: IAlertpProps) => {


    if (type === 'info' && view) {
        return (
            <div className="absolute left-4 bottom-0">
                <div className="flex items-center gap-2 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <MdInfoOutline size={24} />
                    <span className="sr-only">Info</span>
                    <div>
                        <span className={`font-medium`}>{message}</span>
                    </div>
                </div>
            </div>
        );
    } else if (type === 'danger' && view) {
        return (
            <div className="absolute left-4 bottom-0">
                <div className="flex items-center gap-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <MdOutlineDangerous size={24} />
                    <span className="sr-only">Info</span>
                    <div>
                        <span className={`font-medium`}>{message}</span>
                    </div>
                </div>
            </div>
        );
    } else if (type === 'sucess' && view) {
        return (
            <div className="absolute left-4 bottom-0">
                <div className="flex items-center gap-2 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <MdOutlineDone size={24} />
                    <span className="sr-only">Info</span>
                    <div>
                        <span className={`font-medium`}>{message}</span>
                    </div>
                </div>
            </div>
        );
    } else if (type === 'warning' && view) {
        return (
            <div className="absolute left-4 bottom-0">
                <div className="flex items-center gap-2 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                    <MdOutlineWarning size={24} />
                    <span className="sr-only">Info</span>
                    <div>
                        <span className={`font-medium`}>{message}</span>
                    </div>
                </div>
            </div>
        );
    } else if (type === 'dark' && view) {
        return (
            <div className="absolute left-4 bottom-0">
                <div className="flex items-center gap-2 p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
                    <MdDarkMode size={24} />
                    <span className="sr-only">Info</span>
                    <div>
                        <span className={`font-medium`}>{message}</span>
                    </div>
                </div>
            </div>
        );
    } else {
        <></>;
    }


};