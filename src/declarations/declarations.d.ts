declare module '*.scss';

declare module "*.svg" {
    const content: string;
}

declare module "*.png";

declare module '*.gif' {
    const value: string;
    export default value;
}