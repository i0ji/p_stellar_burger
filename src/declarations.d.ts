declare module '*.scss';

declare module "*.svg" {
    const content: string;
}

declare module "*.svg" {
    const ReactComponent: any;
    export { ReactComponent };
}

declare module "*.png";