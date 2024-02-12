import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Something went wrong"
            backButtonHref="/login"
            backButtonLabel="back to login"
        >
            <div
                className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full"
            >
                <ExclamationTriangleIcon className="w-6 h-6 text-destructive" />
            </div>

        </CardWrapper>
    )
}