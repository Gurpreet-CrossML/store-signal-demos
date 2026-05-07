export type StoreDemo = {
    name: string;
    url: string;
    description: string[];
    industry: string;
    logo?: string | null;
    initials: string;
    password?: string;
};

export type ApiResponse = {
    status: "success" | "error";
    message: string;
    data?: object | Array<object> | null;
};
