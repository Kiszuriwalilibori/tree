export interface AppendModalProps {
    items: (string | string[])[];
    activeScope: string;
}

export interface AppendItemModalFormValues {
    inputValue: string;
    isNotValidated: boolean;
    shouldInitializeCategory: boolean;
}
