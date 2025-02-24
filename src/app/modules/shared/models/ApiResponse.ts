export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
    status: string;
    errors?: any;
}
