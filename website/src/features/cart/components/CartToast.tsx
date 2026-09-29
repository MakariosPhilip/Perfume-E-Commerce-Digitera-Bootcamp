"use client";

import Link from "next/link";
import Image from "next/image";
import { cartPaths } from "@/features/cart/paths";
import { useToastStore } from "@/features/cart/store/toast.store";

export function CartToast() {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:bottom-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="cart-toast-enter pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-md border border-[#e8e2d9] border-l-2 border-l-[#c5a880] bg-white p-3 shadow-[0px_12px_36px_0px_rgba(26,26,26,0.14)] sm:gap-4 sm:p-4"
        >
          {toast.image ? (
            <div className="relative size-12 shrink-0 overflow-hidden rounded-sm bg-[#f4f0eb]">
              <Image
                src={toast.image}
                alt=""
                fill
                unoptimized={toast.image.startsWith("/")}
                sizes="48px"
                className="object-cover"
              />
            </div>
          ) : (
            <span className="size-12 shrink-0 rounded-sm bg-[#f4f0eb]" aria-hidden="true" />
          )}
          <p className="min-w-0 flex-1 text-[13px] leading-snug font-medium text-[#1a1a1a] sm:text-[14px]">
            {toast.message}
          </p>
          <Link
            href={cartPaths.cart}
            className="shrink-0 rounded-sm bg-[#1a1a1a] px-3 py-2 text-[10px] leading-none font-semibold tracking-wide text-white uppercase hover:bg-[#a8875a] hover:text-white sm:px-3.5"
          >
            View cart
          </Link>
          <button
            type="button"
            aria-label="Dismiss notification"
            className="grid size-7 shrink-0 place-items-center rounded-sm text-[18px] leading-none text-[#80776d] hover:bg-[#f4f0eb] hover:text-[#1a1a1a]"
            onClick={() => dismiss(toast.id)}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
