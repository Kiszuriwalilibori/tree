export interface AppendModal {
    items: (string | string[])[];
    activeScope: string;
}

export interface AppendItemModalFormValues {
    inputValue: string;
    isNotValidated: boolean;
    shouldInitializeCategory: boolean;
}
