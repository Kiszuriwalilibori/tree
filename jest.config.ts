import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    roots: ['<rootDir>/test', '<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'jsdom',
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    moduleNameMapper: {
        // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        //     '<rootDir>/__mocks__/fileMock.js',
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
    },
};

export default config;
