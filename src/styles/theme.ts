export const theme = {
    global: {
        spacing: '20px',
        focus: {
            shadow: {
                size: '1px'
            }
        }
    },
    rangeInput: {
        thumb: {
            color: '#00ff00',
        },
        track: {
            color: '#d3d3d361',
            opacity: '0.3',
            extend: () => `
                border-radius: 50px
            `
        }
    },
    colors: {
        background: '#121212',
        text: '#00ff00',
        button: '#00ff00',
    },
    fontSizes: {
        small: '14px',
        medium: '18px',
        large: '24px',
    },
    breakpoints: {
        mobile: '480px',
        tablet: '768px',
        desktop: '1024px',
    }
};