export interface Post {
    id: number;
    poster: {
        name: string;
        avatar?: string;
    };
    message: string;
    photo?: string
}