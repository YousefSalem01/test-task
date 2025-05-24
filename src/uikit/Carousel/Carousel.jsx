import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "../../utils/utils";

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const onSelect = React.useCallback(api => {
      if (!api) return;

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setCurrentIndex(api.selectedScrollSnap());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const scrollTo = React.useCallback(
      index => {
        api?.scrollTo(index);
      },
      [api]
    );

    const handleKeyDown = React.useCallback(
      event => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) return;

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          scrollTo,
          canScrollPrev,
          canScrollNext,
          currentIndex
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      ref={ref}
      onClick={scrollPrev}
      className={cn(
        "absolute h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100",
        orientation === "horizontal"
          ? "left-4 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        !canScrollPrev && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={!canScrollPrev}
      {...props}
    >
      <ChevronLeft className="h-5 w-5" />
      <span className="sr-only">Previous slide</span>
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      ref={ref}
      onClick={scrollNext}
      className={cn(
        "absolute h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100",
        orientation === "horizontal"
          ? "right-4 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        !canScrollNext && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={!canScrollNext}
      {...props}
    >
      <ChevronRight className="h-5 w-5" />
      <span className="sr-only">Next slide</span>
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";

const CarouselDots = React.forwardRef(({ className, ...props }, ref) => {
  const { api, currentIndex } = useCarousel();
  const [slideCount, setSlideCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setSlideCount(api.scrollSnapList().length);
  }, [api]);

  const { scrollTo } = useCarousel();

  if (!slideCount) return null;

  return (
    <div ref={ref} className={cn("flex justify-center mt-6", className)} {...props}>
      {Array.from({ length: slideCount }).map((_, idx) => (
        <button
          key={idx}
          className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-[#4361EE] w-6" : "bg-gray-300"}`}
          onClick={() => scrollTo(idx)}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  );
});
CarouselDots.displayName = "CarouselDots";

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots };
