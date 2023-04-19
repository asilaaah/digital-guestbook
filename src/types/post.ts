export interface Post {
    poster: {
        name: string;
        avatar?: string;
    };
    message: string;
    photo?: string;
    create: any;
}