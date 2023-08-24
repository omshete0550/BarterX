export const navVariants = {
    hidden: {
        opacity: 0,
        y: -50,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 140,
        },
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    }
}



export const fixedContainer = (content, delay) => ({
    hidden: {},
    show: {
        transition: {
            content,
            delay,
        },
    }
})

export const textVariants = (direction, delay) => ({
    hidden: {
        x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
        y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
        opacity: 0,
    },
    show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 1.25,
            delay
        },
    }
})

export const formVariants = (delay) => ({
    hidden: {
        x: -50,
        opacity: 0,
    },
    show: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1.25,
            delay,
        },
    }
})

export const fadeIn = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.75,
        }
    },
    show: {
        opacity: 1,
        transition: {
            duration: 0.75,
        }
    }
}

export const fixedBtn = {
    hidden: {
        x: 24,
        y: -140,
        opacity: 0,
        transition: {
            duration: 0.50,
        }
    },
    show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.50,
        }
    },
}

export const svgVariants = {
    left: {
        x: 0,
        transition: {
            duration: 0.3
        }
    },
    right: {
        x: -250,
        transition: {
            duration: 0.3
        }
    }
}


export const pathCircleVariants = (delay) => ({
    from: {
        opacity: 0,
        pathLength: 0
    },
    to: {
        opacity: 1,
        pathLength: 1,
        transition: {
            ease: "easeInOut",
            duration: 3,
            delay
        },
    }
})


export const handleScrollToSection = (headerSelector, targetSelector, ) => {
    const headerHeight = document.querySelector(headerSelector).offsetHeight;
    const targetElement = document.querySelector(targetSelector);
    const targetPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = targetPosition - headerHeight;

    window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
    });
};
