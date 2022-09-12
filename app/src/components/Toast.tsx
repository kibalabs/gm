import React from 'react';

import { generateUUID } from '@kibalabs/core';
import { Box } from '@kibalabs/ui-react';
import toast, { Toaster } from 'react-hot-toast';


export const KibaToastContainer = (): React.ReactElement => {
  return (
    <Toaster position='top-right' reverseOrder={true} />
  );
};

export class IKibaToastManager {
  showToast: (variant: string, text: string, toastId?: string, shouldNotAutoClose?: boolean, autoCloseSeconds?: number) => string;
  showCustomToast: (component: React.ReactElement, toastId?: string, shouldNotAutoClose?: boolean, autoCloseSeconds?: number) => string;
  dismissToast: (toastId: string) => void;
}

// NOTE(krishan711): this is at the stage where I need to create the toast component.
// It should have a background (and text?) (and iconText?) in its styles. no state needed so I think it's a particle.
// It should allow an icon (just like button) that can be colored (based on the variant?)
// It should allow for either text to be passed in or another component (as children?)
export const useToastManager = (): IKibaToastManager => {
  const showToast = React.useCallback((variant: string, text: string, toastId?: string, shouldNotAutoClose?: boolean, autoCloseSeconds?: number): string => {
    const actualToastId = toastId || generateUUID();
    const shouldAutoClose = !shouldNotAutoClose;
    const autoCloseMillis = autoCloseSeconds ? (autoCloseSeconds * 1000) : 5000;
    toast.custom(<Box variant='notification' isFullWidth={false}>{text}</Box>, { id: actualToastId, className: variant, duration: shouldAutoClose ? autoCloseMillis : Infinity, style: { padding: '0' } });
    return actualToastId;
  }, []);

  const showCustomToast = React.useCallback((component: React.ReactElement, toastId?: string, shouldNotAutoClose?: boolean, autoCloseSeconds?: number): string => {
    const actualToastId = toastId || generateUUID();
    const shouldAutoClose = !shouldNotAutoClose;
    const autoCloseMillis = autoCloseSeconds ? (autoCloseSeconds * 1000) : 5000;
    toast.custom(component, { id: actualToastId, duration: shouldAutoClose ? autoCloseMillis : Infinity, style: { padding: '0' } });
    return actualToastId;
  }, []);

  const dismissToast = React.useCallback((toastId: string): void => {
    toast.dismiss(toastId);
  }, []);

  const toastManager = React.useMemo((): IKibaToastManager => {
    return { showToast, showCustomToast, dismissToast };
  }, [showToast, showCustomToast, dismissToast]);

  return toastManager;
};
