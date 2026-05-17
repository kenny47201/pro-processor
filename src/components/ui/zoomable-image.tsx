import { useState, type ImgHTMLAttributes } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { cn } from '@/lib/utils';

interface ZoomableImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  wrapperClassName?: string;
}

export function ZoomableImage({ src, alt = '', className, wrapperClassName, ...rest }: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn('block w-full cursor-zoom-in', wrapperClassName)}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn('w-full h-auto block', className)}
          {...rest}
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[100vw] w-screen h-[100dvh] sm:h-[95vh] sm:max-w-6xl sm:w-[95vw] p-0 overflow-hidden bg-background/95 border-border">
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={8}
            centerOnInit
            wheel={{ step: 0.2 }}
            doubleClick={{ mode: 'toggle', step: 2 }}
            pinch={{ step: 5 }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <div className="relative w-full h-full">
                <TransformComponent
                  wrapperClass="!w-full !h-full"
                  contentClass="!w-full !h-full flex items-center justify-center"
                >
                  <img
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-full object-contain select-none"
                    draggable={false}
                  />
                </TransformComponent>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border border-border bg-background/90 backdrop-blur px-2 py-1 shadow-lg">
                  <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => zoomOut()}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => resetTransform()}>
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => zoomIn()}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 h-9 w-9 rounded-full bg-background/80 backdrop-blur border border-border"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </TransformWrapper>
        </DialogContent>
      </Dialog>
    </>
  );
}
