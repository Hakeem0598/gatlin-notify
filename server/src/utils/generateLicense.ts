const generateFiveLetters = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    return [...Array(5)].map(() => chars[~~(Math.random() * chars.length)]).join('');
}

const generateLicense = () => [...Array(5)].map(() => generateFiveLetters()).join('-');

export default generateLicense;
