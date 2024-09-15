import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../shadcn/cn";

const menuVariants = cva(
    "flex justify-between items-center px-4 py-5 md:px-6 md:py-5 lg:px-8 lg:py-5 bg-grayscale-surface/50 backdrop-blur-[1.75rem] ",
    {
        variants: {
            rounded: {
                true: "rounded-b-[1.25rem]",
                false: "",
            },
        },
        defaultVariants: {
            rounded: false,
        },
    },
);

export interface MenuProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof menuVariants> {
    rounded?: boolean;
}

// main menu wrapper
const Menu = React.forwardRef<HTMLElement, MenuProps>(
    ({ rounded, className, ...props }, ref) => (
        <nav
            className={cn(menuVariants({ rounded }), className)}
            ref={ref}
            {...props}
        />
    ),
);

Menu.displayName = "Menu";

//wrapper for menu icon

const MenuIcon = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        className={cn("flex items-center justify-center", className)}
        ref={ref}
        {...props}
    />
));

MenuIcon.displayName = "MenuIcon";

//wrapper list for nav items

const MenuList = React.forwardRef<
    HTMLUListElement,
    React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
    <ul className={cn("flex gap-x-4", className)} ref={ref} {...props} />
));

MenuList.displayName = "MenuList";

//wrapper for nav item

const menuItemVariants = cva(
    "flex relative items-center justify-center px-4 py-2 text-sm leading-[1.375rem] font-medium text-grayscale-textIcon-body hover:text-grayscale-textIcon-title focus:text-grayscale-textIcon-title cursor-pointer transition-colors",
    {
        variants: {
            variant: {
                v1: "rounded-2xl bg-transparent hover:bg-grayscale-surface-bg1 active:outline-none active:bg-transparent active:ring-2 active:ring-primary-500/25",
                v2: "rounded-2xl bg-transparent hover:bg-grayscale-surface-bg1",
                v3: "bg-transparent",
                v4: "bg-transparent",
                v5: "bg-transparent",
                v6: "rounded-2xl bg-transparent hover:bg-grayscale-surface-bg1 active:outline-none active:bg-gradient-to-b active:from-primary-500/0 active:to-primary-surface-subtle",
            },
            isActive: {
                true: "text-grayscale-textIcon-title",
                false: "",
            },
        },

        compoundVariants: [
            {
                isActive: true,
                variant: "v1",
                className: "ring-primary-500/25 ring-2",
            },
            {
                isActive: true,
                variant: "v2",
                className: "bg-primary-surface-subtle dark:text-shape-dark",
            },
            {
                isActive: true,
                variant: "v6",
                className:
                    "bg-gradient-to-b from-primary-500/0 to-primary-surface-subtle dark:text-shape-dark",
            },
        ],
        defaultVariants: {
            variant: "v1",
            isActive: false,
        },
    },
);

const MenuItem = React.forwardRef<
    HTMLLIElement,
    React.HTMLAttributes<HTMLLIElement> & VariantProps<typeof menuItemVariants>
>(({ variant, isActive, className, ...props }, ref) => (
    <li
        className={cn(
            "flex items-center",
            menuItemVariants({ variant, isActive }),
            className,
        )}
        ref={ref}
        {...props}
    >
        {isActive ? (
            variant === "v3" || variant === "v4" || variant === "v5" ? (
                <div
                    className={`absolute transition-all duration-200 rounded-full bg-primary-500
          ${
              variant === "v3" || variant === "v5"
                  ? "w-4 h-[2px] left-1/2 -translate-x-1/2 bottom-0"
                  : variant === "v4"
                    ? "w-full h-[2px] bottom-0"
                    : ""
          }`}
                ></div>
            ) : null
        ) : null}

        {isActive ? (
            variant === "v5" ? (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[2px] transiton duration-200 rounded-full bg-primary-500" />
            ) : null
        ) : null}

        {props.children}
    </li>
));

MenuItem.displayName = "MenuItem";

//wrapper for nav link
type MenuLinkProps = React.ComponentProps<"a"> & {
    children: React.ReactNode;
};

const MenuLink = ({ className, ...props }: MenuLinkProps) => (
    <a
        aria-current={"page"}
        className={cn("flex items-center justify-center", className)}
        {...props}
    >
        {props.children}
    </a>
);

MenuLink.displayName = "MenuLink";

//wrapper for menu subcontent
const MenuSubContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        className={cn("flex items-center justify-center", className)}
        ref={ref}
        {...props}
    />
));

MenuSubContent.displayName = "MenuSubContent";

const MenuToggle = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
    <button
        className={cn("flex items-center justify-center", className)}
        ref={ref}
        {...props}
    >
        {props.children}
    </button>
));

MenuToggle.displayName = "MenuToggle";

export {
    Menu,
    MenuIcon,
    MenuList,
    MenuItem,
    MenuLink,
    MenuSubContent,
    MenuToggle,
};
