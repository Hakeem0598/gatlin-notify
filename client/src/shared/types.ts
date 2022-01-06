
export type License = {
    key: string;
    activated: boolean;
    activatedBy: string;
}

export type RequestStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected' ;

export type GeneralObject = { [key: string]: any }