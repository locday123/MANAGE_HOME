const slidesToShow = (breakpoint) => {
    return breakpoint.xxl
        ? {
              slidesToShow: 5,
          }
        : breakpoint.xl || breakpoint.lg
        ? {slidesToShow: 3}
        : breakpoint.md
        ? {slidesToShow: 2}
        : breakpoint.sm
        ? {slidesToShow: 2}
        : {slidesToShow: 1}
}

export {slidesToShow}
