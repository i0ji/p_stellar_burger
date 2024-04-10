import type {Config} from 'jest';
import {defaults} from 'jest-config';

const config: Config = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
};

export default config;

module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.(ts|js|html)$": ["ts-jest",{ diagnostics: { ignoreCodes: ['TS151001'] } }],
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
        '^utils(.*)': '<rootDir>/src/services/utils/$1',
    },
};