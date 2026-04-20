import { Righteous, Ojuju, Nothing_You_Could_Do, Poppins } from 'next/font/google';

export const righteous = Righteous({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-righteous',
})

export const ojuju = Ojuju({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-ojuju',
})

export const nothingYouCouldDo = Nothing_You_Could_Do({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-nothing-you-could-do',
})

export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['200','300','400', '500', '600', '700'],
    variable: '--font-poppins',
})